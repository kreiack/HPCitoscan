/**
 * CitoScan - Inicialización Principal
 * Punto de entrada de la aplicación
 */

// Estado global de la aplicación
const APP = {
  navigation: null,
  initialized: false
};

/**
 * Inicializar la aplicación cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 CitoScan Presentation - Initializing...');

  initApp();
});

/**
 * Función principal de inicialización
 */
function initApp() {
  try {
    // Inicializar sistema de navegación
    APP.navigation = new SlideNavigation();
    APP.navigation.init();

    // Configurar listeners globales
    setupGlobalListeners();

    // Precargar recursos si es necesario
    preloadResources();

    // Aplicar efectos visuales iniciales
    applyInitialEffects();

    APP.initialized = true;
    console.log('✅ CitoScan Presentation - Ready!');

    // Emitir evento de inicialización completa
    document.dispatchEvent(new Event('appready'));
  } catch (error) {
    console.error('❌ Error initializing app:', error);
  }
}

/**
 * Configurar listeners globales
 */
function setupGlobalListeners() {
  // Listener para cambios de slide
  document.addEventListener('slidechange', (e) => {
    console.log(`Slide changed: ${e.detail.from} → ${e.detail.to}`);

    // Ejecutar lógica específica según el slide
    handleSlideChange(e.detail.to);
  });

  // Listener para cambios de tamaño de ventana
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      handleResize();
    }, 250);
  });

  // Listener para visibilidad de página (pausar animaciones si no es visible)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseAnimations();
    } else {
      resumeAnimations();
    }
  });

  // Prevenir comportamientos por defecto en ciertos casos
  document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
  });
}

/**
 * Manejar cambio de slide
 */
function handleSlideChange(slideIndex) {
  // Lógica específica por slide
  switch (slideIndex) {
    case 0:
      // Slide 1: Portada
      initSlide1();
      break;
    case 1:
      // Slide 2: El Problema
      initSlide2();
      break;
    case 2:
      // Slide 3: La Solución
      initSlide3();
      break;
    case 3:
      // Slide 4: Tecnología
      initSlide4();
      break;
    case 4:
      // Slide 5: Pipeline
      initSlide5();
      break;
    case 5:
      // Slide 6: Validación
      initSlide6();
      break;
    case 6:
      // Slide 7: UX/UI
      initSlide7();
      break;
    case 7:
      // Slide 8: Modelo de Negocio
      initSlide8();
      break;
    case 8:
      // Slide 9: Mercado
      initSlide9();
      break;
    case 9:
      // Slide 10: Call to Action
      initSlide10();
      break;
  }
}

/**
 * Funciones de inicialización por slide
 */
function initSlide1() {
  // Animación especial de portada
  const title = document.querySelector('#slide-1 .main-title');
  if (title) {
    title.style.opacity = '0';
    setTimeout(() => {
      title.style.transition = 'opacity 1s ease-out';
      title.style.opacity = '1';
    }, 300);
  }
}

function initSlide2() {
  // Animar números estadísticos
  animateStatsNumbers('#slide-2');
}

function initSlide3() {
  // Animar cards de características
  animateFeatureCards('#slide-3');
}

function initSlide4() {
  // Animar stack tecnológico
  animateTechStack('#slide-4');
}

function initSlide5() {
  // Animar diagrama de flujo
  animateFlowDiagram('#slide-5');
}

function initSlide6() {
  // Animar métricas de validación
  animateValidationMetrics('#slide-6');
}

function initSlide7() {
  // Interactividad UX/UI
  initUIInteractions('#slide-7');
}

function initSlide8() {
  // Animar tabla de pricing
  animatePricingTable('#slide-8');
}

function initSlide9() {
  // Animar gráficos de mercado
  animateMarketGraphs('#slide-9');
}

function initSlide10() {
  // Animación final CTA
  animateFinalCTA('#slide-10');
}

/**
 * Funciones auxiliares de animación
 */
function animateStatsNumbers(slideSelector) {
  const slide = document.querySelector(slideSelector);
  if (!slide) return;

  const numbers = slide.querySelectorAll('[data-counter]');
  numbers.forEach((num, idx) => {
    setTimeout(() => {
      APP.navigation.animateCounter(num);
    }, idx * 200);
  });
}

function animateFeatureCards(slideSelector) {
  const slide = document.querySelector(slideSelector);
  if (!slide) return;

  const cards = slide.querySelectorAll('.feature-card, .card');
  cards.forEach((card, idx) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.5s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, idx * 150);
  });
}

function animateTechStack(slideSelector) {
  const slide = document.querySelector(slideSelector);
  if (!slide) return;

  const items = slide.querySelectorAll('.tech-item, .stack-item');
  items.forEach((item, idx) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';

    setTimeout(() => {
      item.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
    }, idx * 100);
  });
}

function animateFlowDiagram(slideSelector) {
  const slide = document.querySelector(slideSelector);
  if (!slide) return;

  const boxes = slide.querySelectorAll('.flow-box');
  boxes.forEach((box, idx) => {
    box.style.opacity = '0';
    box.style.transform = 'translateX(-30px)';

    setTimeout(() => {
      box.style.transition = 'all 0.5s ease-out';
      box.style.opacity = '1';
      box.style.transform = 'translateX(0)';
    }, idx * 300);
  });
}

function animateValidationMetrics(slideSelector) {
  const slide = document.querySelector(slideSelector);
  if (!slide) return;

  // Animar barras de progreso
  const progressBars = slide.querySelectorAll('[data-progress]');
  progressBars.forEach((bar, idx) => {
    setTimeout(() => {
      APP.navigation.animateProgressBar(bar);
    }, idx * 200);
  });
}

function initUIInteractions(slideSelector) {
  const slide = document.querySelector(slideSelector);
  if (!slide) return;

  // Agregar interactividad a mockups
  const mockups = slide.querySelectorAll('.mockup, .ui-demo');
  mockups.forEach(mockup => {
    mockup.addEventListener('mouseenter', () => {
      mockup.style.transform = 'scale(1.02)';
    });
    mockup.addEventListener('mouseleave', () => {
      mockup.style.transform = 'scale(1)';
    });
  });
}

function animatePricingTable(slideSelector) {
  const slide = document.querySelector(slideSelector);
  if (!slide) return;

  const pricingCards = slide.querySelectorAll('.pricing-card');
  pricingCards.forEach((card, idx) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';

    setTimeout(() => {
      card.style.transition = 'all 0.6s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, idx * 200);
  });
}

function animateMarketGraphs(slideSelector) {
  const slide = document.querySelector(slideSelector);
  if (!slide) return;

  // Animar elementos del gráfico TAM/SAM/SOM
  const circles = slide.querySelectorAll('.market-circle, .tam-circle, .sam-circle, .som-circle');
  circles.forEach((circle, idx) => {
    circle.style.opacity = '0';
    circle.style.transform = 'scale(0)';

    setTimeout(() => {
      circle.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      circle.style.opacity = '1';
      circle.style.transform = 'scale(1)';
    }, idx * 300);
  });
}

function animateFinalCTA(slideSelector) {
  const slide = document.querySelector(slideSelector);
  if (!slide) return;

  const ctaButton = slide.querySelector('.cta-button, .btn-cta');
  if (ctaButton) {
    setTimeout(() => {
      ctaButton.classList.add('animate-pulse');
    }, 1000);
  }
}

/**
 * Precargar recursos
 */
function preloadResources() {
  // Precargar imágenes si las hay
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    img.src = img.getAttribute('data-src');
  });
}

/**
 * Aplicar efectos visuales iniciales
 */
function applyInitialEffects() {
  // Fade in inicial
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in';
    document.body.style.opacity = '1';
  }, 100);
}

/**
 * Manejar cambio de tamaño de ventana
 */
function handleResize() {
  const width = window.innerWidth;

  // Ajustar escala de fuente para móviles
  if (width < CONFIG.breakpoints.mobile) {
    document.documentElement.style.fontSize = '14px';
  } else if (width < CONFIG.breakpoints.tablet) {
    document.documentElement.style.fontSize = '15px';
  } else {
    document.documentElement.style.fontSize = '16px';
  }
}

/**
 * Pausar animaciones cuando la página no es visible
 */
function pauseAnimations() {
  document.body.classList.add('animations-paused');
}

function resumeAnimations() {
  document.body.classList.remove('animations-paused');
}

/**
 * Utilidades globales
 */
window.CitoScan = {
  goToSlide: (index) => APP.navigation?.goToSlide(index),
  nextSlide: () => APP.navigation?.nextSlide(),
  prevSlide: () => APP.navigation?.prevSlide(),
  getCurrentSlide: () => APP.navigation?.getCurrentSlide(),
  isReady: () => APP.initialized
};

// Log para debugging
console.log('CitoScan Presentation - v1.0');
console.log('Use CitoScan.goToSlide(index) to navigate programmatically');
