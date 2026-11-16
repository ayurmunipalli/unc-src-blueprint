# SRC Blueprint

The design system for the SRC gym guide — a web app that helps UNC students see what the Student Recreation Center offers, where each machine is, and how to use it. The whole product lives on one idea: **the gym as an architectural drawing.** A bird's-eye blueprint of the fitness floor is the home screen; everything else (machine details, the planner, splits) is annotation on that drawing.

> **Source.** Floors, zones and the 60 stations in `SRC.data` are traced from the SRC floor plan (sheets E1 and E2, UNC Facilities Services, 02/05/09) and its hand annotations. Floor 1 is Room 112; Floor 2 is Rooms 208C/D plus Cardio Room 200. Positions are hand-traced and **approximate**; counts (14 power racks, 14 bikes, …) are as annotated, plus on-site corrections from the user (8 ellipticals in the Floor 2 band, a hallway elliptical, cable counts on the pull stations, the Floor 2 dip/chin assist folded into L2-08). The Floor 1 free-weight bench count is approximate (`×~6`). Every station is drawn as a top-down outline of its machine kind. How-to cues are general form guidance; each kind links a public YouTube how-to (IDs checked to exist).

## Content fundamentals

- **Voice: a calm spotter.** Short, direct, second person. "Pull the bar to your upper chest." Not "Engage your latissimus dorsi."
- **Plain muscle names** in chips and copy: Chest, Back, Shoulders, Biceps, Triceps, Quads, Hamstrings, Glutes, Calves, Core, Cardio. Anatomy terms only inside a form cue when they help.
- **Every station has a code** (`L1-08` = level 1, station 8) shown on the plan (Codes toggle), the card eyebrow and planner rows. The code is how a student matches a list to the map. Grouped stations carry a count (`Power Racks ×14`).
- **Sentence case** for titles and buttons ("Show me options"). UPPERCASE only for mono annotation (zone names, eyebrows, the title block).
- Never promise outcomes ("build huge arms"). Describe what a machine targets.

## Visual foundations

- **Ground:** `paper` cyanotype blue with a two-level drafting grid — `grid-minor` every 20px, `grid-major` every 100px. The grid is decoration and never carries meaning.
- **Lines, not shadows.** Depth is a 1px `line` hairline and one step of surface (`paper` → `paper-raised` → `paper-sunk`). No drop shadows anywhere.
- **Walls** use `wall` at `stroke-wall` (4px), the heaviest line in the system. Zones are dashed `line` outlines over a `zone-fill` wash, labelled in mono `label` style top-left.
- **Two signal colours, two jobs.** `accent` (Carolina blue) = *matches your goal* — selected chips, machines highlighted by the planner, primary buttons. `highlight` (amber) = *this one* — the single machine hovered or selected, focus rings, and placeholder flags. Blue vs. amber differ in lightness too, so they read apart without hue.
- **Square corners.** `radius-0` for the drawing, `radius-1` (2px) for markers, cards and buttons. `radius-pill` is reserved for muscle chips.
- **Type:** IBM Plex Sans for reading, IBM Plex Mono for anything that would be lettered on a drawing — codes, zone names, the title block, dimensions.
- **Motion:** one move — a machine marker scales to 1.1 on hover/focus in 140ms. Turned off under reduced motion.
- **Drafting theme** (light) is the same system printed as a diazo copy: navy ink on pale paper. Use it for print or bright-sun phone use.

## Interaction model

0. **Pick a floor** with the Floor 1 / Floor 2 switch above the plan.
1. **Hover / focus a machine** → marker scales up, outline turns `highlight`, a tip shows code, name, primary muscles and whether a how-to video is linked.
2. **Click a machine** → it fills `highlight` and the `MachineCard` opens (muscles, how-to cues, 9:16 YouTube Short slot).
3. **Planner** → `GoalPicker` asks what to train; chosen muscles turn matching markers `accent` and dim the rest to `opacity-dim`. Results list as `ExerciseRow`s with *Find on map*.
4. **Splits** → `SplitCard`s for Push/Pull/Legs, Arnold, Upper/Lower, Full Body and Bro Split.
5. **When to go** → `BusyHours` shows an *estimated* busy-hours chart; it is always flagged as an estimate.

## On phones

- The plan opens zoomed in (Floor 2 more, since it's wide) inside its own scroll box; students drag to pan, with −/%/+ zoom buttons. The page itself never scrolls sideways.
- Tapping a machine opens `MachineCard` as a bottom sheet (add the `bp-sheet` class) and scrolls the plan to that machine. Hover tips are off on touch screens.
- Tabs stretch full width; tap targets stay at least 36px.

## Iconography

No icon set. The blueprint vocabulary stands in: top-down machine outlines (see MachineMarker), machine codes, the north arrow, the scale bar, a CSS play triangle in the video slot. If icons are added later, draw them as 1.5px `line` strokes, square caps, on a 20px grid — like the drawing.

## Usage rules

- Text is `ink` or `ink-muted` on any paper surface; on `accent` use `on-accent`, on `highlight` use `on-highlight`.
- Only one machine is `highlight` at a time.
- Do not put the grid behind cards or text blocks — only behind the plan.
