// apiNode.js

import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const ApiNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="API Call"
      description="HTTP API request node"
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: "trigger",
        },
        {
          type: "source",
          position: Position.Right,
          id: "response",
          style: { top: "30%" },
        },
        {
          type: "source",
          position: Position.Right,
          id: "error",
          style: { top: "70%" },
        },
      ]}
      fields={[
        {
          name: "url",
          type: "text",
          label: "URL",
          defaultValue: "https://api.example.com/data",
          placeholder: "Enter API endpoint URL",
        },
        {
          name: "method",
          type: "select",
          label: "Method",
          defaultValue: "GET",
          options: [
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
            { value: "PUT", label: "PUT" },
            { value: "DELETE", label: "DELETE" },
          ],
        },
        {
          name: "headers",
          type: "textarea",
          label: "Headers (JSON)",
          defaultValue: '{"Content-Type": "application/json"}',
          placeholder: "Enter headers as JSON object",
          rows: 2,
        },
      ]}
      height={160}
      style={{ backgroundColor: "#f0f8f0" }}
    />
  );
};
