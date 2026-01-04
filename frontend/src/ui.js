// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { MathNode } from "./nodes/mathNode";
import { FilterNode } from "./nodes/filterNode";
import { DelayNode } from "./nodes/delayNode";
import { TransformNode } from "./nodes/transformNode";
import { ApiNode } from "./nodes/apiNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  filter: FilterNode,
  delay: DelayNode,
  transform: TransformNode,
  api: ApiNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        // Make sure reactFlowInstance is initialized
        if (!reactFlowInstance) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div
        ref={reactFlowWrapper}
        className="pipeline-canvas"
        style={{ width: "100vw", height: "70vh", background: "#f8f9fa" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          defaultEdgeOptions={{
            style: { strokeWidth: 2, stroke: "#6c757d" },
            type: "smoothstep",
            animated: true,
            markerEnd: {
              type: "arrowclosed",
              width: 20,
              height: 20,
              color: "#6c757d",
            },
          }}
        >
          <Background color="#dee2e6" gap={gridSize} size={1} variant="dots" />
          <Controls
            style={{
              button: {
                backgroundColor: "white",
                border: "1px solid #dee2e6",
                color: "#495057",
              },
            }}
          />
          <MiniMap
            style={{
              backgroundColor: "white",
              border: "1px solid #dee2e6",
            }}
            nodeColor={(node) => {
              const colorMap = {
                customInput: "#28a745",
                customOutput: "#dc3545",
                llm: "#6f42c1",
                text: "#17a2b8",
                math: "#fd7e14",
                filter: "#20c997",
                delay: "#ffc107",
                transform: "#007bff",
                api: "#6c757d",
              };
              return colorMap[node.type] || "#495057";
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
        </ReactFlow>
      </div>
    </>
  );
};
