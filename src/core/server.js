(function initServer(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});
  const getRegion = root.Servers.getRegion;

  /**
   * @returns {{host:string,region:string,speed:number,key:string}}
   */
  function getServerContext() {
    const host = String(global.location.hostname || '').toLowerCase();
    const speedMatch = host.match(/\.x(\d+)\./);
    const speed = speedMatch ? Number(speedMatch[1]) : 1;
    return {
      host,
      region: getRegion(host),
      speed,
      key: host
    };
  }

  root.Server = {
    getContext: getServerContext
  };
})(window);
