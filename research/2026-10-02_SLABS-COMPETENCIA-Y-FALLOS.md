# Slabs: sugerencias automáticas, competencia y fallos
Fecha local 2026-10-02. Consulta 2026-10-03 UTC.

## Dictamen
Mantener investigación; no iniciar producto completo ni asumir hueco en sugerencias automáticas. La pasada anterior identificó una limitación documentada de MeasureSquare, no ausencia de soluciones del mercado. Lithiq anuncia precisamente sugerencias de acomodo con vetas/bookmatching. La función puede tener espacio por calidad, facilidad o coste, pero todavía no demostramos superioridad, demanda propia ni economía.

## Comparación funcional
| Proveedor | Evidencia recuperada | Conclusión permitida |
|---|---|---|
| SlabKast | Describe mover, girar y posicionar piezas sobre imagen calibrada; vista ensamblada, waterfalls, aprobación | Flujo manual documentado. Ausencia de anuncio automático en esta página no prueba que no exista en el producto |
| Slabsmith | Guía Park Industries describe mover/girar piezas, guardar layout aprobado y volver a Alphacam para programación | Trabajo manual documentado en ese flujo específico; no auditoría exhaustiva de versiones |
| Mapper | Página previamente consultada documenta colocar piezas y vista de vetas | Automático de vetas no demostrado por esa documentación, ni descartado |
| MeasureSquare | Documentación previamente consultada: Auto Plan prioriza rendimiento sin vetas, modo manual para vetas | Limitación explícita de ese modo |
| LithiqMatch | Página de funciones anuncia acomodo recomendado, consideración de vetas/espesor, detección de bookmatch y ajustes del operador | Competencia directa declarada; no ejecución ni calidad verificadas, precio no recuperado |
| SlabWise | Página anuncia AI nesting y consideración de patrón; interfaz recuperada pide dimensiones y piezas | No pudimos comprobar cómo ingresa textura ni cómo alinea vetas reales; anuncio no equivale a capacidad demostrada |

No calificamos la madurez, precisión o clientes de las nuevas ofertas a partir de sus páginas. No se probaron productos ni se contrataron demos.

## Evidencia de usuarios
1. Hilo “Slab Layout Software”: autor busca colocar fotos y medidas para explicar al cliente qué puede visualizarse y por qué falta material para bookmatch. Es demanda de comunicación visual; el hilo ofrece alternativas ya existentes. Publicación histórica (~2 años según página), no demanda nueva sin solución.
2. Hilo de instalación decepcionante y su actualización: mismo autor/caso, NO dos compradores. Relata planificación larga, servicio adicional de USD1,000 y diferencia entre diseño y resultado; también defectos de fabricación/instalación ajenos a un optimizador. Cifras autodeclaradas, no verificadas. Un comentario cuestiona que las capturas correspondan realmente a Slabsmith. No atribuir el fallo a esa marca ni usar USD1,000 como precio SaaS.
3. Otros hilos de seam matching/showroom aparecieron indexados pero no se recuperaron íntegramente en esta pasada; no se usan para cuantificar demanda o tiempo ahorrado.

No hay muestra representativa de operadores, tasa de errores ni pérdida media. Las promesas del proveedor de evitar remakes no son pérdidas independientes medidas.

## Hallazgo técnico de traspaso
La guía de Park Industries separa layout y programación CAM. Después de aprobar/guardar se importa DXF a Alphacam, se ajusta geometría, propiedades, ubicación y operaciones según máquina. Slabsmith documenta métodos para alinear el slab físico con el layout usando cámara/láser o fixtures.
Inferencia: un acomodo visual bueno puede fallar en la ejecución si ubicación, sobremedidas, espesor, orientación o montaje no corresponden. Un nuevo generador de propuestas no corrige por sí solo fabricación deficiente. Tampoco es una oportunidad inédita de traspaso: el proveedor ya documenta ese proceso.

## Tres posibles apuestas y decisión
| Apuesta | Ventaja hipotética | Riesgo | Decisión |
|---|---|---|---|
| App completa celular → corte | Flujo accesible completo | Competencia próxima + calibración + CAD/CAM + soporte | No empezar aquí |
| Asistente de continuidad para layout existente | Ahorrar búsqueda de posiciones con alternativas evaluables | Lithiq ya lo anuncia; integración, estética y calidad por demostrar | Priorizar comprobación |
| Verificación de aprobado → producción | Detectar versión u orientación incorrecta | Fallos humanos/físicos; aprobación ya cubierta por otros | Mantener como contraste, sin proclamar hueco |

La propuesta más acotada sería sugerir alternativas para una unión prioritaria sobre foto ya calibrada y piezas con geometría confirmada. No reemplazar captura, templating ni CAM en una primera evaluación. Esto es una hipótesis para acotar investigación, no producto elegido.

## Prueba que permitiría decidir
Antes de código: reunir un conjunto permitido de casos, sin datos internos del empleador/cliente. Cada caso necesita textura real, geometrías, relación de unión, zona utilizable, restricciones de giro, ancho de corte y criterio de aceptación del operador.
Comparar herramientas disponibles mediante documentación/demostraciones públicas y, si después se autoriza acceso, el mismo caso:
- ¿Genera posiciones automáticamente o solo permite moverlas?
- ¿Compara textura en la unión o solo dirección general?
- ¿Respeta pieza real, material disponible, restricciones y margen?
- ¿Permite elegir continuidad frente a rendimiento?
- ¿Cuántas correcciones y cuánto tiempo exige frente a un operador?
- ¿El resultado mantiene el vínculo entre propuesta, aprobación y salida?

Si se justifica una prueba algorítmica, usar casos geométricos controlados y texturas autorizadas: una unión recta, giro de esquina y waterfall como casos separados. Incluir patrón sin solución continua y foto deficiente, para comprobar rechazo y límites. Comparar con colocación manual experta. Definir métricas de tiempo, correcciones, desperdicio y valoración estética antes de probar. No prometer ahorro o precisión con casos sintéticos solamente.
Condición para avance comercial: varios talleres finales presentan el mismo trabajo lento/costoso, un competidor concreto no les basta y existe disposición a una prueba con precio. No hay ese resultado todavía.

## Fuentes
- SlabKast flujo de vetas: https://slabkast.com/solutions/vein-matching-software
- Lithiq: https://www.lithiqstudios.com/features/ai-slab-nesting
- SlabWise: https://slabwise.com/tools/nesting
- Solicitud de visualización: https://www.reddit.com/r/CounterTops/comments/1fnulpn/slab_layout_software/
- Caso instalación: https://www.reddit.com/r/CounterTops/comments/1sybxqc/disappointed_spent_24k_and_7_hours_on_slab_smith/
- Actualización mismo caso: https://www.reddit.com/r/CounterTops/comments/1syhzb9/update_on_the_slab_smith_program_for_those_asking/
- Park Industries, secuencias de programación específicas: https://www.parkindustries.com/wp-content/uploads/2024/07/4.18.2025-Master-with-Javelin.pdf
- Registro físico Slabsmith: https://www.slabsmith.com/locating-a-slab/

Antecedente: 2026-10-02_TENDENCIAS-IA-Y-LAYOUT-SLABS.md. Sin gasto, contacto, descarga/ejecución de competidores, código ni exportación para corte.
