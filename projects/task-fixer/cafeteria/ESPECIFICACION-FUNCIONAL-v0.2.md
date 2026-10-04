# Cafeterías escolares: revisión y especificación funcional v0.2
Task Fixer · 2026-10-04 · BORRADOR PARA REVISIÓN.
Fuente: documento de una página “MICROAPP CAFETERÍAS ESCUELAS” aportado por el responsable, leído completo y revisado visualmente, junto con sus aclaraciones previas de PDF y envío manual. No sustituye una aprobación final ni autoriza desarrollo en producción.

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
Incluir: negocio y acceso, grados/grupos/alumnos, responsable de pago, menú editable, ventas pagadas o crédito, registro de abonos, anulaciones controladas, reportes claros, PDF por alumno, compartir manualmente y respaldo.
Un negocio por piloto; moneda MXN propuesta para el caso inicial, pendiente de confirmar ubicación. Periodos elegidos por el operador, sin envío ni cierre obligatorio automático.
Venta pagada puede ser anónima: no exigir alta de alumno para vender una galleta de contado. Venta a crédito exige seleccionar alumno existente.
Saldo individual por alumno, incluso si dos comparten tutor. Consolidación familiar opcional.
No incluidos inicialmente: recetas e inventario de ingredientes, cobro bancario, facturación fiscal, pedidos anticipados, cuentas para padres, varias sucursales, envíos automáticos y reglas de crédito avanzadas.
La app no debe presentarse como sin conexión hasta definir y comprobar almacenamiento/sincronización.

## 4. Pantallas
1. **Inicio / Nueva venta**: entrada principal durante despacho; acceso a alumnos recientes y menú.
2. **Alumnos**: grado/grupo, búsqueda, saldo y cuenta individual; registro de tutor.
3. **Menú**: productos, precios, disponibilidad y edición.
4. **Cuentas**: grupo → alumnos con saldo pendiente → detalle → abono o PDF.
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
Pagos mixtos en la misma venta (parte contado/parte crédito) quedan por decidir. No incluirlos silenciosamente.

### C. Registrar pago posterior
Elegir alumno → ver saldo → ingresar monto, fecha, método y referencia opcional → revisar → confirmar → comprobante de pago.
Admitir abonos parciales como propuesta; cada pago tiene identidad y nunca crea una venta.
Asignación propuesta: aplicar a cargos más antiguos pendientes del mismo alumno y saldo inicial, dejando visible cómo se distribuyó. Debe confirmarse antes de desarrollar.
Un pago para dos hermanos se distribuye explícitamente entre cuentas; no rebajar el total a ambos.
Propuesta base: no aceptar monto mayor al saldo sin una función de anticipo definida. Anticipos/créditos a favor y devoluciones de dinero quedan por confirmar.

### D. Generar cuenta y compartir
Seleccionar grupo, por ejemplo primero B → establecer fecha de corte → ver alumnos con saldo mayor a cero → elegir uno → revisar → generar PDF → compartir o descargar.
Periodo de detalle y fecha de corte se muestran por separado. La deuda anterior no desaparece por filtrar esta semana.
Contenido: negocio, folio de documento, fecha de generación, alumno, grado/grupo, periodo/corte, saldo previo, consumos (fecha, producto, cantidad, precio y subtotal), pagos/ajustes y saldo a corte.
Solo información de ese alumno; no incluir lista del salón ni consumos de hermanos sin solicitar consolidación.
Generar PDF no cierra una cuenta, crea deuda, cobra ni marca entrega. Cambiar movimientos exige nueva versión del documento; conservar la referencia del corte/documento generado.
El botón de compartir depende del dispositivo real. Siempre ofrecer descarga del archivo como alternativa. Comprobar que el PDF se abre y se adjunta en el teléfono del operador.

### E. Correcciones
Ventas/pagos confirmados no se borran sin rastro. Anular o corregir con motivo, fecha y responsable; documento anterior queda identificado como versión anterior.
Venta no pagada anulada: elimina el cargo mediante ajuste. Venta ya cobrada anulada: requiere decidir destino del cobro (devolución o saldo a favor), no “desaparecer” el dinero.
Producto desactivado o precio nuevo no altera compras previas. Alumno con saldo pendiente no se borra; se desactiva y conserva su cuenta.

## 6. Reglas de cálculo y datos
Usar importes en centavos; conservar precio y descripción al momento de vender. ID de venta/pago/documento independiente del nombre o posición de pantalla.
Saldo a corte = saldo inicial + cargos hasta corte − pagos aplicados hasta corte + ajustes netos hasta corte.
Saldo al inicio del periodo = movimientos netos anteriores; detalle del periodo agrega lo ocurrido entre inicio y corte. Saldo inicial se registra una vez, no cada semana.
Datos mínimos:
| Registro | Campos esenciales |
|---|---|
| Negocio | ID, nombre, moneda, zona horaria, responsable |
| Operador | ID, acceso y permiso; un propietario en primera propuesta |
| Grupo | ID, grado, identificador, ciclo, activo |
| Alumno | ID, nombre, grupo actual, tutor/contacto, activo |
| Producto | ID, nombre, precio actual, disponible/activo |
| Venta | ID/folio, fecha, alumno opcional, grupo/ciclo históricos, partidas/precios, total, estado, responsable |
| Pago | ID, fecha, monto, método, alumno/cuenta, asignaciones, estado, responsable |
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
Recomendación: menú/disponibilidad en versión base; stock terminado en siguiente módulo; recetas después de validar ventas/cuentas. Si inventario es imprescindible para el operador, redefinir versión antes de iniciar. No descartarlo como idea.

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

## 10. Decisiones para cerrar con el responsable
| Decisión | Recomendación provisional | Estado |
|---|---|---|
| Internet y dispositivos | No elegir arquitectura antes de saber conexión y si usa uno o varios teléfonos | Falta información |
| Número de operadores | Un propietario en piloto; ampliar si hay más cajeros | Falta información |
| Inventario inicial | Menú/disponibilidad; ingredientes posterior | Por revisar |
| Pagos parciales/múltiples | Abonos; asignación a cargos antiguos; sin anticipo en base | Por revisar |
| Pagos mixtos/adelantados | Fuera de base hasta confirmar necesidad | Por revisar |
| Cierre/ciclo/moneda | Periodo manual; mantener deuda entre semanas; moneda según negocio | Confirmar operación |
| Volumen | Medir alumnos, ventas diarias y productos para dimensionar | Falta información |
| PDF y compartir manual | Decisión explícita del responsable | Definido |
| Módulos de automatización | Complementos con costo separado; tarifa no definida | Dirección definida |

## 11. Ruta al documento final
Revisar decisiones de sección 10 → actualizar especificación con reglas sin ambigüedad → validar ejemplos numéricos y bocetos móviles → fijar aceptación → redactar documento final v1.0 → elegir arquitectura y desarrollar.
En esta etapa no elegir tecnología ni afirmar tiempos/costos de desarrollo con las reglas abiertas. La estimación previa de Task Fixer aplica al ejemplo de seguimiento de cotizaciones, no a esta cafetería.
