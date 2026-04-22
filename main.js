/* ============================================
   KAR Digital Technologies — Resume Site
   Delreka Humphries
   main.js
   ============================================ */

// ===========================
// STARFIELD
// ===========================
const starsEl = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 2.5 + 0.5;
  s.style.cssText = `
    left:${Math.random() * 100}%;
    top:${Math.random() * 100}%;
    width:${size}px;
    height:${size}px;
    --dur:${2 + Math.random() * 4}s;
    animation-delay:${Math.random() * 4}s;
  `;
  starsEl.appendChild(s);
}

// ===========================
// FLOATING PARTICLES
// ===========================
const particleChars = ['✦', '✧', '·', '★', '✺', '⊹', '✵'];
const particlesEl = document.getElementById('particles');
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.textContent = particleChars[Math.floor(Math.random() * particleChars.length)];
  p.style.cssText = `
    left:${Math.random() * 100}%;
    --fdur:${8 + Math.random() * 12}s;
    animation-delay:${Math.random() * 10}s;
  `;
  particlesEl.appendChild(p);
}

// ===========================
// FLOATING CANDLES
// ===========================
const candlesEl = document.getElementById('candles');
for (let i = 0; i < 20; i++) {
  const c = document.createElement('div');
  c.className = 'candle';
  const h = 40 + Math.random() * 60;
  c.style.cssText = `
    left:${3 + i * 4.8}%;
    bottom:${10 + Math.random() * 20}%;
    --ch:${h}px;
    --cdur:${3 + Math.random() * 4}s;
    animation-delay:${Math.random() * 3}s;
  `;
  candlesEl.appendChild(c);
}

// ===========================
// SCROLL REVEAL
// ===========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-section').forEach(s => observer.observe(s));
// ===========================
// VISITOR COUNTER
// ===========================
async function updateCounter() {
  try {
    const response = await fetch("/api/GetVisitorCount");

    if (!response.ok) {
      throw new Error("Counter fetch failed");
    }

    const data = await response.json();
    document.getElementById("counter").innerText = data.count;
  } catch (error) {
    console.error("Visitor counter error:", error);
  }
}

updateCounter();

// ===========================
// MAGIC CURSOR TRAIL
// ===========================
let lastSpark = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSpark < 60) return;
  lastSpark = now;
  const spark = document.createElement('div');
  spark.className = 'spark';
  spark.style.cssText = `left:${e.clientX}px; top:${e.clientY}px;`;
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 600);
});
