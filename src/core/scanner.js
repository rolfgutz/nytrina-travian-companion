(function initScanner(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});
  const constants = root.Constants;
  const MAX_REPORT_ROWS = 50;
  const MAX_HISTORY_ROWS = 50;

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
      if (!report) return;
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
        console.log('[NytrinA] Limpando banco: deletando', toDelete.length, 'relatórios antigos');
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
        console.log('[NytrinA] Limpando banco: deletando', historyToDelete.length, 'históricos antigos');
        for (const oldHistory of historyToDelete) {
          if (oldHistory?.id) {
            await this.storage.delete(root.Constants.STORES.HISTORY, oldHistory.id);
          }
        }
      }

      if (typeof this.onUpdate === 'function') this.onUpdate('report', report);
    }
  }

  root.ScannerService = ScannerService;
})(window);
