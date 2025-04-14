import "./LeftPanel.css";

function LeftPanel({ children }) {
  return (
    <div className="left-panel" data-test="left-panel">
      {children}
    </div>
  );
}

export default LeftPanel;
