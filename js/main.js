// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 移动菜单切换 - 使用现代的交互方式
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a');
  const body = document.body;
  const header = document.querySelector('header');
  
  // 移动端媒体查询
  const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
  
  // 菜单动画状态
  let isAnimating = false;
  
  // 切换菜单函数
  function toggleMenu() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    if (navLinks.classList.contains('active')) {
      // 关闭菜单
      navLinks.classList.remove('active');
      body.style.overflow = '';
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      
      // 动画完成后重置状态
      setTimeout(() => {
        isAnimating = false;
      }, 300); // 匹配CSS过渡时间
    } else {
      // 打开菜单
      navLinks.classList.add('active');
      body.style.overflow = 'hidden';
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
      
      // 动画完成后重置状态
      setTimeout(() => {
        isAnimating = false;
      }, 300); // 匹配CSS过渡时间
    }
  }
  
  // 菜单按钮点击事件
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
  }
  
  // 点击链接时关闭菜单
  navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
      if (mobileMediaQuery.matches && navLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
  
  // 点击页面空白处关闭菜单
  document.addEventListener('click', function(e) {
    if (!mobileMediaQuery.matches) return;
    
    const isNavLinks = e.target.closest('.nav-links');
    const isMenuBtn = e.target.closest('.mobile-menu-btn');
    
    if (!isNavLinks && !isMenuBtn && navLinks.classList.contains('active')) {
      toggleMenu();
    }
  });
  
  // 滚动监听 - 使用Intersection Observer实现更高效的滚动监听
  const scrollObserver = new IntersectionObserver(
    entries => {
      const [entry] = entries;
      const isScrolled = !entry.isIntersecting;
      
      if (isScrolled) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    },
    { 
      rootMargin: '-100px 0px 0px 0px',
      threshold: 0 
    }
  );
  
  // 创建一个元素来观察顶部区域
  const topMarker = document.createElement('div');
  topMarker.style.position = 'absolute';
  topMarker.style.top = '0';
  topMarker.style.height = '1px';
  topMarker.style.width = '100%';
  topMarker.style.pointerEvents = 'none';
  document.body.prepend(topMarker);
  
  scrollObserver.observe(topMarker);
  
  // 监听媒体查询变化，处理从移动端到桌面端的转换
  function handleMediaQueryChange(e) {
    if (!e.matches && navLinks.classList.contains('active')) {
      // 如果从移动视图切换到桌面视图，且菜单处于打开状态，则关闭菜单
      navLinks.classList.remove('active');
      body.style.overflow = '';
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  }
  
  mobileMediaQuery.addEventListener('change', handleMediaQueryChange);
  
  // 平滑滚动到锚点，使用原生的 scrollIntoView
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // 使用更现代的平滑滚动方法
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    });
  });
  
  // 滑动器功能
  const sliders = document.querySelectorAll('.phone-slider');
  
  sliders.forEach(initializeSlider);
  
  function initializeSlider(slider) {
    const slides = slider.querySelectorAll('.phone-slide');
    const prevBtn = slider.parentElement.querySelector('.slider-prev');
    const nextBtn = slider.parentElement.querySelector('.slider-next');
    const dots = slider.parentElement.querySelectorAll('.dot');
    let currentIndex = 0;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;
    
    // 显示指定索引的幻灯片，使用现代的过渡效果
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
    
    // 自动轮播控制
    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 3000);
    }
    
    function stopAutoSlide() {
      clearInterval(slideInterval);
    }
    
    // 触摸事件处理 - 增强移动设备体验
    function handleTouchStart(e) {
      touchStartX = e.touches[0].clientX;
      stopAutoSlide();
    }
    
    function handleTouchMove(e) {
      touchEndX = e.touches[0].clientX;
    }
    
    function handleTouchEnd() {
      const swipeDistance = touchEndX - touchStartX;
      
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
      
      startAutoSlide();
    }
    
    // 添加触摸事件监听器
    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: true });
    slider.addEventListener('touchend', handleTouchEnd);
    
    // 点击事件
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
      });
    }
    
    // 点击导航点
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
      });
    });
    
    // 鼠标事件
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // 初始化
    showSlide(0);
    startAutoSlide();
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
