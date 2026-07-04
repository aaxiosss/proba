
//тут вроде добавил константы для работы музона//
    const musicToggle = document.getElementById("music-toggle");
    const audio = document.getElementById("bgMusic");
    let isStarted = false;
    //тут вот конец музончика//

document.querySelector('.open-btn').addEventListener('click', () => {
    startConfetti();

    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');

    preloader.style.opacity = 0;

    setTimeout(() => {
        preloader.style.display = 'none';
        content.style.display = 'block';

        setTimeout(() => {
            content.style.opacity = 1;
            loadMusic();
        }, 50);
    }, 300); // Можно чуть задержать, чтобы плавность была заметнее
});

//Продолжаем работу над музычкой//
function loadMusic() {
    audio.play().then(() => {
        if (!isStarted) {
            audio.currentTime = 0; // опционально
            isStarted = true;
        }
        if (musicToggle) {
            musicToggle.textContent = "🔊";
        }
    }).catch(error => {
        console.log("Ошибка воспроизведения:", error);
    });
}

// Переключатель музыки
    if (musicToggle) {
        musicToggle.addEventListener("click", function () {
            if (audio.paused) {
                audio.play();
                musicToggle.textContent = "🔊";
            } else {
                audio.pause();
                musicToggle.textContent = "🔇";
            }
        });
    }

const video = document.getElementById("bg-video");
//тут конец музыки//
// ===== ВИДЕО-ЗАСТАВКА (исправленный) =====
document.addEventListener('DOMContentLoaded', function() {
    const videoOverlay = document.getElementById('video-overlay');
    const introVideo = document.getElementById('intro-video');
    const preloader = document.getElementById('preloader');
    const skipBtn = document.getElementById('skip-video');

    if (!videoOverlay || !introVideo || !preloader || !skipBtn) {
        console.error('Один из элементов видео-заставки не найден!');
        return;
    }

    let isPreloaderShown = false;

    function showPreloader() {
        if (isPreloaderShown) return;
        isPreloaderShown = true;

        videoOverlay.style.transition = 'opacity 1s ease';
        videoOverlay.style.opacity = '0';
        setTimeout(() => {
            videoOverlay.style.display = 'none';
            preloader.style.display = 'flex';
            // Отвязываем обработчик, чтобы не сработал повторно
            introVideo.removeEventListener('ended', showPreloader);
        }, 1000);
    }

    introVideo.addEventListener('ended', showPreloader);

    skipBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // Останавливаем видео, чтобы оно не вызывало 'ended' после пропуска
        introVideo.pause();
        introVideo.currentTime = 0;
        showPreloader();
    });

    // Попытка автозапуска
    introVideo.play().catch(() => {
        const hint = document.createElement('div');
        hint.style.cssText = `
            position: absolute; bottom: 50%; left: 50%; transform: translate(-50%, 50%);
            color: white; font-size: 24px; text-align: center;
            background: rgba(0,0,0,0.6); padding: 20px 40px; border-radius: 12px;
            z-index: 10001;
        `;
        hint.textContent = 'Нажмите, чтобы начать';
        videoOverlay.appendChild(hint);
        videoOverlay.addEventListener('click', function start() {
            introVideo.play();
            hint.remove();
            videoOverlay.removeEventListener('click', start);
        });
    });
});

// Конфетти — временно заглушка
function startConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        // Здесь можно вставить библиотеку конфетти (например, canvas-confetti)
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}


document.addEventListener('DOMContentLoaded', function() {
    // Находим контейнер (можно по классу или по id – выберите один)
    const container = document.querySelector('.suitcase-container');
    // если используете id, то лучше: const container = document.getElementById('suitcaseContainer');
    
    if (!container) return;

    const closed = container.querySelector('.suitcase-closed');
    const opened = container.querySelector('.suitcase-opened');
    let isOpen = false;

    container.addEventListener('click', function() {
        if (isOpen) {
            // Закрываем чемодан
            closed.style.display = 'block';
            opened.style.display = 'none';
            this.classList.remove('is-open'); // убираем класс – круг появляется
        } else {
            // Открываем чемодан
            closed.style.display = 'none';
            opened.style.display = 'block';
            this.classList.add('is-open'); // добавляем класс – круг исчезает
        }
        isOpen = !isOpen;
    });
});


document.querySelector(".wedding-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    // Собираем данные из формы
    const formData = new FormData(this);
    const data = {};
    for (let [key, value] of formData.entries()) {
        // Если ключ уже существует – превращаем в массив (для чекбоксов)
        if (data[key] && Array.isArray(data[key])) {
            data[key].push(value);
        } else if (data[key]) {
            data[key] = [data[key], value];
        } else {
            data[key] = value;
        }
    }

    // Отправляем на наш сервер (замените URL на свой)
    try {
       const response = await fetch('https://wedding-server-48iw.onrender.com/send-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
});
        if (response.ok) {
            alert('Форма отправлена!');
            this.reset();
        } else {
            alert('Ошибка. Попробуйте позже.');
        }
    } catch {
        alert('Ошибка соединения. Проверьте интернет.');
    }
});

function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            document.getElementById("countdown").innerHTML = "Событие началось!";
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}

// Устанавливаем дату окончания
const targetDate = new Date("August 1, 2026 14:30:00").getTime();
startCountdown(targetDate);



document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach(element => observer.observe(element));
    const hiddenCenterElements = document.querySelectorAll(".hidden-center");
    const observerCenter = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-center");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    hiddenCenterElements.forEach(el => observerCenter.observe(el));
    
    // 3. Observer для .hidden-right (выезд справа)
    const hiddenRightElements = document.querySelectorAll(".hidden-right");
    const observerRight = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observerRight.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    hiddenRightElements.forEach(el => observerRight.observe(el));

    // 4. Observer для .hidden-left (выезд слева)
    const hiddenLeftElements = document.querySelectorAll(".hidden-left");
    const observerLeft = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observerLeft.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    hiddenLeftElements.forEach(el => observerLeft.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
    const titleSection = document.querySelector(".fade-in");
    titleSection.classList.add("show");
});

