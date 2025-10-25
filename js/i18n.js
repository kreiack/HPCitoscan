/**
 * CitoScan - Sistema de Internacionalización (i18n)
 * Maneja el cambio dinámico de idioma español/inglés
 */

class I18n {
  constructor() {
    this.currentLang = 'es';
    this.defaultLang = 'es';
    this.storageKey = 'citoscan_language';

    // Inicializar
    this.init();
  }

  /**
   * Inicializa el sistema de i18n
   */
  init() {
    // Cargar idioma guardado o usar español como default
    const savedLang = this.getSavedLanguage();
    this.currentLang = savedLang || this.defaultLang;

    // Aplicar idioma inicial
    this.applyLanguage(this.currentLang);

    // Configurar event listeners para botones de idioma
    this.setupLanguageSwitchers();

    console.log(`[i18n] Sistema inicializado. Idioma actual: ${this.currentLang}`);
  }

  /**
   * Obtiene el idioma guardado en localStorage
   */
  getSavedLanguage() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (e) {
      console.warn('[i18n] No se pudo acceder a localStorage', e);
      return null;
    }
  }

  /**
   * Guarda el idioma en localStorage
   */
  saveLanguage(lang) {
    try {
      localStorage.setItem(this.storageKey, lang);
    } catch (e) {
      console.warn('[i18n] No se pudo guardar en localStorage', e);
    }
  }

  /**
   * Cambia el idioma actual
   */
  changeLanguage(lang) {
    if (!translations[lang]) {
      console.error(`[i18n] Idioma no soportado: ${lang}`);
      return;
    }

    this.currentLang = lang;
    this.saveLanguage(lang);
    this.applyLanguage(lang);

    // Actualizar estado visual de los botones
    this.updateLanguageButtons();

    console.log(`[i18n] Idioma cambiado a: ${lang}`);
  }

  /**
   * Aplica el idioma a todos los elementos traducibles
   */
  applyLanguage(lang) {
    const t = translations[lang];

    if (!t) {
      console.error(`[i18n] Traducciones no encontradas para: ${lang}`);
      return;
    }

    // Actualizar meta tags
    document.documentElement.lang = t.htmlLang;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t.metaDescription);
    }

    const pageTitle = document.querySelector('title');
    if (pageTitle) {
      pageTitle.textContent = t.title;
    }

    // Actualizar todos los elementos con data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = t[key];

      if (translation) {
        // Si el elemento tiene data-i18n-html, actualizar innerHTML
        if (element.hasAttribute('data-i18n-html')) {
          element.innerHTML = translation;
        } else {
          // Por defecto actualizar textContent
          element.textContent = translation;
        }
      } else {
        console.warn(`[i18n] Traducción no encontrada para clave: ${key}`);
      }
    });

    // Actualizar elementos con data-i18n-placeholder (para inputs)
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = t[key];

      if (translation) {
        element.setAttribute('placeholder', translation);
      }
    });

    // Actualizar elementos con data-i18n-title (para tooltips)
    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      const translation = t[key];

      if (translation) {
        element.setAttribute('title', translation);
      }
    });

    // Disparar evento personalizado para notificar el cambio de idioma
    const event = new CustomEvent('languageChanged', {
      detail: { lang, translations: t }
    });
    document.dispatchEvent(event);
  }

  /**
   * Configura los event listeners para los botones de cambio de idioma
   */
  setupLanguageSwitchers() {
    // Botones individuales
    const esButton = document.getElementById('lang-es');
    const enButton = document.getElementById('lang-en');

    if (esButton) {
      esButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.changeLanguage('es');
      });
    }

    if (enButton) {
      enButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.changeLanguage('en');
      });
    }

    // Actualizar estado inicial de los botones
    this.updateLanguageButtons();
  }

  /**
   * Actualiza el estado visual de los botones de idioma
   */
  updateLanguageButtons() {
    const esButton = document.getElementById('lang-es');
    const enButton = document.getElementById('lang-en');

    if (esButton && enButton) {
      if (this.currentLang === 'es') {
        esButton.classList.add('active');
        enButton.classList.remove('active');
      } else {
        enButton.classList.add('active');
        esButton.classList.remove('active');
      }
    }
  }

  /**
   * Obtiene el idioma actual
   */
  getCurrentLanguage() {
    return this.currentLang;
  }

  /**
   * Obtiene una traducción específica
   */
  t(key) {
    const t = translations[this.currentLang];
    return t[key] || key;
  }
}

// Instancia global del sistema de i18n
let i18n;

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    i18n = new I18n();
  });
} else {
  i18n = new I18n();
}
