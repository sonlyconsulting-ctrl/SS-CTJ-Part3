import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { AppAction, AppSettings, Part3State } from '../types';
import { DAYS, STORAGE_KEY_SETTINGS, STORAGE_KEY_STATE } from '../constants';

const defaultSettings: AppSettings = {
  highContrast: false,
  readableFont: false,
  reducedMotion: false,
  textScale: 1
};

const initialState: Part3State = {
  currentView: 'welcome',
  dayIndex: 0,
  checkpointId: null,
  responses: {},
  completedDays: [],
  completedCheckpoints: [],
  finalReflection: '',
  settings: defaultSettings,
  lastSaved: null
};

const AppContext = createContext<{
  state: Part3State;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

function sanitizeSettings(value: unknown): AppSettings {
  if (!value || typeof value !== 'object') return defaultSettings;
  const raw = value as Partial<AppSettings>;
  return {
    highContrast: raw.highContrast === true,
    readableFont: raw.readableFont === true,
    reducedMotion: raw.reducedMotion === true,
    textScale:
      typeof raw.textScale === 'number' && raw.textScale >= 0.85 && raw.textScale <= 1.35
        ? raw.textScale
        : 1
  };
}

function sanitizeState(value: unknown): Partial<Part3State> {
  if (!value || typeof value !== 'object') return {};
  const raw = value as Partial<Part3State>;
  const dayIndex = typeof raw.dayIndex === 'number'
    ? Math.max(0, Math.min(DAYS.length - 1, Math.floor(raw.dayIndex)))
    : 0;

  const completedDays = Array.isArray(raw.completedDays)
    ? [...new Set(raw.completedDays.filter((day): day is number => Number.isInteger(day) && day >= 1 && day <= 10))]
    : [];

  const completedCheckpoints = Array.isArray(raw.completedCheckpoints)
    ? raw.completedCheckpoints.filter((id): id is string => id === 'week1' || id === 'week2')
    : [];

  return {
    currentView:
      raw.currentView && ['welcome', 'day', 'checkpoint', 'final', 'export', 'guide', 'privacy'].includes(raw.currentView)
        ? raw.currentView
        : 'welcome',
    dayIndex,
    checkpointId: raw.checkpointId === 'week1' || raw.checkpointId === 'week2' ? raw.checkpointId : null,
    responses: raw.responses && typeof raw.responses === 'object' ? raw.responses : {},
    completedDays,
    completedCheckpoints,
    finalReflection: typeof raw.finalReflection === 'string' ? raw.finalReflection : '',
    lastSaved: typeof raw.lastSaved === 'string' ? raw.lastSaved : null
  };
}

function reducer(state: Part3State, action: AppAction): Part3State {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_DAY_INDEX':
      return {
        ...state,
        dayIndex: Math.max(0, Math.min(DAYS.length - 1, action.payload)),
        checkpointId: null,
        currentView: 'day'
      };
    case 'SET_CHECKPOINT':
      return { ...state, checkpointId: action.payload, currentView: 'checkpoint' };
    case 'UPDATE_RESPONSE':
      return {
        ...state,
        responses: { ...state.responses, [action.payload.id]: action.payload.value },
        lastSaved: new Date().toISOString()
      };
    case 'COMPLETE_DAY':
      return {
        ...state,
        completedDays: state.completedDays.includes(action.payload)
          ? state.completedDays
          : [...state.completedDays, action.payload].sort((a, b) => a - b),
        lastSaved: new Date().toISOString()
      };
    case 'UPDATE_CHECKPOINT':
      return {
        ...state,
        responses: { ...state.responses, [`checkpoint-${action.payload.id}`]: action.payload.value },
        lastSaved: new Date().toISOString()
      };
    case 'COMPLETE_CHECKPOINT':
      return {
        ...state,
        completedCheckpoints: state.completedCheckpoints.includes(action.payload)
          ? state.completedCheckpoints
          : [...state.completedCheckpoints, action.payload],
        lastSaved: new Date().toISOString()
      };
    case 'SET_FINAL_REFLECTION':
      return { ...state, finalReflection: action.payload, lastSaved: new Date().toISOString() };
    case 'TOGGLE_SETTING':
      return { ...state, settings: { ...state.settings, [action.payload]: !state.settings[action.payload] } };
    case 'SET_TEXT_SCALE':
      return { ...state, settings: { ...state.settings, textScale: action.payload } };
    case 'RESTORE_STATE':
      return { ...state, ...action.payload, settings: state.settings };
    case 'RESTORE_SETTINGS':
      return { ...state, settings: action.payload };
    case 'RESET_WORK':
      localStorage.removeItem(STORAGE_KEY_STATE);
      return { ...initialState, settings: state.settings };
    case 'RESET_ALL_DATA':
      localStorage.removeItem(STORAGE_KEY_STATE);
      localStorage.removeItem(STORAGE_KEY_SETTINGS);
      return initialState;
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const settings = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (settings) {
      try { dispatch({ type: 'RESTORE_SETTINGS', payload: sanitizeSettings(JSON.parse(settings)) }); }
      catch { localStorage.removeItem(STORAGE_KEY_SETTINGS); }
    }

    const saved = localStorage.getItem(STORAGE_KEY_STATE);
    if (saved) {
      try { dispatch({ type: 'RESTORE_STATE', payload: sanitizeState(JSON.parse(saved)) }); }
      catch { localStorage.removeItem(STORAGE_KEY_STATE); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(state.settings));
    document.body.classList.toggle('high-contrast', state.settings.highContrast);
    document.body.classList.toggle('readable-font', state.settings.readableFont);
    document.body.classList.toggle('reduce-motion', state.settings.reducedMotion);
    document.documentElement.style.fontSize = `${state.settings.textScale}rem`;
  }, [state.settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify({
      currentView: state.currentView,
      dayIndex: state.dayIndex,
      checkpointId: state.checkpointId,
      responses: state.responses,
      completedDays: state.completedDays,
      completedCheckpoints: state.completedCheckpoints,
      finalReflection: state.finalReflection,
      lastSaved: state.lastSaved
    }));
  }, [
    state.currentView,
    state.dayIndex,
    state.checkpointId,
    state.responses,
    state.completedDays,
    state.completedCheckpoints,
    state.finalReflection,
    state.lastSaved
  ]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
