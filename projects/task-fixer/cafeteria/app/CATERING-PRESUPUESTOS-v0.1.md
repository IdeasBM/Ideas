# Presupuestos para eventos · Task Fixer

7 de octubre de 2026 · Propuesta de desarrollo v0.2. Se conserva la ruta original para los enlaces existentes.

## Decisión y estado

El responsable prioriza este módulo y pausa #21 (voz). Edgar también prepara comida y productos para eventos; actualmente lo lleva a mano. Capacitación y observación del piloto #14/#15 esperan al fin de semana. Esta especificación no cambia la instalación activa ni demuestra demanda de otros negocios. La posibilidad de ofrecer la app a otros changarros se conserva como hipótesis para validar.

## Configurar servicios con módulos reutilizables

El responsable amplía el alcance: configurar una vez la forma de prestar y cobrar un servicio, después elegirlo e ingresar los datos del evento para calcular automáticamente. Esta decisión reemplaza la propuesta anterior de cantidades únicamente manuales. No se pretende construir un editor de programación: el usuario agrega módulos y selecciona reglas en formularios sencillos.

El apartado Eventos tendrá **Mis servicios**, **Presupuestos** y, en la integración financiera posterior, **Cobros y caja de eventos**. En Mis servicios se puede crear, duplicar, editar o archivar una plantilla: por ejemplo Mesa de dulces, Crepas o Comida para eventos. Cada plantilla tiene nombre, descripción, variante opcional (básico/completo), condiciones y módulos. Archivar no elimina presupuestos históricos.

| Módulo | Qué configura el dueño | Cómo calcula |
|---|---|---|
| Productos o materiales | Artículo, unidad, cantidad y precio de venta; referencia opcional al catálogo | Cantidad fija, por persona o capturada en cada evento. |
| Servicio | Tarifa, duración incluida, mínimo y horas adicionales | Fijo por evento o por hora; se elige una regla explícita. |
| Mano de obra | Rol, número de trabajadores, horas y tarifa de venta | Personas del equipo × horas × tarifa; equipo fijo o calculado por capacidad. |
| Equipo y montaje | Mesas, utensilios, renta, instalación | Fijo o unidades × tarifa. |
| Entrega y traslado | Tarifa y alcance incluido | Fijo o importe capturado; distancias automáticas quedan fuera inicialmente. |

Solo se muestran los módulos que necesita el servicio. Permitir nombres propios, orden y selección opcional; un extra activado muestra su precio antes de confirmar. No crear un módulo nuevo para cada ingrediente: una lista de productos pertenece al mismo módulo.

### Datos que cambian de evento a evento

Número de invitados, variante, horas de servicio y extras seleccionados. La plantilla decide qué campos pedir; número de personas no basta si el servicio cobra por hora o requiere una distancia que todavía no se conoce. Guardar borrador con faltantes es válido; emitir el precio final exige resolver todos los datos requeridos. Valores predeterminados (por ejemplo tres horas) se muestran y se pueden ajustar.

Reglas iniciales configurables, sin fórmulas libres:

- Cantidad fija por evento.
- Cantidad por invitado: 30 gramos de cacahuates por persona → para 150 personas, 4.5 kg. Unidades y conversiones deben estar definidas (gramos a kilogramos), sin confundir dinero, peso y piezas.
- Cantidad por hora o trabajador-hora. Preparación y atención pueden ser conceptos distintos; no cobrar automáticamente ambos por el mismo tiempo.
- Capacidad: un trabajador por cada 50 invitados → redondear hacia arriba; 151 invitados requieren cuatro. Capacidad positiva y visible, no una recomendación universal de personal.
- Compra/renta por múltiplos: si algo se vende por paquetes, calcular unidades necesarias y redondear al paquete completo solo cuando esa regla esté activada. Necesidad de consumo y compra de paquetes se muestran separadas; no duplicar ambos cargos.

Dependencias permitidas entre entradas (invitados, horas, variante) y cantidades calculadas. No permitir que módulos se dependan circularmente ni ejecutar texto como código. Al cambiar invitados, recalcular la propuesta y mostrar cantidades/importes; no modificar documentos emitidos. Primera versión sin reglas arbitrarias entre módulos: estas reglas cubren los ejemplos iniciales.

### Precios de venta y costos internos

La configuración distingue **lo que cuesta al negocio** de **lo que cobra al cliente**. El total del presupuesto se calcula con tarifas de venta explícitas; no sumar costos y venta del mismo concepto. Costos internos opcionales sirven de referencia, no se imprimen y no constituyen una utilidad garantizada. Fórmulas de margen/recargo y costos por recetas se diseñarán después; no son requisitos para cotizar.

Cada tarifa lleva moneda y fecha de actualización. Puede ser propia de la plantilla o vinculada explícitamente al catálogo; actualizar el costo de compra no cambia por sí solo la tarifa de venta. Al crear un presupuesto se copian las tarifas vigentes. Si después cambian, el borrador muestra diferencias y ofrece **Actualizar precios**; no recalcular documentos emitidos/aceptados silenciosamente. Una tarifa sin definir o un dato pendiente impide emitir; un precio antiguo muestra aviso revisable, sin inventar un precio nuevo.

### Presentación al cliente

La plantilla elige entre mostrar paquete y extras ("Mesa de dulces para 150 personas") o desglose de conceptos. El cálculo interno conserva productos, horas y personal en ambos casos. Si se cobra un paquete cerrado, sus componentes internos no se vuelven a sumar como cargos al cliente. PDF sin costos internos, con alcance, invitados, duración, extras, condiciones y exclusiones relevantes.

Ejemplo ficticio: Mesa de dulces, 150 invitados, tres horas. Tarifa base $500; surtido $30 por persona = $4,500; tres trabajadores × tres horas × $100 = $900; traslado $200. Total $6,100, si esa plantilla cobra esos conceptos por separado. Los 4.5 kg de cacahuates son parte del surtido, no otro cargo automático. Importes de ejemplo, no precios de mercado.

## Primera entrega: cotizar y compartir

Apartado **Eventos**, con lista de presupuestos y botón **Nuevo presupuesto**. Lista breve por fecha, cliente, importe y estado; búsqueda por cliente o folio. Formulario por secciones y vista previa para evitar una pantalla interminable en teléfono.

1. Cliente: nombre obligatorio; teléfono y correo opcionales. No crear un alumno para guardar al cliente de un evento.
2. Evento: descripción, fecha y hora local, lugar, número de personas y notas. Se puede guardar borrador incompleto; para emitir se requieren cliente, descripción, fecha, lugar (o indicar por confirmar) y al menos un concepto.
3. Servicio: elegir plantilla/variante y completar sus campos; obtener conceptos calculados. También permitir presupuesto libre y extras manuales. Cada renglón lleva descripción, cantidad, unidad y precio unitario. No limitar cantidades de catering a las reglas de venta por pieza; cantidades decimales se guardarán en milésimas y el dinero en centavos. Ajustes manuales se identifican para evitar que un recálculo los borre silenciosamente.
4. Condiciones: descuento fijo opcional, vigencia del presupuesto y condiciones de entrega/pago. Se puede indicar anticipo solicitado, sin afirmar que fue recibido. Transporte, montaje y personal pueden ser conceptos independientes, sin crear un producto en el menú.
5. Revisar: subtotal, descuento y total; emitir documento con folio y revisión. PDF para guardar/imprimir y compartir manualmente, como los documentos actuales.

La cantidad de personas modifica únicamente los conceptos cuya regla depende de invitados. Se muestra el total por persona como referencia cuando el número de personas es mayor que cero. Configurar insumos para cotizar no descuenta stock ni equivale todavía al inventario por recetas.

## Qué significa cada estado

| Estado | Acción | Efecto en operación |
|---|---|---|
| Borrador | Guardar mientras se prepara | Ningún movimiento de caja, ventas o stock. |
| Emitido | Generar versión del presupuesto | Documento comercial, no venta cobrada. |
| Aceptado | Registrar confirmación del cliente | Compromiso pendiente, no cobro automático. |
| Cancelado | Cancelar con motivo | Conserva historial y documentos anteriores. |

Vencido se calcula según vigencia; no elimina ni cancela automáticamente. Si se acepta una propuesta vencida, se pide revisar y emitir nueva versión. Estados pagado/entregado no se agregan hasta contar con registro real de cobros y cumplimiento.

## Cálculos y documentos

- Cantidad positiva, precio no negativo y al menos un renglón de importe positivo para emitir. Validar límites de enteros seguros en operaciones y acumulados.
- Importe de renglón = cantidad × precio unitario, redondeado al centavo con regla consistente (mitades hacia arriba para importes positivos). Sumar renglones ya redondeados. Descuento fijo entre cero y subtotal; total emitido mayor que cero.
- Moneda del negocio, MXN o USD, sin mezclar ni convertir monedas dentro de un presupuesto. Las revisiones conservan la moneda original; cambios globales no reinterpretan importes históricos.
- Primera versión sin cálculo fiscal de impuestos: etiqueta clara de importes y condiciones, documento **Presupuesto, no comprobante fiscal**. Antes de usarlo donde se requiera desglose de impuestos, resolver esa necesidad; no agregar una tasa supuesta.
- Precio, nombre, unidad, datos del cliente/negocio y condiciones se copian al documento emitido. Editar menú o cliente después no altera PDFs históricos.
- Folios con prefijo propio (por ejemplo E-000001), revisión y fecha de emisión. Emisión repetida de la misma solicitud no crea folios duplicados. Cambiar una propuesta emitida genera nueva revisión; la aceptada necesita revisión y nueva aceptación explícitas.
- No incluir costos internos ni margen en el PDF del cliente. Tampoco prometer rentabilidad mientras no exista registro de costos.

## Segunda entrega: anticipos y liquidación

Se diseña después del presupuesto, antes de habilitar cobros de eventos. Registro de anticipo/abono con importe, fecha, método y evento; saldo pendiente = total acordado menos pagos netos. Si se pretende recibir más que el saldo, rechazar y pedir revisión; no crear saldo a favor en esta primera integración. Cancelar un evento con dinero recibido exige distinguir pendiente de devolución de devolución realmente entregada.

### Dinero de eventos separado

Todos los cobros, gastos y devoluciones de catering se identifican con área Eventos y evento específico; los movimientos de cafetería conservan su área. Habrá resumen por evento y total del área, con cobrado, pendiente, gastos registrados y efectivo. No sumar presupuestos pendientes como dinero recibido ni igualar efectivo con ganancia.

Propuesta inicial: subdivisión contable de una caja física con filtro Cafetería/Eventos y movimiento de dinero registrado una sola vez. Si Edgar realmente guarda el efectivo de eventos en otra caja, habilitar una caja física independiente con su propio fondo, apertura/cierre y conciliación. Esa elección se establece antes de integrar cobros: dos vistas no significan que existan dos fondos reales. Pasar efectivo entre cajas será salida/entrada vinculadas, no ingreso nuevo.

El pago se registra cuando se recibe, aunque el evento todavía no termine; al terminar se marca entrega y se liquida lo pendiente. Un cobro en efectivo se vincula a caja abierta y solo afecta el efectivo una vez. Transferencia se muestra separada del efectivo. Emitir/aceptar presupuesto no suma ventas; el criterio para reconocer una venta del evento se define antes de integrar reportes. No duplicar ingresos al registrar anticipo y posteriormente la venta total. No reutilizar eventos payment/sale ligados a alumnos para clientes de catering.

## Integración técnica prevista

La revisión del código confirma que el motor actual de cuentas está vinculado a alumnos y que el validador admite esquemas 1–3. Por eso el módulo tendrá colecciones separadas para clientes de eventos, presupuestos y versiones emitidas; los cobros tendrán una integración específica posterior.

- Modelo propuesto: plantillas versionadas con módulos, reglas tipadas, unidades, tarifas y variantes; cliente con ID; presupuesto con ID estable, revisión, estado, cliente, versión/snapshot de plantilla, entradas del evento, cantidades calculadas, ajustes manuales, moneda, conceptos con snapshots, descuento, condiciones y timestamps; documentos emitidos inmutables con folio y revisión. Datos personales solo en el guardado protegido, nunca en el repositorio público.
- Motor puro de cálculos y estados con pruebas aisladas primero. La UI confirma con el mecanismo de guardado y permiso de captura actuales; solo muestra guardado exitoso después de confirmar escritura local.
- Migración a nuevo esquema, validación de campos, respaldo cifrado y restauración conjunta. Mantener íntegros alumnos, catálogo, ventas, caja y documentos existentes. La versión antigua debe rechazar datos nuevos incompatibles, no sobrescribirlos. Conservar respaldo previo para reversión compatible.
- Guardar y consultar presupuestos sin conexión con la infraestructura existente. El respaldo automático depende de reconectar y de que la app pueda ejecutarse; no prometer ejecución con navegador cerrado. Generación de PDF offline debe probarse antes de anunciarla.
- Un único equipo de captura sigue vigente; presupuestos no abren una excepción de edición concurrente.
- Productos archivados o precios modificados no borran cotizaciones emitidas. Los borradores avisan cuando el catálogo cambió y ofrecen revisión; no cambian precios silenciosamente.

## Pruebas de aceptación

1. 50 comidas × $85 + 30 bebidas × $18 + entrega $200 = $4,990; descuento $190 → $4,800. Emitir/aceptar no altera saldo de alumno, caja, ventas ni existencias.
2. 1.5 kg × $125.50 = $188.25; verificar redondeo de medias de centavo, descuentos inválidos y acumulados fuera de rango.
3. Menú/clientes editados después de emitir: documento anterior idéntico; nueva revisión conserva trazabilidad.
4. Guardar, recargar offline, reconectar y recuperar en otro equipo sin pérdida ni duplicados. Denegación de captura o fallo de guardado no muestra éxito.
5. Emisión con doble clic: un folio; edición concurrente detectada. Borrador incompleto no emite PDF final.
6. PDF legible en teléfono e impresión, incluyendo varios renglones/páginas; compartir manualmente sin enviar a nadie automáticamente.
7. Migración/restauración conserva registros previos; cancelación preserva historia.
8. Plantilla Mesa de dulces: 150 invitados → 4.5 kg de cacahuates y tres trabajadores; 151 → 4.53 kg y cuatro trabajadores. Solo se redondean paquetes/personal cuando corresponde. Cambio de cantidad no duplica cargos ni pierde ajustes manuales sin aviso.
9. Ejemplo modular de $6,100 correcto; paquete cerrado no suma componentes dos veces. Costos internos nunca llegan al PDF. Falta de duración/tarifa/unidad necesaria bloquea emisión, no produce total engañoso.
10. Plantilla editada/archivada no altera documentos emitidos. Catálogo actualizado permite revisar diferencias en borradores y conserva historial.
11. Integración financiera posterior: anticipo y liquidación de eventos separados de cafetería, pero contados una sola vez en la caja física correspondiente; transferencia entre cajas no aumenta ingresos.

## Lo que aprenderemos con Edgar

Solicitar un presupuesto anterior sin datos sensibles para conocer conceptos habituales: por persona o paquete, entrega/montaje, impuestos, anticipo y condiciones de cancelación. Son decisiones para afinar la versión, no pruebas ya realizadas. Antes de ampliar a otros negocios, medir tiempo para cotizar y errores frente a su método manual.

## Orden de trabajo

Especificación → configuración de plantillas y motor de reglas/cálculos con pruebas → pantallas Mis servicios/Nuevo presupuesto con datos ficticios → migración/guardado/documentos → prueba con un evento de Edgar → anticipos, liquidación y separación de caja. Inventario/recetas y voz continúan como módulos posteriores. Esta primera entrega no reserva stock ni genera compras automáticamente.
