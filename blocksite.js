// ==UserScript==
// @name         Whiteout Rickroll + Quote Guard
// @namespace    https://example.com/
// @version      1.2
// @description  blocksite
// @author       Athoris
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // ========== AYARLAR ==========
  const blockedSites = [
    // domain-only format: "technopat.net", "example.com"
    "technopat.net",
    // örnek: "instagram.com"
  ];

  const rickUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Rickroll linki
  const quotes = [
    "Bugün küçük bir adım at, yarın büyük fark görürsün.",
    "İyi şeyler sabırla gelir; ama harekete geçmek şart.",
    "Disiplin, yetenekten daha çok işe yarar.",
    "Küçük bir rutin, büyük bir yaşam değiştirir."
  ];
  const showDontShowForHours = 24; // "Bugün gösterme" kaç saat atlayacak
  // ===============================================

  const host = window.location.hostname.replace(/^www\./i,"").toLowerCase();
  if (!blockedSites.includes(host)) return;

  const skipKey = `whiteRick_skip_${host}`;

  const skipVal = localStorage.getItem(skipKey);
  if (skipVal) {
    try {
      const obj = JSON.parse(skipVal);
      if (obj && obj.until && Date.now() < obj.until) return;
      localStorage.removeItem(skipKey);
    } catch(e) {
      localStorage.removeItem(skipKey);
    }
  }

  function buildOverlay() {
  
    document.documentElement.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.height = '100vh';
    document.body.style.background = '#ffffff';
    document.body.innerHTML = '';

    const container = document.createElement('div');
    container.style.height = '100vh';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.gap = '18px';
    container.style.fontFamily = 'Inter, Roboto, Arial, sans-serif';
    container.style.color = '#111';
    container.style.padding = '24px';
    container.style.textAlign = 'center';

    const title = document.createElement('h1');
    title.innerText = 'STOP. BİR DAKİKA 🛑';
    title.style.margin = '0';
    title.style.fontSize = '20px';
    title.style.letterSpacing = '1px';

    const quote = document.createElement('p');
    quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];
    quote.style.margin = '0';
    quote.style.fontSize = '18px';
    quote.style.opacity = '0.95';

   
    const btn = document.createElement('button');
    btn.innerText = 'RICKROLL İÇİN TIKLA (AÇIKCA GÜLDÜRÜR)';
    btn.style.padding = '10px 16px';
    btn.style.border = 'none';
    btn.style.borderRadius = '10px';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = '700';
    btn.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
    btn.style.background = '#ff4d4d';
    btn.style.color = '#fff';

    btn.addEventListener('click', () => {
      window.open(rickUrl, '_blank');
    });

   
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '10px';
    controls.style.alignItems = 'center';

    const dontBtn = document.createElement('button');
    dontBtn.innerText = `BUGÜN GÖSTERME (${showDontShowForHours}saat)`;
    dontBtn.style.padding = '8px 12px';
    dontBtn.style.border = '1px solid rgba(0,0,0,0.08)';
    dontBtn.style.borderRadius = '8px';
    dontBtn.style.background = '#f3f3f3';
    dontBtn.style.cursor = 'pointer';

    dontBtn.addEventListener('click', () => {
      const until = Date.now() + showDontShowForHours * 3600 * 1000;
      localStorage.setItem(skipKey, JSON.stringify({until}));
     
      location.reload();
    });

    
    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'KAPAT';
    closeBtn.style.padding = '8px 12px';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '8px';
    closeBtn.style.background = 'transparent';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#333';
    closeBtn.addEventListener('click', () => {
     
      if (history.length > 1) history.back();
      else location.href = '/';
    });

    const small = document.createElement('div');
    small.style.position = 'absolute';
    small.style.bottom = '14px';
    small.style.fontSize = '12px';
    small.style.color = '#666';
    small.innerText = 'Bu ekranı kapatmak için KAPAT veya Rickroll\'a tıkla.';

    container.appendChild(title);
    container.appendChild(quote);
    container.appendChild(btn);
    controls.appendChild(dontBtn);
    controls.appendChild(closeBtn);
    container.appendChild(controls);
    document.body.appendChild(container);
    document.body.appendChild(small);
  }

  buildOverlay();

})();
