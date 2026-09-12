import React from 'react';
import { ArrowLeft, ArrowRight, PauseCircle } from 'lucide-react';
import { CHECKPOINTS } from '../constants';
import { useAppContext } from '../context/AppContext';

export const CheckpointView: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const checkpoint = CHECKPOINTS.find((item) => item.id === state.checkpointId) ?? CHECKPOINTS[0];
  const value = state.responses[`checkpoint-${checkpoint.id}`] ?? '';
  const complete = value.trim().length >= 40;

  const continueForward = () => {
    if (!complete) return;
    dispatch({ type: 'COMPLETE_CHECKPOINT', payload: checkpoint.id });
    if (checkpoint.id === 'week1') {
      dispatch({ type: 'SET_DAY_INDEX', payload: 5 });
    } else {
      dispatch({ type: 'SET_VIEW', payload: 'final' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 animate-fade-in" data-testid="checkpoint-view">
      <button
        onClick={() => dispatch({ type: 'SET_DAY_INDEX', payload: checkpoint.afterDay - 1 })}
        className="inline-flex items-center gap-2 text-ctj-muted hover:text-ctj-platinum focus-ring rounded"
      >
        <ArrowLeft size={18} /> Back to Day {checkpoint.afterDay}
      </button>

      <section className="panel-platinum text-center">
        <PauseCircle size={44} className="mx-auto text-ctj-blue" />
        <p className="text-xs uppercase tracking-[0.22em] text-ctj-gold mt-5">CTJ Checkpoint</p>
        <h1 className="text-3xl sm:text-4xl font-semibold mt-2">{checkpoint.title}</h1>
        <p className="text-ctj-silver mt-4 leading-relaxed">{checkpoint.prompt}</p>
      </section>

      <section className="panel-dark">
        <textarea
          data-testid="checkpoint-response"
          value={value}
          onChange={(event) => dispatch({ type: 'UPDATE_CHECKPOINT', payload: { id: checkpoint.id, value: event.target.value } })}
          className="input-area min-h-[220px]"
          placeholder="What changed, what worked, and what deserves another look?"
        />
        <p className="text-xs text-ctj-muted mt-2">{checkpoint.guide}. Your own useful length matters more than hitting a number exactly.</p>
      </section>

      <button
        data-testid="checkpoint-continue"
        disabled={!complete}
        onClick={continueForward}
        className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {checkpoint.id === 'week1' ? 'Begin Week 2' : 'Continue to Final Reflection'} <ArrowRight size={18} />
      </button>
    </div>
  );
};
