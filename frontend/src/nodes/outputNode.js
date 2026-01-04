// outputNode.js

import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      description="Data output destination"
      handles={[
        {
          type: "target",
          position: Position.Left,
          id: "value",
        },
      ]}
      fields={[
        {
          name: "outputName",
          type: "text",
          label: "Name",
          defaultValue: id.replace("customOutput-", "output_"),
          placeholder: "Enter output name",
        },
        {
          name: "outputType",
          type: "select",
          label: "Type",
          defaultValue: "Text",
          options: [
            { value: "Text", label: "Text" },
            { value: "Image", label: "Image" },
          ],
        },
      ]}
    />
  );
};
