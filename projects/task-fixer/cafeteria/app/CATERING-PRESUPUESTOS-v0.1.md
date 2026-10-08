# Presupuestos para eventos · Task Fixer

7 de octubre de 2026 · Propuesta de desarrollo v0.1.

## Decisión y estado

El responsable prioriza este módulo y pausa #21 (voz). Edgar también prepara comida y productos para eventos; actualmente lo lleva a mano. Capacitación y observación del piloto #14/#15 esperan al fin de semana. Esta especificación no cambia la instalación activa ni demuestra demanda de otros negocios. La posibilidad de ofrecer la app a otros changarros se conserva como hipótesis para validar.

## Primera entrega: cotizar y compartir

Apartado **Eventos**, con lista de presupuestos y botón **Nuevo presupuesto**. Lista breve por fecha, cliente, importe y estado; búsqueda por cliente o folio. Formulario por secciones y vista previa para evitar una pantalla interminable en teléfono.

1. Cliente: nombre obligatorio; teléfono y correo opcionales. No crear un alumno para guardar al cliente de un evento.
2. Evento: descripción, fecha y hora local, lugar, número de personas y notas. Se puede guardar borrador incompleto; para emitir se requieren cliente, descripción, fecha, lugar (o indicar por confirmar) y al menos un concepto.
3. Conceptos: elegir del menú o escribir un servicio/producto especial. Cada renglón lleva descripción, cantidad, unidad y precio unitario. Ejemplos: 50 comidas, 30 refrescos, un servicio de entrega. No limitar cantidades de catering a las reglas de venta por pieza; cantidades decimales se guardarán en milésimas y el dinero en centavos.
4. Condiciones: descuento fijo opcional, vigencia del presupuesto y condiciones de entrega/pago. Se puede indicar anticipo solicitado, sin afirmar que fue recibido. Transporte, montaje y personal pueden ser conceptos independientes, sin crear un producto en el menú.
5. Revisar: subtotal, descuento y total; emitir documento con folio y revisión. PDF para guardar/imprimir y compartir manualmente, como los documentos actuales.

**Paquete por persona** es inicialmente un concepto editable, no un motor de recetas. La cantidad de personas es informativa y no multiplica todos los renglones automáticamente: cada cantidad queda visible. Se muestra el total por persona como referencia cuando el número de personas es mayor que cero; no modifica la cotización.

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

Un cobro en efectivo se vincula a caja abierta y solo afecta el efectivo una vez. Transferencia se muestra separada del efectivo. Emitir/aceptar presupuesto no suma ventas; el criterio para reconocer una venta del evento se define antes de integrar reportes. No duplicar ingresos al registrar anticipo y posteriormente la venta total. No reutilizar eventos payment/sale ligados a alumnos para clientes de catering.

## Integración técnica prevista

La revisión del código confirma que el motor actual de cuentas está vinculado a alumnos y que el validador admite esquemas 1–3. Por eso el módulo tendrá colecciones separadas para clientes de eventos, presupuestos y versiones emitidas; los cobros tendrán una integración específica posterior.

- Modelo propuesto: cliente con ID; presupuesto con ID estable, revisión, estado, cliente, datos del evento, moneda, conceptos con snapshots, descuento, condiciones y timestamps; documentos emitidos inmutables con folio y revisión. Datos personales solo en el guardado protegido, nunca en el repositorio público.
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

## Lo que aprenderemos con Edgar

Solicitar un presupuesto anterior sin datos sensibles para conocer conceptos habituales: por persona o paquete, entrega/montaje, impuestos, anticipo y condiciones de cancelación. Son decisiones para afinar la versión, no pruebas ya realizadas. Antes de ampliar a otros negocios, medir tiempo para cotizar y errores frente a su método manual.

## Orden de trabajo

Especificación → motor de presupuestos y pruebas → pantallas con datos ficticios → migración/guardado/documentos → prueba con un evento de Edgar → anticipos y liquidación. Inventario/recetas y voz continúan como módulos posteriores. Esta primera entrega no reserva stock ni genera compras automáticamente.
