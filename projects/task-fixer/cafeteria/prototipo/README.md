# Pantallas de cafetería · prototipo 0.1
Task Fixer · 2026-10-04. Datos ficticios; no aplicación operativa.

Descarga **pantallas.html** y ábrelo en un navegador: archivo autosuficiente sin instalación ni llamadas de red. GitHub muestra su código, no ejecuta la interfaz.

## Recorridos para revisar
1. Venta: agrega burrito y jugo, continúa y confirma Pagado ahora. Ver Reportes: ventas/cobros aumentan sin cambiar deuda de Ana.
2. Venta: agrega productos, elige A la cuenta del alumno y selecciona Pablo. Su anticipo disminuye; cobros no vuelven a aumentar.
3. Cuentas: muestra Todos los alumnos, selecciona Ana (saldo inicial ficticio MXN 45), registra pago MXN 60 y revisa: MXN 15 a favor.
4. Desde la cuenta, Ver documento: vista individual imprimible. Imprimir/guardar PDF abre diálogo del navegador; no hay generación directa/compartir archivo implementados.
5. Explora Alumnos, Menú, Reportes y Ajustes. Puedes añadir datos ficticios a la maqueta.

Recargar o Reiniciar ejemplo borra la simulación. No introducir nombres, cuentas o datos reales. No hay guardado persistente, acceso, conexión a IONOS, API, sincronización ni PWA instalada.

## Construcción y pruebas
`python build.py` genera pantallas.html con HTML/CSS, engine.js y app.js incorporados. Sin dependencias en ejecución.
`node --test test.cjs test-ui.cjs`: siete pruebas aprobadas. Motor básico y generación de pantallas con DOM mínimo simulado; no test visual ni navegador real. Sintaxis de app.js comprobada.
No disponible navegador ejecutable para revisar apariencia, impresión o teléfono real. Estos controles siguen pendientes.

La especificación v1.0 sigue rigiendo: la maqueta no implementa todavía todas sus funciones. [Arquitectura y límites](../ARQUITECTURA-Y-PANTALLAS.md).
