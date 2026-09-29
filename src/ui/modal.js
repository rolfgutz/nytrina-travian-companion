(function initModal(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});

  function toastContainer() {
    let container = global.document.getElementById('nytrina-toasts');
    if (!container) {
      container = global.document.createElement('div');
      container.id = 'nytrina-toasts';
      global.document.body.appendChild(container);
    }
    return container;
  }

  /**
   * @param {string} title
   * @param {string} content
   */
  function show(title, content) {
    const isError = /erro/i.test(String(title || ''));
    const toast = global.document.createElement('div');
    toast.className = 'nytrina-toast' + (isError ? ' nytrina-toast-error' : '');

    const heading = global.document.createElement('b');
    heading.textContent = String(title || '');
    const body = global.document.createElement('div');
    body.textContent = String(content || '');

    toast.append(heading, body);
    toast.title = 'Clique para fechar';
    toast.addEventListener('click', () => toast.remove());
    toastContainer().appendChild(toast);
    global.setTimeout(() => toast.remove(), isError ? 12000 : 6000);
  }

  root.Modal = {
    show
  };
})(window);
