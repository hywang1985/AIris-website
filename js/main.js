// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 移动菜单切换
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // 在滚动时改变导航栏样式
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = '#ffffff';
      header.style.boxShadow = 'none';
    }
  });
  
  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // 如果在移动设备上，关闭菜单
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });
  
  // 图片懒加载
  const lazyImages = document.querySelectorAll('.lazy-image');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-image');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // 对于不支持IntersectionObserver的浏览器的备用方案
    let lazyLoadThrottleTimeout;
    
    function lazyLoad() {
      if (lazyLoadThrottleTimeout) {
        clearTimeout(lazyLoadThrottleTimeout);
      }
      
      lazyLoadThrottleTimeout = setTimeout(function() {
        const scrollTop = window.pageYOffset;
        
        lazyImages.forEach(img => {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove('lazy-image');
          }
        });
        
        if (lazyImages.length === 0) {
          document.removeEventListener('scroll', lazyLoad);
          window.removeEventListener('resize', lazyLoad);
          window.removeEventListener('orientationChange', lazyLoad);
        }
      }, 20);
    }
    
    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationChange', lazyLoad);
  }
  
  // 联系表单处理
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 基本表单验证
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        markInvalid(nameInput);
        isValid = false;
      } else {
        markValid(nameInput);
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        markInvalid(emailInput);
        isValid = false;
      } else {
        markValid(emailInput);
      }
      
      if (!messageInput.value.trim()) {
        markInvalid(messageInput);
        isValid = false;
      } else {
        markValid(messageInput);
      }
      
      if (isValid) {
        // 在这里你可以添加实际的表单提交逻辑
        // 例如使用fetch API提交到后端
        
        // 模拟表单提交
        contactForm.classList.add('submitting');
        
        setTimeout(() => {
          contactForm.classList.remove('submitting');
          contactForm.classList.add('submitted');
          contactForm.reset();
          
          // 显示成功消息
          const successMessage = document.createElement('div');
          successMessage.className = 'alert-success';
          successMessage.textContent = currentLang === 'en_us' ? 
            'Your message has been sent successfully!' : 
            '您的消息已成功发送！';
          
          contactForm.parentNode.insertBefore(successMessage, contactForm);
          
          // 3秒后移除成功消息
          setTimeout(() => {
            successMessage.remove();
            contactForm.classList.remove('submitted');
          }, 3000);
        }, 1500);
      }
    });
  }
  
  // 滑动器功能
  const sliders = document.querySelectorAll('.phone-slider');
  
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.phone-slide');
    const prevBtn = slider.parentElement.querySelector('.slider-prev');
    const nextBtn = slider.parentElement.querySelector('.slider-next');
    const dots = slider.parentElement.querySelectorAll('.dot');
    let currentIndex = 0;
    let slideInterval; // 自动轮播计时器
    
    // 显示指定索引的幻灯片
    function showSlide(index) {
      // 隐藏所有幻灯片
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // 清除所有点的活跃状态
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // 显示当前幻灯片和点
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      currentIndex = index;
    }
    
    // 下一张幻灯片
    function nextSlide() {
      let newIndex = currentIndex + 1;
      if (newIndex >= slides.length) {
        newIndex = 0;
      }
      showSlide(newIndex);
    }
    
    // 上一张幻灯片
    function prevSlide() {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = slides.length - 1;
      }
      showSlide(newIndex);
    }
    
    // 开始自动轮播
    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 3000); // 每3秒切换一次
    }
    
    // 停止自动轮播
    function stopAutoSlide() {
      clearInterval(slideInterval);
    }
    
    // 点击下一个按钮
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        stopAutoSlide(); // 用户交互时停止自动轮播
        nextSlide();
        startAutoSlide(); // 重新开始自动轮播
      });
    }
    
    // 点击上一个按钮
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        stopAutoSlide(); // 用户交互时停止自动轮播
        prevSlide();
        startAutoSlide(); // 重新开始自动轮播
      });
    }
    
    // 点击导航点
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        stopAutoSlide(); // 用户交互时停止自动轮播
        showSlide(index);
        startAutoSlide(); // 重新开始自动轮播
      });
    });
    
    // 鼠标悬停在轮播图上时暂停自动轮播
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // 初始化：显示第一张幻灯片并开始自动轮播
    showSlide(0);
    startAutoSlide();
  });
  
  // 隐私政策切换
  const privacyToggle = document.querySelector('.privacy-detail-toggle');
  const privacyDetail = document.querySelector('.privacy-detail');
  const privacyClose = document.querySelector('.privacy-detail-close');
  
  if (privacyToggle && privacyDetail) {
    privacyToggle.addEventListener('click', function(e) {
      e.preventDefault();
      privacyDetail.classList.add('active');
    });
  }
  
  if (privacyClose && privacyDetail) {
    privacyClose.addEventListener('click', function(e) {
      e.preventDefault();
      privacyDetail.classList.remove('active');
    });
  }
});

// 辅助函数
function isValidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function markInvalid(input) {
  input.classList.add('invalid');
  input.classList.remove('valid');
}

function markValid(input) {
  input.classList.remove('invalid');
  input.classList.add('valid');
}
