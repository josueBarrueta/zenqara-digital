# Zenqara Digital

Proyecto Angular organizado en `paginaZenqara/`, con la página principal separada en HTML, TypeScript y SCSS.

## Desarrollo

```sh
cd paginaZenqara
npm ci
npm start
```

## Compilación

```sh
npm run build
```

La web compilada se guarda en `dist/`, fuera de `paginaZenqara/`.

## Publicación

La web está publicada en https://josuebarrueta.github.io/zenqara-digital/.
El repositorio público `josueBarrueta/zenqara-digital` contiene solo los archivos compilados; el repositorio `josueBarrueta/zenqara-digital-codigo` conserva el código fuente privado.

Para preparar una actualización, desde `paginaZenqara/`:

```sh
npm run check
npm run build -- --base-href /zenqara-digital/
```

Después se actualizan los archivos del repositorio público con el contenido de `dist/`, conservando `.nojekyll`. GitHub Pages publica desde la raíz de su rama `main`. Los cambios en este repositorio de código fuente no se publican automáticamente.

## Comprobaciones

```sh
npm run check
npm run build
npm audit
```

`check` verifica tipos, código sin uso y formato. `npm run format` aplica el formato configurado en `package.json`, que también selecciona el analizador Angular para las plantillas HTML.

## Organización de la página

`paginaZenqara/src/app/home/home.component.html` reúne los apartados. Cada uno vive en su propia carpeta dentro de `src/app/sections/`, fuera de `home`, con archivos `.component.html`, `.component.scss` y `.component.ts`:

- `site-header`: cabecera y navegación.
- `hero`: portada (texto, logo y botones de entrada).
- `scroll-story`: tres escenas de escucha, construcción y acompañamiento; el ciclo completo dura 30 segundos y permite pausar o elegir una etapa.
- `services`: servicios y sus desplegables.
- `process`: revisiones, aprobación de cambios y entrega.
- `web-types`: opciones de apariencia, estructura y funciones.
- `maintenance`: mantenimiento.
- `faq`: preguntas frecuentes y contacto, unidos en una sección.
- `site-footer`: pie de página.

Los estilos propios y sus ajustes de móvil están en el SCSS de cada apartado. `src/styles.scss` los reúne; `src/styles/_shared.scss` contiene los elementos compartidos y `_mail.scss` la animación del sobre. Las fuentes se cargan desde `src/index.html`.

Los componentes utilizan `OnPush`. La animación de las tres escenas actualiza su progreso fuera de Angular y solo actualiza la vista al cambiar de etapa. Se detiene cuando sale de pantalla, se oculta la pestaña o se solicita movimiento reducido; también permite explorar las etapas manualmente.

Las animaciones de desplazamiento están en `home/home.animations.ts`; los observadores, eventos y actualizaciones pendientes se cancelan al destruir la página. Servicios y preguntas frecuentes avisan al componente principal cuando cambia su altura. El sobre y el enlace de Gmail se reutilizan desde `shared/mail-link/`, con una sola dirección de contacto.

Las dependencias permanecen en versiones compatibles con Angular 20. El ajuste de `piscina` en `package.json` aplica la versión corregida de una dependencia de compilación mientras Angular Build mantiene una versión anterior fijada.

La navegación sigue utilizando los enlaces de la página actual. Las futuras páginas independientes se incorporarán más adelante.
