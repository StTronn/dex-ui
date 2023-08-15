import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

const data = [
  {
    "cost": 30,
    "path": {
      "100": ["INR/SGD", "SGD/THB"],
      "200": ["INR/SGD", "SGD/THB"]
    }
  },
  {
    "cost": 50,
    "amount": 300,
    "path": {
      "300": ["INR/THB"]
    }
  }
];

// Convert data to nodes and edges
let nodeId = 1;
let edgeId = 1;
const initialNodes = [];
const initialEdges = [];
const startY = 0;
let positionY = startY;

data.forEach(item => {
  Object.entries(item.path).forEach(([pathKey, pathValues]) => {
    // Add the path key node
    initialNodes.push({ id: `node-${nodeId}`, position: { x: 0, y: positionY }, data: { label: pathKey } });
    let previousNodeId = `node-${nodeId}`;
    nodeId++;
    positionY += 100;

    // Add the path values nodes and edges
    pathValues.forEach((pathValue, idx) => {
      initialNodes.push({ id: `node-${nodeId}`, position: { x: 200 + (idx * 200), y: positionY }, data: { label: pathValue } });
      initialEdges.push({ id: `edge-${edgeId}`, source: previousNodeId, target: `node-${nodeId}` });
      previousNodeId = `node-${nodeId}`;
      edgeId++;
      nodeId++;
      positionY += (idx === 0) ? 0 : 100;
    });
    positionY += 100;  // Extra spacing between different path keys
  });
  positionY += 100;  // Extra spacing between different data objects
});
const defaultViewport = { zoom: 0.2 };
export default function RouteVisualizer() {
  return (
    <div style={{ width: '360px', height: '400px' }}>
      <ReactFlow defaultViewport={defaultViewport} nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}
