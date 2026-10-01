/* ============================================
   ANIMATIONS - animation.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== PARALLAX EFFECT ON HERO =====
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const floatingShapes = document.querySelectorAll('.hero::before, .hero::after');

            // Apply slight parallax
            const heroContent = heroSection.querySelector('.hero-container');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                heroContent.style.opacity = Math.max(0, 1 - scrolled / 800);
            }
        });
    }

    // ===== FLOATING ANIMATION FOR CARDS =====
    const floatCards = document.querySelectorAll('.stat-card, .tool-item');
    floatCards.forEach((card, index) => {
        card.style.animation = `floatCard 3s ease-in-out ${index * 0.2}s infinite`;
    });

    // Inject keyframes if not present
    if (!document.getElementById('floatKeyframes')) {
        const style = document.createElement('style');
        style.id = 'floatKeyframes';
        style.textContent = `
            @keyframes floatCard {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-6px); }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== PULSE ANIMATION FOR BUTTONS =====
    const pulseButtons = document.querySelectorAll('.btn-primary');
    pulseButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'pulseBtn 0.6s ease';
        });
        btn.addEventListener('animationend', () => {
            btn.style.animation = '';
        });
    });

    if (!document.getElementById('pulseKeyframes')) {
        const style = document.createElement('style');
        style.id = 'pulseKeyframes';
        style.textContent = `
            @keyframes pulseBtn {
                0% { box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3); }
                50% { box-shadow: 0 4px 25px rgba(108, 99, 255, 0.7); }
                100% { box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3); }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== TEXT SCRAMBLE EFFECT (Logo on Hover) =====
    const logo = document.querySelector('.logo');
    if (logo) {
        const originalText = logo.textContent;
        const chars = '!<>-_\\/[]{}—=+*^?#________';

        logo.addEventListener('mouseenter', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                logo.textContent = originalText
                    .split('')
                    .map((char, i) => {
                        if (i < iterations) return originalText[i];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    logo.textContent = originalText;
                }
                iterations += 1 / 3;
            }, 40);
        });
    }

    // ===== CURSOR GLOW (Optional - desktop only) =====
    if (window.matchMedia('(min-width: 1024px)').matches) {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(108, 99, 255, 0.4), transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Grow cursor on hover of interactive elements
        document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // ===== PAGE LOADER FADE OUT =====
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        });
    }

    // ===== RIPPLE EFFECT ON BUTTONS =====
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            if (!this.style.position || this.style.position === 'static') {
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
            }

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    if (!document.getElementById('rippleKeyframes')) {
        const style = document.createElement('style');
        style.id = 'rippleKeyframes';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
            .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.8s ease, transform 0.8s ease; }
            .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
            .reveal-scale { opacity: 0; transform: scale(0.9); transition: opacity 0.8s ease, transform 0.8s ease; }
            .revealed { opacity: 1; transform: translate(0) scale(1); }
        `;
        document.head.appendChild(style);
    }

    // ===== SMOOTH NAV SCROLL WITH OFFSET =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length <= 1) return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = target.getBoundingClientRect().top +
                                       window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ANIMATED GRADIENT BACKGROUND (Hero) =====
    const heroBg = document.querySelector('.hero');
    if (heroBg) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 0.3) % 360;
            const shape1 = heroBg.querySelector('::before');
            // Note: can't directly style pseudo-elements; use CSS animation instead
        }, 100);
    }

    // ===== CONSOLE ART =====
    console.log(`
%c╔═══════════════════════════════════════════╗
║   🎨  Portfolio Website - Animations      ║
║   ✨  Loaded successfully!                 ║
╚═══════════════════════════════════════════╝
    `, 'color: #6c63ff; font-family: monospace; font-size: 11px;');
});