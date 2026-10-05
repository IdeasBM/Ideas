# Validación de acceso y respaldo en IONOS · 0.6.0
Todas pendientes en IONOS real. Usar datos ficticios y respaldo manual previo. El agente entregó código y ejecutó pruebas locales; no instaló ni inspeccionó esta versión en el hosting.

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
