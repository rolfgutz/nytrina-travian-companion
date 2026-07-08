(function initMapParser(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});
  const utils = root.Utils;

  /**
   * @param {string} value
   * @returns {string}
   */
  function normalizeMinus(value) {
    return String(value || '').replace(/[−–—]/g, '-');
  }

  /**
   * Fallback regex apenas para extrair um par ja identificado visualmente.
   * @param {string} text
   * @returns {string|null}
   */
  function parseCoordLike(text) {
    const normalized = normalizeMinus(text);
    const match = normalized.match(/[\(\[]\s*([+-]?\d+)\s*\|\s*([+-]?\d+)\s*[\)\]]/);
    if (!match) return null;
    return match[1] + '|' + match[2];
  }

  /**
   * Prioridade 1: coordenada escrita no bloco analisado.
   * @param {Element|null} container
   * @returns {string|null}
   */
  function fromWrittenCoordinate(container) {
    if (!container) return null;
    const directCandidates = container.querySelectorAll('h1,h2,h3,th,td,span,b,strong,a,div');
    for (const element of directCandidates) {
      if (!utils.isVisible(element)) continue;
      const content = normalizeMinus(element.textContent || '');
      const value = parseCoordLike(content);
      if (value) return value;
    }
    const containerValue = parseCoordLike(container.textContent || '');
    return containerValue || null;
  }

  /**
   * Prioridade 2: tooltip/atributos.
   * @param {Element|null} container
   * @returns {string|null}
   */
  function fromTooltip(container) {
    if (!container) return null;
    const tooltipNodes = container.querySelectorAll('[title],[data-tooltip],[aria-label]');
    for (const node of tooltipNodes) {
      const titleValue = parseCoordLike(node.getAttribute('title') || '');
      if (titleValue) return titleValue;
      const tooltipValue = parseCoordLike(node.getAttribute('data-tooltip') || '');
      if (tooltipValue) return tooltipValue;
      const ariaValue = parseCoordLike(node.getAttribute('aria-label') || '');
      if (ariaValue) return ariaValue;
    }
    return null;
  }

  /**
   * Prioridade 3: janela de oasis/box principal.
   * @returns {string|null}
   */
  function fromOasisWindow() {
    const candidates = global.document.querySelectorAll('#content, #map_details, .dialog, .content, .boxTitle, .titleInHeader');
    for (const node of candidates) {
      const value = parseCoordLike(node.textContent || '');
      if (value) return value;
    }
    return null;
  }

  /**
   * Prioridade 4: campos X e Y no mapa.
   * @returns {string|null}
   */
  function fromMapFields() {
    const inputX = global.document.querySelector('input[name="x"], input#x, input[data-name="x"]');
    const inputY = global.document.querySelector('input[name="y"], input#y, input[data-name="y"]');

    const xRaw = normalizeMinus(inputX?.value || '');
    const yRaw = normalizeMinus(inputY?.value || '');

    if (/^[+-]?\d+$/.test(xRaw) && /^[+-]?\d+$/.test(yRaw)) {
      return String(Number(xRaw)) + '|' + String(Number(yRaw));
    }
    return null;
  }

  /**
   * Prioridade 5: URL.
   * @returns {string|null}
   */
  function fromUrl() {
    const params = new URL(global.location.href).searchParams;
    const x = normalizeMinus(params.get('x') || '');
    const y = normalizeMinus(params.get('y') || '');
    if (/^[+-]?\d+$/.test(x) && /^[+-]?\d+$/.test(y)) {
      return String(Number(x)) + '|' + String(Number(y));
    }
    return null;
  }

  /**
   * Resolve coordenada conforme prioridade definida.
   * @param {Element|null} contextElement
   * @returns {{coord:string|null,source:string}}
   */
  function resolveCoordinate(contextElement) {
    const sequence = [
      { source: 'written', fn: () => fromWrittenCoordinate(contextElement) },
      { source: 'tooltip', fn: () => fromTooltip(contextElement) },
      { source: 'oasis-window', fn: () => fromOasisWindow() },
      { source: 'map-fields', fn: () => fromMapFields() },
      { source: 'url', fn: () => fromUrl() }
    ];

    for (const item of sequence) {
      const value = item.fn();
      if (!value || value === '-') continue;
      return { coord: value, source: item.source };
    }

    return { coord: null, source: 'none' };
  }

  root.MapParser = {
    resolveCoordinate,
    parseCoordLike,
    normalizeMinus
  };
})(window);
