import React, { useCallback, useEffect, useState } from 'react';
//import OpenAI from "openai";
//import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";
import openai_api from "./openai_api.json";



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
import TextDisplayNode from './TextDisplayNode';



export default function App() {
  const nodeTypes = { textUpdater: TextUpdaterNode , textDisplay: TextDisplayNode};

  const rfStyle = {
    backgroundColor: '#B8CEFF',
  };
  
  function onChange(event) {
    setPrompt(event.target.value)
  }
  const initialNodes = [
    {
      id: '1',
      type: 'textUpdater',
      position: { x: 0, y: 0 },
      data: { onChange:onChange },
    },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'open AI' } },
    {
      id:'3',
      type:'textDisplay',
      position: {x:0,y:0},
      data:{output:"no output"}
    }
  ];
  const initialEdges = [{ id: 'e1', source: '1', target: '2' },{id: 'e2', source: '2', target: '3'}];
  
  function MyButton() {
    return (
      <button onClick={() => alert("Button Clicked!")}>
        Click Me
      </button>
    );
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [prompt,setPrompt] = useState("");


 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  





  const updateOutput = async () => {
    //console.log(openai_api.key)
    const openai = new OpenAI({
      apiKey: openai_api.key,
      dangerouslyAllowBrowser: true
    });
    
    async function get_answer() {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
        store: true,
      });
      console.log(completion);
      return completion.choices[0].message.content;
    }
    const answer = await get_answer();
    //console.log(completion)
    console.log(answer)
    const updatedNodes = nodes.slice();
    console.log(prompt);
    updatedNodes[2]["data"]["output"] = answer;
    console.log("got updated nodes");
    setNodes(updatedNodes);
  };
  


  
 
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
        onClick={updateOutput} 
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