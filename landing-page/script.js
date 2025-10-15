// PassaTap Landing Page - Interatividade Profissional

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Cursor personalizado nos cards
// ========================================
const interactiveElements = document.querySelectorAll('.showcase-card, .feature-card, .btn');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
    });
    el.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
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

// ========================================
// Parallax suave nos mini cards + Efeito magnético
// ========================================
let lastScrollY = window.scrollY;
const miniCards = document.querySelectorAll('.mini-card');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;
    
    miniCards.forEach((card, index) => {
        const speed = 0.1 + (index * 0.05);
        const currentTransform = card.style.transform || '';
        const currentY = parseFloat(currentTransform.match(/translateY\(([^)]+)/) || [0, 0])[1] || 0;
        const newY = currentY + (scrollDelta * speed);
        
        const rotation = card.style.transform.match(/rotate\(([^)]+)\)/)?.[0] || '';
        card.style.transform = `translateY(${newY}px) ${rotation}`;
    });
    
    lastScrollY = scrollY;
});

// Efeito magnético - cards seguem o mouse sutilmente
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    miniCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - cardCenterX;
        const distanceY = mouseY - cardCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Se o mouse estiver próximo (< 200px), atrair sutilmente
        if (distance < 200) {
            const strength = (200 - distance) / 200; // 0 a 1
            const moveX = (distanceX / distance) * strength * 10;
            const moveY = (distanceY / distance) * strength * 10;
            
            const currentTransform = card.style.transform || '';
            const rotation = currentTransform.match(/rotate\(([^)]+)\)/)?.[0] || '';
            const translateY = currentTransform.match(/translateY\(([^)]+)\)/)?.[1] || '0px';
            
            card.style.transform = `translateY(${translateY}) translateX(${moveX}px) ${rotation}`;
            card.style.transition = 'transform 0.3s ease-out';
        }
    });
});

// ========================================
// Interação 3D nos Showcase Cards
// ========================================
const showcaseCards = document.querySelectorAll('.showcase-card');
const cardShowcase = document.querySelector('.nfc-card-showcase');

if (cardShowcase) {
    let isHovering = false;
    
    cardShowcase.addEventListener('mouseenter', () => {
        isHovering = true;
    });
    
    cardShowcase.addEventListener('mouseleave', () => {
        isHovering = false;
        showcaseCards.forEach((card, index) => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transform = '';
        });
    });
    
    cardShowcase.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const rect = cardShowcase.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        
        const rotateX = -percentY * 15; // Inverte Y para efeito natural
        const rotateY = percentX * 15;
        
        showcaseCards.forEach((card, index) => {
            const depth = (3 - index) * 0.4; // Cards da frente tem mais movimento
            const translateZ = index * 30;
            
            card.style.transition = 'transform 0.1s ease-out';
            card.style.transform = `
                rotateX(${rotateX * depth}deg) 
                rotateY(${rotateY * depth}deg)
                translateZ(${translateZ}px)
                scale(${1 + (depth * 0.02)})
            `;
        });
    });
}

// ========================================
// Efeito de brilho no card front ao scroll
// ========================================
const cardFrontEl = document.querySelector('.card-front');
if (cardFrontEl) {
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const brightness = 1 + (Math.sin(scrollPercent * Math.PI * 4) * 0.1);
        cardFrontEl.style.filter = `brightness(${brightness})`;
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

// ========================================
// Animação de Pagamento - Card desce até o TAP!
// ========================================
const cardFront = document.querySelector('.card-front');
const tapIndicator = document.querySelector('.tap-indicator-hero');
const cardShowcaseEl = document.querySelector('.nfc-card-showcase');

if (cardFront && tapIndicator) {
    let isAnimating = false;
    
    cardFront.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        
        // Desabilita outras animações
        cardFront.style.animationPlayState = 'paused';
        
        // Calcula a distância até o tap
        const cardRect = cardFront.getBoundingClientRect();
        const tapRect = tapIndicator.getBoundingClientRect();
        const distance = tapRect.top - cardRect.bottom + 40;
        
        // Anima o card descendo
        cardFront.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
        cardFront.style.transform = `translateY(${distance}px) scale(0.95) rotate(0deg)`;
        cardFront.style.boxShadow = '0 30px 80px rgba(255, 122, 0, 0.6)';
        
        // Pulsa o tap indicator
        tapIndicator.style.transform = 'translateX(-50%) scale(1.3)';
        tapIndicator.style.transition = 'all 0.3s ease-out';
        
        // Efeito de sucesso
        setTimeout(() => {
            // Flash de sucesso
            const flash = document.createElement('div');
            flash.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(255, 122, 0, 0.3), rgba(0, 79, 100, 0.2));
                pointer-events: none;
                z-index: 9999;
                animation: flashSuccess 0.6s ease-out;
            `;
            document.body.appendChild(flash);
            
            // Mostra notificação de pagamento
            showPaymentSuccess();
            
            setTimeout(() => flash.remove(), 600);
            
            // Volta o card
            setTimeout(() => {
                cardFront.style.transform = '';
                cardFront.style.boxShadow = '';
                tapIndicator.style.transform = 'translateX(-50%) scale(1)';
                
                setTimeout(() => {
                    cardFront.style.animationPlayState = 'running';
                    isAnimating = false;
                }, 1000);
            }, 1500);
        }, 1000);
    });
}

// Adiciona animação de flash
const flashStyle = document.createElement('style');
flashStyle.textContent = `
    @keyframes flashSuccess {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(flashStyle);

// Notificação de pagamento bem sucedido
function showPaymentSuccess() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: white;
        padding: 40px 60px;
        border-radius: 24px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        border: 3px solid #FF7A00;
        animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;
    
    notification.innerHTML = `
        <div style="font-size: 64px; margin-bottom: 16px;">✅</div>
        <h3 style="font-size: 24px; font-weight: 800; color: #2B2B2B; margin-bottom: 8px;">
            Pagamento aprovado!
        </h3>
        <p style="font-size: 16px; color: #6E6E6E;">
            R$ 20.364,50 • Concluído em 1.2s
        </p>
    `;
    
    document.body.appendChild(notification);
    
    const popInStyle = document.createElement('style');
    popInStyle.textContent = `
        @keyframes popIn {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            100% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(popInStyle);
    
    setTimeout(() => {
        notification.style.transition = 'all 0.3s ease-out';
        notification.style.opacity = '0';
        notification.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ========================================
// Loading inicial suave
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease-out';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Reveal progressivo ao scroll com stagger
// ========================================
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.benefit-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    staggerObserver.observe(item);
});

// ========================================
// Demo Card Interativo no CTA
// ========================================
const demoCard = document.querySelector('.demo-card');
const demoTapZone = document.querySelector('.demo-tap-zone');

if (demoCard && demoTapZone) {
    demoCard.style.cursor = 'pointer';
    
    demoCard.addEventListener('click', () => {
        // Card desce até a zona de tap
        demoCard.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        demoCard.style.transform = 'translateY(180px) scale(0.9)';
        
        // Tap zone pulsa
        demoTapZone.style.transform = 'scale(1.2)';
        demoTapZone.style.transition = 'all 0.3s ease-out';
        
        // Efeito de pagamento
        setTimeout(() => {
            // Confete de sucesso
            createConfetti();
            
            // Volta o card
            setTimeout(() => {
                demoCard.style.transform = 'translateY(0) scale(1)';
                demoTapZone.style.transform = 'scale(1)';
            }, 800);
        }, 800);
    });
}

// Efeito de confete simples
function createConfetti() {
    const colors = ['#FF7A00', '#FF9433', '#004F64', '#FFFFFF'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: 50%;
            left: 50%;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            animation: confettiFall ${0.8 + Math.random() * 0.5}s ease-out forwards;
        `;
        
        const angle = (Math.random() * 360) * Math.PI / 180;
        const velocity = 100 + Math.random() * 100;
        const endX = Math.cos(angle) * velocity;
        const endY = Math.sin(angle) * velocity + 200;
        
        confetti.style.setProperty('--endX', endX + 'px');
        confetti.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1500);
    }
    
    const confettiAnim = document.createElement('style');
    confettiAnim.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(var(--endX), var(--endY)) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiAnim);
}

// ========================================
// Console Easter Egg Profissional
// ========================================
console.log(
    '%c💳 PassaTap %c- Um tap e tá pago ', 
    'background: linear-gradient(135deg, #FF7A00, #FF9433); color: white; font-size: 24px; padding: 20px 30px; border-radius: 12px; font-weight: bold;',
    'color: #FF7A00; font-size: 16px; font-weight: 600;'
);
console.log('%c🚀 Desenvolvido com ❤️ e muita energia brasileira', 'color: #004F64; font-size: 14px;');
console.log('%c💡 Clique no card laranja da Hero pra ver a mágica acontecer!', 'color: #6E6E6E; font-size: 12px; font-style: italic;');

