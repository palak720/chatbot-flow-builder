
// components/SettingsPanel.jsx
export default function SettingsPanel({ selectedNode, onChange }) {
  return (
    <aside className="settings-panel">
      <h3>Message</h3>
      <input
        type="text"
        value={selectedNode?.data?.label || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </aside>
  );
}
