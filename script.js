// --- 1. لإخفاء الرسالة الترحيبية ---
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    const invitationContent = document.getElementById('invitation-content');

    // انتظر 3 ثوانٍ ثم أضف كلاس الإخفاء
    setTimeout(() => {
        splash.classList.add('splash-hidden');
    }, 3000); // 3000 = 3 ثواني
});


// --- 2. للعد التنازلي ---
(function () {
    // !! التاريخ المستهدف: 25 نوفمبر 2025، الساعة 9:00 مساءً !!
    const eventDate = new Date("2025-11-25T21:00:00").getTime();

    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // تحديث العد التنازلي كل ثانية
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        // الحسابات
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // عرض النتيجة
        if (distance > 0) {
            countdownElement.innerHTML = `
                <div class="unit"><span>${String(days).padStart(2, '0')}</span><label>أيام</label></div>
                <div class="unit"><span>${String(hours).padStart(2, '0')}</span><label>ساعات</label></div>
                <div class="unit"><span>${String(minutes).padStart(2, '0')}</span><label>دقائق</label></div>
                <div class="unit"><span>${String(seconds).padStart(2, '0')}</span><label>ثواني</label></div>
            `;
        } else {
            clearInterval(timer);
            countdownElement.innerHTML = "<h3 style='color: #8c0032; font-size: 1.8rem;'>نحن بانتظاركم!</h3>";
        }
    }, 1000);
})();
