# Lana: recepción operativa y asistente conectado al proceso
Fecha local: 2026-10-03. Decisión del responsable: Lana vuelve a ser la ruta principal. Reemplaza la prioridad anterior de documentos/discrepancias como producto independiente. Slabs y demás familias pasan a reserva, sin borrarlas.

## Producto definido por el responsable
Mini software para front desk de negocio por agenda. Gestiona ciclo de citas y pendientes; asistente orientado al dueño/encargado informa nuevas citas, cambios, cancelaciones, solicitudes de reprogramación y ausencias, y ayuda a decidir siguientes pasos.
No reducir a un bot de reservas ni a una capa de notificaciones. Tampoco asumir que el asistente recibe llamadas: para conocer una conversación necesita captura manual o integración autorizada. Recepcionista telefónica/voz y transcripción no son requisitos establecidos.
La decisión de foco es propia; demanda, nicho y ventaja aún no validados.

## Núcleo de operación propuesto
Solicitud → propuesta de horario → cita confirmada → llegada/espera → servicio → cierre.
Ramas: solicitud de cambio, cancelación, ausencia y seguimiento. Una petición de cambio no modifica la cita por sí sola. No confirmar ausencia únicamente porque pasó la hora; necesita regla/gracia y verificación.
Registro mínimo: cliente, servicio, duración, recurso/profesional, estado, origen del evento, fecha, responsable y acción pendiente. Historial de cambios separado del estado actual.

| Evento capturado | Respuesta útil del asistente | Acción controlada por proceso |
|---|---|---|
| Nueva cita válida | Explicar cliente, servicio y horario; indicar pendientes reales | Confirmar según política o pedir aprobación |
| Solicitud de reprogramación | Mantener cita actual y presentar alternativas disponibles | Comprobar capacidad y cambiar solo al aceptar |
| Cancelación | Mostrar horario liberado y casos de espera compatibles | Proponer contacto; ejecutar según permiso configurado |
| Cliente no presente | Mostrar situación pendiente de verificar | Registrar ausencia verificada y tarea/política pertinente |
| Servicio retrasado | Explicar impacto en siguientes citas | Ofrecer ajuste que encargado decide |
| Servicio terminado | Mostrar pendientes de cierre y seguimiento | Cerrar con información verificada |

El asistente interpreta/explica/proporciona propuestas. Reglas y datos validan disponibilidad, estados y permisos. Evitar duplicados de eventos, reservar recursos de forma consistente y conservar evidencia de acciones. No necesita mostrar todos esos detalles al usuario.
Mensajes deben distinguir hecho, pendiente y propuesta: “solicitó cambiar” no “ya cambié”; “mensaje enviado” no “cliente avisado/confirmado” sin evidencia. La voz natural no sustituye el registro de verdad.

## Sectores con lógica similar: primera comparación
Muestra exploratoria, no ranking de tamaño o disposición de pago. Tres sectores contrastados por fuentes públicas. No se eligió un nicho comercial.
| Subrubro | Por qué encaja | Oferta ya cubre | Pregunta por validar |
|---|---|---|---|
| Salones/barberías/servicios de belleza no clínicos | Cita, profesional, llegada, espera y cierre | Square automatiza confirmar/cancelar/reprogramar por SMS; Mangomint documenta check-in y espera | ¿Qué decisión importante sigue resolviendo el encargado fuera del sistema? |
| Estética canina en local | Duración según servicio/mascota, revisión previa, cambios y espera | MoeGo gestiona aceptar/rechazar/espera y datos de solicitud | ¿Reducir clasificación incorrecta y pendientes aporta más que funciones actuales? |
| Detailing/tintado automotriz en taller | Cita, recepción del vehículo, revisión, trabajo y entrega | Urable anuncia inspecciones, mensajes, workflows y tareas | ¿El problema principal es recepción o requiere gestión de taller completa? |

Servicios a domicilio, clases/instructores y otros rubros quedan como ampliaciones posibles, sin ficha suficiente para recomendar. En domicilio se suman traslado y rutas; no asumir mismo producto sin cambios.

## Evidencia y límites
Square Assistant documenta actualización de agenda por respuestas SMS del cliente. No decir que “nadie tiene asistente” ni que nuestra novedad sea aviso o cambio automático.
Mangomint documenta aviso previo, check-in del cliente y alerta al proveedor. Llegada/espera ya tienen cobertura.
MoeGo documenta solicitudes aceptadas/rechazadas/espera, revisión de datos y programación; no suponer que carece de reglas o excepciones.
Urable anuncia inspección por fotos/videos vinculada al trabajo y otras herramientas de operación. Necesidad de recepción no implica que quieran sustituir su CRM.
Dos hilos de grooming aportan señales autodeclaradas: reservas con información incorrecta cambian duración y ausencias dejan espacios. No son tasa de incidencias ni demostración de compra de Lana. No deducir que software garantiza asistencia; políticas y conducta influyen.
En esta pasada no medimos precios completos, satisfacción, capacidad de integración ni funciones de IA de todos los proveedores.

## Dónde buscar ventaja
Hipótesis: el encargado ve excepciones ordenadas, entiende sus consecuencias y resuelve con pocas acciones, sin reconstruir contexto entre agenda y mensajes. La diferencia debe ser medida en tareas concretas, no simplemente “asistente conectado al proceso”.
Disposición a sustituir su sistema vs añadir una capa: investigar ambas. Para un mini software propio, migración y hábito de uso son costes; para una capa, conectores y captura doble son costes. No decidir arquitectura antes de elegir público.
Primer grupo propuesto para investigar: estética canina en local, porque encontramos dificultades concretas de duración/revisión y ausencia. No es recomendación de construir ahí: MoeGo ya cubre buena parte. Belleza no clínica sirve como contraste fiel al flujo base; detailing como contraste de trabajo más largo.

## Próximo paso
Preparar una ficha de comprador y una jornada ficticia de recepción para grooming y belleza: nuevas citas, cambio solicitado, dato faltante, retraso y ausencia. Por cada caso comparar qué resuelve el competidor y qué trabajo queda fuera. Datos ficticios para demostrar lógica, no validar mercado.
Elegir sector solo si se identifica una tarea repetida y costosa que explique por qué cambiar/pagar. No abrir nuevas familias de productos mientras se hace esta comparación.
Alcance inicial candidato: una sede, agenda y pendientes, uno o pocos profesionales, un canal de captura, resumen de actividad y resolución de excepciones. Tamaño preciso pendiente.
Voz/telefonía, múltiples canales, POS, inventario, rutas y motor universal quedan fuera de primera definición salvo que el comprador los haga imprescindibles. No comprometer duración de beta, precio o ingresos aún.
No editar el código canónico de Lana/frontdesk o Athena desde esta investigación. Arquitectura histórica no auditada.

## Fuentes
- Square Assistant: https://api.squareup.com/help/us/en/article/6731-get-started-with-square-assistant-on-appointments
- Mangomint: https://www.mangomint.com/features/virtual-waiting-room/
- MoeGo solicitudes: https://help.moego.pet/en/articles/13764431-online-booking-booking-request
- Urable inspecciones: https://urable.com/inspections/
- Grooming: reservas incorrectas: https://www.reddit.com/r/doggrooming/comments/1s74kew/anyone_else_have_a_love_hate_relationship_with/
- Grooming: ausencias: https://www.reddit.com/r/doggrooming/comments/1rh7ysm/the_noshow_epidemic_is_getting_out_of_hand/

Sin contacto, mensajes externos, gasto, lanzamiento ni construcción.
