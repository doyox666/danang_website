// Terminal Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 3000);
});

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Typing effect for hero subtitle
const typingElements = document.querySelectorAll('.typing');
typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 1000);
});

// Stats counter animation
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateStat = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateStat, 10);
            } else {
                stat.textContent = target;
                if (target >= 1000) {
                    stat.textContent = target.toLocaleString() + '+';
                } else {
                    stat.textContent = target + '+';
                }
            }
        };
        
        updateStat();
    });
};

// Skill bars animation
const animateSkills = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        const progressBar = item.querySelector('.skill-progress');
        
        setTimeout(() => {
            progressBar.style.width = level + '%';
        }, 200);
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about')) {
                animateStats();
            }
            if (entry.target.classList.contains('skills')) {
                animateSkills();
            }
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Matrix background effect
const createMatrixEffect = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixBg = document.querySelector('.matrix-bg');
    
    if (!matrixBg) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.opacity = '0.03';
    canvas.style.pointerEvents = 'none';
    
    matrixBg.appendChild(canvas);
    
    const matrix = '01';
    const matrixArray = matrix.split('');
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    };
    
    setInterval(draw, 35);
};

// Initialize matrix effect
createMatrixEffect();

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        const button = contactForm.querySelector('button');
        const originalText = button.innerHTML;
        button.innerHTML = '<span>✓ Message Sent Successfully</span>';
        button.style.background = 'var(--success-color)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 3000);
    });
}

// Add glitch effect on hover
document.querySelectorAll('.glitch').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'glitch 0.3s infinite';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.animation = 'glitch 2s infinite';
    });
});

// Terminal command simulation
const addTerminalCommands = () => {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.animation = 'fadeIn 0.5s ease';
        }, index * 500);
    });
};

// Initialize terminal commands
window.addEventListener('DOMContentLoaded', addTerminalCommands);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'H' to go home
    if (e.key === 'h' || e.key === 'H') {
        window.location.hash = '#home';
    }
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        window.location.hash = '#contact';
    }
});

// Console Easter Egg
console.log('%c🔒 Security Notice', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cThis is a secure area. All activities are monitored and logged.', 'color: #fff; font-size: 14px;');
console.log('%cInterested in cybersecurity? Let\'s connect!', 'color: #00d4ff; font-size: 14px;');
console.log('%chttps://www.linkedin.com/in/danangyp/', 'color: #00ff41; font-size: 12px;');