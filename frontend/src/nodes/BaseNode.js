// nodes/BaseNode.js
import { useCallback } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

const NODE_ACCENT = {
  customInput:  '#10b981',
  customOutput: '#3b82f6',
  llm:          '#a855f7',
  text:         '#f59e0b',
  delay:        '#ec4899',
  logger:       '#06b6d4',
  math:         '#f97316',
  filter:       '#84cc16',
  apiRequest:   '#6366f1',
};

const NODE_ICONS = {
  customInput:  '📥',
  customOutput: '📤',
  llm:          '🤖',
  text:         '📝',
  delay:        '⏳',
  logger:       '📋',
  math:         '🔢',
  filter:       '🔍',
  apiRequest:   '🌐',
};

export const BaseNode = ({
  id,
  title,
  nodeType,
  inputs  = [],
  outputs = [],
  children,
  selected,
}) => {
  const { deleteElements } = useReactFlow();
  const accent = NODE_ACCENT[nodeType] || '#6366f1';
  const icon   = NODE_ICONS[nodeType]  || '⚙️';

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation();
      deleteElements({ nodes: [{ id }] });
    },
    [id, deleteElements]
  );

  return (
    <div
      className="relative rounded-2xl shadow-2xl min-w-[220px] transition-all duration-200 overflow-visible group/node"
      style={{
        background: 'linear-gradient(145deg, #1e293b, #162033)',
        border: selected
          ? `1.5px solid ${accent}88`
          : '1.5px solid rgba(51,65,85,0.6)',
        boxShadow: selected
          ? `0 0 0 3px ${accent}22, 0 20px 40px rgba(0,0,0,0.5)`
          : '0 8px 32px rgba(0,0,0,0.4)',
        /* Coloured left accent bar */
        borderLeft: `3px solid ${accent}`,
      }}
    >
      {/* ── Header ── */}
      <div
        className="px-3.5 py-2.5 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl"
        style={{
          background: `linear-gradient(90deg, ${accent}18, transparent)`,
          borderBottom: `1px solid rgba(51,65,85,0.5)`,
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm leading-none">{icon}</span>
          <span
            className="text-[9px] font-black uppercase tracking-widest"
            style={{ color: accent }}
          >
            {title}
          </span>
        </div>

        {/* Traffic-light dots + Delete */}
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          {/* Delete button — shows on hover */}
          <button
            onClick={handleDelete}
            title="Remove node"
            className="
              w-4 h-4 rounded-full flex items-center justify-center
              opacity-0 group-hover/node:opacity-100
              transition-all duration-150 ml-1
              hover:scale-125
            "
            style={{ background: '#ef444433', border: '1px solid #ef444455' }}
          >
            <svg className="w-2 h-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-3.5 relative min-h-[50px]">
        {/* Input Handles */}
        {inputs.map((input, index) => (
          <div key={input.id || `${id}-input-${index}`}>
            <Handle
              type="target"
              position={input.position || Position.Left}
              id={input.id}
              style={{
                background: '#10b981',
                borderColor: '#162033',
                top: input.top || (inputs.length > 1
                  ? `${((index + 1) * 100) / (inputs.length + 1)}%`
                  : '50%'),
                boxShadow: '0 0 6px rgba(16,185,129,0.5)',
                ...input.style,
              }}
              className="!w-3 !h-3 !border-2 !transition-all"
            />
            {/* Port label */}
            {input.label && (
              <div
                className="absolute text-[7px] font-bold text-emerald-400/70 uppercase tracking-wider whitespace-nowrap"
                style={{
                  left: -52,
                  top: input.top || (inputs.length > 1
                    ? `calc(${((index + 1) * 100) / (inputs.length + 1)}% - 6px)`
                    : 'calc(50% - 6px)'),
                }}
              >
                {input.label}
              </div>
            )}
          </div>
        ))}

        {/* Children */}
        <div className="flex flex-col gap-3">{children}</div>

        {/* Output Handles */}
        {outputs.map((output, index) => (
          <div key={output.id || `${id}-output-${index}`}>
            <Handle
              type="source"
              position={output.position || Position.Right}
              id={output.id}
              style={{
                background: '#a855f7',
                borderColor: '#162033',
                top: output.top || (outputs.length > 1
                  ? `${((index + 1) * 100) / (outputs.length + 1)}%`
                  : '50%'),
                boxShadow: '0 0 6px rgba(168,85,247,0.5)',
                ...output.style,
              }}
              className="!w-3 !h-3 !border-2 !transition-all"
            />
            {/* Port label */}
            {output.label && (
              <div
                className="absolute text-[7px] font-bold text-purple-400/70 uppercase tracking-wider whitespace-nowrap"
                style={{
                  right: -44,
                  top: output.top || (outputs.length > 1
                    ? `calc(${((index + 1) * 100) / (outputs.length + 1)}% - 6px)`
                    : 'calc(50% - 6px)'),
                }}
              >
                {output.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
