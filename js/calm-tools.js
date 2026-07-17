(()=>{
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reducedKey='mindmark-reduce-ambient';

  const setReduced=(value)=>{
    document.documentElement.classList.toggle('reduce-ambient',value);
    try{localStorage.setItem(reducedKey,value?'1':'0')}catch{}
    window.dispatchEvent(new CustomEvent('mindmark-motion-change',{detail:{reduced:value}}));
  };
  const toggle=$('#reduceAmbient');
  const initial=(()=>{try{return localStorage.getItem(reducedKey)==='1'}catch{return false}})();
  setReduced(initial);
  if(toggle){toggle.checked=initial;toggle.addEventListener('change',()=>setReduced(toggle.checked));}

  $('#startBreathingCalm')?.addEventListener('click',()=>$('#startBreathing')?.click());

  const sprite='../assets/icons.svg';
  const shuffle=(items)=>{
    const copy=[...items];
    for(let i=copy.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  };

  /* Rustig visueel zoeken */
  const iconPool=['i-leaf','i-flower','i-cup','i-moon','i-sun','i-heart'];
  const grid=$('#visualSearchGrid');
  const feedback=$('#visualSearchFeedback');
  function renderSearch(){
    if(!grid)return;
    feedback.textContent='';
    feedback.classList.remove('success');
    const total=42;
    const target=Math.floor(Math.random()*total);
    const icons=shuffle(Array.from({length:total},(_,i)=>i===target?'i-fox':iconPool[Math.floor(Math.random()*iconPool.length)]));
    grid.innerHTML=icons.map((icon,i)=>`<button type="button" class="search-tile" data-target="${icon==='i-fox'?'1':'0'}" aria-label="Zoektegel ${i+1}"><svg><use href="${sprite}#${icon}"/></svg></button>`).join('');
    $$('.search-tile',grid).forEach(btn=>btn.addEventListener('click',()=>{
      if(btn.dataset.target==='1'){
        $$('.search-tile',grid).forEach(tile=>tile.disabled=true);
        btn.classList.add('found');
        feedback.textContent='Gevonden. Laat je schouders zakken en neem één rustige ademhaling.';
        feedback.classList.add('success');
      }else{
        btn.classList.add('tapped');
        setTimeout(()=>btn.classList.remove('tapped'),280);
      }
    }));
  }
  $('#newSearchScene')?.addEventListener('click',renderSearch);
  renderSearch();

  /* Kleurenspeurtocht */
  const huntColors=[
    {name:'zacht geel',value:'#F2C94C'},
    {name:'bladgroen',value:'#6E9E75'},
    {name:'warm beige',value:'#CBB89D'},
    {name:'hemelsblauw',value:'#9DC5CE'},
    {name:'zacht terracotta',value:'#C98267'},
    {name:'gebroken wit',value:'#F4EFE3'}
  ];
  let huntIndex=0;
  const huntSwatch=$('#colorHuntSwatch');
  const huntName=$('#colorHuntName');
  const huntFeedback=$('#colorHuntFeedback');
  const huntChecks=$('#colorHuntChecks');
  function renderColorHunt(next=false){
    if(!huntSwatch||!huntName||!huntChecks)return;
    if(next)huntIndex=(huntIndex+1)%huntColors.length;
    const color=huntColors[huntIndex];
    huntSwatch.style.background=color.value;
    huntName.textContent=color.name;
    huntFeedback.textContent='';
    huntFeedback.classList.remove('success');
    $$('button',huntChecks).forEach(btn=>{btn.classList.remove('found');btn.disabled=false;});
  }
  huntChecks?.addEventListener('click',event=>{
    const btn=event.target.closest('button');
    if(!btn||btn.classList.contains('found'))return;
    btn.classList.add('found');
    btn.disabled=true;
    const count=$$('button.found',huntChecks).length;
    huntFeedback.textContent=count<3?`${count} gevonden. Kijk rustig verder wanneer je wil.`:'Drie gevonden. Je aandacht is even naar het hier en nu gegaan.';
    if(count===3)huntFeedback.classList.add('success');
  });
  $('#newColorHunt')?.addEventListener('click',()=>renderColorHunt(true));
  renderColorHunt();

  /* Keien ordenen */
  const pebbleField=$('#pebbleField');
  const pebbleTray=$('#pebbleTray');
  const pebbleFeedback=$('#pebbleFeedback');
  let nextPebble=1;
  function renderPebbles(){
    if(!pebbleField||!pebbleTray)return;
    nextPebble=1;
    pebbleTray.innerHTML='';
    pebbleFeedback.textContent='Begin met de kleinste kei.';
    pebbleFeedback.classList.remove('success');
    const ranks=shuffle([1,2,3,4,5]);
    pebbleField.innerHTML=ranks.map(rank=>`<button type="button" class="pebble pebble-${rank}" data-rank="${rank}" aria-label="Kei grootte ${rank}"><span aria-hidden="true"></span></button>`).join('');
  }
  pebbleField?.addEventListener('click',event=>{
    const pebble=event.target.closest('.pebble');
    if(!pebble)return;
    const rank=Number(pebble.dataset.rank);
    if(rank!==nextPebble){
      pebble.classList.add('gentle-nudge');
      pebbleFeedback.textContent='Geen haast. Kies de kleinste kei die nog overblijft.';
      setTimeout(()=>pebble.classList.remove('gentle-nudge'),380);
      return;
    }
    pebble.classList.add('placed');
    pebble.disabled=true;
    pebbleTray.append(pebble);
    nextPebble++;
    if(nextPebble>5){
      pebbleFeedback.textContent='Mooi geordend. Neem één moment om naar de rustige rij te kijken.';
      pebbleFeedback.classList.add('success');
    }else{
      pebbleFeedback.textContent=`Goed. Zoek nu kei ${nextPebble} van 5.`;
    }
  });
  $('#newPebbleRound')?.addEventListener('click',renderPebbles);
  renderPebbles();

  /* 5-4-3-2-1 grounding */
  const grounding=[
    'Noem vijf dingen die je ziet.',
    'Noem vier dingen die je lichamelijk voelt.',
    'Noem drie geluiden die je hoort.',
    'Noem twee geuren die je opmerkt of fijn vindt.',
    'Noem één ding dat je nu nodig hebt.'
  ];
  let step=0;
  let completed=false;
  const prompt=$('#groundingPrompt');
  const count=$('#groundingCount');
  const bar=$('#groundingProgressBar');
  const input=$('#groundingInput');
  const back=$('#groundingBack');
  const next=$('#groundingNext');
  function renderGrounding(){
    if(!prompt)return;
    if(completed){
      prompt.textContent='Je bent weer even hier.';
      count.textContent='Oefening afgerond';
      bar.style.width='100%';
      input.value='';
      input.placeholder='Neem rustig de tijd om verder te gaan.';
      input.disabled=true;
      back.disabled=true;
      next.textContent='Opnieuw';
      return;
    }
    prompt.textContent=grounding[step];
    count.textContent=`Stap ${step+1} van ${grounding.length}`;
    bar.style.width=`${((step+1)/grounding.length)*100}%`;
    back.disabled=step===0;
    next.textContent=step===grounding.length-1?'Rond rustig af':'Volgende';
    input.value='';
    input.disabled=false;
    input.placeholder='Je hoeft dit niet perfect te formuleren.';
  }
  back?.addEventListener('click',()=>{
    if(completed)return;
    if(step>0){step--;renderGrounding();}
  });
  next?.addEventListener('click',()=>{
    if(completed){completed=false;step=0;renderGrounding();return;}
    if(step<grounding.length-1){step++;renderGrounding();}
    else{completed=true;renderGrounding();}
  });
  renderGrounding();

  /* Zelfcompassie */
  $('#kindSentenceDone')?.addEventListener('click',()=>{
    const text=$('#kindSentence')?.value.trim();
    const out=$('#kindSentenceFeedback');
    out.textContent=text?'Dank je. Ook jij mag die vriendelijkheid ontvangen.':'Je mag beginnen met iets heel kleins, zoals: “Ik hoef dit niet alleen te dragen.”';
    out.classList.add('success');
  });

  const requested=new URLSearchParams(location.search).get('view');
  if(requested){setTimeout(()=>document.querySelector(`[data-view="${CSS.escape(requested)}"]`)?.click(),500);}
})();
