# Landing de Ventas — SER UNO™

Este repositorio contiene únicamente los archivos y recursos necesarios para compilar y desplegar la landing page de ventas de **SER UNO™**, el programa terapéutico de la **Psicóloga Gisella Arias Olson**.

## 🚀 Despliegue

Este es un sitio web puramente estático (HTML, CSS y JS). Puede ser desplegado instantáneamente en plataformas como:
* **Vercel**
* **GitHub Pages**
* **Netlify**

Simplemente conecta este repositorio a tu cuenta de Vercel y el despliegue se realizará de forma automática en cada push a la rama `main`.

## 📁 Estructura de Archivos
* `index.html` - Página de ventas (anteriormente `ser.html`).
* `assets/site.css` - Estilos unificados del ecosistema.
* `assets/site.js` - Funciones interactivas (modal de registro, animaciones, acordeón FAQ).
* `assets/fonts/` - Fuentes corporativas (Metropolis y Playfair Display).
* `assets/img/` - Recursos gráficos optimizados.

## 📹 Videos de Testimonios
Los nueve originales en 1080p se conservan fuera del repositorio. La landing utiliza copias optimizadas para web en `assets/video/testimonials/`, acompañadas por portadas livianas en `assets/img/testimonials/`. Los videos usan carga diferida (`preload="none"`) para no descargarse al abrir la página.
