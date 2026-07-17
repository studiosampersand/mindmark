(()=>{
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

  const iconPool=['i-leaf','i-flower','i-cup','i-moon','i-sun','i-heart'];
  const grid=$('#visualSearchGrid');
  const feedback=$('#visualSearchFeedback');
  const sprite='../assets/icons.svg';
  function shuffle(items){for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]]}return items}
  function renderSearch(){
    if(!grid)return;
    feedback.textContent=''; feedback.classList.remove('success');
    const total=42,target=Math.floor(Math.random()*total);
    const icons=shuffle(Array.from({length:total},(_,i)=>i===target?'i-fox':iconPool[Math.floor(Math.random()*iconPool.length)]));
    grid.innerHTML=icons.map((icon,i)=>`<button type="button" class="search-tile" data-target="${icon==='i-fox'?'1':'0'}" aria-label="Zoektegel ${i+1}"><svg><use href="${sprite}#${icon}"/></svg></button>`).join('');
    $$('.search-tile',grid).forEach(btn=>btn.addEventListener('click',()=>{
      if(btn.dataset.target==='1'){
        btn.classList.add('found');
        feedback.textContent='Gevonden. Laat je schouders zakken en neem één rustige ademhaling.';
        feedback.classList.add('success');
      }else{
        btn.classList.add('tapped');setTimeout(()=>btn.classList.remove('tapped'),280);
      }
    }));
  }
  $('#newSearchScene')?.addEventListener('click',renderSearch);
  renderSearch();

  const grounding=[
    'Noem vijf dingen die je ziet.',
    'Noem vier dingen die je lichamelijk voelt.',
    'Noem drie geluiden die je hoort.',
    'Noem twee geuren die je opmerkt of fijn vindt.',
    'Noem één ding dat je nu nodig hebt.'
  ];
  let step=0;
  const prompt=$('#groundingPrompt'),count=$('#groundingCount'),bar=$('#groundingProgressBar'),input=$('#groundingInput'),back=$('#groundingBack'),next=$('#groundingNext');
  function renderGrounding(){
    if(!prompt)return;
    prompt.textContent=grounding[step]; count.textContent=`Stap ${step+1} van ${grounding.length}`; bar.style.width=`${((step+1)/grounding.length)*100}%`; back.disabled=step===0; next.textContent=step===grounding.length-1?'Rond rustig af':'Volgende'; input.value=''; input.focus({preventScroll:true});
  }
  back?.addEventListener('click',()=>{if(step>0){step--;renderGrounding()}});
  next?.addEventListener('click',()=>{
    if(step<grounding.length-1){step++;renderGrounding()}else{
      prompt.textContent='Je bent weer even hier.';count.textContent='Oefening afgerond';bar.style.width='100%';input.value='';input.placeholder='Neem rustig de tijd om verder te gaan.';next.textContent='Opnieuw';step=-1;
    }
    if(step===-1) next.onclick=()=>{next.onclick=null;step=0;input.placeholder='Je hoeft dit niet perfect te formuleren.';renderGrounding()};
  });
  renderGrounding();

  $('#kindSentenceDone')?.addEventListener('click',()=>{
    const text=$('#kindSentence')?.value.trim();
    const out=$('#kindSentenceFeedback');
    out.textContent=text?'Dank je. Ook jij mag die vriendelijkheid ontvangen.':'Je mag beginnen met iets heel kleins, zoals: “Ik hoef dit niet alleen te dragen.”';
    out.classList.add('success');
  });

  const requested=new URLSearchParams(location.search).get('view');
  if(requested){setTimeout(()=>document.querySelector(`[data-view="${CSS.escape(requested)}"]`)?.click(),500)}
})();
