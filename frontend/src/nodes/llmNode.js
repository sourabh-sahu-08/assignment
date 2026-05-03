// nodes/llmNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const MODELS = [
  { value: 'gpt-4o',          label: 'GPT-4o',          vendor: 'OpenAI' },
  { value: 'gpt-4-turbo',     label: 'GPT-4 Turbo',     vendor: 'OpenAI' },
  { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', vendor: 'Anthropic' },
  { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', vendor: 'Google' },
  { value: 'llama-3.1-70b',   label: 'Llama 3.1 70B',   vendor: 'Meta' },
];

export const LLMNode = ({ id, selected }) => {
  const [model,       setModel]       = useState('gpt-4o');
  const [temperature, setTemperature] = useState(0.7);

  const selectedModel = MODELS.find((m) => m.value === model);

  return (
    <BaseNode
      id={id}
      title="LLM"
      nodeType="llm"
      inputs={[
        { id: `${id}-system`, label: 'system', top: '33%' },
        { id: `${id}-prompt`, label: 'prompt', top: '66%' },
      ]}
      outputs={[{ id: `${id}-response`, label: 'response' }]}
      selected={selected}
    >
      <div className="flex flex-col gap-2.5">
        {/* Model selector */}
        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Model</span>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-200
              border border-slate-700/60 focus:outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer"
            style={{ background: 'rgba(15,23,42,0.7)' }}
          >
            {MODELS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </label>

        {/* Vendor badge */}
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-black px-2 py-0.5 rounded-lg border"
            style={{ background: '#a855f715', borderColor: '#a855f730', color: '#c084fc' }}>
            {selectedModel?.vendor}
          </span>
          <span className="text-[8px] text-slate-600 mono">{selectedModel?.value}</span>
        </div>

        {/* Temperature slider */}
        <label className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Temperature</span>
            <span className="text-[9px] font-black mono"
              style={{ color: temperature > 0.7 ? '#f59e0b' : temperature < 0.3 ? '#06b6d4' : '#a855f7' }}>
              {temperature.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min={0} max={1} step={0.1}
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-1.5 rounded-full cursor-pointer accent-purple-500"
            style={{ background: `linear-gradient(90deg, #a855f7 ${temperature * 100}%, rgba(51,65,85,0.5) ${temperature * 100}%)` }}
          />
          <div className="flex justify-between text-[7px] text-slate-600 font-bold">
            <span>Precise</span><span>Creative</span>
          </div>
        </label>
      </div>
    </BaseNode>
  );
};
