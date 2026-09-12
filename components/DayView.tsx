import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Lightbulb, Save } from 'lucide-react';
import { CHECKPOINTS, DAYS } from '../constants';
import { useAppContext } from '../context/AppContext';
import { ResponseField } from './ResponseField';

export const DayView: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const day = DAYS[state.dayIndex];
  const [showOptional, setShowOptional] = useState(false);
  const corePrompts = day.prompts.filter((prompt) => prompt.kind !== 'optional');
  const optionalPrompts = day.prompts.filter((prompt) => prompt.kind === 'optional');
  const complete = corePrompts.every((prompt) => (state.responses[prompt.id] ?? '').trim().length >= 8);
  const progress = Math.round(((state.dayIndex + 1) / DAYS.length) * 100);

  const partnerMode = (id: string) => {
    if (/p2|map/.test(id)) return 'evidence' as const;
    if (/p3/.test(id)) return 'assumption' as const;
    return 'general' as const;
  };

  const continueForward = () => {
    if (!complete) return;
    dispatch({ type: 'COMPLETE_DAY', payload: day.day });

    const checkpoint = CHECKPOINTS.find((item) => item.afterDay === day.day);
    if (checkpoint) {
      dispatch({ type: 'SET_CHECKPOINT', payload: checkpoint.id });
    } else if (state.dayIndex < DAYS.length - 1) {
      dispatch({ type: 'SET_DAY_INDEX', payload: state.dayIndex + 1 });
    } else {
      dispatch({ type: 'SET_VIEW', payload: 'final' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const answeredCore = useMemo(
    () => corePrompts.filter((prompt) => (state.responses[prompt.id] ?? '').trim().length >= 8).length,
    [corePrompts, state.responses]
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in" data-testid="day-view">
      <div>
        <div className="flex justify-between items-center text-xs uppercase tracking-wider text-ctj-muted">
          <span>Week {day.week} · Day {day.day} of 10</span>
          <span>{progress}% through Part 3</span>
        </div>
        <div className="h-1.5 bg-ctj-graphite rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-ctj-blue to-ctj-platinum transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <section className="panel-platinum">
        <p className="text-xs uppercase tracking-[0.2em] text-ctj-gold">Day {day.day}</p>
        <h1 className="text-3xl sm:text-4xl font-semibold mt-2">{day.title}</h1>
        <p className="text-ctj-silver mt-4 leading-relaxed">{day.theme}</p>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-ctj-blue/30 bg-ctj-blue/10 p-4">
            <p className="text-xs uppercase tracking-wider text-ctj-blue">Mini-Framework</p>
            <h2 className="font-semibold mt-1">{day.frameworkName}</h2>
            <p className="text-sm text-ctj-silver mt-2">{day.framework}</p>
          </div>
          <div className="rounded-xl border border-ctj-gold/30 bg-ctj-gold/10 p-4">
            <p className="text-xs uppercase tracking-wider text-ctj-gold flex items-center gap-2"><Lightbulb size={14} /> Clarity Tip</p>
            <p className="text-sm text-ctj-silver mt-2">{day.logicTip}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-ctj-muted">
          <Save size={14} className="text-ctj-blue" />
          <span>{state.lastSaved ? 'Responses saved locally' : 'Responses save locally as you type'}</span>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Core Session</h2>
          <p className="text-sm text-ctj-muted mt-1">Complete the four core responses. Deeper work remains available but is not required to advance.</p>
        </div>
        <div className="space-y-4">
          {corePrompts.map((prompt) => (
            <ResponseField
              key={prompt.id}
              id={prompt.id}
              label={prompt.label}
              prompt={prompt.text}
              guide={prompt.guide}
              value={state.responses[prompt.id] ?? ''}
              onChange={(value) => dispatch({ type: 'UPDATE_RESPONSE', payload: { id: prompt.id, value } })}
              partnerMode={partnerMode(prompt.id)}
            />
          ))}
        </div>
      </section>

      <section className="panel-dark">
        <button
          onClick={() => setShowOptional((show) => !show)}
          className="w-full flex items-center justify-between text-left focus-ring rounded"
          aria-expanded={showOptional}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ctj-gold">Optional Deeper Work</p>
            <h2 className="font-semibold text-xl mt-1">Go further when the day deserves more time.</h2>
          </div>
          {showOptional ? <ChevronUp /> : <ChevronDown />}
        </button>

        {showOptional && (
          <div className="mt-5 space-y-4">
            {optionalPrompts.map((prompt) => (
              <ResponseField
                key={prompt.id}
                id={prompt.id}
                label={prompt.label}
                prompt={prompt.text}
                guide={prompt.guide}
                value={state.responses[prompt.id] ?? ''}
                onChange={(value) => dispatch({ type: 'UPDATE_RESPONSE', payload: { id: prompt.id, value } })}
                optional
                partnerMode="general"
              />
            ))}
          </div>
        )}
      </section>

      <p className="text-xs text-ctj-muted">
        Optional voice input uses browser speech recognition when available. The browser or operating-system provider may process speech under its own terms.
      </p>

      {!complete && (
        <p className="text-sm text-center text-ctj-muted" aria-live="polite">
          Complete the four core responses to continue. {answeredCore} of {corePrompts.length} complete.
        </p>
      )}

      <div className="flex justify-between gap-3">
        <button
          onClick={() => {
            if (state.dayIndex > 0) dispatch({ type: 'SET_DAY_INDEX', payload: state.dayIndex - 1 });
            else dispatch({ type: 'SET_VIEW', payload: 'welcome' });
          }}
          className="btn-secondary inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <button
          data-testid="day-continue"
          disabled={!complete}
          onClick={continueForward}
          className="btn-primary inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {day.day === 5 || day.day === 10 ? 'Go to Checkpoint' : 'Continue'} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
