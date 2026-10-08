# Base común de microapps Task Fixer y adaptación de Cafetería

7 de octubre de 2026 · Revisión y plan v0.1; no ejecutado en IONOS.

## Decisión

El responsable quiere que Invoicing y Cafetería se construyan y mantengan con la misma metodología, incluido trabajo por terminal e instalación en servidor. Se revisó el repositorio privado IdeasBM/Lineworks-Invoicing en el commit a09473a12e17c721e89a2f6ab0760adcd69156ab, su árbol completo y archivos de arquitectura, instalación, configuración, sesión, acceso y migración. Este documento contiene conclusiones de arquitectura, no una copia de sus datos ni configuración privada.

Catering modular sigue aprobado y documentado. Antes de incorporarlo al producto activo se prepara la base de desarrollo y entrega. Voz permanece pausada. La capacitación de Edgar puede continuar con la instalación actual mientras se valida la adaptación.

## Qué está construido en Lineworks

Aplicación PHP autónoma con capas y namespaces, fuentes JavaScript para reglas, pruebas Node, carpeta public como único document root, configuración .env fuera del directorio web y almacenamiento privado. Usa MariaDB mediante PDO, cuentas con roles, sesiones, CSRF, auditoría y scripts CLI. La documentación de instalación registra PHP CLI 8.3, SSH y Git disponibles; incluye pasos de migración desde terminal. Estos datos vienen del repositorio; no se volvió a inspeccionar el servidor en esta revisión.

El árbol revisado no contiene un script general deploy.sh ni un sistema completo de releases/rollback. La entrega actual se documenta como subir/descomprimir paquetes y ejecutar verificaciones/migraciones por SSH. La metodología común debe consolidar ese trabajo, sin dar por existente una automatización que todavía falta.

## Comparación y destino

| Área | Invoicing revisado | Cafetería actual | Base común propuesta |
|---|---|---|---|
| Estructura | app, public, scripts, database, contracts, docs, tests | Fuentes JS y build.py; server empaquetado | Misma organización y convenciones por aplicación. |
| Interfaz | Páginas PHP y assets externos | Shell generado con JS/CSS incluidos | public más assets versionados; conservar experiencia móvil/offline. |
| Datos | Registros relacionales MariaDB | Registro cifrado local y snapshots cifrados de servidor | Interfaces de persistencia explícitas; MariaDB como destino de servidor, con migración aparte. |
| Acceso | Usuarios/roles, sesión servidor | Cuenta por instalación, clave local, jornada y equipo exclusivo | Reglas compartidas, configuración por app; mantener desbloqueo offline. |
| Despliegue | Paquete, SSH, lint y migraciones | ZIP de instalación/actualización y subida manual | Paquete verificable, CLI, migraciones explícitas y comprobación posterior. |
| Pruebas | npm test y fixtures | Node CJS y pruebas HTTP/PHP | Comandos uniformes y pruebas adecuadas a cada dominio. |
| Integraciones | Servicios externos y revisión | Captura, respaldo y cambio de dispositivo | Contratos versionados, idempotencia, auditoría y fallos visibles. |

Misma base no significa compartir usuarios, base de datos o información de los clientes. Mantener instalaciones y datos independientes. No fusionar repositorios ni cambiar su visibilidad en esta etapa. Ideas sigue documentando Cafetería; un repositorio privado dedicado es recomendable cuando se extraiga el producto, pero aún no se ha creado ni movido código.

## Dos cambios con alcance diferente

### 1. Unificar construcción, organización y entrega

Prioridad inmediata. Reubicar fuentes en una rama/copia de trabajo, mantener adaptadores compatibles, normalizar comandos, agregar configuración de entorno y scripts de diagnóstico/paquete. Usar la terminal para verificar e instalar, como Invoicing. No necesita reemplazar el motor financiero ni trasladar los datos locales a MariaDB.

Estructura objetivo: app/domain para reglas, app/php para servicios, public para entradas y assets, contracts para formatos, scripts para mantenimiento, database/migrations para cambios del servidor, docs y tests. storage y secretos privados persisten fuera de public y no se incluyen en paquetes. La ruta física exacta se decide al preparar el entorno de prueba.

### 2. Unificar persistencia de servidor y cuentas

Cambio posterior, más amplio. Diseñar tablas propias para organizaciones/instalaciones, usuarios, permisos, control de equipo y registros de operaciones. No importar el esquema de invoices para alumnos o eventos. El primer uso de MariaDB puede ser almacenar snapshots/metadata compatibles, antes de una proyección relacional de consulta; esto no equivale a sincronización por operaciones.

Si se cambia a sincronización por operaciones: cola local cifrada, ID estable por operación, revisión/base esperada, deduplicación servidor, transacciones, confirmaciones y recuperación de respuestas perdidas. Mantener una autoridad de captura explícita. Importar un snapshot se identifica como importación, no como nuevas ventas. La proyección relacional se reconcilia contra el registro; no permitir simultáneamente snapshots y operaciones como dos autoridades independientes.

Lineworks depende del servidor para sus pantallas; copiar esa experiencia a Cafetería quitaría capacidad offline. Se conserva IndexedDB cifrado, service worker, trabajo local y respaldo al reconectar. Cambiar cómo se desarrolla no debe obligar al tío a reaprender a vender.

## Riesgos concretos encontrados en el código

1. context.php deriva identidad/base local de __DIR__. private/core.php deriva la carpeta de configuración/respaldos de la ruta física. Mover archivos puede generar otra identidad y buscar otra cuenta. Antes de mover, introducir ID y ubicación privada estables, importando los valores actuales sin regenerar la clave de cifrado ni contraseñas. No calcular credenciales nuevas por instalar una actualización.
2. Los metadatos locales de boot y cloud están ligados a ruta; IndexedDB pertenece al origen y el service worker a su ámbito. Cambiar subdominio/URL exige una transferencia probada con respaldo reciente, conservar pendientes y preparar offline en el nuevo origen. No prometer que los datos del teléfono aparecerán solos en otra URL.
3. Releases en carpetas distintas también cambian __DIR__. Primero desacoplar identidad y almacenamiento; hasta entonces actualizar en ruta estable con respaldo de código separado, no activar releases que regeneren instalación.
4. Cafetería tiene jornada de nueve horas y bloqueo tras dos de inactividad. Lineworks configura ocho horas absolutas y treinta minutos de inactividad de sesión. Compartir utilidades con límites configurables; no copiar esos límites sobre la operación escolar.
5. La política web de Lineworks bloquea micrófono y cámara. Compartir una base de cabeceras con permisos por aplicación; voz/OCR futuros necesitan una política propia. Cafetería usa scripts/estilos inline; pasar a una política sin inline requiere extraerlos y verificar toda la interfaz, no solo copiar .htaccess.
6. Esquema 3 está fijado en validación local, vault, exportación y API PHP. Ampliarlo requiere migración coherente en todos esos lugares, pruebas de restauración y bloqueo de clientes incompatibles.
7. Revertir código tras migrar datos no basta. Una versión antigua puede rechazar o reinterpretar datos nuevos; rollback exige formato compatible o restauración validada y conciliación de operaciones posteriores. No borrar ventas recientes para recuperar código.

## Metodología común para trabajar por terminal

Desarrollo: rama Git, leer reglas/docs, cambio acotado, pruebas y revisión del diff, commit identificado. Entrega: construir paquete sin secretos, archivo de manifiesto con versión/commit y checksum SHA-256, subir por SSH/SFTP, comprobar checksum, revisar contenido antes de extraer, preservar entorno privado, ejecutar lint/diagnóstico/migraciones y verificar acceso/operación. No desarrollar directamente sobre la carpeta que despacha Edgar.

Se proponen scripts equivalentes en ambas apps para diagnosticar, validar, preparar paquete y migrar. Nombres/comandos definitivos se fijan al implementarlos; hoy no existen esos nuevos scripts de Cafetería. Usar en IONOS el binario PHP 8.3 explícito ya documentado en Lineworks; comprobarlo en el entorno de Cafetería antes de usarlo. npm test será un envoltorio de las pruebas JS existentes, sin convertir Node en requisito del servidor. Las pruebas grandes se ejecutan en desarrollo; servidor recibe PHP y assets construidos.

El acceso SSH al servidor y Codex CLI en la Mac son funciones distintas: SSH administra IONOS; Codex trabaja sobre la copia local del repositorio. Los cambios viajan mediante Git y paquetes, no mediante una memoria compartida de este chat. Mantener el resumen de decisiones en el repositorio.

## Plan y puertas de aceptación

| Etapa | Trabajo | Evidencia necesaria |
|---|---|---|
| A | Inventario de instalación y respaldo, ID/rutas estables | Recuperar copia de prueba con mismos IDs, saldos, documentos y clave compatible. |
| B | Estructura y comandos comunes, sin cambio contable | Pruebas existentes pasan; paquete sin secretos ni datos; fuentes trazables a commit. |
| C | Instalación separada y mantenimiento por SSH | Login, desbloqueo, captura, PDF, offline/refresh y respaldo probados; diagnósticos seguros. |
| D | Ensayo de cambio y vuelta atrás | Sin pérdidas, duplicados ni pérdida del control de equipo; caché/versión compatibles. |
| E | Traslado de Edgar cuando se apruebe la entrega | Pausa breve de captura, respaldo confirmado y verificación de registros antes de retomar. |
| F | Catering modular sobre base validada | Plantillas/presupuestos no alteran caja escolar; reglas y migraciones probadas. |
| G | MariaDB/usuarios y proyecciones o sync | Contratos y migración propios, conciliación y pruebas de recuperación/concurrencia. |

No se fija un tiempo de migración sin conocer la ruta activa, pending local y ensayo. La dificultad principal no es usar terminal: es conservar identidad, datos y operación offline al reorganizar el producto.

## Resultado de esta revisión

Recomendación: adoptar ahora la metodología de Lineworks y adaptar Cafetería por etapas. Mantener su motor y offline. Preparar primero la identidad estable y la entrega desde terminal; ampliar catering después sobre esa base. Esta revisión no cambia infraestructura, cuenta de Edgar, datos, dominio ni despliegue; no se ejecutaron pruebas de una migración que todavía no existe.

Referencias internas revisadas: Lineworks README, AGENTS, docs/11-home-setup-checklist, docs/13-microapp-automation-process, docs/15-modular-operations-plan, docs/16-demo-access-and-review; app/php/bootstrap, Support/Environment, Infrastructure/Database, Http/Session, Health/SystemCheck, scripts/create-user, scripts/migrate-invitations y public/.htaccess. Cafetería: build.py, engine.js, storage.js, vault.js, boot.js, app.js, server/context.php, private/core.php y sw.js.
