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
      .sort((a, b) => (b.xp || 0) - (a.xp || 0));
  }

  root.Ranking = {
    buildRanking
  };
})(window);
