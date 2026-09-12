import React, { useState } from 'react';
import { Accessibility, Eye, Settings, Trash2, Type, X, Zap } from 'lucide-react';
import { APP_VERSION, DAYS } from '../constants';
import { useAppContext } from '../context/AppContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const progress = Math.round((state.completedDays.length / DAYS.length) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-ctj-charcoal text-ctj-platinum">
      <header className="sticky top-0 z-40 border-b border-ctj-silver/15 bg-ctj-charcoal/95 backdrop-blur">
        <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'welcome' })}
            className="flex items-center gap-3 text-left focus-ring rounded-lg min-w-0"
            aria-label="Return to Part 3 welcome"
          >
            <div className="w-9 h-9 rounded-full border border-ctj-platinum/45 flex items-center justify-center shrink-0">✦</div>
            <div className="min-w-0">
              <div className="text-[10px] tracking-[0.18em] text-ctj-muted uppercase">CTJ · Part 3</div>
              <div className="font-semibold truncate">Finding Meaning and Balance</div>
            </div>
          </button>

          <div className="hidden sm:flex items-center gap-3 text-xs text-ctj-muted">
            <span>{state.completedDays.length}/10 days</span>
            <div className="w-24 h-1.5 bg-ctj-graphite rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-ctj-blue to-ctj-platinum" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="p-2 rounded-lg text-ctj-silver hover:text-ctj-platinum focus-ring"
            aria-label="Accessibility and display settings"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Settings size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute right-0 top-16 w-full sm:w-80 bg-ctj-graphite border-b sm:border-l border-ctj-silver/20 p-5 shadow-2xl space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold"><Accessibility size={18} /> Display Settings</h2>
            <Toggle label="High Contrast" icon={<Eye size={17} />} active={state.settings.highContrast} onClick={() => dispatch({ type: 'TOGGLE_SETTING', payload: 'highContrast' })} />
            <Toggle label="Readable Font" icon={<Type size={17} />} active={state.settings.readableFont} onClick={() => dispatch({ type: 'TOGGLE_SETTING', payload: 'readableFont' })} />
            <Toggle label="Reduced Motion" icon={<Zap size={17} />} active={state.settings.reducedMotion} onClick={() => dispatch({ type: 'TOGGLE_SETTING', payload: 'reducedMotion' })} />
            <label className="block text-sm text-ctj-silver pt-2">
              Text scale
              <input
                aria-label="Text scale"
                type="range"
                min="0.85"
                max="1.35"
                step="0.05"
                value={state.settings.textScale}
                onChange={(event) => dispatch({ type: 'SET_TEXT_SCALE', payload: Number(event.target.value) })}
                className="w-full mt-2 accent-ctj-blue"
              />
            </label>
            <button
              data-testid="reset-all-data"
              onClick={() => {
                if (window.confirm('Reset all local Part 3 work and display settings? This cannot be undone.')) {
                  dispatch({ type: 'RESET_ALL_DATA' });
                  setMenuOpen(false);
                }
              }}
              className="w-full mt-3 flex items-center gap-2 rounded-lg border border-red-400/30 px-3 py-2 text-sm text-red-300 hover:border-red-300 focus-ring"
            >
              <Trash2 size={16} /> Reset All Data
            </button>
          </div>
        )}
      </header>

      <main className="flex-1" role="main">{children}</main>

      <footer className="border-t border-ctj-silver/15 bg-ctj-graphite/80 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-semibold">The Critical Thinker's Journey™</div>
            <div className="text-ctj-muted mt-1">Part 3 · Finding Meaning and Balance</div>
          </div>
          <div className="flex md:justify-center gap-4">
            <button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'guide' })} className="text-ctj-silver hover:text-ctj-platinum focus-ring rounded">User Guide</button>
            <button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'privacy' })} className="text-ctj-silver hover:text-ctj-platinum focus-ring rounded">Privacy</button>
          </div>
          <div className="md:text-right text-ctj-muted">
            <div>Version {APP_VERSION}</div>
            <div>© {new Date().getFullYear()} Sonly Consulting</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Toggle: React.FC<{ label: string; icon: React.ReactNode; active: boolean; onClick: () => void }> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between rounded-lg border px-3 py-2 focus-ring transition-colors ${
      active ? 'border-ctj-blue bg-ctj-blue/15 text-ctj-platinum' : 'border-ctj-silver/20 text-ctj-silver hover:border-ctj-silver/50'
    }`}
    aria-pressed={active}
  >
    <span className="flex items-center gap-2">{icon}{label}</span>
    <span className={`w-2.5 h-2.5 rounded-full ${active ? 'bg-ctj-blue' : 'bg-ctj-muted'}`} />
  </button>
);
