export const PipelineModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-3xl shadow-inner border border-indigo-500/20">
            🚀
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-100 tracking-tight">Pipeline Analysis</h2>
            <p className="text-slate-400 text-xs mt-1">Detailed breakdown of your current architecture</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full mt-2">
            <div className="bg-slate-900/50 p-4 rounded-3xl border border-slate-700/50 flex flex-col items-center transition-all hover:bg-slate-900">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Nodes</span>
              <span className="text-3xl font-black text-white mt-1">{data?.num_nodes}</span>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-3xl border border-slate-700/50 flex flex-col items-center transition-all hover:bg-slate-900">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Edges</span>
              <span className="text-3xl font-black text-white mt-1">{data?.num_edges}</span>
            </div>
          </div>

          <div className={`
            w-full p-5 rounded-3xl border flex items-center justify-between mt-2 transition-all
            ${data?.is_dag ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}
          `}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${data?.is_dag ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                {data?.is_dag ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
              </div>
              <div>
                <span className={`text-sm font-black block ${data?.is_dag ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {data?.is_dag ? 'DAG Valid' : 'Cycle Detected'}
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Topology Status</span>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-2xl transition-all shadow-xl shadow-indigo-600/20 mt-4 active:scale-95"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
