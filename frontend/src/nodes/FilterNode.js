import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, selected }) => {
  const [condition, setCondition] = useState('');

  return (
    <BaseNode
      id={id}
      title="Filter"
      inputs={[{ id: `${id}-data` }]}
      outputs={[
        { id: `${id}-true`, label: 'True', top: '33%' },
        { id: `${id}-false`, label: 'False', top: '66%' }
      ]}
      selected={selected}
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Condition</label>
        <input 
          type="text" 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. value > 10"
          className="w-full px-3 py-2 border border-slate-700 rounded-xl bg-slate-900/50 text-xs text-slate-200 placeholder:text-slate-600 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
        />
      </div>
    </BaseNode>
  );
}
