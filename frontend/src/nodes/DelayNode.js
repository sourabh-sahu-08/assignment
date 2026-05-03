// nodes/DelayNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const UNITS = [
  { value: 'ms', label: 'ms',  factor: 1 },
  { value: 's',  label: 's',   factor: 1000 },
  { value: 'm',  label: 'min', factor: 60000 },
];

export const DelayNode = ({ id, selected }) => {
  const [amount, setAmount] = useState(500);
  const [unit,   setUnit]   = useState('ms');

  const unitObj  = UNITS.find((u) => u.value === unit);
  const totalMs  = amount * unitObj.factor;
  const display  = totalMs >= 60000
    ? `${(totalMs / 60000).toFixed(1)} min`
    : totalMs >= 1000
    ? `${(totalMs / 1000).toFixed(1)} s`
    : `${totalMs} ms`;

  return (
    <BaseNode
      id={id}
      title="Delay"
      nodeType="delay"
      inputs={[{ id: `${id}-in`, label: 'in' }]}
      outputs={[{ id: `${id}-out`, label: 'out' }]}
      selected={selected}
    >
      <div className="flex flex-col gap-2.5">
        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Duration</span>
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="flex-1 px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-200
                border border-slate-700/60 focus:outline-none focus:border-pink-500/50 transition-all mono"
              style={{ background: 'rgba(15,23,42,0.7)' }}
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-16 px-2 py-1.5 rounded-xl text-[10px] font-bold text-slate-200
                border border-slate-700/60 focus:outline-none focus:border-pink-500/50 transition-all appearance-none cursor-pointer text-center"
              style={{ background: 'rgba(15,23,42,0.7)' }}
            >
              {UNITS.map((u) => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
          </div>
        </label>

        {/* Summary display */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
          style={{ background: '#ec489915', borderColor: '#ec489930' }}
        >
          <span className="text-base">⏱️</span>
          <span className="text-[9px] font-black mono" style={{ color: '#f472b6' }}>
            Wait {display}
          </span>
        </div>
      </div>
    </BaseNode>
  );
};
