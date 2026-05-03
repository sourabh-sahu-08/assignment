// components/Modal.js
import { useEffect, useRef } from 'react';

const Stat = ({ label, value, color }) => (
  <div
    className="flex flex-col items-center gap-1 p-4 rounded-2xl border"
    style={{ background: color + '0a', borderColor: color + '25' }}
  >
    <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: color + 'aa' }}>{label}</span>
    <span className="text-3xl font-black text-white tabular-nums">{value}</span>
  </div>
);

export const PipelineModal = ({ isOpen, onClose, data, nodeCount, edgeCount }) => {
  const closeRef = useRef(null);

  // Focus close button on open
  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  const isDAG = data?.is_dag;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-xl flex items-center justify-center
            text-slate-500 hover:text-white border border-slate-700/60 hover:border-slate-500
            transition-all duration-150 hover:bg-slate-700/50 active:scale-90"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-5">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-2xl"
            style={{
              background: isDAG
                ? 'linear-gradient(135deg,#059669,#10b981)'
                : 'linear-gradient(135deg,#dc2626,#ef4444)',
              boxShadow: isDAG
                ? '0 8px 32px rgba(16,185,129,0.35)'
                : '0 8px 32px rgba(239,68,68,0.35)',
            }}
          >
            {isDAG ? '✅' : '🔁'}
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-xl font-black text-slate-100 tracking-tight">Pipeline Analysis</h2>
            <p className="text-slate-500 text-xs mt-1 font-medium">
              Structural analysis of your pipeline graph
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <Stat label="Nodes"   value={data?.num_nodes}  color="#6366f1" />
            <Stat label="Edges"   value={data?.num_edges}  color="#a855f7" />
          </div>

          {/* DAG status card */}
          <div
            className="w-full p-4 rounded-2xl border flex items-center gap-4"
            style={{
              background: isDAG ? 'rgba(16,185,129,0.07)' : 'rgba(239,68,68,0.07)',
              borderColor: isDAG ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: isDAG ? '#10b981' : '#ef4444' }}
            >
              {isDAG ? (
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16M4 20L20 4" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm" style={{ color: isDAG ? '#34d399' : '#f87171' }}>
                {isDAG ? 'Valid DAG ✓' : 'Cycle Detected ✗'}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 font-medium leading-relaxed">
                {isDAG
                  ? 'No circular dependencies found. Safe to execute.'
                  : 'A cycle was detected. Remove the loop to make it a valid DAG.'}
              </p>
            </div>
          </div>

          {/* Connectivity info */}
          {data?.num_nodes > 0 && (
            <div
              className="w-full px-4 py-2.5 rounded-xl border flex items-center justify-between"
              style={{ background: 'rgba(30,41,59,0.5)', borderColor: 'rgba(51,65,85,0.5)' }}
            >
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Graph Density</span>
              <span className="text-[10px] font-black text-slate-300 mono">
                {data.num_nodes > 1
                  ? ((data.num_edges / (data.num_nodes * (data.num_nodes - 1))) * 100).toFixed(1)
                  : '0.0'}%
              </span>
            </div>
          )}

          {/* Dismiss */}
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest
              transition-all duration-200 active:scale-95 shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 30px rgba(99,102,241,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.35)'; e.currentTarget.style.transform = ''; }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
