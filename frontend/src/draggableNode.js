// draggableNode.js
import { useStore } from './store';

export const DraggableNode = ({ type, label, icon }) => {
  const { addNode, getNodeID } = useStore((state) => ({
    addNode: state.addNode,
    getNodeID: state.getNodeID,
  }));

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleClick = () => {
    const nodeID = getNodeID(type);
    const newNode = {
      id: nodeID,
      type,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
      data: { id: nodeID, nodeType: type },
    };
    addNode(newNode);
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onClick={handleClick}
      draggable
      className={`
        cursor-grab px-4 py-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl shadow-lg
        flex flex-col items-center justify-center gap-3 min-w-[100px] h-[90px] transition-all duration-300
        hover:border-indigo-500/50 hover:bg-slate-800/80 hover:-translate-y-1 hover:shadow-indigo-500/10
        active:cursor-grabbing active:scale-95 group select-none
      `}
    >
      <div className="w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 border border-slate-700/50 shadow-inner">
        {icon}
      </div>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors text-center leading-none">
        {label}
      </span>
    </div>
  );
};