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
        if (!db.objectStoreNames.contains(stores.LEARNING_EVENTS)) {
          db.createObjectStore(stores.LEARNING_EVENTS, { keyPath: 'id' });
        }
      };

      this.db = await requestToPromise(openRequest);
      await this.migrateLearningEvents();
    }

    attachLearnedReportIds(statistics, reports, learningEvents = []) {
      if (!root.BattleKnowledge) return { learnedIds: new Set(), changed: false };
      const byId = new Map(statistics.map((row) => [String(row.id), row]));
      const learnedIds = new Set();
      const eventIds = new Set(learningEvents.map((event) => String(event.id || event.reportId)));
      const profileFor = (report) => {
        const troopType = String(report?.troopType || '');
        const tribe = String(report?.tribe || 'romans');
        if (!troopType) return null;
        const animals = report.animalsInitial || report.animalsKilled || {};
        const scopedId = root.BattleKnowledge.knowledgeId(
          tribe,
          troopType,
          report.xp,
          animals,
          Boolean(report.hasHero),
        );
        const legacyId =
          'battleKnowledge:' + tribe + ':' + troopType + ':' +
          root.BattleKnowledge.makeSignature(report.xp, animals);
        return byId.get(scopedId) || byId.get(legacyId) || null;
      };
      const candidateCounts = new Map();
      for (const report of reports) {
        const knowledge = profileFor(report);
        if (knowledge) {
          const key = String(knowledge.id);
          candidateCounts.set(key, (candidateCounts.get(key) || 0) + 1);
        }
      }
      let changed = false;

      for (const report of reports) {
        const reportId = String(report?.reportId || '');
        const troopType = String(report?.troopType || '');
        const tribe = String(report?.tribe || 'romans');
        if (!reportId || !troopType || Number(report?.troopsSentCount || 0) <= 0) continue;
        const sentTypes = Object.entries(report.troopsSent || {}).filter(
          ([key, quantity]) => key !== 'hero' && Number(quantity || 0) > 0,
        );
        if (sentTypes.length > 1) continue;

        const animals = report.animalsInitial || report.animalsKilled || {};
        const hasHero = Boolean(report.hasHero);
        const knowledge = profileFor(report);
        if (!knowledge) continue;

        knowledge.learnedReportIds = Array.isArray(knowledge.learnedReportIds)
          ? knowledge.learnedReportIds.map(String)
          : [];
        knowledge.observations = Array.isArray(knowledge.observations)
          ? knowledge.observations
          : [];
        const hasExplicitReportIds =
          knowledge.learnedReportIds.length > 0 ||
          knowledge.observations.some((item) => item?.reportId);
        const reportIsKnown =
          eventIds.has(reportId) ||
          knowledge.learnedReportIds.includes(reportId) ||
          knowledge.observations.some((item) => String(item?.reportId || '') === reportId) ||
          (!hasExplicitReportIds && String(knowledge.lastBattle?.reportId || '') === reportId) ||
          (!hasExplicitReportIds &&
            !knowledge.lastBattle?.reportId &&
            Number(knowledge.samples || 0) >=
              Number(candidateCounts.get(String(knowledge.id)) || 0));
        if (!reportIsKnown) continue;

        if (!knowledge.learnedReportIds.includes(reportId)) {
          knowledge.learnedReportIds.push(reportId);
          changed = true;
        }
        if (!knowledge.observations.some((item) => String(item?.reportId) === reportId)) {
          const observation = root.BattleKnowledge.observationFromReport(report);
          if (observation?.estimatedSafe > 0) {
            knowledge.observations.push(observation);
            if (knowledge.observations.length > 200) {
              knowledge.observations = knowledge.observations.slice(-200);
            }
            changed = true;
          }
        }

        const calibrationId = root.BattleKnowledge.calibrationId(
          tribe,
          troopType,
          hasHero,
        );
        const calibration = byId.get(calibrationId);
        if (calibration) {
          calibration.learnedReportIds = Array.isArray(calibration.learnedReportIds)
            ? calibration.learnedReportIds.map(String)
            : [];
          if (!calibration.learnedReportIds.includes(reportId)) {
            calibration.learnedReportIds.push(reportId);
            changed = true;
          }
        }
        learnedIds.add(reportId);
      }

      return { learnedIds, changed };
    }

    async migrateLearningEvents() {
      if (!this.db || !root.BattleKnowledge) return;
      const S = constants.STORES;
      const [reports, statistics, events] = await Promise.all([
        this.getAll(S.REPORTS),
        this.getAll(S.STATISTICS),
        this.getAll(S.LEARNING_EVENTS),
      ]);
      const knownEvents = new Set(events.map((row) => String(row.id)));
      const { learnedIds, changed } = this.attachLearnedReportIds(
        statistics,
        reports,
        events,
      );
      const pending = [];

      for (const report of reports) {
        const reportId = String(report?.reportId || '');
        if (!reportId || knownEvents.has(reportId) || !learnedIds.has(reportId)) continue;

        pending.push({
          id: reportId,
          reportId,
          tribe: report.tribe || 'romans',
          troopType: report.troopType,
          hasHero: Boolean(report.hasHero),
          source: 'legacy-migration',
          learnedAt: report.date || new Date().toISOString(),
        });
      }

      if (pending.length || changed) {
        await this.runTransaction([S.STATISTICS, S.LEARNING_EVENTS], (tx) => {
          const statisticsStore = tx.objectStore(S.STATISTICS);
          statistics.forEach((row) => statisticsStore.put(row));
          const eventsStore = tx.objectStore(S.LEARNING_EVENTS);
          pending.forEach((event) => eventsStore.put(event));
        });
      }
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
        schemaVersion: 2,
        version: String(constants.APP_VERSION || '4.0.0'),
        createdAt: new Date().toISOString(),
        host: this.host,
        stores: data,
        counts,
      };
    }

    validateBackupHost(backup) {
      const backupHost = String(backup?.host || '').trim().toLowerCase();
      const currentHost = String(this.host || '').trim().toLowerCase();
      if (backupHost && currentHost && backupHost !== currentHost) {
        throw new Error(
          'Este backup pertence ao servidor ' + backupHost +
          ', mas o servidor atual e ' + currentHost + '.',
        );
      }
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
      const learningEventRows = asArray(
        storeData[constants.STORES.LEARNING_EVENTS] ?? backup.learningEvents,
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
      const learnedReportIds = this.attachLearnedReportIds(
        statisticsRows,
        reportsRows,
        learningEventRows,
      );
      const learningEventsById = new Map(
        learningEventRows
          .filter((row) => row && row.id)
          .map((row) => [String(row.id), row]),
      );
      const reportsById = new Map(
        reportsRows.map((row) => [String(row.reportId), row]),
      );
      learnedReportIds.learnedIds.forEach((reportId) => {
        if (!learningEventsById.has(reportId)) {
          const report = reportsById.get(reportId) || {};
          learningEventsById.set(reportId, {
            id: reportId,
            reportId,
            tribe: report.tribe || 'romans',
            troopType: report.troopType || null,
            hasHero: Boolean(report.hasHero),
            source: 'legacy-backup-migration',
          });
        }
      });
      const withKey = (rows, key) =>
        rows.filter((row) => row && row[key] !== undefined && row[key] !== null);

      return {
        [constants.STORES.OASIS]: withKey(oasisRows, 'id'),
        [constants.STORES.REPORTS]: withKey(reportsRows, 'reportId'),
        [constants.STORES.SETTINGS]: withKey(settingsRows, 'id'),
        [constants.STORES.HISTORY]: withKey(historyRows, 'id'),
        [constants.STORES.STATISTICS]: statisticsRows,
        [constants.STORES.LEARNING_EVENTS]: Array.from(learningEventsById.values()),
      };
    }

    /**
     * @param {any} backup
     * @returns {Promise<Record<string, number>>}
     */
    async importBackup(backup) {
      this.validateBackupHost(backup);
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
      const learnedReportIds = new Set(
        rows[constants.STORES.LEARNING_EVENTS].map((event) => String(event.id)),
      );
      counts.reportsToLearn = rows[constants.STORES.REPORTS].filter(
        (report) => !learnedReportIds.has(String(report.reportId)),
      );
      return counts;
    }

    /**
     * Keeps local settings and learning; adds reports, history and oases missing locally.
     * @param {any} backup
     * @returns {Promise<{newReports:Array<any>,history:number,oasis:number}>}
     */
    async mergeBackup(backup) {
      this.validateBackupHost(backup);
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
      const localStatistics = new Map(
        (await this.getAll(S.STATISTICS)).map((row) => [String(row.id), row]),
      );
      const localLearningEvents = new Set(
        (await this.getAll(S.LEARNING_EVENTS)).map((row) => String(row.id)),
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
      const statisticsToWrite = rows[S.STATISTICS].filter((row) => {
        const current = localStatistics.get(String(row.id));
        if (!current) return true;
        const incomingSamples = Number(row.samples || 0);
        const currentSamples = Number(current.samples || 0);
        if (incomingSamples !== currentSamples) {
          return incomingSamples > currentSamples;
        }
        return timeOf(row) > timeOf(current);
      });
      const statisticsToWriteIds = new Set(
        statisticsToWrite.map((row) => String(row.id)),
      );
      const incomingReportsById = new Map(
        rows[S.REPORTS].map((row) => [String(row.reportId), row]),
      );
      const appliedLearningEventIds = new Set();
      for (const event of rows[S.LEARNING_EVENTS]) {
        const reportId = String(event.id || event.reportId || '');
        const report = incomingReportsById.get(reportId) || {};
        const tribe = String(event.tribe || report.tribe || 'romans');
        const troopType = String(event.troopType || report.troopType || '');
        const hasHero = Boolean(event.hasHero ?? report.hasHero);
        if (!reportId || !troopType) continue;
        const knowledgeId = root.BattleKnowledge?.knowledgeId(
          tribe,
          troopType,
          report.xp,
          report.animalsInitial || report.animalsKilled || {},
          hasHero,
        );
        const legacyKnowledgeId =
          'battleKnowledge:' + tribe + ':' + troopType + ':' +
          (root.BattleKnowledge?.makeSignature(
            report.xp,
            report.animalsInitial || report.animalsKilled || {},
          ) || '');
        const localKnowledge =
          localStatistics.get(knowledgeId) || localStatistics.get(legacyKnowledgeId);
        const snapshotIncludesEvent =
          (knowledgeId && statisticsToWriteIds.has(knowledgeId)) ||
          (legacyKnowledgeId && statisticsToWriteIds.has(legacyKnowledgeId));
        const localIncludesEvent =
          localKnowledge?.learnedReportIds?.map(String).includes(reportId) || false;
        if (snapshotIncludesEvent || localIncludesEvent) {
          appliedLearningEventIds.add(reportId);
        }
      }
      const learningEventsToWrite = rows[S.LEARNING_EVENTS].filter((row) => {
        const reportId = String(row.id || row.reportId || '');
        return !localLearningEvents.has(reportId) &&
          appliedLearningEventIds.has(reportId);
      });
      const reportsToLearn = newReports.filter((row) => {
        const reportId = String(row.reportId);
        return !localLearningEvents.has(reportId) &&
          !appliedLearningEventIds.has(reportId);
      });

      await this.runTransaction(
        [S.REPORTS, S.HISTORY, S.OASIS, S.STATISTICS, S.LEARNING_EVENTS],
        (tx) => {
          newReports.forEach((row) => tx.objectStore(S.REPORTS).put(row));
          newHistory.forEach((row) => tx.objectStore(S.HISTORY).put(row));
          oasisToWrite.forEach((row) => tx.objectStore(S.OASIS).put(row));
          statisticsToWrite.forEach((row) => tx.objectStore(S.STATISTICS).put(row));
          learningEventsToWrite.forEach((row) => tx.objectStore(S.LEARNING_EVENTS).put(row));
        },
      );

      return {
        newReports,
        reportsToLearn,
        history: newHistory.length,
        oasis: oasisToWrite.length,
        statistics: statisticsToWrite.length,
        learningEvents: learningEventsToWrite.length,
      };
    }
  }

  root.StorageService = StorageService;
})(window);
