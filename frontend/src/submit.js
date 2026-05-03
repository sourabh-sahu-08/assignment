// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { PipelineModal } from './components/Modal';

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const [loading,   setLoading]   = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [response,  setResponse]  = useState(null);
  const [error,     setError]     = useState(null);

  // Quick validation: warn if no input or output node
  const hasInput  = nodes.some((n) => n.type === 'customInput');
  const hasOutput = nodes.some((n) => n.type === 'customOutput');
  const isEmpty   = nodes.length === 0;
  const warnings  = [];
  if (!isEmpty && !hasInput)  warnings.push('No Input node');
  if (!isEmpty && !hasOutput) warnings.push('No Output node');

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nodes, edges }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setResponse(data);
      setModalOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    // Dispatch a custom event the store listens to
    window.dispatchEvent(new CustomEvent('pipeline:clear'));
  };

  return (
    <>
      <div className="submit-container">
        {/* Pipeline stats */}
        <div className="flex items-center gap-3 mr-auto">
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border"
              style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.2)' }}
            >
              <span className="w-1 h-1 rounded-full bg-indigo-400 inline-block" />
              <span className="text-indigo-400">{nodes.length} nodes</span>
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border"
              style={{ background: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.2)' }}
            >
              <span className="w-1 h-1 rounded-full bg-purple-400 inline-block" />
              <span className="text-purple-400">{edges.length} edges</span>
            </span>
          </div>

          {/* Validation warnings */}
          {warnings.map((w) => (
            <span key={w}
              className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg border"
              style={{ background: '#f59e0b12', borderColor: '#f59e0b30', color: '#fbbf24' }}>
              ⚠ {w}
            </span>
          ))}

          {/* Error toast */}
          {error && (
            <span className="text-[9px] font-bold text-red-400 px-2 py-0.5 rounded-lg border border-red-500/30 bg-red-500/10">
              ✕ {error}
            </span>
          )}
        </div>

        {/* Clear button */}
        {nodes.length > 0 && (
          <button
            onClick={handleClear}
            className="px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500
              border border-slate-700/60 hover:border-red-500/40 hover:text-red-400
              transition-all duration-200 hover:bg-red-500/8 active:scale-95"
          >
            Clear
          </button>
        )}

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || isEmpty}
          className="submit-button"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-[11px] font-black uppercase tracking-widest">Analyzing...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-[11px] font-black uppercase tracking-widest">Run Analysis</span>
            </>
          )}
        </button>
      </div>

      <PipelineModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={response}
        nodeCount={nodes.length}
        edgeCount={edges.length}
      />
    </>
  );
};