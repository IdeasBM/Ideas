# Tres microapps para demostrar Task Fixer
Fecha: 2026-10-04. Dirección propuesta por el responsable: tres ejemplos comprensibles en el sitio, con asistente que explique su funcionamiento. Este documento concreta alcance; no afirma aplicaciones construidas ni lanzamiento.

## Cambio de dirección
La oferta de contratistas deja de ser la única demostración propuesta. Task Fixer conserva su catálogo de procesos, creación, reparación y mantenimiento. Estas tres aplicaciones son ejemplos de entrega y posibles bases reutilizables, no tres empresas ni tres productos por suscripción ya elegidos. No abrir otro barrido general de ideas ahora: hay casos suficientemente concretos para probar.

## Orden recomendado
1. Cafetería: problema descrito de una persona concreta y posibilidad de comprobar uso diario. El contacto familiar no demuestra demanda comercial ni compromiso del operador.
2. Cotizador: extender la demo existente con cálculo por partidas, reutilizando clientes/documentos.
3. Reporte en campo: requiere definir la evidencia, destinatario y plantilla del contratante; comparte clientes, obras, adjuntos y documentos con el cotizador.

Mostrar tres ejemplos puede ayudar a entender la oferta. Construir primero una experiencia pequeña; no desarrollar tres servicios completos simultáneamente ni crear desde el inicio un constructor universal de módulos.

## 1. Cafetería: del consumo diario a la cuenta semanal
Problema aportado por el responsable: operador sin computadora transcribe consumos y manda resúmenes a padres por WhatsApp durante el fin de semana. No se han medido minutos ni número de cuentas.

### Primera versión
- Uso desde teléfono. Alta de familia/cuenta pagadora, uno o varios alumnos, grado/grupo y contacto del adulto.
- Menú editable: nombre, precio y disponible/no disponible. Desactivar artículos en lugar de borrar su historial.
- Captura: buscar alumno por nombre/grupo, tocar artículos, modificar cantidad, revisar y guardar. Guardado visible; impedir duplicados por doble toque.
- Venta: fecha, alumno, cantidades y precio vigente congelado en esa venta. Cambiar el menú no altera cuentas anteriores.
- Correcciones mediante anulación/ajuste con motivo; mantener rastro.
- Registrar abonos parciales, fecha y cuenta familiar. El botón no comprueba depósitos: el operador confirma el pago.
- Cierre por periodo seleccionado. Mostrar consumos por alumno y día, subtotal semanal, saldo previo, abonos y saldo actual. No mezclar gasto de la semana con deuda acumulada.
- Resumen por familia, con hijos separados. Revisar importe y destinatario antes de compartir.
- Copiar texto y abrir WhatsApp con mensaje preparado; operador confirma envío y marca manualmente que lo compartió. Abrir el chat no significa mensaje enviado ni entregado.
- Exportar registro/cuentas y conservar respaldos para el piloto real.

### Ejemplo sintético
Pepito: lunes burrito MXN 25 + jugo MXN 15; miércoles leche MXN 12. Consumo del periodo MXN 52. Saldo previo MXN 20, abono MXN 30, saldo actual MXN 42. Otro hijo figura separado en la misma cuenta familiar. Los precios son ficticios.

### WhatsApp: dos alcances distintos
Click-to-chat prepara el mensaje para revisión/envío por la persona. El envío automático a muchos destinatarios requiere integración con WhatsApp Business Platform, permisos de destinatarios, plantillas aplicables y presupuesto propio; fuera de la ventana de 24 horas se utilizan plantillas aprobadas. No prometer un botón que envíe todas las cuentas sin comprobar estas condiciones.
La política también restringe negocios de cobranza de deudas. Antes de automatizar, verificar que el caso de resúmenes de compras de la cafetería encaja en el uso permitido y categoría adecuada; no equipararlo por defecto a un servicio financiero o de cobranza. Costos y aprobación no comprobados.
Primera propuesta: automatizar captura, cálculo y preparación; envío supervisado. Conserva la meta final del responsable como segunda etapa, no la descarta.

### Aceptación y medida
Probar dos alumnos con mismo nombre, dos hijos de una familia, menú con precio modificado, abono parcial, corrección, doble toque y cierre repetido. El cierre no debe volver a cargar consumos al saldo. Trabajar importes en centavos.
Medir tiempo de captura durante despacho, correcciones, tiempo de preparar/circular cuentas y saldo concordante con libreta. Si la captura retrasa el servicio, rediseñar antes de ampliar.
Datos reales de alumnos/padres no van a demos públicas ni al repositorio. La versión operativa necesita acceso privado y respaldos; el destinatario es el adulto autorizado.

### Información por confirmar
Cantidad de alumnos/familias, teléfono disponible, conexión durante despacho, otras personas que capturan, saldo inicial, quién autoriza crédito, quién confirma abonos, cobro por alumno/familia y semana de cierre. Sin conexión confiable: diseñar captura local con cola y reconciliación; no asumir sincronización resuelta. Menú manual primero; importar una hoja puede añadirse después.

## 2. Cotizador por partidas
Ampliación concreta solicitada: la demo anterior organiza seguimiento y aprobación; todavía no calcula cotizaciones por materiales y mano de obra.

### Primera versión
- Cliente, obra, ubicación, moneda y vigencia.
- Módulo materiales: descripción, unidad, cantidad y precio unitario.
- Módulo mano de obra: tarea, horas y tarifa por hora. Definir si son horas de persona o de cuadrilla para evitar doble conteo.
- Partidas opcionales de traslado/otros; reglas de descuento e impuesto configuradas por el negocio, sin inventar tasas.
- Subtotales separados, total y documento imprimible/PDF; condiciones, exclusiones y anticipo opcional.
- Vista previa y aprobación del dueño; correo real solo al conectar una cuenta y verificar envío.
- Guardar versiones; modificar cotización no cambia la versión enviada. Mantener el seguimiento ya prototipado.

Ejemplo ficticio: materiales USD 180; trabajo 8 horas × USD 35 = USD 280; subtotal USD 460, antes de impuestos/descuentos. No estimar rendimiento ni materiales desde fotos.
Pruebas: decimales, partida vacía, cantidades negativas, redondeo, descuentos, impuesto configurado, cambio de versión y destinatario. No mezclar monedas.
Medida: minutos para preparar una cotización comparable y correcciones antes de enviar. Un documento enviado no demuestra venta.
Nombre público provisional: “Prepara tu cotización con materiales y mano de obra”.

## 3. Reporte de trabajo en campo
Entrada móvil para instaladores, pintores y otros subcontratistas; elegir una actividad/plantilla en la primera prueba.

### Primera versión
- Obra, fecha, responsable, actividad, avance, pendientes y observaciones.
- Fotos con descripción y archivos adjuntos; distinguir captura terminada de carga pendiente.
- Plantilla de cierre que reúna datos/fotos en un documento.
- Destinatario elegido y revisado: dueño, contratante u otro autorizado; no enviar automáticamente a todos.
- Vista previa, aprobación del responsable y envío por correo cuando exista conexión.
- Estado: borrador, pendiente de carga, listo para revisión, enviado o error.
- Reenvío con control y reporte versionado.

Completar formatos externos se evalúa por plantilla: un PDF con campos, uno escaneado y un portal web requieren soluciones distintas. No prometer llenar cualquier documento.
Fotos prueban evidencia adjunta; no certifican aceptación de obra. Firma/aceptación y seguimiento de inconformidades son módulos posteriores.
Pruebas: pérdida de conexión, foto grande, archivo no admitido, carga parcial, destinatario equivocado, doble envío y corrección posterior.
Medida: tiempo de elaborar reporte y porcentaje devuelto por datos/evidencias faltantes.
Nombre público provisional: “Entrega el reporte de tu trabajo desde el teléfono”.

## Módulos compartidos y límites
| Base reutilizable | Aplicaciones |
|---|---|
| Clientes/cuentas y contactos | Las tres, con campos propios |
| Partidas e importes | Cafetería y cotizador |
| Documentos y revisión | Las tres |
| Adjuntos | Campo; cotizador opcional |
| Envíos, estados y errores | Las tres; reglas por canal |
| Acceso, respaldo y bitácora | Todas las versiones operativas |

Un alumno y una obra no necesitan el mismo formulario. Compartir piezas de código y patrones de proceso; mantener las pantallas enfocadas. Demostraciones con datos ficticios, identificadas como simulación y separadas de cualquier operación real.

## Sitio y asistente: cómo explicarlo
Una página con “Mira cómo funciona” y tres tarjetas. Cada ejemplo muestra problema, acción y resultado observable. Acciones: “Probar ejemplo” y “Tengo algo parecido”. Evitar afirmar clientes o ahorros inexistentes.
No hay todavía chatbot conectado ni sitio publicado.

El asistente:
1. Pregunta qué hace el visitante y qué tarea le quita tiempo.
2. Explica el ejemplo pertinente en palabras comunes.
3. Pregunta cómo lo hace hoy, qué herramientas usa y si le basta una base o necesita adaptar.
4. Resume el caso para revisión humana; ofrece contacto con permiso.
5. Solo describe funciones/precios documentados. Si no están definidos, lo dice.
No calcula cotizaciones de servicio, asegura compatibilidad ni aprueba proyectos por su cuenta. No pedir datos reales de niños ni documentos de clientes para probar una demo.

## Forma de vender por comprobar
- Servicio de instalación/adaptación delimitado + mantenimiento acordado.
- Venta directa de versión estándar solo cuando alcance, acceso, soporte, costos y entrega estén probados.
- Suscripción compartida con varias empresas solo si repetición y economía la justifican; no derivarla del término microapp.
Una prueba familiar puede acreditar funcionamiento y ahorro de tiempo; compradores independientes sirven para comprobar disposición a pagar. No fijar tarifas a partir de un prototipo.

## Próximo entregable
Prototipo móvil de cafetería con datos ficticios: alumno/familia → menú → consumo → abono → cuenta semanal → texto para compartir. Después comprobar el recorrido con el operador, si acepta participar. No contactar ni conectar cuentas sin instrucción.
Atención y mantenimiento se definen como parte de cada piloto; no olvidar ese trabajo al avanzar a demos.

## Fuentes técnicas
Consultadas 2026-10-04:
- WhatsApp, [click-to-chat](https://faq.whatsapp.com/5913398998672934).
- WhatsApp, [política de mensajería empresarial](https://business.whatsapp.com/policy).
- WhatsApp, [precios de Business Platform](https://business.whatsapp.com/products/platform-pricing).
Fuentes usadas para delimitar canal; no prueban demanda ni tarifa final del proyecto.
