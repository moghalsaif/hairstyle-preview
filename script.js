// Background Animation
class Dot {
    constructor(container) {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.width = '8px';
        this.element.style.height = '8px';
        this.element.style.backgroundColor = '#A67B5B';
        this.element.style.opacity = '0.08';
        this.element.style.borderRadius = '50%';
        this.element.style.transition = 'opacity 0.3s ease';
        
        this.container = container;
        this.reset();
        this.container.appendChild(this.element);

        // Add hover effect
        this.element.addEventListener('mouseover', () => {
            this.element.style.opacity = '0.2';
        });
        this.element.addEventListener('mouseout', () => {
            this.element.style.opacity = '0.08';
        });
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > window.innerWidth || 
            this.y < 0 || this.y > window.innerHeight) {
            this.reset();
        }

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

// Initialize background animation
const backgroundAnimation = document.querySelector('.background-animation');
const dots = Array.from({ length: 80 }, () => new Dot(backgroundAnimation));

function animate() {
    dots.forEach(dot => dot.update());
    requestAnimationFrame(animate);
}

animate();

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// File Upload Preview with loading animation
function handleFileUpload(inputId, imageId) {
    const input = document.getElementById(inputId);
    const image = document.getElementById(imageId);
    const imageBox = image.closest('.image-box');

    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Add loading state
            imageBox.classList.add('loading');
            
            const reader = new FileReader();
            reader.onload = function(event) {
                // Simulate processing time
                setTimeout(() => {
                    image.src = event.target.result;
                    imageBox.classList.remove('loading');
                    
                    // Add success animation
                    imageBox.classList.add('upload-success');
                    setTimeout(() => {
                        imageBox.classList.remove('upload-success');
                    }, 1000);
                }, 800);
            };
            reader.readAsDataURL(file);
        }
    });
}

handleFileUpload('faceUpload', 'userPhoto');
handleFileUpload('styleUpload', 'stylePhoto');

// Interactive button animations
function handleButtonHover(button) {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
    });
}

// Waitlist Button Animation
function handleWaitlistClick(button) {
    button.style.transform = 'scale(0.95) translateY(2px)';
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    button.appendChild(ripple);
    
    setTimeout(() => {
        button.style.transform = 'scale(1) translateY(0)';
        ripple.remove();
        alert('Thanks for your interest! We\'ll notify you when we launch.');
    }, 150);
}

const waitlistButton = document.querySelector('.waitlist-button');
const headerWaitlistButton = document.querySelector('.header-waitlist-button');

[waitlistButton, headerWaitlistButton].forEach(button => {
    button.addEventListener('click', () => handleWaitlistClick(button));
    handleButtonHover(button);
});

// Add parallax effect to background dots
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    dots.forEach((dot, index) => {
        const depth = (index % 3 + 1) * 0.2;
        dot.x += mouseX * depth;
        dot.y += mouseY * depth;
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate__animated').forEach(el => {
    observer.observe(el);
});

// Responsive Design Handlers
function handleResize() {
    const showcase = document.querySelector('.showcase');
    if (window.innerWidth <= 768) {
        showcase.style.padding = '2rem 0';
    } else {
        showcase.style.padding = '4rem 0';
    }
}

window.addEventListener('resize', handleResize);
handleResize();
