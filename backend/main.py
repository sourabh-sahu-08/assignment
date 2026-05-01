from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque

app = FastAPI()

# ✅ Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

# ✅ Correct API (POST + JSON) with DAG check
@app.post('/pipelines/parse')
def parse_pipeline(data: dict = Body(...)):
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    # Build adjacency list and calculate in-degrees
    adj = defaultdict(list)
    in_degree = {node['id']: 0 for node in nodes}
    
    # Ensure all nodes are in in_degree even if they have no edges
    for node in nodes:
        if node['id'] not in in_degree:
            in_degree[node['id']] = 0

    for edge in edges:
        u = edge['source']
        v = edge['target']
        adj[u].append(v)
        if v in in_degree:
            in_degree[v] += 1
        else:
            in_degree[v] = 1
        
    # Kahn's Algorithm for DAG detection
    queue = deque([u for u in in_degree if in_degree[u] == 0])
    visited_count = 0
    
    while queue:
        u = queue.popleft()
        visited_count += 1
        for v in adj[u]:
            if v in in_degree:
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    queue.append(v)
                
    is_dag = visited_count == len(nodes)

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag
    }