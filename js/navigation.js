/**
 * CitoScan - Sistema de Navegación
 * Maneja la navegación entre slides
 */

class SlideNavigation {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = CONFIG.slides.total;
    this.isTransitioning = false;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.slidesWrapper = null;
    this.slides = [];
    this.prevButton = null;
    this.nextButton = null;
    this.dots = [];
    this.counter = null;
  }

  init() {
    this.cacheDOMElements();
    this.attachEventListeners();
    this.updateUI();
    this.activateSlide(0);
  }

  cacheDOMElements() {
    this.slidesWrapper = document.querySelector('.slides-wrapper');
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.prevButton = document.querySelector('.nav-prev');
    this.nextButton = document.querySelector('.nav-next');
    this.dots = Array.from(document.querySelectorAll('.progress-dot'));
    this.counter = document.querySelector('.slide-counter');
  }

  attachEventListeners() {
    // Navegación con teclado
    if (CONFIG.navigation.keyboard) {
      document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    // Navegación con botones
    if (this.prevButton && this.nextButton) {
      this.prevButton.addEventListener('click', () => this.prevSlide());
      this.nextButton.addEventListener('click', () => this.nextSlide());
    }

    // Navegación con dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Navegación táctil (swipe)
    if (CONFIG.navigation.touch) {
      this.slidesWrapper.addEventListener('touchstart', (e) => {
        this.touchStartX = e.touches[0].clientX;
      });

      this.slidesWrapper.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
      });
    }

    // Prevenir scroll con rueda del mouse durante transiciones
    document.addEventListener('wheel', (e) => {
      if (this.isTransitioning) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  handleKeyPress(e) {
    // Ignorar si se está escribiendo en un input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }

    const key = e.key;

    if (CONFIG.keys.next.includes(key)) {
      e.preventDefault();
      this.nextSlide();
    } else if (CONFIG.keys.prev.includes(key)) {
      e.preventDefault();
      this.prevSlide();
    } else if (CONFIG.keys.first.includes(key)) {
      e.preventDefault();
      this.goToSlide(0);
    } else if (CONFIG.keys.last.includes(key)) {
      e.preventDefault();
      this.goToSlide(this.totalSlides - 1);
    } else if (CONFIG.keys.fullscreen.includes(key)) {
      e.preventDefault();
      this.toggleFullscreen();
    }
  }

  handleSwipe() {
    const swipeThreshold = 50; // píxeles mínimos para detectar swipe
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left -> next slide
        this.nextSlide();
      } else {
        // Swipe right -> prev slide
        this.prevSlide();
      }
    }
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.goToSlide(this.currentSlide + 1);
    } else if (CONFIG.slides.loopEnabled) {
      this.goToSlide(0);
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.goToSlide(this.currentSlide - 1);
    } else if (CONFIG.slides.loopEnabled) {
      this.goToSlide(this.totalSlides - 1);
    }
  }

  goToSlide(index) {
    if (index < 0 || index >= this.totalSlides || index === this.currentSlide || this.isTransitioning) {
      return;
    }

    this.isTransitioning = true;
    const previousSlide = this.currentSlide;
    this.currentSlide = index;

    // Aplicar transformación
    const offset = -index * 100;
    this.slidesWrapper.style.transform = `translateX(${offset}%)`;

    // Desactivar slide anterior
    this.deactivateSlide(previousSlide);

    // Activar nuevo slide después de la transición
    setTimeout(() => {
      this.activateSlide(index);
      this.isTransitioning = false;
    }, CONFIG.slides.transitionDuration);

    // Actualizar UI
    this.updateUI();

    // Emitir evento personalizado
    this.emitSlideChangeEvent(previousSlide, index);
  }

  activateSlide(index) {
    const slide = this.slides[index];
    if (slide) {
      slide.classList.add('active');

      // Trigger animations si están habilitadas
      if (CONFIG.animations.enabled) {
        this.triggerSlideAnimations(slide);
      }

      // Ejecutar callback personalizado si existe
      if (typeof window.onSlideActivate === 'function') {
        window.onSlideActivate(index, slide);
      }
    }
  }

  deactivateSlide(index) {
    const slide = this.slides[index];
    if (slide) {
      slide.classList.remove('active');
    }
  }

  triggerSlideAnimations(slide) {
    // Reiniciar animaciones de elementos animados
    const animatedElements = slide.querySelectorAll('[class*="animate-"]');
    animatedElements.forEach((el, idx) => {
      el.style.opacity = '0';

      setTimeout(() => {
        el.style.opacity = '';
      }, idx * CONFIG.animations.staggerDelay);
    });

    // Animar contadores (números)
    const counters = slide.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
      this.animateCounter(counter);
    });

    // Animar barras de progreso
    const progressBars = slide.querySelectorAll('[data-progress]');
    progressBars.forEach(bar => {
      this.animateProgressBar(bar);
    });
  }

  animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-counter'));
    const duration = CONFIG.counters.duration;
    const suffix = element.getAttribute('data-suffix') || '';
    const prefix = element.getAttribute('data-prefix') || '';
    const decimals = element.getAttribute('data-decimals') || 0;

    let current = 0;
    const increment = target / (duration / 16); // 60fps

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = prefix + current.toFixed(decimals) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    };

    updateCounter();
  }

  animateProgressBar(element) {
    const progress = element.getAttribute('data-progress');
    element.style.width = '0%';

    setTimeout(() => {
      element.style.width = progress + '%';
    }, 300);
  }

  updateUI() {
    // Actualizar botones
    if (this.prevButton) {
      this.prevButton.disabled = this.currentSlide === 0 && !CONFIG.slides.loopEnabled;
    }
    if (this.nextButton) {
      this.nextButton.disabled = this.currentSlide === this.totalSlides - 1 && !CONFIG.slides.loopEnabled;
    }

    // Actualizar dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });

    // Actualizar contador
    if (this.counter) {
      this.counter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
    }
  }

  emitSlideChangeEvent(fromIndex, toIndex) {
    const event = new CustomEvent('slidechange', {
      detail: {
        from: fromIndex,
        to: toIndex,
        direction: toIndex > fromIndex ? 'forward' : 'backward'
      }
    });
    document.dispatchEvent(event);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  // API pública
  getCurrentSlide() {
    return this.currentSlide;
  }

  getTotalSlides() {
    return this.totalSlides;
  }

  isFirst() {
    return this.currentSlide === 0;
  }

  isLast() {
    return this.currentSlide === this.totalSlides - 1;
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.SlideNavigation = SlideNavigation;
}
