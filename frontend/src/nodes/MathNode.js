import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, selected }) => {
  const [operation, setOperation] = useState('add');

  return (
    <BaseNode
      id={id}
      title="Math"
      inputs={[{ id: `${id}-a` }, { id: `${id}-b` }]}
      outputs={[{ id: `${id}-result` }]}
      selected={selected}
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Operation</label>
        <select 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
          className="w-full px-3 py-2 border border-slate-700 rounded-xl bg-slate-900/50 text-xs text-slate-200 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
        >
          <option value="add">Add (+)</option>
          <option value="sub">Subtract (-)</option>
          <option value="mul">Multiply (*)</option>
          <option value="div">Divide (/)</option>
        </select>
      </div>
    </BaseNode>
  );
}
