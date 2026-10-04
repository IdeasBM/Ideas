from pathlib import Path
p=Path(__file__).parent
text=(p/'index.template.html').read_text()
text=text.replace('/*ENGINE*/',(p/'engine.js').read_text()).replace('/*STORAGE*/',(p/'storage.js').read_text()).replace('/*BACKUP*/',(p/'backup.js').read_text()).replace('/*APP*/',(p/'app.js').read_text())
(p/'cafeteria-beta-0.5.0.html').write_text(text)
from zipfile import ZipFile, ZIP_DEFLATED
with ZipFile(p/'cafeteria-beta-0.5.0-paquete.zip','w',ZIP_DEFLATED) as z:
    for name in ['cafeteria-beta-0.5.0.html','sw.js','manifest.webmanifest','icon.svg','INSTALAR-0.5.0.txt']:
        z.write(p/name,name)
