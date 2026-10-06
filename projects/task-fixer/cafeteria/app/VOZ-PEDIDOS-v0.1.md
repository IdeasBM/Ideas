# Pedidos por voz · especificación inicial v0.1

6 de octubre de 2026 · Tarjeta #21 · Prioridad adelantada por el responsable.
Estado: diseño preparado para construir un prototipo, no instalado en la app.
#14 y #15 quedan pendientes de capacitación/uso; no bloquean este diseño ni un prototipo en demo.

## Problema y objetivo
En el recreo se acumulan alumnos mientras Edgar despacha. Reducir captura por producto y selección repetida, conservando un cargo correcto por alumno. Medir tiempo/pedido, correcciones y pedidos perdidos frente a captura táctil. No prometer manos libres permanente sin prueba en el teléfono y ruido reales.

## Experiencia propuesta
Botón grande «Pedidos por voz» dentro de Venta. Se activa conscientemente el micrófono y aparece «Escuchando» o «Micrófono pausado». Opcionalmente fijar nivel/grado/grupo de la fila; se muestra siempre y no adivina grupos nuevos.

El operador dicta: «Nuevo pedido para Ana Pérez de tercero A de primaria: tres chocolates y una torta, a crédito». La app muestra tarjeta con alumno resuelto, productos, cantidades, importe y pago. Los precios salen del menú; el motor calcula el total. La IA no calcula precios ni decide cuentas.

Prototipo inicial: interpretar y preparar tarjetas; confirmar con un botón grande. El objetivo siguiente es «confirmar y siguiente» por voz, tras validar ruido/comandos ajenos. La confirmación audible sigue el resumen del pedido; no se considera revisado solo porque el primer dictado incluyó confirmar. Conservar opción táctil en ambas fases.

No usar «Hey» como promesa de activación desde app cerrada/pantalla bloqueada. Una sesión activa en primer plano puede reconocer frases de control; micrófono siempre activo y activación tipo Alexa quedan fuera del primer alcance.

## Comandos y significado

| Comando | Resultado |
|---|---|
| Nuevo pedido para … | Abre borrador con destinatario; pide grupo/nivel si falta y hay homónimos. |
| Tres chocolates y una torta | Añade renglones; cantidades se vinculan al producto exacto. |
| A crédito / pago en efectivo | Define cómo registrar; no supone pago recibido por el nombre del alumno. |
| Cambia a dos chocolates | Propone sustitución de cantidad identificada; no añade otros dos por error. |
| Quita la torta | Retira el renglón identificado. |
| Siguiente pedido | Conserva el borrador en cola y abre otro. Por sí solo NO cobra ni guarda una venta. |
| Confirmar y siguiente | Objetivo de fase posterior: confirmar una propuesta ya resuelta/revisada y abrir otra; un registro único. |
| Cancelar pedido | Cancela borrador identificado, sin movimiento contable. Una venta guardada requiere la corrección existente. |
| Pausar / terminar voz | Detiene el micrófono. Advierte de pedidos pendientes; no confirma lote automáticamente. |

Para efectivo se requiere importe recibido si el flujo actual lo exige, y se muestra cambio. Para crédito se requiere alumno activo. Un modo predeterminado de crédito por alumno puede evaluarse, pero debe configurarse explícitamente y mostrarse; el prototipo no lo asume.

## Cola de pedidos y estados
Borrador → necesita dato / listo para revisar → confirmando → guardado.
Cancelado es terminal para borrador; error de guardado conserva pedido pendiente.
Pedidos pendientes y ventas confirmadas se distinguen visualmente, con contador y tarjetas recientes. Guardado solo aparece después del commit local exitoso. Un pedido en cola no reduce saldo ni inventario ni cuenta como vendido.

No bloquear la captura del pedido siguiente esperando una transcripción anterior: identificar cada fragmento por sesión/pedido, ordenarlos y evitar aplicar una respuesta tardía al alumno nuevo. Tope de cola visible para no acumular despachos entregados sin cargos revisados. Al terminar, revisar pendientes de forma explícita.

No suponer que guardar una venta significa entregar físicamente el alimento. Seguimiento de entrega queda fuera de v0.1.

## Resolución de nombres y productos
Catálogos del negocio: identificadores internos, nombres/apellidos, nivel/grado/grupo; productos activos y alias aprobados por operador. Normalización de mayúsculas/acentos sirve para buscar, no fusiona dos alumnos distintos.

Candidato único puede prepararse para revisión. Varios Juan de tercero A requieren nivel/apellido u otra selección explícita. «Chocolate» que coincide con varios productos pide variante. Producto desconocido no se crea automáticamente. Cantidades ilegibles, precio cambiado o producto retirado bloquean confirmación hasta revisar.

Resultados parciales del reconocedor solo muestran texto provisional. Solo resultados finales forman propuesta. Silencio, confianza del modelo o frase de un tercero no equivalen a autorización de venta.

## Arquitectura e integración
1. Adaptador de voz obtiene texto final, errores y estado de micrófono.
2. Intérprete convierte texto en intención estructurada, sin acceso directo a saldos.
3. Resolutor valida IDs/cantidades/alumno/modalidad contra catálogo.
4. Cola mantiene borradores y referencias; motor existente prepara/guarda al confirmar.
5. Guardado usa controles actuales: caja abierta, permiso de equipo, revisión, cifrado local y respaldo.

Contrato de pedido: id estable, id de sesión, secuencia, alumnoId/null, productos con productoId/cantidad, modalidad, efectivoRecibido/null, campos faltantes, revisión del catálogo, estado y clave de idempotencia. No almacenar importe decidido por IA como fuente contable.

Hoy vault.saveDraft admite un único carrito de cantidades. La cola requiere extender el payload cifrado de borradores con validación/migración; no introducir alumnos o transcripciones en localStorage plano. Conservar compatibilidad del carrito previo y no convertir cola a eventos financieros al recuperar. Al bloquear, parar micrófono y conservar cola validada; no retranscribir/confirmar al desbloquear.

La voz no necesita inventario calculado: registra la venta con el motor actual. Cuando #17/#18 existan, sus movimientos se aplican al mismo evento confirmado, sin duplicar descuento.

## Viabilidad de captura · revisión técnica
SpeechRecognition tiene disponibilidad limitada entre navegadores. En algunos, como Chrome, usa reconocimiento remoto y no funciona offline; la disponibilidad de reconocimiento local debe probarse, no inferirse de que la app ya vende sin red. Safari incorporó reconocimiento con el motor de Siri, pero eso no garantiza una sesión continua estable en el dispositivo objetivo.

Primera prueba técnica: detectar API/prefijo disponible, permiso de micrófono, español, resultados finales, cortes de sesión y retorno de primer plano en Safari real. Comparar segmentos breves con sesión continua. Si falla o corta demasiado, evaluar grabación de segmentos y servicio de transcripción autenticado vía servidor; estimar latencia/costo antes de seleccionar proveedor. No poner claves de servicio en HTML.

Mostrar claramente si el dictado necesita conexión. Captura táctil offline sigue disponible. No guardar audio pendiente por defecto ni prometer transcripción futura automática: requiere definir retención, consentimiento y tamaño. No usar voz sintetizada simultánea hasta comprobar que no reingresa como comando ni interrumpe escucha.

Fuentes consultadas el 6 de octubre de 2026:
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
- https://webkit.org/blog/11648/new-webkit-features-in-safari-14-1/

## Pruebas y aceptación
- Pedido de tres chocolates y una torta resuelve cantidades, precio del catálogo y destinatario correcto.
- Homónimos entre niveles no producen cargos; pedir solo dato faltante.
- «Siguiente pedido» conserva dos borradores separados, sin ventas.
- Confirmar dos veces/repetición de resultado genera una sola venta por pedido.
- Respuesta tardía no modifica el siguiente pedido.
- Crédito no incrementa efectivo; efectivo no crea deuda.
- Sin caja/permiso, falla de escritura, producto retirado o alumno inexistente no muestran éxito.
- Reinicio/bloqueo conservan borradores, no los contabilizan.
- Permiso denegado, red caída o reconocedor cortado permiten seguir táctil y muestran micrófono real.
- Ensayo con voz de terceros y ruido: no activar cargos automáticamente.
- Capturar serie de al menos 20 pedidos ficticios con catálogo sintético; ninguna cuenta errónea ni duplicado aceptables.
- Medir tiempos y correcciones; aprobar uso real solo si mejora frente a captura actual y errores están resueltos.

## Pasos de construcción
A. Prototipo de texto/intenciones y cola con datos ficticios y motor actual; sin dependencia de micrófono.
B. Prueba de micrófono/español/continuidad en Safari objetivo y selección de adaptador.
C. Propuesta visual + confirmación táctil, persistencia cifrada y pruebas de fallos.
D. Piloto de recreo; después valorar confirmación por voz y ajustes.

Este documento adelanta trabajo de #21 por decisión del usuario. No altera el instalado de Edgar ni obliga a cambiar su capacitación de hoy.
