(function attachStylesNamespace(global) {
  'use strict';
  const root = (global.NytrinA = global.NytrinA || {});
  root.UI_STYLES = "#nytrina-overlay {\r\n  position: fixed;\r\n  top: 70px;\r\n  right: 16px;\r\n  width: 520px;\r\n  max-height: 88vh;\r\n  overflow: auto;\r\n  z-index: 999999;\r\n  background: linear-gradient(180deg, #1a130e, #100c08);\r\n  color: #f7ebd7;\r\n  border: 2px solid #b97822;\r\n  border-radius: 12px;\r\n  box-shadow: 0 0 24px rgba(0, 0, 0, 0.8);\r\n  font-family: Verdana, sans-serif;\r\n  font-size: 13px;\r\n}\r\n\r\n#nytrina-overlay * {\r\n  box-sizing: border-box;\r\n}\r\n\r\n#nytrina-overlay .head {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 10px 12px;\r\n  background: #25170d;\r\n  border-bottom: 1px solid #6e4518;\r\n}\r\n\r\n#nytrina-overlay .tabs {\r\n  display: grid;\r\n  grid-template-columns: repeat(7, 1fr);\r\n  gap: 4px;\r\n  padding: 10px;\r\n}\r\n\r\n#nytrina-overlay .tab {\r\n  background: #23170d;\r\n  color: #d8bc91;\r\n  border: 1px solid #7a4c1a;\r\n  border-radius: 6px;\r\n  padding: 6px;\r\n  cursor: pointer;\r\n}\r\n\r\n#nytrina-overlay .tab.active {\r\n  background: #5a350f;\r\n  color: #ffe0ad;\r\n  border-color: #c9892a;\r\n  font-weight: bold;\r\n}\r\n\r\n#nytrina-overlay .panel {\r\n  padding: 10px;\r\n}\r\n\r\n#nytrina-overlay .hidden {\r\n  display: none;\r\n}\r\n\r\n#nytrina-overlay .grid {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  gap: 8px;\r\n}\r\n\r\n#nytrina-overlay .card {\r\n  background: #28190d;\r\n  border: 1px solid #6e4518;\r\n  border-radius: 7px;\r\n  padding: 8px;\r\n}\r\n\r\n#nytrina-overlay .card span {\r\n  display: block;\r\n  font-size: 11px;\r\n  color: #d0ad7b;\r\n  margin-bottom: 3px;\r\n}\r\n\r\n#nytrina-overlay .card b {\r\n  color: #fff;\r\n}\r\n\r\n#nytrina-overlay table {\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n  margin-top: 8px;\r\n  background: #120b06;\r\n}\r\n\r\n#nytrina-overlay th,\r\n#nytrina-overlay td {\r\n  border: 1px solid #6f461c;\r\n  padding: 6px;\r\n  text-align: left;\r\n  color: #f7ead2;\r\n}\r\n\r\n#nytrina-overlay th {\r\n  background: #3a230f;\r\n  color: #ffe0ad;\r\n}\r\n\r\n#nytrina-overlay td {\r\n  background: #1d1209;\r\n}\r\n\r\n#nytrina-overlay .actions {\r\n  display: flex;\r\n  gap: 8px;\r\n  margin-top: 10px;\r\n}\r\n\r\n#nytrina-overlay button {\r\n  background: #5a350f;\r\n  color: #ffe0ad;\r\n  border: 1px solid #c9892a;\r\n  border-radius: 7px;\r\n  padding: 6px 10px;\r\n  cursor: pointer;\r\n}\r\n\r\n#nytrina-overlay label {\r\n  display: block;\r\n  margin-top: 8px;\r\n  color: #ffd79b;\r\n  font-size: 12px;\r\n}\r\n\r\n#nytrina-overlay input,\r\n#nytrina-overlay select {\r\n  width: 100%;\r\n  height: 34px;\r\n  margin-top: 4px;\r\n  padding: 6px;\r\n  border-radius: 6px;\r\n  border: 1px solid #8b5a22;\r\n  background: #23170d;\r\n  color: #f7ead2;\r\n}\r\n\r\n#nytrina-overlay #nytrina-scanner-troop,\r\n#nytrina-overlay #nytrina-setting-troop {\r\n  background: #f3e7d1;\r\n  color: #1a120a;\r\n  border-color: #c9a16a;\r\n}\r\n\r\n#nytrina-overlay #nytrina-scanner-troop option,\r\n#nytrina-overlay #nytrina-setting-troop option,\r\n#nytrina-overlay #nytrina-scanner-troop optgroup,\r\n#nytrina-overlay #nytrina-setting-troop optgroup {\r\n  background: #f3e7d1;\r\n  color: #1a120a;\r\n}\r\n\r\n#nytrina-overlay input[type='checkbox'] {\r\n  width: 16px;\r\n  height: 16px;\r\n  margin-top: 0;\r\n  margin-right: 6px;\r\n  vertical-align: middle;\r\n}\r\n\r\n#nytrina-overlay .check-row {\r\n  display: flex;\r\n  align-items: center;\r\n  color: #ffd79b;\r\n  margin-top: 10px;\r\n}\r\n\r\n#nytrina-overlay .form-grid {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  gap: 8px;\r\n}\r\n\r\n#nytrina-overlay .stack {\r\n  margin-top: 10px;\r\n}\r\n\r\n#nytrina-overlay .server-badge {\r\n  margin-bottom: 8px;\r\n  padding: 8px;\r\n  border-radius: 6px;\r\n  border: 1px solid #8a5a24;\r\n  background: #1b120a;\r\n  color: #ffd79b;\r\n}\r\n\r\n#nytrina-overlay .server-warning {\r\n  display: none;\r\n  margin-top: 8px;\r\n  padding: 8px;\r\n  border-radius: 6px;\r\n  border: 1px solid #c9892a;\r\n  background: #3a230f;\r\n  color: #ffd26a;\r\n}\r\n\r\n#nytrina-overlay .server-warning.show {\r\n  display: block;\r\n}\r\n\r\n#nytrina-overlay .rank-good {\r\n  color: #72ff72;\r\n  font-weight: bold;\r\n}\r\n\r\n#nytrina-overlay .rank-mid {\r\n  color: #ffd26a;\r\n  font-weight: bold;\r\n}\r\n\r\n#nytrina-overlay .rank-bad {\r\n  color: #ff7d7d;\r\n  font-weight: bold;\r\n}\r\n\r\n#nytrina-overlay .debug-json {\r\n  white-space: pre-wrap;\r\n  background: #120b06;\r\n  border: 1px solid #6f461c;\r\n  border-radius: 8px;\r\n  padding: 8px;\r\n  font-family: Consolas, monospace;\r\n  max-height: 360px;\r\n  overflow: auto;\r\n}\r\n\r\n#nytrina-overlay input[type=\"checkbox\"] {\r\n    appearance: checkbox !important;\r\n    -webkit-appearance: checkbox !important;\r\n    accent-color: #c9892a;\r\n    width: 16px !important;\r\n    height: 16px !important;\r\n    cursor: pointer;\r\n}\r\n\r\n#nytrina-overlay.minimized .tabs {\r\n  display: none;\r\n}\r\n\r\n#nytrina-overlay.minimized .panel {\r\n  display: none;\r\n}\r\n\r\n#nytrina-toggle-minimize {\r\n  min-width: 92px;\r\n}";
})(window);


// FILE: data/constants.js

(function initConstants(global) {
  'use strict';

  /** @type {Record<string, unknown>} */
  const root = (global.NytrinA = global.NytrinA || {});

  root.Constants = {
    APP_NAME: 'NytrinA Travian Companion',
    APP_VERSION: '4.0.0',
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
      paladin: 10,
      teutonic_knight: 9
    },
    gauls: {
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
  function calcLossCost(tribe, lost) {
    const tribeCosts = TROOP_COSTS[tribe] || TROOP_COSTS.romans;
    let total = 0;
    const detail = [];

    Object.entries(lost || {}).forEach(([unitClass, qty]) => {
      const normalizedQty = Number(qty || 0);
      const cost = tribeCosts[unitClass];
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
        source: "tooltip",
        fn: () => fromTooltip(),
      },
      {
        source: "oasis-window",
        fn: () => fromOasisWindow(),
      },
      {
        source: "written",
        fn: () => fromWrittenCoordinate(contextElement),
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

    return Array.from(roots);
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
  function parseDistance(rootElement) {
    const candidates = rootElement.querySelectorAll('td,th,span,div,b,strong');
    for (const node of candidates) {
      const text = utils.normalizeText(node.textContent || '');
      if (!text.includes('distancia')) continue;
      const number = utils.toNumber(node.textContent || '');
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
   * @returns {{travelSeconds:number,xph:number,time:string}}
   */
  function computeTime(distance, speed, smallMap) {
    if (!distance || !speed) {
      return { travelSeconds: 0, xph: 0, time: '-' };
    }

    const oneWay = (distance / speed) * 3600;
    const returnTime = smallMap ? oneWay / 2 : oneWay;
    const travelSeconds = oneWay + returnTime;
    return {
      travelSeconds,
      xph: 0,
      time: utils.secondsToClock(travelSeconds)
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
    const xph = timeInfo.travelSeconds ? xp / (timeInfo.travelSeconds / 3600) : 0;

    return {
      server: server.getContext().key,
      coord: coordInfo.coord,
      distance,
      bonus,
      animals,
      totalAnimals,
      xp,
      xph,
      time: timeInfo.time,
      scanDate: new Date().toISOString()
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




// FILE: core/ranking.js

(function initRanking(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  /**
   * @param {Array<any>} oasisRows
   * @returns {Array<any>}
   */
  function buildRanking(oasisRows) {
    return (oasisRows || [])
      .map((row) => ({
        coord: row.coord,
        distance: row.distance,
        xp: row.xp,
        xph: row.xph,
        time: row.time,
        bonus: row.bonus,
        scanDate: row.scanDate
      }))
      .sort((a, b) => (b.xph || 0) - (a.xph || 0));
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

  const ANIMAL_DEFENSE = {
    rato: 25,
    aranha: 35,
    cobra: 40,
    morcego: 66,
    javali: 70,
    lobo: 80,
    urso: 140,
    crocodilo: 380,
    tigre: 170,
    elefante: 440,
  };

  const TROOP_ATTACK = {
    legionnaire: 40,
    imperian: 70,
    equites_imperatoris: 120,
    equites_caesaris: 180,
    clubman: 40,
    paladin: 55,
    teutonic_knight: 150,
    theutates_thunder: 90,
    haeduan: 140,
  };

  function calcAnimalDefense(animals) {
    return Object.entries(animals || {}).reduce((sum, [key, qty]) => {
      return sum + Number(qty || 0) * Number(ANIMAL_DEFENSE[key] || 0);
    }, 0);
  }

  function recommend({ animals, troopType }) {
    const defense = calcAnimalDefense(animals);
    const attack = Number(TROOP_ATTACK[troopType] || 0);

    if (!defense || !attack) {
      return { ok: false, message: "Sem dados suficientes para recomendar." };
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

  function normalizeAnimals(animals) {
    const empty = root.Animals.emptyAnimals();

    return {
      ...empty,
      ...(animals || {}),
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
    console.log("1 - Entrou no learnFromReport");

    if (!report) {
      console.log("2 - report vazio");
      return null;
    }

    console.log(report);

    const tribe = report.tribe || "romans";
    const troopType = report.troopType || null;
    const sent = Number(report.troopsSentCount || 0);
    const xp = Number(report.xp || 0);
    const animals = report.animalsInitial || report.animalsKilled || {};

    console.log({
      tribe,
      troopType,
      sent,
      xp,
      animals,
    });

    if (!troopType) {
      console.log("PAROU: troopType");
      return null;
    }

    if (!sent) {
      console.log("PAROU: sent");
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

    if (!cleared && sent > 0 && killRate > 0) {
      // Estimativa proporcional para atingir 100% de eliminação.
      estimatedClear = Math.ceil(sent / killRate);

      // Quanto menor a taxa de eliminação, maior a margem necessária.
      let safetyMultiplier = 1.15;

      if (killRate >= 0.95) {
        safetyMultiplier = 1.05;
      } else if (killRate >= 0.85) {
        safetyMultiplier = 1.08;
      } else if (killRate >= 0.7) {
        safetyMultiplier = 1.12;
      }

      estimatedSafe = Math.ceil(estimatedClear * safetyMultiplier);
    }
    console.log("Cleared:", cleared);

    const knowledge = await getKnowledge(
      storage,
      tribe,
      troopType,
      xp,
      animals,
    );

    console.log("Knowledge carregado", knowledge);

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
      date: report.date || new Date().toISOString(),
    };

    const hasHero = Boolean(report.hasHero);

    const calibration = await updateCalibration({
      storage,
      tribe,
      troopType,
      hasHero,
      sent,
      killRate,
      cleared,
      troopsLostCount: Number(report.troopsLostCount || 0),
      troopsWoundedCount: Number(report.troopsWoundedCount || 0),
    });

    console.log("CALIBRAÇÃO ATUALIZADA", calibration);
    console.log("SALVANDO", knowledge);

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
    getKnowledge,
    learnFromReport,
    suggestFromKnowledge,

    getCalibration,
    updateCalibration,
    applyCalibration,
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
      factorSum: 0,
      averageFactor: 1,
      maxFactor: 1,
      updatedAt: null,
    };

    calibration.samples = Number(calibration.samples || 0);
    calibration.factorSum = Number(calibration.factorSum || 0);
    calibration.averageFactor = Number(calibration.averageFactor || 1);
    calibration.maxFactor = Number(calibration.maxFactor || 1);
    calibration.hasHero = Boolean(hasHero);

    return calibration;
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
  }) {
    if (!storage || !troopType || sent <= 0 || killRate <= 0) {
      return null;
    }

    let requiredSafe = sent;

    if (!cleared) {
      const estimatedClear = sent / killRate;

      let margin = 1.15;

      if (killRate >= 0.95) {
        margin = 1.05;
      } else if (killRate >= 0.85) {
        margin = 1.1;
      } else if (killRate >= 0.7) {
        margin = 1.15;
      } else {
        margin = 1.25;
      }

      requiredSafe = estimatedClear * margin;
    } else {
      const casualties =
        Number(troopsLostCount || 0) + Number(troopsWoundedCount || 0);

      const casualtyRate = casualties / sent;

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
    calibration.factorSum += factor;
    calibration.averageFactor = calibration.factorSum / calibration.samples;
    calibration.maxFactor = Math.max(
      Number(calibration.maxFactor || 1),
      factor,
    );
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

    if (Number(calibration.samples || 0) <= 0) {
      return {
        troops: Math.ceil(theoretical),
        factor: 1,
        samples: 0,
      };
    }

    /*
     * Usamos o maior entre a média e 90% do maior fator observado.
     * Isso evita ficar agressivo demais depois de uma batalha ruim.
     */
    const learnedFactor =
      Math.max(
        Number(calibration.averageFactor || 1),
        Number(calibration.maxFactor || 1),
      ) * 1.0;

    return {
      troops: Math.ceil(theoretical * learnedFactor),
      factor: learnedFactor,
      samples: Number(calibration.samples || 0),
    };
  }

  root.BattleLearning = root.BattleKnowledge;
})(window);




// FILE: core/scanner.js

(function initScanner(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});
  const constants = root.Constants;

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
      if (!report) return;
      await this.storage.put(root.Constants.STORES.REPORTS, report);

      const historyId = (report.coord || 'unknown') + ':' + report.reportId;
      await this.storage.put(root.Constants.STORES.HISTORY, {
        id: historyId,
        coord: report.coord || null,
        reportId: report.reportId,
        date: report.date,
        lossCost: report.lossCost,
        profit: report.profit,
        xp: report.xp,
        totalResources: report.totalResources
      });

      if (typeof this.onUpdate === 'function') this.onUpdate('report', report);
    }
  }

  root.ScannerService = ScannerService;
})(window);




// FILE: core/scanner.js

(function initScanner(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});
  const constants = root.Constants;

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
      if (!report) return;
      await this.storage.put(root.Constants.STORES.REPORTS, report);

      const historyId = (report.coord || 'unknown') + ':' + report.reportId;
      await this.storage.put(root.Constants.STORES.HISTORY, {
        id: historyId,
        coord: report.coord || null,
        reportId: report.reportId,
        date: report.date,
        lossCost: report.lossCost,
        profit: report.profit,
        xp: report.xp,
        totalResources: report.totalResources
      });

      if (typeof this.onUpdate === 'function') this.onUpdate('report', report);
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

  /**
   * @param {string} title
   * @param {string} content
   */
  function show(title, content) {
    const text = title + '\n\n' + content;
    global.alert(text);
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

      console.log('[NytrinA] Configurações salvas:', settings);

      return getSettings();
    }

    let overlay = null;

    const scanner = new root.ScannerService({
      storage,
      getSettings,
      onUpdate: () => {
        if (overlay) {
          overlay.refresh().catch(() => undefined);
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

