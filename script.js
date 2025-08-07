// 1. الانتقال من الشاشة الترحيبية إلى المحتوى بعد 4 ثواني
setTimeout(() => {
  const intro = document.getElementById("intro");
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.style.display = "none";
    document.getElementById("content").classList.add("show");
  }, 1000);
}, 4000);

// 2. العد التنازلي للحدث
function updateCountdown() {
  const eventDate = new Date("2025-10-10T21:00:00").getTime(); // غير التاريخ حسب الحاجة
  const now = Date.now();
  const diff = eventDate - now;

  if (diff <= 0) {
    clearInterval(countdownInterval);
    document.querySelector(".countdown-timer").innerHTML = '<div class="event-started">لقد بدأ الحدث! ننتظركم</div>';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, '0');
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

const countdownInterval = setInterval(updateCountdown, 1000);
document.addEventListener('DOMContentLoaded', updateCountdown);

// 3. تشغيل الفيديو بالصوت بعد أول تفاعل
window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('event-video');
  video.muted = true; // مبدئياً مكتوم الصوت لتجنب مشاكل المتصفحات
  video.play();

  function unmuteVideo() {
    video.muted = false;
    video.play();
    document.removeEventListener('click', unmuteVideo);
    document.removeEventListener('touchstart', unmuteVideo);
  }

  document.addEventListener('click', unmuteVideo);
  document.addEventListener('touchstart', unmuteVideo);
});

// 4. مؤثرات الألعاب النارية (confetti)
window.addEventListener('DOMContentLoaded', () => {
  const duration = 5000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    origin: { y: 1 },
    spread: 360,
    ticks: 60,
    zIndex: 10000,
    colors: ['#ff0a54', '#ff477e', '#ff85a1', '#fbb1b1', '#f9bec7'],
    startVelocity: 30
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = Math.floor(50 * (timeLeft / duration));
    confetti(Object.assign({}, defaults, { particleCount }));
  }, 250);
});

// 5. منع التكبير/التصغير بالضغط المزدوج لتحسين تجربة الجوال
document.addEventListener('dblclick', e => {
  e.preventDefault();
}, { passive: false });

// 6. إصلاح ارتفاع شاشة الجوال (vh issue)
function fixMobileHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', fixMobileHeight);
fixMobileHeight();
