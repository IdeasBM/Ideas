# Roadmap de tarjetas · Cafetería

5 de octubre de 2026 · Edición Edgar Flores · IdeasBM/Ideas.

## Estado actual
El responsable confirmó a las 19:56 (America/Chicago) que creó y activó la cuenta de Edgar. Entregará el acceso el 6 de octubre. La captura offline, persistencia, respaldo, recuperación en Mac y bloqueo por cambio de equipo fueron informados como exitosos. Inactividad física de dos horas y jornada del piloto siguen pendientes. No publicar credenciales ni información de alumnos.

## Actualización · 7 de octubre de 2026

Edgar aún no pudo recibir la capacitación; se espera su disponibilidad al fin de semana. La cuenta está activada según el responsable, pero no se da por completado el piloto. Voz #21 se pausa. Prioridad de desarrollo: #25, presupuestos para catering; primera entrega separa cotización de cobros e inventario.

## Tarjetas

| Prioridad | Tarjeta | Momento |
|---|---|---|
| P1 | [#25 · Presupuestos de catering y PDF](https://github.com/IdeasBM/Ideas/issues/25) | Prioridad activa: proceso y diseño preparados |
| P0 | [#14 · Acompañar el piloto de Edgar y cerrar pruebas de jornada](https://github.com/IdeasBM/Ideas/issues/14) | Capacitación al fin de semana; pendiente |
| P0 | [#15 · Simplificar entrada, recuperación y cierre para el operador](https://github.com/IdeasBM/Ideas/issues/15) | Después de observar piloto |
| P1 | [#16 · Supervisión de solo lectura y seguimiento del piloto](https://github.com/IdeasBM/Ideas/issues/16) | Luego del acceso |
| P1 | [#17 · Inventario por movimientos y compras manuales](https://github.com/IdeasBM/Ideas/issues/17) | Módulo de operación |
| P1 | [#18 · Recetas, ingredientes y lista sugerida de compras](https://github.com/IdeasBM/Ideas/issues/18) | Después de inventario |
| P1 | [#19 · Gastos, pagos pendientes y panorama del negocio](https://github.com/IdeasBM/Ideas/issues/19) | En paralelo con inventario |
| P2 | [#20 · Foto de ticket como borrador revisable de compra](https://github.com/IdeasBM/Ideas/issues/20) | Después de compras manuales |
| P1 | [#21 · Pedidos consecutivos por voz para el recreo](https://github.com/IdeasBM/Ideas/issues/21) | Pausada; prioridad sustituida por catering |
| P2 | [#22 · Asistente de operación con respuestas basadas en registros](https://github.com/IdeasBM/Ideas/issues/22) | Después de módulos base |
| P1 | [#23 · Validar gratuito, operación e IA como planes](https://github.com/IdeasBM/Ideas/issues/23) | Diseño comercial, sin precios aprobados |
| P2 | [#24 · Suscripciones, permisos de funciones y cuotas de IA](https://github.com/IdeasBM/Ideas/issues/24) | Solo tras validar planes |

Cada issue contiene alcance, criterios de aceptación y dependencias. Todos están abiertos como trabajo pendiente; no implican nuevas funciones desarrolladas. No se fijaron fechas artificiales ni asignaciones a terceros.

## Planes como hipótesis

| Propuesta | Funciones candidatas | Estado |
|---|---|---|
| Gratis | Alumnos, menú, ventas y consulta online; límites por definir. | Hipótesis por validar. |
| Operación | Captura offline, inventario/compras, recetas, gastos y reportes según alcance aprobado. | Hipótesis por validar. |
| IA opcional | Lectura de tickets, dictado y asistente, con cuotas ligadas a costo/uso. | Hipótesis por validar. |

Cobrar offline es una opción, pero offline resuelve el problema central observado: comparar con una prueba gratuita del plan completo antes de decidir. Seguridad, integridad, recuperación y exportación no deben desaparecer por cambio de plan. Un gratuito online no se construye ocultando botones: hoy la copia local es la base y el servidor recibe snapshots. Requiere diseño de datos/autorización central y migración segura.

No se fijan precios antes de medir hosting/soporte/IA por volumen y disposición a pagar. Cancelación o cuota agotada no borran datos ni descartan ventas offline pendientes. La implementación de suscripciones depende de validar la propuesta comercial.

## Orden
Primero piloto/acceso, después inventario y gastos, y luego IA con datos confiables y revisión humana. Supervisión debe ser de consulta para no quitarle control al teléfono que despacha. La documentación del producto sigue en [EVOLUCION-PRODUCTO.md](EVOLUCION-PRODUCTO.md) y [PILOTO-EDGAR-FLORES.md](PILOTO-EDGAR-FLORES.md).

## Prioridad ajustada · 6 de octubre, 09:15 America/Chicago

Por instrucción del responsable, #14 y #15 esperan la capacitación y el uso de Edgar. Se adelanta diseño/prototipo de #21 por acumulación de pedidos en recreo, sin esperar inventario. [Especificación de voz v0.1](VOZ-PEDIDOS-v0.1.md). La primera prueba separa interpretación/cola, micrófono real y confirmación; no modifica todavía la instalación activa.

## Prioridad vigente · 7 de octubre, America/Chicago

Esta decisión reemplaza el adelanto de voz del 6 de octubre. Preparar [presupuestos de catering](CATERING-PRESUPUESTOS-v0.1.md), motor, pantallas y guardado/documentos; después integrar anticipos/cobros. #14/#15 esperan capacitación al fin de semana. [Trabajo desde terminal](TRABAJO-TERMINAL.md). No se modificó la instalación activa.

### Alcance modular · 7 de octubre, 19:21 America/Chicago
#25 incorpora Mis servicios: plantillas con productos, horas, personal, equipo y traslado; reglas de cantidades y tarifas para calcular al elegir servicio/personas/horas. Precios revisables sin alterar documentos históricos. Cobros/gastos por evento y separación de caja se integran después del presupuesto. Voz permanece pausada.
