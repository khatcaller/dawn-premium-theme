/**
 * Premium Interactions & Enhancements
 * Adds subtle micro-interactions and modern UX improvements
 */

class PremiumEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.addScrollEffects();
    this.enhanceCards();
    this.improveNavigation();
    this.addLoadingStates();
    this.initIntersectionObserver();
  }

  // Add header shadow on scroll
  addScrollEffects() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // Enhance card interactions
  enhanceCards() {
    const cards = document.querySelectorAll('.card, .product-card-wrapper');
    
    cards.forEach(card => {
      // Add smooth image loading
      const img = card.querySelector('img');
      if (img && !img.complete) {
        img.classList.add('loading-skeleton');
        img.addEventListener('load', () => {
          img.classList.remove('loading-skeleton');
        }, { once: true });
      }

      // Add card tilt effect on hover (subtle)
      card.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 990) return; // Skip on mobile
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateY(-6px)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // Improve navigation active states
  improveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.header__menu-item a');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.closest('.header__menu-item')?.classList.add('active');
      }
    });
  }

  // Add loading states to buttons
  addLoadingStates() {
    // Handle add to cart buttons
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.querySelector('[name="add"]')) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          const originalText = submitButton.innerHTML;
          submitButton.innerHTML = '<span class="loading-spinner"></span> Adding...';
          submitButton.disabled = true;
          
          // Reset after response (Dawn handles this via AJAX)
          setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
          }, 2000);
        }
      }
    });
  }

  // Intersection Observer for fade-in animations
  initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe cards and sections
    const elementsToAnimate = document.querySelectorAll(
      '.card-wrapper, .product-card-wrapper, .multicolumn-card, .article-card'
    );
    
    elementsToAnimate.forEach((el, index) => {
      // Stagger the animation delay
      el.style.setProperty('--animation-order', index);
      observer.observe(el);
    });
  }

  // Smooth scroll to anchors
  static initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PremiumEnhancements();
    PremiumEnhancements.initSmoothScroll();
  });
} else {
  new PremiumEnhancements();
  PremiumEnhancements.initSmoothScroll();
}

// Add loading spinner styles dynamically
const style = document.createElement('style');
style.textContent = `
  .loading-spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PremiumEnhancements;
}
