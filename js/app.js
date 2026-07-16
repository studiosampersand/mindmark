(() => {
  'use strict';
  const APP_NS = document.body.dataset.appNamespace || 'mindmark';
  const state = { profile:null, checkins:[], challenges:[], logs:[], settings:{tutorialDone:false} };
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const todayISO = () => new Date().toISOString().slice(0,10);
  const uid = () => crypto.randomUUID ? crypto.randomUUID() : Date.now()+'-'+Math.random().toString(16).slice(2);

  const DB = {
    db:null,
    async open(){ return new Promise((resolve,reject)=>{ const req=indexedDB.open(APP_NS+'-db',2); req.onupgradeneeded=()=>{const db=req.result; ['profile','checkins','challenges','logs','settings'].forEach(s=>{if(!db.objectStoreNames.contains(s)) db.createObjectStore(s,{keyPath:'id'});});}; req.onsuccess=()=>{this.db=req.result;resolve();}; req.onerror=()=>reject(req.error); }); },
    async all(store){ return new Promise((res,rej)=>{const r=this.db.transaction(store).objectStore(store).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});},
    async put(store,val){ return new Promise((res,rej)=>{const r=this.db.transaction(store,'readwrite').objectStore(store).put(val);r.onsuccess=()=>res();r.onerror=()=>rej(r.error);});},
    async del(store,id){ return new Promise((res,rej)=>{const r=this.db.transaction(store,'readwrite').objectStore(store).delete(id);r.onsuccess=()=>res();r.onerror=()=>rej(r.error);});},
    async clear(store){ return new Promise((res,rej)=>{const r=this.db.transaction(store,'readwrite').objectStore(store).clear();r.onsuccess=()=>res();r.onerror=()=>rej(r.error);});}
  };

  async function load(){
    await DB.open();
    const [profiles,checkins,challenges,logs,settings] = await Promise.all(['profile','checkins','challenges','logs','settings'].map(s=>DB.all(s)));
    state.profile = profiles[0] || {id:'profile',name:'',country:'BE',language:'nl'};
    state.checkins=checkins.sort((a,b)=>a.date.localeCompare(b.date)); state.challenges=challenges; state.logs=logs; state.settings=settings[0]||{id:'settings',tutorialDone:false};
    renderAll();
    if(!state.settings.tutorialDone) openTutorial();
  }

  function showView(id){ $$('.view').forEach(v=>v.classList.toggle('active',v.id===id)); $$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===id)); window.scrollTo({top:0,behavior:'smooth'}); }
  function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2800); }
  function escapeHTML(v=''){ return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

  function renderAll(){
    $('#displayDate').textContent=new Intl.DateTimeFormat('nl-BE',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
    renderDashboard(); renderChallenges(); renderInsights(); renderReport(); renderSettings();
  }

  function renderDashboard(){
    const today=state.checkins.find(c=>c.date===todayISO());
    if(today){ $('#checkinStatus').innerHTML=`<div class="notice">Je check-in van vandaag is bewaard. <button class="btn ghost" id="editToday">Aanpassen</button></div>`; $('#checkinForm').hidden=true; $('#editToday')?.addEventListener('click',()=>prefillCheckin(today)); }
    else { $('#checkinForm').hidden=false; $('#checkinStatus').innerHTML=''; resetScores(); }
    const recent=state.checkins.slice(-7), avg=recent.length?(recent.reduce((s,c)=>s+c.mood,0)/recent.length).toFixed(1):'–';
    $('#weekAverage').textContent=avg; $('#loggedDays').textContent=state.checkins.length; $('#activeChallenges').textContent=state.challenges.filter(c=>!c.completed).length;
    const list=$('#dashboardChallenges'); const active=state.challenges.filter(c=>!c.completed).slice(0,3);
    list.innerHTML=active.length?active.map(challengeHTML).join(''):'<div class="empty">Nog geen actieve uitdaging. Kies iets kleins dat bij jou past.</div>';
    bindChallengeActions();
  }

  function resetScores(){ $$('.score-btn').forEach(b=>b.classList.remove('selected')); }
  function prefillCheckin(c){ $('#checkinForm').hidden=false; $('#checkinStatus').innerHTML=''; ['mood','body','energy','day'].forEach(k=>{const b=$(`.score-btn[data-q="${k}"][data-score="${c[k]}"]`);b?.classList.add('selected');}); $('#note').value=c.note||''; $('#checkinForm').dataset.editId=c.id; }
  function selectedScore(q){ return Number($(`.score-btn.selected[data-q="${q}"]`)?.dataset.score||0); }

  function detectCrisis(text){
    const t=text.toLowerCase();
    const acute=['ik ga mezelf doden','ik ga zelfmoord plegen','ik wil mezelf doden','ik heb een plan','ik doe mezelf nu iets aan','ik heb pillen genomen','ik heb een overdosis genomen'];
    const serious=['ik wil niet meer leven','ik wil dood','zelfmoord','suïcidaal','levensmoe','mezelf iets aandoen','geen reden om te leven','het hoeft niet meer'];
    if(acute.some(x=>t.includes(x))) return 3; if(serious.some(x=>t.includes(x))) return 2; return 0;
  }
  function openCrisis(level){
    const modal=$('#crisisModal');
    $('#crisisTitle').textContent=level===3?'Je hoeft dit moment niet alleen te dragen':'Misschien is praten met een echt persoon nu helpend';
    $('#crisisCopy').textContent=level===3?'Wat je schrijft klinkt alsof er mogelijk onmiddellijk gevaar is. Bel 112 of vraag iemand in je buurt om bij je te blijven.':'Dat klinkt alsof het even helemaal genoeg is geweest. Je kan gratis en anoniem met iemand spreken bij Zelfmoordlijn 1813. Ze zijn telefonisch dag en nacht bereikbaar.';
    $('#callPrimary').href=level===3?'tel:112':'tel:1813'; $('#callPrimary').textContent=level===3?'Bel 112':'Bel 1813'; modal.classList.add('open');
  }

  function challengeHTML(c){ const pct=Math.min(100,Math.round((c.progress/c.target)*100)); return `<div class="challenge-card"><div class="grow"><strong>${escapeHTML(c.title)}</strong><div class="small">${c.progress} van ${c.target} ${escapeHTML(c.unitLabel||'keer')}</div><div class="progress"><span style="width:${pct}%"></span></div></div><button class="btn secondary log-challenge" data-id="${c.id}">+1</button></div>`; }
  function bindChallengeActions(){ $$('.log-challenge').forEach(b=>b.onclick=async()=>{const c=state.challenges.find(x=>x.id===b.dataset.id); if(!c)return;c.progress++; state.logs.push({id:uid(),challengeId:c.id,date:todayISO(),value:1}); await DB.put('logs',state.logs.at(-1)); if(c.progress>=c.target){c.completed=true;c.completedAt=todayISO();await DB.put('challenges',c);openCelebrate(c);}else{await DB.put('challenges',c);toast('Geregistreerd. Elke stap telt.');}renderAll();}); }

  function renderChallenges(){
    const active=state.challenges.filter(c=>!c.completed), done=state.challenges.filter(c=>c.completed);
    $('#challengeList').innerHTML=active.length?active.map(challengeHTML).join(''):'<div class="empty">Kies een veilige, zelfverbeterende tracker uit onze bibliotheek.</div>';
    $('#completedList').innerHTML=done.length?done.map(c=>`<div class="challenge-card celebrate"><div class="grow"><strong>✓ ${escapeHTML(c.title)}</strong><div class="small">Behaald op ${new Intl.DateTimeFormat('nl-BE').format(new Date(c.completedAt))}</div></div></div>`).join(''):'<div class="small">Je behaalde uitdagingen verschijnen hier.</div>';
    bindChallengeActions();
  }

  function openCelebrate(c){ $('#celebrateTitle').textContent=`Je hebt “${c.title}” behaald`; $('#celebrateModal').classList.add('open'); $('#celebrateModal').dataset.challengeId=c.id; }

  function renderTrackerLibrary(){ const wrap=$('#trackerLibrary'); wrap.innerHTML=window.MINDMARK_TRACKERS.map(g=>`<section class="tracker-group card"><h3>${g.group}</h3>${g.items.map(i=>`<label class="tracker-item"><input type="radio" name="tracker" value="${i[0]}" data-title="${i[1]}" data-unit="${i[2]}"><span>${i[1]}</span></label>`).join('')}</section>`).join(''); }

  function renderInsights(){
    const last30=state.checkins.slice(-30); const vals=last30.map(c=>c.mood); const counts=[1,2,3,4,5].map(v=>vals.filter(x=>x===v).length); $('#insightBars').innerHTML=counts.map((n,i)=>`<div class="bar" style="height:${Math.max(8,n/(Math.max(...counts,1))*100)}%"><small>${i+1}</small></div>`).join('');
    const positive=vals.filter(v=>v>=4).length, difficult=vals.filter(v=>v<=2).length; $('#patternCopy').textContent=!vals.length?'Na enkele check-ins verschijnen hier rustige, feitelijke patronen.':positive>difficult?`Je registreerde ${positive} positieve en ${difficult} moeilijke dagen in deze periode.`:`Je registreerde ${difficult} moeilijke en ${positive} positieve dagen. Dit kan nuttig zijn om met iemand te bespreken.`;
    const cal=$('#calendar'); const now=new Date(), y=now.getFullYear(),m=now.getMonth(),days=new Date(y,m+1,0).getDate(),first=(new Date(y,m,1).getDay()+6)%7; cal.innerHTML='<div class="small">ma</div><div class="small">di</div><div class="small">wo</div><div class="small">do</div><div class="small">vr</div><div class="small">za</div><div class="small">zo</div>'+Array(first).fill('<div></div>').join('')+Array.from({length:days},(_,i)=>{const d=`${y}-${String(m+1).padStart(2,'0')}-${String(i+1).padStart(2,'0')}`,c=state.checkins.find(x=>x.date===d);return `<div class="day ${c?'has-'+c.mood:''}" title="${c?'Stemming '+c.mood:'Geen check-in'}">${i+1}</div>`}).join('');
  }

  function renderReport(){ const n=state.checkins.length; $('#reportCount').textContent=n; if(!n){$('#reportNarrative').textContent='Nog onvoldoende registraties voor een samenvatting.';return;} const avg=(state.checkins.reduce((s,c)=>s+c.mood,0)/n).toFixed(1); const low=state.checkins.filter(c=>c.mood<=2).length; $('#reportNarrative').textContent=`Over ${n} geregistreerde dagen was je gemiddelde stemmingsscore ${avg} op 5. Je registreerde ${low} moeilijke dagen. Dit zijn persoonlijke registraties, geen medische conclusie.`; }
  function renderSettings(){ $('#profileName').value=state.profile.name||''; $('#country').value=state.profile.country||'BE'; }

  function openTutorial(){ $('#tutorialModal').classList.add('open'); let step=0; const slides=$$('.tutorial-slide'), dots=$$('.tutorial-dot'); const paint=()=>{slides.forEach((s,i)=>s.hidden=i!==step);dots.forEach((d,i)=>d.classList.toggle('active',i===step));$('#tutorialNext').textContent=step===slides.length-1?'Start MindMark':'Volgende';}; $('#tutorialNext').onclick=async()=>{if(step<slides.length-1){step++;paint();}else{state.settings.tutorialDone=true;await DB.put('settings',state.settings);$('#tutorialModal').classList.remove('open');}};paint(); }

  document.addEventListener('click',e=>{
    const view=e.target.closest('[data-view]'); if(view)showView(view.dataset.view);
    const close=e.target.closest('[data-close]'); if(close)close.closest('.modal-backdrop').classList.remove('open');
  });
  $$('.score-btn').forEach(b=>b.addEventListener('click',()=>{$$(`.score-btn[data-q="${b.dataset.q}"]`).forEach(x=>x.classList.remove('selected'));b.classList.add('selected');}));
  $('#checkinForm')?.addEventListener('submit',async e=>{e.preventDefault();const vals={mood:selectedScore('mood'),body:selectedScore('body'),energy:selectedScore('energy'),day:selectedScore('day')};if(Object.values(vals).some(v=>!v)){toast('Kies bij elke vraag een antwoord.');return;} const note=$('#note').value.trim(), level=detectCrisis(note); const id=e.currentTarget.dataset.editId||uid();const item={id,date:todayISO(),...vals,note};await DB.put('checkins',item);const idx=state.checkins.findIndex(c=>c.id===id);if(idx>=0)state.checkins[idx]=item;else state.checkins.push(item);delete e.currentTarget.dataset.editId;e.currentTarget.reset();resetScores();renderAll();toast('Je check-in is veilig lokaal bewaard.');if(level)openCrisis(level);});
  $$('[id="newChallenge"]').forEach(btn=>btn.addEventListener('click',()=>{renderTrackerLibrary();$('#challengeModal').classList.add('open');}));
  $('#challengeForm')?.addEventListener('submit',async e=>{e.preventDefault();const selected=$('input[name="tracker"]:checked');if(!selected){toast('Kies eerst een tracker.');return;}const target=Math.max(1,Number($('#challengeTarget').value||1));const title=selected.dataset.title, type=selected.dataset.unit;const unitLabel=type==='minutes'?'minuten':type==='count'?'keer':'dagen';const c={id:uid(),tracker:selected.value,title,target,progress:0,unitLabel,createdAt:todayISO(),completed:false};state.challenges.push(c);await DB.put('challenges',c);$('#challengeModal').classList.remove('open');e.currentTarget.reset();renderAll();toast('Uitdaging toegevoegd. Jij bepaalt het tempo.');});
  $('#celebrateForm')?.addEventListener('submit',async e=>{e.preventDefault();const id=$('#celebrateModal').dataset.challengeId,c=state.challenges.find(x=>x.id===id);if(c){c.reflection=$('#achievementFeeling').value;c.nextChoice=$('input[name="nextChoice"]:checked')?.value||'later';await DB.put('challenges',c);}$('#celebrateModal').classList.remove('open');$('#achievementFeeling').value=''; if(c?.nextChoice==='new'){$('[id="newChallenge"]').click();}else toast('Je prestatie en reflectie zijn bewaard.');});
  $('#printReport')?.addEventListener('click',()=>{showView('reportView');setTimeout(()=>window.print(),100)});
  $('#exportData')?.addEventListener('click',()=>{const blob=new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),...state},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`mindmark-backup-${todayISO()}.json`;a.click();URL.revokeObjectURL(a.href);});
  $('#saveSettings')?.addEventListener('click',async()=>{state.profile.name=$('#profileName').value.trim();state.profile.country=$('#country').value;await DB.put('profile',state.profile);toast('Instellingen lokaal bewaard.');});
  $('#restartTutorial')?.addEventListener('click',openTutorial);
  $('#wipeData')?.addEventListener('click',async()=>{if(!confirm('Alle lokale MindMark-gegevens definitief verwijderen?'))return;await Promise.all(['profile','checkins','challenges','logs','settings'].map(s=>DB.clear(s)));location.reload();});
  if('serviceWorker' in navigator) navigator.serviceWorker.register('../service-worker.js').catch(()=>{});
  load().catch(err=>{console.error(err);toast('Lokale opslag kon niet worden geopend.');});
})();
