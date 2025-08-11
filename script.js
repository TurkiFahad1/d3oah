document.addEventListener('DOMContentLoaded', () => {
  // العناصر
  const intro = document.getElementById('intro');
  const enterBtn = document.getElementById('enter-btn');
  const content = document.getElementById('content');
  const invitationBox = document.getElementById('invitation-box');
  const confettiCanvas = document.getElementById('confetti-canvas');
  const video = document.getElementById('event-video');
  const playToggle = document.getElementById('play-toggle');
  const playText = document.getElementById('play-text');
  const iconPlay = document.getElementById('icon-play');

  // العد التنازلي (حدث: 22 أغسطس 2025 الساعة 21:00)
  const eventDate = new Date('2025-08-22T21:00:00').getTime();
  const countdownTimerContainer = document.getElementById('countdown-timer');

  function updateCountdown() {
    const now = Date.now();
    const diff = eventDate - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      countdownTimerContainer.innerHTML = '<div class="event-started">لقد بدأ الحدث! ننتظركم</div>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  // وظائف الانتقال: من صفحة الترحيب إلى صفحة الدعوة
  enterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // إخفاء الترحيب
    intro.style.opacity = '0';
    intro.setAttribute('aria-hidden', 'true');
    setTimeout(() => intro.style.display = 'none', 600);

    // إظهار المحتوى الرئيسي
    content.classList.add('show');
    content.setAttribute('aria-hidden', 'false');

    // إضافة أنيمي للنصوص
    invitationBox.classList.add('animate-in');

    // تشغيل confetti مكثف وجميل (فقط للدعوة)
    startInvitationConfetti();
  });

  // إعداد زر تشغيل الفيديو persistent
  function setButtonToPlayingState(isPlaying) {
    if (isPlaying) {
      playToggle.classList.add('paused');
      playToggle.setAttribute('aria-pressed', 'true');
      playText.textContent = 'Pause';
      iconPlay.innerHTML = '<rect x="14" y="11" width="6" height="26" fill="#d4af37"></rect><rect x="28" y="11" width="6" height="26" fill="#d4af37"></rect>';
      playToggle.setAttribute('aria-label', 'إيقاف الفيديو مؤقتًا');
    } else {
      playToggle.classList.remove('paused');
      playToggle.setAttribute('aria-pressed', 'false');
      playText.textContent = 'Play';
      iconPlay.innerHTML = '<path fill="#d4af37" d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"/>';
      playToggle.setAttribute('aria-label', 'تشغيل الفيديو');
    }
  }

  // افتراض أن الفيديو يلعب (autoplay muted)
  let isVideoPlaying = true;
  setButtonToPlayingState(isVideoPlaying);

  // زر التبديل
  playToggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (video.paused) {
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isVideoPlaying = true;
          setButtonToPlayingState(true);
        }).catch(() => {
          video.muted = true;
          video.play().catch(()=>{});
          isVideoPlaying = true;
          setButtonToPlayingState(true);
        });
      } else {
        isVideoPlaying = true;
        setButtonToPlayingState(true);
      }
    } else {
      video.pause();
      isVideoPlaying = false;
      setButtonToPlayingState(false);
    }
  });

  // النقر على الفيديو يبدّل التشغيل أيضاً
  video.addEventListener('click', () => {
    if (video.paused) {
      video.muted = false;
      video.play().catch(()=>{});
      isVideoPlaying = true;
      setButtonToPlayingState(true);
    } else {
      video.pause();
      isVideoPlaying = false;
      setButtonToPlayingState(false);
    }
  });

  // confetti مخصص للدعوة — إعدادات أجمل وأكثر حركة
  function startInvitationConfetti() {
    // التأكد من وجود مكتبة confetti
    if (typeof confetti !== 'function') return;

    // ضبط اللوحة لاستخدام canvas الموجود
    const myConfetti = confetti.create(confettiCanvas, { resize: true, useWorker: true });

    // ألوان متناسقة: ذهبي، أبيض، ذهبي فاتح، لون فاتح للزينة
    const colors = ['#d4af37', '#fff7e6', '#ffe9b0', '#ffd58a', '#f3e5ab'];

    // نطلق موجات مختلفة لتعطي إحساس ديناميكي وحركة
    const waves = [
      { particleCount: 120, spread: 140, startVelocity: 40, ticks: 200 },
      { particleCount: 90, spread: 170, startVelocity: 55, ticks: 200 },
      { particleCount: 70, spread: 120, startVelocity: 70, ticks: 200 },
    ];

    // تتابع إطلاق موجات على مدى 3.2 ثانية مع اختلاف الزوايا
    let waveIndex = 0;
    const waveInterval = setInterval(() => {
      const w = waves[waveIndex % waves.length];
      myConfetti({
        particleCount: w.particleCount,
        spread: w.spread,
        startVelocity: w.startVelocity,
        ticks: w.ticks,
        origin: { x: Math.random() * 0.6 + 0.2, y: Math.random() * 0.3 + 0.1 },
        colors: colors,
        scalar: Math.random() * 0.8 + 0.8,
      });

      // أيضاً نطلق بعض الشظايا الكبيرة بشكل متفرق
      if (Math.random() > 0.5) {
        myConfetti({
          particleCount: 30,
          spread: 100,
          startVelocity: 90,
          origin: { x: Math.random() * 0.8 + 0.1, y: 0.05 },
          shapes: ['square', 'circle'],
          colors: colors,
          scalar: 1.3
        });
      }

      waveIndex++;
    }, 250);

    // نوقف الإطلاق بعد 3200ms
    setTimeout(() => clearInterval(waveInterval), 3200);

    // لإحساس مستمر خفيف أثناء الشاشة (خلفية متلألئة) نطلق دفعات خفيفة مدة 8 ثواني
    const sustainInterval = setInterval(() => {
      myConfetti({
        particleCount: 18,
        spread: 80,
        startVelocity: 30,
        origin: { x: Math.random() * 0.9 + 0.05, y: Math.random() * 0.2 + 0.05 },
        colors: colors,
        scalar: 0.9
      });
    }, 700);

    setTimeout(() => clearInterval(sustainInterval), 8000);
  }

  // تحسينات صغيرة: منع dblclick zoom، وحساب vh للهاتف
  document.addEventListener('dblclick', e => e.preventDefault(), { passive: false });
  function fixMobileHeight(){ let vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--vh', `${vh}px`); }
  window.addEventListener('resize', fixMobileHeight);
  fixMobileHeight();
});
