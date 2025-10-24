/**
 * CitoScan - Configuración Centralizada
 * Todas las constantes de la aplicación
 */

const CONFIG = {
  // Configuración de slides
  slides: {
    total: 10,
    transitionDuration: 800, // ms
    autoplayEnabled: false,
    autoplayInterval: 5000, // ms
    loopEnabled: false
  },

  // Navegación
  navigation: {
    keyboard: true,
    mouse: true,
    touch: true,
    arrows: true,
    dots: true,
    counter: true
  },

  // Animaciones
  animations: {
    enabled: true,
    staggerDelay: 200, // ms entre elementos
    fadeInDuration: 300,
    slideInDuration: 800
  },

  // Números animados (contadores)
  counters: {
    duration: 2000, // ms
    easing: 'easeOutQuart'
  },

  // Configuración de teclas
  keys: {
    next: ['ArrowRight', 'ArrowDown', 'PageDown', 'Space'],
    prev: ['ArrowLeft', 'ArrowUp', 'PageUp'],
    first: ['Home'],
    last: ['End'],
    fullscreen: ['f', 'F']
  },

  // Breakpoints para responsive
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1280
  },

  // Colores del sistema (sincronizado con CSS)
  colors: {
    primary: '#1e3a8a',
    secondary: '#10b981',
    accent: '#dc2626',
    gray: '#4b5563'
  }
};

// Hacer CONFIG inmutable
Object.freeze(CONFIG);

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
