import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
 
const handleStyle = { left: 10 };
 
function TextDisplayNode({ data, isConnectable }) {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);
 
  return (
    <div className="text-display-node"
    style={{
        background: '#fff', // Dark Background
        color: '#333', // White Text
        padding: '8px 12px',
        border: '1px solid #555',
        borderRadius: '8px',
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        {data.output}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}
 
export default TextDisplayNode;