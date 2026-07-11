(function initReportParser(global) {
  "use strict";

  const root = (global.NytrinA = global.NytrinA || {});
  const animalsData = root.Animals;
  const mapParser = root.MapParser;
  const server = root.Server;
  const troops = root.Troops;
  const utils = root.Utils;

  const ANIMAL_SELECTOR = animalsData.list
    .map((animal) => '[class*="' + animal.iconClass + '"]')
    .join(",");

  function extractNumbersFromRow(row) {
    return Array.from(row.querySelectorAll("td,th,input"))
      .map((cell) => (cell.tagName === "INPUT" ? cell.value : cell.textContent))
      .map((value) => utils.toInt(value || ""));
  }

  function findNatureTable() {
    const tables = Array.from(global.document.querySelectorAll("table"));
    for (const table of tables) {
      if (table.querySelector(ANIMAL_SELECTOR)) return table;
    }
    return null;
  }

  function findAttackerTable() {
    const tables = Array.from(global.document.querySelectorAll("table"));
    for (const table of tables) {
      if (
        table.querySelector(
          '[class*="u1"], [class*="u2"], [class*="u3"], [class*="u4"], [class*="u5"], [class*="u6"], [class*="u7"], [class*="u8"], [class*="u9"], [class*="u10"], [class*="hero"]',
        )
      ) {
        const hasNatureIcons = Boolean(table.querySelector(ANIMAL_SELECTOR));
        if (!hasNatureIcons) return table;
      }
    }
    return null;
  }

  function parseAttackerTableExact() {
    const result = {
      total: {},
      lost: {},
      wounded: {},
    };

    // Procura a seção do atacante
    const attackerRole = document.querySelector(".role.attacker");

    if (!attackerRole) {
      console.warn("Não encontrou .role.attacker");
      return result;
    }

    // A tabela está dentro dela
    const table = attackerRole.querySelector("table");

    if (!table) {
      console.warn("Não encontrou tabela do atacante");
      return result;
    }

    // Classes das tropas (u1,u2,u3...)
    const icons = [...table.querySelectorAll("img.unit")];

    const keys = icons
      .map((icon) => [...icon.classList].find((c) => /^u\d+$/.test(c)))
      .filter(Boolean);

    console.log("Keys:", keys);

    // Linhas da tabela
    const totalRow = table.querySelector(".troopCount_small")?.closest("tr");
    const deadRow = table.querySelector(".troopDead_small")?.closest("tr");

    const allRows = [...table.querySelectorAll("tbody.units tr")];

    const woundedRow = allRows.find((row) => {
      if (row === totalRow || row === deadRow) return false;

      const cells = row.querySelectorAll("td.unit");
      return cells.length > 0;
    });

    function read(row) {
      const out = {};

      if (!row) return out;

      const values = [...row.querySelectorAll("td.unit")].map((td) =>
        utils.toInt(td.textContent),
      );

      console.log("Valores:", values);

      keys.forEach((key, index) => {
        out[key] = values[index] || 0;
      });

      // A tabela possui 10 tropas + a coluna do herói.
      // Como "keys" contém somente u1 até u10, o herói é o valor seguinte.
      out.hero = Number(values[keys.length] || 0);

      return out;
    }

    result.total = read(totalRow);
    result.lost = read(deadRow);
    result.wounded = read(woundedRow);

    console.log("TOTAL", result.total);
    console.log("LOST", result.lost);

    return result;
  }

  function parseNatureTableExact() {
    const result = {
      total: animalsData.emptyAnimals(),
      lost: animalsData.emptyAnimals(),
    };

    const table = findNatureTable();
    if (!table) return result;

    const headerIcons = Array.from(
      table.querySelectorAll(
        "img.unit.u31, img.unit.u32, img.unit.u33, img.unit.u34, img.unit.u35, img.unit.u36, img.unit.u37, img.unit.u38, img.unit.u39, img.unit.u40, .unit.u31, .unit.u32, .unit.u33, .unit.u34, .unit.u35, .unit.u36, .unit.u37, .unit.u38, .unit.u39, .unit.u40",
      ),
    );

    const keys = headerIcons
      .map((icon) => {
        const token = utils
          .classTokens(icon)
          .find((name) => /^u(3[1-9]|40)$/.test(name));
        return token ? animalsData.byIconClass[token] : null;
      })
      .filter(Boolean);

    if (!keys.length) return result;

    const rows = Array.from(table.querySelectorAll("tr"));

    const totalRow = rows.find((row) => row.querySelector(".troopCount_small"));
    const deadRow = rows.find((row) => row.querySelector(".troopDead_small"));

    function readAnimalRow(row) {
      const out = animalsData.emptyAnimals();
      if (!row) return out;

      const values = Array.from(row.querySelectorAll("td.unit, td"))
        .map((td) => utils.toInt(td.textContent || ""))
        .slice(0, keys.length);

      keys.forEach((key, index) => {
        out[key] = values[index] || 0;
      });

      return out;
    }

    result.total = readAnimalRow(totalRow);
    result.lost = readAnimalRow(deadRow || totalRow);

    return result;
  }

  function parseResourcesByTableCells() {
    const result = {
      resourcesLoot: { wood: 0, clay: 0, iron: 0, crop: 0, total: 0 },
      heroResources: { wood: 0, clay: 0, iron: 0, crop: 0, total: 0 },
    };

    const ths = Array.from(global.document.querySelectorAll("th"));
    const premioTH = ths.find((t) => {
      const txt = utils.normalizeText(t.textContent || "");
      return txt === "premio" || txt === "prêmio";
    });

    if (!premioTH) return result;

    const td = premioTH.nextElementSibling;
    if (!td) return result;

    const wrappers = td.querySelectorAll(".resourceWrapper");
    if (!wrappers.length) return result;

    function parseWrapper(wrapper) {
      const values = Array.from(wrapper.querySelectorAll(".value"))
        .map((v) => utils.toInt(v.textContent || ""))
        .slice(0, 4);

      const wood = Number(values[0] || 0);
      const clay = Number(values[1] || 0);
      const iron = Number(values[2] || 0);
      const crop = Number(values[3] || 0);

      return {
        wood,
        clay,
        iron,
        crop,
        total: wood + clay + iron + crop,
      };
    }

    result.resourcesLoot = parseWrapper(wrappers[0]);

    if (wrappers.length > 1) {
      result.heroResources = parseWrapper(wrappers[1]);
    }

    return result;
  }

  function parseLossFromStatisticsTable() {
    const rows = Array.from(global.document.querySelectorAll("tr"));

    for (const row of rows) {
      const text = utils.normalizeText(row.textContent || "");
      if (!text.includes("recursos perdidos")) continue;

      const cells = Array.from(row.querySelectorAll("td,th"));
      if (cells.length < 2) continue;

      const loss = utils.toInt(cells[1].textContent || "");
      if (loss > 0) return loss;
    }

    return 0;
  }

  function parseReportIdFromUrl() {
    const params = new URL(global.location.href).searchParams;
    const byUrl = params.get("id");
    if (byUrl) return byUrl;

    const candidates = Array.from(
      global.document.querySelectorAll(
        "h1,h2,h3,.title,.header,.headline,.additionalInformation",
      ),
    );

    for (const node of candidates) {
      const text = String(node.textContent || "").trim();
      if (!text) continue;

      const token = text.match(/[\w-]{8,}/);
      if (token) return token[0];
    }

    return "report-" + Date.now();
  }

  function parseReportCoord() {
    const rawText = String(
      global.document.body?.innerText ||
        global.document.body?.textContent ||
        "",
    )
      .replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, "")
      .replace(/[−–—]/g, "-");

    // Prioridade 1: coordenada entre parênteses após o texto do oásis.
    const oasisCoord = rawText.match(
      /(?:saqueia|ataca|assalta).*?o[aá]sis.*?\(\s*([+-]?\d{1,3})\s*\|\s*([+-]?\d{1,3})\s*\)/i,
    );

    if (oasisCoord) {
      return (
        String(Number(oasisCoord[1])) + "|" + String(Number(oasisCoord[2]))
      );
    }

    // Prioridade 2: qualquer coordenada válida entre parênteses.
    const genericParentheses = rawText.match(
      /\(\s*([+-]?\d{1,3})\s*\|\s*([+-]?\d{1,3})\s*\)/,
    );

    if (genericParentheses) {
      return (
        String(Number(genericParentheses[1])) +
        "|" +
        String(Number(genericParentheses[2]))
      );
    }

    // Prioridade 3: coordenada sem parênteses.
    const genericPlain = rawText.match(
      /(?:^|\s)([+-]?\d{1,3})\s*\|\s*([+-]?\d{1,3})(?:\s|$)/,
    );

    if (genericPlain) {
      return (
        String(Number(genericPlain[1])) + "|" + String(Number(genericPlain[2]))
      );
    }

    const info = mapParser.resolveCoordinate(global.document.body);

    if (info.coord) {
      return info.coord;
    }

    return null;
  }

  function parse(options) {
    const natureData = parseNatureTableExact();

    const attackerData = parseAttackerTableExact();
    console.log(attackerData);
    const resources = parseResourcesByTableCells();

    const hasCombatData =
      Object.values(natureData.total || {}).some((v) => Number(v || 0) > 0) ||
      Object.values(natureData.lost || {}).some((v) => Number(v || 0) > 0) ||
      Object.keys(attackerData.total || {}).length > 0;

    const hasResourceData =
      Number(resources.resourcesLoot.total || 0) > 0 ||
      Number(resources.heroResources.total || 0) > 0;

    if (!hasCombatData && !hasResourceData) return null;

    const animalsInitial = {
      ...animalsData.emptyAnimals(),
      ...(natureData.total || {}),
    };

    const animalsKilled = {
      ...animalsData.emptyAnimals(),
      ...(natureData.lost || {}),
    };

    const animalsRemaining = animalsData.emptyAnimals();

    Object.keys(animalsRemaining).forEach((key) => {
      animalsRemaining[key] = Math.max(
        0,
        Number(animalsInitial[key] || 0) - Number(animalsKilled[key] || 0),
      );
    });

    let xp = animalsData.calcXp(animalsKilled);

    if (xp <= 0 && resources.heroResources.total > 0) {
      xp = animalsData.calcXp(animalsKilled);
    }

    const loss = troops.calcLossCost(
      options.tribe || "romans",
      attackerData.lost || {},
    );

    const lossFromReport = parseLossFromStatisticsTable();

    const totalResources =
      Number(resources.resourcesLoot.total || 0) +
      Number(resources.heroResources.total || 0);

    const finalLoss = lossFromReport > 0 ? lossFromReport : loss.total;
    const profit = totalResources - finalLoss;

    const selectedTroopType = options.troopType || null;

    const TROOP_CLASS = {
      romans: {
        legionnaire: "u1",
        praetorian: "u2",
        imperian: "u3",
        equites_legati: "u4",
        equites_imperatoris: "u5",
        equites_caesaris: "u6",
      },

      teutons: {
        clubman: "u11",
        spearman: "u12",
        axeman: "u13",
        scout: "u14",
        paladin: "u15",
        teutonic_knight: "u16",
      },

      gauls: {
        phalanx: "u21",
        swordsman: "u22",
        pathfinder: "u23",
        theutates_thunder: "u24",
        druidrider: "u25",
        haeduan: "u26",
      },
    };

    const selectedTroopClass =
      TROOP_CLASS[options.tribe || "romans"]?.[selectedTroopType] || null;

    const troopsSentCount = selectedTroopClass
      ? Number((attackerData.total || {})[selectedTroopClass] || 0)
      : 0;

    const troopsLostCount = selectedTroopClass
      ? Number((attackerData.lost || {})[selectedTroopClass] || 0)
      : 0;

    const troopsWoundedCount = selectedTroopClass
      ? Number((attackerData.wounded || {})[selectedTroopClass] || 0)
      : 0;

    const troopsCasualtiesCount =
      Number(troopsLostCount || 0) + Number(troopsWoundedCount || 0);

    const troopDeathRate =
      troopsSentCount > 0 ? troopsLostCount / troopsSentCount : 0;

    const troopCasualtyRate =
      troopsSentCount > 0 ? troopsCasualtiesCount / troopsSentCount : 0;

    console.log({
      troopType: selectedTroopType,
      troopClass: selectedTroopClass,
      troopsSentCount,
      troopsLostCount,
      troopsWoundedCount,
      troopsCasualtiesCount,
    });

    const totalAnimalsInitial = Object.values(animalsInitial).reduce(
      (sum, value) => sum + Number(value || 0),
      0,
    );

    const totalAnimalsKilled = Object.values(animalsKilled).reduce(
      (sum, value) => sum + Number(value || 0),
      0,
    );

    const totalAnimalsRemaining = Object.values(animalsRemaining).reduce(
      (sum, value) => sum + Number(value || 0),
      0,
    );

    const killRate =
      totalAnimalsInitial > 0 ? totalAnimalsKilled / totalAnimalsInitial : 0;

    const troopLossRate =
      troopsSentCount > 0 ? troopsLostCount / troopsSentCount : 0;

    const heroSent = Number(attackerData.total?.hero || 0);
    const hasHero = heroSent > 0;

    return {
      url: global.location.href,
      reportId: parseReportIdFromUrl(),
      server: server.getContext().key,
      tribe: options.tribe || "romans",
      date: new Date().toISOString(),
      coord: parseReportCoord(),
      animalsInitial,
      animalsKilled,
      animalsRemaining,
      // Compatibilidade com código antigo:
      animalsAlive: animalsRemaining,
      totalAnimalsInitial,
      totalAnimalsKilled,
      totalAnimalsRemaining,
      killRate,
      troopLossRate,
      troopsSent: attackerData.total || {},
      troopsLost: attackerData.lost || {},
      troopsWounded: attackerData.wounded || {},
      heroSent,
      hasHero,
      troopType: selectedTroopType,
      troopClass: selectedTroopClass,
      troopsSentCount,
      troopsLostCount,
      troopsWoundedCount,
      troopsCasualtiesCount,
      troopDeathRate,
      troopCasualtyRate,
      cleared: Object.values(animalsRemaining).every(
        (value) => Number(value || 0) === 0,
      ),
      resourcesLoot: resources.resourcesLoot,
      heroResources: resources.heroResources,
      totalResources,
      lossCost: finalLoss,
      profit,
      xp,
    };
  }

  root.ReportParser = {
    parse,
  };
})(window);
