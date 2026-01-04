// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      className="pipeline-toolbar"
      style={{
        padding: "20px 24px",
        backgroundColor: "white",
        borderBottom: "1px solid #dee2e6",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        overflowX: "auto",
      }}
    >
      {/* Toolbar Header */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#2c3e50",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>🧩</span>
          <span>Node Library</span>
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#6c757d",
            fontStyle: "italic",
          }}
        >
          Drag and drop nodes to the canvas
        </div>
      </div>

      {/* All Nodes in Single Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          gap: "12px",
          maxWidth: "100%",
        }}
      >
        {/* Core Nodes */}
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />

        {/* Processing Nodes */}
        <DraggableNode type="math" label="Math" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="delay" label="Delay" />
        <DraggableNode type="transform" label="Transform" />
        <DraggableNode type="api" label="API Call" />
     
      </div>
    </div>
  );
};
