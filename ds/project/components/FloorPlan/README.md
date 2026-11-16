# FloorPlan
The bird's-eye blueprint of an SRC floor: drafting grid, walls, dashed zones, a marker per station, north arrow and title block, with a Floor 1 / Floor 2 switch.

- Props: `floor` / `defaultFloor` (`"1"` | `"2"`), `onFloorChange(id)`, `showFloorSwitch` (default true), `selectedId`, `highlightMuscles` (string[] — matching stations turn `accent`, others dim), `onSelect(machine)`, `showTip` (default true).
- Data comes from `SRC.data.FLOORS` / `MACHINES`, traced from sheets E1 and E2. Each floor has its own viewBox (`w`, `h`) and scale `k`; text and strokes compensate so labels read the same size on both floors.
- Floor 1 is portrait, Floor 2 landscape — north stays up on both, matching the drawings.
- The consumer provides the selected state and what opens on select (usually `MachineCard` in a side panel or bottom sheet on phones).
- The amber flag in the title block says positions are approximate; keep it until positions are checked on site.
