(function initBattleKnowledge(global) {
  "use strict";

  const root = (global.NytrinA = global.NytrinA || {});

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function confidenceFromCalibration(calibration) {
    const samples = Number(calibration?.samples || 0);

    if (samples <= 0) {
      return {
        label: "Sem dados",
        stars: 1,
        score: 0,
      };
    }

    const successSamples = Number(calibration?.successSamples || 0);
    const perfectSamples = Number(calibration?.perfectSamples || 0);
    const failureSamples = Number(calibration?.failureSamples || 0);
    const successRate =
      samples > 0 ? clamp(successSamples / samples, 0, 1) : 0;
    const perfectRate =
      samples > 0 ? clamp(perfectSamples / samples, 0, 1) : 0;
    const failureRate =
      samples > 0 ? clamp(failureSamples / samples, 0, 1) : 0;

    const sampleScore = clamp(samples / 15, 0, 1);

    const score =
      sampleScore * 0.45 +
      successRate * 0.3 +
      perfectRate * 0.2 +
      (1 - failureRate) * 0.05;

    const stars = clamp(Math.round(score * 4) + 1, 1, 5);

    let label = "Baixa";
    if (score >= 0.8) {
      label = "Alta";
    } else if (score >= 0.5) {
      label = "Média";
    }

    return {
      label,
      stars,
      score,
    };
  }

  function starsText(stars) {
    const safe = clamp(Math.round(Number(stars || 1)), 1, 5);
    return "★".repeat(safe) + "☆".repeat(5 - safe);
  }

  function confidenceSafetyMultiplier(score) {
    const safeScore = clamp(Number(score || 0), 0, 1);

    // Margem automática para reduzir risco quando a base ainda é incerta.
    if (safeScore < 0.5) return 1.15;
    if (safeScore < 0.8) return 1.08;
    return 1;
  }

  function percentile(sortedValues, p) {
    const list = Array.isArray(sortedValues) ? sortedValues : [];

    if (!list.length) return 1;

    const safeP = clamp(Number(p || 0), 0, 1);
    const idx = Math.max(0, Math.min(list.length - 1, Math.ceil(list.length * safeP) - 1));
    return Number(list[idx] || 1);
  }

  function operationalConfidenceExtraMultiplier(score, sampleCount) {
    const safeScore = clamp(Number(score || 0), 0, 1);
    const samples = Number(sampleCount || 0);

    // Com base ampla, desliga o extra operacional para evitar inflação.
    if (samples >= 20) return 1;

    // Modo operacional: extra aplicado por cima da margem base de confiança.
    if (safeScore < 0.5) return 1.25;
    if (safeScore < 0.8) return 1.12;
    return 1;
  }

  function troopUnitTotalCost(tribe, troopType) {
    const tribeCosts = root.Troops?.costs?.[tribe] || {};
    const match = Object.values(tribeCosts).find(
      (unit) => String(unit?.key || "") === String(troopType || ""),
    );

    if (!match) return 0;

    return (
      Number(match.wood || 0) +
      Number(match.clay || 0) +
      Number(match.iron || 0) +
      Number(match.crop || 0)
    );
  }

  function targetCasualtyRateForTroop(unitCost) {
    const safeUnitCost = Number(unitCost || 0);

    if (safeUnitCost >= 1800) return 0.03;
    if (safeUnitCost >= 1200) return 0.04;
    if (safeUnitCost >= 700) return 0.055;
    return 0.07;
  }

  function preservationMultiplier({
    tribe,
    troopType,
    casualtyRate,
    confidenceScore,
    sampleCount,
  }) {
    const safeCasualtyRate = clamp(Number(casualtyRate || 0), 0, 1);

    if (safeCasualtyRate <= 0) return 1;

    const unitCost = troopUnitTotalCost(tribe, troopType);
    const targetRate = targetCasualtyRateForTroop(unitCost);

    if (safeCasualtyRate <= targetRate) return 1;

    const ratio = safeCasualtyRate / Math.max(targetRate, 0.01);
    const confidenceDampener = Number(sampleCount || 0) >= 20 && Number(confidenceScore || 0) >= 0.8
      ? 0.78
      : Number(sampleCount || 0) >= 10 && Number(confidenceScore || 0) >= 0.5
        ? 0.86
        : 0.92;

    return Math.max(1, Math.pow(ratio, confidenceDampener));
  }

  function preservationMultiplierCap(theoreticalTroops) {
    const troops = Number(theoreticalTroops || 0);

    if (troops <= 40) return 1.35;
    if (troops <= 70) return 1.6;
    if (troops <= 110) return 1.95;
    if (troops <= 170) return 2.35;
    return 2.8;
  }

  function nonClearSafetyMultiplier(killRate, casualtyRate) {
    const safeKillRate = clamp(Number(killRate || 0), 0, 1);
    const safeCasualtyRate = clamp(Number(casualtyRate || 0), 0, 1);

    let baseMultiplier = 1.15;

    if (safeKillRate >= 0.95) {
      baseMultiplier = 1.05;
    } else if (safeKillRate >= 0.85) {
      baseMultiplier = 1.08;
    } else if (safeKillRate >= 0.7) {
      baseMultiplier = 1.12;
    }

    const casualtyMultiplier = 1 + safeCasualtyRate * 1.35;
    return Math.max(baseMultiplier, casualtyMultiplier);
  }

  function normalizeAnimals(animals) {
    const empty = root.Animals.emptyAnimals();

    return {
      ...empty,
      ...(animals || {}),
    };
  }

  function troopClassMapByTribe(tribe) {
    const selected = String(tribe || "romans");

    const map = {
      romans: {
        legionnaire: "u1",
        praetorian: "u2",
        imperian: "u3",
        equites_legati: "u4",
        equites_imperatoris: "u5",
        equites_caesaris: "u6",
      },
      teutons: {
        clubman: "u11",
        spearman: "u12",
        axeman: "u13",
        scout: "u14",
        paladin: "u15",
        teutonic_knight: "u16",
      },
      gauls: {
        phalanx: "u21",
        swordsman: "u22",
        pathfinder: "u23",
        theutates_thunder: "u24",
        druidrider: "u25",
        haeduan: "u26",
      },
    };

    return map[selected] || map.romans;
  }

  function allTroopClassMaps() {
    return {
      romans: troopClassMapByTribe("romans"),
      teutons: troopClassMapByTribe("teutons"),
      gauls: troopClassMapByTribe("gauls"),
    };
  }

  function classInfoByClassToken(troopClass) {
    const token = String(troopClass || "");
    const allMaps = allTroopClassMaps();

    for (const [tribeName, map] of Object.entries(allMaps)) {
      const match = Object.entries(map).find(([, cls]) => String(cls) === token);
      if (match) {
        return {
          tribe: tribeName,
          troopType: match[0],
          troopClass: token,
        };
      }
    }

    return null;
  }

  function inferTroopTypeFromTroopsSent(tribe, troopsSent) {
    const sent = troopsSent && typeof troopsSent === "object" ? troopsSent : {};
    const classMap = troopClassMapByTribe(tribe);

    const classToType = Object.entries(classMap).reduce((acc, [type, cls]) => {
      acc[cls] = type;
      return acc;
    }, {});

    const candidates = Object.entries(sent)
      .filter(([key, value]) => key !== "hero" && Number(value || 0) > 0)
      .map(([key]) => key);

    if (candidates.length !== 1) return null;

    return classToType[candidates[0]] || null;
  }

  function inferTroopInfoFromTroopsSentAnyTribe(troopsSent, preferredTribe) {
    const sent = troopsSent && typeof troopsSent === "object" ? troopsSent : {};
    const candidates = Object.entries(sent)
      .filter(([key, value]) => key !== "hero" && Number(value || 0) > 0)
      .map(([key]) => key);

    if (candidates.length !== 1) return null;

    const troopClass = String(candidates[0] || "");
    const byClass = classInfoByClassToken(troopClass);
    if (byClass) return byClass;

    const tribe = String(preferredTribe || "romans");
    const classMap = troopClassMapByTribe(tribe);
    const byTribe = Object.entries(classMap).find(
      ([, cls]) => String(cls) === troopClass,
    );

    if (!byTribe) return null;

    return {
      troopClass,
      tribe,
      troopType: byTribe[0],
    };
  }

  function resolveTroopTypeAndSent(report) {
    let tribe = report?.tribe || "romans";
    let classMap = troopClassMapByTribe(tribe);
    const troopsSent =
      report?.troopsSent && typeof report.troopsSent === "object"
        ? report.troopsSent
        : {};

    let troopType = String(report?.troopType || "").trim() || null;

    if (!troopType && report?.troopClass) {
      const classInfo = classInfoByClassToken(report.troopClass);
      if (classInfo?.troopType) {
        tribe = classInfo.tribe;
        classMap = troopClassMapByTribe(tribe);
        troopType = classInfo.troopType;
      } else {
        const byClass = Object.entries(classMap).find(
          ([, cls]) => String(cls) === String(report.troopClass),
        );
        troopType = byClass ? byClass[0] : null;
      }
    }

    if (!troopType) {
      const anyInfo = inferTroopInfoFromTroopsSentAnyTribe(troopsSent, tribe);
      if (anyInfo?.troopType) {
        tribe = anyInfo.tribe;
        classMap = troopClassMapByTribe(tribe);
        troopType = anyInfo.troopType;
      } else {
        troopType = inferTroopTypeFromTroopsSent(tribe, troopsSent);
      }
    }

    let sent = Number(report?.troopsSentCount || 0);

    if (sent <= 0 && troopType) {
      const troopClass = classMap[troopType] || null;
      if (troopClass) {
        sent = Number(troopsSent[troopClass] || 0);
      }
    }

    if (sent <= 0 && report?.troopClass) {
      sent = Number(troopsSent[report.troopClass] || 0);
    }

    return {
      tribe,
      troopType,
      sent,
    };
  }

  function makeSignature(xp, animals) {
    const a = normalizeAnimals(animals);

    return [
      Math.round(Number(xp || 0)),
      Number(a.rato || 0),
      Number(a.aranha || 0),
      Number(a.cobra || 0),
      Number(a.morcego || 0),
      Number(a.javali || 0),
      Number(a.lobo || 0),
      Number(a.urso || 0),
      Number(a.crocodilo || 0),
      Number(a.tigre || 0),
      Number(a.elefante || 0),
    ].join("|");
  }

  function knowledgeId(tribe, troopType, xp, animals) {
    return (
      "battleKnowledge:" +
      tribe +
      ":" +
      troopType +
      ":" +
      makeSignature(xp, animals)
    );
  }

  async function getKnowledge(storage, tribe, troopType, xp, animals) {
    const id = knowledgeId(tribe, troopType, xp, animals);

    const saved = await storage.get(root.Constants.STORES.STATISTICS, id);

    const knowledge = saved || {
      id,
      tribe,
      troopType,
      signature: makeSignature(xp, animals),
      xp: Number(xp || 0),
      animals: normalizeAnimals(animals),
      samples: 0,
      minSuccess: 0,
      maxFailure: 0,

      perfectSuccess: 0,
      clearedWithLosses: 0,
      almostCleared: 0,
      partial: 0,
      failures: 0,

      bestKillRate: 0,
      lowestTroopLossRate: null,

      estimatedClear: 0,
      estimatedSafe: 0,

      lastOutcome: null,
      lastBattle: null,
      updatedAt: null,
    };

    // Compatibilidade com conhecimentos gravados pela versão antiga.
    knowledge.samples = Number(knowledge.samples || 0);
    knowledge.minSuccess = Number(knowledge.minSuccess || 0);
    knowledge.maxFailure = Number(knowledge.maxFailure || 0);

    knowledge.perfectSuccess = Number(knowledge.perfectSuccess || 0);
    knowledge.clearedWithLosses = Number(knowledge.clearedWithLosses || 0);
    knowledge.almostCleared = Number(knowledge.almostCleared || 0);
    knowledge.partial = Number(knowledge.partial || 0);
    knowledge.failures = Number(knowledge.failures || 0);

    knowledge.bestKillRate = Number(knowledge.bestKillRate || 0);

    if (knowledge.lowestTroopLossRate === undefined) {
      knowledge.lowestTroopLossRate = null;
    }

    if (knowledge.lastOutcome === undefined) {
      knowledge.lastOutcome = null;
    }

    if (knowledge.lastBattle === undefined) {
      knowledge.lastBattle = null;
    }

    knowledge.estimatedClear = Number(knowledge.estimatedClear || 0);
    knowledge.estimatedSafe = Number(knowledge.estimatedSafe || 0);

    return knowledge;
  }

  async function saveKnowledge(storage, knowledge) {
    knowledge.updatedAt = new Date().toISOString();
    await storage.put(root.Constants.STORES.STATISTICS, knowledge);
    return knowledge;
  }

  async function learnFromReport({ storage, report }) {
    console.log("1 - Entrou no learnFromReport");

    if (!report) {
      console.log("2 - report vazio");
      return null;
    }

    console.log(report);

    const defaultTribe = report.tribe || "romans";
    const resolved = resolveTroopTypeAndSent(report);
    const tribe = resolved.tribe || defaultTribe;
    const troopType = resolved.troopType;
    const sent = Number(resolved.sent || 0);
    const xp = Number(report.xp || 0);
    const animals = report.animalsInitial || report.animalsKilled || {};

    console.log({
      tribe,
      troopType,
      sent,
      xp,
      animals,
    });

    if (!troopType) {
      console.log("PAROU: troopType");
      return null;
    }

    if (!sent) {
      console.log("PAROU: sent");
      return null;
    }

    const cleared = Boolean(report.cleared);
    const killRate = Number(report.killRate || 0);
    const troopLossRate = Number(report.troopLossRate || 0);
    const remaining = Number(report.totalAnimalsRemaining || 0);

    let outcome = "failure";

    if (
      cleared &&
      Number(report.troopsLostCount || 0) === 0 &&
      Number(report.troopsWoundedCount || 0) === 0
    ) {
      outcome = "perfect";
    } else if (cleared) {
      outcome = "cleared_with_losses";
    } else if (killRate >= 0.95) {
      outcome = "almost_cleared";
    } else if (killRate >= 0.7) {
      outcome = "partial";
    }
    let estimatedClear = 0;
    let estimatedSafe = 0;
    const troopCasualtyRate = Number(report.troopCasualtyRate || 0);

    if (!cleared && sent > 0 && killRate > 0) {
      // Estimativa proporcional para atingir 100% de eliminação.
      estimatedClear = Math.ceil(sent / killRate);

      // Considera tanto taxa de abate quanto o peso real das baixas.
      const safetyMultiplier = nonClearSafetyMultiplier(
        killRate,
        troopCasualtyRate,
      );
      estimatedSafe = Math.ceil(estimatedClear * safetyMultiplier);
    } else if (outcome === "cleared_with_losses" && sent > 0) {
      estimatedClear = sent;

      // Se limpou com perdas, sobe a recomendação para priorizar tentativa sem perdas.
      const multiplier = Math.max(1.05, 1 + troopCasualtyRate * 2);
      estimatedSafe = Math.ceil(sent * multiplier);
    } else if (outcome === "perfect" && sent > 0) {
      estimatedClear = sent;
      estimatedSafe = sent;
    }
    console.log("Cleared:", cleared);

    const knowledge = await getKnowledge(
      storage,
      tribe,
      troopType,
      xp,
      animals,
    );

    console.log("Knowledge carregado", knowledge);

    knowledge.samples++;

    knowledge.lastOutcome = outcome;
    knowledge.bestKillRate = Math.max(
      Number(knowledge.bestKillRate || 0),
      killRate,
    );

    if (estimatedClear > 0) {
      knowledge.estimatedClear = estimatedClear;
    }

    if (estimatedSafe > 0) {
      knowledge.estimatedSafe = Math.max(
        Number(knowledge.estimatedSafe || 0),
        estimatedSafe,
      );
    }

    if (
      knowledge.lowestTroopLossRate === null ||
      troopLossRate < Number(knowledge.lowestTroopLossRate)
    ) {
      knowledge.lowestTroopLossRate = troopLossRate;
    }

    if (outcome === "perfect") {
      knowledge.perfectSuccess += 1;

      knowledge.minSuccess =
        knowledge.minSuccess > 0 ? Math.min(knowledge.minSuccess, sent) : sent;
    } else if (outcome === "cleared_with_losses") {
      knowledge.clearedWithLosses += 1;

      knowledge.minSuccess =
        knowledge.minSuccess > 0 ? Math.min(knowledge.minSuccess, sent) : sent;
    } else if (outcome === "almost_cleared") {
      knowledge.almostCleared += 1;

      knowledge.maxFailure = Math.max(Number(knowledge.maxFailure || 0), sent);
    } else if (outcome === "partial") {
      knowledge.partial += 1;

      knowledge.maxFailure = Math.max(Number(knowledge.maxFailure || 0), sent);
    } else {
      knowledge.failures += 1;

      knowledge.maxFailure = Math.max(Number(knowledge.maxFailure || 0), sent);
    }

    knowledge.lastBattle = {
      sent,
      lost: Number(report.troopsLostCount || 0),
      wounded: Number(report.troopsWoundedCount || 0),
      casualties: Number(report.troopsCasualtiesCount || 0),

      remaining,
      killRate,

      troopLossRate: Number(report.troopLossRate || 0),
      troopCasualtyRate: Number(report.troopCasualtyRate || 0),

      estimatedClear,
      estimatedSafe,

      cleared,
      outcome,
      reportId: report.reportId || null,
      date: report.date || new Date().toISOString(),
    };

    const hasHero = Boolean(report.hasHero);
    const troopsCasualtiesCount = Number(report.troopsCasualtiesCount || 0);

    const calibration = await updateCalibration({
      storage,
      tribe,
      troopType,
      hasHero,
      sent,
      killRate,
      cleared,
      troopsLostCount: Number(report.troopsLostCount || 0),
      troopsWoundedCount: Number(report.troopsWoundedCount || 0),
      troopsCasualtiesCount,
      totalAnimalsRemaining: remaining,
    });

    console.log("CALIBRAÇÃO ATUALIZADA", calibration);
    console.log("SALVANDO", knowledge);

    return await saveKnowledge(storage, knowledge);
  }

  function suggestFromKnowledge(knowledge) {
    if (!knowledge) return null;

    const samples = Number(knowledge.samples || 0);
    const last = knowledge.lastBattle || null;
    const minSuccess = Number(knowledge.minSuccess || 0);
    const estimatedSafe = Number(knowledge.estimatedSafe || 0);

    // Já houve uma batalha perfeita.
    if (last && last.outcome === "perfect" && Number(last.sent || 0) > 0) {
      return {
        ok: true,
        source: "knowledge-perfect",
        suggestedTroops: Number(last.sent),
        confidence: samples,
        message: "Quantidade já testada sem mortos e sem enfermaria.",
      };
    }

    // Limpou, mas houve mortos ou feridos.
    if (
      last &&
      last.outcome === "cleared_with_losses" &&
      Number(last.sent || 0) > 0
    ) {
      const casualtyRate = Number(last.troopCasualtyRate || 0);

      // Quanto mais baixas, maior a correção.
      const multiplier = Math.max(1.05, 1 + casualtyRate * 2);

      return {
        ok: true,
        source: "knowledge-cleared-with-losses",
        suggestedTroops: Math.ceil(Number(last.sent) * multiplier),
        confidence: samples,
        message: "Limpou, mas a quantidade foi aumentada para reduzir baixas.",
      };
    }

    // Ataque que não limpou: usa a estimativa proporcional com margem.
    if (estimatedSafe > 0) {
      return {
        ok: true,
        source: "knowledge-estimated",
        suggestedTroops: estimatedSafe,
        confidence: samples,
        message:
          "Estimativa ajustada pelo percentual real de animais eliminados.",
      };
    }

    // Compatibilidade com conhecimentos antigos.
    if (minSuccess > 0) {
      return {
        ok: true,
        source: "knowledge-success",
        suggestedTroops: minSuccess,
        confidence: samples,
        message: "Baseado em uma batalha que limpou o oásis.",
      };
    }

    const maxFailure = Number(knowledge.maxFailure || 0);

    if (maxFailure > 0) {
      return {
        ok: true,
        source: "knowledge-failed",
        suggestedTroops: Math.ceil(maxFailure * 1.15),
        confidence: samples,
        message: "Baseado na maior quantidade que ainda falhou.",
      };
    }

    return null;
  }

  root.BattleKnowledge = {
    makeSignature,
    knowledgeId,
    calibrationId,
    getKnowledge,
    learnFromReport,
    suggestFromKnowledge,

    getCalibration,
    resetCalibration,
    updateCalibration,
    applyCalibration,
    confidenceFromCalibration,
    starsText,
  };

  function calibrationId(tribe, troopType, hasHero) {
    return [
      "battleCalibration",
      tribe || "romans",
      troopType || "unknown",
      hasHero ? "hero" : "nohero",
    ].join(":");
  }

  async function getCalibration(storage, tribe, troopType, hasHero) {
    const id = calibrationId(tribe, troopType, hasHero);

    const saved = await storage.get(root.Constants.STORES.STATISTICS, id);

    const calibration = saved || {
      id,
      tribe,
      troopType,
      hasHero: Boolean(hasHero),
      samples: 0,

      successSamples: 0,
      failureSamples: 0,
      perfectSamples: 0,
      clearedWithLossesSamples: 0,

      sumKillRate: 0,
      sumCasualtyRate: 0,

      minClearTroops: 0,
      minPerfectTroops: 0,
      maxFailedTroops: 0,

      factorSum: 0,
      averageFactor: 1,
      maxFactor: 1,
      factorSamples: [],
      lastOutcome: null,
      lastBattle: null,
      updatedAt: null,
    };

    calibration.samples = Number(calibration.samples || 0);
    calibration.successSamples = Number(calibration.successSamples || 0);
    calibration.failureSamples = Number(calibration.failureSamples || 0);
    calibration.perfectSamples = Number(calibration.perfectSamples || 0);
    calibration.clearedWithLossesSamples = Number(
      calibration.clearedWithLossesSamples || 0,
    );
    calibration.sumKillRate = Number(calibration.sumKillRate || 0);
    calibration.sumCasualtyRate = Number(calibration.sumCasualtyRate || 0);
    calibration.minClearTroops = Number(calibration.minClearTroops || 0);
    calibration.minPerfectTroops = Number(calibration.minPerfectTroops || 0);
    calibration.maxFailedTroops = Number(calibration.maxFailedTroops || 0);
    calibration.factorSum = Number(calibration.factorSum || 0);
    calibration.averageFactor = Number(calibration.averageFactor || 1);
    calibration.maxFactor = Number(calibration.maxFactor || 1);
    calibration.factorSamples = Array.isArray(calibration.factorSamples)
      ? calibration.factorSamples
          .map((value) => Number(value || 0))
          .filter((value) => Number.isFinite(value) && value >= 1)
      : [];
    calibration.hasHero = Boolean(hasHero);

    if (calibration.lastOutcome === undefined) {
      calibration.lastOutcome = null;
    }

    if (calibration.lastBattle === undefined) {
      calibration.lastBattle = null;
    }

    calibration.avgKillRate =
      calibration.samples > 0
        ? calibration.sumKillRate / calibration.samples
        : 0;

    calibration.avgCasualtyRate =
      calibration.samples > 0
        ? calibration.sumCasualtyRate / calibration.samples
        : 0;

    const confidence = confidenceFromCalibration(calibration);
    calibration.confidence = confidence.label;
    calibration.confidenceStars = confidence.stars;

    return calibration;
  }

  async function resetCalibration({
    storage,
    tribe,
    troopType,
    hasHero,
  }) {
    if (!storage || !troopType) return false;

    const id = calibrationId(tribe, troopType, hasHero);
    await storage.delete(root.Constants.STORES.STATISTICS, id);
    return true;
  }

  async function updateCalibration({
    storage,
    tribe,
    troopType,
    hasHero,
    sent,
    killRate,
    cleared,
    troopsLostCount,
    troopsWoundedCount,
    troopsCasualtiesCount,
    totalAnimalsRemaining,
  }) {
    if (!storage || !troopType || sent <= 0 || killRate <= 0) {
      return null;
    }

    const casualties =
      Number(troopsCasualtiesCount || 0) ||
      Number(troopsLostCount || 0) + Number(troopsWoundedCount || 0);

    const casualtyRate = sent > 0 ? casualties / sent : 0;
    const remaining = Number(totalAnimalsRemaining || 0);

    const outcome = cleared
      ? casualties === 0
        ? "perfect"
        : "cleared_with_losses"
      : remaining > 0 && killRate >= 0.95
        ? "almost_cleared"
        : "failure";

    let requiredSafe = sent;

    if (!cleared) {
      const estimatedClear = sent / killRate;

      const margin = nonClearSafetyMultiplier(killRate, casualtyRate);
      requiredSafe = estimatedClear * margin;
    } else {
      if (casualtyRate > 0) {
        requiredSafe = sent * Math.max(1.05, 1 + casualtyRate * 2);
      }
    }

    const factor = Math.max(1, requiredSafe / sent);

    const calibration = await getCalibration(
      storage,
      tribe,
      troopType,
      hasHero,
    );

    calibration.samples += 1;
    calibration.sumKillRate += clamp(killRate, 0, 1);
    calibration.sumCasualtyRate += clamp(casualtyRate, 0, 1);

    if (cleared) {
      calibration.successSamples += 1;

      calibration.minClearTroops =
        calibration.minClearTroops > 0
          ? Math.min(calibration.minClearTroops, sent)
          : sent;

      if (casualties === 0) {
        calibration.perfectSamples += 1;
        calibration.minPerfectTroops =
          calibration.minPerfectTroops > 0
            ? Math.min(calibration.minPerfectTroops, sent)
            : sent;
      } else {
        calibration.clearedWithLossesSamples += 1;
      }
    } else {
      calibration.failureSamples += 1;
      calibration.maxFailedTroops = Math.max(
        Number(calibration.maxFailedTroops || 0),
        sent,
      );
    }

    calibration.factorSum += factor;
    calibration.averageFactor = calibration.factorSum / calibration.samples;
    calibration.maxFactor = Math.max(
      Number(calibration.maxFactor || 1),
      factor,
    );
    calibration.factorSamples.push(factor);
    if (calibration.factorSamples.length > 200) {
      calibration.factorSamples = calibration.factorSamples.slice(-200);
    }
    calibration.lastOutcome = outcome;
    calibration.lastBattle = {
      sent,
      killRate,
      casualties,
      casualtyRate,
      remaining,
      cleared,
      outcome,
      requiredSafe: Math.ceil(requiredSafe),
      date: new Date().toISOString(),
    };
    calibration.avgKillRate = calibration.sumKillRate / calibration.samples;
    calibration.avgCasualtyRate =
      calibration.sumCasualtyRate / calibration.samples;

    const confidence = confidenceFromCalibration(calibration);
    calibration.confidence = confidence.label;
    calibration.confidenceStars = confidence.stars;

    calibration.updatedAt = new Date().toISOString();

    await storage.put(root.Constants.STORES.STATISTICS, calibration);

    return calibration;
  }

  async function applyCalibration({
    storage,
    tribe,
    troopType,
    hasHero,
    theoreticalTroops,
  }) {
    const theoretical = Number(theoreticalTroops || 0);

    if (theoretical <= 0) {
      return {
        troops: 0,
        factor: 1,
        samples: 0,
      };
    }

    const calibration = await getCalibration(
      storage,
      tribe,
      troopType,
      hasHero,
    );

    const sampleCount = Number(calibration.samples || 0);

    if (sampleCount <= 0) {
      return {
        troops: Math.ceil(theoretical),
        factor: 1,
        samples: 0,
        source: "Cálculo teórico",
        confidence: "Sem dados",
        stars: 1,
        starsText: starsText(1),
        basedOn: 0,
        learnedFloor: 0,
      };
    }

    const averageFactor = Number(calibration.averageFactor || 1);
    const sortedFactorSamples = Array.isArray(calibration.factorSamples)
      ? calibration.factorSamples
          .map((value) => Number(value || 0))
          .filter((value) => Number.isFinite(value) && value >= 1)
          .sort((a, b) => a - b)
      : [];

    const percentileP90 = percentile(sortedFactorSamples, 0.9);
    const robustHighFactor = Math.max(averageFactor, percentileP90);

    // Limita quanto o fator alto pode puxar acima da média aprendida.
    const cappedHighFactor = Math.min(
      robustHighFactor,
      Math.max(1.8, averageFactor * 1.65),
    );

    const boundedMaxInfluence = 1 + (Math.max(cappedHighFactor, 1) - 1) * 0.9;
    const maxWeight = clamp((sampleCount - 3) / 10, 0, 1) * 0.35;
    const blendedFactor =
      averageFactor * (1 - maxWeight) + boundedMaxInfluence * maxWeight;
    const learnedFactor = Math.max(1, blendedFactor);

    let learnedFloor = 0;

    if (sampleCount >= 3 && Number(calibration.minPerfectTroops || 0) > 0) {
      learnedFloor = Number(calibration.minPerfectTroops || 0);
    } else if (sampleCount >= 3 && Number(calibration.minClearTroops || 0) > 0) {
      const casualtyBias = clamp(Number(calibration.avgCasualtyRate || 0), 0, 1);
      learnedFloor = Math.ceil(
        Number(calibration.minClearTroops || 0) * Math.max(1.04, 1 + casualtyBias),
      );
    }

    if (sampleCount >= 3 && Number(calibration.maxFailedTroops || 0) > 0) {
      learnedFloor = Math.max(
        Number(learnedFloor || 0),
        Number(calibration.maxFailedTroops || 0) + 1,
      );
    }

    const confidence = confidenceFromCalibration(calibration);
    const factorTroops = Math.ceil(theoretical * learnedFactor);
    const floorCandidate = Number(learnedFloor || 0);

    // Evita "congelar" recomendações em um valor fixo quando o piso aprendido
    // fica muito acima do cálculo atual para o oásis.
    const hardFloorLimit = Math.ceil(factorTroops * 1.35);

    const canUseHardFloor =
      sampleCount >= 6 &&
      confidence.score >= 0.5 &&
      floorCandidate > 0 &&
      floorCandidate <= hardFloorLimit;

    const effectiveFloor = canUseHardFloor ? floorCandidate : 0;
    const baseTroops = Math.max(factorTroops, Math.ceil(effectiveFloor));
    const baseSafetyMultiplier = confidenceSafetyMultiplier(confidence.score);
    const operationalExtraMultiplier = operationalConfidenceExtraMultiplier(
      confidence.score,
      sampleCount,
    );
    const rawPreservationSafetyMultiplier = preservationMultiplier({
      tribe,
      troopType,
      casualtyRate: Number(calibration.avgCasualtyRate || 0),
      confidenceScore: confidence.score,
      sampleCount,
    });
    const preservationSafetyMultiplier = Math.min(
      rawPreservationSafetyMultiplier,
      preservationMultiplierCap(theoretical),
    );
    const safetyMultiplier =
      baseSafetyMultiplier *
      operationalExtraMultiplier *
      preservationSafetyMultiplier;
    const troopsWithSafety = Math.ceil(baseTroops * safetyMultiplier);

    let source = "Cálculo ajustado pelo aprendizado";
    if (confidence.score >= 0.5) {
      source = "IA Aprendida";
    }

    return {
      troops: troopsWithSafety,
      factor: learnedFactor,
      samples: Number(calibration.samples || 0),
      source,
      confidence: confidence.label,
      stars: confidence.stars,
      starsText: starsText(confidence.stars),
      basedOn: Number(calibration.samples || 0),
      learnedFloor: Math.ceil(Number(learnedFloor || 0)),
      learnedFloorApplied: Boolean(canUseHardFloor && learnedFloor > 0),
      confidenceSafetyMultiplier: safetyMultiplier,
      preservationSafetyMultiplier,
    };
  }

  root.BattleLearning = root.BattleKnowledge;
})(window);
