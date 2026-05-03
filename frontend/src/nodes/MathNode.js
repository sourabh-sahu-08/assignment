// nodes/MathNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const OPERATIONS = [
  { value: 'add', label: 'Add',      symbol: '+' },
  { value: 'sub', label: 'Subtract', symbol: '−' },
  { value: 'mul', label: 'Multiply', symbol: '×' },
  { value: 'div', label: 'Divide',   symbol: '÷' },
  { value: 'mod', label: 'Modulo',   symbol: '%' },
  { value: 'pow', label: 'Power',    symbol: '^' },
];

export const MathNode = ({ id, selected }) => {
  const [operation, setOperation] = useState('add');

  const op = OPERATIONS.find((o) => o.value === operation);

  return (
    <BaseNode
      id={id}
      title="Math"
      nodeType="math"
      inputs={[
        { id: `${id}-a`, label: 'a', top: '35%' },
        { id: `${id}-b`, label: 'b', top: '65%' },
      ]}
      outputs={[{ id: `${id}-result`, label: 'result' }]}
      selected={selected}
    >
      <div className="flex flex-col gap-2.5">
        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Operation</span>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-200
              border border-slate-700/60 focus:outline-none focus:border-orange-500/50 transition-all appearance-none cursor-pointer"
            style={{ background: 'rgba(15,23,42,0.7)' }}
          >
            {OPERATIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label} ({o.symbol})</option>
            ))}
          </select>
        </label>

        {/* Live formula preview */}
        <div
          className="flex items-center justify-center gap-2 py-2 rounded-xl border"
          style={{ background: '#f9731615', borderColor: '#f9731630' }}
        >
          <span className="text-[11px] font-black text-slate-400 mono">a</span>
          <span className="text-base font-black" style={{ color: '#fb923c' }}>{op?.symbol}</span>
          <span className="text-[11px] font-black text-slate-400 mono">b</span>
          <span className="text-[11px] font-black text-slate-600 mono mx-1">=</span>
          <span className="text-[11px] font-black text-orange-300 mono">result</span>
        </div>
      </div>
    </BaseNode>
  );
};
