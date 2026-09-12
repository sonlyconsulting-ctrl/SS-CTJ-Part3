import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FINAL_REFLECTION_PROMPT } from '../constants';
import { useAppContext } from '../context/AppContext';

export const FinalView: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const ready = state.finalReflection.trim().length >= 40;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 animate-fade-in" data-testid="final-view">
      <button onClick={() => dispatch({ type: 'SET_CHECKPOINT', payload: 'week2' })} className="inline-flex items-center gap-2 text-ctj-muted hover:text-ctj-platinum focus-ring rounded">
        <ArrowLeft size={18} /> Back to Week 2 Checkpoint
      </button>

      <section className="panel-platinum text-center">
        <CheckCircle2 size={48} className="mx-auto text-ctj-platinum" />
        <p className="text-xs uppercase tracking-[0.22em] text-ctj-gold mt-5">Part 3 Final Reflection</p>
        <h1 className="text-3xl sm:text-4xl font-semibold mt-2">What Will You Carry Forward?</h1>
        <p className="text-ctj-silver mt-4 leading-relaxed">{FINAL_REFLECTION_PROMPT}</p>
      </section>

      <section className="panel-dark">
        <textarea
          data-testid="final-reflection"
          value={state.finalReflection}
          onChange={(event) => dispatch({ type: 'SET_FINAL_REFLECTION', payload: event.target.value })}
          className="input-area min-h-[260px]"
          placeholder="My biggest insight is... I will apply it by... A place clearer reasoning could help next is..."
        />
      </section>

      <button
        data-testid="final-continue"
        disabled={!ready}
        onClick={() => dispatch({ type: 'SET_VIEW', payload: 'export' })}
        className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Complete Part 3 & Export <ArrowRight size={18} />
      </button>
    </div>
  );
};
