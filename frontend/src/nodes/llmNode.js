import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, selected }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[
        { id: `${id}-system`, top: '33%' },
        { id: `${id}-prompt`, top: '66%' }
      ]}
      outputs={[{ id: `${id}-response` }]}
      selected={selected}
    >
      <div className="text-xs text-gray-600 bg-indigo-50 p-2 rounded border border-indigo-100">
        This is a Large Language Model node.
      </div>
    </BaseNode>
  );
}
