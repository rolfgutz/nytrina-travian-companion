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

    function calc(hero) {
      const heroBonus = hero ? 500 : 0;
      const adjustedDefense = Math.max(defense - heroBonus, defense * 0.35);
      const minTroops = Math.max(1, Math.ceil(adjustedDefense / attack));
      const safeTroops = Math.max(1, Math.ceil(minTroops * 1.8));
      const profitTroops = Math.max(1, Math.ceil(minTroops * 1.25));

      return { minTroops, safeTroops, profitTroops };
    }

    return {
      ok: true,
      defense,
      attack,
      cavalry,
      withHero: calc(true),
      withoutHero: calc(false),
    };
  }

  root.BattleAdvisor = {
    recommend,
    calcAnimalDefense,
  };
})(window);
