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

      for (const storeName of stores) {
        data[storeName] = await this.getAll(storeName);
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
     * @param {any} backup
     * @returns {Promise<Record<string, number>>}
     */
    async importBackup(backup) {
      if (!backup || typeof backup !== 'object') {
        throw new Error('Backup inválido.');
      }

      const stores = this.getStoreNames();
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

      for (const storeName of stores) {
        await this.clear(storeName);
      }

      await this.putMany(constants.STORES.OASIS, oasisRows);
      await this.putMany(constants.STORES.REPORTS, reportsRows);
      await this.putMany(constants.STORES.SETTINGS, settingsRows);
      await this.putMany(constants.STORES.HISTORY, historyRows);
      await this.putMany(constants.STORES.STATISTICS, statisticsRows);

      return {
        [constants.STORES.OASIS]: oasisRows.length,
        [constants.STORES.REPORTS]: reportsRows.length,
        [constants.STORES.SETTINGS]: settingsRows.length,
        [constants.STORES.HISTORY]: historyRows.length,
        [constants.STORES.STATISTICS]: statisticsRows.length,
      };
    }
  }

  root.StorageService = StorageService;
})(window);
