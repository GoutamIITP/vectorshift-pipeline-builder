// mathNode.js

import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const MathNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      description="Mathematical operations"
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: "input1",
          style: { top: "25%" },
        },
        {
          type: "target",
          position: Position.Left,
          id: "input2",
          style: { top: "75%" },
        },
        {
          type: "source",
          position: Position.Right,
          id: "result",
        },
      ]}
      fields={[
        {
          name: "operation",
          type: "select",
          label: "Operation",
          defaultValue: "add",
          options: [
            { value: "add", label: "Add (+)" },
            { value: "subtract", label: "Subtract (-)" },
            { value: "multiply", label: "Multiply (×)" },
            { value: "divide", label: "Divide (÷)" },
          ],
        },
      ]}
      height={100}
    />
  );
};
