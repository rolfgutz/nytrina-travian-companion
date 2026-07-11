(function initOverlay(global) {
  "use strict";

  const root = (global.NytrinA = global.NytrinA || {});

  class Overlay {
    /**
     * @param {{storage:any,scanner:any,getSettings:Function,saveSettings:Function}} deps
     */
    constructor(deps) {
      this.storage = deps.storage;
      this.scanner = deps.scanner;
      this.getSettings = deps.getSettings;
      this.saveSettings = deps.saveSettings;
      this.currentScan = null;
      this.debugEnabled = true;
      this.overlay = null;
      this.titleClicks = 0;
      this.currentTab = "scanner";
      this.reportsPage = 1;
      this.reportsPerPage = 25;
      this.debugPage = 1;
      this.debugPerPage = 20;
    }

    /**
     * @returns {void}
     */
    mount() {
      this.injectStyles();
      this.overlay = global.document.createElement("div");
      this.overlay.id = "nytrina-overlay";
      this.overlay.innerHTML = this.template();
      global.document.body.appendChild(this.overlay);
      this.bindEvents();
      const minimized = Boolean(this.getSettings()?.overlayMinimized);
      this.overlay.classList.toggle("minimized", minimized);

      const minimizeButton = this.overlay.querySelector(
        "#nytrina-toggle-minimize",
      );
      if (minimizeButton) {
        minimizeButton.textContent = minimized ? "Expandir" : "Minimizar";
      }
      this.refresh().catch(() => undefined);
    }

    /**
     * @returns {void}
     */
    injectStyles() {
      if (global.document.getElementById("nytrina-styles")) return;
      const style = global.document.createElement("style");
      style.id = "nytrina-styles";
      style.textContent = root.UI_STYLES || "";
      global.document.head.appendChild(style);
    }

    /**
     * @returns {string}
     */
    template() {
      const activeTab = this.currentTab || "scanner";
      return [
        '<div class="head">',
        '<b id="nytrina-title">NytrinA Companion 4.0</b>',
        '<div class="actions"><button id="nytrina-toggle-minimize">Minimizar</button><button id="nytrina-refresh">Atualizar</button></div>',
        "</div>",
        '<div class="tabs">',
        '<button class="tab' + (activeTab === "scanner" ? " active" : "") + '" data-tab="scanner">Scanner</button>',
        '<button class="tab' + (activeTab === "dashboard" ? " active" : "") + '" data-tab="dashboard">Dashboard</button>',
        '<button class="tab' + (activeTab === "ranking" ? " active" : "") + '" data-tab="ranking">Ranking</button>',
        '<button class="tab' + (activeTab === "reports" ? " active" : "") + '" data-tab="reports">Relatorios</button>',
        '<button class="tab' + (activeTab === "economy" ? " active" : "") + '" data-tab="economy">Economia</button>',
        '<button class="tab' + (activeTab === "settings" ? " active" : "") + '" data-tab="settings">Configuracoes</button>',
        '<button class="tab' + (activeTab === "debug" ? " active" : "") + '" data-tab="debug" id="nytrina-debug-tab">Debug</button>',
        "</div>",
        '<div class="panel' + (activeTab === "scanner" ? "" : " hidden") + '" data-panel="scanner"></div>',
        '<div class="panel' + (activeTab === "dashboard" ? "" : " hidden") + '" data-panel="dashboard"></div>',
        '<div class="panel' + (activeTab === "ranking" ? "" : " hidden") + '" data-panel="ranking"></div>',
        '<div class="panel' + (activeTab === "reports" ? "" : " hidden") + '" data-panel="reports"></div>',
        '<div class="panel' + (activeTab === "economy" ? "" : " hidden") + '" data-panel="economy"></div>',
        '<div class="panel' + (activeTab === "settings" ? "" : " hidden") + '" data-panel="settings"></div>',
        '<div class="panel' + (activeTab === "debug" ? "" : " hidden") + '" data-panel="debug"></div>',
      ].join("");
    }

    /**
     * @returns {void}
     */
    bindEvents() {
      console.error("######## OVERLAY NOVO ########");
      this.overlay.querySelectorAll(".tab").forEach((button) => {
        button.addEventListener("click", () => {
          const tab = button.getAttribute("data-tab") || "scanner";
          this.currentTab = tab;
          root.Tabs.activateTab(this.overlay, tab);
        });
      });

      this.overlay
        .querySelector("#nytrina-refresh")
        ?.addEventListener("click", () => {
          this.refresh().catch(() => undefined);
        });

      // NOVO
      this.overlay
        .querySelector("#nytrina-toggle-minimize")
        ?.addEventListener("click", async () => {
          const minimized = this.overlay.classList.toggle("minimized");

          await this.saveSettings({
            overlayMinimized: minimized,
          });

          const btn = this.overlay.querySelector("#nytrina-toggle-minimize");
          if (btn) {
            btn.textContent = minimized ? "Expandir" : "Minimizar";
          }
        });

      this.overlay
        .querySelector("#nytrina-title")
        ?.addEventListener("click", () => {
          this.titleClicks += 1;
        });
    }

    /**
     * @param {number} totalItems
     * @param {number} page
     * @param {number} perPage
     * @returns {{page:number,totalPages:number,start:number,end:number}}
     */
    paginationMeta(totalItems, page, perPage) {
      const safePerPage = Math.max(1, Number(perPage || 1));
      const totalPages = Math.max(1, Math.ceil(Number(totalItems || 0) / safePerPage));
      const currentPage = Math.min(Math.max(1, Number(page || 1)), totalPages);
      const start = (currentPage - 1) * safePerPage;
      const end = start + safePerPage;

      return {
        page: currentPage,
        totalPages,
        start,
        end,
      };
    }

    /**
     * @param {string} prefix
     * @param {{page:number,totalPages:number,start:number,end:number}} meta
     * @param {number} totalItems
     * @returns {string}
     */
    paginationControls(prefix, meta, totalItems) {
      const from = totalItems > 0 ? meta.start + 1 : 0;
      const to = Math.min(meta.end, totalItems);

      return [
        '<div class="actions">',
        '<button id="' + prefix + '-prev"' + (meta.page <= 1 ? ' disabled="disabled"' : '') + '>Anterior</button>',
        '<button id="' + prefix + '-next"' + (meta.page >= meta.totalPages ? ' disabled="disabled"' : '') + '>Próxima</button>',
        '<span>' +
          'Página ' +
          meta.page +
          ' de ' +
          meta.totalPages +
          ' | Itens ' +
          from +
          '-' +
          to +
          ' de ' +
          totalItems +
          '</span>',
        '</div>',
      ].join('');
    }

    /**
     * @param {string} panel
     * @returns {HTMLElement|null}
     */
    panel(panel) {
      return this.overlay.querySelector('[data-panel="' + panel + '"]');
    }

    /**
     * @returns {Array<{value:string,label:string}>}
     */
    tribeOptions() {
      return [
        { value: "romans", label: "Romanos" },
        { value: "gauls", label: "Gauleses" },
        { value: "teutons", label: "Teutoes" },
      ];
    }

    /**
     * @param {string} tribe
     * @returns {Array<{value:string,label:string,base:number}>}
     */
    troopOptionsForTribe(tribe) {
      const speeds = root.Troops.speeds[tribe] || {};
      const options = Object.entries(speeds).map(([value, base]) => ({
        value,
        label: value.replace(/_/g, " "),
        base: Number(base),
      }));
      options.sort((a, b) => a.label.localeCompare(b.label));
      return options;
    }

    /**
     * @param {string} troopType
     * @returns {'romans'|'teutons'|'gauls'|null}
     */
    inferTribeByTroop(troopType) {
      const speedMap = root.Troops.speeds;
      for (const tribe of ["romans", "teutons", "gauls"]) {
        if (
          speedMap[tribe] &&
          Object.prototype.hasOwnProperty.call(speedMap[tribe], troopType)
        ) {
          return tribe;
        }
      }
      return null;
    }

    /**
     * @param {string} key
     * @returns {string}
     */
    troopLabel(key) {
      const labels = {
        hero: "So heroi",
        custom: "Personalizado",
        legionnaire: "Legionario",
        praetorian: "Pretoriano",
        imperian: "Imperiano",
        equites_legati: "Equites Legati",
        equites_imperatoris: "Equites Imperatoris",
        equites_caesaris: "Equites Caesaris",
        ram: "Ariete",
        fire_catapult: "Catapulta",
        clubman: "Salteador",
        paladin: "Paladino",
        teutonic_knight: "Cavaleiro Teutao",
        theutates_thunder: "Trovao de Theutates",
        druidrider: "Druida",
        haeduan: "Haeduano",
      };
      return labels[key] || key.replace(/_/g, " ");
    }

    /**
     * @param {number} serverSpeed
     * @param {string} selected
     * @returns {string}
     */
    groupedTroopOptions(serverSpeed, selected) {
      const speedMap = root.Troops.speeds;

      const groups = [
        {
          label: "Geral",
          items: [
            { key: "hero", base: Number(speedMap.hero || 14) },
            { key: "custom", base: Number(speedMap.custom || 14) },
          ],
        },
        {
          label: "Romanos",
          items: [
            "legionnaire",
            "praetorian",
            "imperian",
            "equites_legati",
            "equites_imperatoris",
            "equites_caesaris",
            "ram",
            "fire_catapult",
          ]
            .filter((key) => speedMap.romans[key])
            .map((key) => ({ key, base: Number(speedMap.romans[key]) })),
        },
        {
          label: "Teutoes",
          items: ["clubman", "paladin", "teutonic_knight"]
            .filter((key) => speedMap.teutons[key])
            .map((key) => ({ key, base: Number(speedMap.teutons[key]) })),
        },
        {
          label: "Gauleses",
          items: ["theutates_thunder", "druidrider", "haeduan"]
            .filter((key) => speedMap.gauls[key])
            .map((key) => ({ key, base: Number(speedMap.gauls[key]) })),
        },
      ];

      return groups
        .map((group) => {
          const options = group.items
            .map((item) => {
              const finalSpeed =
                item.key === "custom" ? item.base : item.base * serverSpeed;
              const selectedAttr = item.key === selected ? " selected" : "";
              return (
                '<option value="' +
                item.key +
                '"' +
                selectedAttr +
                ">" +
                this.troopLabel(item.key) +
                " - " +
                item.base +
                " x" +
                serverSpeed +
                " = " +
                finalSpeed +
                "</option>"
              );
            })
            .join("");
          return (
            '<optgroup label="' + group.label + '">' + options + "</optgroup>"
          );
        })
        .join("");
    }

    /**
     * @returns {Promise<void>}
     */
    async refresh() {
      await this.refreshDashboard();
      await this.refreshScanner();
      await this.refreshRanking();
      await this.refreshReports();
      await this.refreshEconomy();
      await this.refreshSettings();
      await this.refreshDebug();
    }

    /**
     * @returns {Promise<void>}
     */
    async refreshDashboard() {
      const reports = await this.storage.getAll(root.Constants.STORES.REPORTS);
      const oasis = await this.storage.getAll(root.Constants.STORES.OASIS);
      const summary = root.Economy.calculateSummary(reports);
      const node = this.panel("dashboard");
      if (!node) return;

      node.innerHTML = [
        '<div class="grid">',
        '<div class="card"><span>Oasis mapeados</span><b>' +
          oasis.length +
          "</b></div>",
        '<div class="card"><span>Relatorios</span><b>' +
          reports.length +
          "</b></div>",
        '<div class="card"><span>Lucro liquido</span><b>' +
          Math.round(summary.netProfit) +
          "</b></div>",
        '<div class="card"><span>XP total</span><b>' +
          Math.round(summary.totalXp) +
          "</b></div>",
        "</div>",
      ].join("");
    }

    /**
     * @returns {Promise<void>}
     */
    async refreshScanner() {
      const node = this.panel("scanner");
      if (!node) return;
      const settings = this.getSettings();
      const server = root.Server.getContext();
      const parsed = await this.scanner.scanNow();
      this.currentScan = parsed;

      const groupedOptions = this.groupedTroopOptions(
        server.speed,
        settings.troopType || "hero",
      );

      const formulaAdvice = root.BattleAdvisor?.recommend({
        animals: parsed?.animals || {},
        troopType: settings.troopType || "hero",
        hero: true,
      });

      let knowledge = null;
      let learnedAdvice = null;

      const selectedTroopType = settings.troopType || "hero";
      const selectedTribe =
        settings.troopTribe ||
        this.inferTribeByTroop(selectedTroopType) ||
        "romans";
      const canResetCalibration =
        selectedTroopType !== "hero" && selectedTroopType !== "custom";

      let calibratedWithHero = null;
      let calibratedWithoutHero = null;

      if (formulaAdvice?.ok && root.BattleKnowledge?.applyCalibration) {
        calibratedWithHero = await root.BattleKnowledge.applyCalibration({
          storage: this.storage,
          tribe: selectedTribe,
          troopType: selectedTroopType,
          hasHero: true,
          theoreticalTroops: formulaAdvice.withHero.safeTroops,
        });

        calibratedWithoutHero = await root.BattleKnowledge.applyCalibration({
          storage: this.storage,
          tribe: selectedTribe,
          troopType: selectedTroopType,
          hasHero: false,
          theoreticalTroops: formulaAdvice.withoutHero.safeTroops,
        });
      }

      const canUseLearning =
        root.BattleKnowledge &&
        parsed &&
        Number(parsed.xp || 0) > 0 &&
        parsed.animals &&
        selectedTroopType !== "hero" &&
        selectedTroopType !== "custom";

      if (canUseLearning) {
        knowledge = await root.BattleKnowledge.getKnowledge(
          this.storage,
          selectedTribe,
          selectedTroopType,
          Number(parsed.xp || 0),
          parsed.animals || {},
        );

        if (Number(knowledge?.samples || 0) > 0) {
          learnedAdvice = root.BattleKnowledge.suggestFromKnowledge(knowledge);
        }
      }

      let suggestionText = "-";
      let suggestionSource = "Sem dados";
      let suggestionConfidence = "Sem dados";
      let suggestionStars = "☆☆☆☆☆";
      let suggestionBasedOn = 0;
      let learnedFactorText = "x1.00";
      let withHeroSuggestion = "-";
      let withoutHeroSuggestion = "-";
      let usedLearning = false;

      if (learnedAdvice?.ok) {
        usedLearning = true;
        const learned = Math.round(Number(learnedAdvice.suggestedTroops || 0));

        withHeroSuggestion = String(learned);
        withoutHeroSuggestion = String(learned);
        suggestionText =
          "Com herói: " + learned + " | Sem herói: " + learned;
        suggestionSource = "IA Aprendida";

        suggestionBasedOn = Number(knowledge?.samples || 0);
        suggestionConfidence =
          suggestionBasedOn >= 10
            ? "Alta"
            : suggestionBasedOn >= 5
              ? "Média"
              : "Baixa";

        const stars = Math.max(
          1,
          Math.min(5, Math.round((Math.min(suggestionBasedOn, 15) / 15) * 4 + 1)),
        );
        suggestionStars = "★".repeat(stars) + "☆".repeat(5 - stars);
      } else if (formulaAdvice?.ok) {
        const theoreticalWithHero = Number(
          formulaAdvice.withHero.safeTroops || 0,
        );

        const theoreticalWithoutHero = Number(
          formulaAdvice.withoutHero.safeTroops || 0,
        );

        const finalWithHero = Number(
          calibratedWithHero?.troops || theoreticalWithHero,
        );

        const finalWithoutHero = Number(
          calibratedWithoutHero?.troops || theoreticalWithoutHero,
        );

        withHeroSuggestion = String(finalWithHero);
        withoutHeroSuggestion = String(finalWithoutHero);
        const withHeroSamples = Number(calibratedWithHero?.samples || 0);
        const withoutHeroSamples = Number(calibratedWithoutHero?.samples || 0);
        suggestionBasedOn = withHeroSamples + withoutHeroSamples;

        suggestionText =
          "Com herói: " + finalWithHero + " | Sem herói: " + finalWithoutHero;

        const heroSource = String(calibratedWithHero?.source || "");
        const noHeroSource = String(calibratedWithoutHero?.source || "");
        suggestionSource =
          heroSource.includes("IA") || noHeroSource.includes("IA")
            ? "IA Aprendida"
            : withHeroSamples > 0 || withoutHeroSamples > 0
              ? "Cálculo ajustado pelo aprendizado"
              : "Cálculo teórico";

        const heroFactor = Number(calibratedWithHero?.factor || 1);
        const noHeroFactor = Number(calibratedWithoutHero?.factor || 1);
        learnedFactorText =
          "Hero: x" +
          heroFactor.toFixed(2) +
          " | Sem: x" +
          noHeroFactor.toFixed(2);

        const heroStars = Number(calibratedWithHero?.stars || 1);
        const noHeroStars = Number(calibratedWithoutHero?.stars || 1);
        const avgStars = Math.max(1, Math.round((heroStars + noHeroStars) / 2));
        suggestionStars = "★".repeat(avgStars) + "☆".repeat(5 - avgStars);

        const heroConfidence = String(
          calibratedWithHero?.confidence || "Sem dados",
        );
        const noHeroConfidence = String(
          calibratedWithoutHero?.confidence || "Sem dados",
        );

        if (withHeroSamples > 0 || withoutHeroSamples > 0) {
          suggestionConfidence =
            "Com herói: " + heroConfidence + " | Sem herói: " + noHeroConfidence;

          usedLearning = true;
        } else {
          suggestionConfidence = "Sem calibração";
        }
      }

      node.innerHTML = [
        '<div class="grid">',
        '<div class="card"><span>Coord</span><b>' +
          (parsed?.coord || "-") +
          "</b></div>",
        '<div class="card"><span>Distancia</span><b>' +
          (parsed?.distance || "-") +
          "</b></div>",
        '<div class="card"><span>XP</span><b>' +
          (parsed?.xp || 0) +
          "</b></div>",
        '<div class="card"><span>XP/h</span><b>' +
          Math.round(parsed?.xph || 0) +
          "</b></div>",
        '<div class="card"><span>Tempo</span><b>' +
          (parsed?.time || "-") +
          "</b></div>",
        '<div class="card"><span>Velocidade</span><b>' +
          Number(settings.effectiveSpeed || 14) +
          " campos/h</b></div>",
        '<div class="card"><span>Servidor</span><b>' +
          server.host +
          "</b></div>",
        '<div class="card"><span>Multiplicador</span><b>x' +
          server.speed +
          "</b></div>",
        '<div class="card"><span>Sugestão</span><b>' +
          suggestionText +
          "</b></div>",
        '<div class="card"><span>Com herói</span><b>' +
          withHeroSuggestion +
          "</b></div>",
        '<div class="card"><span>Sem herói</span><b>' +
          withoutHeroSuggestion +
          "</b></div>",

        '<div class="card"><span>Fonte</span><b>' +
          suggestionSource +
          "</b></div>",
        '<div class="card"><span>Avaliação</span><b>' +
          suggestionStars +
          "</b></div>",

        '<div class="card"><span>Confiança</span><b>' +
          suggestionConfidence +
          "</b></div>",
        '<div class="card"><span>Fator aprendido</span><b>' +
          learnedFactorText +
          "</b></div>",
        '<div class="card"><span>Baseado em</span><b>' +
          suggestionBasedOn +
          " batalha(s) semelhantes</b></div>",
        "</div>",
        '<div class="stack">',
        "<label>Tipo de tropa (define tempo)</label>",
        '<select id="nytrina-scanner-troop">' + groupedOptions + "</select>",
        "<label>Velocidade personalizada</label>",
        '<input id="nytrina-scanner-custom-speed" type="number" step="0.1" value="' +
          Number(settings.customSpeed || 14) +
          '">',
        '<label class="check-row"><input id="nytrina-scanner-small-map" type="checkbox"' +
          (settings.smallMap ? ' checked="checked"' : "") +
          ">Mapa pequeno na volta</label>",
        "</div>",
        '<div class="actions">',
        '<button id="nytrina-scan-now">Escanear agora</button>',
        '<button id="nytrina-import-report">Importar relatorio</button>',
        '<button id="nytrina-reset-current-calibration"' +
          (canResetCalibration ? "" : ' disabled="disabled"') +
          '>Reset calibração atual</button>',
        '<span class="hint">' +
          (usedLearning
            ? "Sugestão já usa aprendizado contínuo."
            : "Sem histórico suficiente. Importe relatórios para treinar a IA.") +
          "</span>",
        "</div>",
      ].join("");

      const scannerTroop = node.querySelector("#nytrina-scanner-troop");
      const scannerCustomSpeed = node.querySelector(
        "#nytrina-scanner-custom-speed",
      );
      const scannerSmallMap = node.querySelector("#nytrina-scanner-small-map");

      if (scannerSmallMap) {
        scannerSmallMap.checked = Boolean(settings.smallMap);
      }

      const updateCustomState = () => {
        if (!scannerCustomSpeed || !scannerTroop) return;
        scannerCustomSpeed.disabled = scannerTroop.value !== "custom";
      };
      updateCustomState();

      scannerTroop?.addEventListener("change", async () => {
        const troopType = String(scannerTroop.value || "hero");
        const inferredTribe = this.inferTribeByTroop(troopType);
        await this.saveSettings({
          troopType,
          troopTribe: inferredTribe || settings.troopTribe || "romans",
        });
        updateCustomState();
        await this.refresh();
      });

      scannerCustomSpeed?.addEventListener("change", async () => {
        await this.saveSettings({
          customSpeed: Number(scannerCustomSpeed.value || 14),
        });
        await this.refresh();
      });

      scannerSmallMap?.addEventListener("change", async () => {
        await this.saveSettings({
          smallMap: scannerSmallMap.checked === true,
        });

        this.scanner.lastSignature = "";
        await this.scanner.scanNow();
        await this.refresh();
      });
      node.querySelector("#nytrina-scan-now")?.addEventListener("click", () => {
        this.scanner.scanNow().then(() => this.refresh());
      });

      node
        .querySelector("#nytrina-reset-current-calibration")
        ?.addEventListener("click", async () => {
          if (!canResetCalibration) {
            root.Modal.show(
              "Calibração",
              "Selecione uma tropa real para resetar a calibração.",
            );
            return;
          }

          const confirmMessage =
            "Resetar calibração atual para " +
            selectedTribe +
            " / " +
            selectedTroopType.replace(/_/g, " ") +
            " (com e sem herói)?";

          if (!confirm(confirmMessage)) return;

          try {
            await root.BattleKnowledge.resetCalibration({
              storage: this.storage,
              tribe: selectedTribe,
              troopType: selectedTroopType,
              hasHero: true,
            });

            await root.BattleKnowledge.resetCalibration({
              storage: this.storage,
              tribe: selectedTribe,
              troopType: selectedTroopType,
              hasHero: false,
            });

            root.Modal.show(
              "Calibração",
              "Calibração resetada para o perfil atual (com e sem herói).",
            );

            await this.refresh();
          } catch (error) {
            console.error("ERRO AO RESETAR CALIBRAÇÃO:", error);
            root.Modal.show(
              "Erro",
              "Falha ao resetar calibração atual. Veja o console.",
            );
          }
        });

      node
        .querySelector("#nytrina-import-report")
        ?.addEventListener("click", async () => {
          console.log("CLICOU IMPORTAR");

          const report = root.ReportParser.parse({
            tribe: settings.troopTribe || "romans",
            troopType: settings.troopType || null,
          });

          if (!report) {
            root.Modal.show(
              "Relatorio",
              "Nenhum relatorio valido encontrado na tela.",
            );
            return;
          }

          await this.scanner.saveReport(report);

          console.log("ANTES DO BATTLE - ABA RELATORIOS");

          await root.BattleKnowledge.learnFromReport({
            storage: this.storage,
            report,
          });

          console.log("DEPOIS DO BATTLE - ABA RELATORIOS");

          root.Modal.show(
            "Relatorio",
            "Importado com sucesso. Coord: " +
              (report.coord || "-") +
              " | Lucro: " +
              Math.round(report.profit || 0),
          );

          await this.refresh();
        });
    }

    /**
     * @returns {Promise<void>}
     */
    async refreshRanking() {
      const node = this.panel("ranking");
      if (!node) return;
      const oasis = await this.storage.getAll(root.Constants.STORES.OASIS);
      const ranking = root.Ranking.buildRanking(oasis);

      const rankByXph = (xph) => {
        const value = Number(xph || 0);
        if (value >= 60)
          return { text: "★★★★★ 🟢 Vale muito", cls: "rank-good" };
        if (value >= 30) return { text: "★★★☆☆ 🟡 Medio", cls: "rank-mid" };
        return { text: "★☆☆☆☆ 🔴 Fraco", cls: "rank-bad" };
      };

      const formatDistance = (distance) => {
        const value = Number(distance || 0);
        if (!Number.isFinite(value) || value <= 0) return "-";
        if (value >= 100000) return "muito longe";
        if (value >= 1000) return value.toFixed(0);
        return value.toFixed(2).replace(/\.00$/, "");
      };

      node.innerHTML = [
        '<div class="actions"><button id="nytrina-ranking-clear">Limpar Ranking</button></div>',
        "<table><thead><tr><th>Nota</th><th>Coord</th><th>Dist</th><th>XP</th><th>XP/h</th><th>Tempo</th></tr></thead><tbody>",
        ranking
          .map((row) => {
            const rank = rankByXph(row.xph);
            return (
              '<tr><td class="' +
              rank.cls +
              '">' +
              rank.text +
              "</td><td>" +
              (row.coord || "-") +
              "</td><td>" +
              formatDistance(row.distance) +
              "</td><td>" +
              Math.round(row.xp || 0) +
              "</td><td>" +
              Math.round(row.xph || 0) +
              "</td><td>" +
              (row.time || "-") +
              "</td></tr>"
            );
          })
          .join(""),
        "</tbody></table>",
      ].join("");

      node
        .querySelector("#nytrina-ranking-clear")
        ?.addEventListener("click", async () => {
          if (!confirm("Deseja apagar todos os oásis do ranking?")) return;

          await this.storage.clear(root.Constants.STORES.OASIS);
          await this.refresh();
        });
    }

    /**
     * @returns {Promise<void>}
     */
    async refreshReports() {
      const node = this.panel("reports");
      if (!node) return;
      const reports = await this.storage.getAll(root.Constants.STORES.REPORTS);
      const settings = this.getSettings();
      const sortedReports = reports
        .slice()
        .sort((a, b) => {
          const right = new Date(b.date || b.updatedAt || 0).getTime();
          const left = new Date(a.date || a.updatedAt || 0).getTime();
          return right - left;
        });
      const reportsMeta = this.paginationMeta(
        sortedReports.length,
        this.reportsPage,
        this.reportsPerPage,
      );
      this.reportsPage = reportsMeta.page;
      const reportsPageRows = sortedReports.slice(reportsMeta.start, reportsMeta.end);

      node.innerHTML = [
        '<div class="actions"><button id="nytrina-import-report-tab">Importar relatorio atual</button><button id="nytrina-clear-reports">Limpar Relatórios</button></div>',
        "<table><thead><tr><th>Data/Hora</th><th>ID</th><th>Coord</th><th>XP</th><th>Rec.</th><th>Perda</th><th>Lucro</th></tr></thead><tbody>",
        reportsPageRows
          .map(
            (report) =>
              "<tr><td>" +
              this.formatDateTime(report.date || report.updatedAt) +
              "</td><td>" +
              report.reportId +
              "</td><td>" +
              (report.coord || "-") +
              "</td><td>" +
              Math.round(report.xp || 0) +
              "</td><td>" +
              Math.round(report.totalResources || 0) +
              "</td><td>" +
              Math.round(report.lossCost || 0) +
              "</td><td>" +
              Math.round(report.profit || 0) +
              "</td></tr>",
          )
          .join(""),
        "</tbody></table>",
        this.paginationControls("nytrina-reports-page", reportsMeta, sortedReports.length),
      ].join("");

      node.querySelector("#nytrina-reports-page-prev")?.addEventListener("click", async () => {
        this.reportsPage = Math.max(1, this.reportsPage - 1);
        await this.refreshReports();
      });

      node.querySelector("#nytrina-reports-page-next")?.addEventListener("click", async () => {
        this.reportsPage = this.reportsPage + 1;
        await this.refreshReports();
      });

      node
        .querySelector("#nytrina-import-report-tab")
        ?.addEventListener("click", async () => {
          console.error("RELATORIOS: BOTAO CLICADO");

          try {
            const report = root.ReportParser.parse({
              tribe: settings.troopTribe || "romans",
              troopType: settings.troopType || null,
            });

            if (!report) {
              root.Modal.show(
                "Relatorio",
                "Nenhum relatorio valido encontrado na tela.",
              );
              return;
            }

            console.log("RELATORIOS: REPORT GERADO", report);

            // Primeiro aprende, para identificarmos qualquer erro isoladamente.
            console.log("RELATORIOS: ANTES DO BATTLE");

            const learningResult = await root.BattleKnowledge.learnFromReport({
              storage: this.storage,
              report,
            });

            console.log("RELATORIOS: BATTLE SALVO", learningResult);

            // Depois salva o relatório normal.
            await this.scanner.saveReport(report);

            console.log("RELATORIOS: REPORT SALVO");

            root.Modal.show(
              "Relatorio",
              "Importado com sucesso. Coord: " +
                (report.coord || "-") +
                " | Lucro: " +
                Math.round(report.profit || 0),
            );

            await this.refresh();
          } catch (error) {
            console.error("ERRO AO IMPORTAR RELATORIO:", error);

            root.Modal.show(
              "Erro",
              "Falha ao importar ou aprender com o relatório. Veja o console.",
            );
          }
        });

      node
        .querySelector("#nytrina-clear-reports")
        ?.addEventListener("click", async () => {
          if (!confirm("Deseja apagar todos os relatórios?")) return;

          await this.storage.clear(root.Constants.STORES.REPORTS);
          await this.storage.clear(root.Constants.STORES.HISTORY);

          await this.refresh();
        });
    }

    /**
     * @returns {Promise<void>}
     */
    async refreshEconomy() {
      const node = this.panel("economy");
      if (!node) return;
      const reports = await this.storage.getAll(root.Constants.STORES.REPORTS);
      const summary = root.Economy.calculateSummary(reports);

      node.innerHTML = [
        '<div class="grid">',
        '<div class="card"><span>Lucro liquido</span><b>' +
          Math.round(summary.netProfit) +
          "</b></div>",
        '<div class="card"><span>Lucro/h</span><b>' +
          Math.round(summary.profitPerHour) +
          "</b></div>",
        '<div class="card"><span>Lucro/min</span><b>' +
          Math.round(summary.profitPerMinute) +
          "</b></div>",
        '<div class="card"><span>XP/h</span><b>' +
          Math.round(summary.xpPerHour) +
          "</b></div>",
        '<div class="card"><span>Recursos/h</span><b>' +
          Math.round(summary.resourcesPerHour) +
          "</b></div>",
        '<div class="card"><span>Perdas</span><b>' +
          Math.round(summary.losses) +
          "</b></div>",
        '<div class="card"><span>ROI</span><b>' +
          summary.roi.toFixed(2) +
          "</b></div>",
        "</div>",
      ].join("");
    }

    /**
     * @returns {Promise<void>}
     */
    async refreshSettings() {
      const node = this.panel("settings");
      if (!node) return;
      const settings = this.getSettings();
      const server = root.Server.getContext();
      const currentServerValue = String(settings.server || "auto");
      const manualServer =
        currentServerValue !== "auto" ? currentServerValue : "";
      const isManualInvalid = manualServer && !/travian\./i.test(manualServer);
      const groupedOptions = this.groupedTroopOptions(
        server.speed,
        settings.troopType || "hero",
      );

      const tribeOptions = this.tribeOptions()
        .map((item) => {
          const selected =
            item.value === settings.troopTribe ? " selected" : "";
          return (
            '<option value="' +
            item.value +
            '"' +
            selected +
            ">" +
            item.label +
            "</option>"
          );
        })
        .join("");

      node.innerHTML = [
        '<div class="server-badge">Servidor detectado: <b>' +
          server.host +
          "</b> (x" +
          server.speed +
          ")</div>",
        '<div class="form-grid">',
        '<div class="card"><span>Servidor</span><select id="nytrina-setting-server-mode"><option value="auto"' +
          (currentServerValue === "auto" ? " selected" : "") +
          '>Auto (detectar host)</option><option value="manual"' +
          (currentServerValue !== "auto" ? " selected" : "") +
          '>Manual</option></select><input id="nytrina-setting-server" value="' +
          manualServer +
          '" placeholder="ts8.x1.america.travian.com"></div>',
        '<div class="card"><span>Idioma</span><input id="nytrina-setting-language" value="' +
          settings.language +
          '"></div>',
        '<div class="card"><span>Tribo</span><select id="nytrina-setting-tribe">' +
          tribeOptions +
          "</select></div>",
        '<div class="card"><span>Tipo de tropa</span><select id="nytrina-setting-troop">' +
          groupedOptions +
          "</select></div>",
        '<div class="card"><span>Velocidade personalizada</span><input id="nytrina-setting-speed" type="number" step="0.1" value="' +
          Number(settings.customSpeed) +
          '"></div>',
        '<div class="card"><span>Mapa pequeno</span><label class="check-row"><input id="nytrina-setting-small-map" type="checkbox" ' +
          (settings.smallMap ? ' checked="checked"' : "") +
          ">Ativar volta reduzida</label></div>",
        "</div>",
        '<div id="nytrina-setting-server-warning" class="server-warning' +
          (isManualInvalid ? " show" : "") +
          '">Servidor manual invalido. Informe um host travian valido ou use Auto.</div>',
        '<div class="actions"><button id="nytrina-save-settings">Salvar</button><button id="nytrina-export-backup">Exportar Backup</button><button id="nytrina-import-backup">Importar Backup</button><input id="nytrina-import-backup-file" type="file" accept="application/json" style="display:none"></div>',
        "</div>",
      ].join("");

      const serverMode = node.querySelector("#nytrina-setting-server-mode");
      const serverInput = node.querySelector("#nytrina-setting-server");
      const tribeSelect = node.querySelector("#nytrina-setting-tribe");
      const troopSelect = node.querySelector("#nytrina-setting-troop");
      const speedInput = node.querySelector("#nytrina-setting-speed");
      const warning = node.querySelector("#nytrina-setting-server-warning");
      const smallMapInput = node.querySelector("#nytrina-setting-small-map");
      const exportBackupButton = node.querySelector("#nytrina-export-backup");
      const importBackupButton = node.querySelector("#nytrina-import-backup");
      const importBackupFile = node.querySelector("#nytrina-import-backup-file");

      if (smallMapInput) {
        smallMapInput.checked = Boolean(settings.smallMap);
      }
      smallMapInput?.addEventListener("change", async () => {
        await this.saveSettings({
          smallMap: smallMapInput.checked === true,
        });

        this.scanner.lastSignature = "";
        await this.refresh();
      });

      const syncServerField = () => {
        if (!serverMode || !serverInput || !warning) return;
        const manual = serverMode.value === "manual";
        serverInput.disabled = !manual;
        const invalid =
          manual && !/travian\./i.test(String(serverInput.value || ""));
        warning.classList.toggle("show", Boolean(invalid));
      };
      syncServerField();

      serverMode?.addEventListener("change", () => {
        syncServerField();
      });

      serverInput?.addEventListener("input", () => {
        syncServerField();
      });

      const syncCustomSpeedInput = () => {
        if (!troopSelect || !speedInput) return;
        speedInput.disabled = troopSelect.value !== "custom";
      };
      syncCustomSpeedInput();

      tribeSelect?.addEventListener("change", async () => {
        const nextTribe = String(tribeSelect.value || "romans");
        const currentTroop = String(troopSelect?.value || "hero");
        const inferred = this.inferTribeByTroop(currentTroop);
        const nextTroop =
          inferred && inferred !== nextTribe ? "hero" : currentTroop;
        await this.saveSettings({
          troopTribe: nextTribe,
          troopType: nextTroop,
        });
        await this.refresh();
      });

      troopSelect?.addEventListener("change", async () => {
        const troopType = String(troopSelect.value || "hero");
        const inferred = this.inferTribeByTroop(troopType);
        if (inferred) {
          await this.saveSettings({ troopType, troopTribe: inferred });
          if (tribeSelect) tribeSelect.value = inferred;
        } else {
          await this.saveSettings({ troopType });
        }
        syncCustomSpeedInput();
      });

      node
        .querySelector("#nytrina-save-settings")
        ?.addEventListener("click", async () => {
          console.log("[NytrinA] Clique no salvar");

          const payload = {
            server:
              String(
                node.querySelector("#nytrina-setting-server-mode")?.value ||
                  "auto",
              ) === "manual"
                ? String(
                    node.querySelector("#nytrina-setting-server")?.value || "",
                  ).trim()
                : "auto",

            troopType: String(
              node.querySelector("#nytrina-setting-troop")?.value || "hero",
            ),

            troopTribe: String(
              node.querySelector("#nytrina-setting-tribe")?.value || "romans",
            ),

            customSpeed: Number(
              node.querySelector("#nytrina-setting-speed")?.value || 14,
            ),

            smallMap:
              node.querySelector("#nytrina-setting-small-map")?.checked ===
              true,

            language: String(
              node.querySelector("#nytrina-setting-language")?.value || "pt-BR",
            ),
          };

          console.log("[NytrinA] Salvando payload:", payload);

          await this.saveSettings(payload);

          this.scanner.lastSignature = "";

          root.Modal.show("Configurações", "Configurações salvas com sucesso.");

          await this.refresh();
        });

      exportBackupButton?.addEventListener("click", async () => {
        try {
          const backup = await this.storage.exportBackup();
          const json = JSON.stringify(backup, null, 2);
          const blob = new Blob([json], { type: "application/json" });
          const now = new Date();
          const datePart =
            now.getFullYear() +
            "-" +
            String(now.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(now.getDate()).padStart(2, "0");
          const fileName = "NytrinA_Backup_" + datePart + ".json";
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          root.Modal.show("Backup", "Backup exportado com sucesso: " + fileName);
        } catch (error) {
          console.error("Falha ao exportar backup", error);
          root.Modal.show("Erro", "Falha ao exportar backup. Veja o console.");
        }
      });

      importBackupButton?.addEventListener("click", () => {
        importBackupFile?.click();
      });

      importBackupFile?.addEventListener("change", async (event) => {
        const input = event.target;
        const file = input?.files && input.files[0] ? input.files[0] : null;
        if (!file) return;

        try {
          const content = await file.text();
          const parsed = JSON.parse(content);

          if (!confirm("Importar backup irá substituir todos os dados atuais. Continuar?")) {
            input.value = "";
            return;
          }

          const result = await this.storage.importBackup(parsed);

          this.scanner.lastSignature = "";
          await this.refresh();

          root.Modal.show(
            "Backup",
            "Backup importado com sucesso. OASIS: " +
              Number(result?.OASIS || 0) +
              " | REPORTS: " +
              Number(result?.REPORTS || 0) +
              " | STATISTICS: " +
              Number(result?.STATISTICS || 0),
          );
        } catch (error) {
          console.error("Falha ao importar backup", error);
          root.Modal.show("Erro", "Falha ao importar backup JSON. Verifique o arquivo.");
        } finally {
          input.value = "";
        }
      });
    }

    /**
     * @returns {Promise<void>}
     */
    async refreshDebug() {
      const node = this.panel("debug");
      if (!node) return;

      if (!this.debugEnabled) {
        node.innerHTML = "Clique 5 vezes no título para habilitar debug.";
        return;
      }

      const stats = await this.storage.getAll(root.Constants.STORES.STATISTICS);
      const knowledgeRows = stats.filter((row) =>
        String(row?.id || "").startsWith("battleKnowledge:"),
      );

      const sortedKnowledgeRows = knowledgeRows
        .slice()
        .sort((a, b) => {
          const right = new Date(b.updatedAt || b.lastBattle?.date || 0).getTime();
          const left = new Date(a.updatedAt || a.lastBattle?.date || 0).getTime();
          if (right !== left) return right - left;
          return String(a.troopType).localeCompare(String(b.troopType));
        });

      const debugMeta = this.paginationMeta(
        sortedKnowledgeRows.length,
        this.debugPage,
        this.debugPerPage,
      );
      this.debugPage = debugMeta.page;
      const debugPageRows = sortedKnowledgeRows.slice(debugMeta.start, debugMeta.end);

      node.innerHTML = [
        '<div class="actions">',
        '<button id="nytrina-clear-knowledge">Limpar Battle Knowledge</button>',
        "</div>",

        '<div class="grid">',
        '<div class="card"><span>Conhecimentos</span><b>' +
          knowledgeRows.length +
          "</b></div>",
        '<div class="card"><span>Amostras</span><b>' +
          knowledgeRows.reduce((s, r) => s + Number(r.samples || 0), 0) +
          "</b></div>",
        "</div>",

        "<table><thead><tr>",
        "<th>Data/Hora</th><th>Tropa</th><th>XP</th><th>Amostras</th><th>Resultado</th><th>Enviadas</th><th>Mortas</th><th>Enfermaria</th><th>Baixas</th><th>Eliminação</th><th>Próxima sugestão</th>",
        "</tr></thead><tbody>",

        debugPageRows
          .map((row) => {
            const last = row.lastBattle || {};

            const outcomeLabels = {
              perfect: "Perfeito",
              cleared_with_losses: "Limpou com perdas",
              almost_cleared: "Quase limpou",
              partial: "Parcial",
              failure: "Falha",
            };

            return (
              "<tr><td>" +
              this.formatDateTime(row.updatedAt || last.date) +
              "</td><td>" +
              (row.troopType || "-") +
              "</td><td>" +
              Math.round(row.xp || 0) +
              "</td><td>" +
              Number(row.samples || 0) +
              "</td><td>" +
              (outcomeLabels[row.lastOutcome] || "-") +
              "</td><td>" +
              Number(last.sent || 0) +
              "</td><td>" +
              Number(last.lost || 0) +
              "</td><td>" +
              Number(last.wounded || 0) +
              "</td><td>" +
              Number(last.casualties || 0) +
              "</td><td>" +
              (Number(last.killRate || 0) * 100).toFixed(1) +
              "%</td><td>" +
              Number(row.estimatedSafe || last.estimatedSafe || 0) +
              "</td></tr>"
            );
          })
          .join(""),

        "</tbody></table>",
        this.paginationControls("nytrina-debug-page", debugMeta, sortedKnowledgeRows.length),
      ].join("");

      node.querySelector("#nytrina-debug-page-prev")?.addEventListener("click", async () => {
        this.debugPage = Math.max(1, this.debugPage - 1);
        await this.refreshDebug();
      });

      node.querySelector("#nytrina-debug-page-next")?.addEventListener("click", async () => {
        this.debugPage = this.debugPage + 1;
        await this.refreshDebug();
      });

      node
        .querySelector("#nytrina-clear-knowledge")
        ?.addEventListener("click", async () => {
          if (!confirm("Deseja apagar todo o Battle Knowledge?")) return;

          for (const row of knowledgeRows) {
            await this.storage.delete(root.Constants.STORES.STATISTICS, row.id);
          }

          await this.refresh();
        });
    }

    /**
     * @param {string|number|Date|null|undefined} value
     * @returns {string}
     */
    formatDateTime(value) {
      const date = new Date(value || 0);
      if (!Number.isFinite(date.getTime())) return "-";
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  root.Overlay = Overlay;
})(window);
