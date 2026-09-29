(function attachStylesNamespace(global) {
  'use strict';
  const root = (global.NytrinA = global.NytrinA || {});
  root.UI_STYLES = "#nytrina-overlay,\r\n#nytrina-toasts {\r\n  --nyt-bg: #100c08;\r\n  --nyt-bg-top: #1a130e;\r\n  --nyt-surface: #28190d;\r\n  --nyt-surface-2: #1d1209;\r\n  --nyt-border: #6e4518;\r\n  --nyt-accent: #c9892a;\r\n  --nyt-accent-strong: #ffcf75;\r\n  --nyt-text: #f7ebd7;\r\n  --nyt-text-muted: #d0ad7b;\r\n  --nyt-heading: #ffd79b;\r\n  --nyt-ok: #7ddc7d;\r\n  --nyt-warn: #ffd26a;\r\n  --nyt-bad: #ff7d7d;\r\n}\r\n\r\n#nytrina-overlay {\r\n  position: fixed;\r\n  top: 70px;\r\n  right: 16px;\r\n  width: 520px;\r\n  max-width: calc(100vw - 24px);\r\n  max-height: 88vh;\r\n  overflow: auto;\r\n  z-index: 999999;\r\n  background: linear-gradient(180deg, var(--nyt-bg-top), var(--nyt-bg));\r\n  color: var(--nyt-text);\r\n  border: 2px solid #b97822;\r\n  border-radius: 12px;\r\n  box-shadow: 0 0 24px rgba(0, 0, 0, 0.8);\r\n  font-family: Verdana, sans-serif;\r\n  font-size: 13px;\r\n}\r\n\r\n#nytrina-overlay * {\r\n  box-sizing: border-box;\r\n}\r\n\r\n#nytrina-overlay .head {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 10px 12px;\r\n  background: #25170d;\r\n  border-bottom: 1px solid #6e4518;\r\n  cursor: grab;\r\n  user-select: none;\r\n}\r\n\r\n#nytrina-overlay.dragging .head {\r\n  cursor: grabbing;\r\n}\r\n\r\n#nytrina-overlay .tabs {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 4px;\r\n  padding: 10px;\r\n}\r\n\r\n#nytrina-overlay .planner-steps-scroll {\r\n  max-height: 420px;\r\n  overflow: auto;\r\n}\r\n\r\n#nytrina-overlay .nytrina-planner-first-pending td {\r\n  background: linear-gradient(180deg, #4a2e10, #32200d);\r\n  border-top-color: #f4bf63;\r\n  border-bottom-color: #f4bf63;\r\n}\r\n\r\n#nytrina-overlay .nytrina-planner-first-pending td:first-child {\r\n  box-shadow: inset 3px 0 0 #ffcf75;\r\n}\r\n\r\n#nytrina-overlay .tab {\r\n  flex: 1 1 auto;\r\n  background: #23170d;\r\n  color: #d8bc91;\r\n  border: 1px solid #7a4c1a;\r\n  border-radius: 6px;\r\n  padding: 6px 8px;\r\n  cursor: pointer;\r\n}\r\n\r\n#nytrina-overlay .tab:hover {\r\n  background: #3a230f;\r\n  color: #ffe0ad;\r\n}\r\n\r\n#nytrina-overlay .tab-secondary {\r\n  flex: 0 0 auto;\r\n  opacity: 0.75;\r\n}\r\n\r\n#nytrina-overlay .tab.active {\r\n  background: #5a350f;\r\n  color: #ffe0ad;\r\n  border-color: var(--nyt-accent);\r\n  font-weight: bold;\r\n  opacity: 1;\r\n}\r\n\r\n#nytrina-overlay .panel {\r\n  padding: 10px;\r\n}\r\n\r\n#nytrina-overlay .hidden {\r\n  display: none;\r\n}\r\n\r\n#nytrina-overlay .grid {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  gap: 8px;\r\n}\r\n\r\n#nytrina-overlay .grid-3 {\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n}\r\n\r\n#nytrina-overlay .section-title {\r\n  margin: 12px 0 6px;\r\n  color: var(--nyt-heading);\r\n  font-size: 11px;\r\n  font-weight: bold;\r\n  letter-spacing: 0.06em;\r\n  text-transform: uppercase;\r\n}\r\n\r\n#nytrina-overlay .section-title:first-child {\r\n  margin-top: 0;\r\n}\r\n\r\n#nytrina-overlay .hint {\r\n  margin-top: 4px;\r\n  color: var(--nyt-text-muted);\r\n  font-size: 11px;\r\n  line-height: 1.4;\r\n}\r\n\r\n#nytrina-overlay .inline-label {\r\n  display: flex;\r\n  flex: 1 1 auto;\r\n  align-items: center;\r\n  gap: 6px;\r\n  margin-top: 0;\r\n}\r\n\r\n#nytrina-overlay .inline-label select {\r\n  width: auto;\r\n  flex: 1 1 auto;\r\n  margin-top: 0;\r\n}\r\n\r\n#nytrina-overlay .scanner-primary {\r\n  display: grid;\r\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);\r\n  gap: 8px;\r\n  margin-bottom: 8px;\r\n}\r\n\r\n#nytrina-overlay .scanner-primary > div {\r\n  border: 1px solid var(--nyt-accent);\r\n  border-radius: 8px;\r\n  padding: 10px;\r\n  background: linear-gradient(180deg, #3a2410, #28190d);\r\n}\r\n\r\n#nytrina-overlay .scanner-primary span {\r\n  display: block;\r\n  color: var(--nyt-text-muted);\r\n  font-size: 11px;\r\n}\r\n\r\n#nytrina-overlay .scanner-primary b {\r\n  display: block;\r\n  margin-top: 4px;\r\n  color: #fff;\r\n  font-size: 18px;\r\n}\r\n\r\n#nytrina-overlay .scanner-primary strong {\r\n  display: block;\r\n  color: var(--nyt-accent-strong);\r\n  font-size: 30px;\r\n  line-height: 1.15;\r\n  font-variant-numeric: tabular-nums;\r\n}\r\n\r\n#nytrina-overlay .scanner-primary small {\r\n  display: block;\r\n  margin-top: 4px;\r\n  color: var(--nyt-text-muted);\r\n  font-size: 11px;\r\n}\r\n\r\n#nytrina-overlay .scanner-locked {\r\n  background: #2f4520;\r\n  border-color: #6b9f35;\r\n}\r\n\r\n#nytrina-overlay .conf-high {\r\n  color: var(--nyt-ok);\r\n}\r\n\r\n#nytrina-overlay .conf-mid {\r\n  color: var(--nyt-warn);\r\n}\r\n\r\n#nytrina-overlay .conf-low {\r\n  color: var(--nyt-bad);\r\n}\r\n\r\n#nytrina-overlay .conf-none {\r\n  color: var(--nyt-text-muted);\r\n}\r\n\r\n#nytrina-overlay .card b.stars {\r\n  color: var(--nyt-accent-strong);\r\n  letter-spacing: 1px;\r\n}\r\n\r\n#nytrina-overlay .scanner-controls {\r\n  background: #342114;\r\n  border: 1px solid #8b5a22;\r\n  border-radius: 10px;\r\n  padding: 10px;\r\n  margin-bottom: 10px;\r\n  box-shadow: inset 0 0 0 1px rgba(255, 223, 168, 0.06);\r\n}\r\n\r\n#nytrina-overlay .scanner-actions {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 8px;\r\n  margin-top: 10px;\r\n}\r\n\r\n#nytrina-overlay .scanner-actions button {\r\n  flex: 1 1 150px;\r\n}\r\n\r\n#nytrina-overlay .scanner-actions .hint {\r\n  flex: 1 1 100%;\r\n  color: #f2d7aa;\r\n  font-size: 12px;\r\n  padding-top: 2px;\r\n}\r\n\r\n#nytrina-overlay .scanner-summary {\r\n  margin-top: 2px;\r\n}\r\n\r\n#nytrina-overlay .scanner-essential-grid {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  gap: 8px;\r\n  margin-top: 2px;\r\n}\r\n\r\n#nytrina-overlay .scanner-card-highlight {\r\n  border-color: #c9892a;\r\n  background: linear-gradient(180deg, #322010, #28190d);\r\n}\r\n\r\n#nytrina-overlay .scanner-context-line {\r\n  margin-top: 8px;\r\n  padding: 8px;\r\n  border-radius: 7px;\r\n  border: 1px solid #6e4518;\r\n  background: #1e130a;\r\n  color: #e6cda3;\r\n  font-size: 12px;\r\n  line-height: 1.4;\r\n}\r\n\r\n#nytrina-overlay .scanner-advanced {\r\n  margin-top: 8px;\r\n  border: 1px solid #6e4518;\r\n  border-radius: 7px;\r\n  background: #1a1109;\r\n}\r\n\r\n#nytrina-overlay .scanner-advanced summary {\r\n  cursor: pointer;\r\n  padding: 8px;\r\n  color: #ffd79b;\r\n  font-weight: bold;\r\n  list-style: none;\r\n}\r\n\r\n#nytrina-overlay .scanner-advanced summary::-webkit-details-marker {\r\n  display: none;\r\n}\r\n\r\n#nytrina-overlay .scanner-advanced[open] summary {\r\n  border-bottom: 1px solid #6e4518;\r\n}\r\n\r\n#nytrina-overlay .scanner-advanced .scanner-summary {\r\n  padding: 8px;\r\n  margin-top: 0;\r\n}\r\n\r\n#nytrina-overlay .card {\r\n  background: var(--nyt-surface);\r\n  border: 1px solid var(--nyt-border);\r\n  border-radius: 7px;\r\n  padding: 8px;\r\n}\r\n\r\n#nytrina-overlay .card span {\r\n  display: block;\r\n  font-size: 11px;\r\n  color: var(--nyt-text-muted);\r\n  margin-bottom: 3px;\r\n}\r\n\r\n#nytrina-overlay .card b {\r\n  color: #fff;\r\n}\r\n\r\n#nytrina-overlay .card b.pos,\r\n#nytrina-overlay td.pos {\r\n  color: var(--nyt-ok);\r\n}\r\n\r\n#nytrina-overlay .card b.neg,\r\n#nytrina-overlay td.neg {\r\n  color: var(--nyt-bad);\r\n}\r\n\r\n#nytrina-overlay .card b.neg-soft,\r\n#nytrina-overlay td.neg-soft {\r\n  color: #f0a58a;\r\n}\r\n\r\n#nytrina-overlay table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  margin-top: 8px;\r\n  background: #120b06;\r\n}\r\n\r\n#nytrina-overlay th,\r\n#nytrina-overlay td {\r\n  border: 1px solid #6f461c;\r\n  padding: 5px 6px;\r\n  text-align: left;\r\n  color: #f7ead2;\r\n}\r\n\r\n#nytrina-overlay th {\r\n  background: #3a230f;\r\n  color: #ffe0ad;\r\n  font-size: 12px;\r\n}\r\n\r\n#nytrina-overlay td {\r\n  background: var(--nyt-surface-2);\r\n}\r\n\r\n#nytrina-overlay tbody tr:nth-child(even) td {\r\n  background: #25170c;\r\n}\r\n\r\n#nytrina-overlay tbody tr:hover td {\r\n  background: #33200f;\r\n}\r\n\r\n#nytrina-overlay th.num,\r\n#nytrina-overlay td.num {\r\n  text-align: right;\r\n  font-variant-numeric: tabular-nums;\r\n  white-space: nowrap;\r\n}\r\n\r\n#nytrina-overlay td.cell-id {\r\n  max-width: 90px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  font-size: 11px;\r\n  color: var(--nyt-text-muted);\r\n}\r\n\r\n#nytrina-overlay .table-scroll {\r\n  overflow: auto;\r\n  max-height: 52vh;\r\n  border: 1px solid #6f461c;\r\n  border-radius: 8px;\r\n  margin-top: 8px;\r\n}\r\n\r\n#nytrina-overlay .table-scroll table {\r\n  margin-top: 0;\r\n}\r\n\r\n#nytrina-overlay .table-scroll th {\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 1;\r\n}\r\n\r\n#nytrina-overlay .actions {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  align-items: center;\r\n  gap: 8px;\r\n  margin-top: 10px;\r\n}\r\n\r\n#nytrina-overlay button {\r\n  background: #5a350f;\r\n  color: #ffe0ad;\r\n  border: 1px solid var(--nyt-accent);\r\n  border-radius: 7px;\r\n  padding: 6px 10px;\r\n  cursor: pointer;\r\n}\r\n\r\n#nytrina-overlay button:hover:not(:disabled) {\r\n  background: #6d4214;\r\n  border-color: var(--nyt-accent-strong);\r\n}\r\n\r\n#nytrina-overlay button:focus-visible,\r\n#nytrina-overlay input:focus-visible,\r\n#nytrina-overlay select:focus-visible {\r\n  outline: 2px solid var(--nyt-accent-strong);\r\n  outline-offset: 1px;\r\n}\r\n\r\n#nytrina-overlay button:disabled {\r\n  opacity: 0.45;\r\n  cursor: not-allowed;\r\n}\r\n\r\n#nytrina-overlay label {\r\n  display: block;\r\n  margin-top: 8px;\r\n  color: #ffd79b;\r\n  font-size: 12px;\r\n}\r\n\r\n#nytrina-overlay input,\r\n#nytrina-overlay select {\r\n  width: 100%;\r\n  height: 34px;\r\n  margin-top: 4px;\r\n  padding: 6px;\r\n  border-radius: 6px;\r\n  border: 1px solid #8b5a22;\r\n  background: #23170d;\r\n  color: #f7ead2;\r\n}\r\n\r\n#nytrina-overlay #nytrina-scanner-troop,\r\n#nytrina-overlay #nytrina-setting-troop {\r\n  background: #f3e7d1;\r\n  color: #1a120a;\r\n  border-color: #c9a16a;\r\n}\r\n\r\n#nytrina-overlay #nytrina-scanner-troop option,\r\n#nytrina-overlay #nytrina-setting-troop option,\r\n#nytrina-overlay #nytrina-scanner-troop optgroup,\r\n#nytrina-overlay #nytrina-setting-troop optgroup {\r\n  background: #f3e7d1;\r\n  color: #1a120a;\r\n}\r\n\r\n#nytrina-overlay,\r\n#nytrina-overlay [data-panel=\"debug\"] .table-scroll,\r\n#nytrina-overlay .debug-json {\r\n  scrollbar-width: thin;\r\n  scrollbar-color: #b97822 #1a120a;\r\n}\r\n\r\n#nytrina-overlay::-webkit-scrollbar,\r\n#nytrina-overlay [data-panel=\"debug\"] .table-scroll::-webkit-scrollbar,\r\n#nytrina-overlay .debug-json::-webkit-scrollbar {\r\n  width: 10px;\r\n  height: 10px;\r\n}\r\n\r\n#nytrina-overlay::-webkit-scrollbar-track,\r\n#nytrina-overlay [data-panel=\"debug\"] .table-scroll::-webkit-scrollbar-track,\r\n#nytrina-overlay .debug-json::-webkit-scrollbar-track {\r\n  background: #1a120a;\r\n  border-radius: 10px;\r\n}\r\n\r\n#nytrina-overlay::-webkit-scrollbar-thumb,\r\n#nytrina-overlay [data-panel=\"debug\"] .table-scroll::-webkit-scrollbar-thumb,\r\n#nytrina-overlay .debug-json::-webkit-scrollbar-thumb {\r\n  background: linear-gradient(180deg, #c9892a, #8a5318);\r\n  border-radius: 10px;\r\n  border: 2px solid #1a120a;\r\n}\r\n\r\n#nytrina-overlay::-webkit-scrollbar-thumb:hover,\r\n#nytrina-overlay [data-panel=\"debug\"] .table-scroll::-webkit-scrollbar-thumb:hover,\r\n#nytrina-overlay .debug-json::-webkit-scrollbar-thumb:hover {\r\n  background: linear-gradient(180deg, #e3a63e, #a86620);\r\n}\r\n\r\n#nytrina-overlay [data-panel=\"debug\"] .table-scroll {\r\n  overflow: auto;\r\n  max-height: 52vh;\r\n  border: 1px solid #6f461c;\r\n  border-radius: 8px;\r\n  margin-top: 8px;\r\n}\r\n\r\n#nytrina-overlay .debug-table {\r\n  table-layout: fixed;\r\n  min-width: 1080px;\r\n  margin-top: 0;\r\n  font-size: 12px;\r\n}\r\n\r\n#nytrina-overlay .debug-table th,\r\n#nytrina-overlay .debug-table td {\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  padding: 5px 6px;\r\n}\r\n\r\n#nytrina-overlay .debug-col-troop {\r\n  max-width: 150px;\r\n}\r\n\r\n#nytrina-overlay .debug-col-result {\r\n  max-width: 140px;\r\n}\r\n\r\n#nytrina-overlay .debug-table th:first-child,\r\n#nytrina-overlay .debug-table td:first-child {\r\n  white-space: normal;\r\n  min-width: 64px;\r\n  width: 64px;\r\n}\r\n\r\n#nytrina-overlay .debug-col-datetime {\r\n  display: inline-block;\r\n  line-height: 1.2;\r\n  word-break: break-word;\r\n}\r\n\r\n#nytrina-overlay .check-row {\r\n  display: flex;\r\n  align-items: center;\r\n  color: #ffd79b;\r\n  margin-top: 10px;\r\n}\r\n\r\n#nytrina-overlay .form-grid {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  gap: 8px;\r\n}\r\n\r\n#nytrina-overlay .stack {\r\n  margin-top: 10px;\r\n}\r\n\r\n#nytrina-overlay .server-badge {\r\n  margin-bottom: 8px;\r\n  padding: 8px;\r\n  border-radius: 6px;\r\n  border: 1px solid #8a5a24;\r\n  background: #1b120a;\r\n  color: #ffd79b;\r\n}\r\n\r\n#nytrina-overlay .server-warning {\r\n  display: none;\r\n  margin-top: 8px;\r\n  padding: 8px;\r\n  border-radius: 6px;\r\n  border: 1px solid #c9892a;\r\n  background: #3a230f;\r\n  color: #ffd26a;\r\n}\r\n\r\n#nytrina-overlay .server-warning.show {\r\n  display: block;\r\n}\r\n\r\n#nytrina-overlay .rank-good {\r\n  color: #72ff72;\r\n  font-weight: bold;\r\n}\r\n\r\n#nytrina-overlay .rank-mid {\r\n  color: #ffd26a;\r\n  font-weight: bold;\r\n}\r\n\r\n#nytrina-overlay .rank-bad {\r\n  color: #ff7d7d;\r\n  font-weight: bold;\r\n}\r\n\r\n#nytrina-overlay .debug-json {\r\n  white-space: pre-wrap;\r\n  background: #120b06;\r\n  border: 1px solid #6f461c;\r\n  border-radius: 8px;\r\n  padding: 8px;\r\n  font-family: Consolas, monospace;\r\n  max-height: 360px;\r\n  overflow: auto;\r\n}\r\n\r\n#nytrina-overlay input[type=\"checkbox\"] {\r\n    appearance: checkbox !important;\r\n    -webkit-appearance: checkbox !important;\r\n    accent-color: var(--nyt-accent);\r\n    width: 16px !important;\r\n    height: 16px !important;\r\n    margin-top: 0;\r\n    margin-right: 6px;\r\n    vertical-align: middle;\r\n    cursor: pointer;\r\n}\r\n\r\n#nytrina-overlay.minimized .tabs {\r\n  display: none;\r\n}\r\n\r\n#nytrina-overlay.minimized .panel {\r\n  display: none;\r\n}\r\n\r\n#nytrina-toggle-minimize {\r\n  min-width: 92px;\r\n}\r\n\r\n#nytrina-toasts {\r\n  position: fixed;\r\n  right: 16px;\r\n  bottom: 16px;\r\n  z-index: 1000000;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 8px;\r\n  max-width: 360px;\r\n  font-family: Verdana, sans-serif;\r\n  font-size: 12px;\r\n}\r\n\r\n#nytrina-toasts .nytrina-toast {\r\n  background: #28190d;\r\n  color: #f7ebd7;\r\n  border: 1px solid #c9892a;\r\n  border-left: 4px solid #c9892a;\r\n  border-radius: 8px;\r\n  padding: 8px 10px;\r\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);\r\n  white-space: pre-line;\r\n  cursor: pointer;\r\n}\r\n\r\n#nytrina-toasts .nytrina-toast b {\r\n  display: block;\r\n  margin-bottom: 4px;\r\n  color: #ffd79b;\r\n}\r\n\r\n#nytrina-toasts .nytrina-toast-error {\r\n  border-color: #ff7d7d;\r\n}\r\n\r\n@media (max-width: 700px) {\r\n  #nytrina-overlay .scanner-essential-grid,\r\n  #nytrina-overlay .scanner-primary,\r\n  #nytrina-overlay .grid-3 {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}";
})(window);


// FILE: data/constants.js

(function initConstants(global) {
  'use strict';

  /** @type {Record<string, unknown>} */
  const root = (global.NytrinA = global.NytrinA || {});

  root.Constants = {
    APP_NAME: 'NytrinA Travian Companion',
    APP_VERSION: '4.0.4',
    APP_NAMESPACE: 'nytrina_companion_v4',
    DB_NAME_PREFIX: 'nytrina_companion_db',
    DB_VERSION: 1,
    STORES: {
      OASIS: 'OASIS',
      REPORTS: 'REPORTS',
      SETTINGS: 'SETTINGS',
      STATISTICS: 'STATISTICS',
      HISTORY: 'HISTORY'
    },
    DEFAULT_SETTINGS: {
      server: 'auto',
      troopType: 'hero',
      troopTribe: 'romans',
      customSpeed: 14,
      smallMap: false,
      language: 'pt-BR'
    },
    SAVE_DEBOUNCE_MS: 900,
    SCAN_INTERVAL_MS: 1500
  };
})(window);




// FILE: data/animals.js

(function initAnimals(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  /** @type {Array<{key:string,label:string,iconClass:string,xp:number}>} */
  const animals = [
    { key: 'rato', label: 'Rato', iconClass: 'u31', xp: 1 },
    { key: 'aranha', label: 'Aranha', iconClass: 'u32', xp: 1 },
    { key: 'cobra', label: 'Cobra', iconClass: 'u33', xp: 2 },
    { key: 'morcego', label: 'Morcego', iconClass: 'u34', xp: 1 },
    { key: 'javali', label: 'Javali', iconClass: 'u35', xp: 3 },
    { key: 'lobo', label: 'Lobo', iconClass: 'u36', xp: 4 },
    { key: 'urso', label: 'Urso', iconClass: 'u37', xp: 5 },
    { key: 'crocodilo', label: 'Crocodilo', iconClass: 'u38', xp: 6 },
    { key: 'tigre', label: 'Tigre', iconClass: 'u39', xp: 7 },
    { key: 'elefante', label: 'Elefante', iconClass: 'u40', xp: 10 }
  ];

  const byIconClass = Object.fromEntries(animals.map((animal) => [animal.iconClass, animal.key]));
  const byKey = Object.fromEntries(animals.map((animal) => [animal.key, animal]));
  const keys = animals.map((animal) => animal.key);

  /**
   * @returns {Record<string, number>}
   */
  function emptyAnimals() {
    return Object.fromEntries(keys.map((key) => [key, 0]));
  }

  /**
   * @param {Record<string, number>} counts
   * @returns {number}
   */
  function calcXp(counts) {
    return keys.reduce((sum, key) => sum + (counts[key] || 0) * (byKey[key].xp || 0), 0);
  }

  root.Animals = {
    list: animals,
    keys,
    byKey,
    byIconClass,
    emptyAnimals,
    calcXp
  };
})(window);




// FILE: data/servers.js

(function initServers(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  /**
   * @param {string} host
   * @returns {'america'|'europe'|'asia'|'unknown'}
   */
  function getRegion(host) {
    const normalized = host.toLowerCase();
    if (normalized.includes('.america.')) return 'america';
    if (normalized.includes('.europe.')) return 'europe';
    if (normalized.includes('.asia.')) return 'asia';
    return 'unknown';
  }

  root.Servers = {
    getRegion
  };
})(window);




// FILE: data/troops.js

(function initTroops(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  /**
   * Custos oficiais de treinamento por unidade no Travian.
   * Chaves seguem ids logicos por tribo para manter manutencao simples.
   */
  const TROOP_COSTS = {
    romans: {
      u1: { key: 'legionnaire', label: 'Legionario', wood: 120, clay: 100, iron: 150, crop: 30 },
      u2: { key: 'praetorian', label: 'Pretoriano', wood: 100, clay: 130, iron: 160, crop: 70 },
      u3: { key: 'imperian', label: 'Imperiano', wood: 150, clay: 160, iron: 210, crop: 80 },
      u4: { key: 'equites_legati', label: 'Equites Legati', wood: 140, clay: 160, iron: 20, crop: 40 },
      u5: { key: 'equites_imperatoris', label: 'Equites Imperatoris', wood: 550, clay: 440, iron: 320, crop: 100 },
      u6: { key: 'equites_caesaris', label: 'Equites Caesaris', wood: 550, clay: 640, iron: 800, crop: 180 },
      u7: { key: 'ram', label: 'Ariete', wood: 900, clay: 360, iron: 500, crop: 70 },
      u8: { key: 'fire_catapult', label: 'Catapulta de Fogo', wood: 950, clay: 1350, iron: 600, crop: 90 },
      u9: { key: 'senator', label: 'Senador', wood: 30750, clay: 27200, iron: 45000, crop: 37500 },
      u10: { key: 'settler', label: 'Colonizador', wood: 4600, clay: 4200, iron: 5800, crop: 4400 },
      hero: { key: 'hero', label: 'Heroi', wood: 0, clay: 0, iron: 0, crop: 0 }
    },
    teutons: {
      u1: { key: 'clubman', label: 'Salteador', wood: 95, clay: 75, iron: 40, crop: 40 },
      u2: { key: 'spearman', label: 'Lanceiro', wood: 145, clay: 70, iron: 85, crop: 40 },
      u3: { key: 'axeman', label: 'Batedor de Machado', wood: 130, clay: 120, iron: 170, crop: 70 },
      u4: { key: 'scout', label: 'Explorador', wood: 160, clay: 100, iron: 50, crop: 50 },
      u5: { key: 'paladin', label: 'Paladino', wood: 370, clay: 270, iron: 290, crop: 75 },
      u6: { key: 'teutonic_knight', label: 'Cavaleiro Teutao', wood: 450, clay: 515, iron: 480, crop: 80 },
      u7: { key: 'ram', label: 'Ariete', wood: 1000, clay: 300, iron: 350, crop: 70 },
      u8: { key: 'catapult', label: 'Catapulta', wood: 900, clay: 1200, iron: 600, crop: 60 },
      u9: { key: 'chief', label: 'Chefe', wood: 35500, clay: 26600, iron: 25000, crop: 27200 },
      u10: { key: 'settler', label: 'Colonizador', wood: 5800, clay: 5300, iron: 7200, crop: 5500 },
      hero: { key: 'hero', label: 'Heroi', wood: 0, clay: 0, iron: 0, crop: 0 }
    },
    gauls: {
      u1: { key: 'phalanx', label: 'Falange', wood: 100, clay: 130, iron: 55, crop: 30 },
      u2: { key: 'swordsman', label: 'Espadachim', wood: 140, clay: 150, iron: 185, crop: 60 },
      u3: { key: 'pathfinder', label: 'Batedor', wood: 170, clay: 150, iron: 20, crop: 40 },
      u4: { key: 'theutates_thunder', label: 'Trovao de Theutates', wood: 350, clay: 450, iron: 230, crop: 60 },
      u5: { key: 'druidrider', label: 'Druida', wood: 360, clay: 330, iron: 280, crop: 120 },
      u6: { key: 'haeduan', label: 'Haeduano', wood: 500, clay: 620, iron: 675, crop: 170 },
      u7: { key: 'ram', label: 'Ariete', wood: 950, clay: 555, iron: 330, crop: 75 },
      u8: { key: 'trebuchet', label: 'Trebuchet', wood: 960, clay: 1450, iron: 630, crop: 90 },
      u9: { key: 'chieftain', label: 'Chefe da Tribo', wood: 30750, clay: 45400, iron: 31000, crop: 37500 },
      u10: { key: 'settler', label: 'Colonizador', wood: 5500, clay: 7000, iron: 5300, crop: 4900 },
      hero: { key: 'hero', label: 'Heroi', wood: 0, clay: 0, iron: 0, crop: 0 }
    }
  };

  const TROOP_SPEEDS = {
    hero: 14,
    custom: 14,
    romans: {
      legionnaire: 6,
      praetorian: 5,
      imperian: 7,
      equites_legati: 16,
      equites_imperatoris: 14,
      equites_caesaris: 10,
      ram: 4,
      fire_catapult: 3
    },
    teutons: {
      clubman: 7,
      spearman: 7,
      axeman: 6,
      paladin: 10,
      teutonic_knight: 9
    },
    gauls: {
      phalanx: 7,
      swordsman: 6,
      pathfinder: 17,
      theutates_thunder: 19,
      druidrider: 16,
      haeduan: 13
    }
  };

  /**
   * @param {string} tribe
   * @param {Record<string, number>} lost
   * @returns {{total:number,detail:Array<{unit:string,qty:number,total:number}>}}
   */
  function localUnitClass(unitClass) {
    const match = /^u(\d+)$/.exec(String(unitClass || ''));
    if (!match) return null;
    // Report DOM uses u11-u20 for Teutons and u21-u30 for Gauls.
    return 'u' + (((Number(match[1]) - 1) % 10) + 1);
  }

  function calcLossCost(tribe, lost) {
    const tribeCosts = TROOP_COSTS[tribe] || TROOP_COSTS.romans;
    let total = 0;
    const detail = [];

    Object.entries(lost || {}).forEach(([unitClass, qty]) => {
      const normalizedQty = Number(qty || 0);
      const cost = tribeCosts[unitClass] || tribeCosts[localUnitClass(unitClass)];
      if (!cost || normalizedQty <= 0) return;

      const unitTotal = cost.wood + cost.clay + cost.iron + cost.crop;
      const rowTotal = unitTotal * normalizedQty;
      total += rowTotal;
      detail.push({ unit: cost.label, qty: normalizedQty, total: rowTotal });
    });

    return { total, detail };
  }

  root.Troops = {
    costs: TROOP_COSTS,
    speeds: TROOP_SPEEDS,
    calcLossCost
  };
})(window);




// FILE: core/utils.js

(function initUtils(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  /**
   * @param {string} text
   * @returns {string}
   */
  function normalizeText(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  /**
   * @param {string|number} value
   * @returns {number}
   */
  function toInt(value) {
    return parseInt(String(value || '').replace(/[^\d-]/g, ''), 10) || 0;
  }

  /**
   * @param {string|number} value
   * @returns {number}
   */
  function toNumber(value) {
    const normalized = String(value || '').replace(',', '.').replace(/[^\d.-]/g, '');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  /**
   * @param {number} seconds
   * @returns {string}
   */
  function secondsToClock(seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) return '-';
    const total = Math.round(seconds);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return h + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  /**
   * @param {Element} el
   * @returns {boolean}
   */
  function isVisible(el) {
    if (!el) return false;
    const style = global.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
  }

  /**
   * @param {Element} rootElement
   * @returns {Array<string>}
   */
  function classTokens(rootElement) {
    return String(rootElement?.className || '')
      .split(/\s+/)
      .filter(Boolean);
  }

  /**
   * @param {string} host
   * @returns {string}
   */
  function hostKey(host) {
    return String(host || global.location.hostname || '').toLowerCase();
  }

  root.Utils = {
    normalizeText,
    toInt,
    toNumber,
    secondsToClock,
    isVisible,
    classTokens,
    hostKey
  };
})(window);




// FILE: core/server.js

(function initServer(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});
  const getRegion = root.Servers.getRegion;

  /**
   * @returns {{host:string,region:string,speed:number,key:string}}
   */
  function getServerContext() {
    const host = String(global.location.hostname || '').toLowerCase();
    const speedMatch = host.match(/\.x(\d+)\./);
    const speed = speedMatch ? Number(speedMatch[1]) : 1;
    return {
      host,
      region: getRegion(host),
      speed,
      key: host
    };
  }

  root.Server = {
    getContext: getServerContext
  };
})(window);




// FILE: core/storage.js

(function initStorage(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});
  const constants = root.Constants;

  /**
   * @param {string} host
   * @returns {string}
   */
  function dbName(host) {
    return constants.DB_NAME_PREFIX + '_' + host;
  }

  /**
   * @param {IDBRequest} request
   * @returns {Promise<any>}
   */
  function requestToPromise(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  class StorageService {
    constructor() {
      this.db = null;
      this.host = null;
    }

    /**
     * @param {string} host
     * @returns {Promise<void>}
     */
    async init(host) {
      if (this.db && this.host === host) return;
      this.host = host;

      const openRequest = global.indexedDB.open(dbName(host), constants.DB_VERSION);
      openRequest.onupgradeneeded = () => {
        const db = openRequest.result;
        const stores = constants.STORES;

        if (!db.objectStoreNames.contains(stores.OASIS)) {
          db.createObjectStore(stores.OASIS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(stores.REPORTS)) {
          db.createObjectStore(stores.REPORTS, { keyPath: 'reportId' });
        }
        if (!db.objectStoreNames.contains(stores.SETTINGS)) {
          db.createObjectStore(stores.SETTINGS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(stores.STATISTICS)) {
          db.createObjectStore(stores.STATISTICS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(stores.HISTORY)) {
          db.createObjectStore(stores.HISTORY, { keyPath: 'id' });
        }
      };

      this.db = await requestToPromise(openRequest);
    }

    /**
     * @param {string} storeName
     * @param {'readonly'|'readwrite'} mode
     * @returns {IDBObjectStore}
     */
    store(storeName, mode) {
      if (!this.db) throw new Error('Storage not initialized');
      return this.db.transaction(storeName, mode).objectStore(storeName);
    }

    /**
     * @param {string} storeName
     * @param {any} value
     * @returns {Promise<void>}
     */
    async put(storeName, value) {
      const request = this.store(storeName, 'readwrite').put(value);
      await requestToPromise(request);
    }

    /**
     * @param {string} storeName
     * @param {IDBValidKey} key
     * @returns {Promise<any>}
     */
    async get(storeName, key) {
      const request = this.store(storeName, 'readonly').get(key);
      return requestToPromise(request);
    }

    /**
     * @param {string} storeName
     * @returns {Promise<Array<any>>}
     */
    async getAll(storeName) {
      const request = this.store(storeName, 'readonly').getAll();
      return requestToPromise(request);
    }

    /**
     * @param {string} storeName
     * @param {IDBValidKey} key
     * @returns {Promise<void>}
     */
    async delete(storeName, key) {
      const request = this.store(storeName, 'readwrite').delete(key);
      await requestToPromise(request);
    }

    /**
     * @param {string} storeName
     * @returns {Promise<void>}
     */
    async clear(storeName) {
      const request = this.store(storeName, 'readwrite').clear();
      await requestToPromise(request);
    }

    /**
     * @returns {Array<string>}
     */
    getStoreNames() {
      return Object.values(constants.STORES || {});
    }

    /**
     * @param {string} storeName
     * @param {Array<any>} values
     * @returns {Promise<void>}
     */
    async putMany(storeName, values) {
      const list = Array.isArray(values) ? values : [];
      for (const value of list) {
        await this.put(storeName, value);
      }
    }

    /**
     * @returns {Promise<any>}
     */
    async exportBackup() {
      const stores = this.getStoreNames();
      const data = {};
      const counts = {};

      for (const storeName of stores) {
        data[storeName] = await this.getAll(storeName);
        counts[storeName] = Array.isArray(data[storeName])
          ? data[storeName].length
          : 0;
      }

      const statistics = data[constants.STORES.STATISTICS] || [];
      const battleKnowledge = statistics.filter((row) =>
        String(row?.id || '').startsWith('battleKnowledge:'),
      );
      const battleCalibration = statistics.filter((row) =>
        String(row?.id || '').startsWith('battleCalibration:'),
      );

      return {
        version: String(constants.APP_VERSION || '4.0.0'),
        createdAt: new Date().toISOString(),
        host: this.host,
        stores: data,
        counts,

        // Seções amigáveis para restauração entre versões.
        settings: data[constants.STORES.SETTINGS] || [],
        reports: data[constants.STORES.REPORTS] || [],
        history: data[constants.STORES.HISTORY] || [],
        statistics,
        battleKnowledge,
        battleCalibration,
        scanner: data[constants.STORES.OASIS] || [],
        oasis: data[constants.STORES.OASIS] || [],
      };
    }

    /**
     * @param {Array<string>} storeNames
     * @param {(tx: IDBTransaction) => void} work
     * @returns {Promise<void>}
     */
    runTransaction(storeNames, work) {
      if (!this.db) throw new Error('Storage not initialized');
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(storeNames, 'readwrite');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error || new Error('Transação abortada.'));
        try {
          work(tx);
        } catch (error) {
          tx.abort();
          reject(error);
        }
      });
    }

    /**
     * @param {any} backup
     * @returns {Record<string, Array<any>>}
     */
    readBackupRows(backup) {
      if (!backup || typeof backup !== 'object') {
        throw new Error('Backup inválido.');
      }

      const storeData = backup.stores && typeof backup.stores === 'object'
        ? backup.stores
        : {};

      const asArray = (value) => {
        if (Array.isArray(value)) return value;
        if (value && typeof value === 'object') return [value];
        return [];
      };

      const oasisRows = asArray(
        storeData[constants.STORES.OASIS] ?? backup.oasis ?? backup.scanner,
      );

      const reportsRows = asArray(
        storeData[constants.STORES.REPORTS] ?? backup.reports,
      );

      const settingsRows = asArray(
        storeData[constants.STORES.SETTINGS] ?? backup.settings,
      );

      const historyRows = asArray(
        storeData[constants.STORES.HISTORY] ?? backup.history,
      );

      const statisticsMap = new Map();

      asArray(storeData[constants.STORES.STATISTICS] ?? backup.statistics).forEach(
        (row) => {
          if (row && row.id) statisticsMap.set(String(row.id), row);
        },
      );

      asArray(backup.battleKnowledge).forEach((row) => {
        if (row && row.id) statisticsMap.set(String(row.id), row);
      });

      asArray(backup.battleCalibration).forEach((row) => {
        if (row && row.id) statisticsMap.set(String(row.id), row);
      });

      const statisticsRows = Array.from(statisticsMap.values());
      const withKey = (rows, key) =>
        rows.filter((row) => row && row[key] !== undefined && row[key] !== null);

      return {
        [constants.STORES.OASIS]: withKey(oasisRows, 'id'),
        [constants.STORES.REPORTS]: withKey(reportsRows, 'reportId'),
        [constants.STORES.SETTINGS]: withKey(settingsRows, 'id'),
        [constants.STORES.HISTORY]: withKey(historyRows, 'id'),
        [constants.STORES.STATISTICS]: statisticsRows,
      };
    }

    /**
     * @param {any} backup
     * @returns {Promise<Record<string, number>>}
     */
    async importBackup(backup) {
      const rows = this.readBackupRows(backup);
      const stores = this.getStoreNames();

      await this.runTransaction(stores, (tx) => {
        for (const storeName of stores) {
          const store = tx.objectStore(storeName);
          store.clear();
          (rows[storeName] || []).forEach((row) => store.put(row));
        }
      });

      const counts = {};
      for (const storeName of stores) {
        counts[storeName] = (rows[storeName] || []).length;
      }
      return counts;
    }

    /**
     * Keeps local settings and learning; adds reports, history and oases missing locally.
     * @param {any} backup
     * @returns {Promise<{newReports:Array<any>,history:number,oasis:number}>}
     */
    async mergeBackup(backup) {
      const rows = this.readBackupRows(backup);
      const S = constants.STORES;
      const timeOf = (row) =>
        new Date(row?.updatedAt || row?.scanDate || row?.date || 0).getTime() || 0;

      const localReportIds = new Set(
        (await this.getAll(S.REPORTS)).map((row) => String(row.reportId)),
      );
      const localHistoryIds = new Set(
        (await this.getAll(S.HISTORY)).map((row) => String(row.id)),
      );
      const localOasis = new Map(
        (await this.getAll(S.OASIS)).map((row) => [String(row.id), row]),
      );

      const newReports = rows[S.REPORTS].filter(
        (row) => !localReportIds.has(String(row.reportId)),
      );
      const newHistory = rows[S.HISTORY].filter(
        (row) => !localHistoryIds.has(String(row.id)),
      );
      const oasisToWrite = rows[S.OASIS].filter((row) => {
        const current = localOasis.get(String(row.id));
        return !current || timeOf(row) > timeOf(current);
      });

      await this.runTransaction([S.REPORTS, S.HISTORY, S.OASIS], (tx) => {
        newReports.forEach((row) => tx.objectStore(S.REPORTS).put(row));
        newHistory.forEach((row) => tx.objectStore(S.HISTORY).put(row));
        oasisToWrite.forEach((row) => tx.objectStore(S.OASIS).put(row));
      });

      return {
        newReports,
        history: newHistory.length,
        oasis: oasisToWrite.length,
      };
    }
  }

  root.StorageService = StorageService;
})(window);




// FILE: parser/mapParser.js

(function initMapParser(global) {
  "use strict";

  const root = (global.NytrinA = global.NytrinA || {});
  const utils = root.Utils;

  /**
   * @param {string} value
   * @returns {string}
   */
  function normalizeMinus(value) {
    return String(value || "").replace(/[−–—]/g, "-");
  }

  /**
   * Fallback regex apenas para extrair um par ja identificado visualmente.
   * @param {string} text
   * @returns {string|null}
   */
  function parseCoordLike(text) {
    const normalized = normalizeMinus(text);
    const match = normalized.match(
      /[\(\[]\s*([+-]?\d+)\s*\|\s*([+-]?\d+)\s*[\)\]]/,
    );
    if (!match) return null;
    return match[1] + "|" + match[2];
  }

  /**
   * Prioridade 1: coordenada escrita no bloco analisado.
   * @param {Element|null} container
   * @returns {string|null}
   */
  function fromWrittenCoordinate(container) {
    if (!container) return null;
    const directCandidates = container.querySelectorAll(
      "h1,h2,h3,th,td,span,b,strong,a",
    );
    for (const element of directCandidates) {
      if (!utils.isVisible(element)) continue;
      const content = normalizeMinus(element.textContent || "");
      const value = parseCoordLike(content);
      if (value) return value;
    }
    const containerValue = parseCoordLike(container.textContent || "");
    return containerValue || null;
  }

  /**
   * Procura o tooltip visual atualmente aberto no mapa.
   * Prioriza elementos pequenos, visíveis e que contenham
   * "Oásis" junto com uma coordenada.
   *
   * @returns {string|null}
   */
  function fromTooltip() {
    const candidates = Array.from(
      global.document.querySelectorAll("div,span,section,aside"),
    );

    const matches = [];

    for (const node of candidates) {
      if (!utils.isVisible(node)) continue;

      const text = normalizeMinus(
        String(node.innerText || node.textContent || "").trim(),
      );

      // Ignora elementos vazios ou containers gigantes da página.
      if (!text || text.length > 600) continue;

      // O tooltip do mapa deve falar de oásis.
      if (!/o[aá]sis/i.test(text)) continue;

      const coord = parseCoordLike(text);
      if (!coord) continue;

      const rect = node.getBoundingClientRect();

      // Ignora elementos sem dimensão visual.
      if (rect.width <= 0 || rect.height <= 0) continue;

      matches.push({
        coord,
        textLength: text.length,
        area: rect.width * rect.height,
        node,
      });
    }

    if (!matches.length) return null;

    /*
     * O tooltip verdadeiro costuma ser o menor elemento visual
     * que contém o texto completo. Evita escolher containers pais.
     */
    matches.sort((a, b) => {
      if (a.textLength !== b.textLength) {
        return a.textLength - b.textLength;
      }

      return a.area - b.area;
    });

    return matches[0].coord;
  }

  /**
   * Prioridade 3: janela de oasis/box principal.
   * @returns {string|null}
   */
  function fromOasisWindow() {
    const candidates = global.document.querySelectorAll(
      "#content, #map_details, .dialog, .content, .boxTitle, .titleInHeader",
    );
    for (const node of candidates) {
      const value = parseCoordLike(node.textContent || "");
      if (value) return value;
    }
    return null;
  }

  /**
   * Prioridade 4: campos X e Y no mapa.
   * @returns {string|null}
   */
  function fromMapFields() {
    const inputX = global.document.querySelector(
      'input[name="x"], input#x, input[data-name="x"]',
    );
    const inputY = global.document.querySelector(
      'input[name="y"], input#y, input[data-name="y"]',
    );

    const xRaw = normalizeMinus(inputX?.value || "");
    const yRaw = normalizeMinus(inputY?.value || "");

    if (/^[+-]?\d+$/.test(xRaw) && /^[+-]?\d+$/.test(yRaw)) {
      return String(Number(xRaw)) + "|" + String(Number(yRaw));
    }
    return null;
  }

  /**
   * Prioridade 5: URL.
   * @returns {string|null}
   */
  function fromUrl() {
    const params = new URL(global.location.href).searchParams;
    const x = normalizeMinus(params.get("x") || "");
    const y = normalizeMinus(params.get("y") || "");
    if (/^[+-]?\d+$/.test(x) && /^[+-]?\d+$/.test(y)) {
      return String(Number(x)) + "|" + String(Number(y));
    }
    return null;
  }

  /**
   * Resolve coordenada conforme prioridade definida.
   * @param {Element|null} contextElement
   * @returns {{coord:string|null,source:string}}
   */
  function resolveCoordinate(contextElement) {
    const sequence = [
      {
        source: "written",
        fn: () => fromWrittenCoordinate(contextElement),
      },
      {
        source: "oasis-window",
        fn: () => fromOasisWindow(),
      },
      {
        source: "tooltip",
        fn: () => fromTooltip(),
      },
      {
        source: "map-fields",
        fn: () => fromMapFields(),
      },
      {
        source: "url",
        fn: () => fromUrl(),
      },
    ];

    for (const item of sequence) {
      const value = item.fn();

      if (!value || value === "-") continue;

      return {
        coord: value,
        source: item.source,
      };
    }

    return {
      coord: null,
      source: "none",
    };
  }

  root.MapParser = {
    resolveCoordinate,
    parseCoordLike,
    normalizeMinus,
  };
})(window);




// FILE: parser/oasisParser.js

(function initOasisParser(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});
  const animalsData = root.Animals;
  const utils = root.Utils;
  const mapParser = root.MapParser;
  const server = root.Server;

  const ANIMAL_SELECTOR = animalsData.list.map((animal) => '[class*="' + animal.iconClass + '"]').join(',');

  /**
   * @returns {Array<Element>}
   */
  function findCandidateRoots() {
    const icons = Array.from(global.document.querySelectorAll(ANIMAL_SELECTOR));
    const roots = new Set();

    icons.forEach((icon) => {
      if (icon.closest('#nytrina-overlay')) return;
      let rootElement = icon;
      for (let i = 0; i < 5 && rootElement?.parentElement; i += 1) {
        rootElement = rootElement.parentElement;
      }
      if (rootElement && utils.isVisible(rootElement)) {
        roots.add(rootElement);
      }
    });

    const scoreRoot = (rootElement) => {
      const text = utils.normalizeText(rootElement?.textContent || "");
      let score = 0;

      if (/oasis\s+desocupado|oasis\s+abandonado/.test(text)) score += 8;
      if (/simular\s+raid/.test(text)) score += 6;
      if (/relatorios|vizinhanca/.test(text)) score += 5;
      if (/bonus|distancia|tropas/.test(text)) score += 3;

      if (rootElement?.closest(".dialog, #content, .contentNavi, .content")) {
        score += 4;
      }

      const textLength = String(rootElement?.textContent || "").trim().length;
      if (textLength >= 120) score += 2;

      return score;
    };

    return Array.from(roots).sort((a, b) => scoreRoot(b) - scoreRoot(a));
  }

  /**
   * @param {Element} icon
   * @returns {number}
   */
  function readNearNumber(icon) {
    let parent = icon;
    for (let depth = 0; depth < 3 && parent; depth += 1) {
      const row = parent.closest('tr');
      if (row) {
        const cells = Array.from(row.querySelectorAll('td,th'));
        for (const cell of cells) {
          if (cell.contains(icon)) continue;
          const value = utils.toInt(cell.textContent || '');
          if (value > 0) return value;
        }
      }
      parent = parent.parentElement;
    }

    const siblings = Array.from(icon.parentElement?.children || []);
    for (const sibling of siblings) {
      if (sibling === icon) continue;
      const value = utils.toInt(sibling.textContent || '');
      if (value > 0) return value;
    }

    return 0;
  }

  /**
   * @param {Element} rootElement
   * @returns {Record<string, number>}
   */
  function parseAnimalsByIcons(rootElement) {
    const counts = animalsData.emptyAnimals();
    const icons = Array.from(rootElement.querySelectorAll(ANIMAL_SELECTOR));

    icons.forEach((icon) => {
      const token = utils
        .classTokens(icon)
        .find((className) => /^u(3[1-9]|40)$/.test(className));
      if (!token) return;
      const key = animalsData.byIconClass[token];
      if (!key) return;

      const quantity = readNearNumber(icon);
      counts[key] = Math.max(counts[key], quantity);
    });

    return counts;
  }

  /**
   * @param {Element} rootElement
   * @returns {number}
   */
  function parseDistanceValue(text) {
    const source = String(text || '').trim();
    if (!source) return 0;

    // Captura valor logo após rótulo de distância quando possível.
    const nearDistance = source.match(/dist[aâ]ncia\D*([+-]?\d+(?:[.,]\d+)?)/i);
    const rawValue = nearDistance ? nearDistance[1] : source.match(/[+-]?\d+(?:[.,]\d+)?/)?.[0] || '';
    if (!rawValue) return 0;

    let parsed = Number(String(rawValue).replace(',', '.'));
    if (!Number.isFinite(parsed) || parsed <= 0) return 0;

    // Quando o parser captura texto concatenado, o número vem inflado; normaliza para faixa plausível.
    while (parsed > 1500 && parsed >= 10) {
      parsed /= 10;
    }

    return Number(parsed.toFixed(2));
  }

  /**
   * @param {Element} rootElement
   * @returns {number}
   */
  function parseDistance(rootElement) {
    const candidates = rootElement.querySelectorAll('td,th,span,b,strong');
    for (const node of candidates) {
      const raw = String(node.textContent || '').trim();
      if (!raw || raw.length > 80) continue;
      const text = utils.normalizeText(raw);
      if (!text.includes('distancia')) continue;
      const number = parseDistanceValue(raw);
      if (number > 0) return number;
    }

    for (const node of candidates) {
      const raw = String(node.textContent || '').trim();
      if (!raw || raw.length > 80) continue;
      if (!/(campos?|dist)/i.test(raw)) continue;
      const number = parseDistanceValue(raw);
      if (number > 0) return number;
    }

    return 0;
  }

  /**
   * @param {Element} rootElement
   * @returns {string}
   */
  function parseBonus(rootElement) {
    const tokens = [];
    const text = utils.normalizeText(rootElement.textContent || '');

    ['madeira', 'barro', 'ferro', 'cereal'].forEach((resource) => {
      if (!text.includes(resource)) return;
      if (text.includes('50%')) tokens.push(resource + ' 50%');
      else if (text.includes('25%')) tokens.push(resource + ' 25%');
    });

    return tokens.length ? tokens.join(' + ') : '-';
  }

  /**
   * @param {number} distance
   * @param {number} speed
   * @param {boolean} smallMap
   * @returns {{travelSeconds:number,cycleSeconds:number,xph:number,time:string,cycleTime:string}}
   */
  function computeTime(distance, speed, smallMap) {
    if (!distance || !speed) {
      return {
        travelSeconds: 0,
        cycleSeconds: 0,
        xph: 0,
        time: '-',
        cycleTime: '-'
      };
    }

    const oneWay = (distance / speed) * 3600;
    const returnTime = smallMap ? oneWay / 2 : oneWay;
    const cycleSeconds = oneWay + returnTime;
    return {
      travelSeconds: oneWay,
      cycleSeconds,
      xph: 0,
      time: utils.secondsToClock(oneWay),
      cycleTime: utils.secondsToClock(cycleSeconds)
    };
  }

  /**
   * @param {{speed:number,smallMap:boolean}} options
   * @returns {{server:string,coord:string|null,distance:number,bonus:string,animals:Record<string,number>,totalAnimals:number,xp:number,xph:number,time:string,scanDate:string,source:string}|null}
   */
  function parse(options) {
    const roots = findCandidateRoots();
    if (!roots.length) return null;

    const rootElement = roots[0];
    const animals = parseAnimalsByIcons(rootElement);
    const totalAnimals = Object.values(animals).reduce((sum, value) => sum + value, 0);
    if (!totalAnimals) return null;

    const coordInfo = mapParser.resolveCoordinate(rootElement);
    const distance = parseDistance(rootElement);
    const bonus = parseBonus(rootElement);
    const xp = animalsData.calcXp(animals);

    const timeInfo = computeTime(distance, options.speed, options.smallMap);
    const xph = timeInfo.cycleSeconds ? xp / (timeInfo.cycleSeconds / 3600) : 0;

    return {
      server: server.getContext().key,
      coord: coordInfo.coord,
      coordSource: coordInfo.source,
      distance,
      bonus,
      animals,
      totalAnimals,
      xp,
      xph,
      time: timeInfo.time,
      scanDate: new Date().toISOString(),
      source: coordInfo.source
    };
  }

  root.OasisParser = {
    parse
  };
})(window);




// FILE: parser/reportParser.js

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

    return result;
  }

  function inferTroopTypeFromAttackerData(attackerData, tribe) {
    const info = inferUnitInfoFromAttackerData(attackerData, tribe);
    return info ? info.troopType : null;
  }

  function getTroopClassDefinitions() {
    return {
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
  }

  function getClassInfoIndex() {
    const defs = getTroopClassDefinitions();
    const index = {};

    Object.entries(defs).forEach(([tribeName, units]) => {
      Object.entries(units).forEach(([troopType, troopClass]) => {
        index[troopClass] = {
          tribe: tribeName,
          troopType,
          troopClass,
        };
      });
    });

    return index;
  }

  function inferUnitInfoFromAttackerData(attackerData, fallbackTribe) {
    const totals = attackerData?.total || {};
    const candidates = Object.entries(totals)
      .filter(([key, value]) => key !== "hero" && Number(value || 0) > 0)
      .map(([key]) => key);

    if (candidates.length !== 1) return null;

    const troopClass = String(candidates[0] || "");
    const classInfo = getClassInfoIndex()[troopClass];

    if (classInfo) return classInfo;

    const selectedTribe = String(fallbackTribe || "romans");
    const defs = getTroopClassDefinitions();
    const byTribe = defs[selectedTribe] || defs.romans;
    const byClass = Object.entries(byTribe).find(([, cls]) => cls === troopClass);

    if (!byClass) return null;

    return {
      tribe: selectedTribe,
      troopType: byClass[0],
      troopClass,
    };
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

  function parseReportTimestampToken() {
    const rawText = String(
      global.document.body?.innerText ||
        global.document.body?.textContent ||
        "",
    );

    // Data/hora exata exibida no relatorio (ex: 23.08.26, 01:47:10), unica por relatorio.
    const match = rawText.match(
      /(\d{2}[./]\d{2}[./]\d{2,4}),?\s*(\d{2}:\d{2}:\d{2})/,
    );

    if (!match) return null;

    return match[1].replace(/[./]/g, "") + "-" + match[2].replace(/:/g, "");
  }

  function hashText(text) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function parseReportIdFromUrl(contentFingerprint) {
    const params = new URL(global.location.href).searchParams;
    // newdid/uid identify the village/user, not the report.
    const byUrl = params.get("id");
    if (byUrl) return byUrl;

    // Tokens hash-like no path (ex: /report/97e2fdb6c4b1e2d1) sao unicos por relatorio.
    const pathToken = global.location.pathname.match(/[a-f0-9]{12,}/i);
    if (pathToken) return pathToken[0];

    // Data/hora exibida + coordenada evita colidir com o nome da aldeia/oasis.
    const timestamp = parseReportTimestampToken();
    if (timestamp) {
      return "report-" + (parseReportCoord() || "coord") + "-" + timestamp;
    }

    return "report-" + hashText(String(contentFingerprint || ""));
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

    const inferredUnitInfo = inferUnitInfoFromAttackerData(
      attackerData,
      options.tribe,
    );
    const resolvedTribe =
      inferredUnitInfo?.tribe || String(options.tribe || "romans");

    const loss = troops.calcLossCost(resolvedTribe, attackerData.lost || {});

    const lossFromReport = parseLossFromStatisticsTable();

    const totalResources =
      Number(resources.resourcesLoot.total || 0) +
      Number(resources.heroResources.total || 0);

    const finalLoss = lossFromReport > 0 ? lossFromReport : loss.total;
    const profit = totalResources - finalLoss;

    const preferredTroopType = String(options.troopType || "").trim();
    const canUsePreferredTroopType =
      preferredTroopType &&
      preferredTroopType !== "hero" &&
      preferredTroopType !== "custom";

    const selectedTroopType =
      inferredUnitInfo?.troopType ||
      (canUsePreferredTroopType ? preferredTroopType : null);

    const troopClassDefs = getTroopClassDefinitions();
    const selectedTroopClass =
      inferredUnitInfo?.troopClass ||
      troopClassDefs[resolvedTribe]?.[selectedTroopType] ||
      null;

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
      reportId: parseReportIdFromUrl(
        JSON.stringify([
          attackerData.total,
          attackerData.lost,
          attackerData.wounded,
          natureData.total,
          natureData.lost,
          resources.resourcesLoot,
          resources.heroResources,
        ]),
      ),
      server: server.getContext().key,
      tribe: resolvedTribe,
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




// FILE: core/ranking.js

(function initRanking(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  const SORTERS = {
    xph: (a, b) => (b.xph || 0) - (a.xph || 0) || (b.xp || 0) - (a.xp || 0),
    xp: (a, b) => (b.xp || 0) - (a.xp || 0) || (b.xph || 0) - (a.xph || 0),
    distance: (a, b) =>
      (Number(a.distance) > 0 ? Number(a.distance) : Infinity) -
      (Number(b.distance) > 0 ? Number(b.distance) : Infinity),
  };

  /**
   * XP/h is recalculated with the current troop speed instead of the speed used at scan time.
   * @param {Array<any>} oasisRows
   * @param {{speed?:number,smallMap?:boolean,sortBy?:string}} [options]
   * @returns {Array<any>}
   */
  function buildRanking(oasisRows, options = {}) {
    const speed = Number(options.speed || 0);
    const smallMap = Boolean(options.smallMap);
    const sorter = SORTERS[options.sortBy] || SORTERS.xph;

    return (oasisRows || [])
      .map((row) => {
        const distance = Number(row.distance || 0);
        const xp = Number(row.xp || 0);
        let xph = Number(row.xph || 0);
        let time = row.time;

        if (distance > 0 && speed > 0) {
          const oneWay = (distance / speed) * 3600;
          const cycleSeconds = oneWay + (smallMap ? oneWay / 2 : oneWay);
          xph = xp / (cycleSeconds / 3600);
          time = root.Utils.secondsToClock(oneWay);
        }

        return {
          coord: row.coord,
          distance: row.distance,
          xp,
          xph,
          time,
          bonus: row.bonus,
          scanDate: row.scanDate
        };
      })
      .sort(sorter);
  }

  root.Ranking = {
    buildRanking
  };
})(window);




// FILE: core/economy.js

(function initEconomy(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  /**
   * @param {Array<any>} reports
   * @returns {{netProfit:number,profitPerHour:number,profitPerMinute:number,xpPerHour:number,resourcesPerHour:number,losses:number,roi:number,totalResources:number,totalXp:number}}
   */
  function calculateSummary(reports) {
    const list = reports || [];
    const totalResources = list.reduce((sum, report) => sum + Number(report.totalResources || 0), 0);
    const losses = list.reduce((sum, report) => sum + Number(report.lossCost || 0), 0);
    const netProfit = totalResources - losses;
    const totalXp = list.reduce((sum, report) => sum + Number(report.xp || 0), 0);

    if (!list.length) {
      return {
        netProfit: 0,
        profitPerHour: 0,
        profitPerMinute: 0,
        xpPerHour: 0,
        resourcesPerHour: 0,
        losses: 0,
        roi: 0,
        totalResources: 0,
        totalXp: 0
      };
    }

    const sorted = list
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const firstAt = new Date(sorted[0].date).getTime();
    const lastAt = new Date(sorted[sorted.length - 1].date).getTime();
    const elapsedMs = Math.max(lastAt - firstAt, 60 * 1000);
    const elapsedHours = elapsedMs / 3600000;

    const profitPerHour = netProfit / elapsedHours;
    const profitPerMinute = profitPerHour / 60;
    const xpPerHour = totalXp / elapsedHours;
    const resourcesPerHour = totalResources / elapsedHours;
    const roi = losses > 0 ? netProfit / losses : 0;

    return {
      netProfit,
      profitPerHour,
      profitPerMinute,
      xpPerHour,
      resourcesPerHour,
      losses,
      roi,
      totalResources,
      totalXp
    };
  }

  root.Economy = {
    calculateSummary
  };
})(window);




// FILE: core/battleAI.js

(function initBattleAI(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  /**
   * Estrutura base para IA futura: por oasis, registra historico de resultados.
   * @param {Array<any>} reports
   * @returns {Record<string,{coord:string,attacks:number,avgLoss:number,avgProfit:number,avgXp:number,lastDate:string}>}
   */
  function buildOasisHistory(reports) {
    const result = {};

    (reports || []).forEach((report) => {
      const coord = report.coord || 'unknown';
      if (!result[coord]) {
        result[coord] = {
          coord,
          attacks: 0,
          avgLoss: 0,
          avgProfit: 0,
          avgXp: 0,
          lastDate: report.date || new Date().toISOString(),
          _sumLoss: 0,
          _sumProfit: 0,
          _sumXp: 0
        };
      }

      const row = result[coord];
      row.attacks += 1;
      row._sumLoss += Number(report.lossCost || 0);
      row._sumProfit += Number(report.profit || 0);
      row._sumXp += Number(report.xp || 0);
      row.lastDate = report.date || row.lastDate;
    });

    Object.values(result).forEach((row) => {
      row.avgLoss = row.attacks ? row._sumLoss / row.attacks : 0;
      row.avgProfit = row.attacks ? row._sumProfit / row.attacks : 0;
      row.avgXp = row.attacks ? row._sumXp / row.attacks : 0;
      delete row._sumLoss;
      delete row._sumProfit;
      delete row._sumXp;
    });

    return result;
  }

  root.BattleAI = {
    buildOasisHistory
  };
})(window);




// FILE: core/battleAdvisor.js

(function initBattleAdvisor(global) {
  "use strict";

  const root = (global.NytrinA = global.NytrinA || {});

  // Travian nature defense values: [vs infantry, vs cavalry].
  const ANIMAL_DEFENSE = {
    rato: [25, 20],
    aranha: [35, 40],
    cobra: [40, 60],
    morcego: [66, 50],
    javali: [70, 33],
    lobo: [80, 70],
    urso: [140, 200],
    crocodilo: [380, 240],
    tigre: [170, 250],
    elefante: [440, 520],
  };

  const TROOP_ATTACK = {
    legionnaire: { attack: 40, cavalry: false },
    praetorian: { attack: 30, cavalry: false },
    imperian: { attack: 70, cavalry: false },
    equites_legati: { attack: 0, cavalry: true },
    equites_imperatoris: { attack: 120, cavalry: true },
    equites_caesaris: { attack: 180, cavalry: true },
    ram: { attack: 60, cavalry: false },
    fire_catapult: { attack: 75, cavalry: false },
    clubman: { attack: 40, cavalry: false },
    spearman: { attack: 10, cavalry: false },
    axeman: { attack: 60, cavalry: false },
    scout: { attack: 0, cavalry: true },
    paladin: { attack: 55, cavalry: true },
    teutonic_knight: { attack: 150, cavalry: true },
    phalanx: { attack: 15, cavalry: false },
    swordsman: { attack: 65, cavalry: false },
    pathfinder: { attack: 0, cavalry: true },
    theutates_thunder: { attack: 90, cavalry: true },
    druidrider: { attack: 45, cavalry: true },
    haeduan: { attack: 140, cavalry: true },
  };

  function calcAnimalDefense(animals, cavalry) {
    const index = cavalry ? 1 : 0;
    return Object.entries(animals || {}).reduce((sum, [key, qty]) => {
      return sum + Number(qty || 0) * Number(ANIMAL_DEFENSE[key]?.[index] || 0);
    }, 0);
  }

  function recommend({ animals, troopType }) {
    const troop = TROOP_ATTACK[troopType] || null;
    const attack = Number(troop?.attack || 0);
    const cavalry = Boolean(troop?.cavalry);
    const defense = calcAnimalDefense(animals, cavalry);

    if (!defense || !attack) {
      return {
        ok: false,
        message: troop && !attack
          ? "Tropa de reconhecimento não ataca oásis."
          : "Sem dados suficientes para recomendar.",
      };
    }

    function calc(hero) {
      const heroBonus = hero ? 500 : 0;
      const adjustedDefense = Math.max(defense - heroBonus, defense * 0.35);
      const minTroops = Math.max(1, Math.ceil(adjustedDefense / attack));
      const safeTroops = Math.max(1, Math.ceil(minTroops * 1.8));
      const profitTroops = Math.max(1, Math.ceil(minTroops * 1.25));

      return { minTroops, safeTroops, profitTroops };
    }

    return {
      ok: true,
      defense,
      attack,
      cavalry,
      withHero: calc(true),
      withoutHero: calc(false),
    };
  }

  root.BattleAdvisor = {
    recommend,
    calcAnimalDefense,
  };
})(window);




// FILE: core/battleLearning.js

(function initBattleKnowledge(global) {
  "use strict";

  const root = (global.NytrinA = global.NytrinA || {});

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function confidenceFromCalibration(calibration) {
    const samples = Number(calibration?.samples || 0);

    if (samples <= 0) {
      return {
        label: "Sem dados",
        stars: 1,
        score: 0,
      };
    }

    const successSamples = Number(calibration?.successSamples || 0);
    const perfectSamples = Number(calibration?.perfectSamples || 0);
    const failureSamples = Number(calibration?.failureSamples || 0);
    const successRate =
      samples > 0 ? clamp(successSamples / samples, 0, 1) : 0;
    const perfectRate =
      samples > 0 ? clamp(perfectSamples / samples, 0, 1) : 0;
    const failureRate =
      samples > 0 ? clamp(failureSamples / samples, 0, 1) : 0;

    const sampleScore = clamp(samples / 15, 0, 1);

    const score =
      sampleScore * 0.45 +
      successRate * 0.3 +
      perfectRate * 0.2 +
      (1 - failureRate) * 0.05;

    const stars = clamp(Math.round(score * 4) + 1, 1, 5);

    let label = "Baixa";
    if (score >= 0.8) {
      label = "Alta";
    } else if (score >= 0.5) {
      label = "Média";
    }

    return {
      label,
      stars,
      score,
    };
  }

  function starsText(stars) {
    const safe = clamp(Math.round(Number(stars || 1)), 1, 5);
    return "★".repeat(safe) + "☆".repeat(5 - safe);
  }

  function confidenceSafetyMultiplier(score, sampleCount) {
    const safeScore = clamp(Number(score || 0), 0, 1);
    const samples = Number(sampleCount || 0);

    if (samples < 3) return 1.3;
    if (samples < 5) return 1.26;
    if (samples < 8) return 1.18;

    // Margem automática para reduzir risco quando a base ainda é incerta.
    // Reduzido vs original: menos penalidade quando tem dados bons
    if (safeScore >= 0.8) return 1.03;   // Bem reduzido: 3% vs 0% antes
    if (safeScore >= 0.6) return 1.06;   // Reduzido: 6% vs 8% antes
    if (safeScore < 0.5) return 1.12;    // Um pouco reduzido: 12% vs 15% antes
    return 1.08;
  }

  function percentile(sortedValues, p) {
    const list = Array.isArray(sortedValues) ? sortedValues : [];

    if (!list.length) return 1;

    const safeP = clamp(Number(p || 0), 0, 1);
    const idx = Math.max(0, Math.min(list.length - 1, Math.ceil(list.length * safeP) - 1));
    return Number(list[idx] || 1);
  }

  function operationalConfidenceExtraMultiplier(score, sampleCount) {
    const safeScore = clamp(Number(score || 0), 0, 1);
    const samples = Number(sampleCount || 0);

    if (samples < 3) return 1.18;
    if (samples < 5) return 1.13;

    // Com base ampla, desliga o extra operacional para evitar inflação.
    if (samples >= 20) return 1;

    // Com base razoável, reduz gradualmente
    if (samples >= 15) return 1.05;
    if (samples >= 10) return 1.08;

    // Modo operacional: extra aplicado por cima da margem base de confiança.
    if (safeScore < 0.5) return 1.24;
    if (safeScore < 0.8) return 1.13;
    return 1;
  }

  function troopUnitTotalCost(tribe, troopType) {
    const tribeCosts = root.Troops?.costs?.[tribe] || {};
    const match = Object.values(tribeCosts).find(
      (unit) => String(unit?.key || "") === String(troopType || ""),
    );

    if (!match) return 0;

    return (
      Number(match.wood || 0) +
      Number(match.clay || 0) +
      Number(match.iron || 0) +
      Number(match.crop || 0)
    );
  }

  function targetCasualtyRateForTroop(unitCost, tribe, troopType) {
    const safeUnitCost = Number(unitCost || 0);
    const safeTribe = String(tribe || "");
    const safeTroopType = String(troopType || "");

    // Teutões no farm constante tendem a sofrer quando a taxa sobe demais.
    // Define alvos mais rígidos para preservar lucro líquido por envio.
    if (safeTribe === "teutons") {
      if (safeTroopType === "teutonic_knight") return 0.032;
      if (safeTroopType === "paladin") return 0.042;
      if (safeTroopType === "clubman") return 0.052;
      return 0.05;
    }

    if (safeUnitCost >= 1800) return 0.03;
    if (safeUnitCost >= 1200) return 0.04;
    if (safeUnitCost >= 700) return 0.055;
    return 0.065;
  }

  function teutonProfitShieldMultiplier({
    tribe,
    casualtyRate,
    sampleCount,
    confidenceScore,
  }) {
    const safeTribe = String(tribe || "");
    if (safeTribe !== "teutons") return 1;

    const safeCasualtyRate = clamp(Number(casualtyRate || 0), 0, 1);
    const samples = Number(sampleCount || 0);
    const safeConfidence = clamp(Number(confidenceScore || 0), 0, 1);

    if (samples < 4) return 1;
    if (safeCasualtyRate >= 0.14) return 1.2;
    if (safeCasualtyRate >= 0.1) return 1.14;
    if (safeCasualtyRate >= 0.075) return 1.08;
    if (safeCasualtyRate >= 0.06 && safeConfidence < 0.8) return 1.04;
    return 1;
  }

  function preservationMultiplier({
    tribe,
    troopType,
    casualtyRate,
    confidenceScore,
    sampleCount,
  }) {
    const safeCasualtyRate = clamp(Number(casualtyRate || 0), 0, 1);

    if (safeCasualtyRate <= 0) return 1;

    const unitCost = troopUnitTotalCost(tribe, troopType);
    const targetRate = targetCasualtyRateForTroop(unitCost, tribe, troopType);

    if (safeCasualtyRate <= targetRate) return 1;

    const ratio = safeCasualtyRate / Math.max(targetRate, 0.01);
    
    let confidenceDampener =
      Number(sampleCount || 0) >= 20 && Number(confidenceScore || 0) >= 0.8
        ? 0.78
        : Number(sampleCount || 0) >= 10 && Number(confidenceScore || 0) >= 0.6
          ? 0.86
          : 0.92;

    // Para Teutões, quando a taxa de perda sobe, pesa mais a preservação.
    if (String(tribe || "") === "teutons") {
      confidenceDampener += Number(sampleCount || 0) >= 10 ? 0.03 : 0.02;
    }

    if (safeCasualtyRate >= 0.12) {
      confidenceDampener += 0.05;
    }

    confidenceDampener = clamp(confidenceDampener, 0.7, 1.02);

    return Math.max(1, Math.pow(ratio, confidenceDampener));
  }

  function preservationMultiplierCap(theoreticalTroops) {
    const troops = Number(theoreticalTroops || 0);

    if (troops <= 40) return 1.2;
    if (troops <= 70) return 1.35;
    if (troops <= 110) return 1.55;
    if (troops <= 170) return 1.8;
    return 2.05;
  }

  function totalSafetyCapByTroop({
    tribe,
    troopType,
    confidenceScore,
    sampleCount,
  }) {
    const unitCost = troopUnitTotalCost(tribe, troopType);
    const score = clamp(Number(confidenceScore || 0), 0, 1);
    const samples = Number(sampleCount || 0);

    // Tropa barata (ex.: salteador) recebe teto menor para reduzir oversend
    // e melhorar retorno líquido em farm de oásis.
    let cap = 1.45;

    if (samples < 3) cap += 0.28;
    else if (samples < 5) cap += 0.2;
    else if (samples < 8) cap += 0.12;

    if (unitCost >= 1800) cap = 2.2;
    else if (unitCost >= 1200) cap = 1.95;
    else if (unitCost >= 700) cap = 1.75;

    if (samples >= 20 && score >= 0.8) {
      cap += 0.1;
    } else if (samples >= 10 && score >= 0.6) {
      cap += 0.05;
    }

    return cap;
  }

  function simulationSafetyMultiplier(calibration, sampleCount) {
    const samples = Number(sampleCount || 0);
    const avgKillRate = Number(calibration?.avgKillRate || 0);
    const avgCasualtyRate = Number(calibration?.avgCasualtyRate || 0);
    const negativeProfitSamples = Number(calibration?.negativeProfitSamples || 0);
    const lossPressure = samples > 0 ? negativeProfitSamples / samples : 0;

    let multiplier = 1.35;

    if (samples < 3) multiplier = 2.15;
    else if (samples < 5) multiplier = 1.85;
    else if (samples < 8) multiplier = 1.55;
    else if (samples < 15) multiplier = 1.32;
    else multiplier = 1.18;

    if (avgKillRate < 0.9) multiplier += 0.18;
    if (avgKillRate < 0.8) multiplier += 0.18;
    if (avgCasualtyRate > 0.05) multiplier += Math.min(0.2, avgCasualtyRate * 2);
    if (lossPressure >= 0.5) multiplier += 0.18;
    if (lossPressure >= 0.75) multiplier += 0.12;

    return clamp(multiplier, 1.15, 2.6);
  }

  function economicSafetyMultiplier(calibration, troopType) {
    const losses = Number(calibration?.sumLosses || 0);
    const profit = Number(calibration?.sumProfit || 0);
    const samples = Number(calibration?.samples || 0);
    const negativeProfitSamples = Number(calibration?.negativeProfitSamples || 0);

    if (samples < 5 || losses <= 0) return 1;

    const roi = profit / losses;
    const cheapTroop = ["clubman", "legionnaire", "phalanx"].includes(
      String(troopType || ""),
    );

    // ROI ruim deve aumentar proteção (menos mortes), não derrubar envio.
    // O ajuste anterior podia reduzir demais e provocar ciclo de baixas.
    const lossPressure = samples > 0 ? negativeProfitSamples / samples : 0;

    if (roi < 0) return cheapTroop ? 1.12 : 1.18;
    if (roi < 0.25) return cheapTroop ? 1.08 : 1.12;
    if (roi < 0.5) return cheapTroop ? 1.04 : 1.06;

    if (lossPressure >= 0.5) return cheapTroop ? 1.05 : 1.08;
    return 1;
  }

  function nonClearSafetyMultiplier(killRate, casualtyRate) {
    const safeKillRate = clamp(Number(killRate || 0), 0, 1);
    const safeCasualtyRate = clamp(Number(casualtyRate || 0), 0, 1);

    let baseMultiplier = 1.15;

    if (safeKillRate >= 0.95) {
      baseMultiplier = 1.05;
    } else if (safeKillRate >= 0.85) {
      baseMultiplier = 1.08;
    } else if (safeKillRate >= 0.7) {
      baseMultiplier = 1.12;
    }

    const casualtyMultiplier = 1 + safeCasualtyRate * 1.35;
    return Math.max(baseMultiplier, casualtyMultiplier);
  }

  function normalizeAnimals(animals) {
    const empty = root.Animals.emptyAnimals();

    return {
      ...empty,
      ...(animals || {}),
    };
  }

  function troopClassMapByTribe(tribe) {
    const selected = String(tribe || "romans");

    const map = {
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

    return map[selected] || map.romans;
  }

  function allTroopClassMaps() {
    return {
      romans: troopClassMapByTribe("romans"),
      teutons: troopClassMapByTribe("teutons"),
      gauls: troopClassMapByTribe("gauls"),
    };
  }

  function classInfoByClassToken(troopClass) {
    const token = String(troopClass || "");
    const allMaps = allTroopClassMaps();

    for (const [tribeName, map] of Object.entries(allMaps)) {
      const match = Object.entries(map).find(([, cls]) => String(cls) === token);
      if (match) {
        return {
          tribe: tribeName,
          troopType: match[0],
          troopClass: token,
        };
      }
    }

    return null;
  }

  function inferTroopTypeFromTroopsSent(tribe, troopsSent) {
    const sent = troopsSent && typeof troopsSent === "object" ? troopsSent : {};
    const classMap = troopClassMapByTribe(tribe);

    const classToType = Object.entries(classMap).reduce((acc, [type, cls]) => {
      acc[cls] = type;
      return acc;
    }, {});

    const candidates = Object.entries(sent)
      .filter(([key, value]) => key !== "hero" && Number(value || 0) > 0)
      .map(([key]) => key);

    if (candidates.length !== 1) return null;

    return classToType[candidates[0]] || null;
  }

  function inferTroopInfoFromTroopsSentAnyTribe(troopsSent, preferredTribe) {
    const sent = troopsSent && typeof troopsSent === "object" ? troopsSent : {};
    const candidates = Object.entries(sent)
      .filter(([key, value]) => key !== "hero" && Number(value || 0) > 0)
      .map(([key]) => key);

    if (candidates.length !== 1) return null;

    const troopClass = String(candidates[0] || "");
    const byClass = classInfoByClassToken(troopClass);
    if (byClass) return byClass;

    const tribe = String(preferredTribe || "romans");
    const classMap = troopClassMapByTribe(tribe);
    const byTribe = Object.entries(classMap).find(
      ([, cls]) => String(cls) === troopClass,
    );

    if (!byTribe) return null;

    return {
      troopClass,
      tribe,
      troopType: byTribe[0],
    };
  }

  function resolveTroopTypeAndSent(report) {
    let tribe = report?.tribe || "romans";
    let classMap = troopClassMapByTribe(tribe);
    const troopsSent =
      report?.troopsSent && typeof report.troopsSent === "object"
        ? report.troopsSent
        : {};

    let troopType = String(report?.troopType || "").trim() || null;
    if (troopType === "hero" || troopType === "custom") {
      troopType = null;
    }

    if (!troopType && report?.troopClass) {
      const classInfo = classInfoByClassToken(report.troopClass);
      if (classInfo?.troopType) {
        tribe = classInfo.tribe;
        classMap = troopClassMapByTribe(tribe);
        troopType = classInfo.troopType;
      } else {
        const byClass = Object.entries(classMap).find(
          ([, cls]) => String(cls) === String(report.troopClass),
        );
        troopType = byClass ? byClass[0] : null;
      }
    }

    if (!troopType) {
      const anyInfo = inferTroopInfoFromTroopsSentAnyTribe(troopsSent, tribe);
      if (anyInfo?.troopType) {
        tribe = anyInfo.tribe;
        classMap = troopClassMapByTribe(tribe);
        troopType = anyInfo.troopType;
      } else {
        troopType = inferTroopTypeFromTroopsSent(tribe, troopsSent);
      }
    }

    if (troopType === "hero" || troopType === "custom") {
      troopType = inferTroopInfoFromTroopsSentAnyTribe(troopsSent, tribe)?.troopType || null;
    }

    let sent = Number(report?.troopsSentCount || 0);

    if (sent <= 0 && troopType) {
      const troopClass = classMap[troopType] || null;
      if (troopClass) {
        sent = Number(troopsSent[troopClass] || 0);
      }
    }

    if (sent <= 0 && report?.troopClass) {
      sent = Number(troopsSent[report.troopClass] || 0);
    }

    return {
      tribe,
      troopType,
      sent,
    };
  }

  function makeSignature(xp, animals) {
    const a = normalizeAnimals(animals);

    return [
      Math.round(Number(xp || 0)),
      Number(a.rato || 0),
      Number(a.aranha || 0),
      Number(a.cobra || 0),
      Number(a.morcego || 0),
      Number(a.javali || 0),
      Number(a.lobo || 0),
      Number(a.urso || 0),
      Number(a.crocodilo || 0),
      Number(a.tigre || 0),
      Number(a.elefante || 0),
    ].join("|");
  }

  function knowledgeId(tribe, troopType, xp, animals) {
    return (
      "battleKnowledge:" +
      tribe +
      ":" +
      troopType +
      ":" +
      makeSignature(xp, animals)
    );
  }

  async function getKnowledge(storage, tribe, troopType, xp, animals) {
    const id = knowledgeId(tribe, troopType, xp, animals);

    const saved = await storage.get(root.Constants.STORES.STATISTICS, id);

    const knowledge = saved || {
      id,
      tribe,
      troopType,
      signature: makeSignature(xp, animals),
      xp: Number(xp || 0),
      animals: normalizeAnimals(animals),
      samples: 0,
      minSuccess: 0,
      maxFailure: 0,

      perfectSuccess: 0,
      clearedWithLosses: 0,
      almostCleared: 0,
      partial: 0,
      failures: 0,

      bestKillRate: 0,
      lowestTroopLossRate: null,

      estimatedClear: 0,
      estimatedSafe: 0,

      lastOutcome: null,
      lastBattle: null,
      updatedAt: null,
    };

    // Compatibilidade com conhecimentos gravados pela versão antiga.
    knowledge.samples = Number(knowledge.samples || 0);
    knowledge.minSuccess = Number(knowledge.minSuccess || 0);
    knowledge.maxFailure = Number(knowledge.maxFailure || 0);

    knowledge.perfectSuccess = Number(knowledge.perfectSuccess || 0);
    knowledge.clearedWithLosses = Number(knowledge.clearedWithLosses || 0);
    knowledge.almostCleared = Number(knowledge.almostCleared || 0);
    knowledge.partial = Number(knowledge.partial || 0);
    knowledge.failures = Number(knowledge.failures || 0);

    knowledge.bestKillRate = Number(knowledge.bestKillRate || 0);

    if (knowledge.lowestTroopLossRate === undefined) {
      knowledge.lowestTroopLossRate = null;
    }

    if (knowledge.lastOutcome === undefined) {
      knowledge.lastOutcome = null;
    }

    if (knowledge.lastBattle === undefined) {
      knowledge.lastBattle = null;
    }

    knowledge.estimatedClear = Number(knowledge.estimatedClear || 0);
    knowledge.estimatedSafe = Number(knowledge.estimatedSafe || 0);

    return knowledge;
  }

  async function saveKnowledge(storage, knowledge) {
    knowledge.updatedAt = new Date().toISOString();
    await storage.put(root.Constants.STORES.STATISTICS, knowledge);
    return knowledge;
  }

  async function learnFromReport({ storage, report }) {
    if (!report) {
      return null;
    }

    const defaultTribe = report.tribe || "romans";
    const resolved = resolveTroopTypeAndSent(report);
    const tribe = resolved.tribe || defaultTribe;
    const troopType = resolved.troopType;
    const sent = Number(resolved.sent || 0);
    const xp = Number(report.xp || 0);
    const animals = report.animalsInitial || report.animalsKilled || {};

    if (!troopType) {
      return null;
    }

    if (!sent) {
      return null;
    }

    const cleared = Boolean(report.cleared);
    const killRate = Number(report.killRate || 0);
    const troopLossRate = Number(report.troopLossRate || 0);
    const remaining = Number(report.totalAnimalsRemaining || 0);

    let outcome = "failure";

    if (
      cleared &&
      Number(report.troopsLostCount || 0) === 0 &&
      Number(report.troopsWoundedCount || 0) === 0
    ) {
      outcome = "perfect";
    } else if (cleared) {
      outcome = "cleared_with_losses";
    } else if (killRate >= 0.95) {
      outcome = "almost_cleared";
    } else if (killRate >= 0.7) {
      outcome = "partial";
    }
    let estimatedClear = 0;
    let estimatedSafe = 0;
    const troopCasualtyRate = Number(report.troopCasualtyRate || 0);

    if (!cleared && sent > 0 && killRate > 0) {
      // Estimativa proporcional para atingir 100% de eliminação.
      estimatedClear = Math.ceil(sent / killRate);

      // Considera tanto taxa de abate quanto o peso real das baixas.
      const safetyMultiplier = nonClearSafetyMultiplier(
        killRate,
        troopCasualtyRate,
      );
      estimatedSafe = Math.ceil(estimatedClear * safetyMultiplier);
    } else if (outcome === "cleared_with_losses" && sent > 0) {
      estimatedClear = sent;

      // Se limpou com perdas, sobe a recomendação para priorizar tentativa sem perdas.
      const multiplier = Math.max(1.05, 1 + troopCasualtyRate * 2);
      estimatedSafe = Math.ceil(sent * multiplier);
    } else if (outcome === "perfect" && sent > 0) {
      estimatedClear = sent;
      estimatedSafe = sent;
    }

    const knowledge = await getKnowledge(
      storage,
      tribe,
      troopType,
      xp,
      animals,
    );

    knowledge.samples++;

    knowledge.lastOutcome = outcome;
    knowledge.bestKillRate = Math.max(
      Number(knowledge.bestKillRate || 0),
      killRate,
    );

    if (estimatedClear > 0) {
      knowledge.estimatedClear = estimatedClear;
    }

    if (estimatedSafe > 0) {
      knowledge.estimatedSafe = Math.max(
        Number(knowledge.estimatedSafe || 0),
        estimatedSafe,
      );
    }

    if (
      knowledge.lowestTroopLossRate === null ||
      troopLossRate < Number(knowledge.lowestTroopLossRate)
    ) {
      knowledge.lowestTroopLossRate = troopLossRate;
    }

    if (outcome === "perfect") {
      knowledge.perfectSuccess += 1;

      knowledge.minSuccess =
        knowledge.minSuccess > 0 ? Math.min(knowledge.minSuccess, sent) : sent;
    } else if (outcome === "cleared_with_losses") {
      knowledge.clearedWithLosses += 1;

      knowledge.minSuccess =
        knowledge.minSuccess > 0 ? Math.min(knowledge.minSuccess, sent) : sent;
    } else if (outcome === "almost_cleared") {
      knowledge.almostCleared += 1;

      knowledge.maxFailure = Math.max(Number(knowledge.maxFailure || 0), sent);
    } else if (outcome === "partial") {
      knowledge.partial += 1;

      knowledge.maxFailure = Math.max(Number(knowledge.maxFailure || 0), sent);
    } else {
      knowledge.failures += 1;

      knowledge.maxFailure = Math.max(Number(knowledge.maxFailure || 0), sent);
    }

    knowledge.lastBattle = {
      sent,
      lost: Number(report.troopsLostCount || 0),
      wounded: Number(report.troopsWoundedCount || 0),
      casualties: Number(report.troopsCasualtiesCount || 0),

      remaining,
      killRate,

      troopLossRate: Number(report.troopLossRate || 0),
      troopCasualtyRate: Number(report.troopCasualtyRate || 0),

      estimatedClear,
      estimatedSafe,

      cleared,
      outcome,
      reportId: report.reportId || null,
      reportSeq: Number(report.reportSeq || 0) || null,
      date: report.date || new Date().toISOString(),
    };

    const hasHero = Boolean(report.hasHero);
    const troopsCasualtiesCount = Number(report.troopsCasualtiesCount || 0);

    await updateCalibration({
      storage,
      tribe,
      troopType,
      hasHero,
      sent,
      killRate,
      cleared,
      troopsLostCount: Number(report.troopsLostCount || 0),
      troopsWoundedCount: Number(report.troopsWoundedCount || 0),
      troopsCasualtiesCount,
      totalAnimalsRemaining: remaining,
      totalResources: Number(report.totalResources || 0),
      lossCost: Number(report.lossCost || 0),
      profit: Number(report.profit || 0),
    });

    return await saveKnowledge(storage, knowledge);
  }

  function suggestFromKnowledge(knowledge) {
    if (!knowledge) return null;

    const samples = Number(knowledge.samples || 0);
    const last = knowledge.lastBattle || null;
    const minSuccess = Number(knowledge.minSuccess || 0);
    const estimatedSafe = Number(knowledge.estimatedSafe || 0);

    // Já houve uma batalha perfeita.
    if (last && last.outcome === "perfect" && Number(last.sent || 0) > 0) {
      return {
        ok: true,
        source: "knowledge-perfect",
        suggestedTroops: Number(last.sent),
        confidence: samples,
        message: "Quantidade já testada sem mortos e sem enfermaria.",
      };
    }

    // Limpou, mas houve mortos ou feridos.
    if (
      last &&
      last.outcome === "cleared_with_losses" &&
      Number(last.sent || 0) > 0
    ) {
      const casualtyRate = Number(last.troopCasualtyRate || 0);

      // Quanto mais baixas, maior a correção.
      const multiplier = Math.max(1.05, 1 + casualtyRate * 2);

      return {
        ok: true,
        source: "knowledge-cleared-with-losses",
        suggestedTroops: Math.ceil(Number(last.sent) * multiplier),
        confidence: samples,
        message: "Limpou, mas a quantidade foi aumentada para reduzir baixas.",
      };
    }

    // Ataque que não limpou: usa a estimativa proporcional com margem.
    if (estimatedSafe > 0) {
      return {
        ok: true,
        source: "knowledge-estimated",
        suggestedTroops: estimatedSafe,
        confidence: samples,
        message:
          "Estimativa ajustada pelo percentual real de animais eliminados.",
      };
    }

    // Compatibilidade com conhecimentos antigos.
    if (minSuccess > 0) {
      return {
        ok: true,
        source: "knowledge-success",
        suggestedTroops: minSuccess,
        confidence: samples,
        message: "Baseado em uma batalha que limpou o oásis.",
      };
    }

    const maxFailure = Number(knowledge.maxFailure || 0);

    if (maxFailure > 0) {
      return {
        ok: true,
        source: "knowledge-failed",
        suggestedTroops: Math.ceil(maxFailure * 1.15),
        confidence: samples,
        message: "Baseado na maior quantidade que ainda falhou.",
      };
    }

    return null;
  }

  root.BattleKnowledge = {
    makeSignature,
    knowledgeId,
    calibrationId,
    getKnowledge,
    learnFromReport,
    suggestFromKnowledge,

    getCalibration,
    resetCalibration,
    updateCalibration,
    applyCalibration,
    confidenceFromCalibration,
    starsText,
  };

  function calibrationId(tribe, troopType, hasHero) {
    return [
      "battleCalibration",
      tribe || "romans",
      troopType || "unknown",
      hasHero ? "hero" : "nohero",
    ].join(":");
  }

  async function getCalibration(storage, tribe, troopType, hasHero) {
    const id = calibrationId(tribe, troopType, hasHero);

    const saved = await storage.get(root.Constants.STORES.STATISTICS, id);

    const calibration = saved || {
      id,
      tribe,
      troopType,
      hasHero: Boolean(hasHero),
      samples: 0,

      successSamples: 0,
      failureSamples: 0,
      perfectSamples: 0,
      clearedWithLossesSamples: 0,

      sumKillRate: 0,
      sumCasualtyRate: 0,
      sumResources: 0,
      sumLosses: 0,
      sumProfit: 0,
      negativeProfitSamples: 0,

      minClearTroops: 0,
      minPerfectTroops: 0,
      maxFailedTroops: 0,

      factorSum: 0,
      averageFactor: 1,
      maxFactor: 1,
      factorSamples: [],
      lastOutcome: null,
      lastBattle: null,
      updatedAt: null,
    };

    calibration.samples = Number(calibration.samples || 0);
    calibration.successSamples = Number(calibration.successSamples || 0);
    calibration.failureSamples = Number(calibration.failureSamples || 0);
    calibration.perfectSamples = Number(calibration.perfectSamples || 0);
    calibration.clearedWithLossesSamples = Number(
      calibration.clearedWithLossesSamples || 0,
    );
    calibration.sumKillRate = Number(calibration.sumKillRate || 0);
    calibration.sumCasualtyRate = Number(calibration.sumCasualtyRate || 0);
    calibration.sumResources = Number(calibration.sumResources || 0);
    calibration.sumLosses = Number(calibration.sumLosses || 0);
    calibration.sumProfit = Number(calibration.sumProfit || 0);
    calibration.negativeProfitSamples = Number(
      calibration.negativeProfitSamples || 0,
    );
    calibration.minClearTroops = Number(calibration.minClearTroops || 0);
    calibration.minPerfectTroops = Number(calibration.minPerfectTroops || 0);
    calibration.maxFailedTroops = Number(calibration.maxFailedTroops || 0);
    calibration.factorSum = Number(calibration.factorSum || 0);
    calibration.averageFactor = Number(calibration.averageFactor || 1);
    calibration.maxFactor = Number(calibration.maxFactor || 1);
    calibration.factorSamples = Array.isArray(calibration.factorSamples)
      ? calibration.factorSamples
          .map((value) => Number(value || 0))
          .filter((value) => Number.isFinite(value) && value >= 1)
      : [];
    calibration.hasHero = Boolean(hasHero);

    if (calibration.lastOutcome === undefined) {
      calibration.lastOutcome = null;
    }

    if (calibration.lastBattle === undefined) {
      calibration.lastBattle = null;
    }

    calibration.avgKillRate =
      calibration.samples > 0
        ? calibration.sumKillRate / calibration.samples
        : 0;

    calibration.avgCasualtyRate =
      calibration.samples > 0
        ? calibration.sumCasualtyRate / calibration.samples
        : 0;

    const confidence = confidenceFromCalibration(calibration);
    calibration.confidence = confidence.label;
    calibration.confidenceStars = confidence.stars;

    return calibration;
  }

  async function resetCalibration({
    storage,
    tribe,
    troopType,
    hasHero,
  }) {
    if (!storage || !troopType) return false;

    const id = calibrationId(tribe, troopType, hasHero);
    await storage.delete(root.Constants.STORES.STATISTICS, id);
    return true;
  }

  async function updateCalibration({
    storage,
    tribe,
    troopType,
    hasHero,
    sent,
    killRate,
    cleared,
    troopsLostCount,
    troopsWoundedCount,
    troopsCasualtiesCount,
    totalAnimalsRemaining,
    totalResources,
    lossCost,
    profit,
  }) {
    if (!storage || !troopType || sent <= 0 || killRate <= 0) {
      return null;
    }

    const casualties =
      Number(troopsCasualtiesCount || 0) ||
      Number(troopsLostCount || 0) + Number(troopsWoundedCount || 0);

    const casualtyRate = sent > 0 ? casualties / sent : 0;
    const remaining = Number(totalAnimalsRemaining || 0);

    const outcome = cleared
      ? casualties === 0
        ? "perfect"
        : "cleared_with_losses"
      : remaining > 0 && killRate >= 0.95
        ? "almost_cleared"
        : "failure";

    let requiredSafe = sent;

    if (!cleared) {
      const estimatedClear = sent / killRate;

      const margin = nonClearSafetyMultiplier(killRate, casualtyRate);
      requiredSafe = estimatedClear * margin;
    } else {
      if (casualtyRate > 0) {
        requiredSafe = sent * Math.max(1.05, 1 + casualtyRate * 2);
      }
    }

    const factor = Math.max(1, requiredSafe / sent);

    const calibration = await getCalibration(
      storage,
      tribe,
      troopType,
      hasHero,
    );

    calibration.samples += 1;
    calibration.sumKillRate += clamp(killRate, 0, 1);
    calibration.sumCasualtyRate += clamp(casualtyRate, 0, 1);
    calibration.sumResources += Number(totalResources || 0);
    calibration.sumLosses += Number(lossCost || 0);
    calibration.sumProfit += Number(profit || 0);

    if (Number(profit || 0) < 0) {
      calibration.negativeProfitSamples += 1;
    }

    if (cleared) {
      calibration.successSamples += 1;

      calibration.minClearTroops =
        calibration.minClearTroops > 0
          ? Math.min(calibration.minClearTroops, sent)
          : sent;

      if (casualties === 0) {
        calibration.perfectSamples += 1;
        calibration.minPerfectTroops =
          calibration.minPerfectTroops > 0
            ? Math.min(calibration.minPerfectTroops, sent)
            : sent;
      } else {
        calibration.clearedWithLossesSamples += 1;
      }
    } else {
      calibration.failureSamples += 1;
      calibration.maxFailedTroops = Math.max(
        Number(calibration.maxFailedTroops || 0),
        sent,
      );
    }

    calibration.factorSum += factor;
    calibration.averageFactor = calibration.factorSum / calibration.samples;
    calibration.maxFactor = Math.max(
      Number(calibration.maxFactor || 1),
      factor,
    );
    calibration.factorSamples.push(factor);
    if (calibration.factorSamples.length > 200) {
      calibration.factorSamples = calibration.factorSamples.slice(-200);
    }
    calibration.lastOutcome = outcome;
    calibration.lastBattle = {
      sent,
      killRate,
      casualties,
      casualtyRate,
      remaining,
      cleared,
      outcome,
      totalResources: Number(totalResources || 0),
      lossCost: Number(lossCost || 0),
      profit: Number(profit || 0),
      requiredSafe: Math.ceil(requiredSafe),
      date: new Date().toISOString(),
    };
    calibration.avgKillRate = calibration.sumKillRate / calibration.samples;
    calibration.avgCasualtyRate =
      calibration.sumCasualtyRate / calibration.samples;

    const confidence = confidenceFromCalibration(calibration);
    calibration.confidence = confidence.label;
    calibration.confidenceStars = confidence.stars;

    calibration.updatedAt = new Date().toISOString();

    await storage.put(root.Constants.STORES.STATISTICS, calibration);

    return calibration;
  }

  async function applyCalibration({
    storage,
    tribe,
    troopType,
    hasHero,
    theoreticalTroops,
  }) {
    const theoretical = Number(theoreticalTroops || 0);

    if (theoretical <= 0) {
      return {
        troops: 0,
        factor: 1,
        samples: 0,
      };
    }

    const calibration = await getCalibration(
      storage,
      tribe,
      troopType,
      hasHero,
    );

    const sampleCount = Number(calibration.samples || 0);

    if (sampleCount <= 0) {
      return {
        troops: Math.ceil(theoretical),
        factor: 1,
        samples: 0,
        source: "Cálculo teórico",
        confidence: "Sem dados",
        stars: 1,
        starsText: starsText(1),
        basedOn: 0,
        learnedFloor: 0,
        successSamples: 0,
        perfectSamples: 0,
        failureSamples: 0,
      };
    }

    const averageFactor = Number(calibration.averageFactor || 1);
    const sortedFactorSamples = Array.isArray(calibration.factorSamples)
      ? calibration.factorSamples
          .map((value) => Number(value || 0))
          .filter((value) => Number.isFinite(value) && value >= 1)
          .sort((a, b) => a - b)
      : [];

    const percentileP90 = percentile(sortedFactorSamples, 0.9);
    const robustHighFactor = Math.max(averageFactor, percentileP90);

    // Limita quanto o fator alto pode puxar acima da média aprendida.
    const cappedHighFactor = Math.min(
      robustHighFactor,
      Math.max(1.8, averageFactor * 1.68),  // Aumenta levemente de 1.65 para 1.68
    );

    const boundedMaxInfluence = 1 + (Math.max(cappedHighFactor, 1) - 1) * 0.9;
    const maxWeight = clamp((sampleCount - 3) / 10, 0, 1) * 0.35;
    
    const blendedFactor =
      averageFactor * (1 - maxWeight) + boundedMaxInfluence * maxWeight;
    const learnedFactor = Math.max(1, blendedFactor);

    let learnedFloor = 0;

    if (sampleCount >= 3 && Number(calibration.minPerfectTroops || 0) > 0) {
      learnedFloor = Number(calibration.minPerfectTroops || 0);
    } else if (sampleCount >= 3 && Number(calibration.minClearTroops || 0) > 0) {
      const casualtyBias = clamp(Number(calibration.avgCasualtyRate || 0), 0, 1);
      learnedFloor = Math.ceil(
        Number(calibration.minClearTroops || 0) * Math.max(1.04, 1 + casualtyBias),
      );
    }

    if (sampleCount >= 3 && Number(calibration.maxFailedTroops || 0) > 0) {
      learnedFloor = Math.max(
        Number(learnedFloor || 0),
        Number(calibration.maxFailedTroops || 0) + 1,
      );
    }

    const confidence = confidenceFromCalibration(calibration);
    const factorTroops = Math.ceil(theoretical * learnedFactor);
    const floorCandidate = Number(learnedFloor || 0);

    // Aumenta limite do piso apenas com confiança MUITO alta
    const hardFloorLimitMultiplier = confidence.score >= 0.8 && sampleCount >= 20 ? 1.42 : 1.35;
    const hardFloorLimit = Math.ceil(factorTroops * hardFloorLimitMultiplier);

    const canUseHardFloor =
      sampleCount >= 6 &&
      confidence.score >= 0.5 &&
      floorCandidate > 0 &&
      floorCandidate <= hardFloorLimit;

    const effectiveFloor = canUseHardFloor ? floorCandidate : 0;
    const baseTroops = Math.max(factorTroops, Math.ceil(effectiveFloor));
    const baseSafetyMultiplier = confidenceSafetyMultiplier(
      confidence.score,
      sampleCount,
    );
    const operationalExtraMultiplier = operationalConfidenceExtraMultiplier(
      confidence.score,
      sampleCount,
    );
    const rawPreservationSafetyMultiplier = preservationMultiplier({
      tribe,
      troopType,
      casualtyRate: Number(calibration.avgCasualtyRate || 0),
      confidenceScore: confidence.score,
      sampleCount,
    });
    const profitShieldMultiplier = teutonProfitShieldMultiplier({
      tribe,
      casualtyRate: Number(calibration.avgCasualtyRate || 0),
      sampleCount,
      confidenceScore: confidence.score,
    });
    const preservationSafetyMultiplier = Math.min(
      rawPreservationSafetyMultiplier * profitShieldMultiplier,
      preservationMultiplierCap(theoretical),
    );
    const rawSafetyMultiplier =
      baseSafetyMultiplier *
      operationalExtraMultiplier *
      preservationSafetyMultiplier;
    const economicMultiplier = economicSafetyMultiplier(calibration, troopType);
    const simulationMultiplier = simulationSafetyMultiplier(calibration, sampleCount);
    const maxTotalSafetyMultiplier = totalSafetyCapByTroop({
      tribe,
      troopType,
      confidenceScore: confidence.score,
      sampleCount,
    });
    const safetyMultiplier = Math.min(
      Math.max(1, rawSafetyMultiplier * economicMultiplier * simulationMultiplier),
      maxTotalSafetyMultiplier,
    );
    const troopsWithSafety = Math.ceil(baseTroops * safetyMultiplier);

    let source = "Cálculo ajustado pelo aprendizado";
    if (confidence.score >= 0.65 && sampleCount >= 8) {
      source = "IA Aprendida";
    }

    return {
      troops: troopsWithSafety,
      factor: learnedFactor,
      samples: Number(calibration.samples || 0),
      source,
      confidence: confidence.label,
      stars: confidence.stars,
      starsText: starsText(confidence.stars),
      basedOn: Number(calibration.samples || 0),
      learnedFloor: Math.ceil(Number(learnedFloor || 0)),
      learnedFloorApplied: Boolean(canUseHardFloor && learnedFloor > 0),
      confidenceSafetyMultiplier: safetyMultiplier,
      preservationSafetyMultiplier,
      economicSafetyMultiplier: economicMultiplier,
      economicRoi:
        Number(calibration.sumLosses || 0) > 0
          ? Number(calibration.sumProfit || 0) /
            Number(calibration.sumLosses || 1)
          : 0,
      reportId: calibration.lastBattle?.reportId || null,
      reportSeq: Number(calibration.lastBattle?.reportSeq || 0) || null,
      successSamples: Number(calibration.successSamples || 0),
      perfectSamples: Number(calibration.perfectSamples || 0),
      failureSamples: Number(calibration.failureSamples || 0),
    };
  }

  root.BattleLearning = root.BattleKnowledge;
})(window);




// FILE: core/scanner.js

(function initScanner(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});
  const constants = root.Constants;
  const MAX_REPORT_ROWS = 2000;
  const MAX_HISTORY_ROWS = 2000;

  class ScannerService {
    /**
     * @param {{storage:any,getSettings:Function,onUpdate:Function}} deps
     */
    constructor(deps) {
      this.storage = deps.storage;
      this.getSettings = deps.getSettings;
      this.onUpdate = deps.onUpdate;
      this.lastSignature = '';
      this.intervalId = null;
      this.mouseInside = false;
    }

    /**
     * @returns {void}
     */
    start() {
      global.document.addEventListener('mousemove', () => {
        this.mouseInside = true;
      });

      this.intervalId = global.setInterval(() => {
        this.scanNow().catch(() => {
          return undefined;
        });
      }, constants.SCAN_INTERVAL_MS);
    }

    /**
     * @returns {Promise<any|null>}
     */
    async scanNow() {
      const settings = this.getSettings();
      const parsed = root.OasisParser.parse({
        speed: Number(settings.effectiveSpeed || settings.customSpeed || 14),
        smallMap: Boolean(settings.smallMap)
      });
      if (!parsed) return null;

      const coordSource = String(parsed.coordSource || parsed.source || "none");
      const persistableSource = coordSource !== "tooltip";

      const signature = JSON.stringify({
        coord: parsed.coord,
        distance: parsed.distance,
        bonus: parsed.bonus,
        animals: parsed.animals
      });

      if (signature === this.lastSignature) {
        return parsed;
      }

      this.lastSignature = signature;

      if (!persistableSource) {
        return parsed;
      }

      const oasisId = parsed.coord || 'unknown:' + parsed.server + ':' + Math.round(parsed.distance * 100);
      const existing = await this.storage.get(root.Constants.STORES.OASIS, oasisId);
      const payload = {
        ...parsed,
        id: oasisId,
        updatedAt: new Date().toISOString()
      };

      if (existing) {
        const existingSignature = JSON.stringify({
          coord: existing.coord,
          distance: existing.distance,
          bonus: existing.bonus,
          animals: existing.animals
        });
        if (existingSignature === signature) {
          return parsed;
        }
      }

      await this.storage.put(root.Constants.STORES.OASIS, payload);
      if (typeof this.onUpdate === 'function') this.onUpdate('oasis', payload);
      return parsed;
    }

    /**
     * @param {any} report
     * @returns {Promise<void>}
     */
    async saveReport(report) {
      if (!report?.reportId) return false;

      const existing = await this.storage.get(
        root.Constants.STORES.REPORTS,
        report.reportId,
      );
      if (existing) {
        return false;
      }

      const reportsBeforeInsert = await this.storage.getAll(root.Constants.STORES.REPORTS);
      const maxSeq = reportsBeforeInsert.reduce((max, item) => {
        const seq = Number(item?.reportSeq || 0);
        return seq > max ? seq : max;
      }, 0);
      const reportSeq = maxSeq + 1;

      report.reportSeq = reportSeq;
      report.id = report.reportId;

      await this.storage.put(root.Constants.STORES.REPORTS, report);

      const reports = await this.storage.getAll(root.Constants.STORES.REPORTS);
      const orderedReports = reports
        .slice()
        .sort((a, b) => {
          const right = new Date(b.date || b.updatedAt || 0).getTime();
          const left = new Date(a.date || a.updatedAt || 0).getTime();
          return right - left;
        });

      const toDelete = orderedReports.slice(MAX_REPORT_ROWS);
      if (toDelete.length > 0) {
        for (const oldReport of toDelete) {
          if (oldReport?.reportId) {
            await this.storage.delete(root.Constants.STORES.REPORTS, oldReport.reportId);
          }
        }
      }

      const historyId = (report.coord || 'unknown') + ':' + report.reportId;
      await this.storage.put(root.Constants.STORES.HISTORY, {
        id: historyId,
        coord: report.coord || null,
        reportId: report.reportId,
        reportSeq,
        date: report.date,
        lossCost: report.lossCost,
        profit: report.profit,
        xp: report.xp,
        totalResources: report.totalResources
      });

      const historyRows = await this.storage.getAll(root.Constants.STORES.HISTORY);
      const orderedHistory = historyRows
        .slice()
        .sort((a, b) => {
          const right = new Date(b.date || b.updatedAt || 0).getTime();
          const left = new Date(a.date || a.updatedAt || 0).getTime();
          return right - left;
        });

      const historyToDelete = orderedHistory.slice(MAX_HISTORY_ROWS);
      if (historyToDelete.length > 0) {
        for (const oldHistory of historyToDelete) {
          if (oldHistory?.id) {
            await this.storage.delete(root.Constants.STORES.HISTORY, oldHistory.id);
          }
        }
      }

      if (typeof this.onUpdate === 'function') this.onUpdate('report', report);
      return true;
    }

    /**
     * @param {any} report
     * @returns {Promise<{saved:boolean,learned:any}>}
     */
    async importReport(report) {
      const saved = await this.saveReport(report);
      if (!saved) return { saved: false, learned: null };

      const learned = await root.BattleKnowledge.learnFromReport({
        storage: this.storage,
        report,
      });
      return { saved: true, learned };
    }
  }

  root.ScannerService = ScannerService;
})(window);




// FILE: ui/tabs.js

(function initTabs(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  /**
   * @param {HTMLElement} overlay
   * @param {string} tab
   */
  function activateTab(overlay, tab) {
    overlay.querySelectorAll('.tab').forEach((button) => {
      button.classList.toggle('active', button.getAttribute('data-tab') === tab);
    });

    overlay.querySelectorAll('.panel').forEach((panel) => {
      panel.classList.toggle('hidden', panel.getAttribute('data-panel') !== tab);
    });
  }

  root.Tabs = {
    activateTab
  };
})(window);




// FILE: ui/modal.js

(function initModal(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  function toastContainer() {
    let container = global.document.getElementById('nytrina-toasts');
    if (!container) {
      container = global.document.createElement('div');
      container.id = 'nytrina-toasts';
      global.document.body.appendChild(container);
    }
    return container;
  }

  /**
   * @param {string} title
   * @param {string} content
   */
  function show(title, content) {
    const isError = /erro/i.test(String(title || ''));
    const toast = global.document.createElement('div');
    toast.className = 'nytrina-toast' + (isError ? ' nytrina-toast-error' : '');

    const heading = global.document.createElement('b');
    heading.textContent = String(title || '');
    const body = global.document.createElement('div');
    body.textContent = String(content || '');

    toast.append(heading, body);
    toast.title = 'Clique para fechar';
    toast.addEventListener('click', () => toast.remove());
    toastContainer().appendChild(toast);
    global.setTimeout(() => toast.remove(), isError ? 12000 : 6000);
  }

  root.Modal = {
    show
  };
})(window);




// FILE: ui/overlay.js

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
      const savedTab = this.loadSavedTab();
      if (savedTab) {
        this.currentTab = savedTab;
      }

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
     * @returns {string}
     */
    tabStorageKey() {
      const host = String(root.Server?.getContext?.().host || "default");
      return "nytrina:activeTab:" + host;
    }

    /**
     * @param {string} tabId
     * @returns {boolean}
     */
    isValidTabId(tabId) {
      const allowed = new Set([
        "scanner",
        "debug",
        "ranking",
        "reports",
        "economy",
        "planner",
        "settings",
      ]);

      return allowed.has(String(tabId || "").trim());
    }

    /**
     * @returns {string}
     */
    loadSavedTab() {
      try {
        const value = String(
          global.localStorage.getItem(this.tabStorageKey()) || "",
        ).trim();
        if (value === "dashboard") return "economy";
        return this.isValidTabId(value) ? value : "scanner";
      } catch (_error) {
        return "scanner";
      }
    }

    /**
     * @param {string} tabId
     * @returns {void}
     */
    saveCurrentTab(tabId) {
      const safeTab = this.isValidTabId(tabId) ? String(tabId) : "scanner";
      try {
        global.localStorage.setItem(this.tabStorageKey(), safeTab);
      } catch (_error) {
        return;
      }
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
        '<button class="tab' + (activeTab === "reports" ? " active" : "") + '" data-tab="reports">Relatórios</button>',
        '<button class="tab' + (activeTab === "economy" ? " active" : "") + '" data-tab="economy">Economia</button>',
        '<button class="tab' + (activeTab === "ranking" ? " active" : "") + '" data-tab="ranking">Ranking</button>',
        '<button class="tab' + (activeTab === "planner" ? " active" : "") + '" data-tab="planner">Planner</button>',
        '<button class="tab' + (activeTab === "settings" ? " active" : "") + '" data-tab="settings">Config.</button>',
        '<button class="tab tab-secondary' + (activeTab === "debug" ? " active" : "") + '" data-tab="debug" id="nytrina-debug-tab">Debug</button>',
        "</div>",
        '<div class="panel' + (activeTab === "scanner" ? "" : " hidden") + '" data-panel="scanner"></div>',
        '<div class="panel' + (activeTab === "debug" ? "" : " hidden") + '" data-panel="debug"></div>',
        '<div class="panel' + (activeTab === "ranking" ? "" : " hidden") + '" data-panel="ranking"></div>',
        '<div class="panel' + (activeTab === "reports" ? "" : " hidden") + '" data-panel="reports"></div>',
        '<div class="panel' + (activeTab === "economy" ? "" : " hidden") + '" data-panel="economy"></div>',
        '<div class="panel' + (activeTab === "planner" ? "" : " hidden") + '" data-panel="planner"></div>',
        '<div class="panel' + (activeTab === "settings" ? "" : " hidden") + '" data-panel="settings"></div>',
      ].join("");
    }

    /**
     * @returns {Array<{id:number,day:string,action:string,type:string}>}
     */
    plannerGuideSteps() {
      return [
        { id: 1, day: "Dia 1", action: "Enviar heroi para aventura mais proxima", type: "Heroi", note: "Pegar cavalo/XP inicial. Marcar opcao de nao mostrar ajuda." },
        { id: 2, day: "Dia 1", action: "Um recurso de cada para nivel 2", type: "Recursos", note: "Base inicial de producao." },
        { id: 3, day: "Dia 1", action: "Armazem nivel 1", type: "Construcao", note: "Evita travar por limite de recursos." },
        { id: 4, day: "Dia 1", action: "Celeiro nivel 1", type: "Construcao", note: "Evita travar por cereal." },
        { id: 5, day: "Dia 1", action: "Embaixada nivel 1", type: "Construcao", note: "Necessaria no rush e pontos de cultura." },
        { id: 6, day: "Dia 1", action: "Esconderijo nivel 3", type: "Defesa", note: "Protecao inicial." },
        { id: 7, day: "Dia 1", action: "Edificio Principal nivel 3", type: "Construcao", note: "Acelera construcao." },
        { id: 8, day: "Dia 1", action: "Muralha nivel 3", type: "Defesa", note: "Pode ajudar com missao/XP heroi." },
        { id: 9, day: "Dia 1", action: "Mercado nivel 3", type: "Economia", note: "Ajuda gestao de recursos." },
        { id: 10, day: "Dia 1", action: "Todos os campos de cereal nivel 2", type: "Recursos", note: "Producao base." },
        { id: 11, day: "Dia 1", action: "Todos os campos de barro nivel 2", type: "Recursos", note: "Producao base." },
        { id: 12, day: "Dia 1", action: "Todos os campos de madeira nivel 2", type: "Recursos", note: "Producao base." },
        { id: 13, day: "Dia 1", action: "Todos os campos de ferro nivel 2", type: "Recursos", note: "Producao base." },
        { id: 14, day: "Dia 1", action: "1 campo de cereal nivel 4", type: "Recursos", note: "Puxar producao e missoes." },
        { id: 15, day: "Dia 1", action: "1 campo de barro nivel 4", type: "Recursos", note: "Puxar producao." },
        { id: 16, day: "Dia 1", action: "1 campo de madeira nivel 4", type: "Recursos", note: "Puxar producao." },
        { id: 17, day: "Dia 1", action: "1 campo de ferro nivel 4", type: "Recursos", note: "Puxar producao." },
        { id: 18, day: "Dia 1", action: "Quartel nivel 1", type: "Militar", note: "Libera tropas." },
        { id: 19, day: "Dia 1", action: "Edificio Principal nivel 7", type: "Construcao", note: "Preparacao para acelerar rush." },
        { id: 20, day: "Dia 1", action: "Armazem nivel 3", type: "Construcao", note: "Capacidade." },
        { id: 21, day: "Dia 1", action: "Celeiro nivel 3", type: "Construcao", note: "Capacidade." },
        { id: 22, day: "Dia 1", action: "Todos os campos de barro nivel 3", type: "Recursos", note: "Producao." },
        { id: 23, day: "Dia 1", action: "Todos os campos de madeira nivel 3", type: "Recursos", note: "Producao." },
        { id: 24, day: "Dia 1", action: "Todos os campos de ferro nivel 3", type: "Recursos", note: "Producao." },
        { id: 25, day: "Dia 1", action: "1 campo de cereal nivel 3", type: "Recursos", note: "Garantir cereal para seguir." },
        { id: 26, day: "Dia 1", action: "Quartel nivel 3", type: "Militar", note: "Importante se for produzir infantaria/farm." },
        { id: 27, day: "Dia 1", action: "Academia nivel 1", type: "Militar", note: "Pre-requisito." },
        { id: 28, day: "Dia 1", action: "Todos os campos de cereal nivel 3", type: "Recursos", note: "Producao." },
        { id: 29, day: "Dia 1", action: "Esconderijo nivel 10", type: "Defesa", note: "Protecao." },
        { id: 30, day: "Dia 1", action: "Mercado nivel 7", type: "Economia", note: "Gestao forte de recursos." },
        { id: 31, day: "Dia 1", action: "8 esconderijos nivel 3", type: "Defesa", note: "Seguir apenas se necessario." },
        { id: 32, day: "Dia 1", action: "Ferraria nivel 1", type: "Militar", note: "Pre-requisito." },
        { id: 33, day: "Dia 1", action: "Edificio Principal nivel 8", type: "Construcao", note: "Preparacao." },
        { id: 34, day: "Dia 1", action: "Academia nivel 2", type: "Militar", note: "Preparacao." },
        { id: 35, day: "Dia 1", action: "Residencia nivel 1", type: "Colonizacao", note: "Comeco do caminho para colonos." },
        { id: 36, day: "Dia 1", action: "Todos os recursos nivel 4", type: "Recursos", note: "Barro, madeira, ferro e cereal." },
        { id: 37, day: "Dia 1", action: "Edificio Principal nivel 10", type: "Construcao", note: "Acelera muito o restante." },
        { id: 38, day: "Dia 1", action: "Embaixada nivel 3", type: "Cultura", note: "PC e pre-requisitos." },
        { id: 39, day: "Dia 1", action: "Academia nivel 3", type: "Militar", note: "Preparacao." },
        { id: 40, day: "Dia 1", action: "Edificio Principal nivel 12", type: "Construcao", note: "Aceleracao." },
        { id: 41, day: "Dia 1", action: "Academia nivel 10", type: "Colonizacao", note: "Pre-requisito chave." },
        { id: 42, day: "Dia 1", action: "Oficina nivel 1", type: "Construcao", note: "Pre-requisito da Casa do Povo." },
        { id: 43, day: "Dia 1", action: "Casa do Povo nivel 1", type: "Cultura", note: "Libera celebracoes." },
        { id: 44, day: "Dia 1", action: "1 campo de cereal nivel 5", type: "Recursos", note: "Ajuda producao." },
        { id: 45, day: "Dia 1", action: "8 esconderijos nivel 7", type: "Defesa", note: "Opcional/defensivo." },
        { id: 46, day: "Dia 1", action: "Embaixada nivel 5", type: "Cultura", note: "PC." },
        { id: 47, day: "Dia 1", action: "1 campo de cereal nivel 5", type: "Recursos", note: "Reforco de cereal." },
        { id: 48, day: "Dia 1", action: "Todos os campos de barro nivel 5", type: "Recursos", note: "Producao forte." },
        { id: 49, day: "Dia 1", action: "Resto dos campos de cereal nivel 5", type: "Recursos", note: "Producao." },
        { id: 50, day: "Dia 1", action: "Todos os campos de madeira nivel 5", type: "Recursos", note: "Producao." },
        { id: 51, day: "Dia 1", action: "Todos os campos de ferro nivel 5", type: "Recursos", note: "Producao." },
        { id: 52, day: "Dia 1", action: "Armazem nivel 8", type: "Construcao", note: "Capacidade para custos altos." },
        { id: 53, day: "Dia 1", action: "1a festa", type: "Cultura", note: "Pode ser antes/depois conforme recursos." },
        { id: 54, day: "Dia 1", action: "Mercado nivel 12", type: "Economia", note: "Gestao de recursos." },
        { id: 55, day: "Dia 1", action: "Celeiro nivel 7", type: "Construcao", note: "Capacidade." },
        { id: 56, day: "Dia 2", action: "Embaixada nivel 9", type: "Cultura", note: "PC." },
        { id: 57, day: "Dia 2", action: "Residencia nivel 7", type: "Colonizacao", note: "Desbloqueia meta de habitantes." },
        { id: 58, day: "Dia 2", action: "Muralha nivel 7", type: "Defesa", note: "Opcional, so se precisar de XP/objetivo." },
        { id: 59, day: "Dia 2", action: "Residencia nivel 8", type: "Colonizacao", note: "Rumo ao nivel 10." },
        { id: 60, day: "Dia 2", action: "2a festa ou 1a festa se for estrategia de 3", type: "Cultura", note: "Por volta de 41h-43h." },
        { id: 61, day: "Dia 3", action: "Residencia nivel 10", type: "Colonizacao", note: "Libera colonizadores." },
        { id: 62, day: "Dia 3", action: "Treinar 1o colono", type: "Colonizacao", note: "Nao parar fila dos colonos." },
        { id: 63, day: "Dia 3", action: "3a festa ou 2a festa se for estrategia de 3", type: "Cultura", note: "Ajustar conforme PC." },
        { id: 64, day: "Dia 4", action: "Treinar 2 colonos restantes", type: "Colonizacao", note: "Completar 3 colonos." },
        { id: 65, day: "Dia 4", action: "4a festa ou 3a festa", type: "Cultura", note: "Fechar PC se faltar." },
        { id: 66, day: "Dia 4", action: "Fundar 2a aldeia", type: "Colonizacao", note: "Meta: 90h a 110h." },
      ];
    }

    /**
     * @param {string} value
     * @returns {string}
     */
    escapeHtml(value) {
      return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    /**
     * @param {any} state
     * @param {string} serverHost
     * @returns {{activeVillageId:string,villages:Array<{id:string,name:string,completedSteps:Record<string, boolean>}>}}
     */
    normalizePlannerState(state, serverHost) {
      const villages = Array.isArray(state?.villages)
        ? state.villages
            .map((v) => ({
              id: String(v?.id || ""),
              name: String(v?.name || "").trim() || "Aldeia",
              completedSteps:
                v && typeof v.completedSteps === "object" && v.completedSteps
                  ? v.completedSteps
                  : {},
            }))
            .filter((v) => v.id)
        : [];

      if (!villages.length) {
        villages.push({
          id: "aldeia-1",
          name: "Aldeia 1 (" + String(serverHost || "servidor") + ")",
          completedSteps: {},
        });
      }

      const activeVillageId = String(state?.activeVillageId || villages[0].id || "aldeia-1");
      const hasActive = villages.some((v) => v.id === activeVillageId);

      return {
        activeVillageId: hasActive ? activeVillageId : villages[0].id,
        villages,
      };
    }

    /**
     * @param {{activeVillageId:string,villages:Array<{id:string,name:string,completedSteps:Record<string, boolean>}>}} planner
     * @returns {{id:string,name:string,completedSteps:Record<string, boolean>}}
     */
    activePlannerVillage(planner) {
      const list = Array.isArray(planner?.villages) ? planner.villages : [];
      return list.find((v) => v.id === planner.activeVillageId) || list[0];
    }

    /**
     * @param {{completedSteps:Record<string, boolean>}} village
     * @returns {number}
     */
    plannerProgress(village) {
      const total = this.plannerGuideSteps().length;
      if (!total) return 0;
      const done = this.plannerGuideSteps().filter((step) => Boolean(village?.completedSteps?.[String(step.id)])).length;
      return Math.round((done / total) * 100);
    }

    /**
     * @param {HTMLElement|null} node
     * @returns {void}
     */
    scrollPlannerToFirstPending(node) {
      if (!(node instanceof HTMLElement)) return;

      const scrollBox = node.querySelector(".planner-steps-scroll");
      if (!(scrollBox instanceof HTMLElement)) return;

      const rows = Array.from(
        scrollBox.querySelectorAll(".nytrina-planner-step-row"),
      );

      const firstPending = rows.find((row) => {
        const checkbox = row.querySelector(".nytrina-planner-step-check");
        return checkbox instanceof HTMLInputElement && checkbox.checked !== true;
      });

      if (!firstPending) return;

      const applyScroll = () => {
        const nextTop = Math.max(0, Number(firstPending.offsetTop || 0) - 8);
        scrollBox.scrollTop = nextTop;
      };

      if (scrollBox.clientHeight > 0) {
        applyScroll();
      } else {
        global.requestAnimationFrame(() => applyScroll());
        global.setTimeout(() => applyScroll(), 50);
      }
    }

    /**
     * @returns {void}
     */
    bindEvents() {
      this.overlay.querySelectorAll(".tab").forEach((button) => {
        button.addEventListener("click", () => {
          const tab = button.getAttribute("data-tab") || "scanner";
          this.currentTab = tab;
          this.saveCurrentTab(tab);
          root.Tabs.activateTab(this.overlay, tab);
          this.refreshPanel(tab).catch(() => undefined);
        });
      });

      global.document.addEventListener("change", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") return;
        if (target.closest("#nytrina-overlay")) return;
        if (!/hero/i.test(String(target.name) + " " + String(target.id))) return;
        this.refreshScanner().catch(() => undefined);
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
      return this.learnReports(reports);
    }

    /**
     * @param {Array<any>} reports
     * @returns {Promise<{learned:number,skipped:number}>}
     */
    async learnReports(reports) {
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
        { value: "gauls", label: "Gauleses" },
        { value: "romans", label: "Romanos" },
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
        spearman: "Lanceiro",
        axeman: "Machado",
        paladin: "Paladino",
        teutonic_knight: "Cavaleiro Teutao",
        phalanx: "Falange",
        swordsman: "Espadachim",
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
     * @param {HTMLInputElement|null} exceptInput
     * @returns {void}
     */
    clearSuggestedTroopInputs(exceptInput) {
      const inputs = Array.from(
        global.document.querySelectorAll('input[type="number"], input[type="text"]'),
      );

      for (const input of inputs) {
        if (!(input instanceof HTMLInputElement)) continue;
        if (exceptInput && input === exceptInput) continue;
        if (input.dataset.nytrinaPrefilled !== "1") continue;

        this.ensureManualEditGuard(input);
        input.dataset.nytrinaApplying = "1";
        input.value = "0";
        input.dataset.nytrinaPrefilled = "1";
        input.dataset.nytrinaPrefillStamp = "scanner:clear";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
        input.dataset.nytrinaApplying = "0";
      }
    }

    /**
     * @param {{rallyCoord:string|null,selectedTribe:string,selectedTroopType:string,isOasisTarget?:boolean,withHeroSuggestion:string,withoutHeroSuggestion:string}} params
     * @returns {{applied:boolean,value:number,reason:string}}
     */
    autoFillTroopSuggestedValue(params) {
      if (!params?.isOasisTarget) {
        return { applied: false, value: 0, reason: "alvo-player" };
      }

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

      this.clearSuggestedTroopInputs(input);

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
          label: "Gauleses",
          items: ["phalanx", "swordsman", "theutates_thunder", "haeduan", "druidrider"]
            .filter((key) => speedMap.gauls[key])
            .map((key) => ({ key, base: Number(speedMap.gauls[key]) })),
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
          items: ["clubman", "spearman", "axeman", "paladin", "teutonic_knight"]
            .filter((key) => speedMap.teutons[key])
            .map((key) => ({ key, base: Number(speedMap.teutons[key]) })),
        },
        {
          label: "Geral",
          items: [
            { key: "hero", base: Number(speedMap.hero || 14) },
            { key: "custom", base: Number(speedMap.custom || 14) },
          ],
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
     * @param {string} tab
     * @returns {Promise<void>}
     */
    async refreshPanel(tab) {
      const refreshers = {
        scanner: () => this.refreshScanner(),
        debug: () => this.refreshDebug(),
        ranking: () => this.refreshRanking(),
        reports: () => this.refreshReports(),
        economy: () => this.refreshEconomy(),
        planner: () => this.refreshPlanner(),
        settings: () => this.refreshSettings(),
      };
      const refresher = refreshers[tab];
      if (refresher) await refresher();
    }

    /**
     * Hidden panels are rendered when their tab is opened.
     * @returns {Promise<void>}
     */
    async refresh() {
      const tab = this.currentTab || "scanner";
      // Scanner also auto-fills the rally point form, so it runs even when hidden.
      if (tab !== "scanner") await this.refreshScanner();
      await this.refreshPanel(tab);
    }

    /**
     * Background data updates must not wipe forms being edited.
     * @returns {Promise<void>}
     */
    async refreshFromData() {
      const tab = this.currentTab || "scanner";
      if (tab === "settings" || tab === "planner") {
        await this.refreshScanner();
        return;
      }
      await this.refresh();
    }

    /**
     * @returns {Promise<void>}
     */
    async importCurrentReport() {
      const settings = this.getSettings();

      try {
        const report = root.ReportParser.parse({
          tribe: settings.troopTribe || "romans",
          troopType: settings.troopType || null,
        });

        if (!report) {
          root.Modal.show("Relatorio", "Nenhum relatorio valido encontrado na tela.");
          return;
        }

        const result = await this.scanner.importReport(report);

        if (!result.saved) {
          root.Modal.show(
            "Relatorio",
            "Este relatório já foi importado. Nada foi aprendido novamente.",
          );
        } else if (result.learned) {
          root.Modal.show(
            "Relatorio",
            "Importado e aprendido com sucesso. Coord: " +
              (report.coord || "-") +
              " | Lucro: " +
              this.formatNumber(report.profit),
          );
        } else {
          root.Modal.show(
            "Relatorio",
            "Relatório salvo, mas sem dados suficientes para aprendizado automático (tipo de tropa/quantidade enviada).",
          );
        }

        await this.refresh();
      } catch (error) {
        console.error("[NytrinA] Falha ao importar relatório:", error);
        root.Modal.show(
          "Erro",
          "Falha ao importar ou aprender com o relatório. Veja o console.",
        );
      }
    }

    /**
     * @param {any} value
     * @returns {string}
     */
    formatNumber(value) {
      return Math.round(Number(value || 0)).toLocaleString("pt-BR");
    }

    /**
     * @param {any} value
     * @returns {string}
     */
    formatSuggestion(value) {
      const text = String(value ?? "-");
      return /^\d+$/.test(text) ? this.formatNumber(text) : this.escapeHtml(text);
    }

    /**
     * @param {any} value
     * @returns {string}
     */
    signedClass(value) {
      const number = Number(value || 0);
      if (number > 0) return "pos";
      if (number < 0) return "neg";
      return "";
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
        isOasisTarget: Boolean(parsed?.animals),
        withHeroSuggestion,
        withoutHeroSuggestion,
      });

      const lockedTargetDisplay = rallyCoord
        ? '<div class="card scanner-locked"><span>Alvo travado</span><b>' + this.escapeHtml(rallyCoord) + "</b></div>"
        : "";

      const heroSelected = this.isHeroEnabledInRallyForm();
      const primaryValue = heroSelected ? withHeroSuggestion : withoutHeroSuggestion;
      const secondaryText = heroSelected
        ? "Sem herói: " + this.formatSuggestion(withoutHeroSuggestion)
        : "Com herói: " + this.formatSuggestion(withHeroSuggestion);
      const primaryCalibration = heroSelected ? calibratedWithHero : calibratedWithoutHero;
      const heroSamples = Number(calibratedWithHero?.samples || 0);
      const noHeroSamples = Number(calibratedWithoutHero?.samples || 0);

      let confidenceLabel = String(suggestionConfidence || "Sem dados");
      let confidenceDetail = "";
      let basedOnText = suggestionBasedOn + " batalha(s)";

      if (learnedAdvice?.ok) {
        basedOnText = suggestionBasedOn + " batalha(s) neste mesmo oásis";
      } else if (heroSamples > 0 || noHeroSamples > 0) {
        confidenceLabel = String(primaryCalibration?.confidence || "Sem dados");
        basedOnText = "Com herói: " + heroSamples + " · Sem herói: " + noHeroSamples;

        const samples = Number(primaryCalibration?.samples || 0);
        if (samples > 0) {
          const successPct = Math.round(
            (Number(primaryCalibration.successSamples || 0) / samples) * 100,
          );
          confidenceDetail =
            (heroSelected ? "Com herói: " : "Sem herói: ") +
            samples +
            " amostra(s) · " +
            successPct +
            "% limpou · " +
            Number(primaryCalibration.perfectSamples || 0) +
            " sem baixas · " +
            Number(primaryCalibration.failureSamples || 0) +
            " falha(s)";
        }
      }

      const confidenceClass = /^Alta/.test(confidenceLabel)
        ? "conf-high"
        : /^Média/.test(confidenceLabel)
          ? "conf-mid"
          : /^Baixa/.test(confidenceLabel)
            ? "conf-low"
            : "conf-none";

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
        '<div class="scanner-primary">',
        '<div class="scanner-primary-target"><span>Alvo</span><b>' +
          this.escapeHtml(displayCoord) +
          "</b><small>XP " +
          this.formatNumber(displayXp) +
          "</small></div>",
        '<div class="scanner-primary-value"><span>' +
          (heroSelected ? "Enviar com herói" : "Enviar sem herói") +
          "</span><strong>" +
          this.formatSuggestion(primaryValue) +
          "</strong><small>" +
          secondaryText +
          "</small></div>",
        "</div>",
        '<div class="scanner-essential-grid">',
        '<div class="card"><span>Confiança</span><b class="' +
          confidenceClass +
          '">' +
          this.escapeHtml(confidenceLabel) +
          "</b>" +
          (confidenceDetail ? '<div class="hint">' + confidenceDetail + "</div>" : "") +
          "</div>",
        '<div class="card"><span>Avaliação IA</span><b class="stars">' +
          suggestionStars +
          "</b></div>",
        '<div class="card"><span>Fonte</span><b>' +
          suggestionSource +
          "</b></div>",
        '<div class="card"><span>Baseado em</span><b>' +
          basedOnText +
          "</b></div>",
        "</div>",
        '<div class="scanner-context-line">' +
          "Dist: " +
          displayDistance +
          " | XP/h: " +
          formatScannerXph(displayXph) +
          " | Tempo ida: " +
          displayTime +
          " | Velocidade: " +
          Number(settings.effectiveSpeed || 14) +
          " campos/h" +
          " | Servidor: " +
          server.host +
          " (x" +
          server.speed +
          ")" +
          "</div>",
        '<details class="scanner-advanced"><summary>Ver diagnóstico detalhado</summary>',
        '<div class="grid scanner-summary">',
        '<div class="card"><span>Sugestão completa</span><b>' +
          suggestionText +
          "</b></div>",
        '<div class="card"><span>Com herói</span><b>' +
          this.formatSuggestion(withHeroSuggestion) +
          "</b></div>",
        '<div class="card"><span>Sem herói</span><b>' +
          this.formatSuggestion(withoutHeroSuggestion) +
          "</b></div>",
        '<div class="card"><span>Fator aprendido</span><b>' +
          learnedFactorText +
          "</b></div>",
        '<div class="card"><span>Margem confiança</span><b>' +
          confidenceSafetyText +
          "</b></div>",
        '<div class="card"><span>Defesa dos animais</span><b>' +
          (formulaAdvice?.ok
            ? this.formatNumber(formulaAdvice.defense) +
              (formulaAdvice.cavalry ? " (vs cavalaria)" : " (vs infantaria)")
            : this.escapeHtml(formulaAdvice?.message || "-")) +
          "</b></div>",
        '</div></details>',
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
        ?.addEventListener("click", () => {
          this.importCurrentReport().catch(() => undefined);
        });
    }

    /**
     * @returns {Promise<void>}
     */
    async refreshRanking() {
      const node = this.panel("ranking");
      if (!node) return;
      const oasis = await this.storage.getAll(root.Constants.STORES.OASIS);
      const settings = this.getSettings();
      const sortBy = ["xph", "xp", "distance"].includes(settings.rankingSort)
        ? settings.rankingSort
        : "xph";
      const ranking = root.Ranking.buildRanking(oasis, {
        speed: Number(settings.effectiveSpeed || 0),
        smallMap: Boolean(settings.smallMap),
        sortBy,
      });
      const formatXph = (value) => {
        const number = Number(value || 0);
        if (!Number.isFinite(number) || number <= 0) return "-";
        if (number >= 10) return this.formatNumber(number);
        return number.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
      };
      const sortOption = (value, label) =>
        '<option value="' + value + '"' + (sortBy === value ? " selected" : "") + ">" + label + "</option>";

      const rankByXp = (xp) => {
        const value = Number(xp || 0);
        if (value >= 300)
          return { text: "★★★★★ 🟢 Vale muito", cls: "rank-good" };
        if (value >= 120) return { text: "★★★☆☆ 🟡 Medio", cls: "rank-mid" };
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
        '<div class="actions"><label class="inline-label">Ordenar por <select id="nytrina-ranking-sort">' +
          sortOption("xph", "XP/h (tropa atual)") +
          sortOption("xp", "XP total") +
          sortOption("distance", "Distância") +
          '</select></label><button id="nytrina-ranking-clear">Limpar Ranking</button></div>',
        '<div class="hint">XP/h e tempo calculados com a velocidade da tropa selecionada (' +
          this.formatNumber(settings.effectiveSpeed) +
          " campos/h" +
          (settings.smallMap ? ", mapa pequeno na volta" : "") +
          ").</div>",
        "<table><thead><tr><th>Nota</th><th>Coord</th><th class=\"num\">Dist</th><th class=\"num\">XP</th><th class=\"num\">XP/h</th><th>Tempo</th></tr></thead><tbody>",
        ranking
          .map((row) => {
            const rank = rankByXp(row.xp);
            return (
              '<tr><td class="' +
              rank.cls +
              '">' +
              rank.text +
              "</td><td>" +
              this.escapeHtml(row.coord || "-") +
              '</td><td class="num">' +
              formatDistance(row.distance) +
              '</td><td class="num">' +
              this.formatNumber(row.xp) +
              '</td><td class="num">' +
              formatXph(row.xph) +
              "</td><td>" +
              this.escapeHtml(row.time || "-") +
              "</td></tr>"
            );
          })
          .join(""),
        "</tbody></table>",
      ].join("");

      node
        .querySelector("#nytrina-ranking-sort")
        ?.addEventListener("change", async (event) => {
          await this.saveSettings({ rankingSort: String(event.target.value || "xph") });
          await this.refreshRanking();
        });

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
      const sortedReports = reports
        .slice()
        .sort((a, b) => {
          const right = new Date(b.date || b.updatedAt || 0).getTime();
          const left = new Date(a.date || a.updatedAt || 0).getTime();
          return right - left;
        });
      const recentReports = sortedReports;
      const reportsMeta = this.paginationMeta(
        recentReports.length,
        this.reportsPage,
        this.reportsPerPage,
      );
      this.reportsPage = reportsMeta.page;
      const reportsPageRows = recentReports.slice(reportsMeta.start, reportsMeta.end);

      node.innerHTML = [
        '<div class="actions"><button id="nytrina-import-report-tab">Importar relatorio atual</button><button id="nytrina-clear-reports">Limpar Relatórios</button></div>',
        '<div class="table-scroll"><table><thead><tr><th class="num">#</th><th>Data/Hora</th><th>ID</th><th>Coord</th><th class="num">XP</th><th class="num">Rec.</th><th class="num">Perda</th><th class="num">Lucro</th></tr></thead><tbody>',
        reportsPageRows
          .map(
            (report, index) =>
              '<tr><td class="num">' +
              (Number(report.reportSeq || 0) > 0 ? Number(report.reportSeq) : String(reportsMeta.start + index + 1)) +
              "</td><td>" +
              this.formatDateTime(report.date || report.updatedAt) +
              '</td><td class="cell-id" title="' +
              this.escapeHtml(report.reportId) +
              '">' +
              this.escapeHtml(report.reportId) +
              "</td><td>" +
              this.escapeHtml(report.coord || "-") +
              '</td><td class="num">' +
              this.formatNumber(report.xp) +
              '</td><td class="num">' +
              this.formatNumber(report.totalResources) +
              '</td><td class="num neg-soft">' +
              this.formatNumber(report.lossCost) +
              '</td><td class="num ' +
              this.signedClass(report.profit) +
              '">' +
              this.formatNumber(report.profit) +
              "</td></tr>",
          )
          .join(""),
        "</tbody></table></div>",
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
        ?.addEventListener("click", () => {
          this.importCurrentReport().catch(() => undefined);
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
      const oasis = await this.storage.getAll(root.Constants.STORES.OASIS);
      const summary = root.Economy.calculateSummary(reports);
      const card = (label, value, cls) =>
        '<div class="card"><span>' +
        label +
        '</span><b class="' +
        (cls || "") +
        '">' +
        value +
        "</b></div>";

      node.innerHTML = [
        '<div class="section-title">Resumo</div>',
        '<div class="grid grid-3">',
        card("Lucro líquido", this.formatNumber(summary.netProfit), this.signedClass(summary.netProfit)),
        card("XP total", this.formatNumber(summary.totalXp)),
        card("ROI", summary.roi.toFixed(2), this.signedClass(summary.roi)),
        card("Relatórios", this.formatNumber(reports.length)),
        card("Oásis mapeados", this.formatNumber(oasis.length)),
        card("Perdas", this.formatNumber(summary.losses), summary.losses > 0 ? "neg-soft" : ""),
        "</div>",
        '<div class="section-title">Ritmo</div>',
        '<div class="grid grid-3">',
        card("Lucro/h", this.formatNumber(summary.profitPerHour), this.signedClass(summary.profitPerHour)),
        card("Lucro/min", this.formatNumber(summary.profitPerMinute), this.signedClass(summary.profitPerMinute)),
        card("XP/h", this.formatNumber(summary.xpPerHour)),
        card("Recursos/h", this.formatNumber(summary.resourcesPerHour)),
        "</div>",
      ].join("");
    }

    /**
     * @returns {Promise<void>}
     */
    async refreshPlanner() {
      const node = this.panel("planner");
      if (!node) return;

      const server = root.Server.getContext();
      const settings = this.getSettings();
      const planner = this.normalizePlannerState(settings?.planner, server.host);
      const activeVillage = this.activePlannerVillage(planner);
      const steps = this.plannerGuideSteps();
      const progress = this.plannerProgress(activeVillage);

      if (!settings?.planner || !Array.isArray(settings?.planner?.villages)) {
        await this.saveSettings({ planner });
      }

      const villageOptions = planner.villages
        .map((v) => {
          const selected = v.id === planner.activeVillageId ? " selected" : "";
          return '<option value="' + this.escapeHtml(v.id) + '"' + selected + ">" + this.escapeHtml(v.name) + "</option>";
        })
        .join("");

      const firstPendingStep = steps.find(
        (step) => !Boolean(activeVillage?.completedSteps?.[String(step.id)]),
      );
      const firstPendingStepId = String(firstPendingStep?.id || "");

      const rows = steps
        .map((step) => {
          const checked = Boolean(activeVillage?.completedSteps?.[String(step.id)]);
          const note = String(step.note || "");
          const isFirstPending =
            !checked && String(step.id) === firstPendingStepId;
          const rowClass = isFirstPending
            ? "nytrina-planner-step-row nytrina-planner-first-pending"
            : "nytrina-planner-step-row";
          return (
            '<tr class="' + rowClass + '" data-step-id="' +
            String(step.id) +
            '">' +
            '<td><input class="nytrina-planner-step-check" data-step-id="' +
            String(step.id) +
            '" type="checkbox"' +
            (checked ? ' checked="checked"' : "") +
            "></td>" +
            "<td>#" +
            String(step.id) +
            "</td>" +
            "<td>" +
            this.escapeHtml(step.day) +
            "</td>" +
            "<td>" +
            this.escapeHtml(step.action) +
            "</td>" +
            "<td>" +
            this.escapeHtml(step.type) +
            "</td>" +
            "<td>" +
            this.escapeHtml(note) +
            "</td>" +
            "</tr>"
          );
        })
        .join("");

      node.innerHTML = [
        '<div class="card">',
        '<span>Planner de construcao</span>',
        '<div class="hint" style="margin-top:4px;">Host atual: ' +
          String(server.host || "-") +
          "</div>",
        '<div class="hint" style="margin-top:4px;">Cadastro de vilas para seguir ordem de construcao ate a 2a aldeia.</div>',
        '<div class="grid" style="margin-top:10px;">',
        '<div class="card"><span>Vila ativa</span><select id="nytrina-planner-village">' +
          villageOptions +
          "</select></div>",
        '<div class="card"><span>Progresso</span><b>' + String(progress) + '%</b><div class="hint">' +
          String(steps.length) +
          " etapas totais</div></div>",
        "</div>",
        '<label>Nome da vila ativa<input id="nytrina-planner-village-name" value="' +
          this.escapeHtml(activeVillage?.name || "") +
          '" placeholder="Ex: M - Osgiliath"></label>',
        '<div class="actions" style="margin-top:10px;">',
        '<button id="nytrina-planner-add-village">Nova vila</button>',
        '<button id="nytrina-planner-remove-village"' +
          (planner.villages.length <= 1 ? ' disabled="disabled"' : "") +
          '>Remover vila ativa</button>',
        '<button id="nytrina-planner-clear">Limpar checklist</button>',
        "</div>",
        "</div>",
        '<div class="card"><span>Etapas de construcao</span><div class="planner-steps-scroll"><table><thead><tr><th>Ok</th><th>#</th><th>Dia</th><th>Etapa</th><th>Tipo</th><th>Observacao</th></tr></thead><tbody>' +
          rows +
          "</tbody></table></div></div>",
      ].join("");

      this.scrollPlannerToFirstPending(node);

      node
        .querySelector("#nytrina-planner-village")
        ?.addEventListener("change", async (event) => {
          const selected = String(event?.target?.value || "");
          const next = this.normalizePlannerState(settings?.planner, server.host);
          if (next.villages.some((v) => v.id === selected)) {
            next.activeVillageId = selected;
            await this.saveSettings({ planner: next });
            await this.refreshPlanner();
          }
        });

      node
        .querySelector("#nytrina-planner-village-name")
        ?.addEventListener("change", async (event) => {
          const value = String(event?.target?.value || "").trim();
          const next = this.normalizePlannerState(settings?.planner, server.host);
          const target = this.activePlannerVillage(next);
          if (!target) return;
          target.name = value || target.name;
          await this.saveSettings({ planner: next });
          await this.refreshPlanner();
        });

      node
        .querySelector("#nytrina-planner-add-village")
        ?.addEventListener("click", async () => {
          const next = this.normalizePlannerState(settings?.planner, server.host);
          const typed = String(global.prompt("Nome da nova vila:", "") || "").trim();
          const id = "aldeia-" + String(Date.now());
          next.villages.push({
            id,
            name: typed || "Aldeia " + String(next.villages.length + 1),
            completedSteps: {},
          });
          next.activeVillageId = id;
          await this.saveSettings({ planner: next });
          await this.refreshPlanner();
        });

      node
        .querySelector("#nytrina-planner-remove-village")
        ?.addEventListener("click", async () => {
          const next = this.normalizePlannerState(settings?.planner, server.host);
          if (next.villages.length <= 1) return;
          const target = this.activePlannerVillage(next);
          if (!target) return;
          const proceed = global.confirm('Remover a vila ativa "' + target.name + '"?');
          if (!proceed) return;
          next.villages = next.villages.filter((v) => v.id !== target.id);
          next.activeVillageId = next.villages[0]?.id || "aldeia-1";
          await this.saveSettings({ planner: next });
          await this.refreshPlanner();
        });

      node
        .querySelector("#nytrina-planner-clear")
        ?.addEventListener("click", async () => {
          const next = this.normalizePlannerState(settings?.planner, server.host);
          const target = this.activePlannerVillage(next);
          if (!target) return;
          target.completedSteps = {};
          await this.saveSettings({ planner: next });
          await this.refreshPlanner();
        });

      const updatePlannerStep = async (stepId, checked) => {
        const currentSettings = this.getSettings();
        const next = this.normalizePlannerState(currentSettings?.planner, server.host);
        const target = this.activePlannerVillage(next);
        if (!target) return;
        target.completedSteps[stepId] = checked === true;
        await this.saveSettings({ planner: next });
        await this.refreshPlanner();
      };

      node.querySelectorAll(".nytrina-planner-step-row").forEach((row) => {
        row.addEventListener("click", async () => {
          const stepId = String(row.getAttribute("data-step-id") || "");
          if (!stepId) return;
          const checkbox = row.querySelector(".nytrina-planner-step-check");
          if (!(checkbox instanceof HTMLInputElement)) return;
          const nextValue = checkbox.checked !== true;
          checkbox.checked = nextValue;
          await updatePlannerStep(stepId, nextValue);
        });
      });

      node.querySelectorAll(".nytrina-planner-step-check").forEach((checkbox) => {
        checkbox.addEventListener("click", (event) => {
          event.stopPropagation();
        });

        checkbox.addEventListener("change", async (event) => {
          event.stopPropagation();
          const stepId = String(event?.target?.dataset?.stepId || "");
          if (!stepId) return;
          await updatePlannerStep(stepId, event.target.checked === true);
        });
      });
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
        '<div class="actions"><button id="nytrina-save-settings">Salvar</button><button id="nytrina-export-backup">Exportar Backup</button><button id="nytrina-import-backup">Substituir por Backup</button><button id="nytrina-merge-backup">Mesclar Backup</button><input id="nytrina-import-backup-file" type="file" accept="application/json" style="display:none"></div>',
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
      const mergeBackupButton = node.querySelector("#nytrina-merge-backup");
      const importBackupFile = node.querySelector("#nytrina-import-backup-file");
      let backupMode = "replace";

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
          };

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
        backupMode = "replace";
        importBackupFile?.click();
      });

      mergeBackupButton?.addEventListener("click", () => {
        backupMode = "merge";
        importBackupFile?.click();
      });

      importBackupFile?.addEventListener("change", async (event) => {
        const input = event.target;
        const file = input?.files && input.files[0] ? input.files[0] : null;
        if (!file) return;

        try {
          const content = await file.text();
          const parsed = JSON.parse(content);

          if (backupMode === "merge") {
            const merged = await this.storage.mergeBackup(parsed);
            const learned = await this.learnReports(merged.newReports);

            this.scanner.lastSignature = "";
            await this.refresh();

            root.Modal.show(
              "Backup",
              "Backup mesclado. Relatórios novos: " +
                merged.newReports.length +
                " | Aprendidos: " +
                learned.learned +
                " | Históricos novos: " +
                merged.history +
                " | Oásis atualizados: " +
                merged.oasis,
            );
            return;
          }

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

          const importedStatistics = await this.storage.getAll(
            root.Constants.STORES.STATISTICS,
          );
          const hasLearningData = importedStatistics.some((row) => {
            const id = String(row?.id || "");
            return (
              id.startsWith("battleKnowledge:") ||
              id.startsWith("battleCalibration:")
            );
          });
          let learnedFromReports = 0;
          if (!hasLearningData && Number(result?.REPORTS || 0) > 0) {
            const rebuilt = await this.rebuildLearningFromReports();
            learnedFromReports = rebuilt.learned;
          }

          this.scanner.lastSignature = "";
          await this.refresh();

          root.Modal.show(
            "Backup",
            "Backup importado com sucesso. OASIS: " +
              Number(result?.OASIS || 0) +
              " | REPORTS: " +
              Number(result?.REPORTS || 0) +
              " | STATISTICS: " +
              Number(result?.STATISTICS || 0) +
              (learnedFromReports > 0
                ? " | Batalhas usadas para aprendizado: " + learnedFromReports
                : ""),
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
          const seqRight = Number(b?.reportSeq || b?.lastBattle?.reportSeq || 0);
          const seqLeft = Number(a?.reportSeq || a?.lastBattle?.reportSeq || 0);
          if (seqRight !== seqLeft) {
            return seqRight - seqLeft;
          }

          const right = new Date(b.updatedAt || b.lastBattle?.date || 0).getTime();
          const left = new Date(a.updatedAt || a.lastBattle?.date || 0).getTime();
          if (right !== left) return right - left;
          return String(a.troopType).localeCompare(String(b.troopType));
        });
      const recentKnowledgeRows = sortedKnowledgeRows.slice(0, 50);
      const totalSamples = recentKnowledgeRows.reduce(
        (sum, row) => sum + Number(row.samples || 0),
        0,
      );
      const latestRow = recentKnowledgeRows[0] || null;
      const topRowBySamples = recentKnowledgeRows
        .slice()
        .sort((a, b) => Number(b.samples || 0) - Number(a.samples || 0))[0] || null;

      const debugMeta = this.paginationMeta(
        recentKnowledgeRows.length,
        this.debugPage,
        this.debugPerPage,
      );
      this.debugPage = debugMeta.page;
      const debugPageRows = recentKnowledgeRows.slice(debugMeta.start, debugMeta.end);

      node.innerHTML = [
        '<div class="grid">',
        '<div class="card"><span>Ultima entrada</span><b>' +
          (latestRow ? String(latestRow.reportSeq || latestRow.lastBattle?.reportSeq || "-") : "-") +
          '</b><div class="hint">' +
          this.escapeHtml(latestRow?.troopType || "-") +
          ' | ' +
          this.escapeHtml(this.formatDateTimeFull(latestRow?.updatedAt || latestRow?.lastBattle?.date)) +
          '</div></div>',
        '<div class="card"><span>Amostras totais</span><b>' +
          String(totalSamples) +
          '</b><div class="hint">' +
          String(recentKnowledgeRows.length) +
          ' perfis recentes</div></div>',
        '<div class="card"><span>Mais treinado</span><b>' +
          this.escapeHtml(this.compactTroopLabel(topRowBySamples?.troopType || "-")) +
          '</b><div class="hint">' +
          String(Number(topRowBySamples?.samples || 0)) +
          ' amostras</div></div>',
        '<div class="card"><span>Resultado recente</span><b>' +
          this.escapeHtml((latestRow && (latestRow.lastOutcome || latestRow.lastBattle?.outcome)) || "-") +
          '</b><div class="hint">' +
          String(Number(latestRow?.estimatedSafe || latestRow?.minSuccess || 0) || "-") +
          ' envio(s)</div></div>',
        '</div>',

        '<div class="actions">',
        '<button id="nytrina-clear-knowledge">Limpar Battle Knowledge</button>',
        '<button id="nytrina-rebuild-knowledge">Reconstruir via Relatórios</button>',
        "</div>",

        '<div class="table-scroll">',
        '<table class="debug-table"><thead><tr>',
        "<th>#</th><th>Tropa</th><th>Enviadas</th><th>Sugestão</th><th>Acerto</th><th>Resultado</th><th>Relatório</th><th>XP</th><th>Baixas</th><th>Mortas</th><th>Enfermaria</th><th>% Baixas</th><th>Amostras</th><th>Data/Hora</th>",
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
            const reportSeq = Number(row.reportSeq || last.reportSeq || 0);

            const outcomeLabels = {
              perfect: "Perfeito",
              cleared_with_losses: "Limpou com perdas",
              almost_cleared: "Quase limpou",
              partial: "Parcial",
              failure: "Falha",
            };

            return (
              "<tr><td>" +
              (reportSeq > 0 ? String(reportSeq) : "-") +
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
              '<span class="debug-col-result">' +
              (outcomeLabels[row.lastOutcome] || "-") +
              "</span>" +
              "</td><td>" +
              '<span class="debug-col-report">' +
              this.escapeHtml(String(last.reportId || row.id || "-")) +
              "</span>" +
              "</td><td>" +
              Math.round(row.xp || 0) +
              "</td><td>" +
              casualties +
              "</td><td>" +
              lost +
              "</td><td>" +
              wounded +
              "</td><td>" +
              casualtyRate.toFixed(1) +
              "%</td><td>" +
              Number(row.samples || 0) +
              "</td><td>" +
              '<span class="debug-col-datetime">' +
              this.formatDateTimeFull(row.updatedAt || last.date) +
              "</span>" +
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




// FILE: main.js

// ==UserScript==
// @name         NytrinA Travian Companion 4.0.4
// @namespace    nytrina-travian
// @version      4.0.4
// @description  Companion Travian V4: parser DOM-first, scanner modular, ranking, relatorios e economia em IndexedDB.
// @match        *://*.travian.*/*
// @match        *://*.travian.com/*
// @grant        none
// ==/UserScript==

(function bootstrap(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  function resolveEffectiveSpeed(settings, serverSpeed) {
    const speedMap = root.Troops.speeds;

    if (settings.troopType === 'custom') {
      return Number(settings.customSpeed || 14);
    }

    if (settings.troopType === 'hero') {
      return Number(speedMap.hero || 14) * serverSpeed;
    }

    let base = 0;

    for (const tribe of ['romans', 'teutons', 'gauls']) {
      const tribeTable = speedMap[tribe] || {};
      if (Object.prototype.hasOwnProperty.call(tribeTable, settings.troopType)) {
        base = Number(tribeTable[settings.troopType] || 0);
        break;
      }
    }

    if (!base) base = Number(settings.customSpeed || 14);

    return base * serverSpeed;
  }

  async function start() {
    const server = root.Server.getContext();
    const storage = new root.StorageService();
    await storage.init(server.key);

    const settingsStoreName = root.Constants.STORES.SETTINGS;

    const defaultSettings = {
      ...root.Constants.DEFAULT_SETTINGS,
      id: 'main'
    };

    let savedSettings = await storage.get(settingsStoreName, 'main');

    let settings = {
      ...defaultSettings,
      ...(savedSettings || {}),
      id: 'main'
    };

    await storage.put(settingsStoreName, settings);

    function getSettings() {
      const current = {
        ...settings,
        id: 'main'
      };

      return {
        ...current,
        effectiveSpeed: resolveEffectiveSpeed(current, server.speed)
      };
    }

    async function saveSettings(patch) {
      settings = {
        ...settings,
        ...patch,
        id: 'main'
      };

      await storage.put(settingsStoreName, settings);

      return getSettings();
    }

    let overlay = null;

    const scanner = new root.ScannerService({
      storage,
      getSettings,
      onUpdate: () => {
        if (overlay) {
          overlay.refreshFromData().catch(() => undefined);
        }
      }
    });

    overlay = new root.Overlay({
      storage,
      scanner,
      getSettings,
      saveSettings
    });

    overlay.mount();
    scanner.start();

    global.NytrinA.getSettings = getSettings;
    global.NytrinA.saveSettings = saveSettings;
  }

  start().catch((error) => {
    global.console.error('NytrinA bootstrap error', error);
  });
})(window);

