# Identidad estable · Etapa A de la base común

7 de octubre de 2026. Implementación preparada para revisión y ensayo; no instalada en IONOS.

## Resultado

Se agregó un descriptor privado opcional con identidad, nombre de base local y ubicación de datos del servidor. Con él, el código puede cambiar de carpeta física conservando acceso al mismo almacenamiento, cuenta, clave y respaldos. Sin descriptor, las rutas existentes siguen calculándose como en 0.7.3. Un descriptor inválido/missing o almacenamiento público detiene el acceso: no abre silenciosamente otra instalación.

No cambia el motor contable, formato de datos, UI, sesión ni reglas offline. No mueve datos, no importa a MariaDB y no traslada datos de IndexedDB entre dominios. Dos ubicaciones apuntando al mismo descriptor son la misma instalación; no deben operar como negocios independientes.

## Herramienta CLI

scripts/prepare-runtime.php recibe la ruta absoluta de la aplicación existente y el document root real. Primero lee y valida la cuenta/último respaldo privado sin mostrar contraseñas, clave o datos personales. Por defecto solo simula. --commit crea runtime.json en el almacenamiento privado existente y un localizador PHP en private/runtime-location.php. No cambia config.json, claves, snapshots ni registros operativos. Una preparación ya configurada se rechaza sin sobrescribirla.

Ejemplo de sintaxis, con rutas de ejemplo: **no ejecutar sin inventariar las rutas reales ni sin una entrega probada**.

```bash
/usr/bin/php8.3-cli scripts/prepare-runtime.php /ruta/absoluta/app /ruta/absoluta/document-root
```

La activación usa los mismos argumentos y añade --commit; se realizará primero en prueba. El script vive fuera del directorio público. También puede configurarse TASKFIXER_CAFE_RUNTIME_CONFIG en el entorno del servidor apuntando al descriptor privado; debe ser consistente entre PHP web y CLI. Nunca agregar estos archivos de entorno/localizador al repositorio o paquete de actualización.

El empaquetador excluye runtime-location.php en instalación limpia y actualización para no copiar una cuenta a otra ni reemplazar la ubicación privada. Aún no se construyó ni versionó un paquete nuevo: el build actual sigue identificado como 0.7.3. La siguiente etapa consolidará estructura, diagnóstico y entrega por terminal.

## Verificación local

- 72 pruebas Node existentes aprobadas.
- 18 pruebas HTTP con PHP 8.3 aprobadas: las 14 previas y cuatro nuevas sobre simulación/activación sin alterar cuenta ni respaldo, traslado físico del código conservando identidad/base y lectura del respaldo, descriptor inválido y almacenamiento público/descriptor faltante.
- Lint de los cuatro archivos PHP agregados/modificados aprobado.

La prueba de traslado usa rutas y credenciales ficticias en un servidor temporal. Demuestra compatibilidad del servidor y nombre de base, no traslado de datos reales del navegador, nuevo dominio ni aprobación de Apache/IONOS. No se realizaron pruebas físicas nuevas en iPhone.

## Pendientes antes de actualizar Edgar

1. Inventariar por SSH la ruta real del código, document root, ID/base local y ubicación privada sin publicar secretos.
2. Confirmar respaldo y pendientes del equipo de captura; no recuperar una copia vieja sobre datos recientes.
3. Ensayar descriptor y paquete completo en una instalación separada; comprobar teléfono, caché, PDF y cambios de equipo.
4. Preservar URL/origen durante la primera adaptación. Mantener una ruta estable o puente compatible antes de cambiar directorio web.
5. Ensayar rollback: en la misma ruta, retirar localizador vuelve al cálculo anterior si no cambió almacenamiento/formato; tras traslado físico hay que volver a ruta anterior o conservar descriptor. No prometer rollback simplemente borrando el archivo en cualquier ubicación.

La tarjeta #26 sigue abierta. Se completó la primera pieza de compatibilidad, no la migración de la instalación activa.
