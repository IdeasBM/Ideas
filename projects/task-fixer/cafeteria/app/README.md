# Cafetería · beta 0.5.1
Task Fixer · 2026-10-05. Entrega local de desarrollo. Sigue sin acceso privado, cifrado de base local ni respaldo central IONOS; usar datos ficticios.

## Entrega
`cafeteria-beta-0.5.1.html` contiene todo el código de interfaz/motor/guardado/respaldo manual. Para preparar apertura offline subir también `sw.js`, `manifest.webmanifest` e `icon.svg` a la misma carpeta HTTPS. `python build.py` produce el HTML y `cafeteria-beta-0.5.1-paquete.zip` con estos cuatro archivos e instrucciones. No pegar dentro de WordPress ni sustituir sus archivos.

## Cambios 0.5.1
- Tres ventas recientes encima de Nueva venta, ordenadas por captura, con alumno, importe, partidas, fecha y tipo. Pagos separados no se presentan como ventas; las anuladas se identifican. Ver todas lleva a Reportes.
- Confirmación visible y foco después de escritura exitosa; fallo conserva carrito y no inventa venta. Historial recuperado de la base al recargar.
- Navegación móvil en seis tarjetas con iconos y texto; todos los apartados visibles. Tarjetas suaves, contraste y controles mayores. Sin cambios de esquema o cálculos.

## Implementado
- Menú por categoría activa, pestañas horizontales y altas a demanda con aviso al descartar. Precio/descripción/categoría editables; retiro/restauración conservando ventas.
- Existencia inicial opcional en piezas con fecha; vacío desconocido, cero explícito. No se descuenta al vender ni se presenta como stock actual. Corrección trazable de conteos y movimientos de inventario aún pendientes.
- Venta a cuenta exige selección; nivel/grado/grupo filtran alumnos activos, orden por nombre, búsqueda sin acentos. Cambio de filtros limpia alumno. Contado anónimo permitido. Ventas nuevas congelan alumno/grupo/ciclo y precio de partidas.
- Caja: fondo inicial (cero válido), una sesión activa, entradas/retiros con motivo, efectivo esperado, conteo y diferencia al cerrar. No confunde venta a crédito, anticipo consumido o transferencia con efectivo. Corte cerrado conserva snapshot. Corrección de pago de otra caja no modifica el corte ni inventa retiro físico actual.
- Pago con método/nota y borrador conservado al corregir. Asignaciones FIFO recalculables por fecha/orden/ID; saldo inicial documentado antes de otras operaciones. Saldo a favor y devolución con entrega manual confirmada.
- Anulación completa vinculada al original, una sola vez, con motivo. Registra reemplazo como operación nueva después. No hay editor de importes confirmados. Anular contado deja devolución pendiente hasta registrar entrega; devolver saldo a favor y corregir un pago capturado mal son acciones distintas. No hay reversos parciales de venta ni corrección/reemplazo combinado atómico en esta beta.
- Documentos por periodo/corte: saldo previo, movimientos, saldo completo, folio/version, negocio y alumno congelados. Emisión guardada localmente; imprimir/guardar PDF solo después de emitir. Otra emisión recalcula y genera versión nueva; emisión previa permanece. Descarga directa/compartir archivo en un clic pendiente.
- Respaldo manual AES-GCM con contraseña (mínimo 12 caracteres), PBKDF2-SHA256/600000. Descarga y apertura/validación antes de reemplazo; restore atómico, no suma operaciones y conserva copia interna anterior. No es respaldo automático ni cifrado de base local. Sin contraseña no hay recuperación de este archivo.
- Escritura con comparación de revisión bloquea pestaña desactualizada; fallo conserva borrador. Resource cache limita service worker a archivos propios de 0.5.1; no cachea API ni WordPress. No fuerza actualización mientras una pestaña está abierta.

## Actualización sin borrar datos
1. Descomprimir paquete en PC y subir sus cuatro recursos a `demo-cafeteria`, donde están las betas anteriores.
2. Cerrar pestañas anteriores. Abrir **https://taskfixer.net/demo-cafeteria/cafeteria-beta-0.5.1.html** en el navegador habitual. URL aún no comprobada por el agente tras esta entrega.
3. Mantener mismo origen y navegador para encontrar la base local. No borrar datos ni usar incógnito. PC/teléfono siguen teniendo copias independientes.
4. Migración automática a formato 3 conserva catálogos/IDs/ventas/pagos y crea listas de sesiones/documentos vacías. Copias internas `before-schema-2` y `before-schema-3` se guardan según versión de partida, en transacción; no son copias fuera del equipo.
5. Movimientos anteriores no se asignan a caja ni a método inventado; productos anteriores quedan sin conteo inicial; no se inventan grupos históricos. Clientes 0.4 o anteriores rechazan formato 3. Continuar únicamente en 0.5.1.
6. En **Caja**, abrir con fondo de prueba antes de vender/cobrar. Configuración existente debe permanecer; si apareciera vacía, detenerse y revisar URL/origen/navegador.
7. En Ajustes, generar respaldo cifrado y conservarlo fuera del teléfono. Para probar restauración en sustituto, detener captura en el anterior; aún no hay autorización remota de dispositivo escritor.
8. En Ajustes, Preparar apertura sin internet. Después de preparar, recargar con conexión, cerrar y volver a abrir la URL de 0.5.1 en modo avión. Si falla, no considerar offline verificado.

## Verificación
`node --test test.cjs test-reportes.cjs test-operacion.cjs test-offline.cjs`: **39 pruebas pasan**. Node simula DOM/IndexedDB/cache; cifrado se prueba con Web Crypto de Node. Incluye migración, fallo/aborto, restauración y rechazo de archivo corrupto, filtro seguro, existencia cero, FIFO/anticipos, anulaciones/devoluciones, caja/cortes, documento inmutable y aislamiento de recursos cacheados.
Esto no valida layout real, impresión/paginación móvil, Safari Web Crypto/descarga, service worker físico ni la carga real del negocio. No equivale a todas las condiciones A01–A20. Pruebas físicas: [PRUEBAS-REALES-0.5.0.md](PRUEBAS-REALES-0.5.0.md).

## Pendientes que impiden un piloto con datos reales
Acceso privado y cifrado/desbloqueo local, API PHP/base privada IONOS, respaldo automático/recuperación remota, verificación de dispositivo único, tutor opcional, fechas efectivas retroactivas revisadas, validación completa de importación y rendimientos/archivos grandes. La validación incorporada revisa referencias/partidas/sumas pero no es una auditoría de seguridad ni reemplaza validación de servidor.
Solo piloto ficticio hasta completar protección/recuperación y pruebas reales. IA, compras e inventario calculado no forman parte de esta entrega. [Especificación](../ESPECIFICACION-DESARROLLO-v1.0.md), [apuntes](../APUNTES-FINALES-PREPILOTO.md).
