/* Apple-inspired clean JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initScrollEffects();
  initSkillBars();
  initContactForm();
});

function initNavigation() {
  const nav = document.querySelector('.nav');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  // Scroll effect for navigation
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
  });
  
  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('mobile-open');
    });
  }
  
  // Close mobile menu on link click
  const navLinkItems = document.querySelectorAll('.nav-link');
  navLinkItems.forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('mobile-open');
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollPosition = window.scrollY + 150;
  
  sections.forEach(function(section) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId || 
            (sectionId === 'hero' && link.getAttribute('href') === 'index.html')) {
          link.classList.add('active');
        }
      });
    }
  });
}

function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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
  
  const animatedElements = document.querySelectorAll('.stat-item, .skill-group, .project-item');
  animatedElements.forEach(function(el) {
    observer.observe(el);
  });
}

function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        
        setTimeout(function() {
          bar.style.width = width;
        }, 300);
      }
    });
  }, observerOptions);
  
  skillBars.forEach(function(bar) {
    observer.observe(bar);
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = form.querySelector('input[name="name"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const subject = form.querySelector('input[name="subject"]').value;
      const message = form.querySelector('textarea[name="message"]').value;
      
      if (!name || !email || !subject || !message) {
        alert('请填写所有必填字段');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('请输入有效的邮箱地址');
        return;
      }
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '发送中...';
      submitBtn.disabled = true;
      
      setTimeout(function() {
        alert('消息发送成功！');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
