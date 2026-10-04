from pathlib import Path
p=Path(__file__).parent
text=(p/'index.template.html').read_text()
text=text.replace('/*ENGINE*/',(p/'engine.js').read_text()).replace('/*STORAGE*/',(p/'storage.js').read_text()).replace('/*APP*/',(p/'app.js').read_text())
(p/'cafeteria-beta-0.4.2.html').write_text(text)
