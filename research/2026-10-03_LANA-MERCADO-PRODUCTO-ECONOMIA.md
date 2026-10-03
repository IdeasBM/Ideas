# Lana — mercado, producto y economía
Investigación documental · 2026-10-03 · Comparación con Task Fixer, issue #11.

## Dictamen
Lana tiene una categoría comercial reconocible, pero el asistente no constituye por sí solo una ventaja exclusiva. Para justificar construcción debe demostrar una mejora operativa por la que un comprador acepte pagar y cambiar de sistema. No se recomienda desarrollar la suite completa antes de esa prueba.

La primera hipótesis de comprador es un salón no clínico de una ubicación, con 2–5 prestadores y dueño involucrado en recepción. Es un segmento de prueba propuesto, no elegido por el responsable ni validado. El problema sería coordinar excepciones durante la jornada: llegada, espera, servicio que se alarga, cambio solicitado, hueco disponible y decisión pendiente. País y mercado comercial siguen por fijar; los precios siguientes son referencias en USD de páginas estadounidenses/globales, no cotizaciones locales.

## Mercado y precios publicados
Consultados el 3 de octubre; precios anunciados, sin contratar ni probar productos.

| Alternativa | Evidencia relevante | Precio y límites |
|---|---|---|
| [Square](https://squareup.com/us/en/pricing) | Suite de reservas y pagos. [Assistant](https://api.squareup.com/help/us/en/article/6731-get-started-with-square-assistant-on-appointments) permite confirmar, cancelar y reprogramar por SMS; actualiza calendario. [Waitlist](https://squareup.com/help/us/en/article/7923-waitlist-with-square-appointments) requiere plan/capacidad avanzada elegible. | Free $0; Plus $49; Premium $149 por ubicación/mes. Verificar capacidades adicionales antes de equiparar planes. |
| [Vagaro](https://www.vagaro.com/pro/pricing) | Agenda, recursos, lista de espera y herramientas comerciales. [Vera Fill My Books](https://www.vagaro.com/pro/updates/fill-my-books), anunciado el 1 de julio, promociona disponibilidad. | $30/mes con un calendario en selección consultada; promoción $23.99 los primeros seis meses, con condiciones. No extrapolar a tres calendarios. Fill My Books cobra 5% por reservas de clientes existentes y 20% nuevos atribuibles a campañas, opcionales. |
| [Fresha](https://www.fresha.com/pricing) | Agenda, lista de espera, recursos, inventario y pagos; AI Concierge anunciado para atender llamadas/mensajes. | Independent $19.95/mes; Team $14.95 por miembro reservable. Concierge $99.95/ubicación/mes: 200 minutos y 500 mensajes; excedentes $0.60/minuto y $0.04/mensaje. |
| [Mangomint](https://www.mangomint.com/pricing/) | Suite y [sala de espera virtual](https://www.mangomint.com/features/virtual-waiting-room/): check-in y notificaciones entre cliente y equipo. | $120/ubicación + $10/usuario/mes; teléfono opcional $70/línea, marketing desde $30. Incorporación y transferencia de datos anunciadas gratis. Teléfono no equivale a recepcionista IA. |
| [MoeGo](https://help.moego.pet/en/articles/14026461-appointment-detail-overview-desktop) | Referencia vertical de grooming: confirmación, llegada, listo para recoger, finalización/cancelación; alertas de conflicto, mensajes y ficha del animal. | No trasladar precios por van de grooming móvil a un salón fijo; cotización comparable no verificada. |

Ejemplo de una ubicación y tres personas reservables: Fresha Team $44.85, con Concierge $144.80 mensuales antes de excedentes, impuestos, cobros y comisiones. Su marketplace cobra 20% una vez por cliente nuevo adquirido allí, mínimo $6; canales propios no tienen esa comisión. Data Connector cuesta $295/ubicación/mes: no demuestra escritura bidireccional. Mangomint con tres usuarios cuesta $150 base, $220 con una línea telefónica; un usuario adicional de recepción aumenta la base. No son paquetes funcionalmente equivalentes.

El [informe previo del asistente](2026-10-03_LANA-COMPETENCIA-ASISTENTES.md) documenta además Jobber y Prentice. Atención al cliente, asistente del dueño, notificaciones y aprendizaje de políticas son capacidades distintas; no sumar todas bajo una etiqueta “IA”.

## Jornada del proceso original frente al mercado
“Documentado” significa descrito por el proveedor, no verificado en uso. “Pendiente” no significa inexistente.

| Paso de Lana | Cobertura observada | Consecuencia para el producto |
|---|---|---|
| Solicitud, propuesta, confirmación | Reservas en las suites; Square documenta confirmación y cambios por SMS. | Función básica; no razón suficiente para cambiar. |
| Cancelación/reprogramación/no-show | Cambios documentados; suites ofrecen recordatorios/políticas de cobro. | Evitar duplicados y conservar historial es requisito. |
| Llegada y espera | Mangomint documenta check-in; MoeGo llegada y recogida. | La operación después de reservar tampoco es un espacio vacío. |
| Servicio, demora y cierre | MoeGo documenta estados y alertas; paridad exacta de demoras encadenadas pendiente. | Probar con el mismo caso de retraso y dos citas afectadas en cada demo. |
| Pendientes para el dueño | Ofertas cercanas en informe previo. | Medir decisiones resueltas y escaladas, no cantidad de avisos. |
| “Aprender como decide el dueño” | No validado por nosotros en productos ni en Lana. | Políticas explícitas/versionadas primero; aprendizaje automático después de prueba específica. |

## Motivos de compra encontrados y su fuerza
Dos publicaciones independientes de usuarios de estética describen intención de cambiar:
- [Salón que busca otra herramienta](https://www.reddit.com/r/Estheticians/comments/1so98mr/salon_booking_software_advice/): relata incidencias de agenda, depósitos y soporte.
- [Negocio que prepara segunda ubicación](https://www.reddit.com/r/Esthetics/comments/1rextkz/booking_software/): relata fallos/reportes, soporte lento y preocupación por costo de marketing y migración.

Son testimonios autodeclarados, no auditorías ni una medida de frecuencia de fallos. Comentarios promocionales no cuentan como demanda. El segundo hilo también contiene satisfacción con el proveedor nuevo: hay alternativas que resuelven necesidades, no un mercado abandonado.

**Inferencia:** confiabilidad, facilidad para el cliente, transferencia de datos y soporte pueden motivar compra. Eso eleva nuestra obligación de entrega: no prueba que Lana sería la elegida. Reseñas, historial, depósitos, inventario, enlaces de reserva y entrenamiento crean costo de cambio. Una IA nueva puede no compensarlo.

## Base disponible y brechas
La revisión selectiva del ZIP original identificó 11 estados y 22 acciones, roles, transiciones y pantallas de casos/agenda. No se ejecutó ni auditó; no acredita SaaS listo. Referencia: [revisión original](2026-10-03_DOS-FINALISTAS-LANA-TASK-FIXER.md).

Antes de cotizar construcción hay que comprobar reservas concurrentes, aislamiento entre negocios, permisos de recepción, persistencia/migración, disponibilidad por recurso y duración, idempotencia de eventos, recuperación ante fallos, exportación, mensajes, pagos y sincronización elegida. El almacenamiento observado en opciones de WordPress y el acceso administrativo por defecto requieren revisión; no se declara vulnerabilidad comprobada. No se ha acreditado IA ni sincronización nativa en la revisión estática.

No asignamos porcentaje terminado ni fecha de lanzamiento. Las integraciones dependen de permisos y costo de APIs; “conectar lo que ya usan” no es automáticamente sencillo.

## Asistente propuesto
El proceso y calendario son fuente de verdad. El modelo interpreta solicitudes y propone acciones; el motor verifica disponibilidad, permisos y transición. Confirmar ejecución solo tras resultado persistido. Registrar política, autorización, cambio y resultado.

Automatizar recordatorios y cambios permitidos; escalar conflictos, excepciones de devolución y prioridades no acordadas. La memoria del dueño debe ser visible y corregible. Medir errores, intervenciones, tiempo de resolución y mensajes duplicados. Evitar confundir conversación convincente con operación correcta.

## Economía: sensibilidad, no pronóstico
USD. Supuesto uniforme para valorar tiempo: $40/h, no tarifa del responsable. Precio hipotético $129/negocio/mes, costo variable tecnológico $15. Debe recotizarse con volumen real de voz/mensajes; el supuesto puede quedar corto.

| Escenario de soporte | Horas/mes por negocio | Contribución antes de costos fijos/adquisición |
|---|---:|---:|
| Adverso | 3 | -$6 |
| Base de cálculo | 1 | $74 |
| Favorable | 0.5 | $94 |

Fórmula: precio – tecnología – horas × $40. Si adquisición monetaria fuera $200 e incorporación 6 h ($240), recuperar esos $440 exigiría unos 6 meses con contribución $74 y permanencia suficiente. No incluye desarrollo, gastos fijos, impuestos ni cancelaciones.

Una construcción hipotética de 400 h representa $16,000 de tiempo: ilustra sensibilidad, no estima el ZIP. Recuperarla en 12 meses con $74 de contribución exigiría unos 19 clientes activos constantes solo para esa partida; captación, incorporación, gastos fijos y bajas aumentan el requisito. No calculamos LTV sin retención observada.

## Prueba propuesta y condición de inversión
Si se prioriza Lana, definir una jornada demostrable con cancelación, llegada, demora y reasignación; compararla con demos del proveedor que ya usa el comprador. Captación digital mediante casos concretos de operación y página con demostración; CPC, conversión y CAC propios desconocidos.

Continuar hacia piloto solo cuando compradores identifiquen la falla específica, acepten precio/condiciones y exista ruta de migración viable. Detener la construcción si la función ya se resuelve suficientemente con su suite o si soporte/cambio impiden contribución positiva. Entrevistas y demos no equivalen a venta.

**Resultado de esta etapa:** mercado y exigencias documentados; demanda propia, precio aceptado, costo técnico y disponibilidad operativa pendientes.
