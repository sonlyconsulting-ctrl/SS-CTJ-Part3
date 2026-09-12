import React from 'react';
import { ArrowLeft, Code, Download, FileText, RotateCcw } from 'lucide-react';
import { APP_VERSION, CHECKPOINTS, DAYS } from '../constants';
import { useAppContext } from '../context/AppContext';

export const ExportView: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const payload = {
    meta: {
      product: "The Critical Thinker's Journey Part 3: Finding Meaning and Balance",
      version: APP_VERSION,
      exportedAt: new Date().toISOString()
    },
    completedDays: state.completedDays,
    completedCheckpoints: state.completedCheckpoints,
    responses: state.responses,
    finalReflection: state.finalReflection
  };

  const buildText = () => {
    const lines: string[] = [
      "THE CRITICAL THINKER'S JOURNEY",
      'PART 3: EXPLORING IDEAS AND MAKING MOVES',
      '',
      `Exported: ${new Date().toLocaleString()}`,
      ''
    ];

    DAYS.forEach((day) => {
      lines.push(`DAY ${day.day}: ${day.title}`);
      lines.push(`Framework: ${day.frameworkName} - ${day.framework}`);
      day.prompts.forEach((prompt) => {
        lines.push('');
        lines.push(`${prompt.label}: ${prompt.text}`);
        lines.push(state.responses[prompt.id] ?? '');
      });
      lines.push('');
      const checkpoint = CHECKPOINTS.find((item) => item.afterDay === day.day);
      if (checkpoint) {
        lines.push(checkpoint.title.toUpperCase());
        lines.push(state.responses[`checkpoint-${checkpoint.id}`] ?? '');
        lines.push('');
      }
    });

    lines.push('FINAL REFLECTION');
    lines.push(state.finalReflection);
    return lines.join('\n');
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleTXT = () => downloadBlob(new Blob([buildText()], { type: 'text/plain;charset=utf-8' }), 'ctj-part3-responses.txt');
  const handleJSON = () => downloadBlob(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' }), 'ctj-part3-responses.json');

  const handlePDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    const margin = 18;
    const width = 174;
    let y = 18;

    const write = (text: string, size = 10, bold = false) => {
      doc.setFontSize(size);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      const chunks = doc.splitTextToSize(text || ' ', width);
      chunks.forEach((line: string) => {
        if (y > 275) {
          doc.addPage();
          y = 18;
        }
        doc.text(line, margin, y);
        y += size * 0.52 + 2;
      });
    };

    write("THE CRITICAL THINKER'S JOURNEY", 11, true);
    write('PART 3: EXPLORING IDEAS AND MAKING MOVES', 16, true);
    y += 3;

    DAYS.forEach((day) => {
      write(`Day ${day.day}: ${day.title}`, 12, true);
      day.prompts.forEach((prompt) => {
        const response = state.responses[prompt.id];
        if (!response?.trim()) return;
        write(prompt.label, 9, true);
        write(response, 9, false);
      });
      y += 2;
    });

    CHECKPOINTS.forEach((checkpoint) => {
      const response = state.responses[`checkpoint-${checkpoint.id}`];
      if (response?.trim()) {
        write(checkpoint.title, 12, true);
        write(response);
      }
    });

    write('Final Reflection', 12, true);
    write(state.finalReflection);
    doc.save('ctj-part3-responses.pdf');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in" data-testid="export-view">
      <button onClick={() => dispatch({ type: 'SET_VIEW', payload: 'final' })} className="inline-flex items-center gap-2 text-ctj-muted hover:text-ctj-platinum focus-ring rounded">
        <ArrowLeft size={18} /> Back to Final Reflection
      </button>

      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-ctj-gold">Part 3 Complete</p>
        <h1 className="text-4xl font-semibold mt-2">Keep Your Work</h1>
        <p className="text-ctj-silver mt-3">Export a portable copy before clearing browser data or changing devices.</p>
      </div>

      <div className="grid gap-4">
        <button data-testid="export-pdf" onClick={handlePDF} className="export-button"><span className="flex items-center gap-3"><FileText className="text-ctj-blue" /> PDF</span><Download size={18} /></button>
        <button data-testid="export-json" onClick={handleJSON} className="export-button"><span className="flex items-center gap-3"><Code className="text-ctj-blue" /> JSON</span><Download size={18} /></button>
        <button data-testid="export-txt" onClick={handleTXT} className="export-button"><span className="flex items-center gap-3"><span className="text-xs font-bold text-ctj-gold">TXT</span> Plain Text</span><Download size={18} /></button>
      </div>

      <button
        onClick={() => {
          if (window.confirm('Start Part 3 again? Your current local responses will be cleared. Export first if you want to keep them.')) {
            dispatch({ type: 'RESET_WORK' });
          }
        }}
        className="btn-secondary w-full inline-flex justify-center items-center gap-2"
      >
        <RotateCcw size={18} /> Start Part 3 Again
      </button>
    </div>
  );
};
