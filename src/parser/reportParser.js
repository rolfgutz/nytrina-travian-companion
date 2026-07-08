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

  function parseCombatTable(table) {
    const icons = Array.from(
      table.querySelectorAll('[class*="u"], [class*="hero"]'),
    );
    const unitClasses = [];

    icons.forEach((icon) => {
      const token = utils
        .classTokens(icon)
        .find((name) => /^u\d+$/.test(name) || name === "hero");

      if (token && !unitClasses.includes(token)) {
        unitClasses.push(token);
      }
    });

    const rows = Array.from(table.querySelectorAll("tr"));
    const numericRows = rows
      .map((row) => extractNumbersFromRow(row))
      .filter(
        (numbers) =>
          numbers.length >= unitClasses.length && unitClasses.length > 0,
      );

    const total = {};
    const lost = {};
    const totalRow = numericRows[0] || [];
    const lostRow = numericRows[1] || [];

    unitClasses.forEach((unitClass, index) => {
      total[unitClass] = Number(totalRow[index] || 0);
      lost[unitClass] = Number(lostRow[index] || 0);
    });

    return { total, lost };
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

    const oasisLine = rawText.match(
        /(?:saqueia|ataca|assalta)[^\n\r]{0,160}o[aá]sis[^\n\r]{0,160}\(?\s*([+-]?\d{1,3})\s*(?:\||-)\s*([+-]?\d{1,3})\s*\)?/i,
    );

    if (oasisLine) {
        return String(Number(oasisLine[1])) + "|" + String(Number(oasisLine[2]));
    }

    const generic = rawText.match(
        /\(\s*([+-]?\d{1,3})\s*\|\s*([+-]?\d{1,3})\s*\)/,
    );

    if (generic) {
        return String(Number(generic[1])) + "|" + String(Number(generic[2]));
    }

    const info = mapParser.resolveCoordinate(global.document.body);
    if (info.coord) return info.coord;

    return null;
  }

  function parse(options) {
    const natureData = parseNatureTableExact();

    const attackerTable = findAttackerTable();
    const attackerData = attackerTable
      ? parseCombatTable(attackerTable)
      : { total: {}, lost: {} };

    const resources = parseResourcesByTableCells();

    const hasCombatData =
      Object.values(natureData.total || {}).some((v) => Number(v || 0) > 0) ||
      Object.values(natureData.lost || {}).some((v) => Number(v || 0) > 0) ||
      Object.keys(attackerData.total || {}).length > 0;

    const hasResourceData =
      Number(resources.resourcesLoot.total || 0) > 0 ||
      Number(resources.heroResources.total || 0) > 0;

    if (!hasCombatData && !hasResourceData) return null;

    const animalsAlive = {
      ...animalsData.emptyAnimals(),
      ...(natureData.total || {}),
    };

    let animalsKilled = {
      ...animalsData.emptyAnimals(),
      ...(natureData.lost || {}),
    };

    let xp = animalsData.calcXp(animalsKilled);

    if (xp <= 0 && resources.heroResources.total > 0) {
      animalsKilled = { ...animalsData.emptyAnimals(), ...animalsAlive };
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

    return {
      url: global.location.href,
      reportId: parseReportIdFromUrl(),
      server: server.getContext().key,
      date: new Date().toISOString(),
      coord: parseReportCoord(),
      animalsKilled,
      animalsAlive,
      troopsSent: attackerData.total || {},
      troopsLost: attackerData.lost || {},
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
