// nodes/inputNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const INPUT_TYPES = ['Text', 'Number', 'Boolean', 'File', 'JSON'];

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const isValid = currName.trim().length > 0;

  return (
    <BaseNode
      id={id}
      title="Input"
      nodeType="customInput"
      outputs={[{ id: `${id}-value`, label: 'value' }]}
      selected={selected}
    >
      <div className="flex flex-col gap-2.5">
        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Field Name</span>
          <div className="relative">
            <input
              type="text"
              value={currName}
              onChange={(e) => setCurrName(e.target.value)}
              placeholder="e.g. user_query"
              className="w-full pl-3 pr-7 py-1.5 rounded-xl text-[11px] font-medium text-slate-200 placeholder:text-slate-600
                border transition-all"
              style={{
                background: 'rgba(15,23,42,0.7)',
                borderColor: isValid ? 'rgba(16,185,129,0.35)' : 'rgba(239,68,68,0.4)',
              }}
            />
            <div
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
              style={{ background: isValid ? '#10b981' : '#ef4444' }}
            />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Data Type</span>
          <select
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-200
              border border-slate-700/60 focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
            style={{ background: 'rgba(15,23,42,0.7)' }}
          >
            {INPUT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        {/* Type badge */}
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[8px] font-bold text-emerald-400/70 uppercase tracking-wider mono">{inputType} → pipeline</span>
        </div>
      </div>
    </BaseNode>
  );
};
