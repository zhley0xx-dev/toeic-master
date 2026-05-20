// =====================================================================
// TOEIC MASTER – App Engine
// =====================================================================

// ---- STATE ----
let state = {
  currentPage: 'home',
  quiz: null,
  currentQ: 0,
  answers: [],
  startTime: null,
  timerInterval: null,
  elapsed: 0,
  quizComplete: false,
};

// ---- STORAGE HELPERS ----
function save(key, val) {
  try { localStorage.setItem('toeic_' + key, JSON.stringify(val)); } catch(e) {}
}
function load(key, def) {
  try { const v = localStorage.getItem('toeic_' + key); return v ? JSON.parse(v) : def; } catch(e) { return def; }
}

// ---- DATE HELPERS ----
function getDayNumber() {
  // Days since May 20, 2026 (app launch date)
  const launch = new Date('2026-05-20');
  const now = new Date();
  now.setHours(0,0,0,0);
  return Math.max(0, Math.floor((now - launch) / 86400000));
}

function getDaysUntilAugust() {
  const now = new Date();
  const target = new Date(now.getFullYear(), 7, 1); // Aug 1
  if (now > target) return 0;
  return Math.ceil((target - now) / 86400000);
}

function formatDate(d) {
  return d.toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long' });
}

// ---- INIT ----
function init() {
  updateHomeStats();
  renderFiches();
  renderProgress();
  renderResults();
  checkInstallPrompt();
  requestNotifPermission();

  // Simulate loading
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
  }, 1200);
}

// ---- HOME ----
function updateHomeStats() {
  const history = load('history', []);
  const today = getDayNumber();
  
  document.getElementById('home-date').textContent = formatDate(new Date());
  document.getElementById('days-left').textContent = getDaysUntilAugust() + ' jours';
  document.getElementById('stat-done').textContent = history.length;
  
  // Streak
  let streak = 0;
  for (let i = today; i >= 0; i--) {
    if (history.find(h => h.day === i)) streak++;
    else break;
  }
  document.getElementById('stat-streak').textContent = streak;
  
  // Average
  if (history.length > 0) {
    const avg = Math.round(history.reduce((s,h) => s + (h.score/h.total*100), 0) / history.length);
    document.getElementById('stat-avg').textContent = avg + '%';
    // Target bar (95/100 = 95%)
    const pct = Math.min(100, Math.round(avg / 95 * 100));
    document.getElementById('target-pct').textContent = avg + '%';
    document.getElementById('target-bar-fill').style.width = pct + '%';
  }
  
  // Check if today's quiz done
  const todayDone = history.find(h => h.day === today);
  if (todayDone) {
    document.getElementById('hero-title').textContent = 'Quiz du jour ✓';
    document.getElementById('hero-subtitle').textContent = `Score: ${todayDone.score}/${todayDone.total} — Revenir demain !`;
    document.getElementById('start-quiz-btn').textContent = '📊 Voir mes résultats';
    document.getElementById('start-quiz-btn').onclick = () => { goPage('results', document.querySelector('[data-page=results]')); };
  } else {
    document.getElementById('hero-title').textContent = 'Quiz du jour 🔔';
    document.getElementById('hero-subtitle').textContent = '50 questions · ~75 min · TOEIC niveau B2/C1';
    document.getElementById('start-quiz-btn').onclick = startQuiz;
  }
}

// ---- QUIZ ----
function startQuiz() {
  const history = load('history', []);
  const today = getDayNumber();
  
  // Allow retaking if already done (practice mode)
  const questions = generateDailyQuiz(today);
  
  state.quiz = questions;
  state.currentQ = 0;
  state.answers = [];
  state.startTime = Date.now();
  state.elapsed = 0;
  state.quizComplete = false;
  
  // Activate quiz page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-quiz').classList.add('active');
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  
  startTimer();
  renderQuestion();
}

function startTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    document.getElementById('timer').textContent = '⏱ ' + formatTime(state.elapsed);
    // Warn at 75 min (TOEIC reading = 75 min)
    if (state.elapsed === 4500) {
      document.getElementById('timer').style.color = '#ef476f';
    }
  }, 1000);
}

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2,'0');
  const sec = (s % 60).toString().padStart(2,'0');
  return m + ':' + sec;
}

function renderQuestion() {
  const q = state.quiz[state.currentQ];
  const total = state.quiz.length;
  
  document.getElementById('q-counter').textContent = `Q ${state.currentQ + 1} / ${total}`;
  document.getElementById('progress-fill').style.width = ((state.currentQ / total) * 100) + '%';
  
  const area = document.getElementById('question-area');
  
  let partLabel = 'Part 5 – Phrase incomplète';
  if (q.type === 'part6') partLabel = 'Part 6 – Texte à compléter';
  if (q.type === 'part7') partLabel = 'Part 7 – Compréhension écrite';
  
  let passageHtml = '';
  if (q.passageText) {
    const highlighted = q.passageText.replace(/\[BLANK\d?\]/g, '<span class="blank">[________]</span>');
    passageHtml = `<div class="passage-box">${highlighted.replace(/\n/g,'<br>')}</div>`;
  }
  
  let categoryBadge = q.category ? `<span style="font-size:11px;color:var(--text2);background:var(--surface2);padding:2px 8px;border-radius:20px;margin-left:8px">${q.category}</span>` : '';
  
  area.innerHTML = `
    <div class="part-badge">📝 ${partLabel}${categoryBadge}</div>
    ${passageHtml}
    <p class="question-text">${q.question || ''}</p>
    <div class="options" id="options">
      ${['A','B','C','D'].map((l, i) => `
        <button class="option-btn" id="opt-${i}" onclick="selectAnswer(${i})">
          <span class="letter">${l}</span>
          <span>${q.options[i]}</span>
        </button>
      `).join('')}
    </div>
    <div id="explanation-area"></div>
    <button class="next-btn" id="next-btn" style="display:none" onclick="nextQuestion()">
      ${state.currentQ === total - 1 ? '🏁 Voir mes résultats' : 'Question suivante →'}
    </button>
  `;
  
  // Scroll to top
  document.getElementById('quiz-content').scrollTop = 0;
}

function selectAnswer(idx) {
  const q = state.quiz[state.currentQ];
  const buttons = document.querySelectorAll('.option-btn');
  
  // Disable all
  buttons.forEach(b => b.classList.add('disabled'));
  
  const isCorrect = idx === q.answer;
  
  // Show correct
  buttons[q.answer].classList.add('correct');
  
  if (!isCorrect) {
    buttons[idx].classList.add('selected-wrong');
  }
  
  // Record answer
  state.answers.push({
    q: state.currentQ,
    category: q.category || q.passageCategory || 'Reading',
    type: q.type,
    correct: isCorrect,
    chosen: idx,
    correct_idx: q.answer,
    question: q.question,
    explanation: q.explanation
  });
  
  // Show explanation
  const expArea = document.getElementById('explanation-area');
  expArea.innerHTML = `
    <div class="explanation-box">
      ${isCorrect 
        ? `<strong>✅ Correct !</strong><br>${q.explanation}`
        : `<strong>❌ Incorrect.</strong> La bonne réponse est <strong>${['A','B','C','D'][q.answer]} — ${q.options[q.answer]}</strong><br><br>${q.explanation}`
      }
    </div>
  `;
  
  document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
  state.currentQ++;
  if (state.currentQ >= state.quiz.length) {
    finishQuiz();
  } else {
    renderQuestion();
  }
}

function finishQuiz() {
  clearInterval(state.timerInterval);
  state.quizComplete = true;
  
  const score = state.answers.filter(a => a.correct).length;
  const total = state.quiz.length;
  const elapsed = state.elapsed;
  
  // Categorize errors
  const errorsByCategory = {};
  state.answers.filter(a => !a.correct).forEach(a => {
    const cat = a.category;
    errorsByCategory[cat] = (errorsByCategory[cat] || 0) + 1;
  });
  
  // Save to history
  const history = load('history', []);
  const today = getDayNumber();
  const existing = history.findIndex(h => h.day === today);
  const entry = { day: today, date: new Date().toISOString(), score, total, elapsed, errors: errorsByCategory };
  
  if (existing >= 0) history[existing] = entry;
  else history.push(entry);
  save('history', history);
  
  // Show results page
  goPage('results', document.querySelector('[data-page=results]'));
  renderResults();
  updateHomeStats();
}

// ---- RESULTS ----
function renderResults() {
  const history = load('history', []);
  if (history.length === 0) {
    document.getElementById('results-content').innerHTML = `
      <div class="empty-state">
        <div class="emoji">📋</div>
        <h3>Aucun quiz terminé</h3>
        <p>Lance ton premier quiz pour voir tes résultats !</p>
        <button class="btn-accent" onclick="startQuiz()">Commencer maintenant</button>
      </div>`;
    return;
  }
  
  const latest = history[history.length - 1];
  const score = latest.score;
  const total = latest.total;
  const pct = Math.round(score / total * 100);
  const elapsed = latest.elapsed;
  
  // Performance message
  let perfMsg = '';
  let perfColor = 'var(--accent)';
  if (pct >= 95) { perfMsg = '🏆 Objectif atteint !'; perfColor = 'var(--green)'; }
  else if (pct >= 85) { perfMsg = '📈 Très bonne progression !'; perfColor = 'var(--gold)'; }
  else if (pct >= 70) { perfMsg = '💪 Continue comme ça !'; perfColor = 'var(--accent)'; }
  else { perfMsg = '📚 Plus de pratique nécessaire'; perfColor = 'var(--accent2)'; }
  
  // Timer comparison (75 min = TOEIC reading time)
  const toeicTime = 75 * 60;
  const timeMsg = elapsed <= toeicTime 
    ? `✅ Dans les temps (${formatTime(elapsed)} / 75:00)` 
    : `⚠️ Hors temps (${formatTime(elapsed)} / 75:00)`;
  
  // Errors by category
  const errors = latest.errors || {};
  const totalErrors = total - score;
  const errorEntries = Object.entries(errors).sort((a,b) => b[1]-a[1]);
  
  // Points to improve
  const improvements = [];
  errorEntries.forEach(([cat, count]) => {
    const pctE = Math.round(count / totalErrors * 100);
    if (pctE >= 15) improvements.push(`${cat} (${pctE}% de tes erreurs)`);
  });
  
  const improvText = improvements.length 
    ? `<p style="font-size:14px;color:var(--text2);line-height:1.6;margin:12px 16px 0"><strong style="color:var(--text)">Points à améliorer :</strong><br>${improvements.join(', ')}</p>`
    : `<p style="font-size:14px;color:var(--green);margin:12px 16px 0">✅ Pas de catégorie particulièrement faible — excellent travail !</p>`;
  
  document.getElementById('results-subtitle').textContent = `Quiz du ${new Date(latest.date).toLocaleDateString('fr-FR')}`;
  
  document.getElementById('results-content').innerHTML = `
    <div class="result-hero">
      <div class="score-ring">
        <canvas id="score-canvas" width="140" height="140"></canvas>
        <div class="score-num" style="color:${perfColor}">${score}<span style="font-size:18px;color:var(--text2)">/${total}</span></div>
      </div>
      <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:${perfColor}">${perfMsg}</div>
      <div class="score-sub" style="margin-top:6px">${pct}% de réussite</div>
    </div>
    
    <div class="result-grid">
      <div class="result-card">
        <div class="rc-label">⏱ Temps</div>
        <div class="rc-val" style="font-size:16px">${formatTime(elapsed)}</div>
        <div style="font-size:11px;color:${elapsed<=toeicTime?'var(--green)':'var(--red)'};">${elapsed<=toeicTime?'Dans les temps ✓':'Dépassé ⚠️'}</div>
      </div>
      <div class="result-card">
        <div class="rc-label">✅ Bonnes rép.</div>
        <div class="rc-val" style="color:var(--green)">${score}</div>
      </div>
      <div class="result-card">
        <div class="rc-label">❌ Erreurs</div>
        <div class="rc-val" style="color:var(--red)">${totalErrors}</div>
      </div>
      <div class="result-card">
        <div class="rc-label">🎯 vs Objectif</div>
        <div class="rc-val" style="font-size:15px;color:${pct>=95?'var(--green)':'var(--accent)'}">${pct>=95?'Atteint !':95-pct+'% manquant'}</div>
      </div>
    </div>
    
    ${improvText}
    
    <div class="section-title">Types d'erreurs</div>
    <div class="error-types">
      ${totalErrors === 0 
        ? `<div class="error-row">🎉 Aucune erreur — score parfait !</div>`
        : errorEntries.map(([cat, count]) => {
          const pctE = Math.round(count / totalErrors * 100);
          return `<div class="error-row">
            <span class="error-tag">${cat}</span>
            <div class="error-bar-mini"><div class="error-bar-mini-fill" style="width:${pctE}%"></div></div>
            <span class="error-pct">${pctE}%</span>
          </div>`;
        }).join('')
      }
    </div>
    
    <div style="padding:0 16px 16px">
      <button class="btn-accent" onclick="startQuiz()">Refaire un quiz 🔁</button>
    </div>
  `;
  
  // Draw score ring
  setTimeout(() => drawScoreRing(pct, perfColor), 100);
}

function drawScoreRing(pct, color) {
  const canvas = document.getElementById('score-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = 70, cy = 70, r = 54;
  
  ctx.clearRect(0, 0, 140, 140);
  
  // Background ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = '#1e1e35';
  ctx.lineWidth = 10;
  ctx.stroke();
  
  // Score arc
  const end = (-Math.PI / 2) + (pct / 100) * Math.PI * 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, -Math.PI / 2, end);
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.stroke();
}

// ---- PROGRESS ----
function renderProgress() {
  const history = load('history', []);
  const content = document.getElementById('progress-content');
  
  if (history.length === 0) {
    content.innerHTML = `<div class="empty-state"><div class="emoji">📈</div><h3>Pas encore de données</h3><p>Complète ton premier quiz pour voir ta progression !</p></div>`;
    return;
  }
  
  const sorted = [...history].sort((a,b) => a.day - b.day);
  const last7 = sorted.slice(-7);
  
  // Progress chart
  const maxScore = 100;
  const chartData = last7.map(h => ({ score: Math.round(h.score/h.total*100), date: new Date(h.date).toLocaleDateString('fr-FR',{day:'numeric',month:'short'}) }));
  
  const bars = chartData.map((d, i) => {
    const h = Math.max(4, Math.round(d.score / maxScore * 140));
    const color = d.score >= 95 ? 'var(--green)' : d.score >= 80 ? 'var(--accent)' : 'var(--accent2)';
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1">
        <div style="font-family:'Syne',sans-serif;font-size:11px;font-weight:700;color:${color}">${d.score}%</div>
        <div style="width:100%;max-width:36px;height:${h}px;background:${color};border-radius:6px 6px 0 0;transition:height .4s;align-self:flex-end"></div>
        <div style="font-size:10px;color:var(--text2);text-align:center">${d.date}</div>
      </div>`;
  }).join('');
  
  // Objective line at 95%
  const objLine = Math.round(95 / maxScore * 140);
  
  const avgScore = Math.round(history.reduce((s,h) => s+(h.score/h.total*100), 0)/history.length);
  const bestScore = Math.max(...history.map(h => Math.round(h.score/h.total*100)));
  const streak = (() => {
    let s = 0;
    const today = getDayNumber();
    for (let i = today; i >= 0; i--) { if (history.find(h => h.day === i)) s++; else break; }
    return s;
  })();
  
  content.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px">
      <div class="stat-card"><div class="val" style="font-size:18px">${avgScore}%</div><div class="lbl">Moyenne</div></div>
      <div class="stat-card"><div class="val" style="font-size:18px;color:var(--green)">${bestScore}%</div><div class="lbl">Meilleur</div></div>
      <div class="stat-card"><div class="val" style="font-size:18px;color:var(--gold)">${streak}🔥</div><div class="lbl">Série</div></div>
    </div>
    
    <div class="progress-chart" style="margin:0 0 16px">
      <div style="font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text2);margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px">7 derniers quiz</div>
      <div style="position:relative;height:180px">
        <!-- Objective line -->
        <div style="position:absolute;bottom:${objLine}px;left:0;right:0;border-top:1.5px dashed var(--green);opacity:0.6;z-index:1">
          <span style="position:absolute;right:0;top:-18px;font-size:10px;color:var(--green);font-family:'Syne',sans-serif;font-weight:700">Objectif 95%</span>
        </div>
        <div style="display:flex;align-items:flex-end;gap:6px;height:100%;padding-top:24px">
          ${chartData.length > 0 ? bars : '<div style="color:var(--text2);font-size:14px;align-self:center;width:100%;text-align:center">Pas assez de données</div>'}
        </div>
      </div>
    </div>
    
    <div class="section-title">Historique complet</div>
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
      ${sorted.slice().reverse().slice(0,10).map(h => {
        const pct = Math.round(h.score/h.total*100);
        const color = pct>=95?'var(--green)':pct>=80?'var(--accent)':'var(--accent2)';
        return `<div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px">
          <div>
            <div style="font-size:13px;font-weight:500">${new Date(h.date).toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'})}</div>
            <div style="font-size:12px;color:var(--text2)">${formatTime(h.elapsed || 0)}</div>
          </div>
          <div style="margin-left:auto;text-align:right">
            <div style="font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:${color}">${pct}%</div>
            <div style="font-size:11px;color:var(--text2)">${h.score}/${h.total}</div>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
}

// ---- FICHES ----
const FICHES = [
  {
    icon:'🕐', color:'rgba(124,108,255,0.15)', title:'Les temps verbaux',
    sub:'Present, Past, Future, Perfect',
    content:`<p>Le TOEIC teste intensivement les temps. Voici les principaux :</p>
    <div class="rule"><div class="rule-dot"></div><p><strong>Present Perfect</strong> — Action passée liée au présent, avec "since", "for", "already", "yet", "just".<br><em>She has worked here since 2020.</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Present Perfect Continuous</strong> — Action commencée dans le passé, encore en cours.<br><em>They have been negotiating for three hours.</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Future Perfect</strong> — Action complète avant un moment futur, avec "by".<br><em>The report will have been submitted by Friday.</em></p></div>
    <div class="example">❌ She works here since 2020.<br>✅ She has worked here since 2020.</div>
    <p><strong>Indices temporels clés :</strong> "since" → present perfect | "by" → future perfect | "yesterday" → simple past | "nowadays" → present simple</p>`
  },
  {
    icon:'🔤', color:'rgba(255,108,157,0.15)', title:'Word Form (Forme des mots)',
    sub:'Noun, Verb, Adjective, Adverb',
    content:`<p>La question : "quelle forme du mot va ici ?" C'est très fréquent au TOEIC.</p>
    <div class="rule"><div class="rule-dot"></div><p><strong>Après "the/a/an/this/our..."</strong> → NOM<br><em>the <u>expansion</u>, a <u>proposal</u>, our <u>decision</u></em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Après "is/are/was/seems/become"</strong> → ADJECTIF<br><em>The plan is <u>comprehensive</u>. He seems <u>confident</u>.</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Modifie un verbe/adjectif</strong> → ADVERBE (-ly)<br><em>The project was <u>successfully</u> completed.</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Après un modal/auxiliaire</strong> → VERBE BASE<br><em>You should <u>submit</u> the form.</em></p></div>
    <div class="example">Suffixes utiles :<br>• NOMS : -tion, -ment, -ance, -ity, -ness<br>• ADJECTIFS : -al, -ive, -ful, -able, -ous<br>• ADVERBES : -ly<br>• VERBES : -ize, -fy, -en</div>`
  },
  {
    icon:'🔗', color:'rgba(6,214,160,0.15)', title:'Prépositions clés',
    sub:'Collocations essentielles TOEIC',
    content:`<p>Les prépositions sont toujours testées. Apprenez ces collocations par cœur :</p>
    <div class="rule"><div class="rule-dot"></div><p><strong>BY</strong> → deadline, méthode : <em>by Friday, by email, by reservation</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>FOR</strong> → durée, but : <em>for three months, apply for a job</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>IN</strong> → résultat : <em>result in, succeed in, interested in</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>ON</strong> → focus : <em>focus on, based on, depend on, on schedule</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>TO</strong> → destination/relation : <em>apply to, respond to, due to</em></p></div>
    <div class="example">Attention aux confusions TOEIC :<br>• "until" (durée continue) vs "by" (deadline)<br>• "since" (point de départ) vs "for" (durée)<br>• "during" (dans) vs "while" (pendant que)</div>`
  },
  {
    icon:'📎', color:'rgba(255,209,102,0.15)', title:'Pronoms et réflexifs',
    sub:'Who, Whom, Whose, Himself...',
    content:`<p>Les pronoms relatifs et réflexifs reviennent souvent en Part 5.</p>
    <div class="rule"><div class="rule-dot"></div><p><strong>WHO</strong> → sujet, pour les personnes<br><em>The manager <u>who</u> hired me is retiring.</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>WHOM</strong> → objet, pour les personnes<br><em>The candidate <u>whom</u> we interviewed was excellent.</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>WHOSE</strong> → possessif (personnes et choses)<br><em>The employee <u>whose</u> report won the award...</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>THAT / WHICH</strong> → pour les choses<br><em>The policy <u>that/which</u> was implemented last year...</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Réflexifs (-self/-selves)</strong> → sujet = objet<br><em>Please introduce <u>yourself</u>. They organized it <u>themselves</u>.</em></p></div>`
  },
  {
    icon:'🔀', color:'rgba(124,108,255,0.1)', title:'Conjonctions et connecteurs',
    sub:'Although, Unless, Despite, Therefore...',
    content:`<p>Très important en Part 5 et 6 ! Distinguez conjonctions et adverbes :</p>
    <div class="rule"><div class="rule-dot"></div><p><strong>CONJONCTIONS</strong> (+ clause avec verbe) :<br>Although, Because, Since, When, If, Unless, While, Whereas</p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>PRÉPOSITIONS</strong> (+ nom/groupe nominal) :<br>Despite, In spite of, Due to, Because of, During</p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>ADVERBES</strong> (début de phrase, virgule) :<br>However, Therefore, Moreover, Nevertheless, Furthermore</p></div>
    <div class="example">❌ Despite she was tired, she finished the report.<br>✅ Although she was tired, she finished the report.<br>✅ Despite her fatigue, she finished the report.</div>
    <p>UNLESS = if...not : <em>Unless you call us, we won't reserve your seat.</em></p>`
  },
  {
    icon:'📧', color:'rgba(255,108,157,0.1)', title:'Part 7 – Stratégie lecture',
    sub:'Maximise ton score en compréhension',
    content:`<p>La Part 7 représente ~54% du score de lecture. Stratégie optimale :</p>
    <div class="rule"><div class="rule-dot"></div><p><strong>1. Lis les questions d'abord</strong> — avant le texte, pour savoir quoi chercher (dates, chiffres, noms).</p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>2. Repère les mots-clés</strong> — les questions utilisent souvent des synonymes du texte.</p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>3. Méfie-toi des pièges</strong> — les distracteurs utilisent des mots du texte hors contexte.</p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>4. Questions d'inférence</strong> — "What can be inferred / What is implied?" → La réponse n'est pas textuelle, elle est déduite logiquement.</p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>5. Double passage</strong> — Une info dans le texte 1, une autre dans le texte 2 → croise les deux.</p></div>
    <div class="example">Gestion du temps Part 7 :<br>• Simple passage (2-3 Qs) : ~3-4 min<br>• Double passage (5 Qs) : ~6-7 min<br>• Budget total : ~55 min pour Part 7</div>`
  },
  {
    icon:'💼', color:'rgba(6,214,160,0.1)', title:'Vocabulaire Business essentiel',
    sub:'Les 50 mots incontournables TOEIC',
    content:`<p>Ces collocations sont les plus fréquentes au TOEIC :</p>
    <div class="rule"><div class="rule-dot"></div><p><strong>Conduire/Mener :</strong> <em>conduct a survey/meeting/interview</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Approuver :</strong> <em>approve a proposal/budget/merger</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Soumettre :</strong> <em>submit a report/application/form</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Assister :</strong> <em>attend a meeting/conference/seminar</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Demander :</strong> <em>request information/a refund/assistance</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Fournir :</strong> <em>provide services/support/details</em></p></div>
    <div class="example">Paires confusantes TOEIC :<br>• compliment (éloge) / complement (complément)<br>• affect (affecter) / effect (effet)<br>• principal (principal) / principle (principe)<br>• advise (conseiller) / advice (conseil)</div>`
  },
  {
    icon:'⚙️', color:'rgba(255,209,102,0.1)', title:'Voix passive',
    sub:'Was done, Will be sent, Has been approved...',
    content:`<p>La voix passive est très fréquente dans les documents professionnels TOEIC.</p>
    <div class="rule"><div class="rule-dot"></div><p><strong>Structure :</strong> BE + Past Participle<br>• Present: <em>is/are reviewed</em><br>• Past: <em>was/were submitted</em><br>• Future: <em>will be sent</em><br>• Present Perfect: <em>has/have been approved</em></p></div>
    <div class="rule"><div class="rule-dot"></div><p><strong>Quand utiliser :</strong> Quand le sujet de la phrase est la cible de l'action, ou quand le "doer" est inconnu/non-important.</p></div>
    <div class="example">✅ The new policy will be implemented next month.<br>✅ All applications must be submitted by June 30.<br>✅ The report has been reviewed by the committee.</div>
    <p>Astuce : En contexte professionnel, les notifications, mémos et annonces utilisent souvent le passif.</p>`
  },
];

function renderFiches() {
  const container = document.getElementById('fiches-content');
  container.innerHTML = FICHES.map((f, i) => `
    <div class="fiche-card" id="fiche-${i}">
      <div class="fiche-header" onclick="toggleFiche(${i})">
        <div class="fiche-icon" style="background:${f.color}">${f.icon}</div>
        <div>
          <div class="fiche-title">${f.title}</div>
          <div class="fiche-sub">${f.sub}</div>
        </div>
        <svg class="fiche-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="fiche-body">${f.content}</div>
    </div>
  `).join('');
}

function toggleFiche(i) {
  const card = document.getElementById('fiche-' + i);
  card.classList.toggle('open');
}

// ---- NAVIGATION ----
function goPage(name, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  
  if (name === 'results') renderResults();
  if (name === 'progress') renderProgress();
}

// ---- NOTIFICATIONS ----
function requestNotifPermission() {
  const asked = load('notif_asked', false);
  if (!asked && 'Notification' in window && Notification.permission === 'default') {
    setTimeout(() => {
      document.getElementById('notif-modal').style.display = 'flex';
    }, 3000);
  }
}

async function enableNotifs() {
  save('notif_asked', true);
  closeNotifModal();
  if (!('Notification' in window)) return;
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    scheduleNotification();
    showToast('🔔 Notifications activées !');
  }
}

function scheduleNotification() {
  const time = document.getElementById('notif-time')?.value || '20:00';
  save('notif_time', time);
  
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SCHEDULE_NOTIF',
      time: time
    });
  }
  
  // Web Notifications API fallback (will work when app is open)
  scheduleWebNotification(time);
}

function scheduleWebNotification(time) {
  const [h, m] = time.split(':').map(Number);
  const now = new Date();
  const notif = new Date();
  notif.setHours(h, m, 0, 0);
  if (notif <= now) notif.setDate(notif.getDate() + 1);
  const delay = notif - now;
  
  setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification('📚 TOEIC Master', {
        body: "C'est l'heure de ton quiz du jour ! 50 questions t'attendent.",
        icon: '/icon-192.png',
        badge: '/icon-192.png'
      });
    }
  }, delay);
}

function closeNotifModal() {
  save('notif_asked', true);
  document.getElementById('notif-modal').style.display = 'none';
}

// ---- INSTALL PWA ----
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('install-banner').style.display = 'flex';
  document.getElementById('install-banner-home').style.display = 'flex';
});

document.getElementById('install-btn')?.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      document.getElementById('install-banner').style.display = 'none';
    }
    deferredPrompt = null;
  }
});

// ---- TOAST ----
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--surface);border:1px solid var(--border);color:var(--text);padding:10px 20px;border-radius:50px;font-size:14px;z-index:300;animation:slideIn .3s ease;white-space:nowrap;';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// ---- SERVICE WORKER REGISTRATION ----
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// ---- BOOT ----
window.addEventListener('DOMContentLoaded', init);
