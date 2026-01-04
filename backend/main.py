from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using Kahn's Algorithm.
    
    Args:
        nodes: List of node dictionaries with 'id' field
        edges: List of edge dictionaries with 'source' and 'target' fields
    
    Returns:
        bool: True if the graph is a DAG, False otherwise
    """
    # Handle empty graph
    if not nodes:
        return True
    
    # Build adjacency list and calculate in-degrees
    graph = defaultdict(list)
    indegree = {node['id']: 0 for node in nodes}
    
    # Build the graph
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        
        if source and target:
            graph[source].append(target)
            if target in indegree:
                indegree[target] += 1
    
    # Find all nodes with in-degree 0
    queue = deque([node_id for node_id, degree in indegree.items() if degree == 0])
    visited_count = 0
    
    # Process nodes in topological order
    while queue:
        node = queue.popleft()
        visited_count += 1
        
        # Reduce in-degree for neighbors
        for neighbor in graph[node]:
            if neighbor in indegree:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)
    
    # If we visited all nodes, it's a DAG
    is_valid_dag = visited_count == len(nodes)
    
    # Log the result
    logger.info(f"DAG Check: visited {visited_count}/{len(nodes)} nodes, is_dag={is_valid_dag}")
    
    return is_valid_dag

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    """
    Parse a pipeline and return analysis results.
    
    Args:
        pipeline: Pipeline object containing nodes and edges
    
    Returns:
        dict: Analysis results including node count, edge count, and DAG status
    """
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    # Log the received data
    logger.info(f"Received pipeline: {len(nodes)} nodes, {len(edges)} edges")
    logger.info(f"Node IDs: {[node.get('id') for node in nodes]}")
    logger.info(f"Edges: {[(edge.get('source'), edge.get('target')) for edge in edges]}")
    
    # Count nodes and edges
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if it's a DAG
    dag_status = is_dag(nodes, edges)
    
    response = {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_status
    }
    
    logger.info(f"Response: {response}")
    
    return response
