document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // MOBILE MENU FUNCTIONALITY
    // ============================================
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.querySelector('.navbar');
    const mobileNavLinks = document.querySelectorAll('.navbar a');

    // Create menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    // Toggle mobile menu
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
    }

    // Close mobile menu
    function closeMenu() {
        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Hamburger click handler
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking a nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Close menu on window resize if desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Detect touch devices and disable custom cursor
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) {
        document.documentElement.style.setProperty('cursor', 'auto', 'important');
    }

    // ============================================
    // EXISTING FUNCTIONALITY
    // ============================================

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const homeImageLight = document.getElementById('home-image');
    const homeImageDark = document.getElementById('home-image-dark');

    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    // Function to update images based on theme
    function updateImages(theme) {
        if (theme === 'dark') {
            if (homeImageLight) homeImageLight.style.display = 'none';
            if (homeImageDark) homeImageDark.style.display = 'block';
        } else {
            if (homeImageLight) homeImageLight.style.display = 'block';
            if (homeImageDark) homeImageDark.style.display = 'none';
        }
    }

    // Initialize images on load
    updateImages(savedTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateImages(newTheme);
    });

    // Animated Text Rotation for "Hi, I am KAMEL"
    const animatedName = document.getElementById('animated-name');
    const nameVariations = [
        'Hi, I am KAMEL',
        'Software Engineer',
        'Full Stack Developer',
        'Problem Solver',
        'Team Worker'
    ];

    let currentNameIndex = 0;

    function rotateName() {
        if (animatedName) {
            animatedName.classList.add('fade-out');

            setTimeout(() => {
                currentNameIndex = (currentNameIndex + 1) % nameVariations.length;
                animatedName.textContent = nameVariations[currentNameIndex];
                animatedName.classList.remove('fade-out');
                animatedName.classList.add('fade-in');

                setTimeout(() => {
                    animatedName.classList.remove('fade-in');
                }, 500);
            }, 500);
        }
    }

    // Start name rotation every 3 seconds
    if (animatedName) {
        setInterval(rotateName, 3000);
    }

    // Header scroll effect with parallax
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Subtle header parallax (removed to avoid conflicts)
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Remove active class from all links and add to the clicked link
                navLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Enhanced scroll-triggered animations with stagger
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.classList.add('active');
                }, index * 100); // Stagger animation
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .reveal').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for images
    const parallaxElements = document.querySelectorAll('.image-container img');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.3 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });

    // Add reveal class to skill categories for staggered animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.classList.add('reveal');
        category.style.transitionDelay = `${index * 0.1}s`;
    });

    // Handle section links for about page
    const sectionLinks = document.querySelectorAll('.section-link');
    const sectionContents = document.querySelectorAll('.section-content');

    sectionLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            // Special case: About "Projects and Work" link should navigate to the Projects section
            if (link.id === 'projects-link') {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                    const header = document.querySelector('.header');
                    const headerOffset = header ? header.offsetHeight : 0;
                    const y = projectsSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });

                    // Update navbar active state to Projects
                    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
                    const projectsNav = document.querySelector('nav a[href="#projects"]');
                    if (projectsNav) projectsNav.classList.add('active');
                }
                return; // Skip local about-section toggling
            }

            // Default behavior: toggle about section content blocks
            sectionLinks.forEach(link => link.classList.remove('active'));
            sectionContents.forEach(content => content.classList.remove('active'));

            link.classList.add('active');
            const targetId = link.getAttribute('id').replace('-link', '');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (window.pageYOffset >= sectionTop - 50 && window.pageYOffset < sectionTop + sectionHeight - 50) {
                    current = link.getAttribute('href');
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });

    // Language switcher
    const languageSelect = document.getElementById('language-select');
    const cvLink = document.getElementById('cv-link');

    function updateLanguage(lang) {
        document.querySelectorAll('[data-en]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    // Check if the content contains HTML tags (like the footer copyright)
                    if (element.innerHTML.includes('<') && element.children.length > 0) {
                        // For complex elements, we might need a different strategy
                        // But for now, let's assume we only use data-en on leaf nodes or simple text
                        // If we really need to preserve children, we should put data attributes on the text nodes' parents
                        // For the footer, we'll wrap the text in a span in HTML
                        element.innerHTML = text;
                    } else {
                        element.textContent = text;
                    }
                }
            }
        });

        // Update CV link based on language
        if (lang === 'fr') {
            cvLink.setAttribute('href', 'Kamel_CV_fr.pdf');
        } else {
            cvLink.setAttribute('href', 'Kamel_CV_en.pdf');
        }
        
        // Update toggle button text if it exists
        if (window.updateToggleButtonText) {
            window.updateToggleButtonText();
        }
    }

    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        updateLanguage(selectedLanguage);
    });

    // Optional: Set default language on page load
    updateLanguage(languageSelect.value);

    // Add smooth mouse movement parallax effect (only on desktop)
    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
        });

        function updateParallax() {
            const floatingElements = document.querySelectorAll('.image-container');
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 5;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
            requestAnimationFrame(updateParallax);
        }
        updateParallax();
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .btn-box a');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add typing effect to h1
    const h1 = document.querySelector('.home-content h1');
    if (h1) {
        const text = h1.textContent;
        h1.textContent = '';
        h1.style.borderRight = '2px solid';
        h1.style.animation = 'blink 1s infinite';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                h1.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    h1.style.borderRight = 'none';
                }, 500);
            }
        };

        setTimeout(typeWriter, 500);
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Add smooth entrance animations to form inputs
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach((input, index) => {
        input.style.opacity = '0';
        input.style.transform = 'translateY(20px)';
        setTimeout(() => {
            input.style.transition = 'all 0.5s ease';
            input.style.opacity = '1';
            input.style.transform = 'translateY(0)';
        }, 1000 + (index * 100));
    });

    // Modern Cursor Effects - Bubble & Sticky Cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Sticky cursor follower with smooth animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn-box a, .project-card, .skill-category, input, textarea, select, .theme-toggle');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });

    // Hide cursor on mobile devices
    if (window.matchMedia('(max-width: 768px)').matches) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
        document.querySelectorAll('*').forEach(el => {
            el.style.cursor = 'auto';
        });
    }

    // ========= Skills Section Animations =========
    // Set arc percentages on badges
    document.querySelectorAll('.badge.arc').forEach(badge => {
        const pct = parseInt(badge.getAttribute('data-pct') || '0', 10);
        badge.style.setProperty('--pct', pct);
    });

    // Observer for data-animate elements: fade-up + stagger badges
    const skillsIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.classList.add('in-view');
            const badges = el.querySelectorAll('.badge');
            badges.forEach(b => {
                const d = parseInt(b.getAttribute('data-delay') || '0', 10);
                setTimeout(() => b.classList.add('show'), d);
            });
            skillsIO.unobserve(el);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => skillsIO.observe(el));

    // Animated skill bars
    const barIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const bar = entry.target;
            const pct = parseInt(bar.getAttribute('data-percent') || '0', 10);
            const fill = bar.querySelector('.bar-fill');
            const label = bar.querySelector('.bar-label');
            if (fill) fill.style.width = pct + '%';
            if (label) label.style.left = pct + '%';
            barIO.unobserve(bar);
        });
    }, { threshold: 0.35 });

    document.querySelectorAll('.bar').forEach(bar => barIO.observe(bar));

    // Show More / Hide Details toggle (language aware)
    const toggleBtn = document.getElementById('details-toggle');
    const skillsDetails = document.getElementById('skills-details');
    const skillsSection = document.getElementById('skills');
    
    // Function to update button text based on language and state (accessible globally for language switcher)
    window.updateToggleButtonText = function() {
        if (!toggleBtn || !skillsSection) return;
        
        const langSelect = document.getElementById('language-select');
        const isFr = langSelect && langSelect.value === 'fr';
        const expanded = skillsSection.classList.contains('expanded');
        
        if (expanded) {
            toggleBtn.textContent = isFr 
                ? toggleBtn.getAttribute('data-expanded-fr') 
                : toggleBtn.getAttribute('data-expanded-en');
        } else {
            toggleBtn.textContent = isFr 
                ? toggleBtn.getAttribute('data-fr') 
                : toggleBtn.getAttribute('data-en');
        }
    };
    
    if (skillsSection && toggleBtn && skillsDetails) {
        // Initialize button text
        window.updateToggleButtonText();
        
        // Toggle button click handler
        toggleBtn.addEventListener('click', () => {
            const expanded = skillsSection.classList.toggle('expanded');
            skillsDetails.setAttribute('aria-hidden', expanded ? 'false' : 'true');

            // Compute header offset to avoid fixed header covering content
            const headerEl = document.querySelector('.header');
            const offset = headerEl ? headerEl.offsetHeight + 12 : 0;

            // Scroll to the revealed content when expanding; back to section when collapsing
            if (expanded) {
                // Scroll to the details section
                const targetTop = skillsDetails.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
            }

            // Update button label based on current language
            window.updateToggleButtonText();
        });
    }

    // Optional floating particles in skills section
    const particlesLayer = document.querySelector('.skills-particles');
    if (particlesLayer && !particlesLayer.hasChildNodes()) {
        const count = 14;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('span');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = (Math.random() * 10).toFixed(2) + 's';
            p.style.opacity = (0.2 + Math.random() * 0.4).toFixed(2);
            particlesLayer.appendChild(p);
        }
    }
});
