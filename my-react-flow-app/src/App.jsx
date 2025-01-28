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
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'prompt' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'open AI' } },
  {
    id: 'input-1',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  }
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' },{id:'e2',source:'input-1',target:'1'}];
 
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
    </div>
  );
}