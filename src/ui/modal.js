(function initModal(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  /**
   * @param {string} title
   * @param {string} content
   */
  function show(title, content) {
    const text = title + '\n\n' + content;
    global.alert(text);
  }

  root.Modal = {
    show
  };
})(window);
