document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 2, 20, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(155, 114, 207, 0.3)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.85)';
            navbar.style.borderBottom = '1px solid transparent';
            navbar.style.padding = '1rem 0';
        }
    });

    // 5. Intersection Observer for Reveal Animations
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Keep observing if you want repeat animation
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Petal Bloom Animation
    const btnBloomNav = document.getElementById('btn-bloom-nav');
    const petalsContainer = document.getElementById('petals-container');

    if (btnBloomNav && petalsContainer) {
        btnBloomNav.addEventListener('click', (e) => {
            // Only trigger petals if it's not a direct WhatsApp link or prevent default if we want petals first
            // For now, let's just trigger it.
            createPetals(40);
        });
    }

    function createPetals(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.classList.add('petal');
                
                const size = Math.random() * 15 + 10;
                petal.style.width = `${size}px`;
                petal.style.height = `${size}px`;
                petal.style.left = `${Math.random() * 100}vw`;
                
                const duration = Math.random() * 3 + 3;
                petal.style.animationDuration = `${duration}s`;
                
                // Random rotate
                petal.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                petalsContainer.appendChild(petal);
                
                setTimeout(() => {
                    petal.remove();
                }, duration * 1000);
            }, i * 100);
        }
    }

    // 7. Parallax for hero logo
    const heroLogo = document.querySelector('.hero-large-logo');
    if (heroLogo) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroLogo.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
});
