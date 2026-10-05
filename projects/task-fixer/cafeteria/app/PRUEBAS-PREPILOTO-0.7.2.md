# Bloqueo por inactividad · 0.7.2

## Evidencia del responsable · 5 de octubre, 18:41 America/Chicago
En 0.7.1, el responsable registró dos ventas en modo avión, refrescó la página y permanecieron disponibles. Al reconectar se confirmó respaldo automático. Recuperó en Mac y encontró una venta de $25 y un crédito de $45 a un alumno de primaria. Se confirma captura offline, persistencia tras recarga, envío tras reconexión y recuperación del estado en otro equipo, según su reporte. No se interpreta «todas las pruebas» como aprobación del bloqueo del equipo anterior ni de nueve horas físicas, que no describió.

## Comportamiento nuevo
Dos horas sin interacción bloquean la copia local. Cada interacción vuelve a iniciar ese plazo, sin extender el máximo absoluto de nueve horas. Lecturas, verificaciones automáticas, respaldos y recargas no renuevan actividad. Se intenta respaldar antes de bloquear con app ejecutándose, red y sesión vigente. Sin red o con error, conserva las ventas localmente para enviar después de desbloquear y reconectar. No cierra navegador ni hace corte de caja. En suspensión, comprueba caducidad al volver; no promete ejecución en segundo plano ni respaldo de un navegador cerrado.

La llave de apertura y fecha de actividad se conservan temporalmente en IndexedDB. PIN/bloqueo del dispositivo siguen necesarios: dos horas no protegen contra alguien que tome el teléfono antes. Un ticket antiguo sin fecha de actividad exige desbloquear una vez tras actualizar. No reinicia catálogos ni saldos.

## Pruebas del responsable

| Caso | Resultado esperado |
|---|---|
| iPhone anterior conectado después de recuperar en Mac | Aviso de captura detenida; intento de venta no agrega movimiento. |
| Recuperar de nuevo en teléfono, con captura Mac detenida | Teléfono queda como único equipo de captura y muestra $25 / $45. |
| Actualizar, cerrar pestañas y desbloquear | Versión 0.7.2; conserva los registros. |
| Dejar dos horas sin interacción | Pantalla bloqueada; si estaba suspendida, se bloquea al volver. |
| Reabrir después de dos horas, aun con recargas previas | Pide clave; no renueva inactividad por recargar. |
| Tocar/escribir/desplazar dentro de las dos horas | Reinicia inactividad y conserva máximo de nueve horas. |
| Venta offline, dejar vencer inactividad y desbloquear | Venta permanece; al reconectar confirma respaldo. |
| Compra sin confirmar al bloqueo | Borrador cifrado; no crea venta ni cargo. |
| Caja abierta cuando se bloquea | Sigue abierta al desbloquear; no genera corte ficticio. |
| Bloqueo manual | Inmediato, conserva datos y exige clave. |

## Antes del piloto
Confirmar rechazo del equipo anterior, recuperación final en teléfono, bloqueo físico por inactividad y una jornada con caja/crédito/pago/corrección/documento. La matriz contable completa sigue siendo referencia. Preparar instalación independiente vacía para el tío, verificar aislamiento en origen dedicado y recuperación del acceso; después guiarlo para cargar sus listas una sola vez. No se creó todavía su cuenta.

El operador no descarga copias cada día ni cambia modos de red. Al terminar debe confirmar respaldo con la app abierta y conectada; puede pulsar Respaldar ahora si sigue pendiente y después bloquear el teléfono. El archivo manual externo es protección adicional a cargo del responsable, no tarea de cada venta.
