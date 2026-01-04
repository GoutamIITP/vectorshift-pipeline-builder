// textNode.js

import { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const [nodeHeight, setNodeHeight] = useState(120);
  const textareaRef = useRef(null);

  // Extract variables from text using regex
  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;
    const matches = [...text.matchAll(regex)];
    const variables = matches.map((m) => m[1]);
    // Remove duplicates
    return [...new Set(variables)];
  };

  const variables = extractVariables(text);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";

      // Update node height based on content
      const newHeight = Math.max(120, scrollHeight + 80);
      setNodeHeight(newHeight);
    }
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const baseStyle = {
    width: 250,
    minHeight: nodeHeight,
    border: "none",
    borderRadius: "12px",
    padding: "12px",
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    fontFamily: "inherit",
    fontSize: "14px",
    transition: "all 0.2s ease",
  };

  const headerStyle = {
    fontWeight: "600",
    fontSize: "16px",
    color: "#2c3e50",
    marginBottom: "4px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const descriptionStyle = {
    fontSize: "12px",
    color: "#6c757d",
    marginBottom: "12px",
    lineHeight: "1.3",
  };

  const labelStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#495057",
  };

  const textareaStyle = {
    padding: "8px",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    outline: "none",
    resize: "none",
    width: "100%",
    minHeight: "60px",
    overflow: "hidden",
  };

  return (
    <div style={baseStyle} className="node-container">
      {/* Dynamic input handles for each variable */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${((index + 1) * 100) / (variables.length + 1)}%`,
            backgroundColor: "#007bff",
            border: "2px solid white",
            width: "12px",
            height: "12px",
          }}
          title={variable}
        />
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          backgroundColor: "#28a745",
          border: "2px solid white",
          width: "12px",
          height: "12px",
        }}
      />

      {/* Node header */}
      <div style={headerStyle}>
        <span>📝</span>
        <span>Text</span>
      </div>

      {/* Node description */}
      <div style={descriptionStyle}>Text with dynamic variables</div>

      {/* Variables display */}
      {variables.length > 0 && (
        <div
          style={{
            fontSize: "11px",
            color: "#6c757d",
            marginBottom: "8px",
            padding: "6px",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px",
            border: "1px solid #e9ecef",
          }}
        >
          <strong>Variables:</strong> {variables.join(", ")}
        </div>
      )}

      {/* Text input */}
      <label style={labelStyle}>
        Text:
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text with variables like {{input}}"
          style={textareaStyle}
          onFocus={(e) => {
            e.target.style.borderColor = "#007bff";
            e.target.style.boxShadow = "0 0 0 0.2rem rgba(0, 123, 255, 0.25)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ced4da";
            e.target.style.boxShadow = "none";
          }}
        />
      </label>
    </div>
  );
};
