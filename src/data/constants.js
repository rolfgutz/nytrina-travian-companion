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
