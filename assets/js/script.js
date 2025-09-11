const cube = document.getElementById('cube');
        const cursorGlow = document.getElementById('cursorGlow');
        const floatingElements = document.getElementById('floatingElements');
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let rotationX = 0;
        let rotationY = 0;
        let autoRotation = 0;
        // Create floating dots
        function createFloatingDots() {
            for (let i = 0; i < 128; i++) {
                const dot = document.createElement('div');
                dot.className = 'floating-dot';
                dot.style.left = Math.random() * 100 + '%';
                dot.style.top = Math.random() * 100 + 'vh'; // Start below viewport
                // dot.style.animationDelay = Math.random() * 10 + 's';
                dot.style.animationDuration = (1+ Math.random() * 18) + 's';
                floatingElements.appendChild(dot);
            }
        }
        // Mouse move handler
        function handleMouseMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Update cursor glow position
            cursorGlow.style.left = (mouseX - 10) + 'px';
            cursorGlow.style.top = (mouseY - 10) + 'px';
        }
        // Animation loop
        function animate() {
            // Calculate rotation based on mouse position
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            rotationY = ((mouseX - centerX) / centerX) * 45;
            rotationX = ((mouseY - centerY) / centerY) * -45;
            // Add continuous auto-rotation
            autoRotation += 0.33;
            // Update cube position and rotation
            const cubeX = mouseX - 30;
            const cubeY = mouseY - 30;
            cube.style.left = cubeX + 'px';
            cube.style.top = cubeY + 'px';
            cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY + autoRotation}deg)`;
            requestAnimationFrame(animate);
        }
        // Smooth scrolling for navigation
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
        // Initialize
        if (document.body.classList.contains("enable-dots")) {
            createFloatingDots();
            // Start animation
            animate();
            // Event listeners
            document.addEventListener('mousemove', handleMouseMove);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            mouseX = window.innerWidth / 2;
            mouseY = window.innerHeight / 2;
        });
        function downloadCVAsJSON() {
            const cvData = {
                personalInfo: {
                    name: "Mike Wang",
                    lastUpdated: new Date().toISOString(),
                    exportedFrom: "Website",
                    contact: parseContactInfo()
                },
                education: parseEducation(),
                experience: parseExperience(),
                skills: parseSkills()
            };
            const jsonString = JSON.stringify(cvData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mikewang-cv-data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        function parseContactInfo() {
            const contactSection = document.querySelector('.contact-info');
            if (!contactSection) return {};
            const contactLinks = contactSection.querySelectorAll('.contact-link');
            const contact = {};
            contactLinks.forEach(link => {
                const href = link.getAttribute('href');
                const text = link.textContent.trim();
                if (href.startsWith('mailto:')) {
                    contact.email = href.replace('mailto:', '');
                } else if (href.includes('linkedin.com')) {
                    contact.linkedin = href;
                } else if (href.includes('github.com')) {
                    contact.github = href;
                } else if (href.startsWith('tel:')) {
                    contact.phone = href.replace('tel:', '');
                } else {
                    // Generic website/portfolio
                    contact.website = href;
                }
            });
            return contact;
        }
        function parseEducation() {
            const educationSection = Array.from(document.querySelectorAll('.cv-section')).find(section =>
                section.querySelector('h3')?.textContent.trim() === 'Education');
            if (!educationSection) return [];
            const educationItems = educationSection.querySelectorAll('.cv-item');
            return Array.from(educationItems).map(item => {
                const degree = item.querySelector('h4')?.textContent.trim() || '';
                const institution = item.querySelector('.institution')?.textContent.trim() || '';
                const description = item.querySelector('p')?.textContent.trim() || '';
                return {
                    degree,
                    institution,
                    description
                };
            });
        }
        function parseExperience() {
            const experienceSection = Array.from(document.querySelectorAll('.cv-section')).find(section =>
                section.querySelector('h3')?.textContent.includes('Experience'));
            if (!experienceSection) return [];
            const experienceItems = experienceSection.querySelectorAll('.cv-item');
            return Array.from(experienceItems).map(item => {
                const company = item.querySelector('.company')?.textContent.trim() || '';
                const title = item.querySelector('.job-title')?.textContent.trim() || '';
                const location = item.querySelector('.location')?.textContent.trim() || '';
                const dates = item.querySelector('.date')?.textContent.trim() || '';
                const description = item.querySelector('p')?.textContent.trim() || '';
                return {
                    company,
                    title,
                    location,
                    dates,
                    description
                };
            });
        }
        function parseSkills() {
            const skillsSection = Array.from(document.querySelectorAll('.cv-section')).find(section =>
                section.querySelector('h3')?.textContent.includes('Skills'));
            if (!skillsSection) return {};
            const skillItems = skillsSection.querySelectorAll('.skill-item');
            const skills = {};
            skillItems.forEach(item => {
                const category = item.querySelector('h4')?.textContent.trim() || '';
                const skillsText = item.querySelector('p')?.textContent.trim() || '';
                const skillsArray = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);
                if (category && skillsArray.length > 0) {
                    skills[category] = skillsArray;
                }
            });
            return skills;
        }

// Mobile menu toggle functionality
const mobileToggle = document.querySelector('.mobile-toggle');
const navContent = document.querySelector('.nav-content');
const hamburger = document.querySelector('.hamburger');

mobileToggle.addEventListener('click', function() {
    navContent.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navContent.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('nav')) {
        navContent.classList.remove('active');
        hamburger.classList.remove('active');
    }
})