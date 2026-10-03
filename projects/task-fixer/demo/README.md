# Demostración: del mensaje al seguimiento
Task Fixer · 2026-10-03.

Descarga y abre **demo.html** en un navegador. Es un archivo autosuficiente: no necesita instalar nada ni conectar cuentas. GitHub muestra código; no ejecuta esta demo en la vista del archivo.

## Recorrido sugerido (3 minutos)
1. Repite la misma entrada: siguen existiendo dos solicitudes.
2. Selecciona a Ana y completa zona, contacto ficticio y responsable; guarda.
3. Indica un importe de ejemplo y aprueba cotización/envío.
4. Elige “No sabemos si salió” y simula el envío: el reintento queda bloqueado.
5. Confirma “Revisé: no salió”, cambia a “Sale correctamente” y reintenta.
6. Avanza dos días; autoriza el seguimiento; marca que el cliente respondió.
7. Revisa el historial y reinicia para explorar otro caso.

## Qué demuestra
Estados y excepciones de un proceso explicado en lenguaje cotidiano. El dueño decide precios y envíos. Los casos pendientes permanecen visibles. Sin IA, clientes, correo, red, bases de datos o seguimiento real; al recargar se reinicia. Importe en USD solo para el ejemplo. No usar con datos reales.

## Código y verificación
- `engine.js`: reglas de la simulación.
- `build.py`: genera HTML autocontenido; ejecutar `python build.py` tras cambiar reglas o interfaz.
- `test.cjs`: pruebas de comportamiento con Node; ejecutar `node --test test.cjs`.
- Pruebas automatizadas de lógica: cinco escenarios aprobados (entrada repetida/obra distinta, datos y aprobación, recorrido completo, fallos e incertidumbre, invalidación de aprobación).

El prototipo no prueba conexiones externas, recepción de mensajes, permisos, cuotas, persistencia ni concurrencia. Repetir los criterios del [diseño del piloto](../DISENO-Y-COSTOS-DEL-PILOTO.md) en herramientas reales antes de entregar el servicio.

Verificación de apariencia pendiente: el navegador automatizado no estuvo disponible y su descarga falló. No se afirma revisión visual ni prueba móvil completada.
