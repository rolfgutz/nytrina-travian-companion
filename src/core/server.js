(function initServer(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  /**
   * @returns {{host:string,speed:number,key:string}}
   */
  function getServerContext() {
    const host = String(global.location.hostname || '').toLowerCase();
    const speedMatch = host.match(/\.x(\d+)\./);
    const speed = speedMatch ? Number(speedMatch[1]) : 1;
    return {
      host,
      speed,
      key: host
    };
  }

  root.Server = {
    getContext: getServerContext
  };
})(window);
