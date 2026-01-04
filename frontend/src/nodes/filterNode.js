// filterNode.js

import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      description="Data filtering and conditions"
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: "input",
        },
        {
          type: "source",
          position: Position.Right,
          id: "passed",
          style: { top: "30%" },
        },
        {
          type: "source",
          position: Position.Right,
          id: "failed",
          style: { top: "70%" },
        },
      ]}
      fields={[
        {
          name: "condition",
          type: "text",
          label: "Condition",
          defaultValue: "value > 0",
          placeholder: "e.g., value > 10, contains 'text'",
        },
        {
          name: "filterType",
          type: "select",
          label: "Type",
          defaultValue: "numeric",
          options: [
            { value: "numeric", label: "Numeric" },
            { value: "text", label: "Text" },
            { value: "boolean", label: "Boolean" },
          ],
        },
      ]}
      height={120}
    />
  );
};
