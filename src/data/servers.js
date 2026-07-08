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
