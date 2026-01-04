import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "16px 24px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "24px" }}>⚡</span>
        <h1
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          VectorShift Pipeline Builder
        </h1>
        <div
          style={{
            marginLeft: "auto",
            fontSize: "14px",
            opacity: 0.8,
          }}
        >
          Drag nodes from the library to build your pipeline
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
