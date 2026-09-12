import React, { useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { ThinkingPartner } from './ThinkingPartner';

export const ResponseField: React.FC<{
  id: string;
  label: string;
  prompt: string;
  guide?: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
  partnerMode?: 'evidence' | 'assumption' | 'action' | 'general';
}> = ({ id, label, prompt, guide, value, onChange, optional = false, partnerMode = 'general' }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const dictate = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      window.alert('Voice input is not supported in this browser. You can continue by typing.');
      return;
    }

    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript ?? '';
      onChange(`${value} ${transcript}`.trim());
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
    };

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  return (
    <section className={`response-card ${optional ? 'optional-card' : ''}`} data-testid={`prompt-${id}`}>
      <div className="flex justify-between gap-3 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-ctj-blue">{label}{optional ? ' · Optional' : ''}</p>
          <p className="text-ctj-silver mt-2 leading-relaxed">{prompt}</p>
          {guide && <p className="text-xs text-ctj-muted mt-2">{guide}</p>}
        </div>
        <button
          type="button"
          onClick={dictate}
          className={`p-2 rounded-full border focus-ring shrink-0 ${
            listening ? 'border-red-400 text-red-300' : 'border-ctj-silver/20 text-ctj-muted hover:text-ctj-platinum'
          }`}
          aria-label={listening ? `Stop dictation for ${label}` : `Dictate response for ${label}`}
        >
          {listening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
      </div>
      <textarea
        data-testid={`response-${id}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-area min-h-[145px] mt-4"
        placeholder={optional ? 'Optional deeper reflection...' : 'Your response...'}
      />
      <ThinkingPartner text={value} mode={partnerMode} />
    </section>
  );
};
