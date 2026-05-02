// 魔法网站 - 增强版交互脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMagicBackground();
    initNavigation();
    initSmoothScroll();
    initScrollEffects();
    initSkillBars();
    initContactForm();
    initScrollIndicator();
    initAnimations();
    initTypingEffect();
    initMouseFollow();
    initParallax();
    initCard3DEffect();
});

// 魔法背景粒子效果
function initMagicBackground() {
    const bg = document.createElement('div');
    bg.className = 'magic-bg';
    document.body.appendChild(bg);

    // 创建30个魔法粒子
    for (let i = 0; i < 30; i++) {
        createMagicParticle(bg);
    }
}

function createMagicParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'magic-particle';
    
    // 随机位置、大小、动画延迟
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (10 + Math.random() * 10) + 's';
    
    // 随机大小
    const size = 2 + Math.random() * 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // 随机颜色
    const colors = [
        'rgba(102, 126, 234, 0.8)',
        'rgba(240, 147, 251, 0.8)',
        'rgba(118, 75, 162, 0.8)',
        'rgba(255, 215, 0, 0.6)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = 'radial-gradient(circle, ' + color + ', transparent)';
    
    container.appendChild(particle);
}

// 导航栏功能
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 移动端菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 点击导航链接时关闭移动端菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// 平滑滚动功能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // 只对锚点链接添加平滑滚动
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    e.preventDefault();
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// 滚动效果
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 滚动时高亮当前导航
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
}

// 技能条动画
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                setTimeout(function() {
                    bar.style.width = width;
                }, 200);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// 联系表单功能
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (!name || !email || !subject || !message) {
                showNotification('请填写所有必填字段', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            // 模拟发送
            setTimeout(function() {
                showNotification('消息发送成功！', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// 邮箱验证
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知系统
function showNotification(message, type) {
    // 移除现有通知
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(function() {
        notification.classList.add('show');
    }, 10);
    
    // 自动隐藏
    setTimeout(function() {
        notification.classList.remove('show');
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3500);
}

// 滚动指示器
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// 打字机效果
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let currentIndex = 0;
    function typeText() {
        if (currentIndex < originalText.length) {
            heroTitle.textContent += originalText[currentIndex];
            currentIndex++;
            const delay = Math.random() * 50 + 30;
            setTimeout(typeText, delay);
        }
    }
    
    setTimeout(typeText, 800);
}

// 鼠标跟随效果
function initMouseFollow() {
    function createFollower(delay, size, color) {
        const follower = document.createElement('div');
        follower.style.cssText = 
            'position: fixed;' +
            'width: ' + size + 'px;' +
            'height: ' + size + 'px;' +
            'border-radius: 50%;' +
            'background: radial-gradient(circle, ' + color + ', transparent);' +
            'pointer-events: none;' +
            'z-index: 9998;' +
            'opacity: 0.4;' +
            'transition: transform 0.1s ease-out;';
        document.body.appendChild(follower);
        
        let currentX = window.innerWidth / 2;
        let currentY = window.innerHeight / 2;
        
        document.addEventListener('mousemove', function(e) {
            setTimeout(function() {
                currentX += (e.clientX - currentX) * (1 - delay);
                currentY += (e.clientY - currentY) * (1 - delay);
                follower.style.transform = 'translate(' + (currentX - size/2) + 'px, ' + (currentY - size/2) + 'px)';
            }, delay * 100);
        });
    }
    
    // 创建3个跟随元素
    createFollower(0.1, 30, 'rgba(102, 126, 234, 0.6)');
    createFollower(0.2, 20, 'rgba(240, 147, 251, 0.5)');
    createFollower(0.3, 15, 'rgba(118, 75, 162, 0.4)');
}

// 视差效果
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
}

// 动画初始化
function initAnimations() {
    const animatedElements = document.querySelectorAll('.stat-item, .skill-category, .project-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('fade-in-up');
                }, index * 100);
            }
        });
    }, observerOptions);

    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

// 页面加载动画
window.addEventListener('load', function() {
    // 添加加载动画
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
    
    setTimeout(function() {
        loading.classList.add('hidden');
        setTimeout(function() {
            loading.remove();
        }, 500);
    }, 800);
    
    // 添加返回顶部按钮
    addBackToTopButton();
});

// 返回顶部按钮
function addBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', '返回顶部');
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, 100));
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 节流函数
function throttle(func, limit) {
    let inThrottle = false;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

// 添加3D倾斜效果到卡片
function initCard3DEffect() {
    const cards = document.querySelectorAll('.skill-category, .project-card, .stat-item, .contact-item');
    
    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
}
