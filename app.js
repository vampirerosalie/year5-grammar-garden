(function(){
  'use strict';
  const units=window.GRAMMAR_UNITS||[];
  const tabs=document.getElementById('unit-tabs');
  const panel=document.getElementById('unit-panel');
  const revealAll=document.getElementById('reveal-all');
  let active=0, allShown=false;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function renderTabs(){tabs.innerHTML=units.map((u,i)=>`<button class="unit-tab" id="tab-${u.id}" role="tab" type="button" aria-selected="${i===active}" aria-controls="unit-panel" tabindex="${i===active?0:-1}" data-index="${i}">${esc(u.label)}</button>`).join('');}
  function renderUnit(){const u=units[active];panel.className='unit-panel '+u.color;panel.setAttribute('aria-labelledby','tab-'+u.id);panel.innerHTML=`<div class="unit-top"><div><span class="unit-badge">${esc(u.label.toUpperCase())}</span><h3>${esc(u.title)}</h3><p>${esc(u.intro)}</p></div><span class="unit-count" aria-label="${u.lessons.length} grammar ideas">${u.lessons.length} ideas</span></div><div class="lesson-grid ${u.lessons.length===2?'two':''}">${u.lessons.map(l=>`<article class="lesson-card"><span class="lesson-number">${l.number}</span><h4>${esc(l.title)}</h4><p>${esc(l.rule)}</p><div class="pattern">${esc(l.pattern)}</div><button class="reveal-button" type="button" aria-expanded="${allShown}" aria-controls="reveal-${l.number}" data-reveal="${l.number}">${allShown?'Hide':'Reveal'} example <span aria-hidden="true">${allShown?'↑':'↓'}</span></button><div id="reveal-${l.number}" class="reveal-content" ${allShown?'':'hidden'}><strong>Fresh example</strong><p>${esc(l.example)}</p><p class="notice"><strong>Notice this</strong>${esc(l.notice)}</p></div></article>`).join('')}</div>`;}
  tabs.addEventListener('click',e=>{const button=e.target.closest('[data-index]');if(!button)return;active=Number(button.dataset.index);renderTabs();renderUnit();document.getElementById('tab-'+units[active].id).focus();});
  tabs.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();active=e.key==='Home'?0:e.key==='End'?units.length-1:(active+(e.key==='ArrowRight'?1:-1)+units.length)%units.length;renderTabs();renderUnit();document.getElementById('tab-'+units[active].id).focus();});
  panel.addEventListener('click',e=>{const button=e.target.closest('[data-reveal]');if(!button)return;const target=document.getElementById('reveal-'+button.dataset.reveal);const show=target.hidden;target.hidden=!show;button.setAttribute('aria-expanded',String(show));button.innerHTML=(show?'Hide':'Reveal')+' example <span aria-hidden="true">'+(show?'↑':'↓')+'</span>';});
  revealAll.addEventListener('click',()=>{allShown=!allShown;revealAll.setAttribute('aria-pressed',String(allShown));revealAll.textContent=allShown?'Hide all examples':'Reveal all examples';renderUnit();});
  if(units.length){renderTabs();renderUnit();}

  const frame=document.getElementById('quiz-frame');
  const openForm=document.getElementById('open-form');
  const status=document.getElementById('form-status');
  function validForm(raw){try{const u=new URL(raw);if(u.protocol!=='https:'||u.hostname!=='docs.google.com')return null;if(!/^\/forms\/d\/(?:e\/)?[^/]+\/viewform\/?$/.test(u.pathname))return null;u.search='';u.hash='';return u.toString();}catch{return null;}}
  const params=new URLSearchParams(location.search);
  const override=validForm(params.get('form')||'');
  const master=validForm(window.MASTER_FORM_URL||'');
  const selected=override||master;
  if(selected){const embed=new URL(selected);embed.searchParams.set('embedded','true');frame.src=embed.toString();openForm.href=selected;status.textContent=override?'Your teacher’s Form is ready below.':'The revision Form is ready below.';}else{frame.hidden=true;openForm.hidden=true;status.textContent='The revision Form is being prepared. Please check back shortly.';}
  const formInput=document.getElementById('teacher-form-url');
  const message=document.getElementById('setup-message');
  const generatedWrap=document.getElementById('generated-link-wrap');
  const generated=document.getElementById('generated-link');
  document.getElementById('generate-link').addEventListener('click',()=>{const parsed=validForm(formInput.value.trim());if(!parsed){message.className='setup-message';message.textContent='Paste the full Google Forms student link ending in /viewform. Open the Form and copy its published link.';generatedWrap.hidden=true;return;}const url=new URL(location.href);url.hash='revision';url.searchParams.set('form',parsed);generated.value=url.toString();generatedWrap.hidden=false;message.className='setup-message success';message.textContent='Your class link is ready. Open it once to check your Form before sharing.';});
  document.getElementById('copy-link').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(generated.value);message.className='setup-message success';message.textContent='Class link copied.';}catch{generated.select();message.className='setup-message';message.textContent='Select and copy the student link above.';}});
})();

