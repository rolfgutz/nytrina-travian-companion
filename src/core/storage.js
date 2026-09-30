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
