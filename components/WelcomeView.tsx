import React from 'react';
import { ArrowRight, Brain, Compass, Layers3, Save } from 'lucide-react';
import { DAYS } from '../constants';
import { useAppContext } from '../context/AppContext';

export const WelcomeView: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const started = Object.keys(state.responses).length > 0 || state.completedDays.length > 0;
  const nextIncomplete = DAYS.findIndex((day) => !state.completedDays.includes(day.day));
  const targetIndex = nextIncomplete >= 0 ? nextIncomplete : 9;

  return (
    <div className="space-y-10 py-8 sm:py-14 animate-fade-in">
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.26em] uppercase text-ctj-gold">The Critical Thinker's Journey™ · Part 3</p>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">Finding Meaning and Balance</h1>
        <p className="text-xl text-ctj-silver">Integration · Mindset · Emotion · Purpose · Balance</p>
      </div>

      <section className="panel-platinum max-w-3xl mx-auto space-y-5">
        <p className="text-lg text-ctj-silver leading-relaxed">
          Part 3 integrates thinking with meaning. Across ten days, you will examine mindset, emotion, recurring scripts, decision clarity, self-observation, purpose, triggers, complex scenarios, and the choices that make intention visible.
        </p>
        <p className="text-ctj-muted leading-relaxed">
          The original curriculum is preserved, but the digital experience separates a focused core session from optional deeper work so you can engage without turning every day into a writing marathon.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          <Feature icon={<Brain />} text="10 structured days" />
          <Feature icon={<Layers3 />} text="2 weekly checkpoints" />
          <Feature icon={<Compass />} text="Core + optional deeper work" />
          <Feature icon={<Save />} text="Local save and resume" />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        <div className="panel-dark">
          <p className="text-xs uppercase tracking-[0.2em] text-ctj-blue">Week 1</p>
          <h2 className="text-xl font-semibold mt-2">Mindset & Emotional Clarity</h2>
          <p className="text-sm text-ctj-muted mt-2">Mindsets, emotional labeling, cognitive scripts, decision clarity, and self-observation.</p>
        </div>
        <div className="panel-dark">
          <p className="text-xs uppercase tracking-[0.2em] text-ctj-blue">Week 2</p>
          <h2 className="text-xl font-semibold mt-2">Purposeful Living</h2>
          <p className="text-sm text-ctj-muted mt-2">Purpose alignment, emotional triggers, complex scenarios, conscious-life mapping, and intentional living.</p>
        </div>
      </section>

      <div className="max-w-xl mx-auto">
        <button
          data-testid="begin-part3"
          onClick={() => dispatch({ type: 'SET_DAY_INDEX', payload: targetIndex })}
          className="btn-primary w-full inline-flex items-center justify-center gap-2"
        >
          {started ? 'Continue Part 3' : 'Begin Part 3'} <ArrowRight size={18} />
        </button>
        <p className="text-xs text-center text-ctj-muted mt-3">
          Progress is stored in this browser in the candidate product-core baseline.
        </p>
      </div>
    </div>
  );
};

const Feature: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="rounded-xl border border-ctj-silver/15 bg-ctj-charcoal/45 p-3 flex items-center gap-3 text-sm text-ctj-silver">
    <span className="text-ctj-blue">{icon}</span><span>{text}</span>
  </div>
);
