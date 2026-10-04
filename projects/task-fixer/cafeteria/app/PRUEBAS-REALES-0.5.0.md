# Pruebas reales · beta 0.5.0
Estado: pendientes; datos ficticios. No marcar aprobadas por pasar pruebas Node.

## Preparar y actualizar
Subir HTML, sw.js, manifest.webmanifest e icon.svg a la carpeta de prueba. Cerrar versiones previas, abrir 0.5.0 en navegador habitual. Comprobar catálogos/saldos originales antes de hacer movimientos. No borrar datos. Si la migración falla, captura se detiene sin reemplazar el estado.

## Recorridos
1. Menú: abrir Bebidas y Alimentos sin recorrer otras listas; abrir/cancelar alta; registrar existencia 0 y 12, verificar fecha tras recarga. Edición de precio no altera conteo ni ventas antiguas.
2. Alumnos: homónimos en primaria y secundaria 1° A. Al vender a crédito no hay alumno seleccionado. Elegir filtros, buscar sin acentos, confirmar nombre/grupo. Cambiar nivel limpia la selección.
3. Caja: fondo 200; venta pagada en efectivo 500; venta a cuenta 150; cobro de deuda en efectivo 100; retiro 50. Esperado 750. Contado 740: diferencia −10. La venta a crédito se ve en ventas, sin efectivo. Probar transferencia aparte.
4. Pago: cuenta 40, pago 60 → 20 a favor; venta a cuenta 30 → debe 10. Método/nota guardados. Volver a corregir conserva importe. FIFO comprobar con cargo anterior 40 y reciente 30, pago 60 cubre 40+20.
5. Corrección: anular venta a cuenta con pago recibido → queda saldo a favor. Segunda anulación bloqueada. Anular contado mantiene efectivo y muestra devolución pendiente; entrega parcial reduce efectivo por lo entregado. Ninguna acción transfiere dinero automáticamente.
6. Documento: deuda anterior 40 fuera del periodo, compra 25 dentro, pago 10 → previo 40, corte 55. Emitir, imprimir/guardar PDF legible, compartir manual. Corregir compra, emitir nueva versión; anterior sigue en Documentos emitidos con 55.
7. Respaldo: exportar archivo cifrado con contraseña de prueba. Reabrirlo y revisar conteos. En navegador de prueba independiente, restaurar y contrastar alumnos/productos/ventas/cortes/documentos. No sumar dos veces. Contraseña errónea y archivo alterado no reemplazan datos. Detener captura del equipo anterior antes de usar sustituto.
8. Offline: Ajustes → Preparar recursos con conexión. Recargar, cerrar navegador, activar modo avión y abrir de nuevo 0.5.0. Registrar venta/pago y documento, cerrar y reabrir. Contrastar datos y PDF. Volver a red sin duplicaciones.
9. Pestañas: abrir dos copias, guardar en una, intentar guardar en otra. Debe bloquear vista desactualizada y conservar borrador. Recargar conscientemente antes de reintroducirlo.
10. Uso en despacho: medir con catálogo/alumnos/historial representativos. Ver botones, teclado, formulario fuera de pantalla, scroll de pestañas, legibilidad de total y tiempo de seleccionar alumno. No afirmar volumen/compatibilidad hasta probar.

## Protección pendiente
Aunque estas pruebas pasen, no usar niños/cuentas reales hasta acceso privado, cifrado local y respaldo IONOS con recuperación demostrada. PDF fuera de la app queda bajo cuidado del operador. Contraseña de respaldo no es contraseña de acceso a la app.
