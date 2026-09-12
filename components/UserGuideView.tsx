import React from 'react';
import { ArrowLeft, BookOpen, Download, Mic, Save, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const UserGuideView: React.FC = () => {
  const { dispatch } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'welcome' })} className="inline-flex items-center gap-2 text-ctj-muted hover:text-ctj-platinum focus-ring rounded">
        <ArrowLeft size={18} /> Back
      </button>

      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-ctj-gold">Part 3</p>
        <h1 className="text-4xl font-semibold mt-2">User Guide</h1>
        <p className="text-ctj-silver mt-3 max-w-2xl">
          Part 3 is a ten-day integration and purposeful-living practice. The core curriculum remains structured, but each day now distinguishes required core work from optional deeper work.
        </p>
      </div>

      <section className="panel-platinum">
        <h2 className="font-semibold text-xl flex items-center gap-2"><BookOpen size={20} /> Recommended rhythm</h2>
        <ol className="mt-5 space-y-5">
          {[
            ['Read the day first', 'Start with the theme, mini-framework, and logic tip before writing.'],
            ['Complete four core responses', 'The map/exercise plus three core prompts are required to advance.'],
            ['Go deeper when useful', 'Bonus and Dig Deeper or Challenge prompts are optional. Use them when the topic deserves more time.'],
            ['Stop at checkpoints', 'After Day 5 and Day 10, pause and reflect on what is actually changing in your thinking.'],
            ['Finish with application', 'The final reflection asks what you will carry forward, not whether you memorized definitions.']
          ].map(([title, description], index) => (
            <li key={title} className="flex gap-4">
              <div className="w-8 h-8 rounded-full border border-ctj-blue text-ctj-blue flex items-center justify-center shrink-0 font-semibold">{index + 1}</div>
              <div><h3 className="font-semibold">{title}</h3><p className="text-sm text-ctj-muted mt-1">{description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid sm:grid-cols-2 gap-4">
        <GuideCard icon={<Save />} title="Save and resume">Responses save to browser LocalStorage in this candidate build.</GuideCard>
        <GuideCard icon={<Mic />} title="Voice input">Optional browser dictation is available when the browser supports speech recognition.</GuideCard>
        <GuideCard icon={<Sparkles />} title="Thinking Partner">Local deterministic prompts can challenge your reasoning. They do not score intelligence or make conclusions for you.</GuideCard>
        <GuideCard icon={<Download />} title="Export">At completion, keep PDF, JSON, or TXT copies outside the browser.</GuideCard>
      </div>
    </div>
  );
};

const GuideCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="panel-dark">
    <div className="text-ctj-blue mb-3">{icon}</div>
    <h2 className="font-semibold">{title}</h2>
    <p className="text-sm text-ctj-muted mt-2 leading-relaxed">{children}</p>
  </div>
);
