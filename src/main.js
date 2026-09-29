// ==UserScript==
// @name         NytrinA Travian Companion 4.0.4
// @namespace    nytrina-travian
// @version      4.0.4
// @description  Companion Travian V4: parser DOM-first, scanner modular, ranking, relatorios e economia em IndexedDB.
// @match        *://*.travian.*/*
// @match        *://*.travian.com/*
// @grant        none
// ==/UserScript==

(function bootstrap(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  function resolveEffectiveSpeed(settings, serverSpeed) {
    const speedMap = root.Troops.speeds;

    if (settings.troopType === 'custom') {
      return Number(settings.customSpeed || 14);
    }

    if (settings.troopType === 'hero') {
      return Number(speedMap.hero || 14) * serverSpeed;
    }

    let base = 0;

    for (const tribe of ['romans', 'teutons', 'gauls']) {
      const tribeTable = speedMap[tribe] || {};
      if (Object.prototype.hasOwnProperty.call(tribeTable, settings.troopType)) {
        base = Number(tribeTable[settings.troopType] || 0);
        break;
      }
    }

    if (!base) base = Number(settings.customSpeed || 14);

    return base * serverSpeed;
  }

  async function start() {
    const server = root.Server.getContext();
    const storage = new root.StorageService();
    await storage.init(server.key);

    const settingsStoreName = root.Constants.STORES.SETTINGS;

    const defaultSettings = {
      ...root.Constants.DEFAULT_SETTINGS,
      id: 'main'
    };

    let savedSettings = await storage.get(settingsStoreName, 'main');

    let settings = {
      ...defaultSettings,
      ...(savedSettings || {}),
      id: 'main'
    };

    await storage.put(settingsStoreName, settings);

    function getSettings() {
      const current = {
        ...settings,
        id: 'main'
      };

      return {
        ...current,
        effectiveSpeed: resolveEffectiveSpeed(current, server.speed)
      };
    }

    async function saveSettings(patch) {
      settings = {
        ...settings,
        ...patch,
        id: 'main'
      };

      await storage.put(settingsStoreName, settings);

      console.log('[NytrinA] Configurações salvas:', settings);

      return getSettings();
    }

    let overlay = null;

    const scanner = new root.ScannerService({
      storage,
      getSettings,
      onUpdate: () => {
        if (overlay) {
          overlay.refresh().catch(() => undefined);
        }
      }
    });

    overlay = new root.Overlay({
      storage,
      scanner,
      getSettings,
      saveSettings
    });

    overlay.mount();
    scanner.start();

    global.NytrinA.getSettings = getSettings;
    global.NytrinA.saveSettings = saveSettings;
  }

  start().catch((error) => {
    global.console.error('NytrinA bootstrap error', error);
  });
})(window);