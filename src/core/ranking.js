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
