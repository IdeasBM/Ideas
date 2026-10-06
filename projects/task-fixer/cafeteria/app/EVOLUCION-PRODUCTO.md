# Cafetería · Edición Edgar Flores

Decisiones del 5 de octubre de 2026 · Task Fixer.

## Primera entrega
El nombre visible es «Edición Edgar Flores», sin Beta/Prueba en cabecera, pie ni Ajustes. La versión técnica 0.7.3 queda en Ajustes para soporte. Es una identidad para el primer piloto, no prueba de madurez o validación completa. Cuenta de Edgar activada por el responsable el 5 de octubre a las 19:56 (America/Chicago), según su reporte; acceso se entregará el 6 de octubre.

Mantener navegación, captura y contabilidad ya probadas. Mejorar presentación con verde oscuro, crema, acentos cálidos, tarjetas con profundidad y foco accesible. No aumentar pasos para registrar ventas. Cada actualización conserva datos y clave local; cierre de pestañas antiguas para actualizar caché.

La operación actual comprende ventas pagadas/crédito, abonos/anticipos, caja/corte, correcciones y documentos. Existencia inicial es un dato registrado: todavía no descuenta inventario ni calcula utilidad real.

## Inventario y compras · siguiente módulo funcional
Antes de programar, decidir por producto si se vende una unidad comprada (refresco) o se prepara con ingredientes (sándwich). El segundo caso requiere receta/consumo por porción; vender un sándwich no descuenta simplemente un sándwich comprado.

Registrar unidad de compra y venta, equivalencias (caja/piezas, litro/mililitro), stock inicial, entradas por compra, salidas por venta, merma/consumo interno, conteo físico y correcciones. Mantener un historial de movimientos por producto o ingrediente; anulaciones y devoluciones deben corregir existencias según si el producto regresó físicamente. Costos y precios conservan la información histórica del movimiento.

Primero captura manual de compras y movimientos. Después sugerir lista de compra con mínimos y consumo observado: no ordenar automáticamente ni afirmar predicción sin datos. Definir si se permite stock negativo y qué ocurre offline antes de desarrollo.

## Fotos de tickets · después de compras manuales
La foto crea un borrador de compra. Extraer proveedor, fecha, total y renglones; proponer categoría, producto, cantidad, unidad y costo. Pedir revisión de importes y equivalencias; señalar baja confianza, conciliación del total y posibles duplicados. Confirmar antes de modificar existencias o caja. Un ticket con totales/impuestos/paquetes no siempre identifica cada unidad consumible.

No crear productos duplicados por cada variante de nombre del ticket. Permitir vincular a un producto existente o dar de alta uno nuevo conscientemente. Definir conservación de imagen, proveedor OCR, consentimiento, costo y comportamiento sin red antes de implementar. Capturar foto offline puede quedar pendiente; no prometer OCR/IA local sin motor probado.

## Ventas por voz
Usar botón «Dictar venta» como primer alcance; activación continua tipo Alexa requiere investigación adicional de permisos, batería y entorno ruidoso. Interpretar alumno con nivel/grado/grupo, productos/cantidades y pago o crédito. Generar propuesta visible y pedir confirmación antes del cargo: no elegir un homónimo ni una cuenta por probabilidad. Si falta información, preguntar solo por el dato faltante. Mostrar importe y destinatario.

Evitar duplicar ventas por reintentos o transcripciones repetidas. Disponer siempre de captura táctil. Medir precisión con ruido real de cafetería, nombres y vocabulario local. Establecer red/costos/privacidad y mecanismo de reproducción antes de prometer funcionamiento offline. Implementar después de estabilizar el piloto, no añadir al primer uso del tío.

## Gastos y panorama del negocio
Registrar gastos del negocio (por ejemplo luz/teléfono/renta), categoría, importe, fecha, estado pagado/pendiente y medio de pago; vencimientos recurrentes como fase posterior. Vincular salida de caja cuando proceda para no restarla dos veces. Diferenciar retiros personales, anticipos y compras de insumos de ventas/cobros.

Mostrar por separado ventas, dinero cobrado, cuentas pendientes, gastos pagados/pendientes y caja. No llamar utilidad al efectivo disponible: cálculo de utilidad requiere costos e inventario definidos y suficiente información. Primer informe será operativo, con límites explícitos, sin venderlo como contabilidad fiscal completa.

## Orden acordado
1. Cerrar pendientes físicos: bloqueo de dos horas, jornada/corte y casos de cobro/corrección/documento. Cambio de equipo y bloqueo del anterior ya aprobados por el responsable. Captura offline y recuperación de $25/$45 en Mac ya informadas como exitosas en 0.7.1.
2. Instalación independiente activada por el responsable; comprobar que está vacía, con acceso/recuperación verificados y origen dedicado para datos reales; guiar al tío por teléfono al cargar sus listas una sola vez.
3. Observar una jornada real y registrar fricciones antes de aumentar funciones.
4. Inventario/compras manuales y gastos, definiendo unidades/recetas y relación con caja.
5. Foto de tickets y voz, como asistencia con revisión humana.

No se implementaron inventario calculado, OCR, voz ni módulo de gastos en 0.7.3. La visión queda documentada para planificar después del piloto.

## Tarjetas y propuesta comercial

[Roadmap de once tarjetas](ROADMAP-TARJETAS.md), issues #14–#24. Gratis online, Operación e IA como extra son hipótesis comerciales. Costos, límites y precios se validarán con piloto/usuarios antes de suscripciones. Seguridad y acceso/exportación no se retirarán al cambiar de plan. La captura offline actual no se restringió ni modificó en esta tarea.
