(function initBattleKnowledge(global) {
  "use strict";

  const root = (global.NytrinA = global.NytrinA || {});

  function normalizeAnimals(animals) {
    const empty = root.Animals.emptyAnimals();

    return {
      ...empty,
      ...(animals || {}),
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

    const tribe = report.tribe || "romans";
    const troopType = report.troopType || null;
    const sent = Number(report.troopsSentCount || 0);
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

    if (!cleared && sent > 0 && killRate > 0) {
      // Estimativa proporcional para atingir 100% de eliminação.
      estimatedClear = Math.ceil(sent / killRate);

      // Quanto menor a taxa de eliminação, maior a margem necessária.
      let safetyMultiplier = 1.15;

      if (killRate >= 0.95) {
        safetyMultiplier = 1.05;
      } else if (killRate >= 0.85) {
        safetyMultiplier = 1.08;
      } else if (killRate >= 0.7) {
        safetyMultiplier = 1.12;
      }

      estimatedSafe = Math.ceil(estimatedClear * safetyMultiplier);
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
    getKnowledge,
    learnFromReport,
    suggestFromKnowledge,

    getCalibration,
    updateCalibration,
    applyCalibration,
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
      factorSum: 0,
      averageFactor: 1,
      maxFactor: 1,
      updatedAt: null,
    };

    calibration.samples = Number(calibration.samples || 0);
    calibration.factorSum = Number(calibration.factorSum || 0);
    calibration.averageFactor = Number(calibration.averageFactor || 1);
    calibration.maxFactor = Number(calibration.maxFactor || 1);
    calibration.hasHero = Boolean(hasHero);

    return calibration;
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
  }) {
    if (!storage || !troopType || sent <= 0 || killRate <= 0) {
      return null;
    }

    let requiredSafe = sent;

    if (!cleared) {
      const estimatedClear = sent / killRate;

      let margin = 1.15;

      if (killRate >= 0.95) {
        margin = 1.05;
      } else if (killRate >= 0.85) {
        margin = 1.1;
      } else if (killRate >= 0.7) {
        margin = 1.15;
      } else {
        margin = 1.25;
      }

      requiredSafe = estimatedClear * margin;
    } else {
      const casualties =
        Number(troopsLostCount || 0) + Number(troopsWoundedCount || 0);

      const casualtyRate = casualties / sent;

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
    calibration.factorSum += factor;
    calibration.averageFactor = calibration.factorSum / calibration.samples;
    calibration.maxFactor = Math.max(
      Number(calibration.maxFactor || 1),
      factor,
    );
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

    if (Number(calibration.samples || 0) <= 0) {
      return {
        troops: Math.ceil(theoretical),
        factor: 1,
        samples: 0,
      };
    }

    /*
     * Usamos o maior entre a média e 90% do maior fator observado.
     * Isso evita ficar agressivo demais depois de uma batalha ruim.
     */
    const learnedFactor =
      Math.max(
        Number(calibration.averageFactor || 1),
        Number(calibration.maxFactor || 1),
      ) * 1.0;

    return {
      troops: Math.ceil(theoretical * learnedFactor),
      factor: learnedFactor,
      samples: Number(calibration.samples || 0),
    };
  }

  root.BattleLearning = root.BattleKnowledge;
})(window);
