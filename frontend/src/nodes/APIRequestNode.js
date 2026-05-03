// nodes/APIRequestNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const AUTH_TYPES = ['None', 'Bearer Token', 'API Key', 'Basic Auth'];

const METHOD_COLORS = {
  GET:    '#10b981',
  POST:   '#6366f1',
  PUT:    '#f59e0b',
  PATCH:  '#ec4899',
  DELETE: '#ef4444',
};

export const APIRequestNode = ({ id, selected }) => {
  const [url,      setUrl]      = useState('https://api.example.com/data');
  const [method,   setMethod]   = useState('GET');
  const [authType, setAuthType] = useState('None');

  const methodColor = METHOD_COLORS[method] || '#6366f1';

  return (
    <BaseNode
      id={id}
      title="API Request"
      nodeType="apiRequest"
      inputs={[
        { id: `${id}-trigger`, label: 'trigger', top: '30%' },
        { id: `${id}-body`,    label: 'body',    top: '65%' },
      ]}
      outputs={[
        { id: `${id}-data`,  label: 'data',  top: '35%' },
        { id: `${id}-error`, label: 'error', top: '65%' },
      ]}
      selected={selected}
    >
      <div className="flex flex-col gap-2.5">
        {/* Method + URL */}
        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Endpoint</span>
          <div className="flex gap-1.5">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-20 px-2 py-1.5 rounded-xl text-[9px] font-black uppercase
                border focus:outline-none transition-all appearance-none cursor-pointer text-center"
              style={{
                background: methodColor + '18',
                borderColor: methodColor + '50',
                color: methodColor,
              }}
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-2 py-1.5 rounded-xl text-[9px] text-slate-400 truncate
                border border-slate-700/60 focus:outline-none focus:border-indigo-500/50 transition-all mono"
              style={{ background: 'rgba(15,23,42,0.7)' }}
            />
          </div>
        </label>

        {/* Auth type */}
        <label className="flex flex-col gap-1">
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Auth</span>
          <select
            value={authType}
            onChange={(e) => setAuthType(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-200
              border border-slate-700/60 focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
            style={{ background: 'rgba(15,23,42,0.7)' }}
          >
            {AUTH_TYPES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </label>

        {/* Status badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="text-[8px] font-black px-2 py-0.5 rounded-lg border uppercase"
            style={{ background: methodColor + '15', borderColor: methodColor + '40', color: methodColor }}
          >
            {method}
          </span>
          {authType !== 'None' && (
            <span className="text-[8px] font-bold px-2 py-0.5 rounded-lg border uppercase"
              style={{ background: '#6366f115', borderColor: '#6366f140', color: '#818cf8' }}>
              🔒 {authType}
            </span>
          )}
        </div>
      </div>
    </BaseNode>
  );
};
