import React from 'react';
import { ArrowLeft, Download, HardDrive, Mic, ShieldCheck, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const PrivacyPolicyView: React.FC = () => {
  const { dispatch } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'welcome' })} className="inline-flex items-center gap-2 text-ctj-muted hover:text-ctj-platinum focus-ring rounded">
        <ArrowLeft size={18} /> Back
      </button>

      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-ctj-gold">Local Browser Version</p>
        <h1 className="text-4xl font-semibold mt-2">Privacy Boundary</h1>
        <p className="text-ctj-muted mt-2">Product-core baseline, September 2026.</p>
      </div>

      <section className="panel-platinum">
        <h2 className="text-xl font-semibold">What this build stores</h2>
        <p className="text-ctj-silver mt-3 leading-relaxed">
          Part 3 responses, checkpoint reflections, completion progress, final reflection, and display settings are stored in browser LocalStorage. This local version has no account backend, cloud journal storage, analytics, or external AI model connection.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-4">
        <Policy icon={<HardDrive />} title="Local browser storage">Your work stays in this browser unless you export it. Clearing site storage or changing devices can remove the local record.</Policy>
        <Policy icon={<Mic />} title="Optional dictation">Voice input uses the browser speech-recognition capability when available. The browser or operating-system provider may process speech under its own terms.</Policy>
        <Policy icon={<Download />} title="Portable export">PDF, JSON, and TXT exports let you keep a record outside browser storage.</Policy>
        <Policy icon={<Trash2 />} title="Delete control">Reset All Data clears Part 3 data and settings stored by this application in the current browser.</Policy>
      </div>

      <section className="panel-dark">
        <div className="flex gap-3">
          <ShieldCheck className="text-ctj-blue shrink-0 mt-1" />
          <p className="text-sm text-ctj-silver">
            Part 3 is an educational and reflective product. It does not provide medical, psychological, legal, financial, or other licensed professional advice.
          </p>
        </div>
      </section>
    </div>
  );
};

const Policy: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <section className="panel-dark">
    <div className="text-ctj-blue mb-3">{icon}</div>
    <h2 className="font-semibold">{title}</h2>
    <p className="text-sm text-ctj-muted mt-2 leading-relaxed">{children}</p>
  </section>
);
