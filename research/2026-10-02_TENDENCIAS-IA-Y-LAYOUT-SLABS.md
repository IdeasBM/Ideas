# Tendencias de IA aplicada y layouts de slabs desde celular
Fecha local: 2026-10-02. Fuentes consultadas 2026-10-03 UTC.

## Petición y dictamen
Investigar necesidades del mercado digital/IA y una nueva hipótesis basada en experiencia en countertops: foto de slab con celular + geometría medida de piezas + propuesta de acomodo que respete vetas.
Dictamen preliminar: técnicamente plausible como planificación visual; precisión de producción y emparejamiento automático pendientes de demostrar. Competencia directa ya anuncia celular, calibración, vista previa y exportación. No seleccionar para desarrollo por precio menor o uso de IA solamente. Mantener como candidato de investigación con mejor contexto de oficio, sin garantía de negocio.

## Señales generales del mercado
La OECD D4SME 2026 informa adopción de herramientas disponibles y una integración operativa desigual, con barreras de tiempo, mantenimiento y habilidades. Muestra no representativa de más de 2,000 pymes de 12 países: no extrapolar porcentajes al mercado estadounidense.
El informe SF Fed de julio 2026 analiza respuestas de una encuesta 2024: productividad, comunicaciones, marketing, atención, análisis y aplicaciones específicas; barreras de implementación y preocupaciones de exactitud. Es evidencia histórica publicada recientemente, no medición de demanda de octubre 2026.
Inferencia para Ideas: buscar resultados concretos y repetibles dentro del oficio, una revisión de excepciones o un traspaso entre sistemas. No basta con un chatbot, dashboard o “agente” genérico. La investigación anterior de foros/marketplaces aporta señales de integración, pero todavía no pagos por nuestro producto.
No tenemos ranking representativo de apps más demandadas, TAM ni pronóstico de crecimiento. No usar tasas de adopción como intención de comprar nuestra solución.

| Dirección a investigar | Resultado vendible hipotético | Evidencia disponible | Qué falta |
|---|---|---|---|
| Operación entre herramientas | Saber qué caso quedó incompleto y resolverlo | OECD + anuncios previos de integración | Proceso/comprador recurrente y competencia |
| Documentos contra registros | Detectar discrepancias y revisar excepciones | Anuncios previos facturas/ERP/Excel | Precisión, coste e integración comunes |
| Herramienta visual de oficio | Evaluar acomodo real antes de cortar | Competidores específicos de piedra | Diferencia comercial y prueba de captura |
| Adopción práctica | Reducir tiempo de configuración/aprendizaje | Barreras OECD/SF Fed | Separar servicio humano de producto |

Estas son hipótesis derivadas, no recomendaciones de inversión ni categorías nuevas sin competencia.

## Competencia de layouts
Todas las funciones siguientes son declaraciones o documentación del proveedor, no pruebas nuestras.
| Oferta | Cobertura consultada | Precio público recuperado | Cautela |
|---|---|---|---|
| Slabsmith | Layout al pie de sierra; Lite incorpora vista previa de dos slabs; fotostation con hardware recomendado | Layout USD 3,500; Lite USD 8,000; hardware excluido | Versiones distintas: no comparar Lite con toda la suite como si fueran iguales. Coste total de instalación no calculado |
| SlabKast | Foto de teléfono, calibración con referencias, vetas, aprobación y DXF | USD 149/mes | Competidor muy próximo; precisión declarada no verificada independientemente |
| StoneFlow Mapper | Foto de teléfono/cámara, importación DXF, colocación, vista de vetas, exportación | USD 2,500 pago único, licencia perpetua; un año de mantenimiento incluido | Costes posteriores no verificados; no prueba de exactitud realizada |
| MeasureSquare Stone | Auto Plan optimiza aprovechamiento; documentación indica que NO empareja vetas; modo manual con foto y vista previa | No recuperado | No generalizar esta limitación a todos los proveedores |

Slabsmith no se presenta como único producto del sector ni como usado por todos. Su propia documentación confirma requisitos concretos de hardware para fotostation; no se afirma que todas sus versiones obliguen a idéntico equipo. La página recomendada de hardware lleva fecha 2020; no presupuestamos con sus precios históricos.
Hay otras ofertas indexadas (AXISA, SlabLayout, iCounterSoft, StoneCal): pendientes de ficha y pruebas. No se cuentan como clientes ni como demanda.
No encontramos en esta pasada una validación independiente de la exactitud de SlabKast. Su afirmación de 1–2 mm y de tolerancias “habituales” no se adopta como estándar del oficio.

## Qué significaría construirlo
Tres capacidades distintas:
1. Planificación visual: colocar piezas medidas sobre textura del slab y mostrar ensamblado, seams y waterfalls.
2. Optimización asistida: proponer acomodos según material aprovechado y continuidad visual, con alternativas y aprobación del operador.
3. Transferencia a producción: posiciones verificadas, restricciones de corte y registro físico en la máquina. DXF geométrico no equivale a programa CAM ni garantiza corte correcto.

### Captura y escala
Una foto puede rectificarse para un plano mediante correspondencias con coordenadas conocidas. OpenCV documenta homografía y calibración de distorsión radial/tangencial. Inferencia: dimensiones generales del slab solas no garantizan escala local correcta en una foto oblicua de borde irregular.
Necesitaríamos referencias coplanares de geometría conocida, tratamiento de distorsión de lente y comprobaciones independientes repartidas por la superficie. Cuatro puntos pueden ajustar una transformación, pero no verifican por sí mismos su error. Lente, enfoque, zoom, resolución, posición, reflejos y textura afectan captura. No fijar megapíxeles mínimos o lista de teléfonos antes de medir resultados.
La iluminación sigue importando para ver las vetas aunque se use celular; el teléfono no recupera textura oculta por reflejos. No modificar generativamente las vetas de la imagen utilizada como evidencia de material real.

### Geometría y optimización
Las piezas llegan de dimensiones confirmadas o DXF; la foto no sustituye el templating del sitio de instalación. Separar medidas de la pieza final de posición visual en el slab.
Registrar ancho de corte, sobremedidas, zonas excluidas, orientación, piezas adyacentes, reversos permitidos y restricciones de sierra. Una pieza “cabe” no implica que pueda cortarse con la secuencia/máquina disponible.
Optimizar rendimiento y continuidad puede exigir sacrificar una meta para mejorar la otra. El patrón puede impedir una unión perfecta: presentar alternativas, no prometer continuidad imposible.
Hipótesis técnica: visión identifica candidatos de vetas y un optimizador busca posiciones bajo restricciones; reglas geométricas verifican colisiones/márgenes y un operador valida estética. Un modelo de lenguaje no calcula ni certifica posiciones por sí solo.

## Dónde podría haber diferencia
No son huecos probados:
- Sugerencias automáticas de continuidad entre piezas, frente a colocación manual. Solo MeasureSquare quedó documentado con esa limitación; revisar competidores antes de afirmar novedad.
- Menor tiempo total de captura/calibración y rechazo claro de fotos deficientes.
- Uso puntual, remanentes o taller pequeño con un flujo limitado; disposición de pago desconocida.
- Aprobación y entrega de la versión correcta al taller; SlabKast ya anuncia aprobación, por lo que esta función sola no diferencia.
Español, menor precio y experiencia del creador pueden ayudar a distribución/usabilidad, pero no bastan para elegir.

## Investigación siguiente y prueba condicionada
Primero comparar a fondo SlabKast, Mapper, Slabsmith y MeasureSquare: captura real, requisitos, vetas automáticas/manuales, DXF, soporte, costes completos y restricciones. Buscar quejas de operadores finales y soluciones usadas, sin confundir marketing con testimonios.
Si aparece diferencia concreta, preparar protocolo con material de prueba permitido: varias fotos de una superficie plana con patrón y distancias independientes medidas. Separar calibración de puntos de comprobación; repetir posiciones, lentes, luz y dispositivos. Medir errores máximos/locales, repetibilidad, rechazos y tiempo. Tolerancia la debe definir el caso de uso y el operador; no escoger 1–2 mm por una página comercial.
Para continuidad, comparar propuesta automática con una colocación manual en los mismos casos, evaluando tiempo, desperdicio, continuidad y correcciones necesarias.
Un ensayo visual puede justificar prototipo; exportación para corte exige validación adicional de registro, geometría, CAM y proceso físico. No se autoriza producción, compra de software ni contacto por este documento.
Criterio de descarte: alternativas satisfacen el flujo a coste aceptable, no hay fallo recurrente pendiente o la captura sencilla no mantiene precisión necesaria. Criterio de avance: diferencia observable + compradores identificables + resultado repetible. Aún ninguno cumplido.

## Fuentes
- OECD 2026 D4SME: https://www.oecd.org/en/publications/empowering-smes-in-the-age-of-ai_bf5a9816-en.html
- SF Fed, publicación 2026 con datos 2024: https://www.frbsf.org/research-and-insights/publications/community-development-research-briefs/2026/07/ai-adoption-in-small-businesses-2024-sbcs/
- Slabsmith precios: https://www.slabsmith.com/slabsmithpricing/
- Slabsmith hardware: https://www.slabsmith.com/recommended-hardware/
- SlabKast precios: https://slabkast.com/pricing
- SlabKast captura: https://slabkast.com/solutions/slab-photo-calibration
- Mapper: https://www.stoneflowtech.com/
- MeasureSquare instrucciones: https://measuresquare.zohodesk.com/portal/en/kb/articles/how-to-use-the-slab-layout-module-in-measuresquare-stone
- OpenCV calibración: https://docs.opencv.org/4.13.0/d4/d94/tutorial_camera_calibration.html
- OpenCV homografía: https://docs.opencv.org/4.13.0/d9/dab/tutorial_homography.html

Investigación documental. Sin pruebas de software, cotizaciones, validación física, compradores propios ni construcción. Dashboard central de actividad se conserva como hipótesis paralela, acotada a un proceso; no se mezclan ambos en un producto universal.
