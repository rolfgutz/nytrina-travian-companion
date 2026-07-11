(function initBattleAdvisor(global) {
  "use strict";

  const root = (global.NytrinA = global.NytrinA || {});

  const ANIMAL_DEFENSE = {
    rato: 25,
    aranha: 35,
    cobra: 40,
    morcego: 66,
    javali: 70,
    lobo: 80,
    urso: 140,
    crocodilo: 380,
    tigre: 170,
    elefante: 440,
  };

  const TROOP_ATTACK = {
    legionnaire: 40,
    imperian: 70,
    equites_imperatoris: 120,
    equites_caesaris: 180,
    clubman: 40,
    paladin: 55,
    teutonic_knight: 150,
    theutates_thunder: 90,
    haeduan: 140,
  };

  function calcAnimalDefense(animals) {
    return Object.entries(animals || {}).reduce((sum, [key, qty]) => {
      return sum + Number(qty || 0) * Number(ANIMAL_DEFENSE[key] || 0);
    }, 0);
  }

  function recommend({ animals, troopType }) {
    const defense = calcAnimalDefense(animals);
    const attack = Number(TROOP_ATTACK[troopType] || 0);

    if (!defense || !attack) {
      return { ok: false, message: "Sem dados suficientes para recomendar." };
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
      withHero: calc(true),
      withoutHero: calc(false),
    };
  }

  root.BattleAdvisor = {
    recommend,
    calcAnimalDefense,
  };
})(window);
