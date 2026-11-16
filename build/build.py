"""Build ../index.html (standalone page) and ../src-blueprint-app.html (artifact body) from app.tpl.html + data.json + videos.json, plus a local preview copy."""
import json, os
here = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(here, 'data.json')))
V = json.load(open(os.path.join(here, 'videos.json')))
ids = {m['id'] for m in D['machines']}
for s in D['splits']:
    for d in s['days']:
        for e in d['ex']:
            assert e['station'] in ids, e
kinds = {m['kind'] for m in D['machines']}
assert kinds <= set(D['cues']), kinds - set(D['cues'])
print('kinds without video:', kinds - {k for k, v in V.items() if v})
out = open(os.path.join(here, 'app.tpl.html')).read().replace('__DATA__', json.dumps(D, ensure_ascii=False)).replace('__VIDEOS__', json.dumps(V, ensure_ascii=False))
js = out.rsplit('<script>', 1)[1].split('</script>')[0]
assert '</script' not in js
open(os.path.join(here, '..', 'src-blueprint-app.html'), 'w').write(out)
open(os.path.join(here, 'app.js'), 'w').write(js)
standalone = ('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>' + out + '</body></html>')
open(os.path.join(here, '..', 'index.html'), 'w').write(standalone)
os.makedirs(os.path.join(here, '..', '.preview'), exist_ok=True)
open(os.path.join(here, '..', '.preview', 'index.html'), 'w').write(standalone)
print('built', len(out))
