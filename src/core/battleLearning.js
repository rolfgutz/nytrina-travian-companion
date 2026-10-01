(function initBattleKnowledge(global) {
  "use strict";

  const root = (global.NytrinA = global.NytrinA || {});

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function confidenceFromCalibration(calibration) {
    const confidence = confidenceFromKnowledge({
      samples: calibration?.samples,
      perfectSuccess: calibration?.perfectSamples,
      clearedWithLosses: calibration?.clearedWithLossesSamples,
    });
    return {
      label: confidence.label,
      stars: confidence.stars,
      score: confidence.score,
      clearRate: confidence.clearRate,
      lowerBound: confidence.lowerBound,
    };
  }

  function confidenceFromKnowledge(knowledge) {
    const samples = Math.max(0, Number(knowledge?.samples || 0));
    const perfect = Math.max(0, Number(knowledge?.perfectSuccess || 0));
    const clearedWithLosses = Math.max(0, Number(knowledge?.clearedWithLosses || 0));
    const successes = Math.min(samples, perfect + clearedWithLosses);
    const clearRate = samples > 0 ? successes / samples : 0;
    const perfectRate = samples > 0 ? perfect / samples : 0;

    if (!samples) {
      return {
        label: "Sem dados",
        stars: 0,
        starsText: "☆☆☆☆☆",
        clearRate: 0,
        perfectRate: 0,
        lowerBound: 0,
        score: 0,
        samples: 0,
      };
    }

    const z = 1.96;
    const zSquared = z * z;
    const denominator = 1 + zSquared / samples;
    const center = clearRate + zSquared / (2 * samples);
    const spread = z * Math.sqrt(
      (clearRate * (1 - clearRate) + zSquared / (4 * samples)) / samples,
    );
    const lowerBound = clamp((center - spread) / denominator, 0, 1);
    const score = lowerBound * clamp(samples / 20, 0, 1);

    let label = "Baixa";
    if (samples >= 20 && lowerBound >= 0.8) {
      label = "Alta";
    } else if (samples >= 8 && lowerBound >= 0.6) {
      label = "Média";
    } else if (samples < 3) {
      label = "Muito baixa";
    }

    const stars = clamp(Math.round(score * 4) + 1, 1, 5);
    return {
      label,
      stars,
      starsText: starsText(stars),
      clearRate,
      perfectRate,
      lowerBound,
      score,
      samples,
    };
  }

  function starsText(stars) {
    const safe = clamp(Math.round(Number(stars || 1)), 1, 5);
    return "★".repeat(safe) + "☆".repeat(5 - safe);
  }

  function percentile(sortedValues, p) {
    const list = Array.isArray(sortedValues) ? sortedValues : [];

    if (!list.length) return 1;

    const safeP = clamp(Number(p || 0), 0, 1);
    const idx = Math.max(0, Math.min(list.length - 1, Math.ceil(list.length * safeP) - 1));
    return Number(list[idx] || 1);
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
    if (troopType === "hero" || troopType === "custom") {
      troopType = null;
    }

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

    if (troopType === "hero" || troopType === "custom") {
      troopType = inferTroopInfoFromTroopsSentAnyTribe(troopsSent, tribe)?.troopType || null;
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

  function knowledgeId(tribe, troopType, xp, animals, hasHero = false) {
    return (
      "battleKnowledge:" +
      tribe +
      ":" +
      troopType +
      ":" +
      (hasHero ? "hero" : "nohero") +
      ":" +
      makeSignature(xp, animals)
    );
  }

  function legacyKnowledgeId(tribe, troopType, xp, animals) {
    return "battleKnowledge:" + tribe + ":" + troopType + ":" + makeSignature(xp, animals);
  }

  async function getKnowledge(storage, tribe, troopType, xp, animals, hasHero = false) {
    const id = knowledgeId(tribe, troopType, xp, animals, hasHero);

    const scopedSaved = await storage.get(root.Constants.STORES.STATISTICS, id);
    const legacySaved = scopedSaved
      ? null
      : await storage.get(
          root.Constants.STORES.STATISTICS,
          legacyKnowledgeId(tribe, troopType, xp, animals),
        );
    const legacyHasHero = Boolean(
      legacySaved?.hasHero ?? legacySaved?.lastBattle?.hasHero,
    );
    const saved =
      scopedSaved ||
      (legacySaved && legacyHasHero === Boolean(hasHero) ? legacySaved : null);

    const knowledge = saved || {
      id,
      tribe,
      troopType,
      hasHero: Boolean(hasHero),
      signature: makeSignature(xp, animals),
      xp: Number(xp || 0),
      animals: normalizeAnimals(animals),
      learnedReportIds: [],
      observations: [],
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
    knowledge.id = id;
    knowledge.hasHero = Boolean(hasHero);
    knowledge.learnedReportIds = Array.isArray(knowledge.learnedReportIds)
      ? knowledge.learnedReportIds.map(String)
      : [];
    knowledge.observations = Array.isArray(knowledge.observations)
      ? knowledge.observations
      : [];
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

  function observationFromReport(report) {
    if (!report) return null;
    const resolved = resolveTroopTypeAndSent(report);
    const sent = Number(report.troopsSentCount || resolved.sent || 0);
    if (sent <= 0) return null;

    const cleared = Boolean(report.cleared);
    const killRate = Number(report.killRate || 0);
    const remaining = Number(report.totalAnimalsRemaining || 0);
    const troopCasualtyRate = Number(report.troopCasualtyRate || 0);
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

    // Troops needed scale with the attack/defense ratio, not linearly with
    // killRate (killRate approaches 100% far faster than the troops needed
    // to actually finish the job - see RATIO_TARGETS in battleAdvisor.js).
    // sent/killRate systematically undersells how many troops are required,
    // which is why old suggestions cleared as little as 5% of real oases.
    const attack = root.BattleAdvisor?.attackInfo(resolved.troopType || report.troopType);
    const animalsForDefense = report.animalsInitial || report.animalsKilled || {};
    const defense = attack
      ? root.BattleAdvisor.calcAnimalDefense(animalsForDefense, attack.cavalry)
      : 0;
    const actualRatio = attack?.attack && defense > 0 ? (sent * attack.attack) / defense : 0;
    const targets = root.BattleAdvisor?.RATIO_TARGETS || { economic: 4, balanced: 9, safe: 40 };

    let estimatedClear = 0;
    let estimatedSafe = 0;

    if (attack?.attack && defense > 0) {
      estimatedClear = root.BattleAdvisor.troopsForRatio(defense, attack.attack, targets.balanced);
      estimatedSafe = root.BattleAdvisor.troopsForRatio(defense, attack.attack, targets.safe);

      if (!cleared && actualRatio > 0) {
        // This exact composition failed at this ratio: raise the bar for it
        // directly, with a 15% margin, instead of trusting the global target.
        if (actualRatio >= targets.safe) estimatedSafe = Math.max(estimatedSafe, Math.ceil(sent * 1.15));
        if (actualRatio >= targets.balanced) estimatedClear = Math.max(estimatedClear, Math.ceil(sent * 1.15));
      } else if (cleared && actualRatio > 0) {
        // Direct proof a lower ratio was enough for this exact composition.
        if (actualRatio < targets.safe) estimatedSafe = Math.min(estimatedSafe, Math.ceil(sent * 1.05));
        if (actualRatio < targets.balanced) estimatedClear = Math.min(estimatedClear, Math.ceil(sent * 1.05));
      }

      // Cleared but with casualties: keep a floor that also accounts for
      // reducing troop losses, not just finishing off the animals.
      if (cleared && troopCasualtyRate > 0) {
        const casualtyFloor = Math.ceil(sent * Math.max(1.05, 1 + troopCasualtyRate * 2));
        estimatedSafe = Math.max(estimatedSafe, casualtyFloor);
      }
    } else if (cleared) {
      estimatedClear = sent;
      estimatedSafe = sent;
    }

    return {
      reportId: String(report.reportId || ""),
      sent,
      estimatedClear,
      estimatedSafe,
      cleared,
      outcome,
      hasHero: Boolean(report.hasHero),
      remaining,
      killRate,
      date: report.date || new Date().toISOString(),
    };
  }

  async function learnFromReport({ storage, report }) {
    if (!report) {
      return null;
    }

    const reportId = String(report.reportId || '');
    if (!reportId) return null;
    const processedEvent = await storage.get(
      root.Constants.STORES.LEARNING_EVENTS,
      reportId,
    );
    if (processedEvent) return null;

    const defaultTribe = report.tribe || "romans";
    const resolved = resolveTroopTypeAndSent(report);
    const tribe = resolved.tribe || defaultTribe;
    const troopType = resolved.troopType;
    const sent = Number(resolved.sent || 0);
    const xp = Number(report.xp || 0);
    const animals = report.animalsInitial || report.animalsKilled || {};
    const hasHero = Boolean(report.hasHero);
    const sentUnitTypes = Object.entries(report.troopsSent || {}).filter(
      ([key, quantity]) => key !== "hero" && Number(quantity || 0) > 0,
    );

    if (!troopType) {
      return null;
    }

    const theoreticalAdvice = root.BattleAdvisor?.recommend({ animals, troopType });
    if (!theoreticalAdvice?.ok) return null;

    const attackInfo = root.BattleAdvisor.attackInfo(troopType);
    const actualRatio =
      attackInfo?.attack && theoreticalAdvice.defense > 0
        ? (sent * attackInfo.attack) / theoreticalAdvice.defense
        : 0;

    if (!sent) {
      return null;
    }

    if (sentUnitTypes.length > 1) {
      return null;
    }

    const observation = observationFromReport(report);
    if (!observation) return null;
    const { cleared, killRate, remaining, outcome, estimatedClear, estimatedSafe } = observation;
    const troopLossRate = Number(report.troopLossRate || 0);

    const knowledge = await getKnowledge(
      storage,
      tribe,
      troopType,
      xp,
      animals,
      hasHero,
    );
    knowledge.observations = Array.isArray(knowledge.observations)
      ? knowledge.observations
      : [];

    knowledge.learnedReportIds = Array.isArray(knowledge.learnedReportIds)
      ? knowledge.learnedReportIds.map(String)
      : [];
    if (knowledge.learnedReportIds.includes(reportId)) {
      await updateCalibration({
        storage,
        tribe,
        troopType,
        hasHero,
        reportId,
        actualRatio,
        sent,
        killRate,
        cleared,
        troopsLostCount: Number(report.troopsLostCount || 0),
        troopsWoundedCount: Number(report.troopsWoundedCount || 0),
        troopsCasualtiesCount: Number(report.troopsCasualtiesCount || 0),
        totalAnimalsRemaining: remaining,
        totalResources: Number(report.totalResources || 0),
        lossCost: Number(report.lossCost || 0),
        profit: Number(report.profit || 0),
        date: report.date || null,
      });
      await storage.put(root.Constants.STORES.LEARNING_EVENTS, {
        id: reportId,
        reportId,
        tribe,
        troopType,
        hasHero,
        source: 'report-import',
        learnedAt: report.date || new Date().toISOString(),
      });
      return knowledge;
    }

    knowledge.samples++;
    if (estimatedSafe > 0) {
      knowledge.observations.push(observation);
      if (knowledge.observations.length > 200) {
        knowledge.observations = knowledge.observations.slice(-200);
      }
    }

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
      hasHero,

      troopLossRate: Number(report.troopLossRate || 0),
      troopCasualtyRate: Number(report.troopCasualtyRate || 0),

      estimatedClear,
      estimatedSafe,

      cleared,
      outcome,
      reportId: report.reportId || null,
      reportSeq: Number(report.reportSeq || 0) || null,
      date: report.date || new Date().toISOString(),
    };
    knowledge.learnedReportIds.push(reportId);

    const troopsCasualtiesCount = Number(report.troopsCasualtiesCount || 0);

    await updateCalibration({
      storage,
      tribe,
      troopType,
      hasHero,
      reportId,
      actualRatio,
      sent,
      killRate,
      cleared,
      troopsLostCount: Number(report.troopsLostCount || 0),
      troopsWoundedCount: Number(report.troopsWoundedCount || 0),
      troopsCasualtiesCount,
      totalAnimalsRemaining: remaining,
      totalResources: Number(report.totalResources || 0),
      lossCost: Number(report.lossCost || 0),
      profit: Number(report.profit || 0),
      date: report.date || null,
    });

    const savedKnowledge = await saveKnowledge(storage, knowledge);
    await storage.put(root.Constants.STORES.LEARNING_EVENTS, {
      id: reportId,
      reportId,
      tribe,
      troopType,
      hasHero,
      source: 'report-import',
      learnedAt: report.date || new Date().toISOString(),
    });
    return savedKnowledge;
  }

  function suggestFromKnowledge(knowledge, goal = "safe") {
    if (!knowledge) return null;

    const normalizedGoal = ["safe", "balanced", "economic"].includes(goal)
      ? goal
      : "safe";
    const knowledgeConfidence = confidenceFromKnowledge(knowledge);
    const knowledgeTargetMet =
      knowledgeConfidence.samples >= 20 &&
      Number(knowledgeConfidence.lowerBound || 0) >= 0.95;
    if (normalizedGoal === "safe" && !knowledgeTargetMet) {
      return null;
    }
    const samples = Number(knowledge.samples || 0);
    const last = knowledge.lastBattle || null;
    const minSuccess = Number(knowledge.minSuccess || 0);
    const estimatedSafe = Number(knowledge.estimatedSafe || 0);
    const observations = Array.isArray(knowledge.observations)
      ? knowledge.observations
      : [];
    const profileHeroMode = Boolean(knowledge.hasHero);
    const matchingObservations = observations.filter(
      (observation) =>
        Boolean(observation?.hasHero ?? profileHeroMode) === profileHeroMode,
    );
    const empiricalValues = matchingObservations
      .map((observation) => Number(
        normalizedGoal === "economic"
          ? observation?.estimatedClear
          : observation?.estimatedSafe,
      ))
      .filter((value) => Number.isFinite(value) && value > 0)
      .sort((a, b) => a - b);

    if (empiricalValues.length) {
      const quantile =
        normalizedGoal === "economic" ? 0.5 : normalizedGoal === "balanced" ? 0.75 : 0.99;
      return {
        ok: true,
        source: "knowledge-empirical-p" + Math.round(quantile * 100),
        suggestedTroops: Math.ceil(percentile(empiricalValues, quantile)),
        confidence: samples,
        message: "Estimativa baseada no quantil dos resultados deste perfil.",
      };
    }

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
      const multiplier =
        normalizedGoal === "safe"
          ? Math.max(1.05, 1 + casualtyRate * 2)
          : normalizedGoal === "balanced"
            ? 1.1
            : 1;

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
      const estimatedClear = Number(knowledge.estimatedClear || 0);
      const suggestedTroops =
        normalizedGoal === "safe" || !estimatedClear
          ? estimatedSafe
          : normalizedGoal === "balanced"
            ? Math.ceil(estimatedClear * 1.25)
            : estimatedClear;
      return {
        ok: true,
        source: "knowledge-estimated",
        suggestedTroops,
        confidence: samples,
        message:
          normalizedGoal === "safe"
            ? "Estimativa conservadora ajustada pelos resultados observados."
            : "Estimativa ajustada ao objetivo selecionado e aos resultados observados.",
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
    confidenceFromKnowledge,
    observationFromReport,
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
      learnedReportIds: [],

      successSamples: 0,
      failureSamples: 0,
      perfectSamples: 0,
      clearedWithLossesSamples: 0,

      sumKillRate: 0,
      sumCasualtyRate: 0,
      sumResources: 0,
      sumLosses: 0,
      sumProfit: 0,
      negativeProfitSamples: 0,

      minClearTroops: 0,
      minPerfectTroops: 0,
      maxFailedTroops: 0,

      // Highest attack/defense ratio that still failed to fully clear, and
      // lowest ratio proven to clear, for this troop/tribe/hero profile.
      // Used to raise (never lower) the global RATIO_TARGETS when real
      // reports show this profile needs more than the global model assumes.
      maxFailRatio: 0,
      minClearRatio: 0,

      lastOutcome: null,
      lastBattle: null,
      updatedAt: null,
    };

    calibration.samples = Number(calibration.samples || 0);
    calibration.learnedReportIds = Array.isArray(calibration.learnedReportIds)
      ? calibration.learnedReportIds.map(String)
      : [];
    calibration.successSamples = Number(calibration.successSamples || 0);
    calibration.failureSamples = Number(calibration.failureSamples || 0);
    calibration.perfectSamples = Number(calibration.perfectSamples || 0);
    calibration.clearedWithLossesSamples = Number(
      calibration.clearedWithLossesSamples || 0,
    );
    calibration.sumKillRate = Number(calibration.sumKillRate || 0);
    calibration.sumCasualtyRate = Number(calibration.sumCasualtyRate || 0);
    calibration.sumResources = Number(calibration.sumResources || 0);
    calibration.sumLosses = Number(calibration.sumLosses || 0);
    calibration.sumProfit = Number(calibration.sumProfit || 0);
    calibration.negativeProfitSamples = Number(
      calibration.negativeProfitSamples || 0,
    );
    calibration.minClearTroops = Number(calibration.minClearTroops || 0);
    calibration.minPerfectTroops = Number(calibration.minPerfectTroops || 0);
    calibration.maxFailedTroops = Number(calibration.maxFailedTroops || 0);
    calibration.maxFailRatio = Number(calibration.maxFailRatio || 0);
    calibration.minClearRatio = Number(calibration.minClearRatio || 0);
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
    const events = await storage.getAll(root.Constants.STORES.LEARNING_EVENTS);
    for (const event of events) {
      if (
        String(event?.tribe || "") === String(tribe || "romans") &&
        String(event?.troopType || "") === String(troopType) &&
        Boolean(event?.hasHero) === Boolean(hasHero)
      ) {
        await storage.delete(root.Constants.STORES.LEARNING_EVENTS, event.id);
      }
    }
    return true;
  }

  async function updateCalibration({
    storage,
    tribe,
    troopType,
    hasHero,
    reportId,
    actualRatio,
    sent,
    killRate,
    cleared,
    troopsLostCount,
    troopsWoundedCount,
    troopsCasualtiesCount,
    totalAnimalsRemaining,
    totalResources,
    lossCost,
    profit,
    date,
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

    const ratio = Number(actualRatio || 0);
    const requiredSafe = cleared
      ? sent
      : ratio > 0
        ? Math.ceil(sent * ((Number(root.BattleAdvisor?.RATIO_TARGETS?.safe || 40)) / ratio))
        : sent;

    const calibration = await getCalibration(
      storage,
      tribe,
      troopType,
      hasHero,
    );
    calibration.learnedReportIds = Array.isArray(calibration.learnedReportIds)
      ? calibration.learnedReportIds.map(String)
      : [];
    if (reportId && calibration.learnedReportIds.includes(String(reportId))) {
      return calibration;
    }

    calibration.samples += 1;
    calibration.sumKillRate += clamp(killRate, 0, 1);
    calibration.sumCasualtyRate += clamp(casualtyRate, 0, 1);
    calibration.sumResources += Number(totalResources || 0);
    calibration.sumLosses += Number(lossCost || 0);
    calibration.sumProfit += Number(profit || 0);

    if (Number(profit || 0) < 0) {
      calibration.negativeProfitSamples += 1;
    }

    if (cleared) {
      calibration.successSamples += 1;

      calibration.minClearTroops =
        calibration.minClearTroops > 0
          ? Math.min(calibration.minClearTroops, sent)
          : sent;

      if (ratio > 0) {
        calibration.minClearRatio =
          calibration.minClearRatio > 0
            ? Math.min(calibration.minClearRatio, ratio)
            : ratio;
      }

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

      if (ratio > 0) {
        calibration.maxFailRatio = Math.max(Number(calibration.maxFailRatio || 0), ratio);
      }
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
      ratio,
      reportId: reportId || null,
      totalResources: Number(totalResources || 0),
      lossCost: Number(lossCost || 0),
      profit: Number(profit || 0),
      requiredSafe: Math.ceil(requiredSafe),
      date: date || new Date().toISOString(),
    };
    calibration.avgKillRate = calibration.sumKillRate / calibration.samples;
    calibration.avgCasualtyRate =
      calibration.sumCasualtyRate / calibration.samples;

    const confidence = confidenceFromCalibration(calibration);
    calibration.confidence = confidence.label;
    calibration.confidenceStars = confidence.stars;

    calibration.updatedAt = new Date().toISOString();
    if (reportId) calibration.learnedReportIds.push(String(reportId));

    await storage.put(root.Constants.STORES.STATISTICS, calibration);

    return calibration;
  }

  async function applyCalibration({
    storage,
    tribe,
    troopType,
    hasHero,
    defense,
    attack,
    theoreticalTroops,
    goal = "safe",
  }) {
    const normalizedGoal = ["safe", "balanced", "economic"].includes(goal)
      ? goal
      : "safe";
    const ratioTargets = root.BattleAdvisor?.RATIO_TARGETS || {
      economic: 4,
      balanced: 9,
      safe: 40,
    };
    const baseRatio = ratioTargets[normalizedGoal];
    const safeDefense = Number(defense || 0);
    const safeAttack = Number(attack || 0);
    const theoretical = Number(theoreticalTroops || 0);

    if (safeDefense <= 0 || safeAttack <= 0) {
      if (theoretical <= 0) {
        return { troops: 0, factor: 1, samples: 0 };
      }
      // Fallback for call sites that can't provide raw defense/attack yet:
      // scale the given theoretical (economic-ratio) baseline proportionally.
      const fallbackTroops = Math.ceil(theoretical * (baseRatio / ratioTargets.economic));
      return {
        troops: fallbackTroops,
        factor: baseRatio / ratioTargets.economic,
        samples: 0,
        source: "Cálculo teórico (razão ataque/defesa)",
        confidence: "Sem dados",
        stars: 1,
        starsText: starsText(1),
        basedOn: 0,
        goal: normalizedGoal,
      };
    }

    const calibration = await getCalibration(storage, tribe, troopType, hasHero);
    const sampleCount = Number(calibration.samples || 0);

    // Real reports for this troop/tribe/hero profile can only ever raise the
    // ratio target (never lower it below the data-grounded global default),
    // with a 15% margin above the hardest failure actually observed.
    const maxFailRatio = Number(calibration.maxFailRatio || 0);
    const effectiveRatio =
      maxFailRatio > 0 && maxFailRatio * 1.15 > baseRatio
        ? maxFailRatio * 1.15
        : baseRatio;

    const troops = root.BattleAdvisor.troopsForRatio(safeDefense, safeAttack, effectiveRatio);
    const confidence = confidenceFromCalibration(calibration);
    const confidenceTargetMet =
      sampleCount >= 20 && Number(confidence.lowerBound || 0) >= 0.95;

    const source =
      effectiveRatio > baseRatio
        ? "Razão ataque/defesa ajustada por falha real observada"
        : sampleCount > 0
          ? "Razão ataque/defesa (dados do export) + histórico deste perfil"
          : "Razão ataque/defesa (dados do export)";

    return {
      troops,
      factor: effectiveRatio / ratioTargets.economic,
      ratio: effectiveRatio,
      samples: sampleCount,
      source,
      confidence: sampleCount > 0 ? confidence.label : "Sem dados",
      stars: sampleCount > 0 ? confidence.stars : 1,
      starsText: starsText(sampleCount > 0 ? confidence.stars : 1),
      basedOn: sampleCount,
      confidenceTarget: 0.95,
      confidenceTargetMet,
      goal: normalizedGoal,
      economicRoi:
        Number(calibration.sumLosses || 0) > 0
          ? Number(calibration.sumProfit || 0) /
            Number(calibration.sumLosses || 1)
          : 0,
      reportId: calibration.lastBattle?.reportId || null,
      reportSeq: Number(calibration.lastBattle?.reportSeq || 0) || null,
      successSamples: Number(calibration.successSamples || 0),
      perfectSamples: Number(calibration.perfectSamples || 0),
      failureSamples: Number(calibration.failureSamples || 0),
    };
  }
})(window);
