// nodes/LoggerNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const LOG_LEVELS = [
  { value: 'debug', label: 'DEBUG', color: '#64748b' },
  { value: 'info',  label: 'INFO',  color: '#06b6d4' },
  { value: 'warn',  label: 'WARN',  color: '#f59e0b' },
  { value: 'error', label: 'ERROR', color: '#ef4444' },
];

export const LoggerNode = ({ id, selected }) => {
  const [level,  setLevel]  = useState('info');
  const [prefix, setPrefix] = useState('[log]');

  const lvl = LOG_LEVELS.find((l) => l.value === level);

  return (
    <BaseNode
      id={id}
      title="Logger"
      nodeType="logger"
      inputs={[{ id: `${id}-data`, label: 'data' }]}
      outputs={[{ id: `${id}-passthrough`, label: 'pass' }]}
      selected={selected}
    >
      <div className="flex flex-col gap-2.5">
        {/* Log Level */}
        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Log Level</span>
          <div className="grid grid-cols-4 gap-1">
            {LOG_LEVELS.map((l) => (
              <button
                key={l.value}
                onClick={() => setLevel(l.value)}
                className="py-1 rounded-lg text-[8px] font-black uppercase tracking-wider border transition-all"
                style={{
                  background: level === l.value ? l.color + '25' : 'rgba(15,23,42,0.5)',
                  borderColor: level === l.value ? l.color + '60' : 'rgba(51,65,85,0.4)',
                  color: level === l.value ? l.color : '#475569',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </label>

        {/* Prefix */}
        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Prefix</span>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-200
              border border-slate-700/60 focus:outline-none focus:border-cyan-500/50 transition-all mono"
            style={{ background: 'rgba(15,23,42,0.7)' }}
          />
        </label>

        {/* Preview */}
        <div
          className="px-3 py-1.5 rounded-xl border text-[8px] font-bold mono truncate"
          style={{ background: lvl.color + '10', borderColor: lvl.color + '30', color: lvl.color }}
        >
          {lvl.label} {prefix} &lt;data&gt;
        </div>
      </div>
    </BaseNode>
  );
};
