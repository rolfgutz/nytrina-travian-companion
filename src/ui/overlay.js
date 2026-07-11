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
      this.debugEnabled = false;
      this.overlay = null;
      this.titleClicks = 0;
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
      return [
        '<div class="head">',
        '<b id="nytrina-title">NytrinA Companion 4.0</b>',
        '<div class="actions"><button id="nytrina-toggle-minimize">Minimizar</button><button id="nytrina-refresh">Atualizar</button></div>',
        "</div>",
        '<div class="tabs">',
        '<button class="tab active" data-tab="dashboard">Dashboard</button>',
        '<button class="tab" data-tab="scanner">Scanner</button>',
        '<button class="tab" data-tab="ranking">Ranking</button>',
        '<button class="tab" data-tab="reports">Relatorios</button>',
        '<button class="tab" data-tab="economy">Economia</button>',
        '<button class="tab" data-tab="settings">Configuracoes</button>',
        '<button class="tab hidden" data-tab="debug" id="nytrina-debug-tab">Debug</button>',
        "</div>",
        '<div class="panel" data-panel="dashboard"></div>',
        '<div class="panel hidden" data-panel="scanner"></div>',
        '<div class="panel hidden" data-panel="ranking"></div>',
        '<div class="panel hidden" data-panel="reports"></div>',
        '<div class="panel hidden" data-panel="economy"></div>',
        '<div class="panel hidden" data-panel="settings"></div>',
        '<div class="panel hidden" data-panel="debug"></div>',
      ].join("");
    }

    /**
     * @returns {void}
     */
    bindEvents() {
      console.error("######## OVERLAY NOVO ########");
      this.overlay.querySelectorAll(".tab").forEach((button) => {
        button.addEventListener("click", () => {
          root.Tabs.activateTab(
            this.overlay,
            button.getAttribute("data-tab") || "dashboard",
          );
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
          if (this.titleClicks >= 5) {
            this.debugEnabled = true;
            this.overlay
              .querySelector("#nytrina-debug-tab")
              ?.classList.remove("hidden");
          }
        });
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
      let suggestionConfidence = "-";

      if (learnedAdvice?.ok) {
        suggestionText =
          Math.round(Number(learnedAdvice.suggestedTroops || 0)) +
          " " +
          this.troopLabel(selectedTroopType);

        suggestionSource = "Battle Knowledge";

        suggestionConfidence =
          Number(knowledge?.samples || 0) +
          (Number(knowledge?.samples || 0) === 1 ? " amostra" : " amostras");
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

        const withHeroSamples = Number(calibratedWithHero?.samples || 0);

        const withoutHeroSamples = Number(calibratedWithoutHero?.samples || 0);

        suggestionText =
          "Com herói: " + finalWithHero + " | Sem: " + finalWithoutHero;

        if (withHeroSamples > 0 || withoutHeroSamples > 0) {
          suggestionSource = "Cálculo ajustado pelo aprendizado";

          suggestionConfidence =
            "Com herói: " +
            withHeroSamples +
            " amostra(s) | Sem: " +
            withoutHeroSamples +
            " amostra(s)";
        } else {
          suggestionSource = "Cálculo teórico";
          suggestionConfidence = "Ainda sem calibração";
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

        '<div class="card"><span>Fonte</span><b>' +
          suggestionSource +
          "</b></div>",

        '<div class="card"><span>Confiança</span><b>' +
          suggestionConfidence +
          "</b></div>",
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

      node.innerHTML = [
        '<div class="actions"><button id="nytrina-import-report-tab">Importar relatorio atual</button><button id="nytrina-clear-reports">Limpar Relatórios</button></div>',
        "<table><thead><tr><th>ID</th><th>Coord</th><th>XP</th><th>Rec.</th><th>Perda</th><th>Lucro</th></tr></thead><tbody>",
        reports
          .slice()
          .reverse()
          .map(
            (report) =>
              "<tr><td>" +
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
      ].join("");

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
        '<div class="actions"><button id="nytrina-save-settings">Salvar</button></div>',
        "</div>",
      ].join("");

      const serverMode = node.querySelector("#nytrina-setting-server-mode");
      const serverInput = node.querySelector("#nytrina-setting-server");
      const tribeSelect = node.querySelector("#nytrina-setting-tribe");
      const troopSelect = node.querySelector("#nytrina-setting-troop");
      const speedInput = node.querySelector("#nytrina-setting-speed");
      const warning = node.querySelector("#nytrina-setting-server-warning");
      const smallMapInput = node.querySelector("#nytrina-setting-small-map");

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
        "<th>Tropa</th><th>XP</th><th>Amostras</th><th>Resultado</th><th>Enviadas</th><th>Mortas</th><th>Enfermaria</th><th>Baixas</th><th>Eliminação</th><th>Próxima sugestão</th>",
        "</tr></thead><tbody>",

        knowledgeRows
          .slice()
          .sort((a, b) =>
            String(a.troopType).localeCompare(String(b.troopType)),
          )
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
      ].join("");

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
  }

  root.Overlay = Overlay;
})(window);
