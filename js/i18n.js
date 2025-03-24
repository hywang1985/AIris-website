// 多语言支持
const translations = {
  en_us: {
    // 导航
    nav_home: "Home",
    nav_features: "Features",
    nav_showcase: "Showcase",
    nav_privacy: "Privacy Policy",
    nav_contact: "Contact",
    nav_terms: "Terms of Service",
    // 主页
    hero_title: "AIris - Photo Aesthetic Rating",
    hero_subtitle: "Find your best photos",
    // 功能特点
    features_title: "Smart Features",
    feature_scoring: "AI Aesthetic Scoring",
    feature_scoring_desc: "Our local AI analyzes and rates your photos based on composition, lighting, and clarity",
    feature_grouping: "Similar Photo Grouping",
    feature_grouping_desc: "Intelligently identifies and groups similar photos to help you pick the best ones",
    feature_cleanup: "Quick Cleanup",
    feature_cleanup_desc: "Easily remove duplicates, blurry images and free up valuable storage space",
    feature_privacy: "Privacy Protection",
    feature_privacy_desc: "All processing is done entirely on your device. No photo data is ever uploaded",
    // 产品展示
    product_title: "Discover AIris",
    product_subtitle: "Experience a new way to manage your photos",
    showcase_cta: "Start organizing your photo library now",
    // 隐私政策
    privacy_title: "Privacy Policy",
    privacy_subtitle: "We value your privacy",
    privacy_summary: "AIris understands the importance of your personal information and is committed to protecting it.",
    privacy_point1: "All photo processing is done locally on your device",
    privacy_point2: "Your photos are never uploaded to any servers",
    privacy_point3: "Only anonymous usage data is collected to improve the app",
    privacy_point4: "No personal information is shared with third parties",
    privacy_read_full: "Read full privacy policy",
    privacy_close: "Close",
    // 按钮
    btn_download: "Download Now",
    btn_learn_more: "Learn More",
    // 联系我们
    contact_title: "Contact Us",
    contact_desc: "We'd love to hear from you",
    contact_intro: "If you have any questions, please contact us at:",
    contact_reply: "We will reply to your email as soon as possible.",
    // 页脚
    footer_copyright: "© 2024 AIris. All rights reserved.",
    terms_title: "Terms of Service",
  },
  zh_cn: {
    // 导航
    nav_home: "首页",
    nav_features: "功能",
    nav_showcase: "展示",
    nav_privacy: "隐私政策",
    nav_contact: "联系我们",
    nav_terms: "用户协议",
    // 主页
    hero_title: "AIris - 照片美学AI评分",
    hero_subtitle: "发现您照片中的最佳作品",
    // 功能特点
    features_title: "智能功能",
    feature_scoring: "AI美学打分",
    feature_scoring_desc: "本地AI智能分析照片的构图、光线和清晰度进行评分",
    feature_grouping: "相似照片分组",
    feature_grouping_desc: "智能识别并分组相似照片，帮您快速挑选最满意的一张",
    feature_cleanup: "快速清理",
    feature_cleanup_desc: "轻松清理重复和模糊内容，释放宝贵存储空间",
    feature_privacy: "隐私保护",
    feature_privacy_desc: "所有操作均在设备本地完成，照片数据绝不上传",
    // 产品展示
    product_title: "探索AIris",
    product_subtitle: "体验照片管理的全新方式",
    showcase_cta: "立即开始整理您的照片库",
    // 隐私政策
    privacy_title: "隐私政策",
    privacy_subtitle: "我们重视您的隐私",
    privacy_summary: "AIris深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。",
    privacy_point1: "所有照片处理均在您的设备本地完成",
    privacy_point2: "您的照片不会被上传到任何服务器",
    privacy_point3: "只收集匿名使用数据以改进应用体验",
    privacy_point4: "不与任何第三方共享您的个人信息",
    privacy_read_full: "阅读完整隐私政策",
    privacy_close: "关闭",
    // 按钮
    btn_download: "立即下载",
    btn_learn_more: "了解更多",
    // 联系我们
    contact_title: "联系我们",
    contact_desc: "我们很乐意听取您的意见",
    contact_intro: "如有任何问题，请通过以下邮箱联系我们：",
    contact_reply: "我们会尽快回复您的邮件。",
    // 页脚
    footer_copyright: "© 2024 AIris. 保留所有权利。",
    terms_title: "用户协议",
  }
};

// 当前语言
let currentLang = localStorage.getItem('lang') || 'en_us';

// 获取翻译
function t(key) {
  return translations[currentLang][key] || key;
}

// 切换语言
function switchLanguage(lang) {
  if (lang && translations[lang]) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updatePageContent();
    updateProductImages();
  }
}

// 更新页面内容
function updatePageContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = t(key);
      } else {
        element.textContent = t(key);
      }
    }
  });

  // 更新页面标题和属性
  document.querySelectorAll('[data-i18n-attr]').forEach(element => {
    const data = element.getAttribute('data-i18n-attr').split(',');
    if (data.length === 2) {
      const attr = data[0];
      const key = data[1];
      if (attr === 'title') {
        document.title = t(key);
      } else {
        element.setAttribute(attr, t(key));
      }
    }
  });
  
  // 更新对应的元素文本
  updateDynamicTexts();
}

// 更新产品图片
function updateProductImages() {
  document.querySelectorAll('[data-img-i18n]').forEach(img => {
    const basePath = img.getAttribute('data-img-i18n');
    if (basePath) {
      const parts = basePath.split('/');
      if (parts.length >= 2) {
        const type = parts[0]; // iphone 或 ipad
        const index = parts[1]; // 图片索引
        const fileExt = currentLang === 'en_us' && index === '2' ? 'jpg' : 'png'; // 特殊处理第二张图是jpg
        img.src = `images/${type}/${currentLang}/${type}_${currentLang}${index}.${fileExt}`;
      }
    }
  });
}

// 更新动态文本
function updateDynamicTexts() {
  // 特性卡片
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length === 4) {
    featureCards[0].querySelector('h3').textContent = t('feature_scoring');
    featureCards[0].querySelector('p').textContent = t('feature_scoring_desc');
    
    featureCards[1].querySelector('h3').textContent = t('feature_grouping');
    featureCards[1].querySelector('p').textContent = t('feature_grouping_desc');
    
    featureCards[2].querySelector('h3').textContent = t('feature_cleanup');
    featureCards[2].querySelector('p').textContent = t('feature_cleanup_desc');
    
    featureCards[3].querySelector('h3').textContent = t('feature_privacy');
    featureCards[3].querySelector('p').textContent = t('feature_privacy_desc');
  }
  
  // 轮播图旁边的特性列表
  const heroFeatureItems = document.querySelectorAll('.hero-feature-item');
  if (heroFeatureItems.length === 4) {
    heroFeatureItems[0].querySelector('h4').textContent = t('feature_scoring');
    heroFeatureItems[0].querySelector('p').textContent = t('feature_scoring_desc');
    
    heroFeatureItems[1].querySelector('h4').textContent = t('feature_grouping');
    heroFeatureItems[1].querySelector('p').textContent = t('feature_grouping_desc');
    
    heroFeatureItems[2].querySelector('h4').textContent = t('feature_cleanup');
    heroFeatureItems[2].querySelector('p').textContent = t('feature_cleanup_desc');
    
    heroFeatureItems[3].querySelector('h4').textContent = t('feature_privacy');
    heroFeatureItems[3].querySelector('p').textContent = t('feature_privacy_desc');
  }
  
  // 隐私政策要点
  const privacyPoints = document.querySelectorAll('.privacy-points li');
  if (privacyPoints.length === 4) {
    privacyPoints[0].innerHTML = `<i class="fas fa-check-circle"></i> ${t('privacy_point1')}`;
    privacyPoints[1].innerHTML = `<i class="fas fa-check-circle"></i> ${t('privacy_point2')}`;
    privacyPoints[2].innerHTML = `<i class="fas fa-check-circle"></i> ${t('privacy_point3')}`;
    privacyPoints[3].innerHTML = `<i class="fas fa-check-circle"></i> ${t('privacy_point4')}`;
  }
  
  // 隐私政策按钮
  const readFullBtn = document.querySelector('.privacy-detail-toggle');
  const closeBtn = document.querySelector('.privacy-detail-close');
  
  if (readFullBtn) {
    readFullBtn.innerHTML = `${t('privacy_read_full')} <i class="fas fa-chevron-down"></i>`;
  }
  
  if (closeBtn) {
    closeBtn.innerHTML = `${t('privacy_close')} <i class="fas fa-times"></i>`;
  }
  
  // 联系我们文本
  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) {
    const paragraphs = contactInfo.querySelectorAll('p');
    if (paragraphs.length >= 2) {
      paragraphs[0].textContent = t('contact_intro');
      paragraphs[1].textContent = t('contact_reply');
    }
  }
  
  // 产品展示CTA
  const ctaTitle = document.querySelector('.cta-download h3');
  if (ctaTitle) {
    ctaTitle.textContent = t('showcase_cta');
  }
}

// 在页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
  // 设置语言切换器
  const langSwitcher = document.getElementById('language-switcher');
  if (langSwitcher) {
    langSwitcher.value = currentLang;
    langSwitcher.addEventListener('change', (e) => {
      switchLanguage(e.target.value);
    });
  }
  
  // 初始化页面内容
  updatePageContent();
  updateProductImages();
});
