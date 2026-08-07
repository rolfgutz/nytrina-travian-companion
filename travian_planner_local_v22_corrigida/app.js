
const DEFAULT_STEPS = [["Dia 1", 1, "Enviar herói para aventura mais próxima", "Herói", "Pegar cavalo/XP inicial. Marcar opção de não mostrar ajuda."], ["Dia 1", 2, "Um recurso de cada para nível 2", "Recursos", "Base inicial de produção."], ["Dia 1", 3, "Armazém nível 1", "Construção", "Evita travar por limite de recursos."], ["Dia 1", 4, "Celeiro nível 1", "Construção", "Evita travar por cereal."], ["Dia 1", 5, "Embaixada nível 1", "Construção", "Necessária no rush e pontos de cultura."], ["Dia 1", 6, "Esconderijo nível 3", "Defesa", "Proteção inicial."], ["Dia 1", 7, "Edifício Principal nível 3", "Construção", "Acelera construção."], ["Dia 1", 8, "Muralha nível 3", "Defesa", "Pode ajudar com missão/XP herói."], ["Dia 1", 9, "Mercado nível 3", "Economia", "Ajuda gestão de recursos."], ["Dia 1", 10, "Todos os campos de cereal nível 2", "Recursos", "Produção base."], ["Dia 1", 11, "Todos os campos de barro nível 2", "Recursos", "Produção base."], ["Dia 1", 12, "Todos os campos de madeira nível 2", "Recursos", "Produção base."], ["Dia 1", 13, "Todos os campos de ferro nível 2", "Recursos", "Produção base."], ["Dia 1", 14, "1 campo de cereal nível 4", "Recursos", "Puxar produção e missões."], ["Dia 1", 15, "1 campo de barro nível 4", "Recursos", "Puxar produção."], ["Dia 1", 16, "1 campo de madeira nível 4", "Recursos", "Puxar produção."], ["Dia 1", 17, "1 campo de ferro nível 4", "Recursos", "Puxar produção."], ["Dia 1", 18, "Quartel nível 1", "Militar", "Libera tropas."], ["Dia 1", 19, "Edifício Principal nível 7", "Construção", "Preparação para acelerar rush."], ["Dia 1", 20, "Armazém nível 3", "Construção", "Capacidade."], ["Dia 1", 21, "Celeiro nível 3", "Construção", "Capacidade."], ["Dia 1", 22, "Todos os campos de barro nível 3", "Recursos", "Produção."], ["Dia 1", 23, "Todos os campos de madeira nível 3", "Recursos", "Produção."], ["Dia 1", 24, "Todos os campos de ferro nível 3", "Recursos", "Produção."], ["Dia 1", 25, "1 campo de cereal nível 3", "Recursos", "Garantir cereal para seguir."], ["Dia 1", 26, "Quartel nível 3", "Militar", "Importante se for produzir infantaria/farm."], ["Dia 1", 27, "Academia nível 1", "Militar", "Pré-requisito."], ["Dia 1", 28, "Todos os campos de cereal nível 3", "Recursos", "Produção."], ["Dia 1", 29, "Esconderijo nível 10", "Defesa", "Proteção."], ["Dia 1", 30, "Mercado nível 7", "Economia", "Gestão forte de recursos."], ["Dia 1", 31, "8 esconderijos nível 3", "Defesa", "Seguir apenas se necessário."], ["Dia 1", 32, "Ferraria nível 1", "Militar", "Pré-requisito."], ["Dia 1", 33, "Edifício Principal nível 8", "Construção", "Preparação."], ["Dia 1", 34, "Academia nível 2", "Militar", "Preparação."], ["Dia 1", 35, "Residência nível 1", "Colonização", "Começo do caminho para colonos."], ["Dia 1", 36, "Todos os recursos nível 4", "Recursos", "Barro, madeira, ferro e cereal."], ["Dia 1", 37, "Edifício Principal nível 10", "Construção", "Acelera muito o restante."], ["Dia 1", 38, "Embaixada nível 3", "Cultura", "PC e pré-requisitos."], ["Dia 1", 39, "Academia nível 3", "Militar", "Preparação."], ["Dia 1", 40, "Edifício Principal nível 12", "Construção", "Aceleração."], ["Dia 1", 41, "Academia nível 10", "Colonização", "Pré-requisito chave."], ["Dia 1", 42, "Oficina nível 1", "Construção", "Pré-requisito da Casa do Povo."], ["Dia 1", 43, "Casa do Povo nível 1", "Cultura", "Libera celebrações."], ["Dia 1", 44, "1 campo de cereal nível 5", "Recursos", "Ajuda produção."], ["Dia 1", 45, "8 esconderijos nível 7", "Defesa", "Opcional/defensivo."], ["Dia 1", 46, "Embaixada nível 5", "Cultura", "PC."], ["Dia 1", 47, "1 campo de cereal nível 5", "Recursos", "Reforço de cereal."], ["Dia 1", 48, "Todos os campos de barro nível 5", "Recursos", "Produção forte."], ["Dia 1", 49, "Resto dos campos de cereal nível 5", "Recursos", "Produção."], ["Dia 1", 50, "Todos os campos de madeira nível 5", "Recursos", "Produção."], ["Dia 1", 51, "Todos os campos de ferro nível 5", "Recursos", "Produção."], ["Dia 1", 52, "Armazém nível 8", "Construção", "Capacidade para custos altos."], ["Dia 1", 53, "1ª festa", "Cultura", "Pode ser antes/depois conforme recursos."], ["Dia 1", 54, "Mercado nível 12", "Economia", "Gestão de recursos."], ["Dia 1", 55, "Celeiro nível 7", "Construção", "Capacidade."], ["Dia 2", 56, "Embaixada nível 9", "Cultura", "PC."], ["Dia 2", 57, "Residência nível 7", "Colonização", "Desbloqueia meta de habitantes."], ["Dia 2", 58, "Muralha nível 7", "Defesa", "Opcional, só se precisar de XP/objetivo."], ["Dia 2", 59, "Residência nível 8", "Colonização", "Rumo ao nível 10."], ["Dia 2", 60, "2ª festa ou 1ª festa se for estratégia de 3", "Cultura", "Por volta de 41h-43h."], ["Dia 3", 61, "Residência nível 10", "Colonização", "Libera colonizadores."], ["Dia 3", 62, "Treinar 1º colono", "Colonização", "Não parar fila dos colonos."], ["Dia 3", 63, "3ª festa ou 2ª festa se for estratégia de 3", "Cultura", "Ajustar conforme PC."], ["Dia 4", 64, "Treinar 2 colonos restantes", "Colonização", "Completar 3 colonos."], ["Dia 4", 65, "4ª festa ou 3ª festa", "Cultura", "Fechar PC se faltar."], ["Dia 4", 66, "Fundar 2ª aldeia", "Colonização", "Meta: 90h a 110h."]];
const DAILY_TASKS = [
    { desc: "Vê um vídeo no browser", pts: 1, max: 3 },
    { desc: "Vê um vídeo na aplicação móvel", pts: 1, max: 3 },
    { desc: "Contribui com 1000 recursos para bónus da aliança", pts: 1, max: 6 },
    { desc: "Completa uma aventura", pts: 5, max: 1 },
    { desc: "Raid num oásis livre", pts: 3, max: 3 },
    { desc: "Raid/ataque uma aldeia Natar", pts: 3, max: 3 },
    { desc: "Ganha um leilão", pts: 5, max: 1 },
    { desc: "Ganha ou gasta ouro", pts: 2, max: 3 },
    { desc: "Melhora um edifício", pts: 4, max: 3 },
    { desc: "Melhora um campo de recursos", pts: 5, max: 3 },
    { desc: "Faz 20 soldados de infantaria", pts: 3, max: 3 },
    { desc: "Faz 20 soldados de cavalaria", pts: 3, max: 3 },
    { desc: "Realiza uma celebração", pts: 5, max: 1 }
];
const REWARD_ROTATION = [["Amanhã até 05:00", "50 PC", "+25% ferro", "5 jaulas", "400 XP herói"], ["31/05/2026 05:00", "1000 recursos aleatórios", "+25% cereais", "1 aventura adicional", "4000 recursos de cada tipo"], ["01/06/2026 05:00", "200 recursos de cada tipo", "1 dia Conta Plus", "5 poções de cura", "400 PC"], ["02/06/2026 05:00", "50 XP herói", "+25% madeira", "5 tábuas da lei", "20000 recursos aleatórios"], ["03/06/2026 05:00", "-", "+25% barro", "5 pensos rápidos", "-"]];

const STORAGE_KEY = "travian_planner_v1";

let state = loadState();

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  return {
    activeVillageId: "aldeia-1",
    villages: [
      {
        id: "aldeia-1",
        name: "Aldeia 1",
        tribe: "Romanos",
        serverSpeed: "3x",
        createdAt: new Date().toISOString(),
        notes: "",
        resources: { madeira: 0, barro: 0, ferro: 0, cereal: 0 },
        culture: { current: 0, needed: 2000 },
        hero: { level: 1, health: 100, mode: "Combate", offPoints: 0 },
        completedSteps: {},
        dailyProgress: {}
      }
    ]
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function activeVillage() {
  return state.villages.find(v => v.id === state.activeVillageId) || state.villages[0];
}

function $(id) { return document.getElementById(id); }

function render() {
  renderVillageTabs();
  renderDashboard();
  renderSteps();
  renderDaily();
  renderRewards();
  renderDashboardExtras();
  saveState();
}

function renderVillageTabs() {
  const wrap = $("villageTabs");
  if (!wrap) return;

  wrap.innerHTML = "";
  state.villages.forEach(v => {
    const btn = document.createElement("button");
    btn.className = "tab" + (v.id === state.activeVillageId ? " active" : "");
    btn.textContent = v.name;
    btn.onclick = () => setActiveVillage(v.id);
    wrap.appendChild(btn);
  });
}

function setActiveVillage(villageId) {
  state.activeVillageId = villageId;
  render();
}

function completionPercent(v) {
  const total = DEFAULT_STEPS.length;
  const done = Object.values(v.completedSteps || {}).filter(Boolean).length;
  return Math.round((done / total) * 100);
}

function dailyPoints(v) {
  let total = 0;

  // Compatibilidade: versão antiga usava checkbox dailyCompleted.
  // Versão nova usa quantidade 0/max em dailyProgress.
  const progress = v.dailyProgress || {};
  const completed = v.dailyCompleted || {};

  DAILY_TASKS.forEach((task, idx) => {
    let qtd = Number(progress[idx] || 0);

    if (!qtd && completed[idx]) {
      qtd = task.max || 1;
    }

    total += qtd * task.pts;
  });

  return Math.min(total, 100);
}

function renderDashboard() {
  const v = activeVillage();
  $("villageName").value = v.name;
  $("tribe").value = v.tribe;
  $("speed").value = v.serverSpeed;
  $("heroLevel").value = v.hero.level;
  $("heroHealth").value = v.hero.health;
  $("heroMode").value = v.hero.mode;
  $("offPoints").value = v.hero.offPoints;
  $("pcCurrent").value = v.culture.current;
  $("pcNeeded").value = v.culture.needed;
  $("notes").value = v.notes || "";

  $("progressText").textContent = completionPercent(v) + "%";
  $("progressBar").style.width = completionPercent(v) + "%";

  const pts = dailyPoints(v);
  $("dailyPoints").textContent = pts;
  $("dailyGoal").textContent = pts >= 100 ? "100 atingido" : `faltam ${100 - pts}`;
  const scoreEl = $("diariasScore");
  const barEl = $("diariasBar");
  const sidePoints = $("dailyPointsSide");
  const sideGoal = $("dailyGoalSide");

  if (scoreEl) scoreEl.textContent = `${pts} / 100 Pontos`;
  if (barEl) barEl.style.width = `${pts}%`;
  if (sidePoints) sidePoints.textContent = pts;
  if (sideGoal) sideGoal.textContent = pts >= 100 ? "Meta diária completa" : `Faltam ${100 - pts} pontos`;
}

function updateVillageField() {
  const v = activeVillage();
  v.name = $("villageName").value || v.name;
  v.tribe = $("tribe").value;
  v.serverSpeed = $("speed").value;
  v.hero.level = Number($("heroLevel").value || 1);
  v.hero.health = Number($("heroHealth").value || 0);
  v.hero.mode = $("heroMode").value;
  v.hero.offPoints = Number($("offPoints").value || 0);
  v.culture.current = Number($("pcCurrent").value || 0);
  v.culture.needed = Number($("pcNeeded").value || 2000);
  v.notes = $("notes").value;
  render();
}

function renderSteps() {
  const v = activeVillage();
  const tbody = $("stepsBody");
  const filter = $("stepFilter").value;
  tbody.innerHTML = "";
  DEFAULT_STEPS.filter(s => filter === "Todos" || s[0] === filter).forEach(s => {
    const [day, number, action, category, note] = s;
    const tr = document.createElement("tr");
    const checked = !!v.completedSteps[number];
    tr.className = "step-row" + (checked ? " done" : "");
    tr.dataset.stepNumber = number;
    tr.onclick = (ev) => {
      if (ev.target.tagName.toLowerCase() === "input") return;
      toggleStepFromRow(number);
    };

    tr.innerHTML = `
      <td><input class="big-step-check" type="checkbox" ${checked ? "checked" : ""} onclick="event.stopPropagation()" onchange="toggleStep(${number}, this.checked)"></td>
      <td>${number}</td>
      <td>${day}</td>
      <td><strong>${action}</strong><br><span>${note}</span></td>
      <td><span class="pill">${category}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function toggleStep(number, checked) {
  activeVillage().completedSteps[number] = checked;
  render();
}

function renderDaily() {
  const v = activeVillage();
  if (!v.dailyProgress) v.dailyProgress = {};

  const tbody = $("dailyBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  DAILY_TASKS.forEach((task, idx) => {
    let atual = Number(v.dailyProgress[idx] || 0);

    // Compatibilidade com save antigo de checkbox.
    if (!atual && v.dailyCompleted && v.dailyCompleted[idx]) {
      atual = task.max || 1;
      v.dailyProgress[idx] = atual;
    }

    const tr = document.createElement("tr");
    const options = Array.from({ length: task.max + 1 }, (_, i) =>
      `<option value="${i}" ${i === atual ? "selected" : ""}>${i}/${task.max}</option>`
    ).join("");

    tr.innerHTML = `
      <td><strong>${task.desc}</strong></td>
      <td class="text-center"><strong>+${task.pts}</strong></td>
      <td class="text-center">
        <select onchange="atualizarPontosDiaria(${idx}, this.value)">
          ${options}
        </select>
      </td>
    `;

    if (atual >= task.max) tr.classList.add("done");
    tbody.appendChild(tr);
  });
}

function atualizarPontosDiaria(idx, valor) {
  const v = activeVillage();
  if (!v.dailyProgress) v.dailyProgress = {};
  v.dailyProgress[idx] = parseInt(valor || 0);
  render();
}

function toggleDaily(idx, checked) {
  // Mantido só para compatibilidade com versões antigas do HTML.
  const v = activeVillage();
  if (!v.dailyProgress) v.dailyProgress = {};
  v.dailyProgress[idx] = checked ? (DAILY_TASKS[idx].max || 1) : 0;
  render();
}

function renderRewards() {
  const tbody = $("rewardsBody");
  tbody.innerHTML = "";
  REWARD_ROTATION.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td>`;
    tbody.appendChild(tr);
  });
}

function addVillage() {
  const n = state.villages.length + 1;
  const id = "aldeia-" + Date.now();
  state.villages.push({
    id,
    name: "Aldeia " + n,
    tribe: activeVillage().tribe,
    serverSpeed: activeVillage().serverSpeed,
    createdAt: new Date().toISOString(),
    notes: "",
    resources: { madeira: 0, barro: 0, ferro: 0, cereal: 0 },
    culture: { current: 0, needed: 2000 },
    hero: { level: 1, health: 100, mode: "Recursos", offPoints: 0 },
    completedSteps: {},
    dailyProgress: {}
  });
  state.activeVillageId = id;
  render();
}

function resetDaily() {
  activeVillage().dailyProgress = {};
  render();
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "travian-planner-save.json";
  a.click();
}

function importJson(ev) {
  const file = ev.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);

      if (!imported || !Array.isArray(imported.villages)) {
        alert("Arquivo inválido: não encontrei a lista de aldeias.");
        return;
      }

      state = imported;

      if (!state.activeVillageId && state.villages[0]) {
        state.activeVillageId = state.villages[0].id;
      }

      render();
      saveState();
      alert("Save importado com sucesso.");
    } catch (e) {
      alert("Não consegui importar esse JSON. Verifique se o arquivo está correto.");
    }
  };
  reader.readAsText(file);
}

function hardReset() {
  if(confirm("Apagar tudo salvo neste navegador?")) {
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    render();
  }
}



function showTab(tabName, btn) {
  document.querySelectorAll(".tab-page").forEach(el => el.classList.remove("active"));
  const target = document.getElementById("tab-" + tabName);
  if (target) target.classList.add("active");

  document.querySelectorAll(".menu-item").forEach(el => el.classList.remove("active"));
  if (btn) btn.classList.add("active");

  render();
  if (typeof calcularHeroiUI === "function") calcularHeroiUI();
}

function renderMirrorVillageTabs() {
  const wrap = document.getElementById("villageTabsAldeias");
  if (!wrap) return;

  wrap.innerHTML = "";
  state.villages.forEach(v => {
    const btn = document.createElement("button");
    btn.className = "tab" + (v.id === state.activeVillageId ? " active" : "");
    btn.textContent = v.name;
    btn.onclick = () => setActiveVillage(v.id);
    wrap.appendChild(btn);
  });
}

function renderNextStepBox() {
  const box = document.getElementById("nextStepBox");
  if (!box) return;

  const v = activeVillage();
  const done = v.completedSteps || {};

  const pendentes = DEFAULT_STEPS
    .filter(s => done[s[1]] !== true)
    .sort((a, b) => a[1] - b[1]);

  if (!pendentes.length) {
    box.innerHTML = `<strong>Guia completo.</strong><p>Você concluiu todos os passos principais até a fundação.</p>`;
    return;
  }

  const primeira = pendentes[0];
  const proximas = pendentes.slice(1, 8);

  box.innerHTML = `
    <div class="pending-main">
      <span class="pill">${primeira[0]} • ${primeira[3]}</span>
      <h3>#${primeira[1]} — ${primeira[2]}</h3>
      <p>${primeira[4]}</p>
    </div>

    <strong>Depois, ainda falta:</strong>
    <ol class="pending-list">
      ${proximas.map(s => `<li><button class="pending-jump" onclick="goToStep(${s[1]})">#${s[1]} — ${s[2]}</button></li>`).join("")}
    </ol>

    <p class="hint">${pendentes.length} etapa(s) pendente(s) no total. A lista respeita a ordem original do guia.</p>
  `;
}

function goToStep(stepNumber) {
  showTab("aldeias", document.querySelector('[onclick*="showTab(\'aldeias\'"]'));
  setTimeout(() => {
    const row = document.querySelector(`[data-step-number="${stepNumber}"]`);
    if (row) {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
      row.classList.add("highlight-step");
      setTimeout(() => row.classList.remove("highlight-step"), 1800);
    }
  }, 80);
}

function renderDashboardExtras() {
  const v = activeVillage();

  const dashHeroLevel = document.getElementById("dashHeroLevel");
  const dashHeroMode = document.getElementById("dashHeroMode");
  const dashPc = document.getElementById("dashPc");
  const dashVillageName = document.getElementById("dashVillageName");
  const dashVillageMeta = document.getElementById("dashVillageMeta");

  if (dashVillageName) dashVillageName.textContent = v.name || "Sem nome";
  if (dashVillageMeta) dashVillageMeta.textContent = `${v.tribe || "-"} • ${v.serverSpeed || "-"} servidor`;

  if (dashHeroLevel) dashHeroLevel.textContent = `Nível ${v.hero.level}`;
  if (dashHeroMode) dashHeroMode.textContent = `${v.hero.mode} • ${v.hero.health}% vida`;
  if (dashPc) dashPc.textContent = `${Number(v.culture.current || 0).toLocaleString("pt-BR")} / ${Number(v.culture.needed || 0).toLocaleString("pt-BR")}`;

  const fAtual = document.getElementById("fundPcAtual");
  const fNec = document.getElementById("fundPcNecessario");
  const fFalta = document.getElementById("fundPcFaltando");

  if (fAtual) fAtual.textContent = Number(v.culture.current || 0).toLocaleString("pt-BR");
  if (fNec) fNec.textContent = Number(v.culture.needed || 0).toLocaleString("pt-BR");
  if (fFalta) fFalta.textContent = Math.max(0, Number(v.culture.needed || 0) - Number(v.culture.current || 0)).toLocaleString("pt-BR");

  renderMirrorVillageTabs();
  renderNextStepBox();
  syncRenameFields();
}




function renameActiveVillage(newName) {
  const v = activeVillage();
  const name = (newName || "").trim();

  if (!name) return;

  v.name = name;

  const configName = document.getElementById("villageName");
  if (configName && configName.value !== name) configName.value = name;

  saveState();
  render();
}

function syncRenameFields() {
  const v = activeVillage();
  const ids = ["renameVillageDashboard", "renameVillageAldeias"];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.value !== v.name) el.value = v.name;
  });
}

function toggleStepFromRow(number) {
  const v = activeVillage();
  if (!v.completedSteps) v.completedSteps = {};
  v.completedSteps[number] = !v.completedSteps[number];
  render();
}



const ATAQUE_ROMANOS_BASE = {
  legionario: { nome: "Legionário", ataque: 40 },
  pretoriano: { nome: "Pretoriano", ataque: 30 },
  imperiano: { nome: "Imperiano", ataque: 70 },
  equitesLegati: { nome: "Equites Legati", ataque: 0 },
  equitesImperatoris: { nome: "Equites Imperatoris", ataque: 120 },
  equitesCaesaris: { nome: "Equites Caesaris", ataque: 180 },
  ariete: { nome: "Aríete", ataque: 60 },
  catapulta: { nome: "Catapulta de Fogo", ataque: 75 }
};

function getNumInput(id) {
  return Number((document.getElementById(id)?.value || 0).toString().replace(",", ".")) || 0;
}

function calcularFerreiroUI() {
  const nivel = getNumInput("ferreiroNivel");
  const pctNivel = getNumInput("ferreiroPctNivel");
  const bonus = (nivel * pctNivel) / 100;

  const bonusInput = document.getElementById("ferreiroBonusTotal");
  if (bonusInput) bonusInput.value = `${(bonus * 100).toFixed(1).replace(".", ",")}%`;

  const tropas = [
    { key: "legionario", qtd: getNumInput("armyLegionario") },
    { key: "pretoriano", qtd: getNumInput("armyPretoriano") },
    { key: "imperiano", qtd: getNumInput("armyImperiano") },
    { key: "equitesLegati", qtd: getNumInput("armyEL") },
    { key: "equitesImperatoris", qtd: getNumInput("armyEI") },
    { key: "equitesCaesaris", qtd: getNumInput("armyEC") },
    { key: "ariete", qtd: getNumInput("armyAriete") },
    { key: "catapulta", qtd: getNumInput("armyCatapulta") }
  ];

  let ataqueBase = 0;
  let linhas = "";

  tropas.forEach(t => {
    const info = ATAQUE_ROMANOS_BASE[t.key];
    const base = t.qtd * info.ataque;
    const melhorado = base * (1 + bonus);
    ataqueBase += base;

    if (t.qtd > 0) {
      linhas += `
        <tr>
          <td>${info.nome}</td>
          <td>${t.qtd.toLocaleString("pt-BR")}</td>
          <td>${info.ataque.toLocaleString("pt-BR")}</td>
          <td>${Math.round(base).toLocaleString("pt-BR")}</td>
          <td>${Math.round(melhorado).toLocaleString("pt-BR")}</td>
        </tr>
      `;
    }
  });

  const ataqueMelhorado = ataqueBase * (1 + bonus);
  const ganho = ataqueMelhorado - ataqueBase;

  const equivalenteKey = document.getElementById("ferreiroEquivalenteTropa")?.value || "imperiano";
  const equivalenteInfo = ATAQUE_ROMANOS_BASE[equivalenteKey] || ATAQUE_ROMANOS_BASE.imperiano;
  const tropasEquivalentes = equivalenteInfo.ataque > 0 ? ganho / equivalenteInfo.ataque : 0;

  const nivelAnterior = Math.max(0, nivel - 1);
  const bonusAnterior = (nivelAnterior * pctNivel) / 100;
  const ataqueNivelAnterior = ataqueBase * (1 + bonusAnterior);
  const ganhoSomenteUltimoNivel = ataqueMelhorado - ataqueNivelAnterior;
  const tropasEquivalentesUltimoNivel = equivalenteInfo.ataque > 0 ? ganhoSomenteUltimoNivel / equivalenteInfo.ataque : 0;

  const el = document.getElementById("ferreiroResultado");
  if (!el) return;

  el.className = "calc-result good";
  el.innerHTML = `
    <h3>Resultado do Ferreiro</h3>
    <div class="calc-result-grid">
      <div><span>Ataque base</span><strong>${Math.round(ataqueBase).toLocaleString("pt-BR")}</strong></div>
      <div><span>Bônus aplicado</span><strong>${(bonus * 100).toFixed(1).replace(".", ",")}%</strong></div>
      <div><span>Ataque com ferreiro</span><strong>${Math.round(ataqueMelhorado).toLocaleString("pt-BR")}</strong></div>
      <div><span>Ganho estimado</span><strong>+${Math.round(ganho).toLocaleString("pt-BR")}</strong></div>
      <div><span>Equivale a</span><strong>+${tropasEquivalentes.toFixed(1).replace(".", ",")} ${equivalenteInfo.nome}</strong></div>
      <div><span>Último nível deu</span><strong>+${Math.round(ganhoSomenteUltimoNivel).toLocaleString("pt-BR")}</strong></div>
      <div><span>Último nível equivale</span><strong>+${tropasEquivalentesUltimoNivel.toFixed(1).replace(".", ",")} ${equivalenteInfo.nome}</strong></div>
    </div>

    <div class="loss-detail">
      <strong>Leitura prática:</strong>
      <p>Com esse exército, Ferreiro nível ${nivel} dá aproximadamente <strong>+${Math.round(ganho).toLocaleString("pt-BR")}</strong> de ataque, o mesmo que adicionar cerca de <strong>${tropasEquivalentes.toFixed(1).replace(".", ",")} ${equivalenteInfo.nome}</strong> sem ferreiro.</p>
      <p>Subir apenas do nível ${nivelAnterior} para ${nivel} adiciona cerca de <strong>${Math.round(ganhoSomenteUltimoNivel).toLocaleString("pt-BR")}</strong> de ataque, equivalente a <strong>${tropasEquivalentesUltimoNivel.toFixed(1).replace(".", ",")} ${equivalenteInfo.nome}</strong>.</p>
    </div>

    <table class="mini-table">
      <thead><tr><th>Tropa</th><th>Qtd</th><th>Atk base</th><th>Total base</th><th>Total melhorado</th></tr></thead>
      <tbody>${linhas || `<tr><td colspan="5">Preencha ou cole um exército para calcular.</td></tr>`}</tbody>
    </table>
    <p class="hint">Cálculo usado: ataque base × quantidade × (1 + nível do ferreiro × % por nível). O % por nível fica editável.</p>
  `;
}

function interpretarExercitoFerreiro() {
  const texto = document.getElementById("ferreiroPasteText")?.value || "";
  const linhas = extrairLinhasNumericasTravian(texto);

  if (!linhas.length) {
    alert("Não encontrei uma linha com 11 números de tropas.");
    return;
  }

  const valores = linhas[0];

  const map = {
    armyLegionario: valores[0],
    armyPretoriano: valores[1],
    armyImperiano: valores[2],
    armyEL: valores[3],
    armyEI: valores[4],
    armyEC: valores[5],
    armyAriete: valores[6],
    armyCatapulta: valores[7]
  };

  Object.entries(map).forEach(([id, valor]) => {
    const input = document.getElementById(id);
    if (input) input.value = valor || 0;
  });

  calcularFerreiroUI();
}

function limparFerreiro() {
  ["armyLegionario", "armyPretoriano", "armyImperiano", "armyEL", "armyEI", "armyEC", "armyAriete", "armyCatapulta"].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = 0;
  });

  const text = document.getElementById("ferreiroPasteText");
  if (text) text.value = "";

  calcularFerreiroUI();
}




function calcularHeroProgressao() {
  const xpAtual = Number(document.getElementById("heroXpAtual")?.value || 0);
  const xpProximo = Number(document.getElementById("heroXpProximo")?.value || 0);
  const xpOasis = Number(window.__ultimaXpHeroiEstimado?.xpBruta || window.__ultimaXpHeroiEstimado?.xpTotal || 0);

  const xpOasisInput = document.getElementById("heroXpOasis");
  if (xpOasisInput) {
    xpOasisInput.value = xpOasis ? `${xpOasis.toLocaleString("pt-BR")} XP` : "cole o relatório para calcular";
  }

  const el = document.getElementById("heroProgressResultado");
  if (!el) return;

  if (!xpAtual || !xpProximo || xpProximo <= xpAtual) {
    el.className = "calc-result";
    el.innerHTML = `
      <h3>Preencha a XP atual e a XP do próximo nível</h3>
      <p class="hint">Exemplo: XP atual 21020 e próximo nível 21520. Depois cole o relatório do oásis e clique em “Interpretar como perdas”.</p>
    `;
    return;
  }

  const faltandoAntes = Math.max(0, xpProximo - xpAtual);
  const xpDepois = xpAtual + xpOasis;
  const faltandoDepois = Math.max(0, xpProximo - xpDepois);
  const sobra = Math.max(0, xpDepois - xpProximo);
  const upa = xpDepois >= xpProximo;

  const progressoAntes = Math.min(100, (xpAtual / xpProximo) * 100);
  const progressoDepois = Math.min(100, (xpDepois / xpProximo) * 100);

  const ataquesIguais = xpOasis > 0 ? Math.ceil(faltandoAntes / xpOasis) : 0;

  const equivalencias = [
    { animal: "Elefantes", xp: 5 },
    { animal: "Tigres/Crocodilos/Ursos", xp: 3 },
    { animal: "Lobos/Javalis", xp: 2 },
    { animal: "Ratos/Cobras/Aranhas/Morcegos", xp: 1 }
  ].map(a => {
    const qtd = Math.ceil(faltandoDepois / a.xp);
    return `<li>${qtd.toLocaleString("pt-BR")} ${a.animal}</li>`;
  }).join("");

  el.className = "calc-result " + (upa ? "good" : "bad");
  el.innerHTML = `
    <h3>${upa ? "🎉 Esse oásis faz o herói subir de nível" : "⚔️ Esse oásis ajuda, mas ainda não upa"}</h3>

    ${montarResumoAnimaisHtml(window.__ultimaXpHeroiEstimado)}
    <div class="calc-result-grid">
      <div><span>XP faltando antes</span><strong>${faltandoAntes.toLocaleString("pt-BR")}</strong></div>
      <div><span>XP do oásis</span><strong>${xpOasis ? xpOasis.toLocaleString("pt-BR") : "não detectada"}</strong></div>
      <div><span>XP após ataque</span><strong>${xpDepois.toLocaleString("pt-BR")}</strong></div>
      <div><span>${upa ? "XP sobrando" : "XP faltando depois"}</span><strong>${(upa ? sobra : faltandoDepois).toLocaleString("pt-BR")}</strong></div>
    </div>

    <div class="hero-xp-bars">
      <div>
        <span>Antes</span>
        <div class="progress"><div style="width:${progressoAntes}%"></div></div>
        <small>${progressoAntes.toFixed(1).replace(".", ",")}%</small>
      </div>
      <div>
        <span>Depois</span>
        <div class="progress"><div style="width:${progressoDepois}%"></div></div>
        <small>${progressoDepois.toFixed(1).replace(".", ",")}%</small>
      </div>
    </div>

    ${xpOasis ? `<p><strong>Ataques iguais necessários para upar:</strong> ${ataquesIguais}</p>` : ""}

    ${!upa ? `
      <div class="loss-detail">
        <strong>Depois desse ataque, ainda faltará o equivalente a:</strong>
        <ul>${equivalencias}</ul>
      </div>
    ` : ""}
  `;
}


window.onload = () => { render(); calcularHeroiUI(); calcularHeroProgressao(); calcularFerreiroUI(); };



function parseTempoTravianParaMinutos(valor) {
  if (!valor) return 0;

  let texto = valor.toString().trim().toLowerCase();

  // Aceita texto copiado tipo: "Em 2:30:04 horas"
  texto = texto.replace("em", "").replace("horas", "").replace("hora", "").trim();

  const partes = texto.split(":").map(p => Number(p.trim()));

  if (partes.some(isNaN)) return 0;

  if (partes.length === 3) {
    const [h, m, s] = partes;
    return (h * 60) + m + (s / 60);
  }

  if (partes.length === 2) {
    const [m, s] = partes;
    return m + (s / 60);
  }

  if (partes.length === 1) {
    return partes[0];
  }

  return 0;
}

function formatarMinutosParaTempo(totalMinutos) {
  const totalSegundos = Math.max(0, Math.round(totalMinutos * 60));
  const h = Math.floor(totalSegundos / 3600);
  const m = Math.floor((totalSegundos % 3600) / 60);
  const s = totalSegundos % 60;

  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}


// =========================================================================
// CALCULADORA DE RENTABILIDADE DO HERÓI: ATACAR VS PRODUZIR
// =========================================================================

function calcularRentabilidadeHeroi({
  pontosRecursos,
  tempoViagemHoras,
  ganhoBrutoOasis,
  modoProducao,
  bonusProducao
}) {
  // Travian:
  // Todos recursos: 6 por ponto por hora para cada tipo = 24 total/h por ponto.
  // Um recurso específico: 24 x 2.5 = 60/h por ponto.
  const producaoBasePorPonto = modoProducao === "todos" ? 24 : 60;
  const producaoPorPontoPorHora = producaoBasePorPonto * bonusProducao;

  const producaoSacrificada = pontosRecursos * producaoPorPontoPorHora * tempoViagemHoras;
  const saldo = ganhoBrutoOasis - producaoSacrificada;

  return {
    recursosOasis: Math.round(ganhoBrutoOasis),
    producaoSacrificada: Math.round(producaoSacrificada),
    lucroPrejuizoDiferenca: Math.round(Math.abs(saldo)),
    saldo: Math.round(saldo),
    deveAtacar: saldo > 0,
    producaoPorPontoPorHora: producaoPorPontoPorHora
  };
}


const CUSTO_TROPAS_ROMANAS = {
  legionario: { nome: "Legionário", total: 370, consumo: 1 },
  pretoriano: { nome: "Pretoriano", total: 460, consumo: 1 },
  imperiano: { nome: "Imperiano", total: 440, consumo: 1 },
  equitesLegati: { nome: "Equites Legati", total: 160, consumo: 2 },
  equitesImperatoris: { nome: "Equites Imperatoris", total: 1410, consumo: 3 },
  equitesCaesaris: { nome: "Equites Caesaris", total: 2170, consumo: 4 },
  ariete: { nome: "Aríete", total: 2320, consumo: 3 },
  catapulta: { nome: "Catapulta de Fogo", total: 4540, consumo: 6 },
  senador: { nome: "Senador", total: 158800, consumo: 5 },
  colonizador: { nome: "Colonizador", total: 160000, consumo: 1 },
  heroi: { nome: "Herói", total: 0, consumo: 6 }
};



const ORDEM_TROPAS_ROMANAS = [
  "legionario",
  "pretoriano",
  "imperiano",
  "equitesLegati",
  "equitesImperatoris",
  "equitesCaesaris",
  "ariete",
  "catapulta",
  "senador",
  "colonizador",
  "heroi"
];

function limparNumeroTravian(valor) {
  if (valor === undefined || valor === null) return 0;

  return Number(
    valor
      .toString()
      .replace(/[^\d.,-]/g, "")
      .replace(/\./g, "")
      .replace(",", ".")
  ) || 0;
}

function extrairLinhasNumericasTravian(texto) {
  const linhas = (texto || "").split(/\n+/);
  const candidatas = [];

  linhas.forEach(linha => {
    const nums = linha
      .replace(/\u202d|\u202c|\u200e|\u200f/g, "")
      .match(/[\d.,]+/g);

    if (nums && nums.length >= 11) {
      candidatas.push(nums.slice(0, 11).map(limparNumeroTravian));
    }
  });

  // Se veio tudo numa linha só ou colado sem quebras boas, tenta no texto inteiro.
  if (!candidatas.length) {
    const nums = (texto || "")
      .replace(/\u202d|\u202c|\u200e|\u200f/g, "")
      .match(/[\d.,]+/g);

    if (nums && nums.length >= 11) {
      candidatas.push(nums.slice(0, 11).map(limparNumeroTravian));
    }
  }

  return candidatas;
}

function montarObjetoTropasRomanas(valores) {
  const obj = {};

  ORDEM_TROPAS_ROMANAS.forEach((key, idx) => {
    obj[key] = Number(valores[idx] || 0);
  });

  return obj;
}


function linhaTemNegativosTravian(textoLinha) {
  return /−|-/.test(textoLinha || "");
}

function extrairLinhasNumericasTravianDetalhadas(texto) {
  const linhas = (texto || "").split(/\n+/);
  const candidatas = [];

  linhas.forEach(linha => {
    const limpa = linha.replace(/\u202d|\u202c|\u200e|\u200f/g, "");
    const nums = limpa.match(/[−-]?[\d.,]+/g);

    if (nums && nums.length >= 11) {
      candidatas.push({
        valores: nums.slice(0, 11).map(n => Math.abs(limparNumeroTravian(n))),
        original: linha,
        temNegativo: linhaTemNegativosTravian(linha)
      });
    }
  });

  if (!candidatas.length) {
    const nums = (texto || "")
      .replace(/\u202d|\u202c|\u200e|\u200f/g, "")
      .match(/[−-]?[\d.,]+/g);

    if (nums && nums.length >= 11) {
      candidatas.push({
        valores: nums.slice(0, 11).map(n => Math.abs(limparNumeroTravian(n))),
        original: texto,
        temNegativo: /−|-/.test(texto)
      });
    }
  }

  return candidatas;
}

function somarLinhasTropas(linhas) {
  const total = Array(11).fill(0);

  linhas.forEach(l => {
    l.valores.forEach((v, idx) => total[idx] += Number(v || 0));
  });

  return total;
}



const XP_ANIMAIS_OASIS = [
  { nome: "Rato", xp: 1, resPorKill: 40 },
  { nome: "Aranha", xp: 1, resPorKill: 40 },
  { nome: "Cobra", xp: 1, resPorKill: 40 },
  { nome: "Morcego", xp: 1, resPorKill: 40 },
  { nome: "Javali", xp: 2, resPorKill: 80 },
  { nome: "Lobo", xp: 2, resPorKill: 80 },
  { nome: "Urso", xp: 3, resPorKill: 120 },
  { nome: "Crocodilo", xp: 3, resPorKill: 120 },
  { nome: "Tigre", xp: 3, resPorKill: 120 },
  { nome: "Elefante", xp: 5, resPorKill: 200 }
];

function extrairXpHeroiPorAnimais(texto) {
  if (!texto) return null;

  const clean = texto.replace(/\u202d|\u202c|\u200e|\u200f/g, "");
  const idxDefensor = clean.toLowerCase().indexOf("defensor");
  if (idxDefensor < 0) return null;

  const trechoDefensor = clean.slice(idxDefensor);
  const linhas = trechoDefensor.split(/\n+/);

  // Busca a primeira linha negativa depois do bloco Defensor.
  // Ela costuma representar os animais mortos.
  for (const linha of linhas) {
    if (!/−|-/.test(linha)) continue;

    const nums = linha.match(/[−-]?[\d.,]+/g);
    if (!nums || nums.length < 10) continue;

    const mortos = nums.slice(0, 10).map(n => Math.abs(limparNumeroTravian(n)));
    let xpTotal = 0;
    const detalhes = [];

    mortos.forEach((qtd, idx) => {
      const animal = XP_ANIMAIS_OASIS[idx];
      if (!animal) return;

      const xp = qtd * animal.xp;
      xpTotal += xp;

      if (qtd > 0) {
        detalhes.push({
          nome: animal.nome,
          qtd,
          xpUnitario: animal.xp,
          xpTotal: xp,
          resPorKill: animal.resPorKill || 0
        });
      }
    });

    if (xpTotal > 0) {
      const totalAnimais = detalhes.reduce((acc, a) => acc + Number(a.qtd || 0), 0);
      const recursosTeoricos = detalhes.reduce((acc, a) => acc + (Number(a.qtd || 0) * Number(a.resPorKill || 0) * 4), 0);
      return { xpTotal, detalhes, totalAnimais, recursosTeoricos };
    }
  }

  return null;
}

function preencherXpHeroiDoRelatorio(texto) {
  const xp = extrairXpHeroiPorAnimais(texto);
  const input = document.getElementById("calcXpHeroi");

  if (!input) return xp;

  if (xp) {
    input.value = `${xp.xpTotal.toLocaleString("pt-BR")} XP estimado`;
    window.__ultimaXpHeroiEstimado = {
      ...xp,
      xpBruta: xp.xpTotal,
      xpAjustada: xp.xpTotal,
      fator: 1
    };
  } else {
    input.value = "não detectado";
    window.__ultimaXpHeroiEstimado = null;
  }

  calcularHeroProgressao();
  return window.__ultimaXpHeroiEstimado;
}

function explicarBaseProducaoHeroi(modoProducao, bonusProducao, producaoPorPontoPorHora) {
  if (modoProducao === "todos") {
    return `Base: 6 por recurso × 4 recursos = 24/h por ponto. Com bônus ${bonusProducao === 1.25 ? "+25%" : "sem +25%"} fica ${producaoPorPontoPorHora.toLocaleString("pt-BR")}/h por ponto.`;
  }

  return `Base: foco em 1 recurso usa 60/h por ponto. Com bônus ${bonusProducao === 1.25 ? "+25%" : "sem +25%"} fica ${producaoPorPontoPorHora.toLocaleString("pt-BR")}/h por ponto.`;
}



function classificarOasisPorAnimais(totalAnimais) {
  if (totalAnimais >= 150) {
    return {
      classe: "grande",
      titulo: "🟢 Oásis grande",
      texto: "150+ animais. Geralmente menos gente limpa por exigir mais tropa/herói."
    };
  }

  if (totalAnimais >= 80) {
    return {
      classe: "medio",
      titulo: "🟡 Oásis médio",
      texto: "80–149 animais. Pode valer bem, mas ainda costuma atrair disputa."
    };
  }

  return {
    classe: "pequeno",
    titulo: "🔴 Oásis pequeno",
    texto: "Menos de 80 animais. Normalmente é mais visado e pode sumir rápido."
  };
}

function montarResumoAnimaisHtml(xpObj) {
  if (!xpObj || !xpObj.detalhes || !xpObj.detalhes.length) {
    return `<div class="animal-summary neutral"><strong>🐾 Total de animais:</strong> não detectado</div>`;
  }

  const totalAnimais = xpObj.detalhes.reduce((acc, a) => acc + Number(a.qtd || 0), 0);
  const totalXp = xpObj.xpBruta || xpObj.xpTotal || 0;
  const totalRes = xpObj.detalhes.reduce((acc, a) => acc + (Number(a.qtd || 0) * Number(a.resPorKill || 0) * 4), 0);
  const classificacao = classificarOasisPorAnimais(totalAnimais);

  return `
    <div class="animal-summary ${classificacao.classe}">
      <div>
        <span>🐾 Total de animais</span>
        <strong>${totalAnimais.toLocaleString("pt-BR")}</strong>
      </div>
      <div>
        <span>Classificação</span>
        <strong>${classificacao.titulo}</strong>
      </div>
      <div>
        <span>XP dos animais</span>
        <strong>${totalXp.toLocaleString("pt-BR")}</strong>
      </div>
      <div>
        <span>Recursos teóricos</span>
        <strong>${totalRes.toLocaleString("pt-BR")}</strong>
      </div>
      <p>${classificacao.texto}</p>
    </div>
  `;
}

function extrairRecursosOasisDoRelatorio(texto) {
  if (!texto) return null;

  const clean = texto.replace(/\u202d|\u202c|\u200e|\u200f/g, "");

  // Preferencial: números após a frase "Recursos adicionais..."
  const marcador = clean.toLowerCase().indexOf("recursos adicionais");
  let trecho = marcador >= 0 ? clean.slice(marcador) : clean;

  const nums = trecho.match(/[\d.]+(?:,\d+)?/g);
  if (!nums || nums.length < 4) return null;

  // No relatório do Travian, geralmente os 4 últimos números após a frase são madeira/barro/ferro/cereal.
  const ultimos4 = nums.slice(-4).map(limparNumeroTravian);

  if (ultimos4.some(n => !Number.isFinite(n))) return null;

  return {
    madeira: ultimos4[0],
    barro: ultimos4[1],
    ferro: ultimos4[2],
    cereal: ultimos4[3],
    total: ultimos4.reduce((a, b) => a + b, 0)
  };
}

function preencherRecursosOasisDoRelatorio(texto) {
  const rec = extrairRecursosOasisDoRelatorio(texto);
  if (!rec) return null;

  const campos = {
    calcMadeira: rec.madeira,
    calcBarro: rec.barro,
    calcFerro: rec.ferro,
    calcCereal: rec.cereal
  };

  Object.entries(campos).forEach(([id, valor]) => {
    const input = document.getElementById(id);
    if (input) input.value = valor;
  });

  return rec;
}


function escolherValoresParaPerdasTravian(texto) {
  const detalhadas = extrairLinhasNumericasTravianDetalhadas(texto);
  const considerarEnfermaria = !!document.getElementById("considerarEnfermaria")?.checked;

  if (!detalhadas.length) {
    return { valores: [], linhasUsadas: [], modo: "nenhuma" };
  }

  if (!considerarEnfermaria) {
    return {
      valores: detalhadas[0].valores,
      linhasUsadas: [detalhadas[0]],
      modo: "somente primeira linha"
    };
  }

  // Normalmente no simulador:
  // 1ª linha negativa = mortos definitivos
  // 2ª linha negativa = enfermaria/feridos
  // 3ª linha verde = sobreviventes
  const negativas = detalhadas.filter(l => l.temNegativo).slice(0, 2);

  if (negativas.length >= 2) {
    return {
      valores: somarLinhasTropas(negativas),
      linhasUsadas: negativas,
      modo: "mortos + enfermaria"
    };
  }

  return {
    valores: detalhadas[0].valores,
    linhasUsadas: [detalhadas[0]],
    modo: "primeira linha detectada"
  };
}


function calcularResumoTropasRomanas(tropas) {
  let custoTotal = 0;
  let consumoTotal = 0;
  const detalhes = [];

  ORDEM_TROPAS_ROMANAS.forEach(key => {
    const qtd = Number(tropas[key] || 0);
    const info = CUSTO_TROPAS_ROMANAS[key];

    const custo = qtd * (info.total || 0);
    const consumo = qtd * (info.consumo || 0);

    custoTotal += custo;
    consumoTotal += consumo;

    if (qtd > 0) {
      detalhes.push({
        key,
        nome: info.nome,
        qtd,
        custoUnitario: info.total || 0,
        custoTotal: custo,
        consumoUnitario: info.consumo || 0,
        consumoTotal: consumo
      });
    }
  });

  return { custoTotal, consumoTotal, detalhes };
}

function interpretarExercitoColado(tipo) {
  const texto = document.getElementById("armyPasteText")?.value || "";
  const result = document.getElementById("armyPasteResult");
  if (!result) return;

  const linhas = extrairLinhasNumericasTravian(texto);

  if (!linhas.length) {
    result.className = "army-result bad";
    result.innerHTML = "Não encontrei uma linha com 11 números de tropas. Cole a linha do atacante ou das perdas.";
    return;
  }

  let valores = linhas[0];
  let modoInterpretacao = "primeira linha detectada";
  let linhasUsadasCount = 1;

  if (tipo === "perdas") {
    const escolha = escolherValoresParaPerdasTravian(texto);
    valores = escolha.valores;
    modoInterpretacao = escolha.modo;
    linhasUsadasCount = escolha.linhasUsadas.length;
  }

  const tropas = montarObjetoTropasRomanas(valores);
  const resumo = calcularResumoTropasRomanas(tropas);

  if (tipo === "perdas") {
    const mapInputs = {
      legionario: "lossLegionario",
      pretoriano: "lossPretoriano",
      imperiano: "lossImperiano",
      equitesLegati: "lossEL",
      equitesImperatoris: "lossEI",
      equitesCaesaris: "lossEC"
    };

    Object.entries(mapInputs).forEach(([key, inputId]) => {
      const input = document.getElementById(inputId);
      if (input) input.value = tropas[key] || 0;
    });

    const recursosDetectados = preencherRecursosOasisDoRelatorio(texto);
    const xpDetectada = preencherXpHeroiDoRelatorio(texto);
    calcularHeroiUI();

    if (recursosDetectados) {
      window.__ultimoRecursoOasisDetectado = recursosDetectados;
    } else {
      window.__ultimoRecursoOasisDetectado = null;
    }
  }

  const recursosDetectadosInfo = tipo === "perdas" && window.__ultimoRecursoOasisDetectado
    ? `<span>Recursos preenchidos: <strong>${window.__ultimoRecursoOasisDetectado.total.toLocaleString("pt-BR")}</strong></span>`
    : "";

  const xpDetectadaInfo = tipo === "perdas" && window.__ultimaXpHeroiEstimado
    ? `<span>XP estimada: <strong>${(window.__ultimaXpHeroiEstimado.xpBruta || window.__ultimaXpHeroiEstimado.xpTotal).toLocaleString("pt-BR")}</strong></span>`
    : "";

  const animaisDetectadosInfo = tipo === "perdas" && window.__ultimaXpHeroiEstimado?.totalAnimais
    ? `<span>Total de animais: <strong>${window.__ultimaXpHeroiEstimado.totalAnimais.toLocaleString("pt-BR")}</strong></span>`
    : "";

  const linhasHtml = resumo.detalhes.map(d => `
    <tr>
      <td>${d.nome}</td>
      <td>${d.qtd.toLocaleString("pt-BR")}</td>
      <td>${d.custoTotal.toLocaleString("pt-BR")}</td>
      <td>${d.consumoTotal.toLocaleString("pt-BR")}/h</td>
    </tr>
  `).join("");

  result.className = "army-result good";
  result.innerHTML = `
    <h4>${tipo === "perdas" ? "Perdas interpretadas e preenchidas" : "Exército interpretado"}</h4>
    <div class="army-summary">
      <span>Custo total: <strong>${resumo.custoTotal.toLocaleString("pt-BR")}</strong></span>
      <span>Consumo: <strong>${resumo.consumoTotal.toLocaleString("pt-BR")}/h</strong></span>
      <span>Linhas detectadas: <strong>${linhas.length}</strong></span>
      <span>Modo: <strong>${modoInterpretacao}</strong></span>
      <span>Linhas usadas: <strong>${linhasUsadasCount}</strong></span>
      ${recursosDetectadosInfo}
      ${xpDetectadaInfo}
      ${animaisDetectadosInfo}
    </div>
    <table class="mini-table">
      <thead><tr><th>Tropa</th><th>Qtd</th><th>Custo</th><th>Consumo</th></tr></thead>
      <tbody>${linhasHtml}</tbody>
    </table>
    <p class="hint">${tipo === "perdas" ? "Usei esses números como perdas na calculadora. Se a opção de enfermaria estiver marcada, somei mortos + enfermaria." : "Usei esses números apenas como leitura do exército atual."}</p>
  `;
}

function limparExercitoColado() {
  const txt = document.getElementById("armyPasteText");
  const result = document.getElementById("armyPasteResult");

  if (txt) txt.value = "";
  if (result) {
    result.className = "army-result";
    result.innerHTML = "";
  }
}


function calcularCustoPerdasRomanas() {
  const getNum = (id) => Number((document.getElementById(id)?.value || 0).toString().replace(",", "."));

  const perdas = [
    { key: "legionario", qtd: getNum("lossLegionario") },
    { key: "pretoriano", qtd: getNum("lossPretoriano") },
    { key: "imperiano", qtd: getNum("lossImperiano") },
    { key: "equitesLegati", qtd: getNum("lossEL") },
    { key: "equitesImperatoris", qtd: getNum("lossEI") },
    { key: "equitesCaesaris", qtd: getNum("lossEC") }
  ];

  let total = 0;
  const detalhes = [];

  perdas.forEach(p => {
    const info = CUSTO_TROPAS_ROMANAS[p.key];
    const qtd = Number(p.qtd || 0);
    const custo = qtd * info.total;

    if (qtd > 0) {
      detalhes.push({
        nome: info.nome,
        qtd,
        custoUnitario: info.total,
        custoTotal: custo
      });
    }

    total += custo;
  });

  return { total, detalhes };
}


function calcularHeroiUI() {
  const getNum = (id) => Number((document.getElementById(id)?.value || 0).toString().replace(",", "."));

  const pontosRecursos = getNum("calcPontosRecursos");
  const tempoIdaTexto = document.getElementById("calcTempoIdaTexto")?.value || "";
  const tempoIdaMin = parseTempoTravianParaMinutos(tempoIdaTexto);

  // No Travian, a volta base é o mesmo tempo da ida.
  // Se usar Mapa Pequeno, só a volta fica 30% mais rápida.
  const tempoVoltaMin = tempoIdaMin;

  const usaMapaPequeno = !!document.getElementById("calcUsaMapaPequeno")?.checked;
  const fatorRetorno = usaMapaPequeno ? 1.30 : 1;

  const madeira = getNum("calcMadeira");
  const barro = getNum("calcBarro");
  const ferro = getNum("calcFerro");
  const cereal = getNum("calcCereal");

  const modoProducao = document.getElementById("calcModoProducao")?.value || "unico";
  const bonusProducao = Number(document.getElementById("calcBonus")?.value || 1);

  const tempoVoltaRealMin = tempoVoltaMin / fatorRetorno;
  const tempoTotalHoras = (tempoIdaMin + tempoVoltaRealMin) / 60;

  const voltaInput = document.getElementById("calcTempoVoltaTexto");
  if (voltaInput) voltaInput.value = formatarMinutosParaTempo(tempoVoltaRealMin);

  const totalInput = document.getElementById("calcTempoTotalTexto");
  if (totalInput) totalInput.value = formatarMinutosParaTempo(tempoIdaMin + tempoVoltaRealMin);
  const ganhoBrutoOasis = madeira + barro + ferro + cereal;

  const perdasRomanas = calcularCustoPerdasRomanas();

  const vidaAntes = getNum("calcVidaAntes");
  const vidaDepois = getNum("calcVidaDepois");
  const vidaPerdida = Math.max(0, vidaAntes - vidaDepois);
  const recursosPorVida = vidaPerdida > 0 ? ganhoBrutoOasis / vidaPerdida : 0;

  if (window.__ultimaXpHeroiEstimado?.xpBruta || window.__ultimaXpHeroiEstimado?.xpTotal) {
    const xpBase = window.__ultimaXpHeroiEstimado.xpBruta || window.__ultimaXpHeroiEstimado.xpTotal;
    window.__ultimaXpHeroiEstimado.xpBruta = xpBase;
    window.__ultimaXpHeroiEstimado.xpAjustada = xpBase;
    window.__ultimaXpHeroiEstimado.fator = 1;
    const xpInput = document.getElementById("calcXpHeroi");
    if (xpInput) xpInput.value = `${xpBase.toLocaleString("pt-BR")} XP estimado`;
  }

  const xpAtual = window.__ultimaXpHeroiEstimado?.xpBruta || window.__ultimaXpHeroiEstimado?.xpTotal || 0;
  const xpBrutaAtual = xpAtual;
  const xpPorHora = tempoTotalHoras > 0 && xpAtual > 0 ? xpAtual / tempoTotalHoras : 0;
  const xpPorVida = vidaPerdida > 0 && xpAtual > 0 ? xpAtual / vidaPerdida : 0;
  calcularHeroProgressao();

  const resultado = calcularRentabilidadeHeroi({
    pontosRecursos,
    tempoViagemHoras: tempoTotalHoras,
    ganhoBrutoOasis,
    modoProducao,
    bonusProducao
  });

  const el = document.getElementById("calcResultado");
  if (!el) return;

  const lucroLiquidoReal = resultado.saldo - perdasRomanas.total;
  const roiPerdas = perdasRomanas.total > 0 ? ((ganhoBrutoOasis - perdasRomanas.total) / perdasRomanas.total) * 100 : 0;
  const recursosPorCustoTropa = perdasRomanas.total > 0 ? ganhoBrutoOasis / perdasRomanas.total : 0;
  const deveAtacarReal = lucroLiquidoReal > 0;

  const classe = deveAtacarReal ? "good" : "bad";
  const titulo = deveAtacarReal
    ? "⚔️ ATACAR — lucro líquido positivo"
    : "🌾 NÃO COMPENSA — perdas/tempo comem o lucro";

  const dicaTroca = deveAtacarReal
    ? "Mesmo descontando produção sacrificada e tropas mortas, esse oásis ainda fica positivo."
    : "Com o tempo de viagem e/ou tropas mortas, esse ataque fica ruim. Procure outro oásis ou deixe o herói produzindo.";

  const detalhesPerdasHtml = perdasRomanas.detalhes.length
    ? `<div class="loss-detail"><strong>Perdas calculadas:</strong><ul>${perdasRomanas.detalhes.map(p => `<li>${p.qtd}x ${p.nome} × ${p.custoUnitario.toLocaleString("pt-BR")} = ${p.custoTotal.toLocaleString("pt-BR")}</li>`).join("")}</ul></div>`
    : `<div class="loss-detail"><strong>Perdas calculadas:</strong> nenhuma tropa morta informada.</div>`;

  const detalhesXpHtml = window.__ultimaXpHeroiEstimado?.detalhes?.length
    ? `<div class="loss-detail"><strong>XP estimada por animais mortos:</strong>
        <p class="hint">Tabela validada com seus relatórios reais: rato/aranha/cobra/morcego=1 XP, javali/lobo=2 XP, urso/crocodilo/tigre=3 XP, elefante=5 XP.</p>
        <ul>${window.__ultimaXpHeroiEstimado.detalhes.map(a => `<li>${a.qtd}x ${a.nome} × ${a.xpUnitario} XP = ${a.xpTotal.toLocaleString("pt-BR")} XP bruto</li>`).join("")}</ul>
      </div>`
    : `<div class="loss-detail"><strong>XP estimada:</strong> não detectada. Cole o relatório completo com o bloco Defensor para calcular.</div>`;

  el.className = "calc-result " + classe;
  el.innerHTML = `
    <h3>${titulo}</h3>
    <div class="calc-result-grid">
      <div><span>Recursos do oásis</span><strong>${resultado.recursosOasis.toLocaleString("pt-BR")}</strong></div>
      <div><span>Custo tropas mortas</span><strong>${perdasRomanas.total.toLocaleString("pt-BR")}</strong></div>
      <div><span>Produção sacrificada</span><strong>${resultado.producaoSacrificada.toLocaleString("pt-BR")}</strong></div>
      <div><span>Lucro líquido real</span><strong>${lucroLiquidoReal > 0 ? "+" : ""}${Math.round(lucroLiquidoReal).toLocaleString("pt-BR")}</strong></div>
      <div><span>Ida</span><strong>${formatarMinutosParaTempo(tempoIdaMin)}</strong></div>
      <div><span>Volta calculada</span><strong>${formatarMinutosParaTempo(tempoVoltaRealMin)}</strong></div>
      <div><span>Tempo total</span><strong>${formatarMinutosParaTempo(tempoIdaMin + tempoVoltaRealMin)}</strong></div>
      <div><span>Item de retorno</span><strong>${usaMapaPequeno ? "Mapa Pequeno" : "Nenhum"}</strong></div>
      <div><span>Vida perdida</span><strong>${vidaPerdida.toLocaleString("pt-BR")}%</strong></div>
      <div><span>Recursos por 1% vida</span><strong>${Math.round(recursosPorVida).toLocaleString("pt-BR")}</strong></div>
      <div><span>XP estimada</span><strong>${xpAtual ? xpAtual.toLocaleString("pt-BR") : "não detectada"}</strong></div>
      <div><span>XP bruta da tabela</span><strong>${xpBrutaAtual ? xpBrutaAtual.toLocaleString("pt-BR") : "não detectada"}</strong></div>
      <div><span>XP por hora</span><strong>${xpPorHora ? xpPorHora.toFixed(1).replace(".", ",") : "não detectada"}</strong></div>
      <div><span>XP por 1% vida</span><strong>${xpPorVida ? xpPorVida.toFixed(1).replace(".", ",") : "não detectada"}</strong></div>
    </div>
    ${montarResumoAnimaisHtml(window.__ultimaXpHeroiEstimado)}
    ${detalhesPerdasHtml}
    ${detalhesXpHtml}
    <div class="loss-summary didactic-loss">
      <span>
        Retorno das tropas:
        <strong>${perdasRomanas.total > 0 ? recursosPorCustoTropa.toFixed(2).replace(".", ",") + "x" : "sem perdas"}</strong>
        <small>${perdasRomanas.total > 0 ? (recursosPorCustoTropa >= 1 ? "Cada 1 recurso perdido em tropa voltou mais de 1 recurso." : "Cada 1 recurso perdido em tropa voltou só " + recursosPorCustoTropa.toFixed(2).replace(".", ",") + " recurso.") : ""}</small>
      </span>
      <span>
        Resultado só das tropas:
        <strong>${perdasRomanas.total > 0 ? roiPerdas.toFixed(1).replace(".", ",") + "%" : "sem perdas"}</strong>
        <small>${perdasRomanas.total > 0 ? (roiPerdas >= 0 ? "As tropas se pagaram antes de considerar o tempo do herói." : "As tropas NÃO se pagaram antes de considerar o tempo do herói.") : ""}</small>
      </span>
    </div>
    <p>${dicaTroca}</p>
    <small>${explicarBaseProducaoHeroi(modoProducao, bonusProducao, resultado.producaoPorPontoPorHora)} Se marcar Mapa Pequeno, apenas o tempo de volta é reduzido em 30%.</small>
  `;
}
