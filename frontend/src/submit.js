import { useState } from 'react';
import { useStore } from './store';
import { PipelineModal } from './components/Modal';

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nodes, edges })
      });

      if (!res.ok) throw new Error("Engine failed to respond");

      const data = await res.json();
      setResponse(data);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("❌ Submission Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="submit-container">
        <button 
          type="button" 
          onClick={handleSubmit}
          disabled={loading || nodes.length === 0}
          className="submit-button"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="uppercase tracking-widest text-[11px] font-black">Analyzing...</span>
            </>
          ) : (
            <span className="uppercase tracking-widest text-[11px] font-black">Submit Pipeline</span>
          )}
        </button>
      </div>

      <PipelineModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        data={response} 
      />
    </>
  );
};