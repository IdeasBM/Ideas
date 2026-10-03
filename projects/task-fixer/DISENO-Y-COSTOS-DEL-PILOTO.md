# Primer piloto: solicitudes y cotizaciones
Task Fixer · 2026-10-03 · propuesta, no contratación ni integración desplegada.

## Decisión propuesta
Usar la demostración para validar una tarea antes de construir el sitio comercial. Público de prueba recomendado: dueño de pequeño negocio de pintura/drywall/remodelación que prepara cotizaciones y pierde su seguimiento. No se ha probado disposición a pagar ni elegido ciudad definitiva.

La entrega inicial organiza solicitudes; el negocio calcula los precios y aprueba mensajes. IA, WhatsApp, SMS, lectura libre del correo, contabilidad y presupuestos desde fotos quedan para alcances posteriores. No añadir IA si una regla verificable basta.

## Alcance de un piloto real
Un negocio, un formulario de ingreso o captura manual de mensajes, un registro de solicitudes, un responsable, un correo del negocio, aprobación de cotización, un seguimiento autorizado y una vista de pendientes. Máximo inicial propuesto: 100 solicitudes al mes; revisar picos diarios, destinatarios y volumen antes de aceptar. Mensajes en idioma acordado. Duplicar una entrada se identifica por su ID; personas que piden dos obras generan dos solicitudes legítimas.

Cada registro: identificación de entrada, fecha, contacto, zona, tipo de obra, datos pendientes, responsable, importe/versión aprobados, estado del envío, fecha de seguimiento, respuesta y notas de revisión. Separar cambios de datos de la versión aprobada.

## Herramientas y costos oficiales
Consultadas el 2026-10-03. Referencias de tarifa, sin promociones, impuestos, dominio ni honorarios. Confirmar moneda, país, modalidad y precio al contratar. No se abrió ninguna cuenta ni se verificaron permisos reales.

| Alternativa | Referencia de costo | Encaje y límite |
|---|---|---|
| Demostración HTML incluida | Sin suscripción ni servicio externo | Simulación en memoria. No es almacenamiento ni envío real. |
| Google Forms + Sheets + Apps Script + correo Workspace del cliente | Starter: USD 8.40/usuario/mes flexible; USD 7 con compromiso anual. México: MXN 168 flexible o 140 anual, por usuario/mes | Recomendación para probar un flujo simple si el cliente ya usa Google. Desarrollo, controles y mantenimiento siguen costando tiempo. |
| Make + registro y correo existentes | Gratis: 1,000 créditos/mes. Core: USD 9/mes equivalente con facturación anual, 10,000 créditos/mes | Alternativa si las conexiones visuales reducen trabajo de soporte. Correo/registro se presupuestan aparte. No asumir USD 9 para modalidad mensual. |

Google Apps Script publica 100 destinatarios de correo/día para cuentas de consumidor y 1,500 para Workspace; ejecución máxima de 6 minutos. Son cuotas sujetas a cambio y otras restricciones; una cuenta de prueba puede tener límites adicionales. La capacidad se comprueba en la cuenta real antes de conectar clientes.

Make consume créditos por acciones; algunas consumen más de uno. El plan gratis limita a dos escenarios activos y sus intervalos programados tienen un mínimo de 15 minutos. No dimensionar solo con el número de solicitudes. Ejemplo hipotético: 100 solicitudes × 20 acciones = 2,000 créditos, antes de revisiones periódicas, reintentos y avisos. Registrar consumos de la prueba; no tratar esa estimación como medición.

Recomendación: piloto Google si el negocio ya trabaja ahí; evaluar Make si utiliza otras herramientas. Evitar contratar por un año solo para probar. Si ya tiene licencias compatibles, el costo incremental de licencia puede ser cero; eso no vuelve gratuita la entrega. No decidir cuentas nuevas sin revisar primero las existentes.

## Diseño técnico a comprobar en una integración
Entrada → validar/deduplicar → registro → revisión humana → aprobar versión → cola de envío → confirmación o pendiente → seguimiento autorizado → cierre.

Un ID de evento evita duplicar la entrada; un bloqueo controla escrituras simultáneas. Mantener cola y bitácora de intentos. Un fallo confirmado antes de enviar admite reintento limitado; una desconexión después de enviar puede dejar resultado incierto. Revisar evidencia del proveedor antes de reintentar. No prometer entrega exactamente una vez de correos externos. Registrar fallos y avisar por una vía acordada; conservar captura/manual de respaldo.

Las cuentas y datos son del cliente. Acceso mínimo por invitación, sin pedir contraseñas. Copia de configuración e instrucciones de salida. No colocar credenciales, expedientes ni datos reales en el repositorio público. El control de acceso, retención, respaldo y restauración pertenecen a la entrega real; el HTML no los implementa.

## Horas y economía de entrega
Estimación de trabajo por validar con un piloto; no horas ya medidas ni tarifa pública:

| Trabajo | Horas estimadas |
|---|---:|
| Revisar caso, datos y reglas | 3–4 |
| Comprobar cuentas y permisos | 2–3 |
| Construir ingreso, registro, aprobaciones y envíos | 6–9 |
| Errores, pruebas y recuperación | 4–6 |
| Instrucciones, capacitación y entrega | 3–4 |
| Total | 18–26 |

Reservar 20% de contingencia: alrededor de 22–32 horas. Rehacer CRM, varios buzones, WhatsApp o migraciones requieren nueva estimación. Cronometrar configuración y soporte; reutilizar una plantilla no elimina las pruebas específicas.

Ejercicio interno para EE. UU.: a USD 40/h de costo de trabajo, 22–32 h representan USD 880–1,280. Si un precio hipotético fuera USD 1,500 y otros costos directos USD 75, quedaría USD 545–145 antes de adquisición, impuestos y gastos fijos. No es precio recomendado ni demanda comprobada. En México presupuestar horas y costos locales propios; no convertir la tarifa estadounidense y asumir aceptación.

## Criterios de aceptación
La simulación verifica lógica; la integración debe repetir estas pruebas contra herramientas reales:

1. Misma entrada dos veces: una solicitud. Otra obra: otra solicitud.
2. Datos o responsable faltantes: bloquear aprobación y envío.
3. Cambio de datos antes del envío: volver a aprobar la versión.
4. Importe y envío requieren decisión del negocio.
5. Fallo confirmado: pendiente visible; reintento controlado.
6. Envío incierto: no reintentar hasta revisar resultado.
7. Seguimiento: fecha y autorización; una ejecución, sin repetir tras cierre.
8. Registros y pendientes coinciden. Probar permisos, dos eventos concurrentes, expiración de acceso, cuotas y respaldo/recuperación en el piloto real.

En producción agregar autorización del remitente/destinatario, idioma y texto acordados, prueba de recepción, registro durable y cancelación de mensajes pendientes al recibir respuesta. La demo no escucha respuestas reales ni garantiza entregabilidad.

## Qué falta para comprobar negocio
Enseñar el ejemplo a cinco dueños del segmento, cuando se acuerden contactos. Preguntar por su último caso real, volumen, quién atiende, cómo sigue cotizaciones, consecuencia del retraso, herramientas y qué pagarían por una prueba delimitada. No pedir solo opinión estética.

Criterio propuesto, sin valor estadístico: al menos tres describen un caso reciente semejante y dos quieren revisar una propuesta concreta. Una contratación pagada permite medir entrega; no basta para afirmar ajuste al mercado. Si no reconocen el problema, corregir oferta antes del sitio y publicidad.

Siguiente trabajo independiente: cerrar modelo de atención (responsable, horario viable, respuesta frente a solución, mantenimiento incluido y escalamiento), preparar propuesta/guion de validación y después cerrar sitio. No promete soporte continuo ni equipo ya formado.

## Fuentes
- Google, [comparación de planes y monedas](https://knowledge.workspace.google.com/admin/billing/compare-flexible-and-annual-fixed-term-payment-plans).
- Google, [cuotas de Apps Script](https://developers.google.com/apps-script/guides/services/quotas).
- Make, [precios y límites](https://www.make.com/en/pricing).
- Make, [referencia de tarifa anual Core](https://www.make.com/en/blog/make-vs-zapier), usada solo para tarifa propia, no para afirmaciones comparativas del proveedor.
