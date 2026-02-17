---
name: universal-mcp-bridge-mesh
description: Orchestrates the 4 specialized agents (Nexus, Vision, Oracle, Archivist) for Phase 5 of the Universal MCP Bridge project. Use when developing Cloud Hub features, UI dashboards, analytics, or documentation.
---

# Universal MCP Bridge Mesh Orchestration

This skill guides the collaborative development of Phase 5 features by orchestrating four specialized agent roles.

## Core Agents

- **Nexus (Infrastructure)**: Handles Cloud Sync and Supabase backend.
- **Vision (UX/Frontend)**: Handles the Pro Dashboard and React components.
- **Oracle (Analytics)**: Handles token tracking and usage telemetry.
- **Archivist (Context)**: Handles documentation and long-term memory.

See [agents.md](references/agents.md) for full role definitions.

## Workflow

### 1. Agent Selection
Identify which agent role is best suited for the current task based on the objectives in [agents.md](references/agents.md).

### 2. Implementation
Execute the task using the agent's primary tools. For example, if acting as **Nexus**, prioritize `supabase-mcp-server`.

### 3. Cross-Agent Handoff
When a task requires input from another agent (e.g., Nexus completes the API, Vision needs to consume it), clearly document the state changes in [PLAN.md](../../PLAN.md).

### 4. Continuous Planning
Update the master [PLAN.md](../../PLAN.md) after every major implementation step to maintain project alignment.

## Guidelines
- **Security First**: Never commit plain-text secrets. Use the `VaultManager` implemented in Phase 4.
- **Standardized Schema**: Ensure all configuration changes comply with the Zod schema in `src/types/index.ts`.
- **2026 Ready**: Use ES6+, async/await, and modern Node.js patterns.