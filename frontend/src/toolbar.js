// toolbar.js
import { useState, useMemo } from 'react';
import { DraggableNode } from './draggableNode';
import { useStore } from './store';

const NODE_CATEGORIES = [
  {
    name: 'Data I/O',
    color: 'emerald',
    nodes: [
      { type: 'customInput', label: 'Input',  icon: '📥', color: '#10b981', desc: 'Accepts pipeline input data' },
      { type: 'customOutput', label: 'Output', icon: '📤', color: '#3b82f6', desc: 'Outputs processed pipeline data' },
    ],
  },
  {
    name: 'AI / LLM',
    color: 'purple',
    nodes: [
      { type: 'llm', label: 'LLM', icon: '🤖', color: '#a855f7', desc: 'Large Language Model inference' },
      { type: 'text', label: 'Text', icon: '📝', color: '#f59e0b', desc: 'Text template with variable support' },
    ],
  },
  {
    name: 'Logic',
    color: 'lime',
    nodes: [
      { type: 'filter',  label: 'Filter', icon: '🔍', color: '#84cc16', desc: 'Filter data by condition' },
      { type: 'math',    label: 'Math',   icon: '🔢', color: '#f97316', desc: 'Apply arithmetic operations' },
    ],
  },
  {
    name: 'Utilities',
    color: 'cyan',
    nodes: [
      { type: 'delay',      label: 'Delay',  icon: '⏳', color: '#ec4899', desc: 'Add a time delay to the pipeline' },
      { type: 'logger',     label: 'Logger', icon: '📋', color: '#06b6d4', desc: 'Log data for debugging' },
      { type: 'apiRequest', label: 'API',    icon: '🌐', color: '#6366f1', desc: 'Make HTTP API requests' },
    ],
  },
];

const TOTAL = NODE_CATEGORIES.reduce((s, c) => s + c.nodes.length, 0);

export const PipelineToolbar = () => {
  const [search, setSearch] = useState('');
  const { nodes, edges } = useStore((s) => ({ nodes: s.nodes, edges: s.edges }));

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return NODE_CATEGORIES;
    const q = search.toLowerCase();
    return NODE_CATEGORIES
      .map((cat) => ({
        ...cat,
        nodes: cat.nodes.filter(
          (n) =>
            n.label.toLowerCase().includes(q) ||
            n.desc.toLowerCase().includes(q) ||
            cat.name.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.nodes.length > 0);
  }, [search]);

  return (
    <aside className="w-72 flex flex-col overflow-hidden h-full shadow-2xl z-20 border-r border-slate-800/80"
      style={{ background: 'linear-gradient(180deg, #0d1526 0%, #0a1020 100%)' }}>

      {/* ── Header ── */}
      <div className="px-6 py-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-100 tracking-tight leading-none">Pipeline Architect</h1>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.15em]">v2.0 · Visual Builder</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-slate-800/50 rounded-xl px-3 py-2 border border-slate-700/40">
            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Nodes</div>
            <div className="text-base font-black text-slate-200 leading-tight">{nodes.length}</div>
          </div>
          <div className="flex-1 bg-slate-800/50 rounded-xl px-3 py-2 border border-slate-700/40">
            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Edges</div>
            <div className="text-base font-black text-slate-200 leading-tight">{edges.length}</div>
          </div>
          <div className="flex-1 bg-slate-800/50 rounded-xl px-3 py-2 border border-slate-700/40">
            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Types</div>
            <div className="text-base font-black text-slate-200 leading-tight">{TOTAL}</div>
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search components..."
            className="w-full pl-8 pr-3 py-2 rounded-xl text-[11px] font-medium text-slate-300 placeholder:text-slate-600
              border border-slate-700/60 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30
              transition-all"
            style={{ background: 'rgba(30,41,59,0.7)' }}
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-4 custom-scrollbar pt-2">
        {filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
            <div className="text-3xl opacity-30">🔍</div>
            <p className="text-[11px] text-slate-600 font-medium">No components match<br />"{search}"</p>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <section key={cat.name}>
              <div className="flex items-center justify-between mb-2.5 px-1">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{cat.name}</span>
                <span className="text-[8px] font-bold text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded-md border border-slate-700">
                  {cat.nodes.length}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {cat.nodes.map((n) => (
                  <DraggableNode key={n.type} type={n.type} label={n.label} icon={n.icon} color={n.color} desc={n.desc} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* ── Footer ── */}
      <div className="px-5 py-3.5 border-t border-slate-800/80" style={{ background: 'rgba(8,13,26,0.6)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Engine Online</span>
          </div>
          <span className="text-[9px] font-bold text-slate-700">v2.0.0</span>
        </div>
      </div>
    </aside>
  );
};
