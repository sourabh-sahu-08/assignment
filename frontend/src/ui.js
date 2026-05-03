// ui.js — Pipeline Canvas
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode }      from './nodes/inputNode';
import { LLMNode }        from './nodes/llmNode';
import { OutputNode }     from './nodes/outputNode';
import { TextNode }       from './nodes/textNode';
import { DelayNode }      from './nodes/DelayNode';
import { LoggerNode }     from './nodes/LoggerNode';
import { MathNode }       from './nodes/MathNode';
import { FilterNode }     from './nodes/FilterNode';
import { APIRequestNode } from './nodes/APIRequestNode';

import 'reactflow/dist/style.css';

const proOptions = { hideAttribution: true };
const snapGrid   = [16, 16];

const selector = (state) => ({
  nodes:          state.nodes,
  edges:          state.edges,
  getNodeID:      state.getNodeID,
  addNode:        state.addNode,
  onNodesChange:  state.onNodesChange,
  onEdgesChange:  state.onEdgesChange,
  onConnect:      state.onConnect,
});

// ── Empty canvas illustration ──────────────────────────────
const EmptyState = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10">
    <div className="flex flex-col items-center gap-4 opacity-20">
      <svg className="w-20 h-20 text-indigo-400" fill="none" viewBox="0 0 80 80" stroke="currentColor" strokeWidth={1.2}>
        <rect x="8"  y="28" width="24" height="24" rx="6" />
        <rect x="48" y="8"  width="24" height="24" rx="6" />
        <rect x="48" y="48" width="24" height="24" rx="6" />
        <path d="M32 40h8m0 0l-4-4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 34l16-10m0 32L32 46" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3"/>
      </svg>
      <div className="text-center">
        <p className="text-slate-400 font-black text-lg tracking-tight">Canvas is empty</p>
        <p className="text-slate-600 text-sm mt-1">Drag components from the sidebar to get started</p>
      </div>
    </div>
  </div>
);

// ── Top Navbar ─────────────────────────────────────────────
const CanvasNavbar = ({ nodeCount, edgeCount, pipelineName, setPipelineName }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const startEdit = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 50);
  };

  return (
    <div
      className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-2.5"
      style={{
        background: 'rgba(8,13,26,0.8)',
        borderBottom: '1px solid rgba(51,65,85,0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Pipeline name */}
      <div className="flex items-center gap-2" onClick={startEdit} title="Click to rename">
        {editing ? (
          <input
            ref={inputRef}
            value={pipelineName}
            onChange={(e) => setPipelineName(e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') setEditing(false); }}
            className="text-sm font-black text-slate-100 bg-transparent border-b border-indigo-500 focus:outline-none px-1 w-48"
            autoFocus
          />
        ) : (
          <>
            <span className="text-sm font-black text-slate-200">{pipelineName}</span>
            <svg className="w-3 h-3 text-slate-600 cursor-pointer hover:text-slate-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z"/>
            </svg>
          </>
        )}
      </div>

      {/* Stats pills */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border"
          style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.25)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{nodeCount} nodes</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border"
          style={{ background: 'rgba(168,85,247,0.1)', borderColor: 'rgba(168,85,247,0.25)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">{edgeCount} edges</span>
        </div>

        {/* Keyboard hint */}
        <div className="hidden md:flex items-center gap-1 ml-2 text-[8px] text-slate-600 font-medium">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">Del</kbd>
          <span>remove selected</span>
        </div>
      </div>
    </div>
  );
};

// ── Inner Flow (needs ReactFlowProvider context) ────────────
const FlowCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [pipelineName, setPipelineName] = useState('Untitled Pipeline');
  const { deleteElements } = useReactFlow();

  const {
    nodes, edges, getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect,
  } = useStore(selector, shallow);

  const nodeTypes = useMemo(() => ({
    customInput:  InputNode,
    llm:          LLMNode,
    customOutput: OutputNode,
    text:         TextNode,
    delay:        DelayNode,
    logger:       LoggerNode,
    math:         MathNode,
    filter:       FilterNode,
    apiRequest:   APIRequestNode,
  }), []);

  // Keyboard: Delete selected nodes/edges
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') &&
          !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) {
        const selectedNodes = nodes.filter((n) => n.selected);
        const selectedEdges = edges.filter((ed) => ed.selected);
        if (selectedNodes.length || selectedEdges.length) {
          deleteElements({ nodes: selectedNodes, edges: selectedEdges });
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nodes, edges, deleteElements]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const rawData = event.dataTransfer.getData('application/reactflow');
      if (!rawData) return;

      const appData = JSON.parse(rawData);
      const type    = appData?.nodeType;
      if (!type) return;

      const bounds   = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID  = getNodeID(type);
      const newNode = {
        id:       nodeID,
        type,
        position,
        data:     { id: nodeID, nodeType: type },
      };
      addNode(newNode);
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="w-full h-full relative">
      {/* Top navbar */}
      <CanvasNavbar
        nodeCount={nodes.length}
        edgeCount={edges.length}
        pipelineName={pipelineName}
        setPipelineName={setPipelineName}
      />

      {/* Empty state */}
      {nodes.length === 0 && <EmptyState />}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={snapGrid}
        snapToGrid
        fitView
        fitViewOptions={{ padding: 0.3 }}
        connectionLineType="smoothstep"
        connectionLineStyle={{ stroke: '#818cf8', strokeWidth: 2, strokeDasharray: '6 3' }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#475569', strokeWidth: 2 },
        }}
        deleteKeyCode={null} /* handled manually so inputs aren't affected */
        style={{ paddingTop: 48 }} /* leave room for navbar */
      >
        <Background
          color="#1e293b"
          gap={24}
          variant={BackgroundVariant.Dots}
          size={1.5}
        />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(n) => {
            const map = {
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
            return map[n.type] || '#475569';
          }}
          maskColor="rgba(8,13,26,0.6)"
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
};

// ── Public export — wrapped in provider ────────────────────
export const PipelineUI = () => (
  <ReactFlowProvider>
    <FlowCanvas />
  </ReactFlowProvider>
);
