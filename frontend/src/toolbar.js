// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden h-full shadow-2xl z-20">
            {/* Sidebar Header */}
            <div className="p-8 border-b border-slate-800">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                        <span className="text-white text-xl font-black">P</span>
                    </div>
                    <div>
                        <h1 className="text-base font-black text-slate-100 tracking-tight leading-none">Pipeline</h1>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] italic">Architect</span>
                    </div>
                </div>
            </div>
            
            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar">
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Components</span>
                        <div className="px-2 py-0.5 bg-slate-800 rounded-md border border-slate-700 text-[8px] font-bold text-slate-400">9 TOTAL</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <DraggableNode type='customInput' label='Input' icon="📥" />
                        <DraggableNode type='llm' label='LLM' icon="🤖" />
                        <DraggableNode type='customOutput' label='Output' icon="📤" />
                        <DraggableNode type='text' label='Text' icon="📝" />
                        <DraggableNode type='delay' label='Delay' icon="⏳" />
                        <DraggableNode type='logger' label='Logger' icon="📋" />
                        <DraggableNode type='math' label='Math' icon="🔢" />
                        <DraggableNode type='filter' label='Filter' icon="🔍" />
                        <DraggableNode type='apiRequest' label='API' icon="🌐" />
                    </div>
                </section>
                
                <section className="mt-auto">
                    <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                        <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                            Drag or click components to add them to your canvas.
                        </p>
                    </div>
                </section>
            </div>

            {/* Sidebar Footer */}
            <div className="p-6 bg-slate-900/50 border-t border-slate-800">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Engine Online</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-600">v1.2.4</span>
                </div>
            </div>
        </aside>
    );
};
