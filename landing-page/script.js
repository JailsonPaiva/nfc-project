// PassaTap Landing Page - Interatividade

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada ao scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.feature-card, .benefit-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Adicionar classe de animação quando visível
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Parallax suave nos mini cards
let lastScrollY = window.scrollY;
const miniCards = document.querySelectorAll('.mini-card');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;
    
    miniCards.forEach((card, index) => {
        const speed = 0.1 + (index * 0.05); // Velocidades diferentes
        const currentTransform = card.style.transform || '';
        const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)/) || [0, 0])[1] || 0;
        const newY = currentY + (scrollDelta * speed);
        
        // Manter a rotação original e adicionar movimento Y
        const rotation = card.style.transform.match(/rotate\(([^)]+)\)/)?.[0] || '';
        card.style.transform = `translateY(${newY}px) ${rotation}`;
    });
    
    lastScrollY = scrollY;
});

// Interação no card showcase (hover 3D)
const showcaseCards = document.querySelectorAll('.showcase-card');
const cardShowcase = document.querySelector('.nfc-card-showcase');

if (cardShowcase) {
    cardShowcase.addEventListener('mousemove', (e) => {
        const rect = cardShowcase.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        showcaseCards.forEach((card, index) => {
            const depth = (index + 1) * 0.5;
            card.style.transform = `
                rotate(${card.dataset.rotate || 0}deg)
                rotateX(${rotateX * depth}deg) 
                rotateY(${rotateY * depth}deg)
                translateZ(${index * 20}px)
            `;
        });
    });
    
    cardShowcase.addEventListener('mouseleave', () => {
        showcaseCards.forEach(card => {
            card.style.transform = '';
        });
    });
}

// Counter animation para stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
};

const formatNumber = (num) => {
    if (num >= 1000000) {
        return '+' + (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return '+' + (num / 1000).toFixed(0) + 'k';
    }
    return num + '%';
};

// Animar stats quando entram na viewport
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const numbers = entry.target.querySelectorAll('.stat-number');
            
            // Animar cada número
            if (numbers[0]) animateCounter(numbers[0], 50000);
            if (numbers[1]) animateCounter(numbers[1], 1000000);
            if (numbers[2]) numbers[2].textContent = '100%';
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Easter egg: Click no card front
const cardFront = document.querySelector('.card-front');
if (cardFront) {
    let clickCount = 0;
    cardFront.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            alert('🎉 Você descobriu o Easter Egg! Bem-vindo ao PassaTap! 🚀');
            clickCount = 0;
        }
    });
}

console.log('%c💳 PassaTap ', 'background: #FF7A00; color: white; font-size: 20px; padding: 10px; border-radius: 8px;');
console.log('%cUm tap e tá pago. 🚀', 'color: #FF7A00; font-size: 16px;');

