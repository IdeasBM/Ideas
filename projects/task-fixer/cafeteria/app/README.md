# Cafetería · base de producto 0.3.0
Task Fixer · 2026-10-04. Primer incremento del producto; todavía no apto para datos reales ni piloto operativo.

Archivo de entrega: **cafeteria-beta-0.3.0.html**. Nombre nuevo para distinguirlo de pantallas.html. Autosuficiente y sin llamadas externas.

## Funciones implementadas
- Primera apertura vacía: sin alumnos, productos, saldos ni ventas de ejemplo.
- Configuración requerida: nombre de cafetería, moneda MXN/USD, zona horaria y ciclo escolar. Valores iniciales seleccionables, no datos del negocio confirmados. Moneda/zona horaria se fijan al primer movimiento.
- Alta de alumno con nombre y grupo libre, identificador propio y cuenta individual.
- Alta de producto y precio en centavos.
- Venta de contado sin alumno o cargo a cuenta; uso de crédito existente sin duplicar cobro.
- Pago parcial/total o anticipo; remanente como saldo a favor.
- Fecha calculada según zona horaria configurada y fecha/hora ISO del registro.
- Totales acumulados separados de ventas y cobros. Sin filtros de periodo todavía.
- IndexedDB en base separada de la demo: lectura del último estado, escritura atómica y revisión creciente; confirmación tras commit. Error conserva carrito e identificador de reintento.
- Cuenta acumulada con vista imprimible individual; no PDF emitido definitivo.

No hay botón de reinicio destructivo en esta entrega. La instalación guarda en el mismo navegador y origen; PC y teléfono son copias independientes. No importa datos de la demo automáticamente.

## Publicación de prueba
1. En IONOS, entrar a la carpeta ya usada `demo-cafeteria` del sitio Task Fixer.
2. Subir **cafeteria-beta-0.3.0.html** como archivo nuevo. No reemplazar pantallas.html.
3. Abrir la dirección HTTPS de ese archivo en el navegador habitual del teléfono.
4. Confirmar título/distintivo **BETA 0.3.0**, primera pantalla Configuración y catálogos vacíos.
5. Introducir solo datos ficticios, guardar configuración y dos productos; agregar un alumno.
6. Registrar contado/cuenta/abono. Cerrar, abrir de nuevo la misma dirección y navegador; comprobar movimientos y saldos.
7. Si no conserva datos, registrar texto exacto de estado/error, versión y navegador; no afirmar que quedó resuelto sin esta prueba.

El HTML de esta entrega opera localmente una vez cargado, pero abrir desde URL sin red todavía requiere el futuro service worker. Compartir un enlace no comparte los datos locales.

## Límites y siguiente entrega
- Sin acceso privado ni cifrado local; no introducir datos personales de alumnos reales.
- Sin respaldo central, restauración ni autenticación de dispositivo en IONOS.
- Sin configuración de tutor/contacto, edición/archivo de alumnos/productos, carga de saldos de apertura ni búsquedas rápidas.
- El motor calcula deuda y crédito, pero todavía no distribuye abonos entre cargos individuales por FIFO.
- Sin reversos/correcciones/devoluciones, periodos reales, comprobantes versionados ni PDF directo/compartir archivo.
- No se ha instalado en IONOS esta entrega mediante herramientas del agente. El responsable realizará la carga.

La [especificación v1.0](../ESPECIFICACION-DESARROLLO-v1.0.md) sigue siendo la fuente de requisitos; esta entrega no los cumple todos. [Ruta del producto](../DESARROLLO-PRODUCTO.md).

## Construcción y validación
`python build.py` genera el HTML de entrega. `node --test test.cjs`: cinco pruebas pasan.
Comprueban inicio vacío/configuración obligatoria, recuperación de catálogos/ventas/pagos, contado sin alumno, fallo y reintento sin duplicación, fechas actuales, moneda/zona bloqueadas y grupos libres/texto escapado.
Pruebas con DOM mínimo y simulador de IndexedDB en Node: no acreditan persistencia física ni apariencia en Safari. Prueba móvil de esta versión pendiente de carga y ejecución por el responsable.
