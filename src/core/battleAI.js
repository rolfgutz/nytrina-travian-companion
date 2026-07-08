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
