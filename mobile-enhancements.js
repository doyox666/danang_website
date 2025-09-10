// Optimize loading screen for mobile
window.addEventListener('load', () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const loader = document.getElementById('loader');
    
    if (loader && isMobile) {
        // Shorter loading time on mobile
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500); // 1.5 seconds for mobile vs 3 seconds for desktop
    }
});

// Mobile-specific JavaScript enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Add mobile class to body
    if (isMobile) {
        document.body.classList.add('is-mobile');
    }
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    // Improved mobile menu with swipe gestures
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Swipe to close menu
    if (navMenu && isTouchDevice) {
        navMenu.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        navMenu.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) { // Swipe left
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
    
    // Improve touch feedback for buttons
    const buttons = document.querySelectorAll('.btn, .social-link, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        button.addEventListener('touchend', function() {
            this.style.opacity = '';
        });
    });
    
    // Smooth scroll with offset for mobile
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 10;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Optimize animations for mobile
    if (isMobile) {
        // Disable heavy animations
        const matrixBg = document.querySelector('.matrix-bg');
        if (matrixBg) {
            matrixBg.style.display = 'none';
        }
        
        // Simplify glitch effect
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(el => {
            el.classList.remove('glitch');
        });
        
        // Reduce particle effects
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
    }
    
    // Lazy loading for images on mobile
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        // Recalculate viewport height for proper display
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Close mobile menu on orientation change
        if (navMenu) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Initial viewport height calculation
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Prevent double-tap zoom on buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Improve form usability on mobile
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Auto-resize textarea
        if (input.tagName === 'TEXTAREA') {
            input.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        }
        
        // Show clear button for inputs
        if (input.type === 'text' || input.type === 'email') {
            input.addEventListener('input', function() {
                if (this.value.length > 0) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        }
    });
    
    // Performance optimization for scroll events
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    function updateOnScroll() {
        // Update navbar on scroll
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Add pull-to-refresh functionality (optional)
    let pullStartY = 0;
    let pullMoveY = 0;
    const pullThreshold = 100;
    
    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            pullStartY = e.touches[0].pageY;
        }
    });
    
    document.addEventListener('touchmove', (e) => {
        if (pullStartY > 0) {
            pullMoveY = e.touches[0].pageY;
            const pullDistance = pullMoveY - pullStartY;
            
            if (pullDistance > pullThreshold && window.scrollY === 0) {
                // Optional: Add pull-to-refresh indicator
            }
        }
    });
    
    document.addEventListener('touchend', () => {
        if (pullMoveY - pullStartY > pullThreshold && window.scrollY === 0) {
            // Optional: Trigger refresh
            // location.reload();
        }
        pullStartY = 0;
        pullMoveY = 0;
    });
    
    // Mobile-optimized skill animations
    if (isMobile) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            const level = item.getAttribute('data-level');
                            const progressBar = item.querySelector('.skill-progress');
                            if (progressBar) {
                                progressBar.style.width = level + '%';
                            }
                        }, index * 50); // Faster animation on mobile
                    });
                }
            });
        }, { threshold: 0.2 });
        
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }
    }
    
    // Optimize stat counter for mobile
    if (isMobile) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stats = entry.target.querySelectorAll('.stat-number');
                    stats.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        stat.textContent = target >= 1000 ? target.toLocaleString() + '+' : target + '+';
                    });
                }
            });
        }, { threshold: 0.2 });
        
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            statObserver.observe(aboutSection);
        }
    }
});

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}