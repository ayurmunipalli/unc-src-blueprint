"""Report zone-label/station and station/station overlaps on both floors (plan units)."""
import json
d = json.load(open('data.json'))
def boxes(m):
    return [dict(m, **p) for p in m['parts']] if m.get('parts') else [m]
def hit(a, b, pad=0):
    return a[0] < b[2] + pad and b[0] < a[2] + pad and a[1] < b[3] + pad and b[1] < a[3] + pad
bad = 0
for f in d['floors']:
    k = f['k']; ms = [m for m in d['machines'] if m['floor'] == f['id']]
    rects = [(m['id'], (b['x'], b['y'], b['x'] + b['w'], b['y'] + b['h'])) for m in ms for b in boxes(m)]
    for z in f['zones']:
        x, y = z['pts'][0]
        lab = (x + 6 * k, y + 2 * k, x + 6 * k + len(z['name']) * 11 * k * 0.62, y + 18 * k)
        for i, r in rects:
            if hit(lab, r, 2): print('F%s label %-28s overlaps %s' % (f['id'], z['name'], i)); bad += 1
        for o in f['zones']:
            if o is z: continue
            ox, oy = o['pts'][0]
            if (ox, oy) != (x, y):
                olab = (ox + 6 * k, oy + 2 * k, ox + 6 * k + len(o['name']) * 11 * k * 0.62, oy + 18 * k)
                if hit(lab, olab) and z['name'] < o['name']: print('F%s label %s overlaps label %s' % (f['id'], z['name'], o['name'])); bad += 1
    for a in range(len(rects)):
        for b in range(a + 1, len(rects)):
            if rects[a][0] != rects[b][0] and hit(rects[a][1], rects[b][1], 3):
                print('F%s %s overlaps %s' % (f['id'], rects[a][0], rects[b][0])); bad += 1
print('overlaps:', bad)
