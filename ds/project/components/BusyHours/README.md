# BusyHours
A "how busy is it?" chart in the shape of Google's Popular Times: a tab per day, one bar per hour from 6a to 11p, the current hour in `highlight` amber with a "Now: busy, usually" line, and the quieter windows listed under the chart.

- **The numbers are an estimate, and the card says so** (amber `ESTIMATE` flag plus a footnote). Google doesn't offer Popular Times to outside apps, so `SRC.data.BUSY` holds a typical campus-gym week: quiet mornings, a weekday peak around 5–7p, earlier and flatter weekends. Not measured at the SRC. Replace `BUSY` (7 days × 18 hours, 0–100) with real counts if the SRC publishes them, and drop the flag only then.
- Props: `defaultDay` (`"Mon"`…`"Sun"`; defaults to today in Eastern time).
- Levels: under 30 *not too busy*, under 55 *a little busy*, under 80 *busy*, otherwise *as busy as it gets*.
- Hover, focus or tap a bar to read that hour.
