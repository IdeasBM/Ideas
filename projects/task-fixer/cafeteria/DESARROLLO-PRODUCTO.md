# Cafetería · desarrollo del producto
Task Fixer · 2026-10-04. Fuente funcional: ESPECIFICACION-DESARROLLO-v1.0.md.

## Decisión del responsable
Orientar el desarrollo hacia el producto final y dejar de iterar únicamente maquetas. Usar el hosting IONOS y el dominio Task Fixer existente. Mantener un único teléfono de captura y operación local sin internet, con copia central al recuperar conexión.

## Incidencia comprobada
El responsable reportó pérdida de ventas tras recargar y afirmó haber cargado el archivo actualizado. El 2026-10-04 se abrió directamente la URL publicada en navegador: mostraba “Es una demostración en memoria; al recargar se reinicia”, “Ejemplo sin conexión real” y no el distintivo DEMO 0.2.1. Ese recurso entregaba la versión anterior. No se determinó si era archivo equivocado, ruta, carga sin reemplazo o caché. No se atribuye el fallo a IndexedDB sin ejecutar la versión que lo implementa.
La interfaz móvil de la versión anterior y el registro de contado MXN 65 fueron aprobados/observados por el responsable; esto acredita recorrido y presentación, no persistencia tras cierre. Se entrega el producto inicial bajo un nombre nuevo, sin datos precargados y base local separada, para evitar ambigüedad.

## Arquitectura elegida
- HTML/CSS/JavaScript propio; WordPress puede seguir para el sitio comercial.
- IndexedDB mantiene la operación local. Confirmar guardado solo tras commit, con revisión e identificadores de operación.
- Service worker/manifiesto conservarán recursos para abrir sin internet después de preparación.
- API PHP autenticada + base MySQL/MariaDB dedicada conservarán una copia privada y versionada, con recuperación verificada.
- Un dispositivo escritor; ninguna mezcla de cambios de dos teléfonos. Cambiar equipo requiere detener y restaurar.
- Un subdominio dedicado sigue siendo recomendable para la app final. La carpeta del sitio sirve para probar datos ficticios, sin acreditar aislamiento del servidor compartido.

Conectar solamente la pantalla a MySQL impediría capturar sin conexión. La copia local y la del servidor tienen trabajos distintos: rapidez/operación y respaldo/recuperación. No indicar “respaldado” por haber guardado solo en el teléfono.

## Entregas y criterios
1. **Base del producto 0.3.0 — implementada, validación física pendiente:** instalación vacía, configuración, catálogos, contado/cuenta/abono y guardado local. Cinco pruebas Node pasan con simuladores. Reabrir en equipo real debe conservar catálogos, movimientos y saldos; prueba pendiente.
2. **Motor contable y operación completa:** FIFO detallado por cargo, apertura de saldos, fechas/cortes, correcciones mediante reversos, devoluciones y datos del tutor; verificar escenarios aplicables de v1.0. No inventar aprobación de pruebas pendientes.
3. **Acceso, protección y respaldo:** usuario propietario, desbloqueo offline protegido, sesiones/API PHP, base dedicada, credenciales privadas, dispositivo autorizado, subida/confirmación de revisión y restauración. Concurrencia/idempotencia y rechazo de revisiones antiguas comprobados.
4. **Apertura offline y documentos:** service worker seguro y cacheado de recursos propios, PDF local versionado por alumno y compartir manual con alternativa. Validar modo avión tras cierre y generación de documento.
5. **Piloto operativo:** aplicación instalada en equipo real, respaldo/recuperación confirmados y escenarios de aceptación verificados. Solo entonces usar datos reales. Inventario y WhatsApp automático siguen fuera de primera etapa.

## Preparación de base de datos en IONOS
Crear una nueva base estándar dedicada a cafetería, sin reutilizar tablas de WordPress. Elegir el motor/versión disponibles tras revisar el panel y usar PDO en PHP soportado. El servidor no deberá publicar contraseña/host/usuario de base en JavaScript ni en el repositorio.
El esquema/API se prepararán como una entrega posterior con sesiones, dispositivo, revisiones y restauración coherentes; no habilitar un endpoint público de respaldo por apresurar la conexión. No pedir contraseñas por chat. Conservar revisiones anteriores válidas hasta comprobar la nueva.

## Estado real
0.3.0 está guardada en el repositorio; no desplegada por el agente. El archivo publicado que pudo inspeccionarse sigue siendo 0.1. La aprobación visual del responsable se conserva; pruebas de guardado real, PWA, PDF y servidor no están aprobadas.

## Verificación directa en navegador — 2026-10-04, 16:32–16:34 America/Chicago
El responsable reportó cargar 0.3.0 y perder ventas al recargar. Se abrió la URL publicada de cafeteria-beta-0.3.0.html en Chrome remoto y se comprobó distintivo 0.3.0 e IndexedDB disponible. Se guardó configuración ficticia, producto Burrito de prueba MXN 25 y una venta de contado. Tras recarga completa, Reportes mostró MXN 25 vendidos, MXN 25 cobrados y el movimiento; también se recuperó el catálogo. Esta es prueba de navegador real de esta ruta en Chrome, no validación Safari/iPhone ni todos los escenarios de aceptación.
Los datos de esta prueba residen en el navegador remoto, no en el teléfono del responsable. El problema informado no se reprodujo ahí y sigue sin causa confirmada. Revisar URL exacta, versión visible y Reportes después de recargar en el teléfono. El carrito de Nueva venta vuelve a cero por diseño y no es el historial. La presencia del archivo anterior en la carpeta no cambia el recurso seleccionado por la URL.
La beta 0.3.0 ahora está publicada por el responsable; la afirmación histórica de no despliegue corresponde al momento de la entrega anterior.
