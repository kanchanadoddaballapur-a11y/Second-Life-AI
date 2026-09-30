import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MessageSquareCode, 
  Sparkles, 
  CheckCircle, 
  HelpCircle,
  HardDrive,
  BatteryCharging,
  Recycle,
  Server
} from 'lucide-react';
import { DeviceInputData } from '../types';

interface AdvisorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  formData: DeviceInputData;
}

export const AdvisorDrawer: React.FC<AdvisorDrawerProps> = ({
  isOpen,
  onClose,
  formData
}) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Hello! I'm your CircuLife Circularity Advisor. Ask me anything about repurposing, battery replacement safety, data sanitization (NIST 800-88), or choosing certified e-waste partners for your ${formData.brand} ${formData.model}.`
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'How do I securely wipe my drive before donation?',
    'Can I use this laptop as a home server without replacing the battery?',
    'How do I check if my lithium battery is physically swollen?',
    'What is the difference between R2 and e-Stewards certification?'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuestion;
    if (!textToSend.trim() || isAsking) return;

    const userMsg = textToSend.trim();
    setInputQuestion('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsAsking(true);

    try {
      const res = await fetch('/api/ask-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMsg,
          context: {
            brand: formData.brand,
            model: formData.model,
            ageYears: formData.ageYears,
            batteryStatus: formData.batteryStatus,
            bootsNormally: formData.bootsNormally
          }
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.answer || 'Consult verified manufacturer manuals for component safety.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'For secure data sanitization, always perform a full cryptographic wipe or ATA secure erase prior to handing over electronic assets.' }]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#0b1117] border-l border-slate-800 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#0e1620]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <MessageSquareCode className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-white">CircuLife AI Advisor</h3>
            <span className="text-[10px] text-slate-400">Live Hardware & Circularity Assistant</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3.5 rounded-2xl max-w-[90%] leading-relaxed ${
                m.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isAsking && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span>Consulting hardware & circular engineering database...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
        <span className="text-[10px] uppercase font-mono text-slate-500 block mb-2 font-semibold">Suggested Questions:</span>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="text-[11px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg text-left transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-800 bg-[#0e1620]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Ask about data wipe, DIY battery, or reuse..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={!inputQuestion.trim() || isAsking}
            className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
