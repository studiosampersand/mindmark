(()=>{
  const tiles=[...document.querySelectorAll('.icon-tile use')];
  const icons=['i-heart','i-sun','i-connection','i-spark','i-breathe','i-check','i-thumb','i-target','i-leaf','i-flower'];
  let cursor=0,timer=null,ticking=false;
  const systemReduced=matchMedia('(prefers-reduced-motion: reduce)');
  const manuallyReduced=()=>{try{return localStorage.getItem('mindmark-reduce-ambient')==='1'}catch{return false}};
  const isReduced=()=>systemReduced.matches||manuallyReduced()||document.documentElement.classList.contains('reduce-ambient');
  function stop(){if(timer){clearInterval(timer);timer=null}}
  function start(){
    stop(); if(!tiles.length||isReduced())return;
    timer=setInterval(()=>{
      const use=tiles[cursor%tiles.length],tile=use.closest('.icon-tile');
      tile.classList.add('swap');
      setTimeout(()=>{
        if(isReduced())return tile.classList.remove('swap');
        const current=(use.getAttribute('href')||'').split('#')[1];
        const choices=icons.filter(x=>x!==current);
        use.setAttribute('href',`../assets/icons.svg#${choices[Math.floor(Math.random()*choices.length)]}`);
        tile.classList.remove('swap');
      },320);cursor++;
    },2400);
  }
  function onScroll(){if(isReduced()||ticking)return;ticking=true;requestAnimationFrame(()=>{document.documentElement.style.setProperty('--parallax-y',`${scrollY}px`);ticking=false})}
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('mindmark-motion-change',()=>{document.documentElement.style.setProperty('--parallax-y','0px');start()});
  systemReduced.addEventListener?.('change',start);
  start();
})();
