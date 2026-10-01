const theme = document.querySelector('#theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
theme.hidden = false;
function effectiveTheme() {return document.documentElement.dataset.theme || (prefersDark.matches?'dark':'light');}
function themeLabel() {theme.setAttribute('aria-label',`Use ${effectiveTheme()==='dark'?'light':'dark'} theme`);}
theme.addEventListener('click',()=>{const next=effectiveTheme()==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('tool-shelf-theme',next)}catch{}themeLabel();});
prefersDark.addEventListener('change',themeLabel);themeLabel();
const finder=document.querySelector('.finder');
if(finder) {
  finder.hidden=false;
  const input=document.querySelector('#search'), clear=document.querySelector('#clear');
  const cards=[...document.querySelectorAll('.tool')], filters=[...document.querySelectorAll('[data-filter]')];
  let group='all';
  function update() {const words=input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);let count=0;for(const card of cards){const show=(group==='all'||card.dataset.group===group)&&words.every(w=>card.dataset.search.includes(w));card.hidden=!show;if(show)count++;}document.querySelector('.results').textContent=`${count} ${count===1?'tool':'tools'}${words.length?' matching your search':''}`;document.querySelector('.empty').hidden=count!==0;clear.hidden=!input.value;for(const f of filters)f.setAttribute('aria-pressed',String(f.dataset.filter===group));}
  input.addEventListener('input',update);for(const f of filters)f.addEventListener('click',()=>{group=f.dataset.filter;update();});
  clear.addEventListener('click',()=>{input.value='';update();input.focus();});
  document.querySelector('#reset').addEventListener('click',()=>{input.value='';group='all';update();input.focus();});
}
