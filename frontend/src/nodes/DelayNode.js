import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, selected }) => {
  const [delay, setDelay] = useState(1000);

  return (
    <BaseNode
      id={id}
      title="Delay"
      inputs={[{ id: `${id}-in` }]}
      outputs={[{ id: `${id}-out` }]}
      selected={selected}
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Duration (ms)</label>
        <input 
          type="number" 
          value={delay} 
          onChange={(e) => setDelay(e.target.value)}
          className="px-3 py-2 border border-slate-700 rounded-xl bg-slate-900/50 text-xs text-slate-200 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>
    </BaseNode>
  );
}
