/* MV Design Studio — mockup v1 shared behaviour (all v1 pages) */

// Transparent nav over the hero; turns white once scrolled
function updateNav(){
  var nav=document.getElementById('nav');
  if(nav)nav.classList.toggle('scrolled',window.scrollY>10);
}
(function(){
  window.addEventListener('scroll',updateNav,{passive:true});updateNav();
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu()});

  // Active nav link = current page (body[data-page])
  var page=document.body.getAttribute('data-page');
  if(page){
    document.querySelectorAll('.nav-links a[data-page], .mm-links a[data-page]').forEach(function(l){
      l.classList.toggle('active',l.getAttribute('data-page')===page);
    });
  }

  // Scroll reveal
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduce){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}});
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    items.forEach(function(el){io.observe(el)});
  }else{items.forEach(function(el){el.classList.add('in-view')})}

  // Count-up stats
  var counters=document.querySelectorAll('[data-count]');
  function animate(el){
    var target=+el.getAttribute('data-count'),start=null,dur=1600;
    function step(ts){if(!start)start=ts;var p=Math.min((ts-start)/dur,1);var e=1-Math.pow(1-p,3);el.textContent=Math.round(target*e);if(p<1)requestAnimationFrame(step)}
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window && !reduce){
    var cio=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){animate(e.target);cio.unobserve(e.target)}})},{threshold:.5});
    counters.forEach(function(c){cio.observe(c)});
  }else{counters.forEach(function(c){c.textContent=c.getAttribute('data-count')})}
})();

function closeMenu(){document.body.classList.remove('nav-open');updateNav()}

// Testimonial carousel arrows (phone widths on the home page)
function slideTesti(dir){
  var g=document.getElementById('testiGrid');
  if(!g)return;
  var card=g.querySelector('.testi');
  g.scrollBy({left:dir*(card.offsetWidth+16),behavior:'smooth'});
}

// Portfolio category filter: cards fade out, grid height eases, matching cards slide in staggered
function filterFolio(btn){
  if(btn.classList.contains('is-active')||document.body.classList.contains('is-filtering'))return;
  var cat=btn.getAttribute('data-filter');
  var label=btn.getAttribute('data-label')||btn.firstChild.textContent.trim();
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cards=[].slice.call(document.querySelectorAll('.folio[data-cat]'));
  var grid=cards.length?cards[0].parentNode:null;
  var count=document.getElementById('folioCount');
  btn.parentNode.querySelectorAll('button').forEach(function(b){b.classList.toggle('is-active',b===btn)});
  if(!grid)return;
  document.body.classList.add('is-filtering');

  // 1. freeze the grid height and fade the current cards out
  var oldH=grid.offsetHeight;
  grid.style.transition='none';grid.style.height=oldH+'px';grid.style.overflow='hidden';
  cards.forEach(function(c){if(!c.classList.contains('is-hidden'))c.classList.add('is-leaving')});
  if(count)count.classList.add('is-fading');

  setTimeout(function(){
    // 2. swap the visible set while everything is invisible
    var shown=0;
    cards.forEach(function(c){
      var show=cat==='all'||c.getAttribute('data-cat')===cat;
      c.classList.remove('is-leaving');
      c.classList.toggle('is-hidden',!show);
      if(show){c.classList.add('in-view','is-entering');c.style.transitionDelay=(shown*70)+'ms';shown++}
    });
    if(count){
      count.textContent=cat==='all'?'Showing all '+shown+' projects':'Showing '+shown+' '+label.toLowerCase()+(shown===1?' project':' projects');
      count.classList.remove('is-fading');
    }
    // 3. ease the grid to its new height
    grid.style.height='auto';var newH=grid.offsetHeight;grid.style.height=oldH+'px';
    void grid.offsetHeight;
    grid.style.transition=reduce?'none':'height .55s cubic-bezier(.22,1,.36,1)';grid.style.height=newH+'px';
    // 4. slide the new cards in, staggered
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      cards.forEach(function(c){c.classList.remove('is-entering')});
      setTimeout(function(){
        grid.style.transition='';grid.style.height='';grid.style.overflow='';
        cards.forEach(function(c){c.style.transitionDelay=''});
        document.body.classList.remove('is-filtering');
      },(reduce?0:shown*70+650));
    })});
  },reduce?0:300);
}

function showToast(msg){
  var t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('show')},3200);
}

function mockSubmit(e){
  e.preventDefault();
  showToast('Mockup only — this form is not connected yet. In the live site, this will send your request to MV Design Studio.');
  return false;
}
