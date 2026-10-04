# Cafetería — revisión final antes del piloto
Task Fixer · 2026-10-04 · Base revisada: beta 0.4.3.

## Decisión y evidencia
El responsable confirma que la distribución, uso en teléfono y persistencia tras recarga funcionan. Quiere sencillez, menos desplazamiento y selección segura de alumnos. Se revisaron fuentes de interfaz, motor y almacenamiento, y la especificación v1.0. Esta es revisión estática y de recorridos con evidencia aportada por el responsable; no es una nueva prueba de navegador ni aprobación completa A01–A20. No se modificó la app en esta entrega: el responsable pidió revisar antes de ejecutar cambios.

## Cambios de interfaz acordados
| Área | Comportamiento a construir | Criterio de aceptación |
|---|---|---|
| Menú | Categorías como pestañas; solo muestra productos de la categoría elegida. En móvil las pestañas pueden desplazarse horizontalmente, con indicador visible de categoría activa. Si hay muchas, ofrecer selector compacto equivalente. | Llegar a Sin categoría sin recorrer productos de las otras categorías; una categoría nueva aparece inmediatamente. |
| Altas de menú | Dos botones: Agregar producto y Agregar categoría. Abren un formulario compacto; solo uno abierto a la vez, con Cancelar. Producto inicia en categoría actual y permite cambiarla. | Los formularios no ocupan espacio mientras no se usan; cancelar no crea registros. Avisar antes de perder un formulario con cambios. |
| Venta | Conservar selector de categoría y cajas visuales de productos. | No alterar el recorrido aprobado de carrito y cantidades. |
| Elegir alumno | Nivel → grado → grupo → alumno. Solo opciones existentes, alumnos activos ordenados alfabéticamente por nombre completo en español. Búsqueda opcional por nombres/apellidos dentro del grupo. | Primaria 1° A no se mezcla con Secundaria 1° A. Mostrar cuántos alumnos hay; distinguir homónimos con identificador corto. |
| Confirmación | Venta a cuenta exige elegir explícitamente al alumno; ningún primer alumno se da por elegido. Si cambia nivel/grado/grupo, limpiar selección dependiente. Mostrar nombre completo, nivel/grupo y saldo antes/después. | No se puede confirmar crédito sin alumno elegido. Un grupo vacío bloquea el cargo. Sin definir sigue accesible para registros anteriores. |
| Contado asociado | Sin alumno sigue permitido. Si se desea asociar, usar el mismo filtro progresivo; mantener selección al cambiar elementos de la pantalla. | Una venta anónima no obliga a seleccionar salón; una pagada asociada no modifica deuda anterior. |

La búsqueda por nombre puede ignorar mayúsculas/acentos sin cambiar el nombre almacenado. No añadir IA para filtrar listas. Recordar filtros dentro de la sesión puede ahorrar toques; no recordar como seleccionado al alumno anterior para la siguiente venta.

## Hallazgos desde el uso y el desarrollo
| Prioridad | Situación observada en fuentes | Resolución prevista |
|---|---|---|
| Antes del piloto | Confirmación de crédito hereda alumno previo o primero de la lista. | Selección explícita y dependencias de filtros como arriba. |
| Antes del piloto | Método de pago se muestra en revisión, pero finishPayment no lo guarda. Corregir importe vuelve a un formulario vacío. | Guardar método/nota y conservar borrador al volver o fallar; mantener ID para reintento, nuevo ID para nuevo pago. |
| Antes del piloto | No hay reversos de ventas/pagos ni devolución registrada. El saldo neto no incluye asignaciones antiguas primero. | Motor FIFO estable, corrección vinculada con motivo, límites y rastro; nunca editar silenciosamente movimientos confirmados. |
| Antes del piloto | opening existe, pero no hay alta documentada del saldo de la libreta. | Registrar deuda o anticipo inicial una sola vez, sin contarlo como venta/cobro nuevo. |
| Antes del piloto | Ventas no congelan nivel/grupo/ciclo; documentos se recalculan con alumno actual. | Snapshot para operaciones nuevas. No inventar grupo histórico de datos antiguos. Cobranza por grupo actual, historia por grupo de operación claramente diferenciados. |
| Antes del piloto | PDF actual incluye todo el historial, sin periodo, folio ni emisión persistente. | Periodo/corte, saldo anterior, detalle semanal, pagos y saldo completo; guardar emisión inmutable. Conservar imprimir/guardar PDF aprobado. |
| Antes del piloto | Persistencia local funciona, pero no hay apertura offline preparada, acceso privado ni copia remota. | Protección, exportación/restauración validada, respaldo privado versionado, PWA y prueba en modo avión tras cierre. Separar Guardado local de Respaldado. |
| Antes del piloto | Validación local es parcial: no comprueba integralmente partidas, fechas y referencias de ventas de contado; acumulados no comprueban todos los límites monetarios. | Validación completa para importación/API/migraciones, enteros seguros en acumulados, rechazo sin sobrescribir una copia válida. |
| Antes del piloto | Cada guardado clona todo el estado y cada reporte recorre movimientos repetidamente. Pestañas abiertas conservan una vista vieja aunque escritura serializa. | Un teléfono escritor, detectar/restringir pestaña vieja; medir carga real de catálogo/historial y optimizar si las pruebas lo exigen. Sin segundo teléfono escritor. |
| Mejora pequeña | No existe renombrar categoría; listas extensas de movimientos crecen sin límite visual. | Renombrar conservando ID. Mostrar movimientos recientes con Ver más; no ocultar importe pendiente ni totales. |
| Después | Grados 1–6 y grupos A–F fijos; más escuelas pueden tener formatos diferentes. | Configuración escolar ampliable tras validar escuelas objetivo. No restringir grados por nivel sin conocer su operación. |

Nombre de tutor/contacto sigue opcional para facilitar la entrega manual; hermanos mantienen cuentas separadas. No incorporar inventario, dietas, portal para padres ni envíos automáticos en este piloto.

## Inteligencia artificial: propuesta de producto
La promesa comercial propuesta es «Registra lo que consumen, lleva las cuentas y prepara el cobro sin reconstruir la semana a mano». La IA es un complemento opcional; su valor comercial todavía es hipótesis, no demanda ni ventas comprobadas.

### Primera incorporación recomendada: consultas y explicación de resultados
Una acción discreta «Preguntar sobre mis cuentas» permite: «¿Cuánto me deben de primaria?», «Muéstrame pendientes de 2° B» o «Resume cómo estuvo esta semana». La IA interpreta petición y periodo; funciones de la app calculan resultados exactos y abren reporte correspondiente. Respuesta con fechas, alcance y acceso al detalle. Si pregunta es ambigua, pedir aclaración. Para consultas simples ya presentes en pantalla, el botón/filtro directo debe seguir siendo más rápido.

Un resumen semanal puede señalar qué productos se vendieron más y qué saldo está pendiente. No llamar ganancia a ventas, ni inferir utilidad sin costos, inventario o merma. Sugerencias de producción requieren historial suficiente y conocer días sin clases; presentar estimación, nunca garantía.

### Segunda incorporación, solo si prueba valor: captura por voz
Ejemplo: «Dos burritos y un jugo para Juan Pérez de primero A de primaria». Transcripción e interpretación producen borrador. La app identifica productos y alumno por IDs, usa precios del catálogo, muestra propuesta y exige confirmación. Si hay dos Juan, producto ambiguo o audio malo, no guardar y ofrecer selector/manual. No guardar audios por defecto. La captura manual completa sigue operativa cuando falta red o falla IA. Medir ruido, nombres, tiempo total con correcciones y tasa de alumno/producto incorrecto antes de ofrecerla.

### Opciones posteriores
Importar menú/lista desde foto o tabla puede acelerar instalación con vista previa y revisión de cada fila. Un borrador de mensaje de cobro se puede producir primero con plantilla, sin IA ni envío automático; no presentarlo como inteligencia innecesariamente. No automatizar cargos, pagos, castigos de crédito ni decisiones basadas en supuestas características de niños.

### Contrato técnico de IA
Llamadas desde servidor autenticado; clave nunca en HTML. Esquemas estructurados y validación de IDs/importes/acciones; salida bien formada no garantiza selección correcta. Cálculos y permisos pertenecen al programa. Primer módulo solo lectura. Acciones de voz solo borrador con confirmación. Contexto mínimo, preferentemente IDs y agregados calculados; no enviar padrón completo ni información del tutor si no se necesita. IA externa requiere conectividad y gasto por uso; fijar límites y medir costo por cafetería antes de determinar precio. No se cotizó modelo ni se prometió soporte IA offline.

## Replicar en otras cafeterías
Piloto inicial: una cafetería, un usuario, un teléfono escritor. Para vender a otras, separar por negocio datos, configuración, acceso y respaldos; comprobar que una cuenta nunca consulta ni restaura otra. Eliminar ejemplos precargados de instalaciones reales. Migración desde libreta revisada y acompañamiento de inicio forman parte del servicio. No convertir la misma base compartida sin aislamiento en un producto multiempresa.

Medir antes/después: tiempo de despacho, preparación semanal de cuentas, errores corregidos, cuentas contrastadas, restauraciones logradas y disposición real a pagar de propietarios. Propuesta de entrevistas y pilotos externos tras estabilizar el del tío; ninguna muestra ni plazo se declara validado ahora.

## Secuencia y salida hacia piloto
1. Menú compacto y selección segura de alumnos, conservación de borradores.
2. Motor de pagos, saldo de apertura, correcciones, datos históricos e inicio/corte de caja.
3. Documentos por periodo/corte y revisión contra el mismo cálculo de pantalla.
4. Acceso, respaldo/exportación/restauración y apertura offline preparada.
5. Pruebas físicas: cargar volumen real, cerrar/reabrir en modo avión, errores de guardado, recuperar copia en reemplazo y contrastar escenarios A01–A20 aplicables.
6. Piloto controlado y medir valor; IA de consultas opcional después del núcleo. Captura por voz solo si mejora la operación.

No se requiere otro contrato de hosting por esta revisión. Preparar base dedicada y API privada en IONOS dentro del bloque 4, verificando capacidades del panel antes del despliegue. No pedir credenciales por chat. La aprobación de interfaz no sustituye la comprobación contable y de recuperación.

## Fuentes para viabilidad técnica de IA
Consultadas 2026-10-04. Fuentes técnicas no acreditan demanda comercial.
- OpenAI, conexión de modelos con funciones de la aplicación: https://developers.openai.com/api/docs/guides/function-calling
- OpenAI, resultados estructurados: https://developers.openai.com/api/docs/guides/structured-outputs
- OpenAI, transcripción de audio: https://developers.openai.com/api/docs/guides/speech-to-text
- UNICEF, protección de datos infantiles en sistemas de IA: https://www.unicef.org/innocenti/reports/policy-guidance-ai-children

## Ampliación acordada: inicio y corte de caja
Solicitud del responsable, 2026-10-04. Caja sencilla para un usuario y un teléfono; se incorpora al bloque de motor operativo. No es contabilidad fiscal ni cálculo de utilidad.

### Recorrido
- En Venta, mostrar estado de caja y botón Abrir caja cuando no exista sesión abierta. Importe de fondo inicial (cero permitido), fecha/hora y confirmación. Una sola sesión activa; abrir de nuevo no duplica el fondo.
- Mantener venta normal, con método de cobro Efectivo o Transferencia confirmada. A la cuenta del alumno registra crédito, sin entrada de efectivo.
- Registrar entradas adicionales de fondo y retiros/devoluciones de efectivo con importe positivo, motivo y confirmación. No crear una venta por agregar cambio. No categorizar estos movimientos como gastos contables en esta etapa.
- Acción Corte de caja: mostrar esperado, pedir efectivo contado, calcular diferencia y confirmar cierre. Sin captura de denominaciones ni arqueo complejo en primera versión.
- Corte conservado con ID, periodo de sesión, movimientos incluidos, contado y diferencia. No recalcular silenciosamente cierres anteriores; correcciones posteriores vinculadas con rastro.
- Para registrar ventas/cobros o entradas/salidas de efectivo, requerir caja abierta. Permitir consultas/documentos sin abrir. Avisar al día siguiente si quedó abierta; nunca cerrar por reloj ni generar fondo automático. El operador cierra o continúa expresamente.

### Separar ventas, cobros y efectivo
Efectivo esperado = fondo inicial + ventas cobradas en efectivo + pagos/anticipos recibidos en efectivo + entradas adicionales de fondo − retiros − devoluciones realmente entregadas en efectivo.

La venta a crédito se informa por separado; no aumenta efectivo esperado. Puede consumir anticipo o generar deuda nueva: mostrar ambas situaciones sin duplicar un cobro previo. El pago posterior sí entra en la sesión donde se recibe, cuando su método es efectivo. Transferencias son cobros del periodo, pero no billetes en caja. Corrección de dato y devolución real no son equivalentes.

Dinero entregado para dar cambio es una ayuda de cálculo: una compra de 40 pagada con 100 y cambio 60 aporta 40 a caja. Consumo de anticipo recibido en otra sesión no aporta dinero nuevo. Fondo inicial, retiros y dinero contado no cambian saldo del alumno. Las ventas del turno, los cobros y la deuda total acumulada son indicadores distintos.

Ejemplo: fondo 200, ventas cobradas en efectivo 500, ventas nuevas a cuenta 150, cobro de deuda antigua en efectivo 100 y retiro 50. Esperado: 750. Si cuenta 740, diferencia: −10 (faltante). Ventas: 650; cobro recibido: 600. No llamar ganancia a esos 650 o 750.

### Datos, migración y aceptación
Guardar sesión de caja, método y vínculo por operación; sesiones y movimientos nuevos forman parte de la misma transacción local que la venta/pago. Idempotencia para apertura y cierre; bloqueo de doble cierre y operaciones en sesión cerrada. Todo funciona localmente y se incluye en respaldo.
Movimientos anteriores sin sesión o método permanecen como históricos no asignados; no suponer que todo fue efectivo ni incorporarlos a la nueva apertura. Permitir solo corrección explícita revisada, sin inventar cierres antiguos.
Pruebas: fondo no cuenta como venta; crédito y transferencia no inflan efectivo; cobrar deuda/recibir anticipo sí suma efectivo; consumir anticipo no duplica entrada; cambio correcto; retiros/devoluciones; cierre con faltante/sobrante; doble toque/reintento; recuperación tras cierre/reapertura del navegador; ninguna pérdida del corte anterior.

## Ampliación acordada: existencia inicial de productos
Solicitud del responsable, 2026-10-04. Se incorpora al diseño de alta de producto y al modelo antes de los demás bloques; reemplaza la exclusión total de datos de inventario solo en este alcance mínimo. Inventario completo y compras automáticas siguen para otra etapa.

### Formulario y significado
- Campo opcional **Existencia inicial (piezas)** al agregar producto; entero mayor o igual a cero. Cero significa que se contaron cero piezas; vacío significa existencia no registrada. No admitir negativos, fracciones ni valores fuera del rango entero seguro.
- Guardar conteo, unidad piezas y fecha/hora del registro. Mostrar **Conteo inicial: X piezas · fecha**; no llamarlo Existencia actual mientras no esté implementado el registro de movimientos.
- Los productos anteriores quedan sin existencia registrada, no en cero. El conteo no cambia ventas, saldos, caja ni precio. El guardado debe incluirlo en la misma transacción del alta y en exportaciones/respaldos.
- Editar precio, descripción o categoría conserva el conteo. Corregir conteo requiere una acción identificada con motivo y fecha, conservando el valor anterior; evitar que un formulario genérico sobrescriba existencias accidentalmente.
- No bloquear venta ni retirar producto automáticamente por cero o por ausencia de conteo en este alcance mínimo. Informar el dato sin afirmar que se está controlando stock.
- Aplica a unidades vendidas (burritos preparados, refrescos, galletas), no ingredientes, recetas, kilos ni inventario de cocina.

### Base para la siguiente etapa
Preparar un registro independiente de conteos y movimientos por producto con ID, cantidad, tipo, fecha, motivo y vínculo a venta cuando aplique. Existencia inicial + reposiciones − unidades despachadas − mermas + devoluciones físicamente recuperadas produce la existencia calculada. Venta a crédito y pagada consumen piezas por igual; pagos de deuda no consumen inventario. Un reverso financiero no garantiza que el producto regresó, por lo que devolución de dinero y devolución física deben diferenciarse.
Una futura reposición requiere compras/recepciones o ajustes explícitos; el dato inicial por sí solo no permite automatizar compras. Antes de esa automatización se necesitarán mínimos deseados, proveedores, presentaciones y confirmación humana. No generar órdenes ni gasto automáticamente en esta primera versión.

### Criterios de aceptación
Alta con cero y con número positivo; campo vacío como desconocido; rechazo de negativos/fracciones; conservación tras recarga, edición de precio y respaldo; productos anteriores sin valor inventado; fecha de conteo visible; ninguna modificación de caja o deuda; corrección trazable sin reiniciar conteo al editar catálogo. En piloto explicar si el dato representa conteo inicial o stock calculado: nunca presentarlos como equivalentes.
