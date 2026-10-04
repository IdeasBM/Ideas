# Cafetería · beta 0.4.2
Task Fixer · 2026-10-04. Ajustes solicitados en la revisión del responsable. Sigue siendo una beta sin acceso privado ni respaldo central.

Entrega: **cafeteria-beta-0.4.2.html**. Archivo autosuficiente sin dependencias de red. Los archivos 0.3.0, 0.4.0 y 0.4.1 se conservan como entregas históricas, pero los fuentes y el constructor corresponden a 0.4.2.

## Cambios
- Edición de producto: nombre, descripción, categoría y precio. Ventas guardadas mantienen su snapshot; producto pendiente en carrito se retira al editar para reintroducirlo con el precio nuevo.
- Edición de alumnos desde su lista: nombres, apellidos, nivel, grado y grupo, conservando ID y cuenta.
- Lista de alumnos: nivel → grado/grupo → alumnos, bloques plegados inicialmente y contadores.
- Eliminar solicita confirmación y retira el registro de la operación (`archived:true`). Nunca borra movimientos ni cuentas. Alumnos retirados permanecen en Reportes para cobrar; productos retirados no se venden. Restauración en Ajustes. No hay borrado definitivo en esta beta.
- Nivel educativo: Kínder, Primaria, Secundaria y Preparatoria. Nombre(s) y apellidos se guardan separados; `name` conserva el nombre completo para compatibilidad. Búsqueda por nombre o apellidos. El nivel distingue grados/grupos repetidos y aparece en cuentas, ventas y documentos.
- Alumnos anteriores conservan su nombre íntegro y quedan con nivel Sin definir. Abrir su cuenta permite separar apellidos y asignar nivel sin cambiar ID, saldo ni movimientos. No se adivinan datos. Campos adicionales compatibles con formato 2; desde 0.4.0 no requiere migración destructiva.
- Configuración: escuela y ubicación opcionales, además de cafetería/moneda/zona/ciclo.
- Menú: categorías Alimentos, Bebidas, Botanas, Postres y Sin categoría; creación de categorías propias; productos con categoría, descripción opcional y **precio de venta**. “Costo” en las observaciones se interpreta como precio al cliente, no costo de adquisición o cálculo de utilidad.
- Venta: filtro de productos por categoría. Contado puede asociarse opcionalmente a un alumno para reportes sin cambiar su deuda.
- Alumnos: grado 1–6 y grupo A–F separados; nombre propio e identificador independiente.
- Reportes: vendido, cobrado y **crédito pendiente**, filtros por día/rango, grado, grupo, nombre parcial/alumno y tipo de movimiento.
- Cuentas se integra en Reportes: deuda/todos/saldo a favor, acceso a cuenta, pago y documento. Alumnos permanece para gestión de altas. La captura bajo la sugerencia de retirar “usuarios” corresponde a Cuentas; se aplicó a esa pantalla.

## Significado de los indicadores
Vendido: contado y cargos a cuenta dentro de los filtros. Cobrado: contado y pagos/anticipos dentro de los filtros. Cada movimiento cuenta por su propia fecha en la zona del negocio.
Crédito pendiente: suma de saldos positivos de los alumnos seleccionados **hasta la fecha final**, incluyendo sus cargos anteriores. No es vendido menos cobrado. Un anticipo de un alumno no compensa deuda de otro. La fecha inicial y el filtro por tipo de movimiento no alteran el crédito pendiente; la pantalla lo explica.
La lista de cuentas usa el mismo corte final, pero abrir una cuenta lleva a su **saldo actual** para registrar pagos. Fechas abiertas significan desde inicio/hasta actualidad. Ventas anónimas quedan fuera cuando se filtra por grado, grupo o alumno. La búsqueda parcial por nombre sí filtra el resultado al aplicar filtros.
Este reporte es una consulta en pantalla; exportación de reporte y PDF directo siguen pendientes.

## Actualizar desde 0.3.0 sin reiniciar
1. Subir el archivo nuevo a la misma carpeta de prueba de IONOS; conservar su nombre.
2. Cerrar pestañas anteriores y abrir 0.4.2 desde la misma dirección base/origen y navegador habitual.
3. La base local existente se actualiza automáticamente: se preservan IDs, catálogos, movimientos y precios. Productos anteriores quedan en Sin categoría. Grupos reconocibles como 1° B se separan; grupos libres anteriores se conservan sin inventar grado.
4. Comprobar escuela/categorías/filtros y los saldos previos. No borrar datos del navegador ni reiniciar instalación.
5. Continuar únicamente en 0.4.2 y cerrar pestañas anteriores: 0.4.0/0.4.1 no interpretan registros retirados. Tras actualizar, 0.3.0 rechaza el nuevo formato en lugar de sobrescribirlo. La actualización guarda internamente una copia del estado anterior en la misma transacción; no es un respaldo fuera del teléfono.

Formato de datos 2; versión física IndexedDB 1. Migración atómica con copia anterior y revisión creciente, sin borrar base. No trasladar los datos entre PC/teléfono: son instalaciones independientes.

## Verificación
`python build.py` genera 0.4.2. `node --test test.cjs test-reportes.cjs`: **20 pruebas pasan**.
Incluyen edición con precios históricos, retiro/restauración, deuda de alumno retirado, jerarquía de alumnos, recuperación, fallos/reintentos, filtros combinados/fechas de negocio, crédito con anticipos, contado asociado, categorías/escuela y migración sin pérdida/aborto sin cambios. DOM e IndexedDB simulados en Node; 0.4.2 todavía no verificada visualmente ni en teléfono real. La prueba real de persistencia anterior pertenece a 0.3.0.

## Pendiente de la especificación v1.0
Acceso privado/cifrado local, respaldo/recuperación IONOS, apertura PWA sin red, tutor/contacto, saldos de apertura, FIFO detallado, reversos/devoluciones, documentos versionados y PDF directo/compartir. No usar con datos reales todavía. [Especificación](../ESPECIFICACION-DESARROLLO-v1.0.md), [ruta del producto](../DESARROLLO-PRODUCTO.md).
