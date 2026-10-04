# Cafeterías escolares: revisión y especificación funcional v0.3
Task Fixer · 2026-10-04 · BORRADOR PARA REVISIÓN.
Fuente: documento de una página “MICROAPP CAFETERÍAS ESCUELAS” aportado por el responsable, leído completo y revisado visualmente, junto con sus aclaraciones previas de PDF y envío manual. Incorpora decisiones del responsable del 2026-10-04: operación sin internet, sincronización posterior, hasta dos operadores, inventario en segunda etapa y pagos completos/parciales/anticipados. Sigue en revisión; reglas recomendadas y decisiones confirmadas se distinguen abajo.

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
Incluir: negocio y acceso, grados/grupos/alumnos, responsable de pago, menú editable, ventas pagadas o crédito, registro de pagos completos, abonos y anticipos con saldo a favor, captura sin conexión y sincronización, anulaciones controladas, reportes claros, PDF por alumno, compartir manualmente y respaldo.
Un negocio por piloto; moneda MXN propuesta para el caso inicial, pendiente de confirmar ubicación. Periodos elegidos por el operador, sin envío ni cierre obligatorio automático.
Venta pagada puede ser anónima: no exigir alta de alumno para vender una galleta de contado. Venta a crédito exige seleccionar alumno existente.
Saldo individual por alumno, incluso si dos comparten tutor. Consolidación familiar opcional.
No incluidos inicialmente: recetas e inventario de ingredientes, cobro bancario, facturación fiscal, pedidos anticipados, cuentas para padres, varias sucursales, envíos automáticos y reglas de crédito avanzadas.
La operación sin conexión es requisito confirmado. Primer acceso/configuración y preparación del dispositivo requieren conexión. Después debe registrar ventas/pagos, consultar datos descargados y generar documentos provisionales sin red; al reconectar sincroniza con la base central. Se debe comprobar persistencia, reconexión y consistencia antes de ofrecerlo como capacidad operativa.

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
Regla recomendada: aplicar pagos a cargos más antiguos y saldo inicial del mismo alumno; el excedente permanece a favor. Conservar la distribución calculada y actualizarla de manera consistente al sincronizar movimientos pendientes. La fecha de movimiento y un desempate estable determinan el orden, no cuál teléfono se conectó primero.
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
| Sincronización | ID único del movimiento, dispositivo, secuencia local, fecha de operación y de recepción, confirmación y conflicto |
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
Si hay inventario, agregar entradas, venta a crédito, merma, anulación y límites de stock. Si hay modo sin conexión, agregar recarga, corte de red, reconexión y conflictos entre dispositivos.

## 10. Decisiones confirmadas y pendientes
| Decisión | Regla/alcance | Estado |
|---|---|---|
| Sin internet | Captura local durable; subir y recibir información al reconectar | Confirmado |
| Operadores | Responsable y posible segundo operador; soportar hasta dos | Confirmado |
| Número/tipo de teléfonos | Uno compartido o dos; modelos y sistema | Por comprobar, no bloquea el diseño funcional |
| Inventario | Segunda etapa | Confirmado |
| Pagos | Completos, parciales y anticipados con saldo a favor | Confirmado como función; frecuencia real desconocida |
| Hermanos | Cuentas por alumno; repartir expresamente un pago común | Recomendación, sin práctica real confirmada |
| Aplicación de pagos | Cargos más antiguos primero; remanente a favor | Recomendación |
| Crédito en desconexión | Saldo local provisional; excedente del anticipo pasa a pendiente al conciliar | Recomendación; no prometer límite de gasto en tiempo real |
| PDF y compartir | Documento por alumno; envío manual | Confirmado |
| Operación | Zona/moneda, volumen, ciclo y fecha habitual de corte | Por comprobar antes del piloto |
| Comercial | Base y complementos de automatización, tarifa pendiente | Dirección definida |

## 10A. Uso sin conexión y conciliación de dos dispositivos
Requisitos funcionales; tecnología aún sin elegir.
- Guardar operaciones de forma durable en el teléfono y una cola de pendientes. Cerrar/reabrir la app o perder red no debe borrar una operación ya guardada localmente. Mostrar por separado “Guardado en este teléfono”, “Pendiente de sincronizar”, “Sincronizado” y “Requiere revisión”.
- Cada venta, pago, anticipo, ajuste y devolución lleva ID único; los reintentos conservan ese mismo ID. La venta pagada y su cobro deben quedar como una operación coherente, sin sincronizar solo la mitad.
- Al conectar, enviar pendientes y recibir novedades del otro operador. Confirmar aceptación del servidor antes de retirar movimientos de la cola; no reemplazar la base central por el archivo completo de un teléfono.
- Ventas/pagos distintos se suman como movimientos. Dos ventas legítimas de igual importe no son duplicados por parecerse; dos operadores que anotan el mismo pago físico pueden crear dos IDs diferentes. La app debe permitir señalar/corregir esa duplicación con rastro; ningún ID puede reconocer por sí solo que era el mismo efectivo.
- No sobrescribir silenciosamente precios, alumnos o correcciones de otro operador. Ante ediciones incompatibles conservar ambas propuestas y pedir revisión; precio de venta ya capturado permanece intacto.
- Anular un movimiento dos veces produce una sola anulación efectiva. Ajustes posteriores a documentos emitidos requieren documento nuevo; conservar el anterior.
- El saldo desconectado refleja lo que conoce ese dispositivo, no necesariamente toda la operación. Mostrar última sincronización y avisar que puede haber movimientos del otro teléfono.
- Ejemplo: saldo a favor MXN 100 descargado en ambos teléfonos. Uno registra compra de MXN 70 y otro de MXN 60 sin conexión. Tras sincronizar: ventas MXN 130, anticipo MXN 100, pendiente MXN 30. No dar por garantizado que cada teléfono tenía MXN 100 exclusivamente. Si se exige impedir excedentes, se necesitará otra regla: un solo dispositivo por cuenta, reserva de saldo o autorización conectada.
- Ejemplo de deuda: MXN 100; cada operador recibe/anota pagos distintos de MXN 60. Resultado conjunto: MXN 20 a favor. No perder uno de los pagos por tomar como definitivo el saldo calculado localmente.
- PDF desconectado o con movimientos locales pendientes: permitir vista/archivo marcado “Provisional: pendiente de sincronización”, con corte y última actualización. Documento para cobro recomendado después de sincronizar todos los dispositivos activos y revisar incidencias. Un teléfono conectado no garantiza que el segundo ya subió sus datos; mostrar estado conocido de ambos.
- Exportación/respaldo debe incluir pendientes o identificarlos claramente. Borrar datos de navegador/desinstalar/perder un teléfono antes de sincronizar puede perder movimientos locales; definir recuperación y preparación del dispositivo real.
- Acceso inicial con conexión; uso posterior sin conexión protegido en el dispositivo. Revocación remota no es inmediata sin red; definir duración de autorización local y bloqueo para el piloto.

### Pruebas adicionales obligatorias
15. Anticipo MXN 100, compras MXN 65: MXN 35 a favor, ventas MXN 65 y cobros MXN 100.
16. Deuda MXN 40 y pago MXN 60: MXN 20 a favor; compra posterior MXN 30: pendiente MXN 10.
17. Dos teléfonos desconectados generan ventas/pagos distintos: todos aparecen una sola vez al reconectar y ambos terminan con el mismo saldo.
18. Reintento después de perder respuesta del servidor: no duplica movimiento.
19. Cerrar/reabrir sin red conserva pendientes; interrupción al guardar no muestra éxito falso.
20. Anticipo consumido desde ambos dispositivos: concilia con los movimientos completos y muestra excedente pendiente sin ocultarlo.
21. PDF provisional contiene aviso; PDF actualizado incluye cambios recibidos y no modifica deuda.
22. Correcciones simultáneas y doble anulación conservan consistencia y trazabilidad.
23. Devolución de anticipo reduce dinero cobrado neto y saldo a favor sin crear una venta.
24. Pago común para hermanos distribuido una vez; la suma de asignaciones coincide con el efectivo registrado.

## 11. Ruta al documento final
Revisar reglas recomendadas y bocetos con los escenarios de anticipos/dos dispositivos → actualizar especificación con reglas sin ambigüedad → validar ejemplos numéricos y bocetos móviles → fijar aceptación → redactar documento final v1.0 → elegir arquitectura y desarrollar.
En esta etapa no elegir tecnología ni afirmar tiempos/costos de desarrollo con las reglas abiertas. La estimación previa de Task Fixer aplica al ejemplo de seguimiento de cotizaciones, no a esta cafetería.
