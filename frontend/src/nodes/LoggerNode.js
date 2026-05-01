import { BaseNode } from './BaseNode';

export const LoggerNode = ({ id, selected }) => {
  return (
    <BaseNode
      id={id}
      title="Logger"
      inputs={[{ id: `${id}-log` }]}
      selected={selected}
    >
      <div className="text-[10px] text-gray-500 p-2 bg-gray-50 rounded border border-dashed border-gray-200">
        Logs incoming data to the console for debugging.
      </div>
    </BaseNode>
  );
}
