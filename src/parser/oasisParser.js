(function initOasisParser(global) {
  'use strict';

  const root = (global.NytrinA = global.NytrinA || {});
  const animalsData = root.Animals;
  const utils = root.Utils;
  const mapParser = root.MapParser;
  const server = root.Server;

  const ANIMAL_SELECTOR = animalsData.list.map((animal) => '[class*="' + animal.iconClass + '"]').join(',');

  /**
   * @returns {Array<Element>}
   */
  function findCandidateRoots() {
    const icons = Array.from(global.document.querySelectorAll(ANIMAL_SELECTOR));
    const roots = new Set();

    icons.forEach((icon) => {
      if (icon.closest('#nytrina-overlay')) return;
      let rootElement = icon;
      for (let i = 0; i < 5 && rootElement?.parentElement; i += 1) {
        rootElement = rootElement.parentElement;
      }
      if (rootElement && utils.isVisible(rootElement)) {
        roots.add(rootElement);
      }
    });

    const scoreRoot = (rootElement) => {
      const text = utils.normalizeText(rootElement?.textContent || "");
      let score = 0;

      if (/oasis\s+desocupado|oasis\s+abandonado/.test(text)) score += 8;
      if (/simular\s+raid/.test(text)) score += 6;
      if (/relatorios|vizinhanca/.test(text)) score += 5;
      if (/bonus|distancia|tropas/.test(text)) score += 3;

      if (rootElement?.closest(".dialog, #content, .contentNavi, .content")) {
        score += 4;
      }

      const textLength = String(rootElement?.textContent || "").trim().length;
      if (textLength >= 120) score += 2;

      return score;
    };

    return Array.from(roots).sort((a, b) => scoreRoot(b) - scoreRoot(a));
  }

  /**
   * @param {Element} icon
   * @returns {number}
   */
  function readNearNumber(icon) {
    let parent = icon;
    for (let depth = 0; depth < 3 && parent; depth += 1) {
      const row = parent.closest('tr');
      if (row) {
        const cells = Array.from(row.querySelectorAll('td,th'));
        for (const cell of cells) {
          if (cell.contains(icon)) continue;
          const value = utils.toInt(cell.textContent || '');
          if (value > 0) return value;
        }
      }
      parent = parent.parentElement;
    }

    const siblings = Array.from(icon.parentElement?.children || []);
    for (const sibling of siblings) {
      if (sibling === icon) continue;
      const value = utils.toInt(sibling.textContent || '');
      if (value > 0) return value;
    }

    return 0;
  }

  /**
   * @param {Element} rootElement
   * @returns {Record<string, number>}
   */
  function parseAnimalsByIcons(rootElement) {
    const counts = animalsData.emptyAnimals();
    const icons = Array.from(rootElement.querySelectorAll(ANIMAL_SELECTOR));

    icons.forEach((icon) => {
      const token = utils
        .classTokens(icon)
        .find((className) => /^u(3[1-9]|40)$/.test(className));
      if (!token) return;
      const key = animalsData.byIconClass[token];
      if (!key) return;

      const quantity = readNearNumber(icon);
      counts[key] = Math.max(counts[key], quantity);
    });

    return counts;
  }

  /**
   * @param {Element} rootElement
   * @returns {number}
   */
  function parseDistanceValue(text) {
    const source = String(text || '').trim();
    if (!source) return 0;

    // Captura valor logo após rótulo de distância quando possível.
    const nearDistance = source.match(/dist[aâ]ncia\D*([+-]?\d+(?:[.,]\d+)?)/i);
    const rawValue = nearDistance ? nearDistance[1] : source.match(/[+-]?\d+(?:[.,]\d+)?/)?.[0] || '';
    if (!rawValue) return 0;

    let parsed = Number(String(rawValue).replace(',', '.'));
    if (!Number.isFinite(parsed) || parsed <= 0) return 0;

    // Quando o parser captura texto concatenado, o número vem inflado; normaliza para faixa plausível.
    while (parsed > 1500 && parsed >= 10) {
      parsed /= 10;
    }

    return Number(parsed.toFixed(2));
  }

  /**
   * @param {Element} rootElement
   * @returns {number}
   */
  function parseDistance(rootElement) {
    const candidates = rootElement.querySelectorAll('td,th,span,b,strong');
    for (const node of candidates) {
      const raw = String(node.textContent || '').trim();
      if (!raw || raw.length > 80) continue;
      const text = utils.normalizeText(raw);
      if (!text.includes('distancia')) continue;
      const number = parseDistanceValue(raw);
      if (number > 0) return number;
    }

    for (const node of candidates) {
      const raw = String(node.textContent || '').trim();
      if (!raw || raw.length > 80) continue;
      if (!/(campos?|dist)/i.test(raw)) continue;
      const number = parseDistanceValue(raw);
      if (number > 0) return number;
    }

    return 0;
  }

  /**
   * @param {Element} rootElement
   * @returns {string}
   */
  function parseBonus(rootElement) {
    const tokens = [];
    const text = utils.normalizeText(rootElement.textContent || '');

    ['madeira', 'barro', 'ferro', 'cereal'].forEach((resource) => {
      if (!text.includes(resource)) return;
      if (text.includes('50%')) tokens.push(resource + ' 50%');
      else if (text.includes('25%')) tokens.push(resource + ' 25%');
    });

    return tokens.length ? tokens.join(' + ') : '-';
  }

  /**
   * @param {number} distance
   * @param {number} speed
   * @param {boolean} smallMap
   * @returns {{travelSeconds:number,cycleSeconds:number,xph:number,time:string,cycleTime:string}}
   */
  function computeTime(distance, speed, smallMap) {
    if (!distance || !speed) {
      return {
        travelSeconds: 0,
        cycleSeconds: 0,
        xph: 0,
        time: '-',
        cycleTime: '-'
      };
    }

    const oneWay = (distance / speed) * 3600;
    const returnTime = smallMap ? oneWay / 2 : oneWay;
    const cycleSeconds = oneWay + returnTime;
    return {
      travelSeconds: oneWay,
      cycleSeconds,
      xph: 0,
      time: utils.secondsToClock(oneWay),
      cycleTime: utils.secondsToClock(cycleSeconds)
    };
  }

  /**
   * @param {{speed:number,smallMap:boolean}} options
   * @returns {{server:string,coord:string|null,distance:number,bonus:string,animals:Record<string,number>,totalAnimals:number,xp:number,xph:number,time:string,scanDate:string,source:string}|null}
   */
  function parse(options) {
    const roots = findCandidateRoots();
    if (!roots.length) return null;

    const rootElement = roots[0];
    const animals = parseAnimalsByIcons(rootElement);
    const totalAnimals = Object.values(animals).reduce((sum, value) => sum + value, 0);
    if (!totalAnimals) return null;

    const coordInfo = mapParser.resolveCoordinate(rootElement);
    const distance = parseDistance(rootElement);
    const bonus = parseBonus(rootElement);
    const xp = animalsData.calcXp(animals);

    const timeInfo = computeTime(distance, options.speed, options.smallMap);
    const xph = timeInfo.cycleSeconds ? xp / (timeInfo.cycleSeconds / 3600) : 0;

    return {
      server: server.getContext().key,
      coord: coordInfo.coord,
      distance,
      bonus,
      animals,
      totalAnimals,
      xp,
      xph,
      time: timeInfo.time,
      scanDate: new Date().toISOString()
    };
  }

  root.OasisParser = {
    parse
  };
})(window);
