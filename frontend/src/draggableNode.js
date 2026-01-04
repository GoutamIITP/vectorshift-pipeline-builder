// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const getNodeIcon = () => {
    const iconMap = {
      customInput: "📥",
      customOutput: "📤",
      llm: "🤖",
      text: "📝",
      math: "🔢",
      filter: "🔍",
      delay: "⏱️",
      transform: "🔄",
      api: "🌐",
 
    };
    return iconMap[type] || "⚙️";
  };

  const getNodeColor = () => {
    const colorMap = {
      customInput: "#28a745",
      customOutput: "#dc3545",
      llm: "#6f42c1",
      text: "#17a2b8",
      math: "#fd7e14",
      filter: "#20c997",
      delay: "#ffc107",
      transform: "#007bff",
      api: "#6c757d",
 
    };
    return colorMap[type] || "#495057";
  };

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "90px",
        height: "70px",
        display: "flex",
        alignItems: "center",
        borderRadius: "12px",
        backgroundColor: getNodeColor(),
        justifyContent: "center",
        flexDirection: "column",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        transition: "all 0.2s ease",
        border: "2px solid transparent",
        fontSize: "13px",
        fontWeight: "500",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
      }}
      draggable
    >
      <div style={{ fontSize: "18px", marginBottom: "4px" }}>
        {getNodeIcon()}
      </div>
      <span style={{ color: "#fff", textAlign: "center" }}>{label}</span>
    </div>
  );
};
