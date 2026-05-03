"""
Pipeline Architect — FastAPI Backend
--------------------------------------
Endpoints:
  GET  /              → health ping
  GET  /health        → detailed health status
  POST /pipelines/parse    → node/edge count + DAG detection (Kahn's algorithm)
  POST /pipelines/validate → extended graph analysis
"""

from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque
from datetime import datetime, timezone

app = FastAPI(
    title="Pipeline Architect API",
    description="Backend for the Pipeline Architect visual DAG builder.",
    version="2.0.0",
)

# ── CORS ────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
)

# ── Helpers ─────────────────────────────────────────────────

def build_graph(nodes: list, edges: list):
    """Return adjacency list, reverse adjacency list, and in-degree map."""
    adj     = defaultdict(list)
    rev_adj = defaultdict(list)
    in_deg  = {n["id"]: 0 for n in nodes}

    for edge in edges:
        u, v = edge["source"], edge["target"]
        adj[u].append(v)
        rev_adj[v].append(u)
        in_deg[v] = in_deg.get(v, 0) + 1

    return adj, rev_adj, in_deg


def kahn_dag(nodes: list, adj: dict, in_deg: dict):
    """Kahn's algorithm — returns (is_dag, topological_order)."""
    deg   = dict(in_deg)
    queue = deque([u for u in deg if deg[u] == 0])
    order = []

    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            if v in deg:
                deg[v] -= 1
                if deg[v] == 0:
                    queue.append(v)

    is_dag = len(order) == len(nodes)
    return is_dag, order


def find_connected_components(node_ids: list, adj: dict, rev_adj: dict):
    """Find weakly-connected components via BFS on undirected view."""
    visited    = set()
    components = []

    for start in node_ids:
        if start in visited:
            continue
        component = []
        queue     = deque([start])
        while queue:
            n = queue.popleft()
            if n in visited:
                continue
            visited.add(n)
            component.append(n)
            for nb in adj[n] + rev_adj[n]:
                if nb not in visited:
                    queue.append(nb)
        components.append(component)

    return components

# ── Routes ───────────────────────────────────────────────────

@app.get("/")
def root():
    return {"status": "ok", "service": "Pipeline Architect API", "version": "2.0.0"}


@app.get("/health")
def health():
    return {
        "status":    "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version":   "2.0.0",
        "uptime":    "running",
    }


@app.post("/pipelines/parse")
def parse_pipeline(data: dict = Body(...)):
    """
    Basic pipeline parsing.
    Returns node count, edge count, and whether the graph is a DAG.
    """
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    adj, _, in_deg = build_graph(nodes, edges)
    is_dag, _      = kahn_dag(nodes, adj, in_deg)

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag":    is_dag,
    }


@app.post("/pipelines/validate")
def validate_pipeline(data: dict = Body(...)):
    """
    Extended pipeline validation.
    Returns:
      - num_nodes, num_edges
      - is_dag
      - topological_order (if DAG)
      - num_components, isolated_nodes
      - source_nodes (in-degree 0), sink_nodes (out-degree 0)
      - warnings list
    """
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    node_ids        = [n["id"] for n in nodes]
    adj, rev_adj, in_deg = build_graph(nodes, edges)
    is_dag, topo_order   = kahn_dag(nodes, adj, in_deg)

    # Component analysis
    components    = find_connected_components(node_ids, adj, rev_adj)
    isolated      = [c[0] for c in components if len(c) == 1 and not adj[c[0]] and not rev_adj[c[0]]]

    # Source / sink nodes
    out_deg      = defaultdict(int)
    for n in node_ids:
        out_deg[n] = len(adj[n])

    source_nodes = [n for n in node_ids if in_deg.get(n, 0) == 0]
    sink_nodes   = [n for n in node_ids if out_deg[n] == 0]

    # Build warnings
    warnings = []
    if not is_dag:
        warnings.append("Cycle detected — pipeline is not a valid DAG.")
    if isolated:
        warnings.append(f"{len(isolated)} isolated node(s) detected (not connected to anything).")
    if not any(n.get("type") == "customInput" for n in nodes):
        warnings.append("No Input node found.")
    if not any(n.get("type") == "customOutput" for n in nodes):
        warnings.append("No Output node found.")
    if len(components) > 1:
        warnings.append(f"Pipeline has {len(components)} disconnected component(s).")

    return {
        "num_nodes":        len(nodes),
        "num_edges":        len(edges),
        "is_dag":           is_dag,
        "topological_order": topo_order if is_dag else [],
        "num_components":   len(components),
        "isolated_nodes":   isolated,
        "source_nodes":     source_nodes,
        "sink_nodes":       sink_nodes,
        "warnings":         warnings,
    }