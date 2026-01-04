// delayNode.js

import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const DelayNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Delay"
      description="Add time delay to pipeline"
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
          name: "duration",
          type: "text",
          label: "Duration (ms)",
          defaultValue: "1000",
          placeholder: "Enter delay in milliseconds",
        },
        {
          name: "unit",
          type: "select",
          label: "Unit",
          defaultValue: "ms",
          options: [
            { value: "ms", label: "Milliseconds" },
            { value: "s", label: "Seconds" },
            { value: "m", label: "Minutes" },
          ],
        },
      ]}
      style={{ backgroundColor: "#fff3cd" }}
    />
  );
};
