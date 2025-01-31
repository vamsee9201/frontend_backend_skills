import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
 
const handleStyle = { left: 10 };
 
function TextUpdaterNode({ data, isConnectable }) {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);
 
  return (
    <div className="text-updater-node"
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
        <label htmlFor="text">Prompt:</label>
        <input id="text" name="prompt:" onChange={data.onChange} className="nodrag" />
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
 
export default TextUpdaterNode;