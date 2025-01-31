import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import TextUpdaterNode from './TextUpdaterNode';

const nodeTypes = { textUpdater: TextUpdaterNode };

const rfStyle = {
  backgroundColor: '#B8CEFF',
};
 
function onChange() {
  console.log("changed")
}
const initialNodes = [
  {
    id: '1',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { onChange:onChange },
  },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'open AI' } }
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
function MyButton() {
  return (
    <button onClick={() => alert("Button Clicked!")}>
      Click Me
    </button>
  );
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  
 
  return (
    <div style={{ width: '100vw', height: '100vh' ,backgroundColor: "#f9f9f9",}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
       
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        
      </ReactFlow>
      <button 
        onClick={() => alert("Button Clicked!")} 
        style={{
          position: 'absolute', 
          bottom: '20px', 
          right: '1000px', 
          padding: '10px 20px', 
          backgroundColor: '#000000', 
          color: 'white', 
          borderRadius: '5px',
        }}
      >
        Click Me
      </button>
    </div>
  );
}