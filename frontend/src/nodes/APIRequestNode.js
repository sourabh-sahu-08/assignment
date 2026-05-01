import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const APIRequestNode = ({ id, selected }) => {
  const [url, setUrl] = useState('https://api.example.com');
  const [method, setMethod] = useState('GET');

  return (
    <BaseNode
      id={id}
      title="API Request"
      inputs={[
        { id: `${id}-trigger`, top: '33%' },
        { id: `${id}-body`, top: '66%' }
      ]}
      outputs={[
        { id: `${id}-data`, top: '33%' },
        { id: `${id}-error`, top: '66%' }
      ]}
      selected={selected}
    >
      <div className="flex flex-col gap-2.5">
        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Endpoint</label>
        <div className="flex flex-col gap-2">
            <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="px-3 py-2 border border-slate-700 rounded-xl bg-slate-900/50 text-xs font-bold text-indigo-400 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer appearance-none"
            >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            </select>
            <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
            className="px-3 py-2 border border-slate-700 rounded-xl bg-slate-900/50 text-[10px] text-slate-300 truncate focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
        </div>
      </div>
    </BaseNode>
  );
}
