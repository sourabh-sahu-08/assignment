// draggableNode.js
import { useStore } from './store';

export const DraggableNode = ({ type, label, icon, color = '#6366f1', desc = '' }) => {
  const { addNode, getNodeID } = useStore((state) => ({
    addNode: state.addNode,
    getNodeID: state.getNodeID,
  }));

  const onDragStart = (event) => {
    const appData = { nodeType: type };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleClick = () => {
    const nodeID = getNodeID(type);
    const newNode = {
      id: nodeID,
      type,
      position: {
        x: Math.random() * 300 + 150,
        y: Math.random() * 250 + 100,
      },
      data: { id: nodeID, nodeType: type },
    };
    addNode(newNode);
  };

  return (
    <div
      title={desc}
      onDragStart={onDragStart}
      onClick={handleClick}
      draggable
      className="
        relative cursor-grab flex flex-col items-center justify-center gap-2
        px-3 py-3.5 rounded-2xl border transition-all duration-200 group select-none
        active:cursor-grabbing active:scale-95
        hover:-translate-y-0.5
      "
      style={{
        background: 'rgba(30,41,59,0.5)',
        borderColor: 'rgba(51,65,85,0.6)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color + '55';
        e.currentTarget.style.background = color + '12';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(51,65,85,0.6)';
        e.currentTarget.style.background = 'rgba(30,41,59,0.5)';
      }}
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg
          transition-transform duration-200 group-hover:scale-110 shadow-sm"
        style={{ background: color + '20', border: `1px solid ${color}33` }}
      >
        {icon}
      </div>

      {/* Label */}
      <span className="text-[9px] font-black uppercase tracking-widest text-center leading-none transition-colors duration-200"
        style={{ color: '#64748b' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#cbd5e1'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}
      >
        {label}
      </span>

      {/* Accent dot */}
      <div
        className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: color }}
      />
    </div>
  );
};