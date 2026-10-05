# Jornada de trabajo · pruebas 0.7.1

El responsable hace las pruebas con datos ficticios. No crear todavía el usuario del tío. La reapertura offline de 0.7.0 fue confirmada en iPhone; esta actualización requiere nueva comprobación física.

## Cambio y causa
El reporte del 5 de octubre a las 08:18 (America/Chicago) muestra la pantalla de clave local, no la de usuario y contraseña IONOS. La versión previa intentaba bloquear a los cinco minutos oculta y perdía la llave al recargar. Ahora se conserva un acceso de jornada de nueve horas desde el desbloqueo local, sin renovación por recargas. El permiso offline y la sesión IONOS también se limitan a nueve horas desde su confirmación y login respectivamente. Conexión o sesión válida no equivalen a respaldo concluido.

La contraseña no se guarda: se conserva una CryptoKey no exportable por ese periodo en IndexedDB. Durante la jornada, este navegador puede abrir los datos sin clave; usar PIN del equipo y bloqueo manual al terminar. No equivale a mantener la llave únicamente en memoria ni a una frontera frente a scripts del mismo origen. El reloj y el código local determinan caducidad.

## Comprobaciones

| Prueba | Resultado esperado |
|---|---|
| Actualizar conectado, desbloquear con la clave existente | Conserva alumnos, menú, saldos, caja y movimientos; beta 0.7.1 visible. |
| Salir una hora y reabrir app.php | Sigue la jornada sin pedir clave local. |
| Recargar y cerrar/reabrir el navegador dentro de nueve horas | Abre la copia automáticamente; no reinicia las nueve horas. |
| Modo avión, reabrir app.php y registrar venta ficticia | Permite guardar con permiso vigente; venta aparece en historial. |
| Reabrir offline después de esa venta | Venta y saldos permanecen. |
| Reconectar | Ver «Respaldado en IONOS» antes de afirmar respaldo. |
| Bloquear este teléfono manualmente | Pide clave inmediatamente, incluso recargando; conserva borrador sin contabilizarlo. |
| Cerrar sesión IONOS y reabrir | No reutiliza ticket de jornada; requiere acceso al servidor conectado. |
| Dejar pasar nueve horas desde el desbloqueo | Pide otra clave; no extiende acceso por actividad o recargas. Si falta red y venció permiso, pide conectar antes de guardar. |
| Cambio teléfono → Mac con copia confirmada | Recuperación explícita transfiere control; teléfono anterior conectado avisa y no guarda nueva venta. |
| Volver a recuperar en el teléfono | Queda como único equipo de captura. |

Detener siempre el equipo anterior antes de transferir. Un equipo offline no conoce el cambio remoto de inmediato; no hay dos cajeros simultáneos. Favorito offline: app.php, no index.php.

## Seguimiento
Preparada y comprobada localmente. Ninguna prueba física de nueve horas se considera aprobada por anticipado. La sesión de trabajo no protege un teléfono desbloqueado compartido; el cierre manual termina el acceso guardado. Cuenta del tío sigue pendiente.

## Prueba física informada · 5 de octubre de 2026, 18:18 · America/Chicago

El responsable informó que instaló 0.7.1 y abrió correctamente en iPhone. Activó modo avión; la aplicación mostró aviso de falta de conexión con un pequeño retraso. Tras aproximadamente cinco minutos, reactivó la conexión y en no más de unos treinta segundos apareció la confirmación de respaldo. Se registra detección automática de desconexión y respaldo confirmado tras reconectar, según el reporte del responsable, sin cambio manual de modo.

Este reporte no especifica una venta nueva registrada durante el modo avión, ni su conservación al cerrar/reabrir, ni su recuperación en la Mac. Esos escenarios, la transferencia de control con rechazo de captura en el equipo anterior, y la jornada física de nueve horas siguen pendientes. No se aprobó toda la matriz ni se creó cuenta del tío.

Criterio de experiencia: operar sin gestionar conexión ni copias cotidianamente; verificar confirmación de respaldo antes de terminar. El envío automático requiere app abierta, conexión y sesión válida; un pendiente no es un respaldo remoto. Recuperación/cambio de equipo deben simplificarse mediante flujo guiado; los respaldos externos quedan como protección adicional administrada por el responsable, sin convertirlos en tarea diaria del operador.

## Captura offline y recuperación confirmadas; bloqueo por inactividad preparado · 5 de octubre, 18:41 · America/Chicago

El responsable confirmó en 0.7.1 dos ventas capturadas en modo avión y conservadas al refrescar. Reconectó, se respaldó automáticamente y recuperó en Mac: encontró una venta de $25 y un crédito de $45 a primaria. Se consideran comprobados captura offline, persistencia tras refresh, respaldo tras reconexión y recuperación del estado en Mac, según su reporte. Rechazo de escritura en teléfono anterior y duración física de nueve horas no se describieron: siguen pendientes.

Solicitó bloqueo tras dos horas sin actividad. 0.7.2 reinicia inactividad por interacción, conserva máximo de nueve horas, y no renueva por recargas/lecturas/verificaciones/respaldo. Caducidad persistida en el ticket de jornada; tickets de 0.7.1 sin actividad piden desbloquear una vez. Intenta respaldar antes de bloquear cuando está ejecutándose con conexión y sesión válida; conserva ventas y borrador local si no se enviaron. No cierra navegador ni genera corte de caja; en suspensión comprueba al volver y no promete envío con navegador cerrado. Bloqueo manual disponible para terminar jornada o prestar equipo; dos horas no protegen de acceso físico inmediato.

72 pruebas Node y 14 PHP real pasan (86), además de sintaxis ensamblada/lint y ZIP. Verifican inactividad con reloj inyectado, caducidad al reabrir, actividad sin extender nueve horas, sin resucitar ticket eliminado, no renovación por eventos automáticos/sintéticos y bloqueo con conservación de ventas offline. Se preparó paquete, no se desplegó en IONOS ni creó cuenta del tío. [Instalación 0.7.2](app/INSTALAR-0.7.2.txt), [pruebas y pendientes](app/PRUEBAS-PREPILOTO-0.7.2.md).
