// nodes/outputNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const OUTPUT_FORMATS = ['Text', 'JSON', 'Markdown', 'CSV', 'HTML'];

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName]     = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputFormat, setOutputFormat] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      nodeType="customOutput"
      inputs={[{ id: `${id}-value`, label: 'value' }]}
      selected={selected}
    >
      <div className="flex flex-col gap-2.5">
        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Output Name</span>
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            placeholder="e.g. result"
            className="w-full px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-200 placeholder:text-slate-600
              border border-slate-700/60 focus:outline-none focus:border-blue-500/50 transition-all"
            style={{ background: 'rgba(15,23,42,0.7)' }}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Format</span>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-200
              border border-slate-700/60 focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
            style={{ background: 'rgba(15,23,42,0.7)' }}
          >
            {OUTPUT_FORMATS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-[8px] font-bold text-blue-400/70 uppercase tracking-wider mono">pipeline → {outputFormat}</span>
        </div>
      </div>
    </BaseNode>
  );
};
