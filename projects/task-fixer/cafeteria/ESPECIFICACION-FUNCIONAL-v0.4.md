# Cafeterías escolares: revisión y especificación funcional v0.4
Task Fixer · 2026-10-04 · BORRADOR PARA REVISIÓN.
Fuente: documento de una página “MICROAPP CAFETERÍAS ESCUELAS” aportado por el responsable, leído completo y revisado visualmente, junto con sus aclaraciones previas de PDF y envío manual. Incorpora decisiones del responsable del 2026-10-04: operación sin internet, sincronización posterior, un usuario y un teléfono de captura en el piloto, inventario en segunda etapa y pagos completos/parciales/anticipados. Sigue en revisión; reglas recomendadas y decisiones confirmadas se distinguen abajo.

## 1. Objetivo y resultado
Ayudar al encargado de una cafetería escolar a registrar ventas desde un teléfono, distinguir lo cobrado de lo pendiente y preparar cuentas individuales en PDF sin reconstruir consumos de la semana a mano.
Persona operadora: encargado; alumno: consumidor; padre/tutor: responsable de pago. “Usuario” designa quien entra a la app, no al alumno.
La meta de aceptación incluye rapidez durante el despacho y exactitud de cuentas. No se ha medido la operación ni validado venta comercial.

## 2. Revisión del documento recibido
| Tema del original | Evaluación | Mejora propuesta |
|---|---|---|
| Celular como plataforma | Dirección explícita y coherente | Diseñar primero captura con una mano, búsqueda rápida y pocas pantallas |
| Información del negocio/usuario | Necesaria | Separar configuración del negocio de acceso y permisos |
| Grados, grupos y alumnos | Base adecuada | IDs únicos, ciclo escolar y desactivación; no identificar por nombre únicamente |
| Menú y existencias | Mezcla catálogo e inventario | Producto/precio/disponibilidad en base; stock terminado opcional; recetas e ingredientes como módulo |
| Venta pagada o crédito | Nuevo alcance explícito | Ambas crean una venta; registrar su cobro separado para no duplicar ingresos |
| Reporte de ventas pagadas | Ambiguo en pagos tardíos | Separar ventas por fecha de venta, cobros por fecha de pago y deuda a fecha de corte |
| Cuentas por alumno y grupo | Encaja con el recorrido acordado | Abonos, saldo previo y PDF individual; fecha de corte independiente del periodo mostrado |
| Compartir cuentas | Definido en conversación previa | PDF → compartir/descargar → envío manual; no integrar WhatsApp en base |

## 3. Alcance para la primera versión: propuesta
Incluir: negocio y acceso, grados/grupos/alumnos, responsable de pago, menú editable, ventas pagadas o crédito, registro de pagos completos, abonos y anticipos con saldo a favor, captura sin conexión y respaldo/actualización central de un único teléfono, anulaciones controladas, reportes claros, PDF por alumno, compartir manualmente y respaldo.
Un negocio por piloto; moneda MXN propuesta para el caso inicial, pendiente de confirmar ubicación. Periodos elegidos por el operador, sin envío ni cierre obligatorio automático.
Venta pagada puede ser anónima: no exigir alta de alumno para vender una galleta de contado. Venta a crédito exige seleccionar alumno existente.
Saldo individual por alumno, incluso si dos comparten tutor. Consolidación familiar opcional.
No incluidos inicialmente: recetas e inventario de ingredientes, cobro bancario, facturación fiscal, pedidos anticipados, cuentas para padres, varias sucursales, envíos automáticos y reglas de crédito avanzadas.
La operación sin conexión es requisito confirmado. Primer acceso/configuración y preparación del dispositivo requieren conexión. Después debe registrar ventas/pagos, consultar datos descargados y generar documentos provisionales sin red; al reconectar actualiza la copia central desde ese único dispositivo. No se combinan escrituras de dos teléfonos. Se debe comprobar persistencia, reconexión y consistencia antes de ofrecerlo como capacidad operativa.

## 4. Pantallas
1. **Inicio / Nueva venta**: entrada principal durante despacho; acceso a alumnos recientes y menú.
2. **Alumnos**: grado/grupo, búsqueda, saldo y cuenta individual; registro de tutor.
3. **Menú**: productos, precios, disponibilidad y edición.
4. **Cuentas**: grupo → alumnos → detalle → pago/anticipo o PDF. Filtro de pendientes por defecto, con opciones de cuentas al corriente y saldo a favor.
5. **Reportes**: ventas, cobros y saldos pendientes; existencias solo si módulo activo.
6. **Ajustes**: negocio, acceso, ciclos/grupos, respaldos y exportación.
“Altas o registros” queda como acciones dentro de Alumnos/Menú, evitando un apartado genérico que obligue a salir del trabajo actual. Esta organización es recomendación de diseño, no decisión del responsable.

## 5. Recorridos funcionales
### A. Preparar
Registrar negocio; crear grado/grupo/ciclo; agregar alumno con ID, nombre y tutor/contacto; capturar saldo inicial identificado; dar de alta menú con precio. Revisar saldos iniciales antes de operar.
Cambiar alumno de grupo no mueve sus compras históricas. Guardar grupo/ciclo correspondiente a cada movimiento para reportes históricos; vista de cobranza por grupo actual, con etiqueta clara.

### B. Registrar venta
Agregar productos y cantidades → ver total → elegir pagada o crédito → si crédito, seleccionar alumno → revisar → confirmar.
Buscar alumno por nombre y grupo; mostrar identificación suficiente para distinguir homónimos. No repetir nombre/grado/grupo manualmente en cada venta.
Ambas opciones guardan venta con folio. Pagada: registra pago vinculado por el total y saldo cero. Crédito: registra cargo y saldo pendiente.
Hasta confirmar, el carrito es borrador. Deshabilitar doble confirmación e identificar una misma operación para evitar duplicados por reintento. Mostrar guardado confirmado o pendiente; no mostrar éxito ante una falla.
Primera versión propone unidades enteras para productos; ventas por peso/fracción requieren ampliación acordada.
Pagos mixtos se representan con venta más abono parcial inmediato, sin crear un tercer sistema de cobro. Cuando exista saldo a favor, la venta de cuenta registrada consume ese saldo y solo el excedente queda por pagar. Esta mecánica es recomendación de implementación por validar en el recorrido.

### C. Registrar pago posterior
Elegir alumno → ver saldo → ingresar monto, fecha, método y referencia opcional → revisar → confirmar → comprobante de pago.
Pagos completos, parciales y anticipados incluidos por decisión del responsable. Cada pago tiene identidad y nunca crea una venta.
Regla recomendada: aplicar pagos a cargos más antiguos y saldo inicial del mismo alumno; el excedente permanece a favor. Conservar la distribución calculada. La fecha del movimiento y un desempate estable determinan el orden en el único dispositivo.
Un pago para dos hermanos se distribuye explícitamente entre cuentas; no rebajar el total a ambos.
Aceptar un pago mayor a la deuda y un anticipo sin deuda; mostrar importe pendiente o saldo a favor con etiquetas separadas. El dinero adelantado cuenta como cobro, no como venta. Propuesta: devolución manual registrada cuando se entregue dinero, con motivo y vínculo, sin devolución bancaria automática; decisión de devolver a cargo del operador.

### D. Generar cuenta y compartir
Seleccionar grupo, por ejemplo primero B → establecer fecha de corte → ver alumnos con saldo mayor a cero → elegir uno → revisar → generar PDF → compartir o descargar.
Periodo de detalle y fecha de corte se muestran por separado. La deuda anterior no desaparece por filtrar esta semana.
Contenido: negocio, folio de documento, fecha de generación, alumno, grado/grupo, periodo/corte, saldo previo, consumos (fecha, producto, cantidad, precio y subtotal), pagos/ajustes y saldo a corte.
Solo información de ese alumno; no incluir lista del salón ni consumos de hermanos sin solicitar consolidación.
Generar PDF no cierra una cuenta, crea deuda, cobra ni marca entrega. Cambiar movimientos exige nueva versión del documento; conservar la referencia del corte/documento generado.
El botón de compartir depende del dispositivo real. Siempre ofrecer descarga del archivo como alternativa. Comprobar que el PDF se abre y se adjunta en el teléfono del operador.

### E. Correcciones
Ventas/pagos confirmados no se borran sin rastro. Anular o corregir con motivo, fecha y responsable; documento anterior queda identificado como versión anterior.
Venta no pagada anulada: elimina el cargo mediante ajuste. Venta ya cobrada anulada: el pago permanece registrado y su importe queda a favor hasta que se registre una devolución, si el operador la realiza. No “desaparecer” el dinero.
Producto desactivado o precio nuevo no altera compras previas. Alumno con saldo pendiente no se borra; se desactiva y conserva su cuenta.

## 6. Reglas de cálculo y datos
Usar importes en centavos; conservar precio y descripción al momento de vender. ID de venta/pago/documento independiente del nombre o posición de pantalla.
Saldo neto a corte = saldo inicial + cargos hasta corte − pagos recibidos hasta corte + devoluciones hasta corte + ajustes netos hasta corte. Positivo: por pagar; cero: al corriente; negativo: a favor. Mostrar saldo a favor como importe positivo etiquetado, evitando “debe −50”. No restar el pago de nuevo al usar saldo a favor: ya quedó registrado al recibir el dinero.
Saldo al inicio del periodo = movimientos netos anteriores; detalle del periodo agrega lo ocurrido entre inicio y corte. Saldo inicial se registra una vez, no cada semana.
Datos mínimos:
| Registro | Campos esenciales |
|---|---|
| Negocio | ID, nombre, moneda, zona horaria, responsable |
| Operador | ID, acceso y permiso; hasta dos operadores en el piloto, cada uno identificable |
| Grupo | ID, grado, identificador, ciclo, activo |
| Alumno | ID, nombre, grupo actual, tutor/contacto, activo |
| Producto | ID, nombre, precio actual, disponible/activo |
| Venta | ID/folio, fecha, alumno opcional, grupo/ciclo históricos, partidas/precios, total, estado, responsable |
| Pago | ID, fecha, monto, método, alumno/cuenta, asignaciones, estado, responsable y dispositivo |
| Devolución | ID, fecha, monto, motivo y pago/cuenta relacionados, responsable |
| Respaldo central | Dispositivo único, versión del respaldo, fecha de creación, última versión confirmada y operaciones pendientes de subir |
| Ajuste | ID, vínculo al movimiento, importe/motivo, fecha, responsable |
| Documento | ID, alumno, periodo/corte, versión, fecha y valores de la emisión |

Contactos del adulto para referencia; sin envío automático ni login del alumno/padre en la base. Respaldo/exportación privados. Demos y repositorio público exclusivamente datos ficticios. Acceso, restauración, retención y pérdida de teléfono deben resolverse para el piloto real.

## 7. Reportes: evitar dobles conteos
| Reporte | Fecha que manda | Qué responde |
|---|---|---|
| Ventas del periodo | Fecha de venta | Cuánto se vendió, pagado en el momento o a crédito |
| Cobros del periodo | Fecha de pago | Cuánto entró, incluyendo pagos de ventas anteriores |
| Ventas del periodo según cobro | Venta en periodo + estado a corte | Cuánto de esas ventas está cubierto/parcial/pendiente |
| Saldos pendientes | Todos los movimientos hasta corte | Quién debe y cuánto, con filtros de alumno/grupo |
| Existencias | Corte de inventario, si módulo activo | Qué hay disponible; no inventar compras desde ventas solas |

Ejemplo: lunes anterior se venden MXN 100 a crédito; esta semana se reciben MXN 40. Ventas de esta semana por ese hecho: cero; cobros: MXN 40; saldo: MXN 60. El resto de ventas/pagos del periodo se agregan por sus propias fechas.
No llamar a ventas “ganancia”: faltan costos y gastos. Ticket interno no se presenta como factura fiscal.

## 8. Inventario: dos módulos distintos
El original plantea ingredientes como futura opción y también solicita reporte de existencias. Necesita definición de alcance:
- **Producto terminado**: entradas, ventas, mermas y ajustes por unidad; cantidad inicial y disponibilidad. Ejemplo: 20 jugos − 3 vendidos − 1 merma = 16. La venta a crédito también descuenta; pagar la deuda no descuenta otra vez.
- **Ingredientes/recetas**: cantidades por porción, unidades y conversiones, compras, preparación/lotes, merma y ajustes. Registrar ingredientes consumidos al preparar y productos vendidos al despachar evita descontar dos veces.
“Lista de compras” requiere objetivo mínimo y stock confiable; sin estas reglas solo mostrar existencias.
Decisión del responsable: inventario fuera de la primera versión y en segunda etapa. La primera conserva menú/precio/disponibilidad manual. El alcance de producto terminado versus recetas se definirá en esa etapa.

## 9. Pruebas de aceptación antes de usar datos reales
1. Dos alumnos con mismo nombre se distinguen; compras no se mezclan.
2. Venta pagada anónima genera venta y cobro iguales, sin deuda.
3. Crédito de MXN 40 queda ligado al alumno; abono de MXN 15 deja MXN 25.
4. Pago de deuda anterior figura en cobros, no como nueva venta.
5. Precio actualizado no cambia ventas/PDF históricos.
6. Dos hijos de un tutor conservan saldos separados.
7. Saldo anterior aparece aunque el detalle filtre solo esta semana.
8. Confirmación repetida no duplica venta/pago; operación fallida no declara éxito.
9. Generar un PDF dos veces no cambia ningún saldo.
10. PDF individual no contiene cuentas ajenas; totales concuerdan con pantalla.
11. Anulación deja trazabilidad y coherencia entre ventas/cobros/saldo.
12. Cambio de grupo conserva historial; alumnos inactivos con deuda son consultables.
13. Respaldo restaurado conserva totales y folios; comprobar acceso y aislamiento de datos.
14. En teléfono real: captar venta, volver a abrir cuenta, generar PDF y compartir/adjuntar.
Inventario y operación con varios dispositivos quedan fuera de aceptación de la primera versión. Probar recarga sin red, persistencia local y recuperación del respaldo de un único teléfono.

## 10. Decisiones confirmadas y pendientes
| Decisión | Regla/alcance | Estado |
|---|---|---|
| Sin internet | Captura local durable; actualizar respaldo central al reconectar | Confirmado |
| Operadores | Un usuario en primera versión; varias cuentas quedan para etapa posterior | Confirmado por ajuste del responsable |
| Dispositivos de captura | Un teléfono activo; dos personas pueden turnarse usando ese mismo teléfono/cuenta | Recomendación adoptada para reducir alcance; modelo/sistema por comprobar |
| Inventario | Segunda etapa | Confirmado |
| Pagos | Completos, parciales y anticipados con saldo a favor | Confirmado como función; frecuencia real desconocida |
| Hermanos | Cuentas por alumno; repartir expresamente un pago común | Recomendación, sin práctica real confirmada |
| Aplicación de pagos | Cargos más antiguos primero; remanente a favor | Recomendación |
| Saldo sin conexión | Calculado con todos los movimientos del único teléfono; la subida pendiente indica respaldo pendiente, no saldo incompleto por otro operador | Regla propuesta |
| PDF y compartir | Documento por alumno; envío manual | Confirmado |
| Operación | Zona/moneda, volumen, ciclo y fecha habitual de corte | Por comprobar antes del piloto |
| Comercial | Base y complementos de automatización, tarifa pendiente | Dirección definida |

## 10A. Decisión de alcance: un usuario, un teléfono
El responsable propone reducir la primera versión a un usuario y delega la decisión de incluir sincronización compleja. Decisión recomendada del asistente: un solo dispositivo de captura, sin conciliación entre teléfonos. Una misma cuenta en dos teléfonos no elimina bases locales separadas ni conflictos sin red.

### Requisitos del piloto
- Un usuario y un teléfono principal. Dos personas pueden turnarse en ese teléfono; los movimientos se atribuyen a la cuenta, sin afirmar identificación individual de quien lo sostuvo.
- Registrar alumnos, menú, ventas, pagos, anticipos y ajustes sin conexión después de preparar el dispositivo.
- Guardar localmente de forma durable; recargar/cerrar no borra movimientos confirmados. Mostrar “Guardado en este teléfono” y, por separado, “Respaldo pendiente” o fecha de última actualización central.
- Al recuperar conexión, actualizar la copia central. Confirmar guardado remoto antes de mostrar respaldo al día; reintentar sin duplicar movimientos y sin reemplazar una copia más nueva por una anterior.
- Actualización central conserva coherencia entre venta y cobro. Exportación manual recuperable como alternativa y comprobación de restauración.
- No permitir captura desde un segundo dispositivo en esta versión. Un acceso adicional, si se implementa, debe ser solo consulta de datos respaldados, con fecha de actualización; esa función no es necesaria para el piloto.
- Cambiar de teléfono es migración, no añadir otro cajero: dejar de operar en el anterior, subir/exportar todos los movimientos, restaurar y comprobar totales en el nuevo antes de capturar. No prometer revocación instantánea de un equipo desconectado.
- PDF puede generarse sin red con la información completa del teléfono principal; falta de respaldo remoto no obliga a llamarlo provisional. Mostrar corte, generación y estado de respaldo en la app. Si falta algún dato o hay una operación por resolver, avisar antes de compartir.
- Mantener IDs, folios y versiones facilita ampliar más adelante; no desarrollar cola de conciliación entre dispositivos, reservas de saldo ni resolución de ediciones simultáneas ahora.
- Modelo de teléfono, almacenamiento real y compartir PDF se comprobarán antes del piloto. Primer acceso y recuperación desde respaldo central necesitan conexión.

### Pruebas adicionales de la primera versión
15. Anticipo MXN 100, compras MXN 65: MXN 35 a favor; ventas MXN 65 y cobros MXN 100.
16. Deuda MXN 40 y pago MXN 60: MXN 20 a favor; compra posterior MXN 30: pendiente MXN 10.
17. Cerrar y reabrir sin red conserva operaciones y saldo; interrupción al guardar no muestra éxito falso.
18. Conexión interrumpida y reintento de respaldo no duplican ni pierden movimientos; una versión anterior no reemplaza la más nueva.
19. Restaurar en teléfono de reemplazo recupera cuentas, historial y totales; asegurar que el anterior deja de capturar durante migración.
20. Segundo teléfono no puede registrar operaciones.
21. PDF generado sin internet concuerda con saldo local y no altera la cuenta.
22. Devolución de anticipo reduce cobros netos y saldo a favor sin crear venta.
23. Pago común para hermanos se distribuye una vez; suma de asignaciones igual al efectivo registrado.

### Etapa futura
Usuarios adicionales y captura simultánea en varios teléfonos se evaluarán con la práctica. Requieren sincronización de movimientos, manejo de conflictos y actualización de saldos; compartir contraseña no sustituye esas funciones. Inventario también permanece en segunda etapa.

## 11. Ruta al documento final
Revisar reglas recomendadas y bocetos con los escenarios de anticipos y un teléfono sin conexión → actualizar especificación con reglas sin ambigüedad → validar ejemplos numéricos y bocetos móviles → fijar aceptación → redactar documento final v1.0 → elegir arquitectura y desarrollar.
En esta etapa no elegir tecnología ni afirmar tiempos/costos de desarrollo con las reglas abiertas. La estimación previa de Task Fixer aplica al ejemplo de seguimiento de cotizaciones, no a esta cafetería.
