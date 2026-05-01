import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, title, inputs = [], outputs = [], children, selected }) => {
  return (
    <div className={`
      bg-slate-800 border-[1.5px] rounded-2xl shadow-2xl min-w-[220px] transition-all duration-300 overflow-visible
      ${selected ? 'border-indigo-500 shadow-indigo-500/30 ring-1 ring-indigo-500/50' : 'border-slate-700/50 hover:border-slate-500'}
    `}>
      {/* Header */}
      <div className="px-4 py-2.5 bg-slate-900/50 border-b border-slate-700/50 flex items-center justify-between rounded-t-2xl">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 relative min-h-[50px]">
        {/* Inputs */}
        {inputs.map((input, index) => (
          <Handle
            key={input.id || `${id}-input-${index}`}
            type="target"
            position={input.position || Position.Left}
            id={input.id}
            style={{
              top: input.top || (inputs.length > 1 ? `${((index + 1) * 100) / (inputs.length + 1)}%` : '50%'),
              ...input.style
            }}
            className="!w-2.5 !h-2.5 !bg-emerald-500 !border-[2.5px] !border-slate-800 !transition-all hover:!scale-150"
          />
        ))}

        <div className="flex flex-col gap-3">
          {children}
        </div>

        {/* Outputs */}
        {outputs.map((output, index) => (
          <Handle
            key={output.id || `${id}-output-${index}`}
            type="source"
            position={output.position || Position.Right}
            id={output.id}
            style={{
              top: output.top || (outputs.length > 1 ? `${((index + 1) * 100) / (outputs.length + 1)}%` : '50%'),
              ...output.style
            }}
            className="!w-2.5 !h-2.5 !bg-purple-500 !border-[2.5px] !border-slate-800 !transition-all hover:!scale-150"
          />
        ))}
      </div>
    </div>
  );
};
