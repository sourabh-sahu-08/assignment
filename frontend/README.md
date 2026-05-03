# Pipeline Architect ⚡

A **visual, node-based pipeline builder** where you can drag, connect, and validate directed acyclic graphs (DAGs) — built as a technical assessment for VectorShift.

---

## ✨ Features

### 🖼️ Canvas
| Feature | Details |
|---|---|
| Drag & drop nodes | From sidebar onto canvas |
| Click to add | Click any sidebar card to place a node instantly |
| Keyboard Delete | Select nodes/edges → `Delete` key to remove |
| Editable pipeline name | Click the title in the top navbar |
| Empty state | Illustrated guide when canvas is empty |
| Snap-to-grid | 16px grid for clean alignment |
| Fit-view on load | Canvas auto-fits to content |
| Color-coded minimap | Each node type has a unique minimap color |

### 🗃️ Sidebar
| Feature | Details |
|---|---|
| Categorized nodes | Data I/O · AI/LLM · Logic · Utilities |
| Live search | Filter nodes by name or description |
| Live stats | Node count, edge count, total types |
| Color-coded cards | Each node type has an accent color |

### 🟦 Nodes (9 types)

| Node | Type Key | Description |
|---|---|---|
| **Input** | `customInput` | Pipeline entry — field name + 5 data types |
| **Output** | `customOutput` | Pipeline exit — output name + 5 formats |
| **LLM** | `llm` | Model selector (GPT-4o, Claude, Gemini…) + temperature slider |
| **Text** | `text` | Template with `{{variable}}` syntax + char counter |
| **Math** | `math` | 6 operations with live formula preview |
| **Filter** | `filter` | Field/operator/value with 9 operators + condition preview |
| **Delay** | `delay` | Duration with ms / s / min unit selector |
| **Logger** | `logger` | Log level selector + prefix + passthrough output |
| **API Request** | `apiRequest` | Method (5) + URL + auth type (4) |

### 📊 Submit Bar & Results Modal
- Live node & edge count display
- Pipeline validation warnings (missing Input/Output node)
- Inline error display if server is unreachable
- **Clear Pipeline** button
- Results modal shows: nodes, edges, DAG validity, graph density
- ESC key closes modal

---

## 🏗️ Architecture

```
assignment/
├── backend/
│   ├── main.py            # FastAPI — /health, /pipelines/parse, /pipelines/validate
│   └── requirements.txt
└── frontend/
    ├── public/
    │   └── index.html     # Inter + JetBrains Mono fonts, SEO meta tags
    └── src/
        ├── App.js          # Root layout
        ├── index.css       # Design system — CSS vars, animations, ReactFlow overrides
        ├── store.js        # Zustand global state
        ├── ui.js           # ReactFlow canvas with navbar, empty state, keyboard handler
        ├── toolbar.js      # Sidebar with categories, search, stats
        ├── draggableNode.js# Color-coded draggable/clickable node cards
        ├── submit.js       # Submit bar with validation + clear
        ├── components/
        │   └── Modal.js    # Analysis results modal
        └── nodes/
            ├── BaseNode.js         # Shared node shell — accent border, delete button, port labels
            ├── inputNode.js
            ├── outputNode.js
            ├── llmNode.js
            ├── textNode.js
            ├── MathNode.js
            ├── FilterNode.js
            ├── DelayNode.js
            ├── LoggerNode.js
            └── APIRequestNode.js
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **pip**

---

### Backend

```bash
cd backend

# (Optional) create a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API available at **http://127.0.0.1:8000**  
Interactive docs at **http://127.0.0.1:8000/docs**

---

### Frontend

```bash
cd frontend
npm install
npm start
```

App available at **http://localhost:3000**

---

## 🔌 API Reference

### `GET /health`
Returns server health status.
```json
{ "status": "healthy", "timestamp": "...", "version": "2.0.0" }
```

### `POST /pipelines/parse`
Basic DAG check.
```json
// Request
{ "nodes": [...], "edges": [...] }

// Response
{ "num_nodes": 3, "num_edges": 2, "is_dag": true }
```

### `POST /pipelines/validate`
Extended analysis — components, isolated nodes, source/sink detection, warnings.
```json
// Response
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true,
  "topological_order": ["customInput-1", "llm-1", "customOutput-1"],
  "num_components": 1,
  "isolated_nodes": [],
  "source_nodes": ["customInput-1"],
  "sink_nodes": ["customOutput-1"],
  "warnings": []
}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 |
| Flow canvas | React Flow 11 |
| State management | Zustand |
| Styling | Tailwind CSS v3 + Vanilla CSS |
| Backend | FastAPI (Python) |
| DAG algorithm | Kahn's BFS topological sort |
| Fonts | Inter + JetBrains Mono (Google Fonts) |

---

## 📐 Design System

- **Color palette**: Slate 950 base, Indigo/Purple accents
- **Typography**: Inter (UI) · JetBrains Mono (code/previews)
- **Node accent colors**: Each of the 9 node types has a unique hue
- **Animations**: Edge dash animation, handle glow, modal slide-up, pulse-glow status dot

---

*Built by Sourabh Sahu*
