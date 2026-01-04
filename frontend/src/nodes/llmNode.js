// llmNode.js

import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      description="Language model processing"
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: "system",
          style: { top: `${100 / 3}%` },
        },
        {
          type: "target",
          position: Position.Left,
          id: "prompt",
          style: { top: `${200 / 3}%` },
        },
        {
          type: "source",
          position: Position.Right,
          id: "response",
        },
      ]}
      fields={[]}
    />
  );
};
