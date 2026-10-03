# Dos finalistas: Lana y Task Fixer
Fecha: 2026-10-03, America/Chicago. Decisión vigente del responsable.

## Acuerdo de foco
Los únicos finalistas de esta etapa son:
1. **Lana:** plataforma para negocios que operan por agenda, con citas, calendario, cambios, cancelaciones, ausencias, retrasos, atención y cierre; complementada por IA y asistente conectado al proceso.
2. **Task Fixer:** agencia que ayuda a aclarar/diseñar procesos, elegir herramientas, crear automatizaciones, reparar las existentes y mantenerlas; captación por sitio web y canales digitales.

Se reactiva Lana para comparación comercial. Se amplía Task Fixer más allá de reparación. La competencia se estudia como condición de entrada, no como veto automático. Esta decisión sustituye la suspensión y la búsqueda abierta anteriores. Los demás proyectos quedan en archivo/reserva; no se abren nuevas familias.

Se investigan ambas a fondo y se concentra la siguiente construcción comercial en la que tenga mejor evidencia. No significa construir dos negocios simultáneamente ni que alguna esté validada.

## Lo que ya sabemos de Lana: revisión del ZIP
Fuente recuperada: **LANA BY KAIROS(20261002-230607).zip**, compartida el 2026-10-02. Revisión estática selectiva de la carpeta principal; no se ejecutó WordPress ni se inspeccionó el ZIP anidado «PRIMERA BASE FUNCIONAL». No se auditó el repositorio frontdesk ni se modificó código.

Archivos revisados: definición lana_service-process.json, lana-dashboard.php, lana-frontend-shortcodes.php, state-machine.php, wp-options-storage.php y README del módulo de entrevista; búsqueda selectiva en código PHP/JSON para ubicar componentes. No publicar el ZIP ni código privado en Ideas.

La definición contiene **11 estados y 22 acciones**:
- Solicitud pendiente → horario propuesto → cita confirmada.
- Cliente en sitio → servicio en espera/en ejecución → finalizado → cerrado.
- Ramas de cancelación, no-show y reprogramación pendiente.
- Acciones con roles, información requerida y datos como horario, duración, recurso, llegada, inicio/fin y cierre.

Las vistas tienen código para casos, filtros, resúmenes, alertas y presentación de agenda. El resumen contempla delay_minutes. El módulo de entrevista captura respuestas mediante pasos configurados. Su aspecto conversacional no demuestra un modelo de IA.

| Componente | Evidencia estática | Qué falta comprobar |
|---|---|---|
| Proceso de recepción | Estados/acciones explícitos y validación de transiciones | Ejecución real de todas las ramas y consistencia de datos |
| Interfaz operativa | Dashboard, nuevo caso, detalle y funciones de agenda | Usabilidad móvil, edición y jornada completa |
| Datos e historial | Casos/logs en almacenamiento WordPress | Concurrencia, volumen, recuperación y exportación |
| Acceso | Capacidad de WordPress; frontend exige por defecto manage_options | Roles comerciales y aislamiento si varios negocios comparten servicio |
| Calendario externo | Campo calendar_event_id | Campo no acredita sincronización ni prevención de doble reserva |
| Retrasos | Campos y presentación en resumen | Impacto sobre citas siguientes y reglas para resolverlo |
| Asistente de IA | No quedó acreditado en la revisión selectiva | Integración, fuentes de verdad, permisos, acciones y evaluación |

Conclusión técnica: hay base de proceso e interfaz para explorar, no una estimación confiable de porcentaje terminado. Elegir instalación por negocio o servicio compartido afectará costos y migración; no decidirlo solo por el código disponible.

## Lana: tesis comercial y alcance
Comprador: dueño/encargado de negocio pequeño por agenda. Sector y mercado inicial pendientes. Belleza no clínica y servicios de mascotas son candidatos para contraste, no decisiones tomadas.

Resultado buscado: comprender la jornada y atender cambios/pendientes sin reconstruir información entre herramientas. El núcleo es el proceso completo; el asistente aporta explicación, propuestas y acciones autorizadas.

Familias que deben entrar en el dossier:
- Suites de agenda/operación: Square y Mangomint; MoeGo para mascotas.
- Asistentes añadidos a herramientas existentes: Prentice y ofertas similares.
- Recepción integrada con gestión de servicios: Jobber.
- Alternativas actuales del comprador: calendario, mensajes, hoja y persona.

Referencias de precio consultadas hoy, sin equiparar alcance:
| Oferta | Referencia pública | Condición |
|---|---|---|
| Square EEUU | Free $0, Plus $49, Premium $149 por ubicación/mes | Comisiones y funciones según plan; confirmar tabla completa para el comprador elegido |
| Mangomint | $120 por ubicación + $10 por usuario/mes | Complementos aparte; publica onboarding y transferencia incluidos |
| MoeGo, página de mobile grooming | Basic $49, Growth $99, Ultimate $159/mes | La tabla indica Growth/Ultimate por van; no trasladar estos precios a salón |
| Asistentes operativos | Ver informe competitivo previo | Memoria/aprendizaje anunciado no equivale a desempeño probado |

La oferta de bajo costo ya existe; no recomendar competir solo por precio. Hay que comparar una jornada con tareas idénticas y observar: pasos, pendientes visibles, acciones disponibles, configuración, costo total y dificultad de cambiar de sistema.

Hipótesis de entrada que requieren prueba: operación clara en móvil, incorporación sencilla y resolución de excepciones con menos esfuerzo. Ni español ni IA se consideran ventajas demostradas por mencionarlos.

Para una primera prueba técnica, mantener el proceso original. Alcance candidato: una sede, recursos/profesionales, servicios/duraciones, agenda y estados, excepciones, historial y resumen del asistente. POS, nómina, inventario, telefonía y varios canales requieren justificación comercial antes de agregarse. Un asistente no puede modificar horarios sin comprobar disponibilidad y permisos; cada acción necesita resultado registrado.

## Task Fixer: tesis comercial y alcance
Comprador: empresa/equipo pequeño con una tarea manual costosa o automatización que falla. Seleccionar combinación de problema y herramientas para su primera oferta; la agencia puede ampliar servicios después.

No se reduce a conectar aplicaciones. Su ciclo es:
Diagnóstico → proceso actual/objetivo → selección de herramientas → alcance y cotización → implementación o reparación → pruebas de aceptación → entrega/documentación → mantenimiento.

| Servicio | Entrega concreta | Separación necesaria |
|---|---|---|
| Clarificar proceso | Mapa, excepciones, responsables y prioridades | Descubrimiento tiene costo aunque no termine en implementación |
| Elegir herramientas | Comparación y recomendación con costos/dependencias | No imponer una herramienta ni cobrar como si todas las integraciones fueran posibles |
| Crear automatización | Flujo delimitado, controles y pruebas | Cambios de alcance y tareas no automatizables |
| Reparar | Diagnóstico, causa, corrección verificada | No prometer arreglar cualquier sistema a precio fijo antes de revisar |
| Mantener | Monitoreo, incidencias, backups cuando apliquen y cambios acordados | Corrección de defecto, mantenimiento y nueva función no son el mismo servicio |

Evidencia adicional: un encargo de Upwork de septiembre pide estudiar procesos, hablar con áreas, recomendar arquitectura y luego construir. La página muestra 1 contratación, historial del comprador y 50+ propuestas. Es evidencia concreta de demanda de ese tipo de servicio, no prueba de que Task Fixer vaya a vender ni de tarifa rentable. Su amplio alcance excede un pequeño paquete inicial [4].

Un anuncio de Workana de septiembre solicita desarrollo, implementación y mantenimiento de IA/automatización, pero el cliente figura con 0 proyectos pagos: señal exploratoria, no compra demostrada [5].

Competencia: agencias y profesionales en directorios, Fixmation, Data Quimbaya y servicios sobre n8n/Make/Zapier. Sus ofertas/pricing ya constan en el informe anterior. La diferencia tiene que aparecer en confianza, diagnóstico, resultado y entrega; no en anunciar «hacemos IA».

Sitio y chatbot: recibir la necesidad, recoger herramientas y consecuencias, elaborar resumen y derivar a revisión. El chat es opcional durante una prueba inicial; no cotiza ni garantiza viabilidad compleja sin revisión. Dominio exacto/acceso de Task Fixer todavía no verificados. No hay sitio comercial construido en esta etapa.

## Comparación provisional, sin probabilidades inventadas
| Dimensión | Lana | Task Fixer |
|---|---|---|
| Evidencia de mercado | Competidores muestran una categoría existente; falta disposición a elegir Lana | Encargos y contrataciones visibles apoyan estudiar servicios |
| Trabajo previo | ZIP con proceso/interfaz; falta ejecución y brechas de producto | Método de procesos aprovechable; falta oferta y prueba de entrega |
| Inversión previa a primera venta | Completar producto, incorporación y operación | Demostración, diagnóstico y capacidad de entrega |
| Ingresos posibles | Suscripción propuesta; retención indispensable | Proyectos y mantenimiento; recurrencia por contratar |
| Restricción dominante | Razón para cambiar y adquirir clientes con margen | Horas de venta/entrega y variación entre proyectos |
| Reutilización | Mismo núcleo entre negocios si necesidades coinciden | Plantillas/componentes, pero cada entorno puede exigir adaptación |
| Dependencia personal | Soporte/operación del producto | Alta en diagnóstico, venta, entrega y mantenimiento |
| Lectura provisional | Mayor apuesta de desarrollo; no descartada | Evidencia más directa para una prueba de servicio, no ganador definitivo |

No convertir estas observaciones en puntuaciones de «probabilidad de éxito». Falta medir oferta, comprador y canal propios.

## Economía comparable
Contar tiempo personal a una tarifa interna de planeación, incluso sin desembolso.

**Lana**
Margen mensual por cuenta = suscripción − infraestructura/API/mensajes/pagos − soporte variable.
Recuperación de adquisición = CAC / margen mensual.
Inversión inicial y costos fijos se recuperan aparte; la permanencia del cliente debe alcanzar para ello.

Ejemplo inventado: $49/mes − $9 de costos variables − 0.5 h de soporte × $40 = $20/mes. CAC $120 se recupera en 6 meses, antes de costos fijos/desarrollo. Si soporte sube a 1 h, ese margen sería $0. No es pronóstico, propuesta de precio ni dato observado.

**Task Fixer**
Margen de proyecto = precio − horas de diagnóstico/venta/entrega/correcciones − herramientas asignadas − adquisición.
Ejemplo inventado: $1,500 − 20 h × $40 − $100 directos − $200 CAC = $400 antes de costos fijos. Con 30 h serían $0. El mantenimiento se calcula por separado y requiere límites.

Las cifras solo muestran qué medir. No elegir ganador cambiando supuestos a su favor. Para ambos, estimar escenario bajo/base/alto y punto de equilibrio con las mismas reglas.

## Investigación profunda y regla de decisión
Se crean dos expedientes con entregables comunes:
1. Comprador inicial, tarea y desencadenante de compra.
2. Evidencia de demanda: distinguir problema autodeclarado, anuncio, contratación y resultado.
3. Competencia funcional, precio total y canal.
4. Oferta propia y motivo verificable de elegirla.
5. Trabajo para entregar, costos fijos/variables y soporte.
6. Adquisición por internet: palabras/intención, canales y embudo; no inventar CPC ni conversión.
7. Prueba mínima y criterios de continuar/descartar.

Propuesta de pesos para ordenar evidencia, no resultado actual:
demanda y motivo de compra 25%; economía 25%; captación 20%; entrega/operación 20%; sostenibilidad e interés 10%. Un dato ausente queda «pendiente», no cero; no declarar ganador mientras falten demanda propia y adquisición.

Condiciones mínimas:
- Lana: segmento inicial y razón para elegirla, flujo confiable y margen que soporte adquisición/retención.
- Task Fixer: primera oferta delimitada, prueba de capacidad de entrega y margen incluyendo ventas/correcciones.
- Si ambas fallan, reformular alcance o canal dentro de estos dos proyectos antes de ampliar la búsqueda. No forzar una inversión para cumplir el plan.

## Siguiente trabajo
Primero expediente de Lana: prueba estática ya realizada, ahora comparación funcional de la jornada y brechas/costo de completar el producto.
Después expediente completo de Task Fixer: catálogo por etapas, compradores, competencia y economía de adquisición/entrega.
Finalmente dictamen cara a cara y una sola prueba comercial recomendada.

La investigación y documentación están autorizadas. La construcción se concretará sobre el finalista elegido. Gastos y lanzamiento requieren definición y autorización concreta; no se contactó a nadie ni se publicó una oferta comercial.

## Fuentes y continuidad
1. [Square: pricing EEUU](https://squareup.com/us/en/pricing)
2. [Mangomint: pricing](https://www.mangomint.com/pricing/)
3. [MoeGo: pricing, mobile grooming](https://www.moego.pet/pricing)
4. [Upwork: diseño de procesos y sistema ecommerce](https://www.upwork.com/freelance-jobs/apply/Operations-Systems-Architect-Design-Build-Automate-Our-Commerce-Operating-System_~022100911755730442520/)
5. [Workana: desarrollo y mantenimiento](https://www.workana.com/es/job/desarrollo-de-soluciones-de-inteligencia-artificial-asistentes-de-voz-chatbots-y-automatizaciones)
6. [Competencia de asistentes: informe previo](2026-10-03_LANA-COMPETENCIA-ASISTENTES.md). Evidencia conservada; suspensión sustituida por esta decisión.
7. [Búsqueda abierta y Task Fixer: informe previo](2026-10-03_BUSQUEDA-ABIERTA-Y-TASK-FIXER.md). Evidencia conservada; reparación deja de ser el alcance completo.
8. Fuente interna: ZIP de Lana indicado arriba. Revisión selectiva no equivale a auditoría de seguridad, rendimiento ni producción.
