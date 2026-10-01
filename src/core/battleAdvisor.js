(function initBattleAdvisor(global) {
  "use strict";

  const root = (global.NytrinA = global.NytrinA || {});

  // Travian nature defense values: [vs infantry, vs cavalry].
  const ANIMAL_DEFENSE = {
    rato: [25, 20],
    aranha: [35, 40],
    cobra: [40, 60],
    morcego: [66, 50],
    javali: [70, 33],
    lobo: [80, 70],
    urso: [140, 200],
    crocodilo: [380, 240],
    tigre: [170, 250],
    elefante: [440, 520],
  };

  const TROOP_ATTACK = {
    legionnaire: { attack: 40, cavalry: false },
    praetorian: { attack: 30, cavalry: false },
    imperian: { attack: 70, cavalry: false },
    equites_legati: { attack: 0, cavalry: true },
    equites_imperatoris: { attack: 120, cavalry: true },
    equites_caesaris: { attack: 180, cavalry: true },
    ram: { attack: 60, cavalry: false },
    fire_catapult: { attack: 75, cavalry: false },
    clubman: { attack: 40, cavalry: false },
    spearman: { attack: 10, cavalry: false },
    axeman: { attack: 60, cavalry: false },
    scout: { attack: 0, cavalry: true },
    paladin: { attack: 55, cavalry: true },
    teutonic_knight: { attack: 150, cavalry: true },
    phalanx: { attack: 15, cavalry: false },
    swordsman: { attack: 65, cavalry: false },
    pathfinder: { attack: 0, cavalry: true },
    theutates_thunder: { attack: 90, cavalry: true },
    druidrider: { attack: 45, cavalry: true },
    haeduan: { attack: 140, cavalry: true },
  };

  function calcAnimalDefense(animals, cavalry) {
    const index = cavalry ? 1 : 0;
    return Object.entries(animals || {}).reduce((sum, [key, qty]) => {
      return sum + Number(qty || 0) * Number(ANIMAL_DEFENSE[key]?.[index] || 0);
    }, 0);
  }

  function attackInfo(troopType) {
    return TROOP_ATTACK[troopType] || null;
  }

  function troopsForRatio(defense, attack, ratio) {
    if (!(defense > 0) || !(attack > 0) || !(ratio > 0)) return 0;
    return Math.max(1, Math.ceil((defense * ratio) / attack));
  }

  // Empirical model derived from 163 real farming reports (export of
  // Sep/2026, ts31.x3). A logistic regression of "did it fully clear" on
  // ln(attackPower/defensePower) gave slope=3.14 / intercept=-8.42, and a
  // separate regression of the continuous kill rate gave slope=2.04 /
  // intercept=0.115. The previous formula (defense/attack with a flat 1.8x
  // margin, ratio ~2.4) only reaches ~85-90% average kill rate, which is why
  // "safe" suggestions actually cleared as little as 5% of real oases with
  // dozens of failed reports. These ratio targets replace that broken model:
  //   economic: ratio for ~95% average kill rate (good loot, low troop cost)
  //   balanced: ratio for ~99% average kill rate
  //   safe:     covers the worst observed failures (max ratio that still
  //             failed to fully clear in the dataset was ~18) with margin,
  //             consistent with a ~95-97% probability of a full clear.
  const RATIO_TARGETS = {
    economic: 4,
    balanced: 9,
    safe: 40,
  };

  function recommend({ animals, troopType }) {
    const troop = TROOP_ATTACK[troopType] || null;
    const attack = Number(troop?.attack || 0);
    const cavalry = Boolean(troop?.cavalry);
    const defense = calcAnimalDefense(animals, cavalry);

    if (!defense || !attack) {
      return {
        ok: false,
        message: troop && !attack
          ? "Tropa de reconhecimento não ataca oásis."
          : "Sem dados suficientes para recomendar.",
      };
    }

    const economicTroops = troopsForRatio(defense, attack, RATIO_TARGETS.economic);
    const balancedTroops = troopsForRatio(defense, attack, RATIO_TARGETS.balanced);
    const safeTroops = troopsForRatio(defense, attack, RATIO_TARGETS.safe);

    // Hero's own attack is negligible against typical farming-scale animal
    // defense (verified against real reports: no measurable shift in the
    // kill-rate curve), so the same targets apply with or without hero.
    const scenario = {
      minTroops: economicTroops,
      safeTroops,
      profitTroops: balancedTroops,
    };

    return {
      ok: true,
      defense,
      attack,
      cavalry,
      ratioTargets: RATIO_TARGETS,
      economicTroops,
      balancedTroops,
      safeTroops,
      withHero: scenario,
      withoutHero: scenario,
    };
  }

  root.BattleAdvisor = {
    recommend,
    calcAnimalDefense,
    attackInfo,
    troopsForRatio,
    RATIO_TARGETS,
  };
})(window);
