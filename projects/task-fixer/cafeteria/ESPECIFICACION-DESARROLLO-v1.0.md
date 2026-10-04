# Microapp de cafetería escolar — Especificación de desarrollo v1.0
Task Fixer · 2026-10-04 · BASE FUNCIONAL FINAL PARA INICIAR DESARROLLO.
Consolida el documento del responsable y sus decisiones de esta conversación. Sustituye como referencia vigente a los borradores v0.2–v0.4; estos se conservan como antecedentes.
Estado: alcance cerrado; aplicación, interfaz, respaldo y PDF todavía no implementados ni probados. Las reglas de detalle de esta versión completan el alcance autorizado; cambios posteriores se registran como revisión.

## 1. Objetivo
Registrar ventas y cuentas desde un teléfono, operar sin internet después de la preparación inicial y generar un PDF por alumno para compartir manualmente. Evitar reconstruir a mano los consumos al final de la semana.
Piloto: un negocio, un usuario y un único teléfono de captura. Dos personas pueden turnarse en ese teléfono; la app atribuye movimientos a la cuenta, sin afirmar quién sostuvo el equipo.
Inventario y captura desde varios teléfonos quedan para otra etapa.

## 2. Alcance y exclusiones
Incluye negocio/configuración, grados y grupos, alumnos/tutor, menú, ventas de contado o a cuenta, pagos completos/parciales/anticipados, saldo a favor, correcciones, devoluciones registradas, reportes, PDF individual, almacenamiento local, respaldo central y exportación/restauración.
No incluye consolidación familiar ni reparto automático entre hermanos. Cada alumno tiene cuenta independiente y recibe su propio PDF. Si un padre entrega un solo monto para dos hijos, el operador registra dos pagos separados por las cantidades correspondientes; la app no decide su reparto.
Fuera: inventario de productos/ingredientes, recetas, compras, facturación fiscal, pagos bancarios automáticos, WhatsApp integrado, envíos programados, acceso de padres/alumnos, sucursales, varios usuarios, segundo dispositivo escritor y constructor universal de módulos.
No incluir consulta desde otro teléfono en el piloto. Cualquier automatización comercial adicional se presupuesta después.

## 3. Parámetros de preparación
Nombre del negocio, moneda única, zona horaria, ciclo escolar, grados/grupos y teléfono/dispositivo principal. Guardar moneda y precisión monetaria en configuración; no cambiar moneda de movimientos existentes mediante una simple edición.
Fechas/periodos elegidos por operador, sin cierre semanal automático. Zona horaria define días y cortes; fechas no deben depender de la hora del servidor.
Valores reales de moneda/zona/ciclo, modelo/sistema del teléfono, cantidades de alumnos/productos y ventas diarias aún no aportados. Son datos de instalación y dimensionamiento, no nuevas decisiones de alcance. Para pruebas usar datos ficticios etiquetados; no tratarlos como valores confirmados del negocio.
Primer acceso, preparación del teléfono y restauración central requieren conexión. Operación posterior sin conexión es requisito, sujeto a verificación en el equipo real.

## 4. Pantallas y recorridos
### Inicio / Nueva venta
Pantalla inicial de despacho. Productos con nombre/precio, búsqueda, cantidad entera, carrito y total. Botones claros, sin depender de colores para indicar guardado o deuda.
Dos opciones:
- **Pagado ahora**: confirmar total y método; venta más cobro por total en una operación. Alumno opcional. No modifica deudas anteriores ni usa anticipos.
- **A la cuenta del alumno**: elegir alumno, mostrar saldo previo, compra y resultado esperado; confirmar. Consume saldo a favor existente; excedente queda pendiente. Puede acompañarse de un abono parcial explícito.
No exigir nuevo registro de alumno para venta anónima de contado. No aceptar crédito anónimo. No cobrar ni registrar dos veces por doble toque.
Mostrar cambio como ayuda si se introduce efectivo entregado; el cobro registrado es el importe de la venta, no el billete recibido. Para anticipos usar la cuenta, no el campo de cambio.

### Alumnos y grupos
Crear grado/grupo/ciclo; alumno con ID único, nombre y tutor/contacto opcional para referencia. Identificar con nombre y grupo al seleccionar; mismo nombre no significa misma persona.
Alta de saldo inicial: deuda o saldo a favor, una sola entrada documentada por alumno; no crear venta/cobro nuevo por migrar su libreta.
Alumno/grupo/producto se desactiva, no se elimina con historial. Cambiar de grupo conserva referencias de grupo/ciclo al momento de los movimientos. Cobranza se filtra por grupo actual; informes históricos pueden usar grupo de la operación, claramente identificado.
No se captura foto/documentación del niño ni se crea acceso para él.

### Menú
Nombre, precio y disponible/no disponible. Crear, editar y desactivar. Unidades enteras; ventas por peso, recetas e inventario fuera.
Guardar descripción/precio de cada partida al vender; cambios posteriores no alteran historial ni PDFs emitidos. Carrito es borrador hasta confirmación; revisar total vigente al confirmar.

### Cuentas y pagos
Grupo → alumnos → cuenta individual → historial y saldo → registrar pago/anticipo o generar PDF.
Por defecto mostrar pendientes; permitir ver al corriente y saldo a favor.
Pago positivo con monto, fecha, método, nota/referencia opcional y confirmación. Mostrar saldo antes/después.
Aplicar pagos de cuenta a cargos más antiguos primero, incluyendo deuda inicial; remanente a favor. Orden estable por fecha efectiva, secuencia de movimiento y ID. Guardar asignaciones o poder reproducirlas de manera determinista.
Venta a cuenta utiliza crédito existente sin generar otro pago. Admitir anticipo sin deuda, pago parcial, pago total y pago superior a deuda.
No bloquear consumo por límite de crédito en esta versión; sí mostrar saldo posterior. No incorporar descuentos/intereses/multas.

### PDF y compartir
Grupo → alumnos pendientes → elegir alumno → elegir periodo y corte → vista previa → generar PDF → compartir o descargar.
No generar lista de salón para enviar a padres. No reunir hermanos en una cuenta/PDF.
Contenido: negocio, folio/version, alumno, grupo, moneda, periodo/corte, fecha de emisión, saldo previo, consumos por fecha/producto/cantidad/precio/subtotal, pagos y ajustes del periodo, saldo pendiente o a favor al corte.
El detalle puede cubrir esta semana; el saldo incluye todo lo anterior al corte. Etiquetar saldo previo a favor cuando corresponda.
PDF utilizable sin red con los datos completos del teléfono. Respaldo pendiente se muestra en la app; por sí solo no hace provisional la cuenta.
Generar/compartir no cobra, liquida ni garantiza entrega. Ante error, mantener datos, ofrecer reintento o descarga. Compatibilidad de compartir archivos se prueba en el teléfono real.
Guardar documento como emisión inmutable; volver a abrirlo muestra esa emisión. Volver a calcular después de corrección produce una nueva versión, no reemplaza silenciosamente lo ya compartido.

### Ajustes y respaldo
Negocio/configuración, registro de teléfono principal, acceso, estado de respaldo, exportación y recuperación. Separar estas funciones de despacho.
No ofrecer botón de “borrar todo” cerca de venta/pago. Operaciones destructivas de mantenimiento requieren revisión expresa y copia recuperable.

## 5. Modelo contable funcional
Trabajar con importes enteros en la unidad mínima monetaria. Una moneda por negocio; sumas deben comprobar rangos y evitar desbordamiento. Nada de saldos editados directamente en lugar de movimientos.
**Saldo de alumno** = saldo inicial + ventas a cuenta − pagos de cuenta + devoluciones de cuenta + ajustes netos.
Positivo: por pagar; cero: al corriente; negativo: a favor mostrado como importe positivo con etiqueta.
Las ventas de contado y sus cobros vinculados se registran aparte del saldo de cuenta, incluso si se conoce el alumno. No deben saldar la deuda previa por accidente.
Ejemplos:
| Caso | Ventas | Cobros | Resultado de cuenta |
|---|---:|---:|---|
| Venta anónima de contado de 40 | 40 | 40 | No crea cuenta/deuda |
| Compra a cuenta 40 y pago 15 | 40 | 15 | 25 por pagar |
| Anticipo 100 y compra a cuenta 65 | 65 | 100 | 35 a favor |
| Deuda anterior 40 y pago 60 | 0 nuevas | 60 | 20 a favor |
| Después del caso anterior, compra a cuenta 30 | 30 nuevas | 0 nuevos | 10 por pagar |

## 6. Correcciones, devoluciones y fechas
Movimientos confirmados inmutables: anulación mediante reverso/ajuste con motivo, responsable y vínculo al original; corrección crea movimiento nuevo. No borrar ni sobrescribir importes confirmados.
Una anulación se aplica una sola vez. Reverso y reemplazo relacionados deben guardarse coherentemente. No permitir reversos por encima del importe que todavía admite reversión.
- Venta a cuenta anulada: revierte cargo; pagos recibidos permanecen, y su exceso queda a favor.
- Venta de contado anulada: documentar devolución ligada a esa venta; si no se ha devuelto dinero, registrar devolución pendiente y no fingir que salió de caja. Resolver pendiente antes de considerar conciliado el periodo.
- Pago registrado por error: reverso del pago sin afirmar devolución de efectivo. Diferenciar corrección de dato frente a dinero realmente devuelto.
- Devolución de saldo a favor: monto positivo no mayor al saldo disponible, confirmación de entrega manual y vínculo; aumenta saldo neto hacia cero. Sin transferencia automática.
Anulación de venta no implica inventario porque ese módulo no existe en v1.
Registrar fecha efectiva y fecha de registro, separadas. Permitir fecha anterior revisada para saldos/capturas migradas, no fecha futura. Si cambia un corte por captura retroactiva/corrección, generar nueva versión de PDF y recalcular asignaciones de cuenta sin alterar emisiones anteriores.
Al cambiar la fecha/hora del equipo de manera evidente, advertir y pedir revisión; no atribuir a estar conectado que el reloj del negocio es correcto.

## 7. Contrato de datos
| Entidad | Elementos esenciales |
|---|---|
| Negocio/usuario/dispositivo | IDs, configuración, cuenta y dispositivo activo |
| Grupo/alumno | IDs, ciclo/grupo, estado activo, tutor/contacto de referencia |
| Producto | ID, nombre, precio, disponibilidad |
| Venta/partida | ID y folio, fecha efectiva/registro, contado o cuenta, alumno opcional, grupo/ciclo históricos, cantidad, precio/descripción congelados |
| Cobro/pago | ID, fecha, importe, método, vínculo venta de contado o alumno; asignaciones para pagos de cuenta |
| Saldo inicial | ID, alumno, importe con signo, fecha y motivo de migración |
| Ajuste/devolución | ID, relación al original, importe, tipo, motivo y fecha |
| Documento | ID, alumno, corte/periodo, versión, contenido/valores de emisión |
| Respaldo | ID/versión, dispositivo, fecha, estado y confirmación remota |

Cada comando confirmado tiene identificador persistente. Reintentar el mismo comando conserva ID; ventas legítimas iguales llevan IDs distintos. Folios nunca se reutilizan tras anulación.
Estado de pago por venta se deriva de cobros/asignaciones, no de un interruptor manual que contradiga la cuenta.
Fuente local: movimientos; saldos/resúmenes son resultados recalculables. Debe haber esquema versionado y migraciones verificadas, sin borrar historial al actualizar.

## 8. Guardado local y copia central
Una transacción local guarda la operación completa (venta y cobro, o ajuste y relaciones) antes de anunciar éxito. No limpiar carrito/formulario antes de confirmar almacenamiento. Si no puede guardar, avisar y conservar borrador.
Sin red debe poder abrir/reabrir app preparada, capturar, consultar, registrar pagos y generar PDF; recursos necesarios para esas tareas deben estar disponibles en el dispositivo.
Mostrar estado local y respaldo por separado: guardado local puede estar completo aunque falle la subida.
Subida automática al recuperar conexión, con acción “Respaldar ahora” como alternativa. Cada versión confirma recepción completa, integridad y revisión creciente; nunca reemplazar una copia nueva por una anterior ni aceptar una carga a medias como respaldo.
Conservar copia central anterior válida si nueva falla; reintentos controlados. Exportación manual recuperable incluye todo lo confirmado localmente y metadatos de versión.
Respaldar por copia consistente o movimientos incrementales según arquitectura elegida; no programar conciliación de dos escritores.
Segundo teléfono no se habilita para captura de rutina. Migración: detener uso anterior, exportar/subir, restaurar, verificar registros/totales, activar sustituto. Restauración no agrega nuevamente cobros/saldos.
Una pérdida de teléfono antes de respaldar puede perder movimientos aún locales; mostrar última copia y enseñar recuperación. No prometer recuperación de datos nunca guardados fuera del dispositivo.
Almacenamiento real, capacidad, errores por espacio y conservación tras actualización requieren prueba en el teléfono elegido.

## 9. Acceso y resguardo
Repositorio y demos: datos ficticios. Base operativa y archivos de respaldo privados; documentos reales no van al repositorio público.
Autenticación inicial con conexión; desbloqueo/protección local para uso posterior sin red. Credenciales remotas no se guardan en texto claro ni se incluyen en código público.
La arquitectura debe precisar sesiones locales, bloqueo, recuperación de acceso y protección de respaldo. Revocar un dispositivo sin red no equivale a borrar sus datos inmediatamente.
Archivos compartidos pueden permanecer en el teléfono/aplicaciones del operador; explicar uso responsable y cómo eliminar exportaciones cuando corresponda. Configurar conservación con el negocio al preparar piloto.
No se declaran certificaciones ni cumplimiento legal por redactar estas reglas.

## 10. Reportes y PDF: definiciones
- **Ventas** por fecha efectiva: total bruto, anulaciones/ajustes y neto, con separación contado/cuenta.
- **Cobros** por fecha de pago: contado más pagos/anticipos de cuenta; mostrar devoluciones y neto separados. No incluir saldo inicial migrado como dinero recibido ahora.
- **Pendientes / a favor**: movimientos acumulados a corte; filtro por grupo actual y alumno.
- **Ventas del periodo según cobro**: contado cubierto por su pago; cuenta cubierta por asignaciones a corte. Abono a deuda anterior no cambia la fecha original de venta.
No llamar “ganancia” a ventas/cobros; no se calculan costos de negocio. Ticket/comprobante/PDF son documentos operativos, no facturas fiscales.
Resúmenes e importes de PDF deben salir del mismo cálculo que la pantalla, con filtro/corte inclusivos definidos en zona horaria. Si fecha de inicio es posterior al corte, rechazar.
Exportación de datos estructurados y PDF cumplen fines diferentes: restauración usa respaldo estructurado, no PDF.

## 11. Plan de desarrollo y evidencia de entrega
1. Bocetos navegables de Nueva venta, Cuenta, Pago y PDF con casos ficticios; comprobar comprensión/rapidez.
2. Núcleo de movimientos, cálculos, asignaciones y correcciones; pruebas de reglas independientes de interfaz.
3. Persistencia local y apertura sin red; pruebas de errores y actualizaciones.
4. Catálogos, captura y reportes; documentos PDF disponibles sin red.
5. Servicio privado de respaldo y recuperación de un dispositivo; autenticación.
6. Prueba en el teléfono real y piloto controlado; comprobar tiempos y cuentas contra registro de referencia.
Elegir stack/hosting después de este documento, justificando persistencia móvil, PDF offline y respaldo. No asumir compatibilidad de hosting disponible ni licencia/costo sin comprobar.
Cada fase debe mostrar evidencia verificable antes de usar saldos reales. No comenzar con integración WhatsApp, inventario o varios dispositivos.

## 12. Matriz de aceptación
| ID | Escenario | Resultado exigido |
|---|---|---|
| A01 | Alumnos homónimos/hermanos | IDs/saldos/PDF independientes |
| A02 | Contado 40, incluso con alumno con deuda previa | Venta/cobro 40; deuda anterior intacta |
| A03 | Cuenta 40 + pago 15 | Deuda 25; sin nueva venta al pagar |
| A04 | Pago ante cargos antiguos y recientes | Antiguos primero; remanente a favor |
| A05 | Anticipo 100 → compra 65 → compra 50 | A favor 35 → pendiente 15; sin pago ficticio por consumir anticipo |
| A06 | Precio cambia y alumno cambia grupo | Compra y documento antiguos conservan datos |
| A07 | Mismo comando/doble toque/reintento | Una operación; folio no reutilizado |
| A08 | Error local/espacio insuficiente | No anuncia guardado; conserva borrador |
| A09 | Cierre/reapertura/reinicio sin red | Movimientos confirmados y saldos se conservan |
| A10 | Generar PDF sin red o dos veces | Totales correctos; saldo intacto; sin datos de otro alumno |
| A11 | Anular venta/pago y devolver anticipo | Rastro, límites y cobros/saldos consistentes |
| A12 | Cuenta de semana con deuda anterior | Saldo previo incluido; pagos por fecha correcta |
| A13 | Fecha retroactiva cambia corte | Nueva emisión; anterior intacta; saldos recalculados |
| A14 | Subida cortada/duplicada/desordenada | Última copia válida; no duplica ni retrocede versión |
| A15 | Exportar/restaurar a reemplazo | Registros/folios/totales equivalentes; sin doble carga |
| A16 | Otro dispositivo intenta captura | No habilitado; migración separada |
| A17 | Acceso ajeno a base/respaldo | Datos privados, sin exposición pública |
| A18 | Compartir PDF en equipo real | Archivo legible; compartir o descargar/adjuntar funciona |
| A19 | Contado anulado sin devolver dinero todavía | Dinero no desaparece; devolución pendiente visible |
| A20 | Pago común de hermanos registrado por partes | Dos registros explícitos; ninguna mezcla automática |

No son pruebas ya ejecutadas: son condiciones que la implementación debe cumplir. Volumen real se mide antes del piloto; ampliar comprobaciones de rendimiento si supera la carga prevista.

## 13. Resultado de la última revisión
Cerrados: usuario/teléfono único, hermanos separados, pagos antiguos primero, anticipos, saldo completo local, PDF individual, envío manual e inventario posterior.
Resueltos por reglas de desarrollo: contado frente a pagos de cuenta, reversos/devoluciones, fecha efectiva frente a registro, PDF inmutable y sin etiqueta provisional innecesaria, guardado atómico, respaldo ordenado y recuperación.
Pendientes de implementación/verificación: tecnología, equipo real, valores de configuración, capacidad, costo de servicio, pruebas de interfaz y piloto. Ninguno modifica por sí solo el alcance funcional acordado.
La estimación antigua de Task Fixer para seguimiento de cotizaciones no aplica a esta microapp. Preparar estimación propia después de seleccionar arquitectura.
