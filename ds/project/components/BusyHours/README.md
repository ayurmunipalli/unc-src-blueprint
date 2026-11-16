# BusyHours
A "how busy is it?" chart in the shape of Google's Popular Times: a tab per day, one bar per hour from 6a to 10p, the current hour in `highlight` amber with a "Now: busy, usually" line, and the quieter windows listed under the chart.

- **Data: Google Popular Times** for "UNC Student Recreation Center" (typical week, not live), read from Google Search on 16 Nov 2026. The card carries a `FROM GOOGLE` flag and a dated footnote. Heights are relative to the busiest hour of the week (Mon 6p = 100); 0 means closed or no data.
- To refresh, re-read the chart from Google and replace `SRC.data.BUSY` (7 days × 17 hours, 0–100). Keep the date in the footnote current.
- Props: `defaultDay` (`"Mon"`…`"Sun"`; defaults to today in Eastern time).
- Levels: under 30 *not too busy*, under 55 *a little busy*, under 80 *busy*, otherwise *as busy as it gets*.
