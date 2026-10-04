# Cafetería: arquitectura inicial y pantallas
Task Fixer · 2026-10-04.
Base: [especificación v1.0](ESPECIFICACION-DESARROLLO-v1.0.md), revisada y aceptada por el responsable. Este documento fija dirección técnica y entrega un prototipo; no acredita aplicación operativa ni hosting comprobado.

## Decisión técnica
App web propia en HTML, CSS y JavaScript, preparada como PWA para el piloto. WordPress/Divi queda como opción para el sitio comercial de Task Fixer y sus enlaces a las demos. No construir ventas/cuentas como formularios de Divi.
WordPress puede integrarse con una app, pero no elimina el trabajo necesario de datos locales, transacciones, PDF y respaldo. Evitar ese acoplamiento para esta versión. Esta es decisión de diseño del proyecto, no afirmación de imposibilidad de WordPress.
Opción inicial de servidor: PHP y MySQL/MariaDB en IONOS. Las capturas aportadas el 2026-10-04 identifican el contrato como IONOS Web Hosting Business y muestran administración de Hosting y Domains & SSL. Es candidato para el piloto; versión/capacidad de PHP, base de datos disponible y HTTPS de la app todavía pendientes. No comprar ni migrar hosting a partir de estas capturas.

## Capas propuestas para la versión operativa
| Parte | Tecnología/diseño | Propósito |
|---|---|---|
| Pantallas | HTML/CSS/JavaScript sin framework obligatorio | Recorrido sencillo en teléfono |
| Cálculos | Módulo JS separado de la interfaz | Movimientos en centavos, FIFO, reversos y saldos |
| Datos del teléfono | IndexedDB, esquema versionado y transacciones | Guardar operación completa antes de confirmar |
| Apertura sin red | Service worker + recursos locales + manifiesto | Cargar app preparada sin solicitar recursos externos |
| PDF | Generación en el teléfono; biblioteca/font empaquetadas, por seleccionar y verificar | Crear/descargar documentos sin red; compartir con alternativa |
| Respaldo central | API PHP autenticada + MySQL/MariaDB privado | Conservar copia válida y recuperar |
| Publicación | Subdominio HTTPS dedicado, por ejemplo cafeteria.dominio, nombre aún no elegido | Separar origen de app de WordPress, plugins y caché comercial |

Service worker exige HTTPS en publicación; IndexedDB ofrece transacciones para datos estructurados. El almacenamiento del navegador no es una garantía absoluta de permanencia: comprobar cuotas/persistencia, espacio insuficiente y respaldos en el equipo real. No depender de modo privado ni de localStorage como base de cuentas.
La apertura offline completa pertenece a la versión operativa; el prototipo 0.2 guarda en IndexedDB, pero todavía no registra service worker.

## Flujo de respaldo de un dispositivo
1. Movimiento validado y escrito localmente en una transacción; incrementar revisión.
2. Si hay conexión y sesión autorizada, cargar copia consistente con ID, versión de esquema, revisión y verificación de integridad.
3. Servidor autentica y valida dispositivo, tamaños y estructura. No confiar en que un ID de teléfono equivale a autenticación.
4. Guardar completa la revisión dentro de transacción; conservar revisión anterior. Reintentar mismo ID no duplica y revisión vieja no sustituye una nueva.
5. Confirmar versión recibida; solo entonces cambiar estado a respaldado.
6. Recuperación: descargar copia autorizada, verificar formato/totales, restaurar en una transacción y comprobar cuenta. No sumar la copia a movimientos existentes.
Para un piloto pequeño es posible copia completa versionada; medir tamaño/tiempo antes de elegirla definitivamente. Si el volumen exige incremental, ampliar contrato sin incorporar otro dispositivo escritor.
“Recuperó red” no garantiza respaldo: disparar intento al abrir/volver a la app y al registrar con conexión; ofrecer Respaldar ahora. No depender exclusivamente de tareas en segundo plano del navegador.

## Acceso y aislamiento
Una cuenta propietaria, credenciales verificadas en servidor y sesión segura para API. Sesión en cookies protegidas, defensa frente a solicitudes no autorizadas, validación servidor y límites de carga. Claves de base de datos fuera del directorio público; no en JavaScript.
El desbloqueo local y la protección de los datos se diseñarán antes del piloto; no afirmar que un PIN por sí solo cifra la base. Acceso offline no debe depender de una llamada al servidor en cada venta.
Cachear recursos de la app; no cachear respuestas privadas de autenticación/respaldo como si fueran imágenes públicas. Demos con datos ficticios separadas de aplicación real.
No habilitar segundo escritor. Migración de equipo se realiza detenida y con restauración comprobada.

## Evidencia del contrato aportada — 2026-10-04
Capturas revisadas: nombre del servicio IONOS Web Hosting Business; accesos de administración de Hosting y Domains & SSL; complementos SSL Starter, uno asignado a un dominio existente. Las primeras capturas no mostraban panel técnico de PHP/base de datos. Las capturas posteriores muestran administración de PHP, bases de datos, archivos y acceso de despliegue; versión PHP, capacidad por base y certificado para el futuro subdominio siguen por comprobar. No trasladar números de contrato, imágenes de cuenta ni dominios ajenos al proyecto al repositorio público.
Decisión: mantener HTML/CSS/JS y opción PHP/MySQL, usar este hosting como candidato sin contratar otro. La evidencia de Hosting manage ya recibida confirma esos recursos administrables. Antes de desplegar: versión PHP por dominio, nueva base dedicada con sus límites y HTTPS del subdominio elegido. No alterar PHP global, bases o rutas de sitios existentes para comprobar compatibilidad.

## Comprobación adicional de Hosting manage — 2026-10-04
Capturas revisadas directamente, sin publicar imágenes ni identificadores de acceso:
- Webspace administrable y SFTP/SSH presentes.
- Administración de bases estándar disponible; panel muestra cantidad usada sin límite de número. No equivale a tamaño ilimitado por base.
- PHP administrable por dominio; versión concreta todavía no visible.
- Cron disponible; CDN aparece como opción para contratar, no como servicio activo ni necesario para el piloto.
- Cantidad de archivos: 239,870 de 262,144 (91.5%); margen visible 22,274. La app debe desplegarse como paquete pequeño, sin node_modules ni archivos de desarrollo; no borrar cachés/backups ajenos sin diagnosticar y respaldar.
- PHP Extended Support activo y aviso de Site Scan sobre sitios vulnerables. No prueba intrusión ni identifica sitio/plugin afectado. Revisar resultados específicos antes de alojar datos reales; subdominio separa origen web, pero no equivale a aislamiento de servidor dentro del mismo contrato.
Decisión: el hosting cuenta con recursos del tipo requerido para continuar desarrollo HTML/CSS/JS + PHP/base dedicada. No contratar otro plan ni aumentar performance a partir de estas capturas. Compatibilidad completa queda sujeta a prueba de ejecución, base, HTTPS y estado de sitios en el entorno compartido.
No cambiar versiones de PHP de sitios existentes. Seleccionar versión soportada para el nuevo dominio tras comprobar disponibilidad. No pedir credenciales por chat.
Fuentes oficiales de apoyo: [límite de archivos](https://www.ionos.co.uk/help/hosting/managing-disk-space/maximum-number-of-files-in-ionos-hosting/), [PHP Extended Support](https://www.ionos.com/hosting/php-extended-support).

## Qué verificar del contrato IONOS
Nombre exacto del producto: hosting web Linux, WordPress gestionado o constructor de sitios no deben asumirse equivalentes.
Comprobar: archivos propios y directorio/subdominio; HTTPS; PHP soportado y extensiones PDO/JSON; base MySQL/MariaDB y capacidad; límites de tamaño/tiempo de petición; gestión de credenciales y copias; acceso de despliegue.
No pedir contraseña por chat. Nombre del plan y capturas de características sin datos sensibles bastan para evaluación inicial.
Documentación general IONOS ofrece PHP y MySQL/MariaDB en hosting; no prueba las condiciones de este contrato. Sin cambios ni publicación en la cuenta del responsable.

## Pantallas entregadas
[Prototipo navegable](prototipo/README.md):
Venta → revisión de contado/cuenta; Cuentas → saldo/historial → pago/anticipo → vista de documento; Alumnos; Menú; Reportes; Ajustes.
Diseño adaptable con controles táctiles y datos ficticios. Importe, fecha, negocio y moneda son del ejemplo.
Funciones de maqueta: agregar artículos, simular ventas/pagos, observar deuda/saldo a favor, agregar alumnos/productos ficticios, revisar totales y vista imprimible individual.
El prototipo 0.2 conserva alumnos, productos y movimientos en IndexedDB y confirma después del commit local. Recupera datos al reabrir desde el mismo origen/navegador, bloquea escritura pendiente y permite reintentos sin duplicación. Inicialización rechaza datos incompatibles sin reemplazarlos. La persistencia física todavía debe probarse en el equipo real. Sin acceso privado, FIFO detallado por cargo, correcciones/devoluciones, filtros reales por fecha, generación directa de archivo PDF, compartir archivo, copia central o restricción real de dispositivo. Esas funciones siguen exigidas por v1.0, no se consideran implementadas por mostrar una pantalla.
Vista imprimible utiliza diálogo de impresión del navegador; no sustituye el PDF directo operable desde teléfono.

## Validación realizada y pendiente
Catorce pruebas pasan: cinco del motor, tres de interfaz y seis de almacenamiento. Incluyen recuperación en nueva conexión, fallo de transacción sin cambios, reintento sin duplicación, escrituras concurrentes sin pérdida, esquema/estructura incompatibles y ausencia de IndexedDB. Revisión sintáctica JS aprobada. El almacenamiento se comprueba con simulador de contrato, sin navegador real; no acredita persistencia física.
Pruebas de interfaz hechas mediante ejecución JS con DOM mínimo simulado: no son automatización de navegador ni revisión visual.
Navegador ejecutable no disponible en este entorno; no se afirma verificación de apariencia móvil, impresión real o interacción táctil. Próxima comprobación: abrir prototipo en navegador/teléfono del responsable y validar recorrido y persistencia local. PDF/API y apertura PWA sin red siguen pendientes.

## Orden de implementación
1. Revisar pantallas de despacho/cuenta/pago/PDF y ajuste de diseño.
2. Completar motor v1.0 (FIFO, fechas, reversos y documentos versionados); pruebas A01–A13/A19–A20.
3. IndexedDB + apertura sin red + PDF local; pruebas A08–A10/A18.
4. Acceso/API/respaldo/migración; pruebas A14–A17.
5. Prueba en equipo real y piloto medido. Inventario/WhatsApp automático permanecen fuera.

## Fuentes primarias
Consultadas 2026-10-04:
- [IONOS: hosting y categorías PHP/base de datos](https://www.ionos.com/help/hosting/).
- [IONOS: MySQL/MariaDB](https://www.ionos.com/help/hosting/mysql-mariadb-databases/).
- [MDN: service workers y HTTPS](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers).
- [MDN: IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).
- [MDN: cuotas y eliminación de almacenamiento](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).
- [WordPress: requisitos de alojamiento](https://wordpress.org/about/requirements/).
\n## Incremento 0.2 — guardado local\nSe implementó primero la capa de almacenamiento del prototipo para comprobar la ruta de guardado antes de completar el motor v1.0. Es una copia de estado versionada en una única transacción IndexedDB, con lectura del último registro. El respaldo central y la copia local operativa protegida siguen pendientes. Esta demo usa una base separada de pruebas y solo datos ficticios. No acredita FIFO, fechas reales, reversos, recuperación de servidor ni los veinte escenarios finales.\n
## Base de producto 0.3.0 — 2026-10-04
El responsable aprobó distribución móvil y solicitó encaminar el desarrollo al producto. Se preparó [app 0.3.0](app/README.md) con instalación vacía, configuración, fecha actual y guardado local, conservando la demo previa. Nombre de entrega nuevo para evitar confusión con el archivo publicado, que al inspeccionarlo seguía mostrando versión en memoria. [Plan, incidencia y criterios pendientes](DESARROLLO-PRODUCTO.md). Cinco pruebas con simuladores pasan; no acreditar todavía validación física ni disponibilidad operativa.
