// baseNode.js
// Reusable base component for all node types

import { useState } from "react";
import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  data,
  title,
  description,
  handles = [],
  fields = [],
  width = 200,
  height = 80,
  style = {},
}) => {
  // Dynamic state management for all fields
  const [fieldValues, setFieldValues] = useState(() => {
    const initialState = {};
    fields.forEach((field) => {
      initialState[field.name] = data?.[field.name] || field.defaultValue || "";
    });
    return initialState;
  });

  const handleFieldChange = (fieldName, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const baseStyle = {
    width,
    minHeight: height,
    border: "none",
    borderRadius: "12px",
    padding: "12px",
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    fontFamily: "inherit",
    fontSize: "14px",
    transition: "all 0.2s ease",
    ...style,
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
    marginBottom: fields.length > 0 ? "12px" : "8px",
    lineHeight: "1.3",
  };

  const fieldContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const labelStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#495057",
  };

  const inputStyle = {
    padding: "6px 8px",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    fontSize: "12px",
    fontFamily: "inherit",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    outline: "none",
  };

  const selectStyle = {
    ...inputStyle,
    backgroundColor: "white",
    cursor: "pointer",
  };

  const textareaStyle = {
    ...inputStyle,
    resize: "vertical",
    minHeight: "60px",
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
  };

  const renderField = (field) => {
    const value = fieldValues[field.name];

    switch (field.type) {
      case "text":
        return (
          <label key={field.name} style={labelStyle}>
            {field.label}:
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
            />
          </label>
        );

      case "select":
        return (
          <label key={field.name} style={labelStyle}>
            {field.label}:
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={selectStyle}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        );

      case "textarea":
        return (
          <label key={field.name} style={labelStyle}>
            {field.label}:
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={field.rows || 2}
              style={textareaStyle}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
            />
          </label>
        );

      default:
        return null;
    }
  };

  const renderHandle = (handle, index) => {
    const handleStyle = {
      backgroundColor: getHandleColor(handle.type),
      border: "2px solid white",
      width: "12px",
      height: "12px",
      ...handle.style,
    };

    return (
      <Handle
        key={`${handle.type}-${handle.position}-${index}`}
        type={handle.type}
        position={handle.position}
        id={`${id}-${handle.id}`}
        style={handleStyle}
      />
    );
  };

  const getHandleColor = (type) => {
    return type === "source" ? "#28a745" : "#007bff";
  };

  const getNodeIcon = () => {
    const iconMap = {
      Input: "📥",
      Output: "📤",
      LLM: "🤖",
      Text: "📝",
      Math: "🔢",
      Filter: "🔍",
      Delay: "⏱️",
      Transform: "🔄",
      "API Call": "🌐",
    };
    return iconMap[title] || "⚙️";
  };

  return (
    <div style={baseStyle} className="node-container">
      {/* Render all handles */}
      {handles.map((handle, index) => renderHandle(handle, index))}

      {/* Node header */}
      <div style={headerStyle}>
        <span>{getNodeIcon()}</span>
        <span>{title}</span>
      </div>

      {/* Node description */}
      {description && <div style={descriptionStyle}>{description}</div>}

      {/* Dynamic fields */}
      {fields.length > 0 && (
        <div style={fieldContainerStyle}>
          {fields.map((field) => renderField(field))}
        </div>
      )}
    </div>
  );
};
