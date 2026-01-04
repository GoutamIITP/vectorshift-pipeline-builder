// submit.js

import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Create a user-friendly alert message
      const message = `
Pipeline Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Number of Nodes: ${data.num_nodes}
🔗 Number of Edges: ${data.num_edges}
${data.is_dag ? "✅" : "❌"} Is Valid DAG: ${data.is_dag ? "Yes" : "No"}

${
  data.is_dag
    ? "✨ Your pipeline is valid and ready to execute!"
    : "⚠️ Warning: Your pipeline contains cycles and cannot be executed as a DAG."
}
      `.trim();

      alert(message);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert(
        `❌ Error: Failed to submit pipeline.\n\n${error.message}\n\nMake sure the backend server is running on http://localhost:8000`
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "white",
        borderTop: "1px solid #dee2e6",
        boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <button
        type="button"
        onClick={handleSubmit}
        className="btn btn-primary"
        style={{
          padding: "12px 32px",
          fontSize: "16px",
          fontWeight: "600",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 8px rgba(0, 123, 255, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#0056b3";
          e.target.style.transform = "translateY(-1px)";
          e.target.style.boxShadow = "0 4px 12px rgba(0, 123, 255, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#007bff";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 2px 8px rgba(0, 123, 255, 0.3)";
        }}
      >
        <span>🚀</span>
        <span>Run Pipeline</span>
      </button>
    </div>
  );
};
