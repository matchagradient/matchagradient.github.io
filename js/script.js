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
            for (let i = 0; i < 333; i++) {
                const dot = document.createElement('div');
                dot.className = 'floating-dot';
                dot.style.left = Math.random() * 100 + '%';
                dot.style.top = Math.random() * 100 + 'vh'; // Start below viewport
                // dot.style.animationDelay = Math.random() * 10 + 's';
                dot.style.animationDuration = (1+ Math.random() * 12) + 's'; // 8-20 seconds
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
        createFloatingDots();
        
        // Event listeners
        document.addEventListener('mousemove', handleMouseMove);
        
        // Start animation
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            mouseX = window.innerWidth / 2;
            mouseY = window.innerHeight / 2;
        });