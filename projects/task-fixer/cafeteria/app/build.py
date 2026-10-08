"""Build the private IONOS package. Generated installation secrets never enter git."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import secrets
p=Path(__file__).parent
text=(p/'index.template.html').read_text()
for marker, file in [('ENGINE','engine.js'),('STORAGE','storage.js'),('BACKUP','backup.js'),('CLOUD','cloud.js'),('VAULT','vault.js'),('BOOT','boot.js'),('APP','app.js')]:
    text=text.replace('/*'+marker+'*/',(p/file).read_text())
(p/'server/private/app.html').write_text(text)
token_path=p/'server/private/setup-token.php'
if not token_path.exists():
    token=secrets.token_hex(32)
    token_path.write_text("<?php\nreturn '"+token+"';\n")
    (p/'CODIGO-INSTALACION-PRIVADO.txt').write_text('Código de instalación (no compartir ni subir a GitHub):\n'+token+'\n')
with ZipFile(p/'cafeteria-0.7.3-instalacion-limpia.zip','w',ZIP_DEFLATED) as z:
    for file in (p/'server').rglob('*'):
        if file.is_file() and file.name != 'runtime-location.php': z.write(file,file.relative_to(p/'server').as_posix())
    for name in ['icon.svg','manifest.webmanifest','INSTALAR-0.7.3.txt','CODIGO-INSTALACION-PRIVADO.txt']:
        z.write(p/name,name)

# Updating the running deployment never replaces runtime configuration or reinstalls a user.
with ZipFile(p/'cafeteria-0.7.3-actualizacion.zip','w',ZIP_DEFLATED) as z:
    for file in (p/'server').rglob('*'):
        if file.is_file() and file.name not in ['setup-token.php','instalar.php','runtime-location.php']:
            z.write(file,file.relative_to(p/'server').as_posix())
    for name in ['icon.svg','manifest.webmanifest','INSTALAR-0.7.3.txt']:
        z.write(p/name,name)
