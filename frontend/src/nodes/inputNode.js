// inputNode.js

import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      description="Data input source"
      handles={[
        {
          type: "source",
          position: Position.Right,
          id: "value",
        },
      ]}
      fields={[
        {
          name: "inputName",
          type: "text",
          label: "Name",
          defaultValue: id.replace("customInput-", "input_"),
          placeholder: "Enter input name",
        },
        {
          name: "inputType",
          type: "select",
          label: "Type",
          defaultValue: "Text",
          options: [
            { value: "Text", label: "Text" },
            { value: "File", label: "File" },
          ],
        },
      ]}
    />
  );
};
