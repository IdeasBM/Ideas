# Venta de diseños imprimibles 3D
2026-10-02 · Ampliación de IDEAS-009

## Conclusión provisional
Vender diseños propios es un modelo distinto de fabricar y enviar piezas. Permite comenzar sin impresora propia, aunque verificar un producto imprimible tiene costo.
Hay compradores observables de archivos de organizadores, plantillas de taller y figuras articuladas. No conocemos ventas mensuales, adquisición o rentabilidad.
Prioridad de investigación por encaje: diseños funcionales paramétricos, organizadores para un uso concreto y ayudas de medición/marcado. No se afirma que tengan el mayor mercado.

## Qué compra el usuario
| Entregable | Función |
|---|---|
| Modelo CAD / fuente paramétrica | Permite diseñar o cambiar dimensiones |
| STL | Geometría mallada de una pieza; no es una ruta universal de máquina |
| 3MF | Puede contener modelo y, según cómo se guarde, configuración del proyecto |
| G-code | Instrucciones generadas por el laminador para un perfil de máquina |
| Render | Imagen de presentación; no verifica imprimibilidad |

Prusa describe geometría STL, proyectos 3MF y el paso de laminado a G-code:
https://help.prusa3d.com/article/saving-projects-as-3mf_1773
https://help.prusa3d.com/article/first-print-with-prusaslicer-2-9_1753
Para un catálogo amplio, propuesta: STL más guía, y 3MF probado con perfil explícito si aporta valor. No vender G-code como universal.
La impresora ejecuta; el valor del diseño también depende del uso, ajuste y facilidad de impresión.

## Comparables de archivos pagados
Datos recuperados el 2026-10-02. Precios anunciados, no precios medios pagados; reseñas del artículo, no ventas mensuales.
| Categoría | Comparable | Precio US$ observado | Señal |
|---|---|---:|---|
| Taller | Clamping Jig Bundle | 9.99 | Sin reseñas del artículo en apertura directa |
| Taller | Radius Jigs | 20.00 | 2 reseñas del artículo, de 2024 |
| Organización | Modular Desktop Organizer | 2.79 promocional | 10 reseñas, algunas mencionan impresión |
| Organización | Stackable Storage Box | 2.35 | 2 reseñas; una menciona ayuda para imprimir |
| Articulados | Torua3D Dragon 008 | ND | 45 reseñas del artículo |
| Juegos de mesa | Dump City Terrain | ND | 3 reseñas del artículo; experiencias mixtas |

Fuentes:
1. https://www.etsy.com/listing/4401382711/clamping-jig-bundle-digital-3d-printing
2. https://www.etsy.com/listing/1659603568/radius-jigs-stackable-and-mountable-10
3. https://www.etsy.com/listing/1857130986/3d-desktop-organizer-kea-style-modular
4. https://www.etsy.com/listing/4432011892/stackable-storage-box-stl-file-3d-print
5. https://www.etsy.com/listing/1441714772/articulated-dragon-3d-print-file-stl
6. https://www.etsy.com/listing/4377799945/3d-miniatures-stl-files-modular-terrain

Hallazgo metodológico: un resultado de mercado mostraba un número junto al bundle de clamps; la página directa no tiene reseñas de ese artículo. No usar ese número como demanda.
No ordenar categorías por reseñas de un ejemplo: edad, exposición, producto y vendedor difieren.

## Áreas a investigar
| Área | Ventaja posible | Obstáculo | Prioridad por encaje |
|---|---|---|---|
| Organizadores técnicos modulares | Resolver medidas y distribución concretas | Muchos modelos gratuitos | Alta |
| Ayudas de marcado/medición de taller | Experiencia de proceso y geometría | Verificación de precisión y uso | Alta |
| Soportes/adaptadores para equipos concretos | Compatibilidad clara | Acceso al equipo y variantes | Media-alta |
| Accesorios de sim racing | Público reconocible | Ajuste y alternativas existentes | Media |
| Figuras articuladas | Compras observables | Diseño orgánico, articulaciones y originalidad | Explorar |
| Terreno para juegos de mesa | Venta por colecciones | Conocer escala, estilo y público | Explorar |
| Decoración genérica | Fácil de mostrar | Diferenciación aún no definida | Menor inicialmente |

Un sistema paramétrico podría generar variantes desde dimensiones, sin redibujar todas. Hay alternativas gratuitas paramétricas: que se pueda programar no basta para cobrar.
Propuesta a contrastar: pocas variantes probadas más instrucciones claras, en lugar de un configurador abierto que genere soporte ilimitado.

## Plataformas y modalidad
| Plataforma | Condiciones observadas | Limitación |
|---|---|---|
| Cults3D | Publica 80% del precio neto para creador, 20% de comisión | Resultado oficial; apertura falló, verificar antes de lanzar |
| MyMiniFactory | 15/12.5/10% por nivel más procesamiento; requiere suscripción Premium Creator | Cuota de suscripción no cuantificada aquí |
| Printables Store | Anuncio oficial de lanzamiento publica 20%, sin cuota mensual de tienda | Fuente histórica; revisar condiciones actuales al decidir |
| Etsy | Descarga individual/bundle; comisiones y procesamiento | Canal posible, visibilidad no garantizada |
| Gumroad | Descarga, bundles y otras modalidades | Necesidad de distribución propia o Discover |

Fuentes:
https://cults3d.com/en/upload
https://creator.myminifactory.com/store-manager-fees
https://creator.myminifactory.com/become-a-premium-creator
https://blog.prusa3d.com/printables-store_87810/
https://www.etsy.com/legal/fees/
https://gumroad.com/pricing

Modalidades a comparar: archivo individual, bundle, fuente editable y licencia comercial para vender impresiones. La licencia personal no equivale a permiso de reventa.
No redactamos todavía una licencia contractual; primero definir qué producto, derechos y canal queremos ofrecer.

## Herramientas y viabilidad de creación
OpenSCAD permite crear modelos con scripts, variables y módulos:
https://openscad.org/documentation.html
https://files.openscad.org/documentation/manual/The_OpenSCAD_Language.html
Inferencia: encaja con piezas geométricas y pensamiento de programación del responsable. Puede servir para generar variantes; CAD visual también puede ser apropiado.
No se eligió herramienta definitiva, ni se validó todavía un diseño propio.
El asistente puede ayudar a escribir geometría paramétrica, revisar dimensiones, producir archivos y documentación. La inspección digital no sustituye el ajuste físico.

## Ruta sin impresora propia
1. Elegir un problema y revisar alternativas gratuitas/pagadas.
2. Diseñar geometría original y publicar internamente dimensiones objetivo.
3. Verificar malla, escala, paredes, piezas conectadas y laminado con perfiles definidos.
4. Encargar una muestra a un servicio o colaborador con impresión; sin contactar a nadie todavía.
5. Medir y fotografiar pieza, probar ajuste/función y corregir.
6. Si se promete compatibilidad amplia, probar una segunda configuración relevante.
7. Entregar archivos, guía y especificación de lo realmente probado.

Pruebas externas pueden requerir dinero y varias iteraciones; no se cotizaron. No hace falta comprar una máquina para iniciar investigación ni diseño.
Prusa explica tolerancias y orientación:
https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135

## Paquete mínimo para evaluar
- Archivo original, unidades y versión.
- Variantes limitadas.
- Guía con material, orientación, parámetros y componentes necesarios.
- Perfil probado si se incluye 3MF.
- Fotos del prototipo, además de renders.
- Tabla de medidas y límites de compatibilidad.
- Condiciones de uso y acceso a actualizaciones definidas.
- Ejemplo resuelto y preguntas frecuentes.

## Costos y soporte
Sin logística por venta, permanecen diseño, muestras, plataforma, devoluciones, actualización y soporte.
Contribución = precio − tarifas variables − devoluciones esperadas − adquisición − soporte variable.
Recuperación = inversión inicial / contribución positiva. No convertir reseñas o descargas gratis en pronóstico.
Un archivo de pocos dólares tolera poco soporte individual; bundles y documentación pueden mejorar economía, pero hay que medirlo.

## Siguiente entregable
Comparar 10 referencias de archivos funcionales (incluyendo gratuitos) para un problema concreto; estudiar comentarios y definir una ventaja observable.
Prioridad provisional: organización modular de herramientas con identificación intercambiable, contrastada contra soluciones ya existentes.
No se ha elegido producto, comprado software/impresora ni encargado muestras.
