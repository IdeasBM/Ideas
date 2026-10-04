# Revisión de pantallas aplicada · beta 0.4.0
Task Fixer · 2026-10-04. Fuente: observaciones PDF del responsable revisadas en cuatro páginas, texto y capturas. No se publica el PDF ni sus capturas en el repositorio.

| Observación | Resolución |
|---|---|
| Escuela y/o ubicación | Dos campos opcionales en configuración y datos de escuela/ubicación en vista de cuenta |
| Categorías propias | Categorías iniciales y alta de nuevas; productos asignados y venta filtrable por categoría |
| Descripción opcional y costo | Descripción opcional y precio de venta; no costo de compra ni utilidad |
| Grado 1–6 y grupo A–F | Desplegables separados; identificadores de alumno siguen independientes del nombre |
| Tercer indicador Crédito | Crédito pendiente al corte final, separado de ventas y cobros del periodo |
| Filtros por fecha, grupo, grado, alumno/cliente y tipo | Consulta combinada por día/rango, grado, grupo, búsqueda parcial/nombre específico y tipo. Clientes identificados son alumnos; contado anónimo sigue permitido y puede asociarse opcionalmente a alumno |
| Retirar apartado que repite lógica | Se integra Cuentas en Reportes conforme a la captura asociada a la anotación “usuarios”. Alumnos se conserva para altas |
| Ajustes correctos | Se conserva el recorrido con los campos opcionales pedidos |

La deuda anterior a la fecha inicial sigue en Crédito pendiente hasta el corte. Los abonos y anticipos reducen cuenta; crédito a favor de otro alumno no reduce deuda ajena. Este significado debe conservarse al preparar PDF/backend.

## Datos existentes
Migración schema 1→2 en IndexedDB, sin cambiar nombre de base/origen. Copia interna anterior, actualización y revisión quedan en la misma transacción. Esquema 2 incluye categorías, descripciones, escuela/ubicación y grado/grupo. Grupos anteriores no reconocibles se conservan; no inventar valores. Los importes y movimientos no se recalculan ni duplican durante migración.
Cerrar versiones anteriores y continuar con 0.4.0. Esquema nuevo evita que clientes 0.3 sobrescriban datos. Copia interna no sustituye respaldo central.

## Validación y límites
13 pruebas con simuladores de DOM/IndexedDB pasan; cubren preservación/reintento, migración y aborto, filtros y deuda. Sintaxis JavaScript comprobada. No se ejecutó 0.4 en navegador ni teléfono real; pendientes revisión visual y reapertura tras carga de esta entrega. Autenticación, PWA, respaldo, FIFO detallado y PDF directo continúan fuera de esta entrega, exigidos por v1.0.
