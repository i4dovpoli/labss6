document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
    });

    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        document.querySelector('.header').style.setProperty('--scroll-y', scrollY + 'px');
    });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 50;

    function initCanvas() {
        const gradient = ctx.createLinearGradient(0, 0, 300, 0);
        gradient.addColorStop(0, '#0984e3');
        gradient.addColorStop(1, '#6c5ce7');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 300, 200);
        ctx.font = '20px Montserrat';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Клікніть для ефекту', 150, 100);

        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                color: `hsl(${Math.random() * 360}, 70%, 70%)`
            });
        }
    }

    function animateParticles() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    initCanvas();
    animateParticles();

    canvas.addEventListener('click', () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        ctx.fillStyle = randomColor;
        ctx.fillRect(0, 0, 300, 200);
        ctx.font = '20px Montserrat';
        ctx.fillStyle = contrastColor(randomColor);
        ctx.textAlign = 'center';
        ctx.fillText('Клікніть для ефекту', 150, 100);

        particles.forEach(particle => {
            particle.color = `hsl(${Math.random() * 360}, 70%, 70%)`;
        });
    });

    function contrastColor(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#2d3436' : '#ffffff';
    }

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i>`;
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            themeToggle.click();
        }
    });

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});іі