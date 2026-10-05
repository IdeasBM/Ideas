# Validación de acceso y respaldo en IONOS · 0.6.0
Instalación y pruebas del instructivo confirmadas por el responsable el 2026-10-04 a las 20:34 America/Chicago; los recorridos explícitamente descritos figuran al final. La tabla conserva los criterios de comprobación, sin atribuir pruebas adicionales no descritas. El agente ejecutó pruebas locales y no inspeccionó directamente esta instalación.

| Prueba | Resultado esperado |
|---|---|
| Activar con código, crear usuario, eliminar instalar.php | Segundo intento no puede crear/reemplazar la cuenta. Código no publicado en GitHub. |
| Abrir index.php en incógnito | Pide contraseña; no muestra catálogos ni app. |
| API sin sesión | Niega acceso, sin respaldo ni datos en respuesta. |
| private/app.html, private/core.php y cualquier HTML viejo | 403/404. Si muestran app/archivo, detenerse y revisar `.htaccess`/eliminar versiones públicas. |
| Entrar desde teléfono habitual | Conserva alumnos, productos, saldos, ventas y caja de 0.5.1. No borra IndexedDB. |
| Respaldar ahora y guardar una venta | Aviso con fecha de IONOS después de confirmar servidor, no antes. |
| Cortar internet con página abierta y guardar | Venta permanece local; aviso pendiente; al reconectar con sesión válida se respalda. |
| Cerrar antes del envío | Al abrir conectado se reintenta la copia actual. No afirmar que cerrar envió el respaldo. |
| Abrir desde navegador diferente | No altera respaldo del teléfono. Si se intenta respaldar otra copia, muestra conflicto. |
| Recuperar con contraseña y teléfono anterior detenido | Reemplaza la nueva copia local; saldos/cortes/documentos idénticos al respaldo; anterior no sobreescribe. |
| Interrumpir recuperación tras confirmar dispositivo | Respaldo automático detenido hasta revisar/completar recuperación. No subir datos antiguos. |
| Cerrar sesión, recargar y pulsar atrás | Exige acceso; API niega lectura. Copia del teléfono no se elimina. |
| Sesión vencida | Nuevos respaldos piden entrar otra vez; ventas guardadas localmente siguen ahí. |
| Intentar reabrir en modo avión | En esta etapa requiere red; bloqueo local/apertura offline cifrada pendientes, sin prometer lo contrario. |

Registrar versión PHP, teléfono/navegador, fecha y resultado real sin subir capturas con datos personales al repositorio. No avanzar a piloto con alumnos reales hasta completar bloqueo local y pruebas de recuperación/operación.

## Validación comunicada por el responsable — 2026-10-04, 20:34 America/Chicago
El responsable confirmó que instaló 0.6.0 y realizó todas las pruebas del instructivo de instalación con resultado satisfactorio. Describió explícitamente:
- Respaldo en IONOS desde el teléfono habitual con tres alumnos y registros de menú.
- Recuperación de esa información desde el navegador de la Mac.
- Recuperación posterior de vuelta al teléfono habitual.
- Cierre de sesión seguido de solicitud de contraseña al volver a abrir.
- Solicitud de contraseña al entrar en incógnito o desde otra cuenta.
Se acredita instalación y funcionamiento de los recorridos descritos según prueba del responsable; el agente no los inspeccionó directamente. No se presupone versión PHP/navegadores específicos, contraste contable detallado ni pruebas individualizadas de interrupción, caducidad o archivos privados que no se describieron. El reporte general del instructivo se conserva como tal.
Siguiente bloque: cifrado/bloqueo de la copia local y reapertura sin internet protegida, manteniendo respaldo y recuperación ya probados. No se cambia todavía el código ni se autoriza con este reporte el piloto con datos reales.
