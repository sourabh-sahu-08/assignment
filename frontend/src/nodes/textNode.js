// nodes/textNode.js
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
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 120)}px`;
    }
  }, [currText]);

  // Variable detection
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const detectedVars = [...new Set(matches.map((m) => m[1]))];
    setVariables(detectedVars);
  }, [currText]);

  const inputs = variables.map((v) => ({
    id: `${id}-${v}`,
    label: v,
    position: Position.Left,
  }));

  const charCount = currText.length;
  const isOverLimit = charCount > 500;

  return (
    <BaseNode
      id={id}
      title="Text"
      nodeType="text"
      inputs={inputs}
      outputs={[{ id: `${id}-output`, label: 'text' }]}
      selected={selected}
    >
      <div className="flex flex-col gap-2.5">
        <label className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Content</span>
            <span className={`text-[8px] font-bold mono ${isOverLimit ? 'text-red-400' : 'text-slate-600'}`}>
              {charCount}/500
            </span>
          </div>
          <textarea
            ref={textAreaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            rows={2}
            placeholder="Type {{variable}}..."
            className="w-full px-3 py-2 rounded-xl text-[11px] text-slate-200 placeholder:text-slate-600
              border transition-all resize-none overflow-y-auto leading-relaxed"
            style={{
              background: 'rgba(15,23,42,0.7)',
              borderColor: isOverLimit ? 'rgba(239,68,68,0.4)' : 'rgba(51,65,85,0.6)',
              fontFamily: "'JetBrains Mono', monospace",
              maxHeight: 120,
            }}
          />
        </label>

        {/* Variable chips */}
        {variables.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {variables.map((v) => (
              <span key={v}
                className="px-2 py-0.5 text-[7px] font-black rounded-lg uppercase tracking-tight border"
                style={{ background: '#f59e0b15', borderColor: '#f59e0b30', color: '#fbbf24' }}>
                {'{{'}{v}{'}}'}
              </span>
            ))}
          </div>
        )}

        {/* Hint */}
        {variables.length === 0 && (
          <p className="text-[8px] text-slate-600 leading-relaxed">
            Use <span className="font-bold text-amber-500/70">{'{{variable}}'}</span> to add dynamic inputs.
          </p>
        )}
      </div>
    </BaseNode>
  );
};
