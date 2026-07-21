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
      this.lastStableCoord = null;
      this.lastStableSnapshot = null;
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
        '<button class="tab' + (activeTab === "debug" ? " active" : "") + '" data-tab="debug" id="nytrina-debug-tab">Debug</button>',
        '<button class="tab' + (activeTab === "dashboard" ? " active" : "") + '" data-tab="dashboard">Dashboard</button>',
        '<button class="tab' + (activeTab === "ranking" ? " active" : "") + '" data-tab="ranking">Ranking</button>',
        '<button class="tab' + (activeTab === "reports" ? " active" : "") + '" data-tab="reports">Relatorios</button>',
        '<button class="tab' + (activeTab === "economy" ? " active" : "") + '" data-tab="economy">Economia</button>',
        '<button class="tab' + (activeTab === "settings" ? " active" : "") + '" data-tab="settings">Configuracoes</button>',
        "</div>",
        '<div class="panel' + (activeTab === "scanner" ? "" : " hidden") + '" data-panel="scanner"></div>',
        '<div class="panel' + (activeTab === "debug" ? "" : " hidden") + '" data-panel="debug"></div>',
        '<div class="panel' + (activeTab === "dashboard" ? "" : " hidden") + '" data-panel="dashboard"></div>',
        '<div class="panel' + (activeTab === "ranking" ? "" : " hidden") + '" data-panel="ranking"></div>',
        '<div class="panel' + (activeTab === "reports" ? "" : " hidden") + '" data-panel="reports"></div>',
        '<div class="panel' + (activeTab === "economy" ? "" : " hidden") + '" data-panel="economy"></div>',
        '<div class="panel' + (activeTab === "settings" ? "" : " hidden") + '" data-panel="settings"></div>',
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

      const head = this.overlay.querySelector(".head");
      let dragging = false;
      let offsetX = 0;
      let offsetY = 0;

      const onMove = (event) => {
        if (!dragging) return;

        const width = this.overlay.offsetWidth;
        const height = this.overlay.offsetHeight;
        const maxLeft = Math.max(0, global.innerWidth - width);
        const maxTop = Math.max(0, global.innerHeight - height);

        const left = Math.min(Math.max(0, event.clientX - offsetX), maxLeft);
        const top = Math.min(Math.max(0, event.clientY - offsetY), maxTop);

        this.overlay.style.left = left + "px";
        this.overlay.style.top = top + "px";
        this.overlay.style.right = "auto";
      };

      const stopDrag = () => {
        if (!dragging) return;
        dragging = false;
        this.overlay.classList.remove("dragging");
        global.document.removeEventListener("mousemove", onMove);
        global.document.removeEventListener("mouseup", stopDrag);
      };

      head?.addEventListener("mousedown", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.closest("button")) return;

        const rect = this.overlay.getBoundingClientRect();
        dragging = true;
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        this.overlay.classList.add("dragging");

        global.document.addEventListener("mousemove", onMove);
        global.document.addEventListener("mouseup", stopDrag);
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
     * @returns {Promise<void>}
     */
    async clearLearningData() {
      const stats = await this.storage.getAll(root.Constants.STORES.STATISTICS);
      const learningRows = stats.filter((row) => {
        const id = String(row?.id || "");
        return (
          id.startsWith("battleKnowledge:") ||
          id.startsWith("battleCalibration:")
        );
      });

      for (const row of learningRows) {
        await this.storage.delete(root.Constants.STORES.STATISTICS, row.id);
      }
    }

    /**
     * @returns {Promise<{learned:number,skipped:number}>}
     */
    async rebuildLearningFromReports() {
      const reports = await this.storage.getAll(root.Constants.STORES.REPORTS);
      const settings = this.getSettings();
      const ordered = reports.slice().sort((a, b) => {
        const left = new Date(a.date || a.updatedAt || 0).getTime();
        const right = new Date(b.date || b.updatedAt || 0).getTime();
        return left - right;
      });

      let learned = 0;
      let skipped = 0;

      for (const report of ordered) {
        const result = await root.BattleKnowledge.learnFromReport({
          storage: this.storage,
          report: {
            ...report,
            tribe: report?.tribe || settings.troopTribe || "romans",
          },
        });

        if (result) {
          learned += 1;
        } else {
          skipped += 1;
        }
      }

      return {
        learned,
        skipped,
      };
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
     * @param {string} value
     * @returns {string}
     */
    compactTroopLabel(value) {
      const labels = {
        equites_caesaris: "Equites C.",
        equites_imperatoris: "Equites I.",
        equites_legati: "Equites L.",
        theutates_thunder: "Theutates",
        teutonic_knight: "Teutonic K.",
        fire_catapult: "Catapulta",
      };

      const key = String(value || "");
      return labels[key] || this.troopLabel(key);
    }

    /**
     * @returns {string}
     */
    suggestionCacheKey() {
      const host = String(root.Server.getContext().host || "default");
      return "nytrina:lastSuggestion:" + host;
    }

    /**
     * @returns {Array<any>}
     */
    loadSuggestionCache() {
      try {
        const raw = global.localStorage.getItem(this.suggestionCacheKey());
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        const normalizeList = (value) => {
          const list = Array.isArray(value) ? value : [];
          return list.filter((item) => {
            const coord = String(item?.coord || "").trim();
            return /^[+-]?\d+\|[+-]?\d+$/.test(coord);
          });
        };

        if (Array.isArray(parsed)) return normalizeList(parsed);
        if (Array.isArray(parsed?.items)) return normalizeList(parsed.items);
        if (parsed && typeof parsed === "object") return normalizeList([parsed]);
        return [];
      } catch (error) {
        console.warn("NytrinA: não foi possível ler cache de sugestão", error);
        return [];
      }
    }

    /**
     * @param {any} payload
     * @returns {void}
     */
    saveSuggestionCache(payload) {
      try {
        const currentList = this.loadSuggestionCache();
        const coord = String(payload?.coord || "").trim();
        if (!/^[+-]?\d+\|[+-]?\d+$/.test(coord)) {
          return;
        }

        const next = {
          ...(payload || {}),
          coord,
          updatedAt: new Date().toISOString(),
        };

        const sameKey = (item) => {
          return (
            String(item?.coord || "") === String(next.coord || "") &&
            String(item?.troopType || "") === String(next.troopType || "") &&
            String(item?.troopTribe || "") === String(next.troopTribe || "")
          );
        };

        const merged = [next, ...currentList.filter((item) => !sameKey(item))].slice(0, 120);

        global.localStorage.setItem(
          this.suggestionCacheKey(),
          JSON.stringify({ items: merged }),
        );
      } catch (error) {
        console.warn("NytrinA: não foi possível salvar cache de sugestão", error);
      }
    }

    /**
     * @returns {void}
     */
    clearSuggestionCache() {
      try {
        global.localStorage.removeItem(this.suggestionCacheKey());
      } catch (error) {
        console.warn("NytrinA: não foi possível limpar cache de sugestão", error);
      }
    }

    /**
     * @returns {string|null}
     */
    readRallyCoordFromForm() {
      const xInput = global.document.querySelector(
        'input[name="x"], input#x, input[data-name="x"]',
      );
      const yInput = global.document.querySelector(
        'input[name="y"], input#y, input[data-name="y"]',
      );

      const x = String(xInput?.value || "").trim();
      const y = String(yInput?.value || "").trim();

      if (!/^[+-]?\d+$/.test(x) || !/^[+-]?\d+$/.test(y)) return null;
      return String(Number(x)) + "|" + String(Number(y));
    }

    /**
     * @param {string} tribe
     * @param {string} troopType
     * @returns {string|null}
     */
    troopClassByType(tribe, troopType) {
      const maps = {
        romans: {
          legionnaire: "u1",
          praetorian: "u2",
          imperian: "u3",
          equites_legati: "u4",
          equites_imperatoris: "u5",
          equites_caesaris: "u6",
          ram: "u7",
          fire_catapult: "u8",
        },
        teutons: {
          clubman: "u11",
          spearman: "u12",
          axeman: "u13",
          scout: "u14",
          paladin: "u15",
          teutonic_knight: "u16",
          ram: "u17",
          fire_catapult: "u18",
        },
        gauls: {
          phalanx: "u21",
          swordsman: "u22",
          pathfinder: "u23",
          theutates_thunder: "u24",
          druidrider: "u25",
          haeduan: "u26",
          ram: "u27",
          fire_catapult: "u28",
        },
      };

      return maps[String(tribe || "romans")]?.[String(troopType || "")] || null;
    }

    /**
     * @returns {boolean}
     */
    isHeroEnabledInRallyForm() {
      const checked = global.document.querySelector(
        'input[type="checkbox"][name*="hero"]:checked, input[type="checkbox"][id*="hero"]:checked',
      );

      if (checked) return true;

      const select = global.document.querySelector(
        'select[name*="hero"], select[id*="hero"]',
      );

      if (!select) return false;

      const value = String(select.value || "").toLowerCase();
      return value === "1" || value === "true" || value === "on" || value === "yes";
    }

    /**
     * @param {string} troopClass
     * @returns {HTMLInputElement|null}
     */
    findTroopInputByClass(troopClass) {
      const cls = String(troopClass || "").trim();
      if (!/^u\d+$/.test(cls)) return null;

      const icons = Array.from(
        global.document.querySelectorAll("img.unit." + cls + ", .unit." + cls),
      );

      for (const icon of icons) {
        const root = icon.closest("tr, li, td, div") || icon.parentElement;
        if (!root) continue;

        const directInput = root.querySelector(
          'input[type="number"], input[type="text"]',
        );

        if (
          directInput &&
          directInput instanceof HTMLInputElement &&
          !directInput.disabled &&
          !directInput.readOnly
        ) {
          return directInput;
        }

        const row = icon.closest("tr");
        const rowInput = row?.querySelector('input[type="number"], input[type="text"]');

        if (
          rowInput &&
          rowInput instanceof HTMLInputElement &&
          !rowInput.disabled &&
          !rowInput.readOnly
        ) {
          return rowInput;
        }
      }

      const numericClass = Number(cls.replace("u", ""));
      const slot = ((numericClass - 1) % 10) + 1;
      const fallbackSelectors = [
        'input[name="t' + slot + '"]',
        'input[name*="[t' + slot + ']"]',
        'input[id$="t' + slot + '"]',
        'input[id*="_t' + slot + '"]',
      ];

      for (const selector of fallbackSelectors) {
        const candidate = global.document.querySelector(selector);
        if (
          candidate &&
          candidate instanceof HTMLInputElement &&
          !candidate.disabled &&
          !candidate.readOnly
        ) {
          return candidate;
        }
      }

      return null;
    }

    /**
     * @param {HTMLInputElement} input
     * @returns {void}
     */
    ensureManualEditGuard(input) {
      if (!input || input.dataset.nytrinaGuardBound === "1") return;

      input.addEventListener("input", () => {
        if (input.dataset.nytrinaApplying === "1") return;
        input.dataset.nytrinaPrefilled = "0";
      });

      input.dataset.nytrinaGuardBound = "1";
    }

    /**
     * @param {{rallyCoord:string|null,selectedTribe:string,selectedTroopType:string,withHeroSuggestion:string,withoutHeroSuggestion:string}} params
     * @returns {{applied:boolean,value:number,reason:string}}
     */
    autoFillTroopSuggestedValue(params) {
      const rallyCoord = String(params?.rallyCoord || "").trim();
      const selectedTribe = String(params?.selectedTribe || "").trim();
      const selectedTroopType = String(params?.selectedTroopType || "").trim();
      const withHeroSuggestion = Number(params?.withHeroSuggestion || 0);
      const withoutHeroSuggestion = Number(params?.withoutHeroSuggestion || 0);

      if (!rallyCoord) {
        return { applied: false, value: 0, reason: "sem-alvo" };
      }

      if (!selectedTroopType || selectedTroopType === "hero" || selectedTroopType === "custom") {
        return { applied: false, value: 0, reason: "perfil-invalido" };
      }

      const troopClass = this.troopClassByType(selectedTribe, selectedTroopType);
      if (!troopClass) {
        return { applied: false, value: 0, reason: "classe-nao-encontrada" };
      }

      const input = this.findTroopInputByClass(troopClass);
      if (!input) {
        return { applied: false, value: 0, reason: "campo-nao-encontrado" };
      }

      this.ensureManualEditGuard(input);

      const hasHero = this.isHeroEnabledInRallyForm();
      let suggested = hasHero ? withHeroSuggestion : withoutHeroSuggestion;

      if (!Number.isFinite(suggested) || suggested <= 0) {
        suggested = Math.max(withHeroSuggestion, withoutHeroSuggestion, 0);
      }

      suggested = Math.round(Number(suggested || 0));
      if (!Number.isFinite(suggested) || suggested <= 0) {
        return { applied: false, value: 0, reason: "sem-valor-sugerido" };
      }

      const stamp =
        rallyCoord +
        "|" +
        selectedTribe +
        "|" +
        selectedTroopType +
        "|" +
        String(suggested);

      const currentRaw = String(input.value || "").trim();
      const current = Number(currentRaw || 0);
      const wasAutoFilled = input.dataset.nytrinaPrefilled === "1";
      const previousStamp = String(input.dataset.nytrinaPrefillStamp || "");

      const shouldFill =
        !currentRaw ||
        current <= 0 ||
        (wasAutoFilled && previousStamp !== stamp);

      if (!shouldFill) {
        return { applied: false, value: suggested, reason: "mantido-manual" };
      }

      input.dataset.nytrinaApplying = "1";
      input.value = String(suggested);
      input.dataset.nytrinaPrefilled = "1";
      input.dataset.nytrinaPrefillStamp = stamp;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      input.dataset.nytrinaApplying = "0";

      return { applied: true, value: suggested, reason: "preenchido" };
    }

    /**
     * @param {Array<any>} cachedSuggestions
     * @param {string} selectedTribe
     * @param {string} selectedTroopType
     * @returns {any|null}
     */
    findBestCachedSuggestion(
      cachedSuggestions,
      selectedTribe,
      selectedTroopType,
      preferredCoord,
    ) {
      const list = Array.isArray(cachedSuggestions) ? cachedSuggestions : [];
      if (!list.length) return null;

      const sameProfile = list.filter(
        (item) =>
          String(item?.troopType || "") === String(selectedTroopType || "") &&
          String(item?.troopTribe || "") === String(selectedTribe || "") &&
          /^[+-]?\d+\|[+-]?\d+$/.test(String(item?.coord || "").trim()),
      );

      if (!sameProfile.length) return null;

      const preferred = String(preferredCoord || "").trim();
      if (preferred) {
        const exact = sameProfile.find(
          (item) => String(item?.coord || "") === preferred,
        );
        if (exact) return exact;
      }

      const nonTooltip = sameProfile.find(
        (item) => String(item?.coordSource || "") !== "tooltip",
      );

      return nonTooltip || sameProfile[0] || null;
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
      let parsed = await this.scanner.scanNow();

      const groupedOptions = this.groupedTroopOptions(
        server.speed,
        settings.troopType || "hero",
      );

      let knowledge = null;
      let learnedAdvice = null;

      const selectedTroopType = settings.troopType || "hero";
      const selectedTribe =
        settings.troopTribe ||
        this.inferTribeByTroop(selectedTroopType) ||
        "romans";
      const canResetCalibration =
        selectedTroopType !== "hero" && selectedTroopType !== "custom";
      const rallyCoord = this.readRallyCoordFromForm();

      const incomingCoordSource = String(
        parsed?.coordSource || parsed?.source || "none",
      );

      if (
        !rallyCoord &&
        parsed?.coord &&
        incomingCoordSource &&
        incomingCoordSource !== "tooltip"
      ) {
        this.lastStableCoord = String(parsed.coord);
        this.lastStableSnapshot = {
          ...parsed,
          coord: this.lastStableCoord,
          coordSource: incomingCoordSource,
        };
      }

      if (
        !rallyCoord &&
        parsed?.coord &&
        incomingCoordSource === "tooltip" &&
        this.lastStableCoord
      ) {
        const stableFromStore = await this.storage.get(
          root.Constants.STORES.OASIS,
          String(this.lastStableCoord),
        );

        if (stableFromStore?.animals) {
          parsed = {
            ...stableFromStore,
            coord: String(this.lastStableCoord),
            coordSource: String(stableFromStore.coordSource || "stable-lock"),
          };
        } else if (this.lastStableSnapshot?.animals) {
          parsed = {
            ...this.lastStableSnapshot,
            coord: String(this.lastStableCoord),
            coordSource: "stable-lock",
          };
        }
      }

      this.currentScan = parsed;

      // Na tela de envio, fixa a leitura no alvo informado (x|y) para evitar
      // que tooltip/hover de outro oásis troque a sugestão exibida.
      if (rallyCoord && String(parsed?.coord || "") !== String(rallyCoord)) {
        parsed = null;
      }

      // Se existir alvo x|y no formulário, tenta resolver diretamente os dados
      // do alvo para evitar oscilações quando há várias abas/hovers ativos.
      if (rallyCoord && (!parsed || String(parsed.coord || "") !== String(rallyCoord))) {
        const lockedOasis = await this.storage.get(
          root.Constants.STORES.OASIS,
          String(rallyCoord),
        );

        if (lockedOasis && lockedOasis.animals) {
          parsed = {
            ...lockedOasis,
            coord: String(rallyCoord),
            coordSource: String(lockedOasis.coordSource || "locked-storage"),
          };
        }
      }

      const formulaAdvice = root.BattleAdvisor?.recommend({
        animals: parsed?.animals || {},
        troopType: settings.troopType || "hero",
        hero: true,
      });

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
      let confidenceSafetyText = "-";
      let withHeroSuggestion = "-";
      let withoutHeroSuggestion = "-";
      let usedLearning = false;
      const cachedSuggestions = this.loadSuggestionCache();

      const formatScannerXph = (value) => {
        const number = Number(value || 0);
        if (!Number.isFinite(number) || number <= 0) return "0";
        if (number >= 10) return String(Math.round(number));
        if (number >= 1) return number.toFixed(1);
        return number.toFixed(3);
      };

      if (learnedAdvice?.ok) {
        const learned = Math.round(Number(learnedAdvice.suggestedTroops || 0));
        const fallbackWithHero = Math.round(
          Number(
            calibratedWithHero?.troops || formulaAdvice?.withHero?.safeTroops || 0,
          ),
        );
        const fallbackWithoutHero = Math.round(
          Number(
            calibratedWithoutHero?.troops || formulaAdvice?.withoutHero?.safeTroops || 0,
          ),
        );
        const exactSamples = Number(knowledge?.samples || 0);
        const exactOutcome = String(
          knowledge?.lastOutcome || knowledge?.lastBattle?.outcome || "",
        );
        const canTrustExactKnowledge =
          exactSamples >= 2 || exactOutcome === "perfect";

        const finalWithHero = Math.max(learned, fallbackWithHero || 0);
        const finalWithoutHero = Math.max(learned, fallbackWithoutHero || 0);

        usedLearning = true;
        withHeroSuggestion = String(finalWithHero || learned);
        withoutHeroSuggestion = String(finalWithoutHero || learned);
        suggestionText =
          "Com herói: " +
          withHeroSuggestion +
          " | Sem herói: " +
          withoutHeroSuggestion;
        suggestionSource = canTrustExactKnowledge
          ? "IA Aprendida"
          : "Cálculo ajustado pelo aprendizado";

        suggestionBasedOn = exactSamples;
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

        if (!canTrustExactKnowledge) {
          suggestionConfidence += " | memória exata ainda fraca";
        }
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

        const heroSafetyPct = Math.max(
          0,
          Math.round(
            (Number(calibratedWithHero?.confidenceSafetyMultiplier || 1) - 1) * 100,
          ),
        );
        const noHeroSafetyPct = Math.max(
          0,
          Math.round(
            (Number(calibratedWithoutHero?.confidenceSafetyMultiplier || 1) - 1) *
              100,
          ),
        );

        confidenceSafetyText =
          "Hero: +" + heroSafetyPct + "% | Sem: +" + noHeroSafetyPct + "%";

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

      const parsedCoordSource = String(parsed?.coordSource || parsed?.source || "none");
      const canPersistCurrentScan =
        parsed?.coord &&
        parsedCoordSource !== "tooltip" &&
        (!rallyCoord || String(parsed.coord) === String(rallyCoord));

      if (
        canPersistCurrentScan &&
        (withHeroSuggestion !== "-" || withoutHeroSuggestion !== "-")
      ) {
        this.saveSuggestionCache({
          troopType: selectedTroopType,
          troopTribe: selectedTribe,
          coord: String(parsed?.coord || "").trim(),
          distance: parsed?.distance || "-",
          xp: parsed?.xp || 0,
          xph: parsed?.xph || 0,
          time: parsed?.time || "-",
          suggestionText,
          suggestionSource,
          suggestionConfidence,
          suggestionStars,
          suggestionBasedOn,
          learnedFactorText,
          confidenceSafetyText,
          withHeroSuggestion,
          withoutHeroSuggestion,
          coordSource: parsedCoordSource,
        });
      }

      const cachedSuggestion = this.findBestCachedSuggestion(
        cachedSuggestions,
        selectedTribe,
        selectedTroopType,
        rallyCoord || this.lastStableCoord || parsed?.coord || "",
      );
      const sameProfileCache = Boolean(cachedSuggestion);

      if (!parsed && sameProfileCache) {
        suggestionText = String(cachedSuggestion.suggestionText || suggestionText);
        suggestionSource =
          String(cachedSuggestion.suggestionSource || "Cálculo salvo") +
          " (última leitura)";
        suggestionConfidence = String(
          cachedSuggestion.suggestionConfidence || suggestionConfidence,
        );
        suggestionStars = String(cachedSuggestion.suggestionStars || suggestionStars);
        suggestionBasedOn = Number(cachedSuggestion.suggestionBasedOn || suggestionBasedOn || 0);
        learnedFactorText = String(cachedSuggestion.learnedFactorText || learnedFactorText);
        confidenceSafetyText = String(
          cachedSuggestion.confidenceSafetyText || confidenceSafetyText,
        );
        withHeroSuggestion = String(cachedSuggestion.withHeroSuggestion || withHeroSuggestion);
        withoutHeroSuggestion = String(cachedSuggestion.withoutHeroSuggestion || withoutHeroSuggestion);
      }

      const isMapPage = /karte\.php/i.test(String(global.location.pathname || ""));

      if (!parsed && !sameProfileCache && isMapPage) {
        suggestionText = "Oásis vazio: envie o que quiser.";
        withHeroSuggestion = "Livre";
        withoutHeroSuggestion = "Livre";
        suggestionSource = "Sem animais detectados";
        suggestionConfidence = "-";
        suggestionStars = "☆☆☆☆☆";
        suggestionBasedOn = 0;
        learnedFactorText = "x1.00";
        confidenceSafetyText = "-";
      }

      const displayCoord =
        parsed?.coord || (sameProfileCache ? cachedSuggestion?.coord : null) || "-";
      const displayDistance =
        parsed?.distance || (sameProfileCache ? cachedSuggestion?.distance : null) || "-";
      const displayXp = Number(
        parsed?.xp || (sameProfileCache ? cachedSuggestion?.xp : 0) || 0,
      );
      const displayXph = Number(
        parsed?.xph || (sameProfileCache ? cachedSuggestion?.xph : 0) || 0,
      );
      const displayTime =
        parsed?.time || (sameProfileCache ? cachedSuggestion?.time : null) || "-";

      this.autoFillTroopSuggestedValue({
        rallyCoord,
        selectedTribe,
        selectedTroopType,
        withHeroSuggestion,
        withoutHeroSuggestion,
      });

      const lockedTargetDisplay = rallyCoord
        ? '<div class="card" style="background: #3d5a2a; border-color: #6b9f35;"><span>Alvo travado</span><b>' + rallyCoord + '</b></div>'
        : '';

      node.innerHTML = [
        '<div class="scanner-controls">',
        lockedTargetDisplay,
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
        '<div class="actions scanner-actions">',
        '<button id="nytrina-import-report">Importar relatorio</button>',
        '<button id="nytrina-scan-now">Escanear agora</button>',
        '<button id="nytrina-clear-suggestion-cache">Limpar cache sugestão</button>',
        '<button id="nytrina-reset-current-calibration"' +
          (canResetCalibration ? "" : ' disabled="disabled"') +
          '>Reset calibração atual</button>',
        '<span class="hint">' +
          (usedLearning
            ? "Sugestão já usa aprendizado contínuo."
            : "Sem histórico suficiente. Importe relatórios para treinar a IA.") +
          "</span>",
        "</div>",
        "</div>",
        '<div class="grid scanner-summary">',
        '<div class="card"><span>Coord</span><b>' +
          displayCoord +
          "</b></div>",
        '<div class="card"><span>Distancia</span><b>' +
          displayDistance +
          "</b></div>",
        '<div class="card"><span>XP</span><b>' +
          displayXp +
          "</b></div>",
        '<div class="card"><span>XP/h</span><b>' +
          formatScannerXph(displayXph) +
          "</b></div>",
        '<div class="card"><span>Tempo ida</span><b>' +
          displayTime +
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
        '<div class="card"><span>Margem confiança</span><b>' +
          confidenceSafetyText +
          "</b></div>",
        '<div class="card"><span>Baseado em</span><b>' +
          suggestionBasedOn +
          " batalha(s) semelhantes</b></div>",
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
        .querySelector("#nytrina-clear-suggestion-cache")
        ?.addEventListener("click", async () => {
          if (!confirm("Limpar cache local de sugestões salvas?")) return;

          this.clearSuggestionCache();
          this.lastStableCoord = null;
          this.lastStableSnapshot = null;
          this.scanner.lastSignature = "";

          root.Modal.show(
            "Scanner",
            "Cache de sugestões limpo com sucesso.",
          );

          await this.refresh();
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

          const learningResult = await root.BattleKnowledge.learnFromReport({
            storage: this.storage,
            report,
          });

          console.log("DEPOIS DO BATTLE - ABA RELATORIOS");

          if (learningResult) {
            root.Modal.show(
              "Relatorio",
              "Importado e aprendido com sucesso. Coord: " +
                (report.coord || "-") +
                " | Lucro: " +
                Math.round(report.profit || 0),
            );
          } else {
            root.Modal.show(
              "Relatorio",
              "Relatório salvo, mas sem dados suficientes para aprendizado automático (tipo de tropa/quantidade enviada).",
            );
          }

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
      const recentReports = sortedReports.slice(0, 50);
      const reportsMeta = this.paginationMeta(
        recentReports.length,
        this.reportsPage,
        this.reportsPerPage,
      );
      this.reportsPage = reportsMeta.page;
      const reportsPageRows = recentReports.slice(reportsMeta.start, reportsMeta.end);

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
        this.paginationControls("nytrina-reports-page", reportsMeta, recentReports.length),
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

            if (learningResult) {
              root.Modal.show(
                "Relatorio",
                "Importado e aprendido com sucesso. Coord: " +
                  (report.coord || "-") +
                  " | Lucro: " +
                  Math.round(report.profit || 0),
              );
            } else {
              root.Modal.show(
                "Relatorio",
                "Relatório salvo, mas sem dados suficientes para aprendizado automático (tipo de tropa/quantidade enviada).",
              );
            }

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
          const reportCount = Number(
            backup?.counts?.REPORTS || backup?.reports?.length || 0,
          );
          const historyCount = Number(
            backup?.counts?.HISTORY || backup?.history?.length || 0,
          );
          const statisticsCount = Number(
            backup?.counts?.STATISTICS || backup?.statistics?.length || 0,
          );

          const appearsEmpty =
            reportCount <= 0 && historyCount <= 0 && statisticsCount <= 0;

          if (appearsEmpty) {
            const proceed = confirm(
              "Atenção: este backup parece vazio para REPORTS/HISTORY/STATISTICS.\n\n" +
                "Host atual: " +
                String(root.Server.getContext().host || "-") +
                "\n\n" +
                "Deseja exportar mesmo assim?",
            );
            if (!proceed) return;
          }

          const json = JSON.stringify(backup, null, 2);
          const blob = new Blob([json], { type: "application/json" });
          const serverHost = String(root.Server.getContext().host || "servidor");
          const safeServerHost = serverHost.replace(/[^a-zA-Z0-9.-]+/g, "_");
          const fileName = "Exportar_" + safeServerHost + ".json";
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          root.Modal.show(
            "Backup",
            "Backup exportado: " +
              fileName +
              " | REPORTS: " +
              reportCount +
              " | HISTORY: " +
              historyCount +
              " | STATISTICS: " +
              statisticsCount,
          );
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

          const reportCount = Number(
            parsed?.counts?.REPORTS || parsed?.reports?.length || 0,
          );
          const historyCount = Number(
            parsed?.counts?.HISTORY || parsed?.history?.length || 0,
          );
          const statisticsCount = Number(
            parsed?.counts?.STATISTICS || parsed?.statistics?.length || 0,
          );

          const appearsEmpty =
            reportCount <= 0 && historyCount <= 0 && statisticsCount <= 0;

          if (appearsEmpty) {
            const confirmEmpty = confirm(
              "Atenção: este backup parece vazio para REPORTS/HISTORY/STATISTICS.\n\n" +
                "Importar isso pode apagar seu histórico atual.\n\n" +
                "Deseja continuar mesmo assim?",
            );
            if (!confirmEmpty) {
              input.value = "";
              return;
            }
          }

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
      const recentKnowledgeRows = sortedKnowledgeRows.slice(0, 50);

      const debugMeta = this.paginationMeta(
        recentKnowledgeRows.length,
        this.debugPage,
        this.debugPerPage,
      );
      this.debugPage = debugMeta.page;
      const debugPageRows = recentKnowledgeRows.slice(debugMeta.start, debugMeta.end);

      node.innerHTML = [
        '<div class="actions">',
        '<button id="nytrina-clear-knowledge">Limpar Battle Knowledge</button>',
        '<button id="nytrina-rebuild-knowledge">Reconstruir via Relatórios</button>',
        "</div>",

        '<div class="grid">',
        '<div class="card"><span>Conhecimentos (últimos 50)</span><b>' +
          recentKnowledgeRows.length +
          "</b></div>",
        '<div class="card"><span>Amostras (últimos 50)</span><b>' +
          recentKnowledgeRows.reduce((s, r) => s + Number(r.samples || 0), 0) +
          "</b></div>",
        "</div>",

        '<div class="table-scroll">',
        '<table class="debug-table"><thead><tr>',
        "<th>Data/Hora</th><th>Tropa</th><th>Enviadas</th><th>Sugestão</th><th>Acerto</th><th>Baixas</th><th>% Baixas</th><th>Mortas</th><th>Enfermaria</th><th>Resultado</th><th>XP</th><th>Amostras</th>",
        "</tr></thead><tbody>",

        debugPageRows
          .map((row) => {
            const last = row.lastBattle || {};
            const sent = Number(last.sent || 0);
            const lost = Number(last.lost || 0);
            const wounded = Number(last.wounded || 0);
            const casualties = Number(last.casualties || 0);
            const killRate = Number(last.killRate || 0) * 100;
            const casualtyRate = Number(last.troopCasualtyRate || 0) * 100;
            const suggested = Number(
              row.estimatedSafe || last.estimatedSafe || row.minSuccess || 0,
            );

            const outcomeLabels = {
              perfect: "Perfeito",
              cleared_with_losses: "Limpou com perdas",
              almost_cleared: "Quase limpou",
              partial: "Parcial",
              failure: "Falha",
            };

            return (
              "<tr><td>" +
              '<span class="debug-col-datetime">' +
              this.formatDateTimeFull(row.updatedAt || last.date) +
              "</span>" +
              "</td><td>" +
              '<span class="debug-col-troop">' +
              this.compactTroopLabel(row.troopType || "-") +
              "</span>" +
              "</td><td>" +
              sent +
              "</td><td>" +
              (suggested > 0 ? suggested : "-") +
              "</td><td>" +
              killRate.toFixed(1) +
              "%" +
              "</td><td>" +
              casualties +
              "</td><td>" +
              casualtyRate.toFixed(1) +
              "%</td><td>" +
              lost +
              "</td><td>" +
              wounded +
              "</td><td>" +
              '<span class="debug-col-result">' +
              (outcomeLabels[row.lastOutcome] || "-") +
              "</span>" +
              "</td><td>" +
              Math.round(row.xp || 0) +
              "</td><td>" +
              Number(row.samples || 0) +
              "</td></tr>"
            );
          })
          .join(""),

        "</tbody></table>",
        "</div>",
        this.paginationControls("nytrina-debug-page", debugMeta, recentKnowledgeRows.length),
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

      node
        .querySelector("#nytrina-rebuild-knowledge")
        ?.addEventListener("click", async () => {
          const confirmed = confirm(
            "Reconstruir aprendizado irá limpar o conhecimento atual e reaprender usando os relatórios salvos. Continuar?",
          );

          if (!confirmed) return;

          await this.clearLearningData();
          const result = await this.rebuildLearningFromReports();

          root.Modal.show(
            "Debug",
            "Reconstrução concluída. Aprendidos: " +
              Number(result?.learned || 0) +
              " | Ignorados: " +
              Number(result?.skipped || 0),
          );

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

    /**
     * @param {string|number|Date|null|undefined} value
     * @returns {string}
     */
    formatDateTimeFull(value) {
      const date = new Date(value || 0);
      if (!Number.isFinite(date.getTime())) return "-";
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }
  }

  root.Overlay = Overlay;
})(window);
