
// components/TextNode.jsx
import { Handle } from 'reactflow';

export default function TextNode({ data, isConnectable }) {
  return (
    <div className="custom-node">
      <strong>Send Message</strong>
      <div>{data.label}</div>
      {/* Handles */}
      <Handle type="target" position="left" isConnectable={isConnectable} />
      <Handle type="source" position="right" isConnectable={isConnectable} />
    </div>
  );
}
