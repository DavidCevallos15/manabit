# Verificación de esta entrega

## Alcance

Se conserva la identidad y la composición general de la landing existente. Se integra el loader del kit, videos de marca y recursos reales del portafolio personal. El portafolio usa una cuadrícula con filtros para consultar proyectos publicados y demos por rubro.

## Comprobaciones realizadas

- `npm ci`: instalación reproducible sin vulnerabilidades informadas por npm.
- `npm run typecheck`: correcto.
- `npm run build`: correcto; exportación estática con inicio, 404, robots y sitemap.
- `git diff --check`: correcto.
- Revisión con Chrome de la salida `out/`, servida por HTTP local.
- Viewports CSS 1440 × 900, 768 × 1024 y 390 × 844: sin desborde horizontal. El titular del hero ocupa dos líneas.
- Menú móvil: abre, navega a secciones y cierra.
- Filtro de trabajos: cuatro proyectos publicados / seis demos. Capturas cargadas y enlaces de consulta con el nombre de la demo.
- Todos los enlaces WhatsApp de diagnóstico y planes usan `593979107716` y mensaje codificado.
- Calculadora con teclado: al pasar de 40 a 10 mensajes por semana, manteniendo 20 %, 50 % y $15, el resultado pasa de $260 a $65.
- FAQ con teclado: la segunda pregunta pasa de `aria-expanded=false` a `true`.
- Tema vainilla: fuentes de video `*-vainilla.mp4`; tema noche: fuentes `*-medianoche.mp4`.
- Videos de inicio y cierre: sin error de reproducción; al terminar, el logo estático evita dejar un recuadro vacío.
- Loader visible al recargar y salida posterior hacia la página.
- Consola de la compilación de producción: sin errores observados.
- Lint de diseño sobre los cuatro componentes/secciones nuevos: 0 fallos y 0 avisos.

Las capturas están en `docs/hero.png`, `trabajos.png`, `mobile.png`, `carga.png` y `cierre.png`.

## Límites de la revisión

La opción de movimiento reducido y la lectura sin JavaScript están implementadas en el código; no se emularon en esta revisión del navegador. No se enviaron mensajes de WhatsApp ni correos. No se ejecutó el inspector automatizado de estilo: las mediciones y capturas se hicieron con las herramientas del navegador. La navegación, los colores y las convenciones tipográficas previas se conservaron conforme al alcance de completar la web.

## Revisión visual

Ronda 1: el titular de escritorio se partía en tres líneas, las celdas del sistema causaban un desborde móvil y los controles nativos oscurecían los videos del logo. Se ajustaron el tamaño del titular, el ancho mínimo de las celdas y los controles de pausa/repetición.

Ronda 2: el video de cierre terminaba con el fotograma vacío original. Se devuelve el logo estático al finalizar. Las capturas finales muestran el contenido sin esos problemas.

Los recursos visuales reutilizados proceden del kit Manabit y del portafolio público de David Cevallos. Las demos se presentan como diseños disponibles para adaptar; los proyectos conservan su contexto profesional o académico.
