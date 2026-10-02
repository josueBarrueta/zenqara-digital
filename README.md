# Zenqara Digital

Proyecto Angular organizado en `paginaZenqara/`, con la página principal separada en HTML, TypeScript y SCSS.

## Desarrollo

```sh
cd paginaZenqara
npm ci --legacy-peer-deps
npm start
```

## Compilación

```sh
npm run build
```

La web compilada se guarda en `dist/`. El repositorio permanece privado.

## Organización de la página

`paginaZenqara/src/app/home/home.component.html` reúne los apartados. Cada uno vive en su propia carpeta dentro de `src/app/sections/`, fuera de `home`, con archivos `.component.html`, `.component.scss` y `.component.ts`:

- `site-header`: cabecera y navegación.
- `hero`: portada (texto, logo y botones de entrada).
- `scroll-story`: demostración que transforma la web en móvil.
- `services`: servicios y sus desplegables.
- `process`: cómo trabajamos.
- `manifesto`: propuesta de la web.
- `web-types`: tipos de proyectos.
- `responsive`: ordenador, tablet y móvil.
- `maintenance`: mantenimiento.
- `project-checklist`: preparación del proyecto.
- `faq`: preguntas frecuentes.
- `contact`: contacto.
- `site-footer`: pie de página.

Los estilos propios y sus ajustes de móvil están en el SCSS de cada apartado. `src/styles.scss` los reúne; `src/styles/_shared.scss` contiene tipografía y elementos compartidos, y `_mail.scss` la animación del sobre. `home.component.scss` solo controla la decoración común de la página. Las animaciones de desplazamiento están en `home/home.animations.ts`, con configuración común de entradas y cancelación de actualizaciones pendientes al salir. El sobre y enlace de Gmail se reutilizan desde `shared/mail-link/`, sin repetir su HTML ni dirección. El estado de los desplegables pertenece al componente de servicios, que avisa a la página principal cuando cambia su altura.

La navegación sigue utilizando los enlaces de la página actual. Las futuras páginas independientes se incorporarán más adelante.
