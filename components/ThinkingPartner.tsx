import React from 'react';
import { Sparkles } from 'lucide-react';

export const ThinkingPartner: React.FC<{ text: string; mode?: 'evidence' | 'assumption' | 'action' | 'general' }> = ({ text, mode = 'general' }) => {
  const value = text.trim();
  if (value.length < 35) return null;

  let prompt = 'What would make this reasoning clearer or more testable?';
  const lower = value.toLowerCase();

  if (mode === 'evidence') {
    prompt = /(evidence|fact|source|example|data)/.test(lower)
      ? 'What evidence would weaken this conclusion?'
      : 'What evidence, example, or source supports this statement?';
  } else if (mode === 'assumption') {
    prompt = /(assum|believe|expect|think)/.test(lower)
      ? 'Which assumption carries the most weight, and what if it is wrong?'
      : 'What are you assuming that you have not yet stated?';
  } else if (mode === 'action') {
    prompt = /(will|next|step|try|test)/.test(lower)
      ? 'What result would make you revise that next step?'
      : 'What is the smallest next step that could test this reasoning?';
  } else if (value.length < 90) {
    prompt = 'Can you make the claim, evidence, and uncertainty more explicit?';
  }

  return (
    <div className="mt-2 flex items-start gap-2 text-xs text-ctj-muted" aria-live="polite">
      <Sparkles size={14} className="text-ctj-blue shrink-0 mt-0.5" />
      <span><strong className="text-ctj-silver">Thinking Partner:</strong> {prompt}</span>
    </div>
  );
};
