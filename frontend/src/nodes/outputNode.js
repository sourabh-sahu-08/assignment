import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={[{ id: `${id}-value` }]}
      selected={selected}
    >
      <div className="flex flex-col gap-3">
        <label className="flex flex-col text-[9px] font-black text-slate-500 uppercase tracking-widest">
          Field Name
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)}
            className="mt-1.5 px-3 py-2 border border-slate-700 rounded-xl bg-slate-900/50 text-xs text-slate-200 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </label>
        <label className="flex flex-col text-[9px] font-black text-slate-500 uppercase tracking-widest">
          Type
          <select 
            value={outputType} 
            onChange={(e) => setOutputType(e.target.value)}
            className="mt-1.5 px-3 py-2 border border-slate-700 rounded-xl bg-slate-900/50 text-xs text-slate-200 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
