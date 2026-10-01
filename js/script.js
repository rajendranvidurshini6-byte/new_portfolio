/* ============================================
   MAIN SCRIPT - script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
            scrollTopBtn?.classList.add('show');
        } else {
            navbar?.classList.remove('scrolled');
            scrollTopBtn?.classList.remove('show');
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', function () {
        navLinks?.classList.toggle('active');

        // Toggle icon
        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('active');
            const icon = hamburger?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // ===== SCROLL TO TOP =====
    scrollTopBtn?.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== ACTIVE NAV LINK BASED ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // ===== ANIMATE ON SCROLL (Fade In) =====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card, .skill-preview-card, .project-card, .timeline-item')
        .forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

    // ===== COUNTER ANIMATION (Stats) =====
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        let count = 0;
        const increment = target / speed;

        const update = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.ceil(count) + '+';
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + '+';
            }
        };
        update();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== TYPING EFFECT (Hero Subtitle) =====
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        const words = [
            'Software Developer',
            'AI Enthusiast',
            'Web Designer',
            'Problem Solver'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            typedElement.textContent = isDeleting
                ? currentWord.substring(0, charIndex - 1)
                : currentWord.substring(0, charIndex + 1);

            isDeleting ? charIndex-- : charIndex++;

            let typeSpeed = isDeleting ? 60 : 120;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }

            setTimeout(type, typeSpeed);
        };
        type();
    }

    // ===== LANGUAGE BAR ANIMATION (About Page) =====
    const langBars = document.querySelectorAll('.lang-fill');
    if (langBars.length) {
        const langObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                    langObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        langBars.forEach(bar => langObserver.observe(bar));
    }

    // ===== SKILL PROGRESS BARS =====
    const progressBars = document.querySelectorAll('.progress-fill');
    if (progressBars.length) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        progressBars.forEach(bar => progressObserver.observe(bar));
    }

    // ===== PROJECT FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ===== PROJECT MODAL =====
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return; // ignore link clicks
            // Populate modal & open (customize as needed)
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalClose?.addEventListener('click', () => {
        modal?.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== SKILL TABS (Skills Page) =====
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            skillCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 200);
                }
            });
        });
    });

    // ===== CONTACT FORM VALIDATION =====
    const contactForm = document.querySelector('.contact-form');
    contactForm?.addEventListener('submit', function (e) {
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        let valid = true;

        if (!name || name.length < 2) {
            showFieldError('name', 'Please enter a valid name');
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showFieldError('email', 'Please enter a valid email address');
            valid = false;
        }

        if (!message || message.length < 10) {
            showFieldError('message', 'Message must be at least 10 characters');
            valid = false;
        }

        if (!valid) e.preventDefault();
    });

    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        field.style.borderColor = '#dc3545';
        setTimeout(() => {
            field.style.borderColor = '';
        }, 3000);
    }

    // ===== CONSOLE GREETING =====
    console.log('%c👋 Welcome to Vidurshini\'s Portfolio!',
        'color: #6c63ff; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using Java EE 8 & JSP',
        'color: #00d4ff; font-size: 12px;');
});