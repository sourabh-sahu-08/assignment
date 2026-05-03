// nodes/FilterNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const OPERATORS = ['>', '<', '>=', '<=', '==', '!=', 'contains', 'startsWith', 'endsWith'];

export const FilterNode = ({ id, selected }) => {
  const [field,    setField]    = useState('value');
  const [operator, setOperator] = useState('>');
  const [value,    setValue]    = useState('0');

  const preview = `${field} ${operator} ${value}`;

  return (
    <BaseNode
      id={id}
      title="Filter"
      nodeType="filter"
      inputs={[{ id: `${id}-data`, label: 'data' }]}
      outputs={[
        { id: `${id}-true`,  label: 'true',  top: '35%' },
        { id: `${id}-false`, label: 'false', top: '65%' },
      ]}
      selected={selected}
    >
      <div className="flex flex-col gap-2.5">
        {/* Field */}
        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Field</span>
          <input
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder="field name"
            className="w-full px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-200 placeholder:text-slate-600
              border border-slate-700/60 focus:outline-none focus:border-lime-500/50 transition-all mono"
            style={{ background: 'rgba(15,23,42,0.7)' }}
          />
        </label>

        {/* Operator + Value row */}
        <div className="flex gap-2">
          <label className="flex flex-col gap-1 w-1/2">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Operator</span>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full px-2 py-1.5 rounded-xl text-[10px] font-bold text-slate-200
                border border-slate-700/60 focus:outline-none focus:border-lime-500/50 transition-all appearance-none cursor-pointer mono"
              style={{ background: 'rgba(15,23,42,0.7)' }}
            >
              {OPERATORS.map((op) => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 w-1/2">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Value</span>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0"
              className="w-full px-2 py-1.5 rounded-xl text-[11px] font-medium text-slate-200 placeholder:text-slate-600
                border border-slate-700/60 focus:outline-none focus:border-lime-500/50 transition-all mono"
              style={{ background: 'rgba(15,23,42,0.7)' }}
            />
          </label>
        </div>

        {/* Condition preview */}
        <div
          className="px-3 py-1.5 rounded-xl border text-[9px] font-bold mono truncate"
          style={{ background: '#84cc1610', borderColor: '#84cc1630', color: '#a3e635' }}
        >
          if ({preview})
        </div>
      </div>
    </BaseNode>
  );
};
