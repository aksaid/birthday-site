/* ---------- Floating hearts ---------- */
const heartsContainer = document.getElementById('hearts');
const heartChars = ['💕','💖','💗','❤️','🌸'];
function spawnHeart() {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.animationDuration = 6 + Math.random() * 6 + 's';
  h.style.fontSize = 0.9 + Math.random() * 1.4 + 'rem';
  heartsContainer.appendChild(h);
  setTimeout(() => h.remove(), 13000);
}
setInterval(spawnHeart, 700);

/* ---------- Music (robust) ---------- */
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let playing = false;

// Fade helpers
function fadeIn(audio, duration = 2000) {
  audio.volume = 0;
  const step = 0.05;
  const timer = setInterval(() => {
    if (audio.volume + step >= 1) {
      audio.volume = 1;
      clearInterval(timer);
    } else {
      audio.volume = Math.min(1, audio.volume + step);
    }
  }, duration * step);
}

function fadeOut(audio, duration = 800) {
  const step = 0.05;
  const timer = setInterval(() => {
    if (audio.volume - step <= 0) {
      audio.volume = 0;
      audio.pause();
      clearInterval(timer);
    } else {
      audio.volume = Math.max(0, audio.volume - step);
    }
  }, duration * step);
}

// Play with error catching
function playMusic() {
  const p = music.play();
  if (p && typeof p.then === 'function') {
    p.then(() => {
      playing = true;
      musicBtn.textContent = '⏸️';
      fadeIn(music);
    }).catch(err => {
      console.warn('Music play blocked:', err);
      musicBtn.textContent = '🔇';
      // Retry once on next interaction
    });
  } else {
    playing = true;
    musicBtn.textContent = '⏸️';
    fadeIn(music);
  }
}

function pauseMusic() {
  fadeOut(music);
  playing = false;
  musicBtn.textContent = '🎵';
}

// Manual toggle
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (playing) pauseMusic();
  else playMusic();
});

// Auto-start on first user interaction (click, tap, scroll, key)
let autoStarted = false;
function startOnFirstInteraction() {
  if (autoStarted || playing) return;
  autoStarted = true;
  playMusic();
  ['click','touchstart','scroll','keydown'].forEach(ev =>
    document.removeEventListener(ev, startOnFirstInteraction)
  );
}
['click','touchstart','scroll','keydown'].forEach(ev =>
  document.addEventListener(ev, startOnFirstInteraction, { once: true, passive: true })
);

// If the audio file fails to load, warn visibly
music.addEventListener('error', () => {
  console.error('Could not load music.mp3 — check the file path and filename.');
  musicBtn.textContent = '🔇';
  musicBtn.title = 'Music file not found';
});

/* ---------- Slideshow ---------- */
const slides = document.querySelectorAll('.slide');
let current = 0;
setInterval(() => {
  if (slides.length === 0) return;
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, 3500);

/* ---------- Love letter typing ---------- */
const letterText = `My dearest Ramlay Ruun,

Happy birthday, my love. Even though I can't be there to hug you today, I wanted to make something that carries a piece of me to you.

You make ordinary days feel like something worth remembering. I'm proud of you, I miss you, and I can't wait until the distance is just a story we tell.

Until then — this page, and my whole heart, are yours.

I love you.`;

/* ---------- Love letter typing ---------- */
const letterEl = document.getElementById('letter');
let i = 0;
let started = false;

function typeLetter() {
  if (i < letterText.length) {
    letterEl.textContent += letterText.charAt(i);
    i++;
    setTimeout(typeLetter, 35);
  }
}

const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !started) {
      started = true;
      typeLetter();
    }
  });
}, { threshold: 0.3 });

letterObserver.observe(document.querySelector('.letter-section'));

/* ---------- Reasons I love you ---------- */
const reasons = [
  "Your laugh is my favorite sound.",
  "You make me want to be better.",
  "The way you talk about your dreams.",
  "How u always know what to say to me.",
  "Your kindness even on hard days.",
"The way your eyes light up when you're excited.",
  "Your patience, even when I don't deserve it.",
  "The way you say 'good morning' like it matters.",
  "How you turn any boring moment into a memory.",
  "Your heart — it's the softest, bravest one I know.",
  "How you forgive me when I mess up.",
  "How you make me feel chosen every day.",
  "The way you smell — it stays with me all day.",
  "The way you believe in us.",
  "How u always understand me.",
  "The way you say my name.",
  "You make distance feel small.",
  "Your gorgeous smile.",
  "How you care about the little things.",
  "You're my favorite person to do nothing with.",
  "And mostly… just because you're you."

  // add 20+ more
];
let reasonIndex = -1;
const reasonBox = document.getElementById('reasonBox');
document.getElementById('nextReason').addEventListener('click', () => {
  reasonIndex = (reasonIndex + 1) % reasons.length;
  reasonBox.textContent = reasons[reasonIndex];
  reasonBox.classList.add('pop');
  setTimeout(() => reasonBox.classList.remove('pop'), 300);
});

/* ---------- Countdown to next visit ---------- */
// Set this to the date you'll next see her
const targetDate = new Date('2026-01-01T00:00:00');
function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    document.getElementById('countdown').textContent = "I'm on my way 💫";
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('countdown').textContent = `${d}d ${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();