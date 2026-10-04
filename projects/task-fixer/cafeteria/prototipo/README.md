# Cafetería · prototipo 0.2.1 con guardado local
Task Fixer · 2026-10-04. Datos ficticios; todavía no apto para operación real.

En PC puedes descargar **pantallas.html** y abrirlo en un navegador compatible. En iPhone, usa una dirección HTTPS de la demo abierta en Safari; el visor del adjunto no es una prueba funcional. Archivo autosuficiente sin dependencias ni llamadas de red. GitHub muestra código, no ejecuta la interfaz. Para una prueba estable se recomienda servirlo desde localhost o HTTPS: el almacenamiento de archivos locales puede variar por navegador. Usa siempre el mismo origen y navegador; cambiar dirección no traslada datos.

## Qué cambió
- IndexedDB conserva alumnos, productos, ventas y pagos en este navegador.
- La interfaz confirma después del cierre exitoso de la transacción; un fallo conserva el carrito y permite reintentar con el mismo identificador.
- Cada escritura parte del último registro y guarda una versión creciente de forma atómica. Se bloquean confirmaciones mientras hay una escritura pendiente.
- Al abrir recupera el registro existente; datos con esquema incompatible detienen captura sin reemplazarlos por la demo.
- Reiniciar ejemplo requiere confirmación y borra solo la prueba local de esta aplicación.
- Ajustes permite solicitar protección del almacenamiento. El navegador decide concederla; no sustituye el respaldo ni impide que el usuario borre datos.

## Recorridos para revisar
1. Agrega burrito y jugo y confirma Pagado ahora: Reportes aumenta ventas/cobros sin cambiar deuda de Ana.
2. Compra a cuenta de Pablo: su anticipo disminuye sin registrar otro cobro.
3. Abona MXN 60 a Ana: saldo inicial ficticio MXN 45 pasa a MXN 15 a favor.
4. Cierra y abre desde la misma dirección y navegador: comprueba ventas, abono y saldo.
5. Agrega alumno/producto ficticios y recarga: comprueba ambos catálogos.
6. Cuenta → Ver documento: vista individual imprimible. No hay PDF directo/compartir archivo implementados.

No introducir datos reales. No hay acceso privado, cifrado, instalación PWA, copia en IONOS, recuperación de respaldo ni sincronización. El HTML local no necesita red, pero volver a abrir una URL hospedada sin internet requiere el futuro service worker. Reiniciar ejemplo o borrar datos del navegador elimina los registros de prueba. Moneda, fechas y grupos siguen siendo de demostración.

## Construcción y pruebas
`python build.py` genera pantallas.html con engine.js, storage.js y app.js incorporados.
`node --test test.cjs test-ui.cjs test-storage.cjs`: **14 pruebas aprobadas**.
Incluyen pagos/crédito, reintentos sin duplicación, recuperación mediante otra conexión, aborto sin cambios, escrituras concurrentes, esquema incompatible, ausencia de IndexedDB y conservación del carrito tras error.

IndexedDB se verifica con un **simulador de contrato**, y la interfaz con DOM mínimo en Node. No se ejecutó un navegador ni se probó almacenamiento físico. No confundir estos resultados con validación en Android/iPhone. idb-test-double.cjs se usa solo en pruebas, no se incluye en pantallas.html.

## Pendiente antes del piloto
- Prueba en el teléfono real: cierre/reapertura, recarga, modo avión, permisos/espacio y borrado controlado de datos ficticios.
- Acceso privado, almacenamiento protegido, PWA, respaldo autenticado en IONOS y recuperación comprobada.
- Fechas/cortes reales, configuración, distribución de pagos a cargos antiguos, correcciones, PDF directo y demás escenarios de la especificación.

La [especificación v1.0](../ESPECIFICACION-DESARROLLO-v1.0.md) sigue rigiendo. Este es un incremento de desarrollo, no su implementación completa. [Arquitectura](../ARQUITECTURA-Y-PANTALLAS.md).

Referencias: [transacción completa IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/complete_event) y [protección de almacenamiento](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist).

## Incidencia detectada en iPhone — 2026-10-04
Las capturas del responsable muestran la versión 0.1 en un visor de adjuntos: HTML/CSS visible, pero sin menú dinámico. La PC sí presenta la interfaz. Es compatible con scripts no ejecutados por el visor; no se verificó su configuración interna. No atribuirlo a IndexedDB: las capturas son de la versión anterior sin esa capa.

0.2.1 incorpora contenido HTML inicial que indica cómo abrir la demo, en lugar de dejar el panel vacío si no se ejecutan scripts. El botón Reiniciar permanece desactivado hasta inicializar. Este cambio no activa JavaScript en un visor que lo restrinja ni acredita compatibilidad móvil.

### Próxima prueba mediante IONOS
1. Elegir dominio/subdominio HTTPS de prueba y verificar su directorio web. No sobrescribir el index de un sitio existente.
2. Crear una carpeta nueva, por ejemplo `demo-cafeteria`, dentro del directorio web de esa dirección.
3. Subir solo la versión actual de `pantallas.html` a esa carpeta, mediante administración de archivos o SFTP. No pegarla dentro de una página de WordPress/Divi.
4. Abrir en Safari la URL HTTPS del archivo, no su adjunto ni la vista de código en GitHub. El enlace concreto depende del dominio elegido y aún no se ha publicado.
5. Comprobar distintivo DEMO 0.2.1, menú, venta/pago y recuperación tras cierre/reapertura. Solo datos ficticios. El guardado en PC y teléfono son copias independientes.

La prueba mediante URL necesita conexión para cargar la página: no hay service worker todavía. No se hicieron cambios en IONOS.
