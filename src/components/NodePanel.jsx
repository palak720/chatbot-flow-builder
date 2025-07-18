
// components/NodePanel.jsx
export default function NodePanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="node-panel">
      <div
        className="node-button"
        onDragStart={(e) => onDragStart(e, 'textNode')}
        draggable
      >
        Message
      </div>
    </aside>
  );
}
