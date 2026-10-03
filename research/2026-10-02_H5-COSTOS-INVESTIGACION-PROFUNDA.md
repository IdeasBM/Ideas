# H5 — Investigación profunda y propuesta de prueba
Fecha local: 2026-10-02. Resultado: candidata condicionada; se debilita la ventaja inicialmente propuesta.

## Hallazgo decisivo
No construir una calculadora genérica ni presentar previsto/real como innovación. La competencia incluye hojas muy económicas, ejemplos e instrucciones y herramientas gratuitas de costeo real frente a cotizado.
Se conserva H5 para una muestra pequeña orientada a usabilidad; no se autoriza desarrollo amplio ni se afirma producto comercial validado.

## Comparables revisados
Precios anunciados al consultar, no importe pagado; funciones descritas por vendedores, no auditoría de archivos. No se adquirieron plantillas.
| Oferta | Precio observado | Incluye / evidencia | Límite |
|---|---:|---|---|
| SineWoodDesigns | US$3.95 | Sheets, material/mano de obra/gastos, beneficio por hora, ejemplo e instrucciones; 18 reseñas del producto | No conocemos volumen ni fórmulas internas |
| AtlasBuiltIt | US$1.64 promocional | Material, trabajo y overhead, desglose; 4 reseñas en barrido anterior | Promoción no es precio permanente |
| TimberHookStudio | US$69 en barrido anterior | 16 pestañas, cotización, materiales, pedidos, dashboard | Precio actual no reconfirmado; compras no verificadas |
| Polar Beaver Beginner | US$0 | Excel, video de explicación, archivo protegido | No descargado; restricciones de uso publicadas |
| Joinery.io | Calculadoras gratuitas; descargables A$79/año | Cotización, real/cotizado, margen/recargo, tarifa de taller, rendimiento de tableros | Mercados AU activos; no auditado ni probado |
| WoodWorkCalc | Calculadora visible, precio de acceso ND | Partidas, horas, gastos, recargo; copiar/exportar/imprimir anunciado | No se probó descarga ni acceso completo |

Fuentes:
- https://www.etsy.com/listing/1312446789/woodworking-project-pricing-spreadsheet
- https://www.etsy.com/listing/1788638732/woodworking-project-pricing-template
- https://www.etsy.com/listing/4532501997/woodworking-pricing-calculator
- https://www.polarbeaverwoodworking.com/products/pricing-sheet-beginner
- https://www.joinery.io/tools/index.html
- https://www.woodworkcalc.com/calculators/ultimate-project-calculator

## Conducta y fricciones
SineWood: reseñas indican utilidad para cotizar, poca experiencia informática en un caso y ayuda del vendedor en otro. No permiten medir soporte promedio.
Polar Beaver: una reseña denuncia cálculos incorrectos y dificultad para editar; el vendedor solicita detalles y remite al video. Es una queja individual no verificada, no prueba de fallo general del archivo.
La oportunidad plausible es confianza y uso correcto sin ayuda individual. Ejemplo e instrucciones ya existen; español por sí solo tampoco demuestra disposición a pagar.

## Público y alcance
Hipótesis de público: pequeño fabricante hispanohablante que vende lotes de objetos de madera y hoy estima costos informalmente. Propietario que decide precios, no operador sin responsabilidad comercial.
Hipótesis de tarea: costear un lote de 5–30 piezas, separar preparación/fabricación y revisar qué cambió al terminar.
Sin integración woodWOP, inventario, impuestos automáticos, optimizador de cortes ni recomendación universal de tarifa de máquina. Google Sheets como formato candidato; Excel ampliaría compatibilidad a verificar.
No garantizar precio de mercado, rentabilidad ni exactitud de datos introducidos.

## Promesa candidata
“Antes de vender un lote, entiende cuánto cuesta cada pieza y cuánto te queda; al terminar, comprueba dónde cambió.”
Diferenciación propuesta a probar:
- Recorrido breve en español y un ejemplo de lote que el alumno puede reproducir.
- Preparación explícita y reparto por piezas vendibles.
- Material cobrado completo vs fracción asignada con criterio documentado.
- Rechazos, retrabajo y cambios registrados sin contar dos veces costos.
- Fórmulas explicadas y resultados de comprobación.
No afirmar que competidores carecen de estas funciones; el nicho y la facilidad requieren contraste directo.

## Especificación conceptual de muestra
Tres secciones: datos del lote; previsto/real; explicación del resultado.
Campos mínimos: unidades previstas y vendibles; material asignado; consumibles/herrajes; minutos de preparación y fabricación; costo laboral; costo adicional de máquina solo cuando no esté ya incluido; gastos asignados; precio y tarifas de venta.
Elegir una moneda por proyecto. No mezclar minutos con horas.
Trabajo propio se registra como costo; beneficio no sustituye pago al trabajo.
Comprador debe definir sus costos; no introducir referencias personales de empleo.

## Caso aritmético de prueba
Supuestos ficticios:
10 piezas vendibles; material $40; consumibles $10; preparación 0.5 h; fabricación 2 h; trabajo $20/h; gastos adicionales $20.
Costo = 40+10+(0.5+2)×20+20 = $120, o $12/pieza.
Precio $20/pieza → ingreso $200 y resultado $80 antes de costes de venta e impuestos, ya considerado trabajo.
Si 2 piezas fallan pero costo permanece $120: 8 vendibles, $15/pieza; ingreso $160, resultado $40 antes de venta/impuestos.
Agregar un recargo de 30% al costo $12 da $15.60; margen sobre precio es 23.08%. Para margen de 30%, sin tarifas, precio $12/(1−0.30) = $17.142857.
No aplicar ambos métodos simultáneamente.
Costo de venta porcentual t y fijo por pedido f: precio objetivo para lote completo P=(C+f)/(1−m−t), solo bajo esos supuestos y con denominador positivo. No sirve sin adaptar cuando hay impuestos, envío aparte o varias transacciones.

## Economía del producto digital
Precio de prueba candidato: US$12; contraste posterior a US$19 si la muestra demuestra valor. Son hipótesis, no precio recomendado ni willingness-to-pay medida.
Escenarios de sensibilidad con supuestos explícitos:
| Precio | Reserva total de tarifas/devoluciones* | Soporte supuesto | Adquisición supuesta | Contribución |
|---|---:|---:|---:|---:|
| $12 | $2 | $2 | $0 | $8 |
| $12 | $2 | $2 | $5 | $3 |
| $12 | $2 | $6 | $5 | −$1 |
| $19 | $3 | $2 | $5 | $9 |
*Reservas ficticias, no tarifas de plataforma. El soporte supone valor de tiempo de $24/h: 5 min=$2, 15 min=$6.
No incluyen desarrollo inicial ni gasto fijo. A $8/pedido, $100 de efectivo inicial requieren 13 pedidos para cubrirse; a $3 requieren 34. Costos reales y adquisición ND.
Gumroad se revisó como opción; definir tarifa completa por canal y cobro antes de publicación, no usar comisión parcial como margen.
https://gumroad.com/pricing

## Distribución
Etsy: intención de búsqueda y comparables, pero sin tráfico de tienda propia. Demo debe explicar lote y resultado; no competir por cantidad de pestañas.
Contenido en español: posible canal para el kit y prueba de capacidad de explicar IA/procesos; no construir curso en paralelo.
Gumroad: entrega posible, adquisición no resuelta. No presuponer que abrir tienda produce tráfico.
No pagar publicidad hasta observar utilidad y definir contribución disponible para adquisición.

## Protocolo y decisiones
Paso 1, ahora: preparar especificación y ejemplo en papel/documento, no curso ni software completo.
Paso 2: muestra mínima con fórmulas auditadas; controles para cero unidades, datos ausentes, tarifas incompatibles y costos duplicados. Usar casos conocidos y resultados independientes.
Paso 3: evaluar comprensión con tres personas del público, sin contactos automáticos del asistente. Registrar qué completan y minutos de ayuda; no convertir esto en consultoría.
Paso 4: oferta de prueba solo tras utilidad comprobada y autorización del lanzamiento.
Umbrales de decisión propuestos: usuarios reproducen ejemplo sin error crítico y al menos dos pueden adaptar un lote propio sin configuración individual. Luego cinco compras ajenas al equipo son señal inicial, no éxito financiero.
Ausencia de compras con poco tráfico es inconclusa; medir visitas cualificadas y comprensión antes de culpar al producto.
Abandonar/reformular si alternativas resuelven igual, usuarios necesitan ajuste individual, precio aceptado no cubre soporte/adquisición o nadie responsable de cotizar reconoce valor.

## Estado de la shortlist
H5 permanece primera por coste acotado de comprobarse; confianza comercial baja-media y juicio cualitativo. La investigación ha reducido su diferenciación, no confirmado su éxito.
D1 queda segunda y pendiente de ficha profunda. No cerrar IDEAS-004 hasta contrastar ambas; no construir dos productos simultáneamente.
Entregable siguiente: ficha D1 de competencia gratis/pagada y ruta de prueba, seguida por decisión de una sola muestra.
