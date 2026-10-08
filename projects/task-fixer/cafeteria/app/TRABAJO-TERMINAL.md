# Trabajar el proyecto desde la terminal de la Mac

7 de octubre de 2026. El código compartido vive en IdeasBM/Ideas, dentro de projects/task-fixer/cafeteria/app. IONOS sigue siendo el alojamiento; WordPress no es necesario para editar esta app.

## Preparar una copia de trabajo

Se requieren Git, Node.js y Python 3. Para pruebas de servidor también PHP con OpenSSL. Primero comprobar herramientas:

```bash
git --version
node --version
python3 --version
php --version
```

Si alguna falta, instalarla antes de ejecutar la sección que la usa. El proyecto no requiere npm install ni tiene un package.json de dependencias de aplicación.

Si todavía no hay una copia local del repositorio en la Mac:

```bash
mkdir -p ~/Proyectos
cd ~/Proyectos
git clone https://github.com/IdeasBM/Ideas.git
cd Ideas
git switch -c catering-presupuestos
cd projects/task-fixer/cafeteria/app
```

Si ya está clonado, abrir esa copia y revisar git status antes de cambiar de rama. No clonar encima ni descartar cambios existentes. El repositorio es la fuente común entre este chat y la terminal: los archivos editados en un equipo no aparecen automáticamente en otro sin sincronizar Git.

## Editar y comprobar

Trabajar sobre fuentes como engine.js, app.js, vault.js y storage.js. server/private/app.html es generado: no editarlo como fuente principal.

Desde projects/task-fixer/cafeteria/app:

```bash
node --test test*.cjs
python3 test-server.py
```

Las pruebas PHP levantan su servidor temporal de pruebas; no son la instalación de IONOS. Para generar paquetes, después de revisar fuentes y pruebas:

```bash
python3 build.py
git status --short
git diff
```

El ensamblador actual todavía genera paquetes 0.7.3: antes de entregar catering habrá que actualizar la versión y el contenido del paquete. También genera material de instalación privado local; no publicarlo. Los ZIP y credenciales no forman parte del código para GitHub. El paquete de actualización y el de instalación limpia son distintos: una actualización de Edgar no debe reinstalar su cuenta.

No abrir app.html como archivo suelto para dar por probado el producto: el acceso privado, API y contexto dependen de PHP y HTTPS. La interfaz completa se valida en una instalación de pruebas separada de Edgar.

## Compartir cambios

Después de revisar git diff, agregar únicamente las rutas de trabajo necesarias, crear commit y subir la rama; evitar agregar toda la carpeta indiscriminadamente. Por ejemplo, para una modificación de la especificación:

```bash
git add CATERING-PRESUPUESTOS-v0.1.md
git commit -m "Define presupuestos para eventos"
git push -u origin catering-presupuestos
```

Subir requiere autenticación de GitHub. No escribir tokens ni contraseñas dentro del código o la URL del remoto. Revisar y combinar los cambios antes de construir la entrega que se subirá a IONOS.

## Si también se usa un asistente desde terminal

Para Codex CLI, la documentación oficial consultada indica este instalador para macOS/Linux. Ejecutarlo en la Mac solo si Codex todavía no está instalado:

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

Después abrir la copia local del repositorio y arrancar:

```bash
cd ~/Proyectos/Ideas
codex
```

En el primer arranque elegir Sign in with ChatGPT y completar el acceso. La autenticación de Codex es distinta de la de GitHub. Fuente consultada el 7 de octubre: https://learn.chatgpt.com/docs/codex/cli.

Abrirlo en la raíz de esa misma copia del repositorio y darle contexto explícito:

> Proyecto IdeasBM/Ideas, módulo projects/task-fixer/cafeteria/app. Trabaja en la rama catering-presupuestos. Lee ROADMAP-TARJETAS.md y CATERING-PRESUPUESTOS-v0.1.md. Voz #21 está pausada; preparar presupuestos sin modificar la instalación de Edgar. Conserva motor financiero y respaldos, ejecuta pruebas y describe cambios antes de crear una entrega.

No asumir que un asistente de terminal recibió esta conversación. La instalación/autenticación de ese asistente se configura aparte; esta guía describe el flujo del repositorio, no da por instalada ninguna herramienta de IA en la Mac.
