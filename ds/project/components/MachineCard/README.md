# MachineCard
The detail card for one machine: code and zone, name, targeted muscles, how-to cues and a 9:16 slot linking to a YouTube how-to.

- Props: `machine` (from `SRC.data.MACHINES`, e.g. `SRC.data.byId('L1-30')`).
- The eyebrow reads code · floor · zone; grouped stations show their count after the name (`Power Racks ×14`).
- Primary muscles are solid chips; secondary are dashed.
- `machine.cues`: three general form cues for the machine kind (not SRC-specific guidance).
- `machine.video`: `{ id, title, channel, short, url }` for a public YouTube how-to (39 Shorts plus Concept2's rowing video), IDs checked to exist. The slot is a link that opens YouTube in a new tab, because artifact pages can't embed YouTube. If a kind has no video the slot shows a *NOT YET LINKED* flag.
