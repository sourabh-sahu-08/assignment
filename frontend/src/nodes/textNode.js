import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Variable detection
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const detectedVars = [...new Set(matches.map(m => m[1]))];
    setVariables(detectedVars);
  }, [currText]);

  const inputs = variables.map((v) => ({
    id: `${id}-${v}`,
    name: v,
    position: Position.Left,
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={inputs}
      outputs={[{ id: `${id}-output` }]}
      selected={selected}
    >
      <div className="flex flex-col gap-3">
        <label className="flex flex-col text-[9px] font-black text-slate-500 uppercase tracking-widest">
          Content
          <textarea 
            ref={textAreaRef}
            value={currText} 
            onChange={(e) => setCurrText(e.target.value)}
            rows={1}
            placeholder="Type {{variable}}..."
            className="mt-1.5 px-3 py-2 border border-slate-700 rounded-xl bg-slate-900/50 text-xs text-slate-200 placeholder:text-slate-600 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all resize-none overflow-hidden"
          />
        </label>
        {variables.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {variables.map(v => (
              <span key={v} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[8px] font-black rounded-lg border border-indigo-500/20 uppercase tracking-tighter">
                {v}
              </span>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  );
}
