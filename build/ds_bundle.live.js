/* @ds-bundle: {"format":4,"namespace":"SRC","components":[{"name":"FloorPlan"},{"name":"MachineMarker"},{"name":"MachineCard"},{"name":"MuscleChip"},{"name":"GoalPicker"},{"name":"SplitCard"},{"name":"ExerciseRow"},{"name":"Button"}]} */
(function () {
  var React = window.React, h = React.createElement, useState = React.useState;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }

  /* ---------- DATA ----------
     Floors, zones and machines traced from the SRC floor plan PDF (sheets E1 and E2,
     UNC Facilities Services, 02/05/09) and its hand annotations. Positions are
     approximate (hand-traced); counts are as annotated.
     Muscle groups are general exercise knowledge. cues: general form guidance (not SRC-specific).
     videos: public YouTube how-tos per machine kind, IDs verified to exist via oEmbed. */
  var DATA = {"floors": [{"id": "1", "name": "Floor 1", "room": "Room 112", "sheet": "E1", "w": 1038, "planH": 1200, "h": 1299, "k": 1.038, "walls": [[[187.5, 25.0], [1012.5, 25.0], [1012.5, 1182.5], [100.0, 1182.5], [100.0, 987.5], [25.0, 987.5], [25.0, 192.5], [187.5, 192.5]]], "zones": [{"id": "turf", "name": "Turf", "pts": [[192.5, 30.0], [807.5, 30.0], [807.5, 192.5], [192.5, 192.5]]}, {"id": "tires", "name": "Tires & Med Balls", "pts": [[812.5, 30.0], [1012.5, 30.0], [1012.5, 192.5], [812.5, 192.5]]}, {"id": "free", "name": "Free Weights", "pts": [[812.5, 192.5], [1012.5, 192.5], [1012.5, 975.0], [812.5, 975.0]]}, {"id": "machines", "name": "Machines", "pts": [[57.5, 192.5], [812.5, 192.5], [812.5, 712.5], [57.5, 712.5]]}, {"id": "legs", "name": "Leg Presses", "pts": [[25.0, 712.5], [212.5, 712.5], [212.5, 987.5], [25.0, 987.5]]}, {"id": "bench", "name": "Bench Press", "pts": [[212.5, 720.0], [432.5, 720.0], [432.5, 985.0], [212.5, 985.0]]}, {"id": "racks", "name": "Power Racks", "pts": [[432.5, 720.0], [812.5, 720.0], [812.5, 975.0], [842.5, 975.0], [842.5, 1182.5], [212.5, 1182.5], [212.5, 985.0], [432.5, 985.0]]}, {"id": "body", "name": "Bodyweight", "pts": [[842.5, 975.0], [1012.5, 975.0], [1012.5, 1182.5], [842.5, 1182.5]]}]}, {"id": "2", "name": "Floor 2", "room": "Rooms 200 & 208C/D", "sheet": "E2", "w": 1870, "planH": 770, "h": 948, "k": 1.87, "walls": [[[869.0, 22.0], [1837.0, 22.0], [1837.0, 759.0], [869.0, 759.0]], [[22.0, 358.6], [374.0, 358.6], [374.0, 473.0], [858.0, 473.0], [858.0, 704.0], [22.0, 704.0]]], "zones": [{"id": "free2", "name": "Free Weights", "pts": [[869.0, 22.0], [1188.0, 22.0], [1188.0, 259.6], [869.0, 259.6]]}, {"id": "machines2", "name": "Machines", "pts": [[1188.0, 22.0], [1342.0, 22.0], [1342.0, 484.0], [869.0, 484.0], [869.0, 259.6], [1188.0, 259.6]]}, {"id": "ell2", "name": "Ellipticals", "pts": [[869.0, 484.0], [1342.0, 484.0], [1342.0, 554.4], [869.0, 554.4]]}, {"id": "rowbike", "name": "Rowers & Bikes", "pts": [[1342.0, 22.0], [1837.0, 22.0], [1837.0, 180.4], [1342.0, 180.4]]}, {"id": "trx", "name": "TRX Bridge", "pts": [[1342.0, 180.4], [1837.0, 180.4], [1837.0, 264.0], [1342.0, 264.0]]}, {"id": "turf2", "name": "Turf", "pts": [[1342.0, 264.0], [1837.0, 264.0], [1837.0, 495.0], [1342.0, 495.0]]}, {"id": "racks2", "name": "Racks & Benches", "pts": [[1342.0, 495.0], [1837.0, 495.0], [1837.0, 572.0], [1342.0, 572.0]]}, {"id": "studio", "name": "Studio B — Group Fitness", "pts": [[869.0, 554.4], [1342.0, 554.4], [1342.0, 572.0], [1837.0, 572.0], [1837.0, 759.0], [869.0, 759.0]]}, {"id": "cardio200", "name": "Cardio Room 200", "pts": [[22.0, 358.6], [374.0, 358.6], [374.0, 473.0], [858.0, 473.0], [858.0, 704.0], [22.0, 704.0]]}]}], "machines": [{"id": "L1-01", "floor": "1", "name": "Treadmill", "zone": "machines", "x": 202.5, "y": 205.0, "w": 45.0, "h": 35.0, "count": 1, "primary": ["Cardio"], "secondary": ["Quads", "Calves"], "kind": "treadmill"}, {"id": "L1-02", "floor": "1", "name": "Bike", "zone": "machines", "x": 302.5, "y": 205.0, "w": 45.0, "h": 35.0, "count": 1, "primary": ["Cardio"], "secondary": ["Quads", "Glutes"], "kind": "bike"}, {"id": "L1-03", "floor": "1", "name": "Treadmill", "zone": "machines", "x": 402.5, "y": 205.0, "w": 45.0, "h": 35.0, "count": 1, "primary": ["Cardio"], "secondary": ["Quads", "Calves"], "kind": "treadmill"}, {"id": "L1-04", "floor": "1", "name": "Multi-Rig System (Eleiko)", "zone": "turf", "x": 570.0, "y": 140.0, "w": 175.0, "h": 35.0, "count": 1, "primary": ["Back", "Quads"], "secondary": ["Biceps", "Glutes", "Core"], "kind": "multi_rig"}, {"id": "L1-05", "floor": "1", "name": "Tires & Medicine Balls", "zone": "tires", "x": 842.5, "y": 67.5, "w": 140.0, "h": 90.0, "count": 1, "primary": ["Core", "Cardio"], "secondary": ["Glutes", "Shoulders"], "kind": "tires"}, {"id": "L1-06", "floor": "1", "name": "Chin / Dip Assist", "zone": "machines", "x": 82.5, "y": 260.0, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Back", "Triceps"], "secondary": ["Biceps", "Chest"], "kind": "chin_dip_assist"}, {"id": "L1-07", "floor": "1", "name": "Converging Shoulder Press", "zone": "machines", "x": 187.5, "y": 265.0, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Shoulders"], "secondary": ["Triceps"], "kind": "shoulder_press_machine"}, {"id": "L1-08", "floor": "1", "name": "Diverging Lat Pulldown", "zone": "machines", "x": 292.5, "y": 265.0, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Back"], "secondary": ["Biceps"], "kind": "lat_pulldown"}, {"id": "L1-09", "floor": "1", "name": "Diverging Low Row", "zone": "machines", "x": 397.5, "y": 265.0, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Back"], "secondary": ["Biceps", "Shoulders"], "kind": "low_row"}, {"id": "L1-10", "floor": "1", "name": "Converging Chest Press", "zone": "machines", "x": 502.5, "y": 265.0, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Chest"], "secondary": ["Triceps", "Shoulders"], "kind": "chest_press_machine"}, {"id": "L1-11", "floor": "1", "name": "Leg Press", "zone": "machines", "x": 625.0, "y": 267.5, "w": 75.0, "h": 50.0, "count": 1, "primary": ["Quads", "Glutes"], "secondary": ["Hamstrings"], "kind": "leg_press"}, {"id": "L1-12", "floor": "1", "name": "Leg Extension", "zone": "machines", "x": 270.0, "y": 345.0, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Quads"], "secondary": [], "kind": "leg_extension"}, {"id": "L1-13", "floor": "1", "name": "Seated Leg Curl", "zone": "machines", "x": 387.5, "y": 345.0, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Hamstrings"], "secondary": ["Calves"], "kind": "seated_leg_curl"}, {"id": "L1-14", "floor": "1", "name": "Rear Delt / Pec Fly", "zone": "machines", "x": 507.5, "y": 365.0, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Chest", "Shoulders"], "secondary": ["Back"], "kind": "pec_fly_rear_delt"}, {"id": "L1-15", "floor": "1", "name": "Prone Leg Curl", "zone": "machines", "x": 620.0, "y": 370.0, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Hamstrings"], "secondary": ["Glutes", "Calves"], "kind": "prone_leg_curl"}, {"id": "L1-16", "floor": "1", "name": "Adjustable Pulleys", "zone": "machines", "x": 742.5, "y": 322.5, "w": 65.0, "h": 70.0, "count": 4, "primary": ["Chest", "Back", "Shoulders", "Biceps", "Triceps"], "secondary": ["Core"], "kind": "cable_pulley"}, {"id": "L1-17", "floor": "1", "name": "Lat Pulldown / Long Pull + 2 Cables", "zone": "machines", "x": 232.5, "y": 487.5, "w": 85.0, "h": 75.0, "count": 1, "primary": ["Back"], "secondary": ["Biceps", "Triceps", "Shoulders"], "kind": "long_pull"}, {"id": "L1-18", "floor": "1", "name": "Lat Pulldown / Long Pull + 2 Cables", "zone": "machines", "x": 390.0, "y": 487.5, "w": 85.0, "h": 75.0, "count": 1, "primary": ["Back"], "secondary": ["Biceps", "Triceps", "Shoulders"], "kind": "long_pull"}, {"id": "L1-19", "floor": "1", "name": "Iso-Lateral Row", "zone": "machines", "x": 537.5, "y": 440.0, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Back"], "secondary": ["Biceps"], "kind": "iso_row"}, {"id": "L1-20", "floor": "1", "name": "Chest-Supported Biceps Curl", "zone": "machines", "x": 632.5, "y": 477.5, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Biceps"], "secondary": [], "kind": "preacher_curl_machine"}, {"id": "L1-21", "floor": "1", "name": "Seated Biceps Curl", "zone": "machines", "x": 732.5, "y": 477.5, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Biceps"], "secondary": [], "kind": "seated_curl_machine"}, {"id": "L1-22", "floor": "1", "name": "Seated Calf Raise (Hammer Strength)", "zone": "machines", "x": 102.5, "y": 615.0, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Calves"], "secondary": [], "kind": "seated_calf"}, {"id": "L1-23", "floor": "1", "name": "Iso-Lateral Decline Press", "zone": "machines", "x": 532.5, "y": 602.5, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Chest"], "secondary": ["Triceps"], "kind": "iso_decline"}, {"id": "L1-24", "floor": "1", "name": "Iso-Lateral Shoulder Press", "zone": "machines", "x": 627.5, "y": 602.5, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Shoulders"], "secondary": ["Triceps"], "kind": "iso_shoulder"}, {"id": "L1-25", "floor": "1", "name": "Iso-Lateral High Row", "zone": "machines", "x": 722.5, "y": 602.5, "w": 60.0, "h": 45.0, "count": 1, "primary": ["Back"], "secondary": ["Biceps", "Shoulders"], "kind": "iso_high_row"}, {"id": "L1-26", "floor": "1", "name": "Linear Leg Press", "zone": "legs", "x": 77.5, "y": 777.5, "w": 70.0, "h": 45.0, "count": 1, "primary": ["Quads", "Glutes"], "secondary": ["Hamstrings"], "kind": "linear_leg_press"}, {"id": "L1-27", "floor": "1", "name": "Hack Squat", "zone": "legs", "x": 77.5, "y": 877.5, "w": 70.0, "h": 45.0, "count": 1, "primary": ["Quads"], "secondary": ["Glutes"], "kind": "hack_squat"}, {"id": "L1-28", "floor": "1", "name": "Glute-Ham Raise Bench", "zone": "legs", "x": 125.0, "y": 1070.0, "w": 60.0, "h": 35.0, "count": 1, "primary": ["Hamstrings", "Glutes"], "secondary": ["Core"], "kind": "ghr"}, {"id": "L1-29", "floor": "1", "name": "Bench Press", "zone": "bench", "x": 235.0, "y": 852.5, "w": 175.0, "h": 110.0, "count": 4, "primary": ["Chest"], "secondary": ["Triceps", "Shoulders"], "kind": "bench_press"}, {"id": "L1-30", "floor": "1", "name": "Power Racks", "zone": "racks", "x": 475.0, "y": 750.0, "w": 325.0, "h": 200.0, "count": 14, "primary": ["Quads", "Glutes", "Back"], "secondary": ["Hamstrings", "Core", "Shoulders"], "kind": "power_rack"}, {"id": "L1-31", "floor": "1", "name": "Dip Station", "zone": "body", "x": 877.5, "y": 995.0, "w": 100.0, "h": 35.0, "count": 2, "primary": ["Triceps", "Chest"], "secondary": ["Shoulders"], "kind": "dip_station"}, {"id": "L1-32", "floor": "1", "name": "Roman Chair", "zone": "body", "x": 877.5, "y": 1050.0, "w": 100.0, "h": 35.0, "count": 1, "primary": ["Core"], "secondary": ["Glutes", "Hamstrings"], "kind": "roman_chair"}, {"id": "L1-33", "floor": "1", "name": "Glute / Ham Raise Bench", "zone": "body", "x": 877.5, "y": 1105.0, "w": 100.0, "h": 35.0, "count": 1, "primary": ["Hamstrings", "Glutes"], "secondary": ["Core"], "kind": "ghr"}, {"id": "L1-34", "floor": "1", "name": "Dumbbells & Free Weights", "zone": "free", "x": 852.5, "y": 287.5, "w": 120.0, "h": 600.0, "count": 1, "primary": ["Chest", "Back", "Shoulders", "Biceps", "Triceps"], "secondary": ["Quads", "Glutes"], "kind": "dumbbells"}, {"id": "L1-35", "floor": "1", "name": "Turf Lane", "zone": "turf", "x": 225.0, "y": 67.5, "w": 275.0, "h": 70.0, "count": 1, "primary": ["Quads", "Glutes", "Cardio"], "secondary": ["Core"], "kind": "turf_sled"}, {"id": "L2-01", "floor": "2", "name": "Dumbbells & Free Weights", "zone": "free2", "x": 906.4, "y": 83.6, "w": 242.0, "h": 132.0, "count": 1, "primary": ["Chest", "Back", "Shoulders", "Biceps", "Triceps"], "secondary": ["Quads", "Glutes"], "kind": "dumbbells"}, {"id": "L2-02", "floor": "2", "name": "Elliptical", "zone": "machines2", "x": 884.4, "y": 275.0, "w": 35.2, "h": 44.0, "count": 1, "primary": ["Cardio"], "secondary": ["Quads", "Glutes"], "kind": "elliptical"}, {"id": "L2-03", "floor": "2", "name": "Elliptical", "zone": "machines2", "x": 1188.0, "y": 94.6, "w": 30.8, "h": 96.8, "count": 1, "primary": ["Cardio"], "secondary": ["Quads", "Glutes"], "kind": "elliptical"}, {"id": "L2-04", "floor": "2", "name": "Inner / Outer Thigh", "zone": "machines2", "x": 1251.8, "y": 132.0, "w": 48.4, "h": 66.0, "count": 1, "primary": ["Glutes"], "secondary": ["Adductors"], "kind": "hip_adductor"}, {"id": "L2-05", "floor": "2", "name": "Angled Leg Press", "zone": "machines2", "x": 1258.4, "y": 255.2, "w": 57.2, "h": 39.6, "count": 1, "primary": ["Quads", "Glutes"], "secondary": ["Hamstrings"], "kind": "leg_press"}, {"id": "L2-06", "floor": "2", "name": "Hip Thrust (Elite)", "zone": "machines2", "x": 1258.4, "y": 332.2, "w": 57.2, "h": 39.6, "count": 1, "primary": ["Glutes"], "secondary": ["Hamstrings"], "kind": "hip_thrust_machine"}, {"id": "L2-07", "floor": "2", "name": "Low Row / Lat Pulldown + 2 Cables", "zone": "machines2", "x": 961.4, "y": 352.0, "w": 70.4, "h": 66.0, "count": 1, "primary": ["Back"], "secondary": ["Biceps", "Triceps", "Shoulders"], "kind": "long_pull"}, {"id": "L2-08", "floor": "2", "name": "Low Row / Lat Pulldown + 2 Cables", "zone": "machines2", "x": 1097.8, "y": 352.0, "w": 70.4, "h": 66.0, "count": 1, "primary": ["Back"], "secondary": ["Biceps", "Triceps", "Shoulders"], "kind": "long_pull"}, {"id": "L2-09", "floor": "2", "name": "Dip / Chin Assist", "zone": "machines2", "x": 1212.2, "y": 398.2, "w": 52.8, "h": 39.6, "count": 1, "primary": ["Back", "Triceps"], "secondary": ["Biceps", "Chest"], "kind": "chin_dip_assist"}, {"id": "L2-10", "floor": "2", "name": "Ellipticals", "zone": "ell2", "x": 939.4, "y": 497.2, "w": 330.0, "h": 44.0, "count": 4, "primary": ["Cardio"], "secondary": ["Quads", "Glutes"], "kind": "elliptical"}, {"id": "L2-11", "floor": "2", "name": "Erg Rowers", "zone": "rowbike", "x": 1359.6, "y": 35.2, "w": 154.0, "h": 52.8, "count": 4, "primary": ["Cardio", "Back"], "secondary": ["Quads", "Biceps"], "kind": "rower"}, {"id": "L2-12", "floor": "2", "name": "Bikes", "zone": "rowbike", "x": 1600.5, "y": 30.8, "w": 209.0, "h": 52.8, "count": 4, "primary": ["Cardio"], "secondary": ["Quads", "Glutes"], "kind": "bike"}, {"id": "L2-13", "floor": "2", "name": "TRX Suspension Training Bridge", "zone": "trx", "x": 1368.4, "y": 193.6, "w": 440.0, "h": 57.2, "count": 1, "primary": ["Core", "Back", "Chest"], "secondary": ["Shoulders", "Glutes"], "kind": "trx"}, {"id": "L2-14", "floor": "2", "name": "Turf", "zone": "turf2", "x": 1456.4, "y": 334.4, "w": 264.0, "h": 88.0, "count": 1, "primary": ["Quads", "Glutes", "Cardio"], "secondary": ["Core"], "kind": "turf_sled"}, {"id": "L2-15", "floor": "2", "name": "Power Rack Wall Bridge", "zone": "racks2", "x": 1353.0, "y": 508.2, "w": 140.8, "h": 48.4, "count": 1, "primary": ["Quads", "Glutes", "Back"], "secondary": ["Hamstrings", "Core"], "kind": "power_rack"}, {"id": "L2-16", "floor": "2", "name": "Bench Press", "zone": "racks2", "x": 1518.0, "y": 508.2, "w": 132.0, "h": 48.4, "count": 1, "primary": ["Chest"], "secondary": ["Triceps", "Shoulders"], "kind": "bench_press"}, {"id": "L2-17", "floor": "2", "name": "Free Weights", "zone": "racks2", "x": 1667.6, "y": 508.2, "w": 154.0, "h": 48.4, "count": 1, "primary": ["Chest", "Back", "Shoulders", "Biceps", "Triceps"], "secondary": ["Quads", "Glutes"], "kind": "dumbbells"}, {"id": "L2-18", "floor": "2", "name": "StairMasters", "zone": "cardio200", "x": 55.0, "y": 429.0, "w": 88.0, "h": 198.0, "count": 6, "primary": ["Cardio", "Glutes"], "secondary": ["Quads", "Calves"], "kind": "stairmaster"}, {"id": "L2-19", "floor": "2", "name": "Treadmills", "zone": "cardio200", "x": 182.6, "y": 396.0, "w": 132.0, "h": 264.0, "count": 10, "primary": ["Cardio"], "secondary": ["Quads", "Calves"], "kind": "treadmill"}, {"id": "L2-20", "floor": "2", "name": "Bikes", "zone": "cardio200", "x": 396.0, "y": 486.2, "w": 220.0, "h": 39.6, "count": 14, "primary": ["Cardio"], "secondary": ["Quads", "Glutes"], "kind": "bike"}, {"id": "L2-21", "floor": "2", "name": "Arm Bike", "zone": "cardio200", "x": 631.4, "y": 486.2, "w": 35.2, "h": 39.6, "count": 1, "primary": ["Cardio", "Shoulders"], "secondary": ["Biceps", "Triceps"], "kind": "arm_bike"}, {"id": "L2-22", "floor": "2", "name": "Ellipticals", "zone": "cardio200", "x": 385.0, "y": 622.6, "w": 308.0, "h": 57.2, "count": 6, "primary": ["Cardio"], "secondary": ["Quads", "Glutes"], "kind": "elliptical"}, {"id": "L2-23", "floor": "2", "name": "StairMaster", "zone": "cardio200", "x": 726.0, "y": 521.4, "w": 88.0, "h": 35.2, "count": 1, "primary": ["Cardio", "Glutes"], "secondary": ["Quads", "Calves"], "kind": "stairmaster"}, {"id": "L2-24", "floor": "2", "name": "Treadmill", "zone": "cardio200", "x": 726.0, "y": 591.8, "w": 88.0, "h": 35.2, "count": 1, "primary": ["Cardio"], "secondary": ["Quads", "Calves"], "kind": "treadmill"}], "cues": {"treadmill": ["Straddle the belt, clip the safety key to your clothing, then start at walking speed.", "Stand tall near the front, look ahead, and hold the rails only for balance.", "Raise speed or incline gradually. Pull the key or press stop to end."], "bike": ["Set the saddle so your knee stays slightly bent at the bottom of the pedal stroke.", "Strap your feet in and keep your knees tracking over your toes.", "Raise resistance, not only cadence, to make it harder."], "elliptical": ["Step on while holding the fixed handles; keep your feet flat on the pedals.", "Stand upright and push through your whole foot, heels down.", "Use the moving handles to add your arms. Pedal backward to shift work toward hamstrings and glutes."], "stairmaster": ["Start slow and step onto the whole stair, not just your toes.", "Stand tall with light hands on the rails; don't lean on them.", "Pick a speed you can hold without hanging on, then add time."], "arm_bike": ["Set the seat so the crank sits level with your shoulders.", "Sit tall, brace your core, and turn the handles in smooth circles.", "Alternate forward and backward intervals."], "rower": ["Strap the feet across the widest part of your shoe. A damper of 3–5 suits most people.", "Drive in order: legs, then lean back slightly, then pull the handle to your lower ribs.", "Return in reverse: arms, body, then knees. Your legs make most of the power."], "multi_rig": ["Pick the bar height for the move: pull-ups, hanging knee raises or band work.", "For pull-ups, start from a dead hang, pull your chest toward the bar and lower under control.", "Clear plates and bands when you finish."], "tires": ["Squat down with your chest against the tire and fingers under the tread.", "Drive with legs and hips first, then push the tire over.", "Med-ball slams: lift the ball overhead, slam it in front of you, squat to pick it up."], "chin_dip_assist": ["Pick the assist weight. More weight means more help.", "Dips: kneel on the pad, grip the handles and lower until your elbows bend about 90°.", "Chin-ups: pull your chin over the bar, then lower slowly to a full hang."], "shoulder_press_machine": ["Set the seat so the handles start at about shoulder height.", "Keep your back flat on the pad and press up without slamming into lockout.", "Lower slowly back to shoulder height."], "lat_pulldown": ["Lock your thighs under the pad and grip a little wider than your shoulders.", "Lean back slightly and pull the bar to your upper chest, elbows driving down.", "Let the bar rise slowly until your arms are straight."], "low_row": ["Set the chest pad so you reach the handles with straight arms.", "Keep your chest on the pad and pull the handles toward your torso.", "Squeeze your shoulder blades together, then return slowly."], "chest_press_machine": ["Set the seat so the handles line up with mid-chest.", "Keep your shoulder blades back on the pad and press until your arms are nearly straight.", "Return slowly until you feel a stretch across your chest."], "leg_press": ["Sit all the way back, feet shoulder-width in the middle of the platform.", "Release the safeties and lower until your knees reach about 90°, lower back on the pad.", "Press through your heels without locking your knees, then re-engage the safeties."], "leg_extension": ["Line your knee up with the machine's pivot and set the pad on your lower shin.", "Straighten your legs and pause briefly at the top.", "Lower under control; don't let the stack slam."], "seated_leg_curl": ["Line your knee up with the pivot; heel pad just above the heel, thigh pad snug.", "Curl your heels down and back as far as you can.", "Return slowly to straight legs."], "pec_fly_rear_delt": ["Pec fly: sit facing out, handles at chest height, bring them together in a wide hug.", "Rear delt: face the pad, take the handles and open your arms back with a slight elbow bend.", "Set the arm position for the mode you're using before you load it."], "prone_leg_curl": ["Lie face down with your knees just past the bench edge and the pad above your heels.", "Keep your hips down and curl your heels toward your glutes.", "Lower slowly to nearly straight."], "cable_pulley": ["Set the pulley height for the move: high for pushdowns, low for curls, chest height for flys.", "Clip on the attachment you need and start light.", "Brace and move through a smooth full range; don't let the stack slam."], "long_pull": ["Pulldown side: thighs under the pad, pull the bar to your upper chest.", "Long-pull side: feet on the plate, knees soft, back straight; pull the handle to your stomach.", "Return slowly on both sides so the weights don't crash.", "Single cables (2 on this station): clip on a rope, bar or handle for pushdowns, curls or face pulls, and set the pulley height first."], "iso_row": ["Set the seat so the handles sit at chest height, chest on the pad.", "Pull with one or both arms, driving your elbows back.", "Each arm moves on its own, so control both sides through the full range."], "preacher_curl_machine": ["Set the seat so your armpits sit at the top of the pad.", "Keep the backs of your arms on the pad and curl the handles up.", "Lower until your arms are almost straight."], "seated_curl_machine": ["Line your elbows up with the machine's pivot.", "Curl up without lifting your elbows off the pad.", "Lower slowly to full extension."], "seated_calf": ["Balls of your feet on the platform, pad snug over your lower thighs.", "Release the safety and drop your heels for a full stretch.", "Rise as high as you can on your toes and pause."], "iso_decline": ["Set the seat so the handles line up with your lower chest.", "Press out and slightly down until your arms are nearly straight.", "Lower under control. Each arm moves on its own."], "iso_shoulder": ["Set the seat so the handles start at shoulder height.", "Keep your back flat on the pad and press overhead.", "Lower slowly. Load plates evenly on both arms."], "iso_high_row": ["Set the seat so you reach the handles with arms fully extended.", "Pull down and back toward your chest, elbows driving down.", "Return slowly with your chest against the pad."], "linear_leg_press": ["Sit back, feet shoulder-width on the platform.", "Lower until your knees reach about 90° without your hips lifting off the pad.", "Press through your heels, keeping a soft knee at the top."], "hack_squat": ["Shoulders under the pads, back flat, feet shoulder-width and slightly forward.", "Release the safeties and squat until your thighs are about parallel.", "Drive up through your whole foot, then re-engage the safeties."], "ghr": ["Set the foot plate so your knees sit just behind the pad.", "Lower your upper body forward with hips straight, then pull back up with your hamstrings.", "Push off with your hands on the way up if you need help."], "bench_press": ["Lie with your eyes under the bar, feet flat, shoulder blades pulled back.", "Unrack, lower the bar to mid-chest, then press it back up over your shoulders.", "Use a spotter or set the safeties for heavy sets."], "power_rack": ["Set the J-hooks at upper-chest height and the safeties just below your lowest squat point.", "Bar on your upper back, feet shoulder-width; brace and squat to at least parallel.", "Stand up through your whole foot, then walk the bar forward into the hooks."], "dip_station": ["Grip the bars and push up to straight arms, shoulders down.", "Lower until your elbows bend about 90°. Lean forward a little to use more chest.", "Press back up to straight arms."], "roman_chair": ["Set the pad just below your hip crease with heels under the rollers.", "Lower your upper body with a flat back.", "Rise until your body forms a straight line; don't arch past it."], "dumbbells": ["Pick a weight you can move with good form for every rep.", "Lift dumbbells off the rack with a flat back and no twisting.", "Put each pair back in its labeled spot."], "turf_sled": ["Load the sled light to start.", "Lean in with arms extended and drive with short, powerful steps.", "Keep your back flat and push through the balls of your feet."], "hip_adductor": ["Set the pads for a comfortable starting width.", "Inner thigh: squeeze your legs together. Outer thigh: switch the pads and push out.", "Return slowly; don't let the weight pull you open."], "hip_thrust_machine": ["Sit with your upper back on the pad and the hip pad across your hips.", "Feet flat, placed so your shins are vertical at the top.", "Drive your hips up, squeeze your glutes, then lower under control."], "trx": ["Adjust the strap length for the exercise, then lean so the straps stay taut.", "Hold your body in a straight plank line the whole time.", "Make it harder or easier by moving your feet closer to or farther from the anchor."]}, "videos": {"treadmill": {"id": "kr9fHMbztn0", "title": "Treadmill Basics for Beginners | How to Use a Treadmill Safely 🏃‍♀️ #treadmill #planetfitness", "channel": "Emily Elle", "short": true}, "bike": {"id": "LDjn1JkNUkQ", "title": "How To Adjust A Spin Bike | Aleks Physio | #shorts", "channel": "Aleks Physio", "short": true}, "elliptical": {"id": "dBMotc3AiVc", "title": "ELLIPTICAL TUTORIAL 🏃🏻‍♂️ // Low-impact cardio that uses your full body at Planet Fitness!", "channel": "KevTheTrainer", "short": true}, "stairmaster": {"id": "LM9lgFK4mkk", "title": "How to PROPERLY Use The Stair Master Machine", "channel": "Gerardi Performance", "short": true}, "arm_bike": {"id": "srTblKIoYOY", "title": "SCIFIT UPPER BODY EXERCISER MACHINE TUTORIAL 🔥 // Perform upper body cardio at Planet Fitness!", "channel": "KevTheTrainer", "short": true}, "rower": {"id": "4zWu1yuJ0_g", "title": "Correct Rowing Machine Technique, Improve Your Rowing  | Concept2", "channel": "concept2usa", "short": false}, "multi_rig": {"id": "eDP_OOhMTZ4", "title": "The Perfect Pull-Up (FIX THESE!)", "channel": "Andrew Kwong (DeltaBolic)", "short": true}, "tires": {"id": "99DLQtHP7jE", "title": "DO THIS, NOT THAT! Med Ball Slams", "channel": "Elevate Sports Performance & Healthcare", "short": true}, "chin_dip_assist": {"id": "CdO5BvP6Ti8", "title": "Learn Assisted Pull Ups in 13 Seconds ✅", "channel": "Aakash Wadhwani", "short": true}, "shoulder_press_machine": {"id": "6v4nrRVySj0", "title": "✅ The PERFECT Machine Shoulder Press!", "channel": "Andrew Kwong (DeltaBolic)", "short": true}, "lat_pulldown": {"id": "hnSqbBk15tw", "title": "Stop Messing Up Your Lat Pulldowns", "channel": "Jeff Nippard", "short": true}, "low_row": {"id": "Kh2WA2Y1M0k", "title": "Machine seated row", "channel": "James Gardner Personal Training", "short": true}, "chest_press_machine": {"id": "Qu7-ceCvq7w", "title": "The PERFECT Machine Chest Press", "channel": "Andrew Kwong (DeltaBolic)", "short": true}, "leg_press": {"id": "nDh_BlnLCGc", "title": "How To Leg Press With Perfect Technique", "channel": "Jeff Nippard", "short": true}, "leg_extension": {"id": "iQ92TuvBqRo", "title": "✅ The Perfect Leg Extension", "channel": "Andrew Kwong (DeltaBolic)", "short": true}, "seated_leg_curl": {"id": "xdbEG3xGLI8", "title": "✅ The PERFECT Seated Leg Curl Tips", "channel": "Andrew Kwong (DeltaBolic)", "short": true}, "pec_fly_rear_delt": {"id": "O2J8Qs7Wl3U", "title": "How to do Reverse Flys for Rear Delts on Pec Deck Fly", "channel": "TylerPath", "short": true}, "prone_leg_curl": {"id": "FRy58-v0YII", "title": "Lying Leg Curl Machine settings for Beginners..✅ #gym #fitness #bodybuidling #workout", "channel": "Aakash Wadhwani", "short": true}, "cable_pulley": {"id": "hJVbJxClBEw", "title": "Ever wondered how to use the cable machines? We've got you covered! 💪", "channel": "PureGym", "short": true}, "long_pull": {"id": "qD1WZ5pSuvk", "title": "Cable Row Form Tips (DO THIS!)", "channel": "Andrew Kwong (DeltaBolic)", "short": true}, "iso_row": {"id": "S3vT0sDakE0", "title": "Master Your Iso-Lateral Row | Hammer Strength Technique Breakdown", "channel": "Life Fitness Australia", "short": true}, "preacher_curl_machine": {"id": "eYrAV7rnol0", "title": "How to SETUP for machine preacher curl", "channel": "TylerPath", "short": true}, "seated_curl_machine": {"id": "XFAYzZgcbSc", "title": "BICEP CURL MACHINE TUTORIAL 💪🏼 // Use this machine to build arm strength! #workout #planetfitness", "channel": "KevTheTrainer", "short": true}, "seated_calf": {"id": "S2yhz3klwdU", "title": "Seated calf raise machine demo", "channel": "The Arena Gym", "short": true}, "iso_decline": {"id": "r_TE65qSYcA", "title": "Hammer Strength Ms Decline Chest Press Machine (pectoralis major)", "channel": "Fitnesslab", "short": true}, "iso_shoulder": {"id": "75S_MnTSyz4", "title": "ISO LATERAL SHOULDER PRESS (How To)", "channel": "Marzrodie", "short": true}, "iso_high_row": {"id": "D_fwbrbHgPk", "title": "Hammer Strength High Row Machine (latissimus dorsi, rhomboids, mid traps)", "channel": "Fitnesslab", "short": true}, "linear_leg_press": {"id": "PBnh2I0nxmc", "title": "Horizontal Leg Press", "channel": "Patrick Fallis", "short": true}, "hack_squat": {"id": "g9i05umL5vc", "title": "How to Hack Squat #beginner #fitnesstip #howto", "channel": "Jeremy Sry", "short": true}, "ghr": {"id": "blX1If7ScxY", "title": "How to use the GLUTE HAM RAISE", "channel": "TylerPath", "short": true}, "bench_press": {"id": "hWbUlkb5Ms4", "title": "How To Bench Press With Perfect Technique (5 Steps)", "channel": "Jeff Nippard", "short": true}, "power_rack": {"id": "dW3zj79xfrc", "title": "✅ The PERFECT Barbell Squat", "channel": "Andrew Kwong (DeltaBolic)", "short": true}, "dip_station": {"id": "CrbIq-T-h8I", "title": "✅ Learn the “Perfect” Dip", "channel": "SaturnoMovement", "short": true}, "roman_chair": {"id": "EKNRR9cSy9E", "title": "Roman chair back extension!", "channel": "Alex Lueth", "short": true}, "dumbbells": {"id": "Y0tHBLzEPE8", "title": "Ultimate Beginner's Full Body Dumbbell Workout! 💪🏼 #beginnerfriendlyworkout", "channel": "Workout With Roxanne", "short": true}, "turf_sled": {"id": "Qw8q55JR5VY", "title": "Hyrox sled push technique. #hyrox #technique", "channel": "Juxfit", "short": true}, "hip_adductor": {"id": "iPLvw74e7Tk", "title": "HIP ADDUCTOR MACHINE 🦵🏼// Activate those inner thighs. #lowerbodyworkout #planetfitness", "channel": "KevTheTrainer", "short": true}, "hip_thrust_machine": {"id": "sxOrVuCvWq4", "title": "The PERFECT Machine Hip Thrust", "channel": "Andrew Kwong (DeltaBolic)", "short": true}, "trx": {"id": "W71cXX9vcbc", "title": "Don't know where to starts? Start with the TRX Suspension Trainer", "channel": "TRXtraining", "short": true}, "cable_pushdown": {"id": "1FjkhpZsaxc", "title": "The Perfect Triceps Pushdown (DO THIS!)", "channel": "Andrew Kwong (DeltaBolic)", "short": true}}};
  var FLOORS = DATA.floors, MACHINES = DATA.machines;
  var MUSCLES = ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Core', 'Cardio'];
  var VIDEOS = DATA.videos, CUES = DATA.cues;
  MACHINES.forEach(function (m) {
    var v = VIDEOS[m.kind];
    m.video = v && v.id ? { id: v.id, title: v.title, channel: v.channel, short: v.short, url: (v.short ? 'https://www.youtube.com/shorts/' : 'https://www.youtube.com/watch?v=') + v.id } : null;
    m.cues = CUES[m.kind] || [];
  });
  var ZONES = [];
  FLOORS.forEach(function (f) { f.zones.forEach(function (z) { ZONES.push(Object.assign({ floor: f.id }, z)); }); });

  var SPLITS = [
    { id: 'ppl', name: 'Push / Pull / Legs', perWeek: '3 or 6 days', desc: 'Groups muscles by movement. Run it once or twice through per week.',
      days: [{ d: 'D1', focus: 'Push — chest, shoulders, triceps' }, { d: 'D2', focus: 'Pull — back, biceps' }, { d: 'D3', focus: 'Legs — quads, hamstrings, glutes, calves' }] },
    { id: 'arnold', name: 'Arnold Split', perWeek: '6 days', desc: 'High-volume classic: antagonists paired, every muscle twice a week.',
      days: [{ d: 'D1', focus: 'Chest + back' }, { d: 'D2', focus: 'Shoulders + arms' }, { d: 'D3', focus: 'Legs' }, { d: 'D4–6', focus: 'Repeat' }] },
    { id: 'ul', name: 'Upper / Lower', perWeek: '4 days', desc: 'Simple and balanced. Good first split after full-body.',
      days: [{ d: 'D1', focus: 'Upper' }, { d: 'D2', focus: 'Lower' }, { d: 'D3', focus: 'Upper' }, { d: 'D4', focus: 'Lower' }] },
    { id: 'fb', name: 'Full Body', perWeek: '3 days', desc: 'Whole body each session. Best for beginners and busy weeks.',
      days: [{ d: 'D1', focus: 'Full body A' }, { d: 'D2', focus: 'Full body B' }, { d: 'D3', focus: 'Full body A' }] },
    { id: 'bro', name: 'Bro Split', perWeek: '5 days', desc: 'One muscle group per day, lots of volume per session.',
      days: [{ d: 'D1', focus: 'Chest' }, { d: 'D2', focus: 'Back' }, { d: 'D3', focus: 'Shoulders' }, { d: 'D4', focus: 'Arms' }, { d: 'D5', focus: 'Legs' }] }
  ];

  function byId(id) { return MACHINES.filter(function (m) { return m.id === id; })[0]; }
  function floorOf(id) { return FLOORS.filter(function (f) { return f.id === id; })[0]; }
  function zoneOf(m) { return ZONES.filter(function (z) { return z.id === m.zone; })[0]; }
  function machinesFor(muscles, list) {
    list = list || MACHINES;
    if (!muscles || !muscles.length) return [];
    function hit(arr) { return arr.some(function (x) { return muscles.indexOf(x) >= 0; }); }
    return list.filter(function (m) { return hit(m.primary) || hit(m.secondary); })
      .sort(function (a, b) { return (hit(a.primary) ? 0 : 1) - (hit(b.primary) ? 0 : 1); });
  }

  /* ---------- Button ---------- */
  function Button(p) {
    var variant = p.variant || 'ghost';
    var rest = Object.assign({}, p); delete rest.variant; delete rest.className;
    return h('button', Object.assign({ type: 'button' }, rest, { className: cx('bp-btn', variant === 'primary' && 'bp-btn--primary', p.className) }));
  }

  /* ---------- MuscleChip ---------- */
  function MuscleChip(p) {
    var tone = p.tone || 'primary';
    if (p.onToggle == null && p.selected == null) {
      return h('span', { className: cx('bp-chip', 'bp-chip--static', tone === 'secondary' && 'bp-chip--secondary') }, p.children);
    }
    return h('button', { type: 'button', className: cx('bp-chip', tone === 'secondary' && 'bp-chip--secondary'), 'aria-pressed': p.selected ? 'true' : 'false', onClick: p.onToggle }, p.children);
  }

  /* ---------- Top-down glyphs ----------
     Each machine kind is drawn from above inside a landscape W x H box; portrait boxes are rotated 90°.
     Grouped stations (count > 1) tile one glyph per unit. Classes: b body, d detail, bar steel bar, s solid part, f faint. */
  function R(x, y, w, hh, c, rx) { return ['rect', { x: x, y: y, width: Math.max(0, w), height: Math.max(0, hh), rx: rx || 0, className: c || 'b' }]; }
  function C(x, y, r, c) { return ['circle', { cx: x, cy: y, r: Math.max(0.5, r), className: c || 'b' }]; }
  function L(x1, y1, x2, y2, c) { return ['line', { x1: x1, y1: y1, x2: x2, y2: y2, className: c || 'd' }]; }
  function P(d, c) { return ['path', { d: d, className: c || 'd' }]; }
  function stackLines(x, y, w, hh, n) { var o = [R(x, y, w, hh, 'b', 1)]; for (var i = 1; i < n; i++) o.push(L(x + w * 0.15, y + hh * i / n, x + w * 0.85, y + hh * i / n)); return o; }

  function seated(W, H, v) {
    var o = stackLines(0, H * 0.2, W * 0.2, H * 0.6, 5);
    o.push(L(W * 0.2, H * 0.5, W * 0.55, H * 0.5, 'f'));
    if (v !== 'assist') { o.push(R(W * 0.56, H * 0.3, W * 0.22, H * 0.4, 'b', 2), R(W * 0.8, H * 0.24, W * 0.08, H * 0.52, 'b', 2)); }
    switch (v) {
      case 'press': o.push(P('M' + W * .66 + ' ' + H * .14 + ' L' + W * .38 + ' ' + H * .36, 'bar'), P('M' + W * .66 + ' ' + H * .86 + ' L' + W * .38 + ' ' + H * .64, 'bar'), R(W * .34, H * .32, W * .05, H * .08, 's'), R(W * .34, H * .6, W * .05, H * .08, 's')); break;
      case 'pulldown': o.push(L(W * .44, H * .04, W * .44, H * .96, 'bar'), R(W * .48, H * .3, W * .05, H * .4, 'b', 2), L(W * .2, H * .5, W * .44, H * .5, 'd')); break;
      case 'row': o.push(R(W * .38, H * .3, W * .07, H * .4, 'b', 2), L(W * .3, H * .22, W * .3, H * .78, 'bar')); break;
      case 'legext': o.push(R(W * .44, H * .22, W * .06, H * .56, 'b', 2), L(W * .47, H * .5, W * .6, H * .5)); break;
      case 'legcurl': o.push(R(W * .5, H * .22, W * .05, H * .56, 'b', 2), R(W * .36, H * .22, W * .05, H * .56, 'b', 2)); break;
      case 'fly': o.push(P('M' + W * .72 + ' ' + H * .1 + ' Q' + W * .42 + ' ' + H * .04 + ' ' + W * .4 + ' ' + H * .34, 'bar'), P('M' + W * .72 + ' ' + H * .9 + ' Q' + W * .42 + ' ' + H * .96 + ' ' + W * .4 + ' ' + H * .66, 'bar'), C(W * .4, H * .36, H * .04, 's'), C(W * .4, H * .64, H * .04, 's')); break;
      case 'curl': o.push(R(W * .36, H * .16, W * .14, H * .68, 'b', 2), L(W * .3, H * .2, W * .3, H * .8, 'bar')); break;
      case 'calf': o.push(R(W * .42, H * .24, W * .1, H * .52, 'b', 2), R(W * .32, H * .2, W * .04, H * .6, 's')); break;
      case 'adductor': o.push(P('M' + W * .56 + ' ' + H * .42 + ' L' + W * .3 + ' ' + H * .1, 'bar'), P('M' + W * .56 + ' ' + H * .58 + ' L' + W * .3 + ' ' + H * .9, 'bar'), R(W * .3, H * .06, W * .1, H * .12, 'b', 2), R(W * .3, H * .82, W * .1, H * .12, 'b', 2)); break;
      case 'assist': o.push(L(W * .26, H * .05, W * .26, H * .95, 'bar'), R(W * .4, H * .32, W * .2, H * .36, 'b', 2), L(W * .34, H * .16, W * .68, H * .16, 'bar'), L(W * .34, H * .84, W * .68, H * .84, 'bar'), R(W * .66, H * .3, W * .12, H * .4, 'd', 1), L(W * .66, H * .5, W * .78, H * .5)); break;
    }
    return o;
  }
  function iso(W, H, v) {
    var o = [R(W * .04, H * .42, W * .88, H * .16, 'f'), R(W * .58, H * .3, W * .2, H * .4, 'b', 2), R(W * .8, H * .26, W * .08, H * .48, 'b', 2)];
    if (v === 'row' || v === 'high') o.push(R(W * .46, H * .32, W * .06, H * .36, 'b', 2));
    [0.12, 0.88].forEach(function (yy) {
      o.push(L(W * .1, H * yy, W * .74, H * yy, 'bar'), C(W * .14, H * yy, H * .1, 's'), L(W * (v === 'high' ? .5 : .42), H * yy, W * (v === 'high' ? .5 : .42), H * (yy < .5 ? .3 : .7), 'd'));
    });
    return o;
  }
  var G = {
    treadmill: { ar: 2.3, d: function (W, H) { return [R(0, 0, W, H, 'b', H * .12), R(W * .2, H * .18, W * .74, H * .64, 'd', H * .05), R(W * .02, H * .06, W * .12, H * .88, 's', 1), L(W * .14, H * .1, W * .34, H * .1), L(W * .14, H * .9, W * .34, H * .9)]; } },
    bike: { ar: 2, d: function (W, H) { return [L(W * .1, H * .08, W * .1, H * .92), L(W * .9, H * .16, W * .9, H * .84), R(W * .1, H * .42, W * .8, H * .16, 'b', H * .08), R(W * .16, H * .3, W * .14, H * .4, 'b', 2), P('M' + W * .38 + ' ' + H * .1 + ' Q' + W * .28 + ' ' + H * .5 + ' ' + W * .38 + ' ' + H * .9, 'bar'), R(W * .64, H * .3, W * .2, H * .4, 'b', H * .2)]; } },
    elliptical: { ar: 2.6, d: function (W, H) { return [R(0, H * .32, W, H * .36, 'b', H * .18), R(W * .3, H * .06, W * .4, H * .22, 'b', 2), R(W * .3, H * .72, W * .4, H * .22, 'b', 2), L(W * .1, H * .12, W * .26, H * .12, 'bar'), L(W * .1, H * .88, W * .26, H * .88, 'bar'), L(W * .1, H * .12, W * .1, H * .88, 'd'), C(W * .88, H * .5, H * .16, 'd'), R(W * .02, H * .38, W * .07, H * .24, 's', 1)]; } },
    stairmaster: { ar: 1.5, d: function (W, H) { var o = [R(0, 0, W, H, 'b', 2), R(W * .03, H * .3, W * .12, H * .4, 's', 1), L(W * .05, H * .08, W * .72, H * .08, 'bar'), L(W * .05, H * .92, W * .72, H * .92, 'bar')]; for (var i = 0; i < 5; i++) o.push(L(W * (.3 + i * .14), H * .18, W * (.3 + i * .14), H * .82)); return o; } },
    rower: { ar: 4, d: function (W, H) { var r = Math.min(H * .42, W * .1); return [R(W * .22, H * .42, W * .76, H * .16, 'd', 1), C(W * .02 + r, H * .5, r, 'b'), R(W * .25, H * .1, W * .06, H * .34, 'b', 1), R(W * .25, H * .56, W * .06, H * .34, 'b', 1), R(W * .56, H * .3, W * .1, H * .4, 'b', 2), L(W * .97, H * .15, W * .97, H * .85)]; } },
    arm_bike: { ar: 1.5, d: function (W, H) { return [R(W * .04, H * .3, W * .24, H * .4, 'b', 2), C(W * .3, H * .5, H * .18, 'd'), L(W * .3, H * .32, W * .42, H * .24, 'bar'), L(W * .3, H * .68, W * .18, H * .76, 'bar'), R(W * .6, H * .24, W * .32, H * .52, 'b', H * .16)]; } },
    multi_rig: { ar: 5, d: function (W, H) { var n = Math.max(2, Math.round(W / (H * 1.3))), o = [R(0, H * .1, W, H * .8, 'f')], p = Math.min(H * .14, W * .03); for (var i = 0; i <= n; i++) { var x = Math.min(W - p, Math.max(0, W * i / n - p / 2)); o.push(L(x + p / 2, H * .1, x + p / 2, H * .9, 'd'), R(x, H * .1 - p / 2, p, p, 's'), R(x, H * .9 - p / 2, p, p, 's')); } o.push(L(0, H * .1, W, H * .1, 'bar'), L(0, H * .9, W, H * .9, 'bar')); return o; } },
    tires: { ar: 1.6, d: function (W, H) { var r = Math.min(H * .4, W * .2); return [C(W * .24, H * .52, r, 'b'), C(W * .24, H * .52, r * .5, 'd'), C(W * .56, H * .42, r * .78, 'b'), C(W * .56, H * .42, r * .38, 'd'), C(W * .82, H * .3, H * .1, 'b'), C(W * .9, H * .62, H * .1, 'b'), C(W * .76, H * .76, H * .09, 'b')]; } },
    chin_dip_assist: { ar: 1.4, d: function (W, H) { return seated(W, H, 'assist'); } },
    shoulder_press_machine: { ar: 1.4, d: function (W, H) { return seated(W, H, 'press'); } },
    chest_press_machine: { ar: 1.4, d: function (W, H) { return seated(W, H, 'press'); } },
    lat_pulldown: { ar: 1.4, d: function (W, H) { return seated(W, H, 'pulldown'); } },
    low_row: { ar: 1.4, d: function (W, H) { return seated(W, H, 'row'); } },
    leg_extension: { ar: 1.4, d: function (W, H) { return seated(W, H, 'legext'); } },
    seated_leg_curl: { ar: 1.4, d: function (W, H) { return seated(W, H, 'legcurl'); } },
    pec_fly_rear_delt: { ar: 1.4, d: function (W, H) { return seated(W, H, 'fly'); } },
    preacher_curl_machine: { ar: 1.4, d: function (W, H) { return seated(W, H, 'curl'); } },
    seated_curl_machine: { ar: 1.4, d: function (W, H) { return seated(W, H, 'curl'); } },
    seated_calf: { ar: 1.4, d: function (W, H) { return seated(W, H, 'calf'); } },
    hip_adductor: { ar: 1.4, d: function (W, H) { return seated(W, H, 'adductor'); } },
    prone_leg_curl: { ar: 2, d: function (W, H) { return stackLines(0, H * .22, W * .16, H * .56, 4).concat([R(W * .22, H * .28, W * .6, H * .44, 'b', 3), R(W * .84, H * .2, W * .05, H * .6, 'b', 2), L(W * .86, H * .5, W * .97, H * .5, 'bar'), R(W * .3, H * .36, W * .18, H * .28, 'd', 2)]); } },
    iso_row: { ar: 1.5, d: function (W, H) { return iso(W, H, 'row'); } },
    iso_high_row: { ar: 1.5, d: function (W, H) { return iso(W, H, 'high'); } },
    iso_decline: { ar: 1.5, d: function (W, H) { return iso(W, H, 'press'); } },
    iso_shoulder: { ar: 1.5, d: function (W, H) { return iso(W, H, 'press'); } },
    leg_press: { ar: 1.7, d: function (W, H) { return [L(W * .1, H * .26, W * .74, H * .26), L(W * .1, H * .74, W * .74, H * .74), R(W * .12, H * .14, W * .16, H * .72, 'b', 2), R(W * .17, 0, W * .05, H * .14, 's'), R(W * .17, H * .86, W * .05, H * .14, 's'), R(W * .7, H * .24, W * .26, H * .52, 'b', 3), L(W * .74, H * .24, W * .74, H * .76, 'd')]; } },
    linear_leg_press: { ar: 1.7, d: function (W, H) { return [R(0, H * .4, W, H * .2, 'f'), R(W * .04, H * .14, W * .1, H * .72, 'b', 2), R(W * .46, H * .2, W * .3, H * .6, 'b', 3), R(W * .78, H * .26, W * .1, H * .48, 'b', 2), C(W * .6, H * .1, H * .08, 's'), C(W * .6, H * .9, H * .08, 's'), L(W * .52, H * .1, W * .68, H * .1, 'bar'), L(W * .52, H * .9, W * .68, H * .9, 'bar')]; } },
    hack_squat: { ar: 1.7, d: function (W, H) { return [R(W * .02, H * .14, W * .2, H * .72, 'b', 2), L(W * .22, H * .3, W * .96, H * .3), L(W * .22, H * .7, W * .96, H * .7), R(W * .5, H * .22, W * .36, H * .56, 'b', 3), R(W * .52, H * .24, W * .08, H * .18, 's', 2), R(W * .52, H * .58, W * .08, H * .18, 's', 2), C(W * .76, H * .1, H * .08, 's'), C(W * .76, H * .9, H * .08, 's')]; } },
    ghr: { ar: 2.2, d: function (W, H) { return [R(0, H * .44, W, H * .12, 'f'), R(W * .04, H * .2, W * .5, H * .6, 'b', H * .3), R(W * .58, H * .24, W * .1, H * .52, 'b', 2), C(W * .78, H * .34, H * .11, 'b'), C(W * .78, H * .66, H * .11, 'b'), R(W * .88, H * .2, W * .06, H * .6, 's', 1)]; } },
    roman_chair: { ar: 2.2, d: function (W, H) { return [R(0, H * .3, W, H * .4, 'f'), R(W * .1, H * .18, W * .32, H * .64, 'b', H * .18), C(W * .7, H * .32, H * .12, 'b'), C(W * .7, H * .68, H * .12, 'b'), R(W * .82, H * .18, W * .06, H * .64, 's', 1), L(W * .1, H * .08, W * .42, H * .08, 'bar'), L(W * .1, H * .92, W * .42, H * .92, 'bar')]; } },
    bench_press: { ar: 1.8, d: function (W, H) { var p = Math.min(W, H) * .1; return [R(W * .32, H * .38, W * .64, H * .24, 'b', 2), R(W * .2 - p / 2, H * .2 - p / 2, p, p, 's'), R(W * .2 - p / 2, H * .8 - p / 2, p, p, 's'), L(W * .24, H * .02, W * .24, H * .98, 'bar'), R(W * .2, H * .06, W * .08, H * .09, 's'), R(W * .2, H * .85, W * .08, H * .09, 's'), L(W * .32, H * .5, W * .2, H * .5, 'f')]; } },
    power_rack: { ar: 1.3, d: function (W, H) { var p = Math.min(W, H) * .1; return [R(0, 0, W, H, 'f'), R(W * .18, H * .12, W * .62, H * .76, 'd'), R(W * .18 - p / 2, H * .12 - p / 2, p, p, 's'), R(W * .8 - p / 2, H * .12 - p / 2, p, p, 's'), R(W * .18 - p / 2, H * .88 - p / 2, p, p, 's'), R(W * .8 - p / 2, H * .88 - p / 2, p, p, 's'), L(W * .3, H * .02, W * .3, H * .98, 'bar'), R(W * .26, H * .03, W * .08, H * .08, 's'), R(W * .26, H * .89, W * .08, H * .08, 's')]; } },
    dip_station: { ar: 2, d: function (W, H) { return [R(W * .04, H * .14, W * .92, H * .72, 'f'), L(W * .1, H * .32, W * .9, H * .32, 'bar'), L(W * .1, H * .68, W * .9, H * .68, 'bar'), C(W * .1, H * .32, H * .07, 's'), C(W * .9, H * .32, H * .07, 's'), C(W * .1, H * .68, H * .07, 's'), C(W * .9, H * .68, H * .07, 's')]; } },
    dumbbells: { ar: 4, d: function (W, H) {
      var rows = H > W * .38 ? 2 : 1, o = [];
      for (var r = 0; r < rows; r++) {
        var y0 = H * r / rows, hh = H / rows, n = Math.max(2, Math.floor(W / (hh * .55)));
        o.push(R(0, y0 + hh * .15, W, hh * .7, 'b', 2));
        for (var i = 0; i < n; i++) { var x = W * (i + .5) / n, hw = Math.min(hh * .11, W / n * .3); o.push(L(x, y0 + hh * .32, x, y0 + hh * .68, 'd'), R(x - hw, y0 + hh * .22, hw * 2, hh * .12, 's'), R(x - hw, y0 + hh * .66, hw * 2, hh * .12, 's')); }
      }
      return o; } },
    turf_sled: { ar: 3, d: function (W, H) { var o = [R(0, 0, W, H, 'f')]; for (var i = 1; i < 8; i++) o.push(L(W * i / 8, H * .08, W * i / 8, H * .92, 'f')); var s = H * .4; o.push(R(W * .06, H * .3, s, s, 'b', 1), L(W * .06 + s, H * .36, W * .06 + s * 1.8, H * .26, 'bar'), L(W * .06 + s, H * .64, W * .06 + s * 1.8, H * .74, 'bar'), L(W * .05, H * .28, W * .06 + s * 1.05, H * .28, 'd'), L(W * .05, H * .72, W * .06 + s * 1.05, H * .72, 'd')); return o; } },
    cable_pulley: { ar: 1.2, d: function (W, H) { return [R(0, H * .42, W, H * .16, 'f'), R(0, H * .14, W * .18, H * .72, 'b', 1), R(W * .82, H * .14, W * .18, H * .72, 'b', 1), L(W * .18, H * .14, W * .82, H * .14, 'bar'), L(W * .18, H * .3, W * .44, H * .5, 'd'), L(W * .82, H * .3, W * .56, H * .5, 'd'), C(W * .44, H * .5, Math.min(W, H) * .05, 's'), C(W * .56, H * .5, Math.min(W, H) * .05, 's')]; } },
    long_pull: { ar: 1.2, d: function (W, H) { return stackLines(W * .4, H * .18, W * .16, H * .64, 5).concat([R(W * .08, H * .3, W * .14, H * .4, 'b', 2), R(W * .26, H * .32, W * .05, H * .36, 'b', 2), L(W * .34, H * .06, W * .34, H * .94, 'bar'), L(W * .56, H * .5, W * .98, H * .5, 'd'), R(W * .62, H * .26, W * .04, H * .48, 's'), R(W * .78, H * .36, W * .14, H * .28, 'b', 2), L(W * .6, H * .4, W * .6, H * .6, 'bar'), R(W * .41, 0, W * .14, H * .13, 'b', 1), R(W * .41, H * .87, W * .14, H * .13, 'b', 1), L(W * .55, H * .065, W * .66, H * .065), L(W * .55, H * .935, W * .66, H * .935), C(W * .67, H * .065, H * .04, 's'), C(W * .67, H * .935, H * .04, 's')]); } },
    hip_thrust_machine: { ar: 1.5, d: function (W, H) { return [R(0, H * .14, W, H * .72, 'f'), R(W * .66, H * .2, W * .14, H * .6, 'b', 3), R(W * .42, H * .1, W * .08, H * .8, 'b', 2), R(W * .08, H * .22, W * .16, H * .56, 'b', 2), C(W * .46, H * .05, H * .05, 's'), C(W * .46, H * .95, H * .05, 's')]; } },
    trx: { ar: 8, d: function (W, H) { var n = Math.max(3, Math.round(W / (H * 1.2))), o = [R(0, H * .42, W, H * .16, 'b', 1), R(0, H * .3, W * .02, H * .4, 's'), R(W * .98, H * .3, W * .02, H * .4, 's')]; for (var i = 0; i < n; i++) { var x = W * (i + .5) / n, up = i % 2 === 0; o.push(C(x, H * .5, H * .06, 's'), L(x, H * .5, x - H * .12, up ? H * .1 : H * .9, 'd'), L(x, H * .5, x + H * .12, up ? H * .1 : H * .9, 'd')); } return o; } }
  };

  /* tile `n` glyphs inside a box, choosing a grid whose cells match the glyph's proportions */
  ['dumbbells', 'trx', 'multi_rig', 'turf_sled', 'tires'].forEach(function (k) { G[k].stretch = true; });
  function layout(m, k) {
    var g = G[m.kind] || G.dumbbells, n = m.count || 1, best = null;
    for (var c = m.cols || 1; c <= (m.cols || n); c++) {
      var r = Math.ceil(n / c), cw = m.w / c, ch = m.h / r;
      var ar = Math.max(cw, ch) / Math.min(cw, ch), score = Math.abs(Math.log(ar / g.ar)) + (r * c - n) * 0.3;
      if (!best || score < best.score) best = { score: score, c: c, r: r, cw: cw, ch: ch };
    }
    var cells = [], inset = n > 1 ? Math.min(2.5 * k, 0.12 * Math.min(best.cw, best.ch)) : 0;
    for (var i = 0; i < n; i++) {
      var col = i % best.c, row = Math.floor(i / best.c);
      cells.push({ x: m.x + col * best.cw + inset, y: m.y + row * best.ch + inset, w: best.cw - inset * 2, h: best.ch - inset * 2 });
    }
    return { g: g, cells: cells };
  }
  function Glyph(cell, g, key, orient) {
    /* orient 'h': always draw the long axis left-right, centred in the cell (e.g. benches facing a rack) */
    if (orient === 'h' && cell.w < cell.h * g.ar) { var fh = Math.min(cell.h, cell.w / g.ar); cell = { x: cell.x, y: cell.y + (cell.h - fh) / 2, w: cell.w, h: fh }; }
    if (!g.stretch) {
    /* keep proportions: allow ar/1.3 .. ar*1.5, otherwise shrink and centre in the cell */
    var lw = Math.max(cell.w, cell.h), sw = Math.min(cell.w, cell.h), r = lw / sw, nl = lw, ns = sw;
    if (r < g.ar / 1.3) ns = lw / (g.ar / 1.3); else if (r > g.ar * 1.5) nl = sw * g.ar * 1.5;
    if (nl !== lw || ns !== sw) { var nw = cell.w >= cell.h ? nl : ns, nh = cell.w >= cell.h ? ns : nl; cell = { x: cell.x + (cell.w - nw) / 2, y: cell.y + (cell.h - nh) / 2, w: nw, h: nh }; }
  }
  var land = cell.w >= cell.h, W = land ? cell.w : cell.h, H = land ? cell.h : cell.w;
    var tf = land ? 'translate(' + cell.x + ' ' + cell.y + ')' : 'translate(' + (cell.x + cell.w) + ' ' + cell.y + ') rotate(90)';
    return h('g', { key: key, transform: tf }, g.d(W, H).map(function (e, i) { return h(e[0], Object.assign({ key: i }, e[1])); }));
  }

  /* ---------- MachineMarker (an SVG <g>) ---------- */
  function MachineMarker(p) {
    var m = p.machine, state = p.state || 'idle', k = p.k || 1, lay = layout(m, k);
    return h('g', {
      className: cx('bp-mk', state === 'hover' && 'is-hover', state === 'active' && 'is-active', state === 'match' && 'is-match', state === 'dim' && 'is-dim'),
      tabIndex: 0, role: 'button', 'aria-label': m.name + (m.count > 1 ? ', ' + m.count + ' stations' : '') + ', ' + m.id,
      onMouseEnter: p.onEnter, onMouseLeave: p.onLeave, onFocus: p.onEnter, onBlur: p.onLeave, onClick: p.onSelect,
      onKeyDown: function (e) { if ((e.key === 'Enter' || e.key === ' ') && p.onSelect) { e.preventDefault(); p.onSelect(); } }
    },
      h('rect', { className: 'hit', x: m.x, y: m.y, width: m.w, height: m.h }),
      h('rect', { className: 'pad', x: m.x - 2 * k, y: m.y - 2 * k, width: m.w + 4 * k, height: m.h + 4 * k }),
      lay.cells.map(function (c, i) { return Glyph(c, lay.g, i, m.orient); }),
      p.showCode ? h('text', { className: 'lbl', x: m.x + m.w / 2, y: m.y + m.h / 2 + 4 * k, textAnchor: 'middle' }, m.id.slice(-2) + (m.count > 1 ? ' ×' + m.count : '')) : null
    );
  }

  /* ---------- FloorPlan ---------- */
  function pts(a) { return a.map(function (p) { return p[0] + ',' + p[1]; }).join(' '); }
  function Grid(f) {
    var step = Math.round(20 * f.k), minor = [], major = [];
    for (var i = 0, x = 0; x <= f.w; x += step, i++) (i % 5 ? minor : major).push(h('line', { key: 'x' + x, x1: x, y1: 0, x2: x, y2: f.h }));
    for (var j = 0, y = 0; y <= f.h; y += step, j++) (j % 5 ? minor : major).push(h('line', { key: 'y' + y, x1: 0, y1: y, x2: f.w, y2: y }));
    return h('g', null, h('g', { className: 'g-minor' }, minor), h('g', { className: 'g-major' }, major));
  }
  function Zone(z, k) {
    var x = z.pts[0][0], y = z.pts[0][1]; /* label at the zone's first (top-left) corner */
    return h('g', { key: z.id },
      h('polygon', { className: 'bp-zone', points: pts(z.pts) }),
      h('text', { className: 'bp-zone-label', x: x + 6 * k, y: y + 14 * k }, z.name.toUpperCase())
    );
  }
  function FloorSwitch(p) {
    return h('div', { className: 'bp-floors', role: 'tablist', 'aria-label': 'Floor' },
      FLOORS.map(function (f) {
        return h('button', { key: f.id, type: 'button', role: 'tab', 'aria-selected': p.value === f.id ? 'true' : 'false', className: 'bp-floor', onClick: function () { p.onChange(f.id); } },
          h('span', { className: 'bp-code' }, 'L' + f.id), ' ', f.name);
      }));
  }
  function FloorPlan(p) {
    var fs = useState(p.defaultFloor || '1'), floorState = fs[0], setFloorState = fs[1];
    var floorId = p.floor || floorState;
    function setFloor(id) { setFloorState(id); p.onFloorChange && p.onFloorChange(id); }
    var f = floorOf(floorId), k = f.k;
    var machines = MACHINES.filter(function (m) { return m.floor === floorId; });
    var hs = useState(null), hover = hs[0], setHover = hs[1];
    var filter = p.highlightMuscles || [];
    var matched = filter.length ? machinesFor(filter, machines).map(function (m) { return m.id; }) : null;
    var hovered = machines.filter(function (m) { return m.id === hover; })[0];
    function stateOf(m) {
      if (m.id === p.selectedId) return 'active';
      if (m.id === hover) return 'hover';
      if (matched) return matched.indexOf(m.id) >= 0 ? 'match' : 'dim';
      return 'idle';
    }
    var by = f.planH + 14 * k, tbW = 470 * k;
    return h('div', { className: 'bp-plan' },
      p.showFloorSwitch === false ? null : h(FloorSwitch, { value: floorId, onChange: setFloor }),
      h('svg', { viewBox: '0 0 ' + f.w + ' ' + f.h, role: 'group', 'aria-label': 'SRC ' + f.name + ' plan', style: { '--k': k } },
        h(Grid, f),
        f.zones.map(function (z) { return Zone(z, k); }),
        f.walls.map(function (w, i) { return h('polygon', { key: 'w' + i, className: 'bp-wall', points: pts(w) }); }),
        machines.map(function (m) {
          return h(MachineMarker, { key: m.id, machine: m, k: k, state: stateOf(m), showCode: p.showCodes,
            onEnter: function () { setHover(m.id); }, onLeave: function () { setHover(null); },
            onSelect: function () { p.onSelect && p.onSelect(m); } });
        }),
        h('g', null,
          h('path', { className: 'bp-dimline', d: ['M', 30 * k, by + 60 * k, 'L', 30 * k, by + 14 * k, 'M', 22 * k, by + 26 * k, 'L', 30 * k, by + 14 * k, 'L', 38 * k, by + 26 * k].join(' ') }),
          h('text', { className: 'bp-dim', x: 44 * k, y: by + 26 * k }, 'N'),
          h('rect', { className: 'bp-tblock', x: f.w - tbW - 16 * k, y: by, width: tbW, height: 66 * k }),
          h('rect', { className: 'bp-tflag', x: f.w - tbW - 4 * k, y: by + 12 * k, width: 8 * k, height: 8 * k }),
          h('text', { className: 'bp-dim', x: f.w - tbW + 10 * k, y: by + 20 * k }, 'POSITIONS TRACED BY HAND — APPROXIMATE'),
          h('text', { className: 'bp-dim', x: f.w - tbW - 4 * k, y: by + 38 * k }, 'UNC SRC · ' + f.name.toUpperCase() + ' · ' + f.room.toUpperCase()),
          h('text', { className: 'bp-dim', x: f.w - tbW - 4 * k, y: by + 54 * k }, 'FROM SHEET ' + f.sheet + ' · BLDG 541 · NOT TO SCALE')
        )
      ),
      hovered && p.showTip !== false ? h('div', { className: 'bp-tip', role: 'tooltip', style: { left: ((hovered.x + hovered.w / 2) / f.w * 100) + '%', top: (hovered.y / f.h * 100) + '%' } },
        h('div', { className: 'bp-code' }, hovered.id + (hovered.count > 1 ? ' · ×' + hovered.count : '')),
        h('div', { className: 'bp-tip-name' }, hovered.name),
        h('div', { className: 'bp-tip-mus' }, hovered.primary.join(' · ')),
        hovered.video ? h('div', { className: 'bp-tip-vid' }, h('span', { className: 'bp-tri' }), 'How-to video · click to open') : null
      ) : null
    );
  }

  /* ---------- MachineCard ---------- */
  function MachineCard(p) {
    var m = p.machine || byId('L1-08');
    var zone = zoneOf(m), fl = floorOf(m.floor);
    return h('article', { className: 'bp-card' },
      h('div', null,
        h('div', { className: 'bp-eyebrow' }, m.id + ' · ' + fl.name + ' · ' + (zone ? zone.name : '')),
        h('h3', { className: 'bp-card-title' }, m.name, m.count > 1 ? h('span', { className: 'bp-count' }, ' ×' + m.count) : null),
        h('div', { className: 'bp-eyebrow bp-card-sub' }, 'Targets'),
        h('div', { className: 'bp-chips' },
          m.primary.map(function (x) { return h(MuscleChip, { key: x }, x); }),
          m.secondary.map(function (x) { return h(MuscleChip, { key: 's' + x, tone: 'secondary' }, x); })
        ),
        h('div', { className: 'bp-eyebrow bp-card-sub' }, 'How to use it'),
        h('ol', { className: 'bp-cues' }, m.cues.map(function (c, i) { return h('li', { key: i }, c); }))
      ),
      m.video
        ? h('a', { className: 'bp-video', href: m.video.url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Watch on YouTube: ' + m.video.title },
            h('span', { className: 'bp-play' }),
            h('span', { className: 'bp-code' }, m.video.short ? 'YouTube Short' : 'YouTube'),
            h('span', { className: 'bp-vtitle' }, m.video.title),
            h('span', { className: 'bp-vch' }, m.video.channel),
            h('span', { className: 'bp-vgo' }, 'Watch ↗'))
        : h('div', { className: 'bp-video', 'aria-label': 'Video slot, no video linked' },
            h('span', { className: 'bp-play' }),
            h('span', { className: 'bp-code' }, 'YouTube Short'),
            h('span', { className: 'bp-flag' }, 'NOT YET LINKED'))
    );
  }

  /* ---------- GoalPicker ---------- */
  function GoalPicker(p) {
    var ss = useState(p.defaultSelected || []), sel = ss[0], setSel = ss[1];
    var options = p.muscles || MUSCLES;
    function toggle(x) {
      var next = sel.indexOf(x) >= 0 ? sel.filter(function (y) { return y !== x; }) : sel.concat([x]);
      setSel(next); p.onChange && p.onChange(next);
    }
    var n = machinesFor(sel).length;
    return h('section', { className: 'bp-goal' },
      h('div', { className: 'bp-eyebrow' }, 'Planner'),
      h('h3', { className: 'bp-goal-q' }, p.question || 'What do you want to work on today?'),
      h('div', { className: 'bp-chips', role: 'group', 'aria-label': 'Muscle groups' },
        options.map(function (x) { return h(MuscleChip, { key: x, selected: sel.indexOf(x) >= 0, onToggle: function () { toggle(x); } }, x); })
      ),
      h('div', { className: 'bp-goal-foot' },
        h('span', { className: 'bp-goal-count' }, sel.length ? n + ' stations match · highlighted on the map' : 'Pick one or more'),
        h(Button, { variant: 'primary', disabled: !sel.length, onClick: function () { p.onSubmit && p.onSubmit(sel); } }, 'Show me options')
      )
    );
  }

  /* ---------- SplitCard ---------- */
  function SplitCard(p) {
    var s = p.split || SPLITS[0];
    return h('article', { className: cx('bp-split', p.selected && 'is-selected') },
      h('div', { className: 'bp-eyebrow' }, s.perWeek),
      h('h3', { className: 'bp-split-name' }, s.name),
      h('p', { className: 'bp-split-desc' }, s.desc),
      h('ul', { className: 'bp-days' }, s.days.map(function (d) { return h('li', { key: d.d }, h('span', { className: 'bp-code' }, d.d), h('span', null, d.focus)); })),
      h(Button, { variant: p.selected ? 'primary' : 'ghost', onClick: p.onSelect }, p.selected ? 'Selected' : 'Use this split')
    );
  }

  /* ---------- ExerciseRow ---------- */
  function ExerciseRow(p) {
    var m = p.machine || byId('L1-08'), fl = floorOf(m.floor);
    return h('div', { className: 'bp-ex' },
      h('span', { className: 'bp-code' }, m.id),
      h('div', null,
        h('div', { className: 'bp-ex-name' }, p.exercise || m.name),
        h('div', { className: 'bp-ex-meta' }, m.primary.join(' · '), ' — ' + fl.name + ' — ', h('button', { type: 'button', className: 'bp-ex-find', onClick: p.onFind }, 'Find on map'))
      ),
      h('span', { className: 'bp-ex-sets' }, p.sets || '3 × 10')
    );
  }

  var api = { FloorPlan: FloorPlan, MachineMarker: MachineMarker, MachineCard: MachineCard, MuscleChip: MuscleChip, GoalPicker: GoalPicker, SplitCard: SplitCard, ExerciseRow: ExerciseRow, Button: Button,
    data: { VIDEOS: VIDEOS, CUES: CUES, FLOORS: FLOORS, MUSCLES: MUSCLES, ZONES: ZONES, MACHINES: MACHINES, SPLITS: SPLITS, machinesFor: machinesFor, byId: byId, isPlaceholder: false } };
  window.SRC = Object.assign(window.SRC || {}, api);
})();
