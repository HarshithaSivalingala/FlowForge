# FlowForge

> End-to-end manufacturing work order orchestration — from raw material intake to sequential process completion.

---

## What is FlowForge?

FlowForge is a manufacturing operations platform designed to manage the full lifecycle of work orders across sequential production processes. It provides structured control over machine allocation, inventory consumption, and process-level completion — ensuring nothing moves forward until upstream steps are validated.

The core philosophy is simple: **a unit cannot enter a process until the previous process has completed it.**

---

## Architecture

```
┌──────────────────────────────────────────────┐
│                   Client                     │
│  React + Tailwind CSS + Lucide Icons         │
│  ├── WorkOrderPage       (create / update)   │
│  ├── ProcessCard         (assignment & inv)  │
│  └── AppContext          (global state)      │
└────────────────────┬─────────────────────────┘
                     │ REST API
┌────────────────────▼─────────────────────────┐
│                   Server                     │
│  Express.js                                  │
│  ├── Work Order CRUD                         │
│  ├── Process & Machine Resolution            │
│  ├── Inventory Management                    │
│  └── Cron Jobs (scheduled tasks)             │
└────────────────────┬─────────────────────────┘
                     │ Drizzle ORM
┌────────────────────▼─────────────────────────┐
│               PostgreSQL                     │
│  ├── products                                │
│  ├── processes                               │
│  ├── machines                                │
│  ├── orders                                  │
│  ├── order_processes                         │
│  ├── order_process_machines                  │
│  └── product_process_inventory               │
└──────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI Framework | React 18 |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Runtime | Node.js 18+ |
| Server | Express.js |
| ORM | Drizzle ORM |
| Database | PostgreSQL |
| Scheduling | Node-Cron |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (local or cloud)
- npm

### Installation

```bash
git clone https://github.com/your-username/flowforge.git
cd flowforge
```

**Backend**

```bash
cd backend
npm install
cp .env.example .env   # configure DATABASE_URL and PORT
npm run dev            # starts on PORT 5001 by default
```

**Frontend**

```bash
cd frontend
npm install
npm run dev            # starts on PORT 3000 by default
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5001` | Server listen port |
| `DATABASE_URL` | — | PostgreSQL connection string |
| `NODE_ENV` | `development` | Environment mode |

---

## API Reference

### Work Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/work-orders` | Fetch all work orders |
| `POST` | `/api/work-orders` | Create a new work order |
| `GET` | `/api/work-orders/:id` | Fetch a single work order with full process & machine details |
| `PUT` | `/api/work-orders/:id` | Update order — handles machine reassignment and inventory completion |

### Products & Processes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/getAllProducts` | List all products |
| `POST` | `/api/createProduct` | Create a product |
| `GET` | `/api/getprocess/:productId` | Fetch processes linked to a product |
| `GET` | `/api/getMachines/:processId` | Fetch machines available for a process |

### Inventory

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/inventory/product/:productId/process/:processId` | Current inventory level for a product at a given process stage |

---

## Seeding Test Data (Temporary Testing Purpose)

FlowForge ships with two utility endpoints for bootstrapping machine and inventory records against your existing product and process data.

```bash
# Adds 2–3 machines per process if none exist
GET http://localhost:5001/api/seed/machines

# Adds random inventory (30–100) per product-process pair if none exist
GET http://localhost:5001/api/seed/inventory
```

Run these once after initial setup to have a working dataset ready to go.

---

## Key Design Decisions

- **Sequential locking** — Downstream processes remain locked until upstream completion is non-zero. This prevents out-of-order production entries.
- **Inventory as a gate** — Completion is not assumed; it must be backed by actual inventory availability, verified at the time of expansion via a live API call.
- **Additive machine assignments** — New machine assignments are appended to existing ones rather than replacing them, preserving historical allocation data.
- **Payload-driven updates** — The PUT endpoint trusts the frontend payload for `availableQuantity`, allowing the cascading unlock logic to flow naturally without requiring a separate re-calculation step on the server.


