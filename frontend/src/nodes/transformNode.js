// transformNode.js

import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const TransformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      description="Data transformation and mapping"
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: "input",
        },
        {
          type: "source",
          position: Position.Right,
          id: "output",
        },
      ]}
      fields={[
        {
          name: "transformation",
          type: "textarea",
          label: "Transform Script",
          defaultValue: "// Transform data here\nreturn data.toUpperCase();",
          placeholder: "Enter JavaScript transformation code",
          rows: 3,
        },
        {
          name: "outputFormat",
          type: "select",
          label: "Output Format",
          defaultValue: "json",
          options: [
            { value: "json", label: "JSON" },
            { value: "text", label: "Text" },
            { value: "csv", label: "CSV" },
            { value: "xml", label: "XML" },
          ],
        },
      ]}
      height={140}
      style={{ backgroundColor: "#e7f3ff" }}
    />
  );
};
