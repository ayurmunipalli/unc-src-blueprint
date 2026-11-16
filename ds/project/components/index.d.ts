export interface Machine { id: string; floor: "1" | "2"; count: number; approxCount?: boolean; name: string; zone: string; x: number; y: number; w: number; h: number; primary: string[]; secondary: string[]; kind: string; video: { id: string; title: string; channel: string; short: boolean; url: string } | null; cues: string[] }
export interface Zone { id: string; floor: "1" | "2"; name: string; pts: [number, number][] }
export interface Floor { id: "1" | "2"; name: string; room: string; sheet: string; w: number; h: number; planH: number; k: number; walls: [number, number][][]; zones: Zone[] }
export interface Split { id: string; name: string; perWeek: string; desc: string; days: { d: string; focus: string }[] }
export interface FloorPlanProps { floor?: "1" | "2"; defaultFloor?: "1" | "2"; onFloorChange?: (id: string) => void; showFloorSwitch?: boolean; selectedId?: string; highlightMuscles?: string[]; onSelect?: (m: Machine) => void; showTip?: boolean; showCodes?: boolean }
export interface MachineMarkerProps { machine: Machine; state?: "idle" | "hover" | "active" | "match" | "dim"; k?: number; showCode?: boolean; onEnter?: () => void; onLeave?: () => void; onSelect?: () => void }
export interface MachineCardProps { machine: Machine }
export interface MuscleChipProps { tone?: "primary" | "secondary"; selected?: boolean; onToggle?: () => void; children: string }
export interface GoalPickerProps { muscles?: string[]; defaultSelected?: string[]; question?: string; onChange?: (sel: string[]) => void; onSubmit?: (sel: string[]) => void }
export interface SplitCardProps { split: Split; selected?: boolean; onSelect?: () => void }
export interface ExerciseRowProps { machine: Machine; exercise?: string; sets?: string; onFind?: () => void }
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: "primary" | "ghost" }
export interface BusyHoursProps { defaultDay?: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun" }
