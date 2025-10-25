# CitoScan - Presentación Web Interactiva

Presentación profesional e interactiva del sistema CitoScan: Sistema de Diagnóstico Asistido por IA para Citología Cervical.

## 🎯 Características

- ✨ **10 slides interactivos** con contenido completo
- 🎨 **Diseño modular** con variables CSS centralizadas
- 🔄 **Navegación fluida** (teclado, mouse, touch)
- 📱 **Responsive design** (desktop, tablet, mobile)
- ⚡ **Animaciones suaves** y transiciones optimizadas
- 🎭 **Sistema de componentes** reutilizables
- 🎯 **GPU-accelerated** para máxima performance

## 📁 Estructura del Proyecto

```
CitoScan_Presentation/
├── index.html                 # Archivo principal
├── css/
│   ├── variables.css          # Sistema de variables centralizadas
│   ├── base.css               # Estilos base y contenedor de slides
│   ├── animations.css         # Keyframes y animaciones
│   └── components.css         # Componentes reutilizables
├── js/
│   ├── config.js              # Configuración centralizada
│   ├── navigation.js          # Sistema de navegación
│   └── main.js                # Inicialización y lógica
└── README.md                  # Esta documentación
```

## 🚀 Inicio Rápido

### Opción 1: Abrir Directamente (Recomendado)

Simplemente abre `index.html` en tu navegador favorito:

- Doble clic en `index.html`
- O click derecho → "Abrir con" → Chrome/Firefox/Safari/Edge

### Opción 2: Servidor Local (Para desarrollo)

Si deseas hacer modificaciones y ver cambios en tiempo real:

```bash
# Con Python 3
python3 -m http.server 8000

# Con Node.js (si tienes npx)
npx http-server -p 8000

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

## ⌨️ Controles de Navegación

### Teclado

- **→ / ↓ / Space / PgDown**: Siguiente slide
- **← / ↑ / PgUp**: Slide anterior
- **Home**: Primera slide
- **End**: Última slide
- **F**: Pantalla completa

### Mouse

- **Click en flechas**: Navegar adelante/atrás
- **Click en dots**: Ir a slide específico

### Touch (Móvil/Tablet)

- **Swipe left**: Siguiente slide
- **Swipe right**: Slide anterior

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
/* Azules Médicos (Primary) */
--color-primary-600: #1e3a8a   /* Azul corporativo */
--color-primary-500: #3b82f6   /* Azul claro */

/* Verdes Salud (Secondary) */
--color-secondary-500: #10b981 /* Verde médico */
--color-secondary-600: #059669 /* Verde oscuro */

/* Rojos Alerta (Accent) */
--color-accent-600: #dc2626   /* Rojo alerta */
--color-accent-500: #ef4444   /* Rojo claro */
```

### Tipografía

- **Headings**: Poppins (Bold, Semibold)
- **Body**: Inter (Regular, Medium)
- **Code**: Fira Code (Mono)

### Espaciado

Sistema basado en 8px:
- `--space-2`: 8px
- `--space-4`: 16px
- `--space-8`: 32px
- `--space-12`: 48px
- etc.

## 🔧 Personalización

### Cambiar Colores Principales

Edita `css/variables.css`:

```css
:root {
  --color-primary-600: #TU_COLOR_AQUI;
  --color-secondary-500: #TU_COLOR_AQUI;
  --color-accent-600: #TU_COLOR_AQUI;
}
```

### Agregar Nuevo Slide

1. Copia la estructura de un slide existente en `index.html`
2. Actualiza el contador en `js/config.js`:

```javascript
const CONFIG = {
  slides: {
    total: 11, // Cambia de 10 a 11
    ...
  }
};
```

3. Agrega un nuevo dot en la navegación:

```html
<div class="progress-dots">
  <div class="progress-dot active"></div>
  <!-- ... slides existentes ... -->
  <div class="progress-dot"></div> <!-- Nuevo dot -->
</div>
```

### Modificar Velocidad de Transiciones

En `css/variables.css`:

```css
:root {
  --slide-transition-duration: 800ms; /* Cambia a tu gusto */
  --duration-normal: 300ms;
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

El diseño se adapta automáticamente a cada dispositivo.

## 🎭 Componentes Disponibles

### Cards

```html
<div class="card">
  <h4>Título</h4>
  <p>Contenido</p>
</div>
```

### Stat Cards

```html
<div class="stat-card">
  <div class="stat-number" data-counter="96.5" data-suffix="%">96.5%</div>
  <div class="stat-label">Sensibilidad</div>
</div>
```

### Feature Cards

```html
<div class="feature-card">
  <div class="icon-wrapper icon-wrapper-primary">
    <!-- SVG icon -->
  </div>
  <h4 class="feature-title">Título</h4>
  <p class="feature-description">Descripción</p>
</div>
```

### Progress Bars

```html
<div class="progress-bar-container">
  <div class="progress-bar-fill" data-progress="85"></div>
</div>
```

### Pricing Cards

```html
<div class="pricing-card">
  <div class="pricing-tier">Starter</div>
  <div class="pricing-price">
    <span class="pricing-price-currency">$</span>1,500
  </div>
  <div class="pricing-period">/mes</div>
  <ul class="pricing-features">
    <li>Feature 1</li>
    <li>Feature 2</li>
  </ul>
</div>
```

## 🎬 Animaciones

### Clases de Animación Disponibles

```html
<!-- Fade animations -->
<div class="animate-fade-in">Aparece con fade</div>
<div class="animate-fade-in-up">Aparece desde abajo</div>
<div class="animate-fade-in-down">Aparece desde arriba</div>
<div class="animate-fade-in-left">Aparece desde izquierda</div>
<div class="animate-fade-in-right">Aparece desde derecha</div>

<!-- Scale animation -->
<div class="animate-scale-in">Aparece con zoom</div>

<!-- Continuous animations -->
<div class="animate-pulse">Pulsa continuamente</div>
<div class="animate-float">Flota suavemente</div>
```

### Delays

```html
<div class="animate-fade-in delay-200">Aparece a los 200ms</div>
<div class="animate-fade-in delay-500">Aparece a los 500ms</div>
```

Delays disponibles: 100ms, 200ms, 300ms... hasta 1000ms

## 🔌 API JavaScript

### Navegación Programática

```javascript
// Ir a slide específico (0-indexed)
CitoScan.goToSlide(3);

// Siguiente slide
CitoScan.nextSlide();

// Slide anterior
CitoScan.prevSlide();

// Obtener slide actual
const current = CitoScan.getCurrentSlide();

// Verificar si la app está lista
if (CitoScan.isReady()) {
  // Tu código aquí
}
```

### Eventos Personalizados

```javascript
// Escuchar cambios de slide
document.addEventListener('slidechange', (e) => {
  console.log('De slide', e.detail.from, 'a slide', e.detail.to);
  console.log('Dirección:', e.detail.direction); // 'forward' o 'backward'
});

// Cuando la app está lista
document.addEventListener('appready', () => {
  console.log('Presentación lista!');
});
```

## 🎯 Funciones Específicas por Slide

### Animación de Números (Contadores)

```html
<div data-counter="96.5" data-suffix="%" data-decimals="1">96.5%</div>
```

Atributos:
- `data-counter`: Número final
- `data-suffix`: Texto después (opcional)
- `data-prefix`: Texto antes (opcional)
- `data-decimals`: Decimales a mostrar (default: 0)

### Barras de Progreso

```html
<div class="progress-bar-fill" data-progress="85"></div>
```

Se animan automáticamente cuando el slide se activa.

## 🔍 Troubleshooting

### Las animaciones no funcionan

1. Verifica que el JavaScript se cargó correctamente
2. Abre la consola del navegador (F12) y busca errores
3. Asegúrate de que las clases `animate-*` estén aplicadas

### Las transiciones son muy lentas/rápidas

Ajusta en `css/variables.css`:

```css
--slide-transition-duration: 600ms; /* Ajusta este valor */
```

### Los slides no navegan

1. Verifica que `config.js` tenga el número correcto de slides
2. Revisa la consola del navegador por errores
3. Asegúrate de que los archivos JS estén cargados en el orden correcto

### El responsive no funciona bien en móvil

1. Verifica que tengas la meta tag viewport en `<head>`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

2. Prueba con diferentes dispositivos/tamaños

## 📊 Contenido de los Slides

1. **Slide 1 - Portada**: Título, tagline, métricas principales
2. **Slide 2 - El Problema**: Estadísticas de cáncer cervical, desafíos actuales
3. **Slide 3 - La Solución**: CitoScan overview, características, impacto
4. **Slide 4 - Tecnología**: Stack tecnológico, modelos IA, optimizaciones
5. **Slide 5 - Pipeline**: 5 etapas del procesamiento, tiempos
6. **Slide 6 - Validación**: Métricas de desempeño, plan de validación clínica
7. **Slide 7 - UX/UI**: Flujo de trabajo, características de la interfaz
8. **Slide 8 - Modelo de Negocio**: Pricing tiers, métricas financieras
9. **Slide 9 - Mercado**: TAM/SAM/SOM, drivers de crecimiento, ventajas
10. **Slide 10 - Call to Action**: Inversión, retorno, próximos hitos

## 🎨 Mejoras Futuras Sugeridas

- [ ] Agregar soporte para modo oscuro
- [ ] Implementar gestos de pinch-to-zoom en móvil
- [ ] Agregar notas del presentador (overlay)
- [ ] Implementar autoplay con pausa automática
- [ ] Agregar transiciones personalizables por slide
- [ ] Integrar gráficos interactivos con Chart.js
- [ ] Agregar efectos de partículas en fondos
- [ ] Implementar modo presentador con vista previa

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables, Grid, Flexbox, Animations
- **JavaScript (ES6+)**: Clases, Módulos, Event Listeners
- **Google Fonts**: Inter & Poppins
- **SVG**: Iconos vectoriales

## 📝 Licencia

© 2024 HealthPixel - CitoScan. Todos los derechos reservados.

## 📧 Contacto

Para preguntas o soporte:
- Email: contact@healthpixel.com
- Website: www.healthpixel.com/citoscan

---

**¡Disfruta tu presentación! 🚀**

## 🎓 Consejos para Presentar

### Antes de la Presentación

1. **Prueba en el equipo donde presentarás**: Asegúrate de que todo funcione
2. **Modo presentador**: Presiona F11 (o F en algunos navegadores) para pantalla completa
3. **Backup**: Ten una copia en USB y en la nube
4. **Batería**: Si es laptop, conéctala a corriente
5. **Cierra otras apps**: Para evitar notificaciones

### Durante la Presentación

- Usa **Space** o **→** para avanzar (más intuitivo)
- Si quieres saltar a un slide específico, usa los **dots** en la navegación
- Para salir de pantalla completa: **Esc**

### Tips

- Los números en las estadísticas se **animan automáticamente** al entrar al slide
- Las **barras de progreso** también se animan solas
- Puedes hacer **click en cualquier parte** del slide para interactuar con elementos específicos

---

**Versión**: 1.0
**Última actualización**: Octubre 2024
**Desarrollado con ❤️ para HealthPixel**
