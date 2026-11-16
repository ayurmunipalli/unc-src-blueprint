"""Sync the design system bundle (ds/project/components/bundle.js) with the app's data and glyphs."""
import json, os, re
here = os.path.dirname(os.path.abspath(__file__))
root = os.path.join(here, '..', 'ds', 'project')
src = open(os.path.join(here, 'ds_bundle.live.js')).read()
app = open(os.path.join(here, 'app.tpl.html')).read()
D = json.load(open(os.path.join(here, 'data.json')))
V = json.load(open(os.path.join(here, 'videos.json')))

def sub(s, a, b):
    assert s.count(a) == 1, (s.count(a), a[:80]); return s.replace(a, b)

# 1. data
dec = json.JSONDecoder(); i = src.index('var DATA = ') + len('var DATA = '); _, e = dec.raw_decode(src, i)
data = {'floors': D['floors'], 'machines': D['machines'], 'cues': D['cues'], 'videos': V}
s = src[:i] + json.dumps(data, ensure_ascii=False) + src[e:]

# 2. glyphs: helpers + new kinds, copied from the app
a = app.index('function pullStation('); b = app.index('var G = {')
helpers = ''.join('  ' + l + '\n' if l.strip() else '\n' for l in app[a:b].rstrip().split('\n'))
s = sub(s, '  var G = {', helpers + '\n  var G = {')
gi = s.index('    long_pull: { ar: 1.2,'); ge = s.index('\n', gi)
kinds = [l for l in app.split('\n') if re.match(r"  (long_pull|long_pull1|combo_assist|flat_bench): \{", l)]
assert len(kinds) == 4
s = s[:gi] + '\n'.join('  ' + l for l in kinds) + s[ge:]

# 3. approximate counts
s = sub(s, "hovered.id + (hovered.count > 1 ? ' · ×' + hovered.count : '')", "hovered.id + (hovered.count > 1 ? ' · ×' + (hovered.approxCount ? '~' : '') + hovered.count : '')")
s = sub(s, "h('span', { className: 'bp-count' }, ' ×' + m.count)", "h('span', { className: 'bp-count' }, ' ×' + (m.approxCount ? '~' : '') + m.count)")

# 4. BusyHours component (estimate), adapted from the app
a = app.index('var BUSY_HOURS = '); b = app.index('function BusyHours()')
consts = app[a:b]
busy_fn = '''function BusyHours(p) {
    var now = nowEastern(), Fragment = React.Fragment;
    var ds = useState(p.defaultDay || (DAYS.indexOf(now.day) >= 0 ? now.day : 'Mon')), day = ds[0], setDay = ds[1];
    var ps = useState(null), pick = ps[0], setPick = ps[1];
    var row = BUSY[day], isToday = day === now.day, nowIdx = isToday ? BUSY_HOURS.indexOf(now.hour) : -1;
    var shown = pick != null ? pick : nowIdx, quiet = quietRanges(row);
    return h('section', { className: 'bp-busy', 'aria-label': 'Busy hours' },
      h('div', { className: 'bp-busy-head' }, h('div', { className: 'bp-eyebrow' }, 'How busy is it?'), h('span', { className: 'bp-flag' }, 'ESTIMATE')),
      h('div', { className: 'bp-busy-days', role: 'group', 'aria-label': 'Day' }, DAYS.map(function (d) {
        return h('button', { key: d, type: 'button', className: 'bp-busy-day', 'aria-pressed': d === day ? 'true' : 'false', onClick: function () { setDay(d); setPick(null); } }, d.toUpperCase());
      })),
      h('div', { className: 'bp-busy-now' }, nowIdx >= 0
        ? h(Fragment, null, h('span', { className: 'bp-busy-dot' }), h('span', null, h('b', null, 'Now: '), busyWord(row[nowIdx]).toLowerCase() + ', usually'))
        : h('span', { className: 'bp-busy-muted' }, isToday ? 'Outside the hours shown (6a–11p).' : 'Typical ' + day + ' pattern')),
      h('div', { className: 'bp-bars', role: 'img', 'aria-label': 'Estimated busyness by hour on ' + day + ', 6 a.m. to 11 p.m.' }, row.map(function (v, i) {
        return h('button', { key: i, type: 'button', className: cx('bp-bar', i === nowIdx && 'is-now', i === pick && 'is-pick'), style: { height: Math.max(4, v) + '%' },
          'aria-label': hourLabel(BUSY_HOURS[i]) + ': ' + busyWord(v), onMouseEnter: function () { setPick(i); }, onFocus: function () { setPick(i); }, onClick: function () { setPick(i); } });
      })),
      h('div', { className: 'bp-bars-x', 'aria-hidden': 'true' }, BUSY_HOURS.map(function (hh, i) { return h('span', { key: i }, i % 3 === 0 ? hourLabel(hh) : ''); })),
      h('div', { className: 'bp-busy-pick' }, shown >= 0 ? h(Fragment, null, h('b', null, day + ' ' + hourLabel(BUSY_HOURS[shown])), ' · ' + busyWord(row[shown])) : null),
      h('p', { className: 'bp-busy-note' }, (quiet.length ? 'Usually quieter: ' + quiet.join(', ') + '. ' : '') +
        'Estimated from typical campus-gym traffic, not measured at the SRC and not live. Check SRC hours before you go.')
    );
  }
'''
block = '  /* ---------- BusyHours ---------- */\n' + ''.join('  ' + l + '\n' if l.strip() else '\n' for l in consts.rstrip().split('\n')) + '  ' + busy_fn
s = sub(s, '  var api = {', block + '\n  var api = {')
s = sub(s, 'ExerciseRow: ExerciseRow, Button: Button,\n', 'ExerciseRow: ExerciseRow, Button: Button, BusyHours: BusyHours,\n')
s = sub(s, 'machinesFor: machinesFor, byId: byId, isPlaceholder: false }', 'machinesFor: machinesFor, byId: byId, BUSY: BUSY, BUSY_HOURS: BUSY_HOURS, isPlaceholder: false }')
s = sub(s, '{"name":"Button"}]} */', '{"name":"Button"},{"name":"BusyHours"}]} */')
assert '</script' not in s and '<!--' not in s
open(os.path.join(root, 'components', 'bundle.js'), 'w').write(s)
print('bundle', len(s))
