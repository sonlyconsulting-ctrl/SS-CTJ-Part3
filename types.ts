export type ViewState = 'welcome' | 'day' | 'checkpoint' | 'final' | 'export' | 'guide' | 'privacy';

export type PromptKind = 'map' | 'core' | 'optional';

export interface PromptDefinition {
  id: string;
  label: string;
  text: string;
  guide?: string;
  kind: PromptKind;
}

export interface DayDefinition {
  day: number;
  week: 1 | 2;
  title: string;
  theme: string;
  frameworkName: string;
  framework: string;
  logicTip: string;
  prompts: PromptDefinition[];
}

export interface CheckpointDefinition {
  id: 'week1' | 'week2';
  afterDay: 5 | 10;
  title: string;
  prompt: string;
  guide: string;
}

export interface AppSettings {
  highContrast: boolean;
  readableFont: boolean;
  reducedMotion: boolean;
  textScale: number;
}

export interface Part3State {
  currentView: ViewState;
  dayIndex: number;
  checkpointId: 'week1' | 'week2' | null;
  responses: Record<string, string>;
  completedDays: number[];
  completedCheckpoints: string[];
  finalReflection: string;
  settings: AppSettings;
  lastSaved: string | null;
}

export type AppAction =
  | { type: 'SET_VIEW'; payload: ViewState }
  | { type: 'SET_DAY_INDEX'; payload: number }
  | { type: 'SET_CHECKPOINT'; payload: 'week1' | 'week2' }
  | { type: 'UPDATE_RESPONSE'; payload: { id: string; value: string } }
  | { type: 'COMPLETE_DAY'; payload: number }
  | { type: 'UPDATE_CHECKPOINT'; payload: { id: string; value: string } }
  | { type: 'COMPLETE_CHECKPOINT'; payload: string }
  | { type: 'SET_FINAL_REFLECTION'; payload: string }
  | { type: 'TOGGLE_SETTING'; payload: keyof Omit<AppSettings, 'textScale'> }
  | { type: 'SET_TEXT_SCALE'; payload: number }
  | { type: 'RESTORE_STATE'; payload: Partial<Part3State> }
  | { type: 'RESTORE_SETTINGS'; payload: AppSettings }
  | { type: 'RESET_WORK' }
  | { type: 'RESET_ALL_DATA' };
