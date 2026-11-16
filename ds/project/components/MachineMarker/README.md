# MachineMarker
One station on the plan, drawn as a top-down outline of the machine: a treadmill shows its belt and console, a power rack its four posts and bar, a selectorized machine its weight stack, seat and pads.

- The drawing comes from `machine.kind` (40 kinds, e.g. `treadmill`, `power_rack`, `lat_pulldown`, `iso_row`). It fills the station's `x, y, w, h` box; tall boxes rotate the drawing 90°.
- Grouped stations (`count > 1`) tile one outline per unit in a grid that keeps each unit's proportions, so `Power Racks ×14` shows 14 racks.
- Parts: body (`paper-raised` fill, `line` stroke), detail lines, steel bars (`wall`), solid parts such as plates and posts (`line` fill), faint footprints (`grid-major`).
- States: `idle`; `hover` (scale 1.1, dashed amber footprint); `active` (amber wash, amber strokes, the selected machine); `match` (Carolina wash and strokes, matches the planner); `dim`.
- `showCode` prints the short code (and count) on the drawing with a paper-coloured halo.
- Renders an SVG `<g>`; place it inside an `<svg>`. Focusable, Enter/Space selects.
