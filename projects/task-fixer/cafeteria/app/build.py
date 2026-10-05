"""Build the private IONOS package. Generated installation secrets never enter git."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import secrets
p=Path(__file__).parent
text=(p/'index.template.html').read_text()
for marker, file in [('ENGINE','engine.js'),('STORAGE','storage.js'),('BACKUP','backup.js'),('CLOUD','cloud.js'),('APP','app.js')]:
    text=text.replace('/*'+marker+'*/',(p/file).read_text())
(p/'server/private/app.html').write_text(text)
token_path=p/'server/private/setup-token.php'
if not token_path.exists():
    token=secrets.token_hex(32)
    token_path.write_text("<?php\nreturn '"+token+"';\n")
    (p/'CODIGO-INSTALACION-PRIVADO.txt').write_text('Código de instalación (no compartir ni subir a GitHub):\n'+token+'\n')
with ZipFile(p/'cafeteria-beta-0.6.0-ionos.zip','w',ZIP_DEFLATED) as z:
    for file in (p/'server').rglob('*'):
        if file.is_file(): z.write(file,file.relative_to(p/'server').as_posix())
    for name in ['icon.svg','manifest.webmanifest','INSTALAR-0.6.0.txt','CODIGO-INSTALACION-PRIVADO.txt']:
        z.write(p/name,name)
