(function initConstants(global) {
  'use strict';

  /** @type {Record<string, unknown>} */
  const root = (global.NytrinA = global.NytrinA || {});

  root.Constants = {
    APP_VERSION: '4.1.0',
    DB_NAME_PREFIX: 'nytrina_companion_db',
    DB_VERSION: 2,
    STORES: {
      OASIS: 'OASIS',
      REPORTS: 'REPORTS',
      SETTINGS: 'SETTINGS',
      STATISTICS: 'STATISTICS',
      HISTORY: 'HISTORY',
      LEARNING_EVENTS: 'LEARNING_EVENTS'
    },
    DEFAULT_SETTINGS: {
      server: 'auto',
      troopType: 'hero',
      troopTribe: 'romans',
      recommendationGoal: 'economic',
      customSpeed: 14,
      smallMap: false
    },
    SCAN_INTERVAL_MS: 1500
  };
})(window);
