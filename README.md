# SRC Blueprint

An interactive, blueprint-style guide to the UNC Student Recreation Center (SRC): a bird's-eye floor plan of both floors with every machine drawn from above, what each machine works, form cues and a how-to video, a muscle-group planner, pre-loaded training splits, and an estimated busy-hours chart. Works on desktop and phones.

Open `index.html` in a browser (it loads React 18 from cdnjs and fonts from Google Fonts).

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | The app as a standalone page. Generated; don't edit by hand. |
| `src-blueprint-app.html` | Same app without the `<html>` wrapper (the version published as a claude.ai artifact). Generated. |
| `build/app.tpl.html` | App source: styles, components and the machine drawings. Data is injected at build time. |
| `build/data.json` | Floors, zones, the 60 stations, form cues, default sets and the splits. |
| `build/videos.json` | One YouTube how-to per machine kind (IDs checked to exist via oEmbed). |
| `build/build.py` | Builds `index.html` and `src-blueprint-app.html` from the template and data. |
| `ds/project/` | The SRC Blueprint design system (tokens, React component bundle, previews, docs). |
| `build/ds_sync.py` | Regenerates the design-system bundle from the app's data and drawings. |

Rebuild after editing data or the template:

```bash
python3 build/build.py
python3 build/ds_sync.py
```

## Data notes

- **Floor plan:** walls, zones and station positions are hand-traced from SRC sheets E1/E2 (UNC Facilities Services) plus on-site corrections. Positions are approximate; the map says so in its title block.
- **Muscles and form cues:** general exercise knowledge, not SRC-specific guidance.
- **Busy hours are an estimate.** Google's Popular Times isn't available to outside apps, so the chart shows a typical campus-gym pattern, clearly labeled as an estimate. Replace `BUSY` in `build/app.tpl.html` if real counts become available.
- The Floor 1 free-weight bench count (×~6) is approximate.
