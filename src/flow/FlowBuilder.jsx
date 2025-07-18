
// flow/FlowBuilder.jsx
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodePanel from '../components/NodePanel';
import SettingsPanel from '../components/SettingsPanel';
import { nodeTypes } from '../utils/nodeTypes';

export default function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback((params) => {
    const existing = edges.find((e) => e.source === params.source);
    if (!existing) setEdges((eds) => addEdge(params, eds));
  }, [edges]);

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const handleLabelChange = (text) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id ? { ...node, data: { ...node.data, label: text } } : node
      )
    );
  };

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = { x: event.clientX - 250, y: event.clientY - 100 };
    const newNode = {
      id: `${+new Date()}`,
      type,
      position,
      data: { label: 'text message' },
    };
    setNodes((nds) => nds.concat(newNode));
  }, []);

  const onSave = () => {
    const hasMultipleUnlinked = nodes.filter(
      (n) => !edges.find((e) => e.source === n.id)
    ).length > 1;
    if (hasMultipleUnlinked) {
      alert('Cannot save Flow: Multiple nodes have no outgoing connection.');
    } else {
      console.log('Flow saved:', { nodes, edges });
    }
  };

  return (
    <ReactFlowProvider>
      <div className="flow-container" onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
        <div className="left-panel">
          {!selectedNode ? <NodePanel /> : <SettingsPanel selectedNode={selectedNode} onChange={handleLabelChange} />}
        </div>

        <div className="flow-canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
          <button onClick={onSave} className="save-button">Save Changes</button>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
