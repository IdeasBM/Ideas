# Pruebas del responsable · 0.7.0
El responsable hace todas las pruebas. No crear aún la cuenta del tío ni pedirle cargar listas; su instalación final será independiente y vacía. Datos ficticios durante esta etapa.

Primero: respaldo IONOS confirmado + respaldo manual externo de 0.6.0, detener captura en otros equipos, cerrar pestañas, actualizar con el paquete **actualizacion**. Conservar la cuenta/configuración privada del servidor.

| Paso | Acción | Resultado que debe comprobar |
|---|---|---|
| 1 | Entrar por index.php, crear clave local y repetirla | Redirige a app.php; cifra sin reiniciar alumnos, menú, saldos ni caja. |
| 2 | Bloquear, probar clave incorrecta, después correcta | Incorrecta no abre datos ni los borra. Correcta recupera los registros. |
| 3 | Añadir productos al carrito, bloquear, desbloquear | Borrador conservado; todavía no cuenta como venta hasta confirmar. |
| 4 | Abrir conectado y esperar autorización/respaldo; cerrar todas las pestañas | app.php preparado. No continuar con una versión vieja o un worker esperando. |
| 5 | Desactivar realmente wifi/datos; cerrar/reabrir favorito app.php | Abre pantalla de clave local y permite consultar después de desbloquear. |
| 6 | Con permiso offline vigente, hacer venta a crédito, venta pagada y abono | Historial confirma guardado local; saldo correcto; respaldo pendiente, no “respaldado”. |
| 7 | Cerrar/reabrir todavía sin red | Conserva operaciones y pide clave local. No necesita contraseña IONOS para descifrar la copia preparada. |
| 8 | Reconectar; si expiró sesión, entrar por index.php | Autoriza el teléfono y respalda el estado completo una sola vez; saldos no se duplican. |
| 9 | Detener teléfono, abrir Mac y desbloquear su copia | Si el teléfono controla IONOS, Mac permite consulta y detiene cambios al comprobar servidor. |
| 10 | Recuperar IONOS en Mac con contraseña | Transferencia explícita, datos correctos; respaldo y permiso del nuevo equipo confirmados. |
| 11 | Teléfono anterior conectado: intentar guardar producto o venta | Detecta cambio antes de confirmar escritura; “Captura detenida”; consulta y recuperación disponibles. |
| 12 | Recuperar control de vuelta al teléfono, con Mac detenida | Teléfono final autorizado; Mac anterior no guarda nuevos cambios cuando detecta transferencia. |
| 13 | Interrumpir la recuperación y reabrir | Si quedó incompleta, no sube silenciosamente la copia vieja. Repetir revisión/recuperación. |
| 14 | Permiso sin internet vencido (24 horas desde última confirmación) | Consulta disponible; captura detenida hasta conectar/autorizar. No adelantar reloj con datos reales. |
| 15 | Incógnito/navegador nuevo: abrir app.php | Código genérico sin registros; pide acceso IONOS para preparar. API/context.php no muestran datos sin sesión. |
| 16 | private/* y HTMLs anteriores | 403/404; no fuente privada ni acceso a registros. |
| 17 | Respaldo y recuperación desde una copia cifrada | Restituye alumno/menú/saldos/cortes/documentos. No confunde clave local, contraseña IONOS y contraseña del archivo manual. |
| 18 | Jornada ficticia con apertura/corte y PDF | Ventas, efectivo, transferencias, crédito, anticipos y abonos concuerdan con una libreta de referencia. |

Ninguna marcada aprobada por anticipado: registrar resultados del responsable tras instalar. Las pruebas de 0.6.0 aprobadas anteriormente no sustituyen estas nuevas.

## Límite operativo del cambio de equipo
Sin internet un dispositivo no puede conocer la transferencia hecha en otro. El permiso offline es temporal (24 horas), no una revocación remota instantánea. Detener siempre el anterior antes de cambiar; no capturar en dos equipos. Detección periódica conectada (30 segundos), al volver a primer plano/reconectar y antes de guardar. Un cambio simultáneo entre comprobación y escritura local puede dejar una operación solo local: el respaldo rechaza el conflicto. No hay consenso/distribución para dos cajeros.

## Próxima instalación del tío
Usar carpeta distinta, por ejemplo `/cafeteria-tio/`, con cuenta y respaldos nuevos; jamás copiar config/clave del ambiente de pruebas. Base local distinta y vacía, aun en el mismo navegador. Esta entrega prepara el código y paquete limpio, **no crea el usuario**. Después de aprobar la jornada, el responsable activa esa instalación y guía al tío por teléfono sobre sus listas reales, una sola vez.
Aislamiento lógico por carpeta, no aislamiento frente a scripts del mismo origen/WordPress ni compromiso total del hosting. Antes de piloto con datos reales verificar origen dedicado, privacidad/recuperación y escenarios completos de operación. La lógica contable de beta conserva sus limitaciones documentadas: ajustes parciales/fechas retroactivas/stock calculado no forman parte de esta entrega.
