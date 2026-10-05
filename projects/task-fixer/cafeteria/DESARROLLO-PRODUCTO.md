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
- Apertura offline protegida sigue como objetivo. 0.6.0 retira la caché pública; entrar/reabrir requiere conexión hasta implementar cifrado y desbloqueo local.
- Beta 0.6.0: API PHP autenticada + archivos cifrados/versionados fuera de DOCUMENT_ROOT conservan el respaldo privado, sin usar tablas WordPress. MySQL/MariaDB queda como opción para una arquitectura comercial de varios negocios.
- Un dispositivo escritor; ninguna mezcla de cambios de dos teléfonos. Cambiar equipo requiere detener y restaurar.
- Un subdominio dedicado sigue siendo recomendable para la app final. La carpeta del sitio sirve para probar datos ficticios, sin acreditar aislamiento del servidor compartido.

Conectar solamente la pantalla a MySQL impediría capturar sin conexión. La copia local y la del servidor tienen trabajos distintos: rapidez/operación y respaldo/recuperación. No indicar “respaldado” por haber guardado solo en el teléfono.

## Entregas y criterios
1. **Base del producto 0.3.0 — implementada, validación física pendiente:** instalación vacía, configuración, catálogos, contado/cuenta/abono y guardado local. Cinco pruebas Node pasan con simuladores. Reabrir en equipo real debe conservar catálogos, movimientos y saldos; prueba pendiente.
2. **Motor contable y operación completa:** FIFO detallado por cargo, apertura de saldos, fechas/cortes, correcciones mediante reversos, devoluciones y datos del tutor; verificar escenarios aplicables de v1.0. No inventar aprobación de pruebas pendientes.
3. **Acceso, protección y respaldo:** usuario propietario, desbloqueo offline protegido, sesiones/API PHP, base dedicada, credenciales privadas, dispositivo autorizado, subida/confirmación de revisión y restauración. Concurrencia/idempotencia y rechazo de revisiones antiguas comprobados.
4. **Apertura offline y documentos:** service worker seguro y cacheado de recursos propios, PDF local versionado por alumno y compartir manual con alternativa. Validar modo avión tras cierre y generación de documento.
5. **Piloto operativo:** aplicación instalada en equipo real, respaldo/recuperación confirmados y escenarios de aceptación verificados. Solo entonces usar datos reales. Inventario y WhatsApp automático siguen fuera de primera etapa.

## Preparación actual de IONOS — beta 0.6.0
No requiere crear una base MySQL para el respaldo de esta beta de un negocio/un teléfono. PHP 8.1+ con OpenSSL/sesiones crea almacenamiento privado fuera de la carpeta pública. La cuenta y la clave de respaldo se generan durante una instalación con código aleatorio de un solo uso; nunca se publican en GitHub ni se piden por chat. Conservar respaldo manual antes de instalar; retirar archivos HTML públicos anteriores; comprobar ambos .htaccess en IONOS real. [Instalación](app/INSTALAR-0.6.0.txt).
La preparación de base dedicada/PDO planteada en entregas anteriores sigue como alternativa de evolución, no como paso necesario de esta entrega. No reutilizar tablas de WordPress. Mantener copias versionadas hasta verificar recuperación.

## Estado histórico de la entrega 0.3.0
0.3.0 está guardada en el repositorio; no desplegada por el agente. El archivo publicado que pudo inspeccionarse sigue siendo 0.1. La aprobación visual del responsable se conserva; pruebas de guardado real, PWA, PDF y servidor no están aprobadas.

## Verificación directa en navegador — 2026-10-04, 16:32–16:34 America/Chicago
El responsable reportó cargar 0.3.0 y perder ventas al recargar. Se abrió la URL publicada de cafeteria-beta-0.3.0.html en Chrome remoto y se comprobó distintivo 0.3.0 e IndexedDB disponible. Se guardó configuración ficticia, producto Burrito de prueba MXN 25 y una venta de contado. Tras recarga completa, Reportes mostró MXN 25 vendidos, MXN 25 cobrados y el movimiento; también se recuperó el catálogo. Esta es prueba de navegador real de esta ruta en Chrome, no validación Safari/iPhone ni todos los escenarios de aceptación.
Los datos de esta prueba residen en el navegador remoto, no en el teléfono del responsable. El problema informado no se reprodujo ahí y sigue sin causa confirmada. Revisar URL exacta, versión visible y Reportes después de recargar en el teléfono. El carrito de Nueva venta vuelve a cero por diseño y no es el historial. La presencia del archivo anterior en la carpeta no cambia el recurso seleccionado por la URL.
La beta 0.3.0 ahora está publicada por el responsable; la afirmación histórica de no despliegue corresponde al momento de la entrega anterior.

## Confirmación del responsable en teléfono — 2026-10-04, 16:40 America/Chicago
El responsable confirmó que estaba abriendo el archivo anterior y, al abrir cafeteria-beta-0.3.0.html, la configuración y los registros permanecen correctamente. La captura aportada muestra “Guardado local disponible” y Reportes con 50 vendidos y 50 cobrados. Se cierra la incidencia reportada de persistencia por apertura de versión incorrecta, según su comprobación. No se modificó el motor para resolverla.
Se acredita el guardado local tras recarga informado por el responsable en su teléfono, además de la prueba directa previa en Chrome. No equivale a apertura sin red, respaldo central ni validación de todos los escenarios. La siguiente actividad acordada es revisión del responsable en PC desde configuración y captura de ajustes de textos, distribución y recorrido. PC y teléfono conservan bases locales independientes; todavía no hay sincronización.

## Revisión del responsable aplicada — beta 0.4.0, 2026-10-04
Se revisó el PDF de observaciones y sus cuatro páginas. Se implementaron escuela/ubicación, categorías propias/descripción/precio de venta, grado 1–6/grupo A–F, filtros por periodo/alumno/grado/grupo/tipo e indicador Crédito pendiente. Cuentas se integra en Reportes conforme a la captura del documento; Alumnos conserva altas. [Resoluciones y criterios](REVISION-PANTALLAS-v0.4.md), [entrega y actualización sin reinicio](app/README.md).
Migración schema 1→2 preserva registros y guarda copia interna anterior de forma atómica. 13 pruebas con simuladores pasan; migración física/revisión visual de 0.4.0 pendientes. La aprobación móvil/persistencia anterior corresponde a 0.3.0. No se publica ni despliega esta nueva entrega desde herramientas del agente; requiere carga del responsable.

## Cierre de ajustes de interfaz — beta 0.4.3, 2026-10-04
El responsable aprobó el recorrido de 0.4.2 y aportó capturas de cuenta y documento; señaló el editor duplicado en Reportes. 0.4.3 lo retira: la cuenta permite consultar, cobrar y ver/imprimir documento; edición exclusiva en Alumnos. Versiones 0.4.1/0.4.2 agregaron nivel, apellidos separados, agrupación por nivel/grado/grupo, edición de menú y retiro/restauración con historial. 21 pruebas Node con simuladores pasan en 0.4.3. No confundir con las 20 condiciones A01–A20: no están todas aprobadas. La impresión/guardar PDF fue aprobada por el responsable; todavía no constituye emisión inmutable por periodo/folio.

## Siguiente bloque autorizado: completar operación antes del piloto
1. Motor de cuenta: asignaciones deterministas de pagos a cargos antiguos, saldo inicial documentado, método de pago guardado y grupo/ciclo congelados al vender. Cambiar grupo actualmente reclasifica consultas por grupo actual; no hay todavía snapshot histórico de grupo en ventas antiguas. No inventar su valor al migrar.
2. Correcciones: reversos vinculados, motivos, devoluciones y límites; comprobar saldos y cobros frente a casos de referencia. Edición de catálogos nunca corrige una venta ya confirmada.
3. Resguardo: exportación/restauración validada y luego acceso privado, desbloqueo local protegido, API PHP y base dedicada IONOS. No reutilizar la base WordPress; no incluir credenciales en HTML/repo.
4. Apertura sin conexión: recursos preparados en teléfono, cierre y reapertura en modo avión. IndexedDB ya es base de datos local; publicar HTML en IONOS no crea un respaldo remoto ni garantiza apertura offline.
5. Documentos: periodo/corte/folio y emisión conservada, descarga/compartir probado en teléfono. Mantener impresión actual mientras se completa este bloque.
6. Piloto: recuperar copia en dispositivo sustituto y contrastar operaciones con libreta de referencia. Solo entonces habilitar datos reales.

No hace falta comprar hosting ni volver a publicar el sitio comercial para este ajuste. Entrega de desarrollo: HTML nuevo en la carpeta de prueba habitual, mismo origen/navegador y cierre de versiones anteriores. La conexión MySQL es parte del bloque de resguardo, no sustituto del guardado local.

## Entrega local 0.5.0 — 2026-10-04
Se implementó el bloque local autorizado: menú compacto con altas a demanda; existencia inicial opcional con fecha (sin descuento automático); filtros de nivel/grado/grupo/alumno para venta y selección explícita; caja de una sesión, entradas/retiros/corte; métodos y notas de pagos; FIFO recalculable; saldo inicial documentado; anulaciones completas y devoluciones de dinero diferenciadas; documentos por periodo/corte conservados con folio/versión.
Formato 3 migra datos anteriores y conserva copia interna previa sin inventar cajas, stock ni métodos antiguos. Nuevas ventas congelan alumno/grupo/ciclo y partidas. Escritura comprueba revisión para rechazar pestaña vieja. Se preparó respaldo manual cifrado con validación/restore atómico y recursos service worker/manifest; no se afirma apertura física offline todavía.
36 pruebas Node pasan, incluida criptografía Web Crypto, simulaciones de UI/IndexedDB/cache, cajas/cortes, FIFO, reversos/devoluciones, migración, error/aborto y documentos inmutables. HTML ensamblado pasa análisis sintáctico. ZIP comprobado contiene HTML, worker, manifest, icono e instrucciones. Fuentes y HTML guardados en Ideas; el agente no subió archivos a IONOS.
No son 36 escenarios de piloto aprobados ni toda la matriz A01–A20. [Pruebas físicas pendientes](app/PRUEBAS-REALES-0.5.0.md), [instalación/estado/limitaciones](app/README.md).
Acceso privado, cifrado/desbloqueo de base local, API/base privada, respaldo automático y autorización remota de dispositivo siguen pendientes. El archivo de respaldo cifrado no bloquea la app. La siguiente dependencia externa es instalar el paquete en la carpeta habitual para pruebas ficticias y preparar IONOS para una base dedicada/API privada; no enviar contraseñas por chat.
Algunas reglas completas de v1.0 siguen abiertas: reversos parciales, reemplazo combinado atómico, fechas efectivas retroactivas, tutor opcional, PDF directo/compartir y revisión completa de rendimiento/validación. El inventario de movimientos y compras siguen fuera de esta entrega. No usar datos reales hasta completar protección y recuperación.

## Aprobación y acceso privado — 2026-10-04, America/Chicago
El responsable confirmó pruebas en teléfono y aprobó el diseño/recorrido de 0.5.1. Historial de tres ventas encima de Nueva venta, confirmación tras commit y seis apartados visibles con iconos. Autorizó continuar con acceso privado y respaldo IONOS.
0.6.0 entrega sesiones PHP con cuenta única, instalación de un solo uso, CSRF y HTTPS; respaldo completo automático con avisos pendiente/confirmado, cifrado AES-GCM en almacenamiento fuera de la carpeta pública, bloqueo/rename de archivos y retención de 30 versiones recientes. Revisión/dispositivo deben coincidir; recuperación exige contraseña, revisión y transferencia explícita, sin mezclar datos. Marcador persistente evita subir la copia vieja si se interrumpe la recuperación.
49 pruebas Node y 10 HTTP con PHP real pasan, más lint PHP/JS ensamblado y contenido del ZIP. No equivalen a despliegue IONOS, validación Apache/permisos/Safari ni aprobación de casos operativos completos. [Validación IONOS pendiente](app/PRUEBAS-IONOS-0.6.0.md).
Cambio transitorio de apertura: entrar/reabrir requiere conexión; una app abierta puede seguir capturando sin red y respaldar después. Se retira el caché público para que no eluda la autenticación. Cifrado/bloqueo local y reapertura offline protegida permanecen como siguiente etapa antes de piloto con datos reales. Datos de teléfono no se borran al cerrar sesión ni se cifran aún. El agente no instaló 0.6.0 en IONOS. El responsable carga el paquete y crea su contraseña en el instalador, sin compartirla en chat.

## Validación comunicada por el responsable — 2026-10-04, 20:34 America/Chicago
El responsable confirmó que instaló 0.6.0 y realizó todas las pruebas del instructivo de instalación con resultado satisfactorio. Describió explícitamente:
- Respaldo en IONOS desde el teléfono habitual con tres alumnos y registros de menú.
- Recuperación de esa información desde el navegador de la Mac.
- Recuperación posterior de vuelta al teléfono habitual.
- Cierre de sesión seguido de solicitud de contraseña al volver a abrir.
- Solicitud de contraseña al entrar en incógnito o desde otra cuenta.
Se acredita instalación y funcionamiento de los recorridos descritos según prueba del responsable; el agente no los inspeccionó directamente. No se presupone versión PHP/navegadores específicos, contraste contable detallado ni pruebas individualizadas de interrupción, caducidad o archivos privados que no se describieron. El reporte general del instructivo se conserva como tal.
Siguiente bloque: cifrado/bloqueo de la copia local y reapertura sin internet protegida, manteniendo respaldo y recuperación ya probados. No se cambia todavía el código ni se autoriza con este reporte el piloto con datos reales.

## Protección local, equipo de captura y preparación independiente — beta 0.7.0, 2026-10-04
El responsable autorizó los tres puntos y decidió hacer personalmente todas las pruebas, antes de crear cuenta para su tío. El tío solo cargará sus listas reales en una instalación final validada, guiado por teléfono, sin duplicar trabajo.
Se entrega copia local AES-GCM con clave derivada PBKDF2/600000, conversión transaccional de registros 0.6.0 sin reinicio, desbloqueo local y borrador cifrado al bloquear. Shell genérico app.php cacheable sin datos ni sesión; API/contexto/login fuera de caché. Reapertura offline requiere instalación previamente preparada, clave y permiso local de hasta 24 horas para capturar; primera preparación requiere conexión.
Control antes de guardar y verificación periódica/primer plano/reconexión detienen captura al detectar cambio de equipo, conservando consulta y recuperación. No se promete revocación instantánea de un equipo desconectado: detener siempre el anterior al transferir; sin captura simultánea. Cambio entre autorización y commit puede dejar operación solo local, que no sobreescribe el respaldo remoto.
Instalaciones en carpetas distintas separan cuenta, respaldo y base local; demo-cafeteria conserva base histórica para conversión. Se preparó plantilla limpia para instalación futura, sin crear usuario del tío. Es aislamiento lógico del mismo origen, no frontera de seguridad frente a WordPress/scripts del dominio; aislamiento mediante origen dedicado pendiente antes de datos reales.
65 pruebas Node y 13 HTTP PHP real pasan (78), además de lint/JS ensamblado y verificación de dos ZIP. Reapertura/cifrado/autorización integrados se comprobaron en runtime y simuladores, no Safari físico. [Instalación de actualización](app/INSTALAR-0.7.0.txt), [pruebas del responsable](app/PRUEBAS-PREPILOTO-0.7.0.md). El agente no desplegó esta versión en IONOS; la aprobación física de 0.6.0 sigue registrada y no aprueba por anticipado 0.7.0.

## Resultado parcial informado por el responsable · 5 de octubre de 2026

El responsable confirmó en iPhone que, después de volver a entrar con usuario y contraseña y desbloquear la copia local, los datos se abrieron correctamente. También activó modo avión, reabrió la aplicación, introdujo la clave local y pudo interactuar con ella. Se registra como comprobada la reapertura y el desbloqueo local sin red en ese teléfono.

Al reactivar los datos no se solicitó otra contraseña. Esto por sí solo no confirma que el respaldo remoto haya concluido: falta comprobar el indicador «Respaldado en IONOS». El reporte no describe una venta nueva confirmada sin conexión y conservada tras reabrir; esa comprobación sigue pendiente.

Queda pendiente para la tarde el cambio iPhone → Mac → iPhone y el aviso/bloqueo de captura en el equipo anterior conectado. Antes de transferir, detener la captura en el equipo anterior y confirmar su respaldo. En el nuevo equipo recuperar la copia; después comprobar que el anterior muestra «Captura detenida» y no registra un nuevo movimiento. Finalmente recuperar en el teléfono para dejarlo como equipo de trabajo. No se ha creado la cuenta del tío y no se considera aprobada toda la matriz de pruebas.

## Corrección de jornada · beta 0.7.1 · 5 de octubre de 2026

A las 08:18 (America/Chicago), el responsable informó que la app pedía otra clave al reabrir antes de una hora. La captura corresponde a desbloqueo local, no a login IONOS. Se identificaron bloqueo tras cinco minutos en segundo plano y pérdida de la llave en recargas/cierre de página en 0.7.0.

0.7.1 conserva una jornada local de nueve horas desde el desbloqueo, sin renovar por recargas/actividad. Para reabrir sin otra contraseña, guarda temporalmente una CryptoKey no exportable en IndexedDB separado; la contraseña no se persiste. Esto cambia expresamente la política anterior de llave solo en memoria: durante la jornada este navegador puede abrir los datos sin clave. Usar PIN del dispositivo; bloqueo manual y cierre de sesión eliminan el ticket. La caducidad depende del reloj/código y no ofrece protección frente a manipulación del equipo u otros scripts del mismo origen.

Sesión PHP, cookie y autorización de captura offline se limitan a nueve horas (desde login y confirmación del servidor respectivamente). El permiso offline no sustituye la sesión de respaldo; confirmar «Respaldado en IONOS». Se conservan cuenta, catálogos, saldos, formato cifrado y control exclusivo de equipo.

68 pruebas Node y 14 HTTP PHP real pasan (82); también lint PHP, scripts ensamblados y ZIP. Incluyen reapertura automática offline, bloqueo manual, ticket vencido y separación de instalaciones; cookie/permiso nueve horas y autenticación válida antes del límite e inválida al cumplirlo. Pendiente instalación en IONOS y pruebas físicas de nueve horas y transferencia Mac–iPhone. El agente preparó paquete; no desplegó ni creó cuenta del tío. [Instalación 0.7.1](app/INSTALAR-0.7.1.txt), [pruebas 0.7.1](app/PRUEBAS-PREPILOTO-0.7.1.md).

## Prueba física informada · 5 de octubre de 2026, 18:18 · America/Chicago

El responsable informó que instaló 0.7.1 y abrió correctamente en iPhone. Activó modo avión; la aplicación mostró aviso de falta de conexión con un pequeño retraso. Tras aproximadamente cinco minutos, reactivó la conexión y en no más de unos treinta segundos apareció la confirmación de respaldo. Se registra detección automática de desconexión y respaldo confirmado tras reconectar, según el reporte del responsable, sin cambio manual de modo.

Este reporte no especifica una venta nueva registrada durante el modo avión, ni su conservación al cerrar/reabrir, ni su recuperación en la Mac. Esos escenarios, la transferencia de control con rechazo de captura en el equipo anterior, y la jornada física de nueve horas siguen pendientes. No se aprobó toda la matriz ni se creó cuenta del tío.

Criterio de experiencia: operar sin gestionar conexión ni copias cotidianamente; verificar confirmación de respaldo antes de terminar. El envío automático requiere app abierta, conexión y sesión válida; un pendiente no es un respaldo remoto. Recuperación/cambio de equipo deben simplificarse mediante flujo guiado; los respaldos externos quedan como protección adicional administrada por el responsable, sin convertirlos en tarea diaria del operador.
