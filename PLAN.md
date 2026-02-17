# Universal MCP Bridge: Development Plan

## 1. Executive Summary
**Universal MCP Bridge** (Project Codename: *MCP-Omni*) is the industry-standard configuration manager for the Model Context Protocol ecosystem. It centralizes fragmented MCP server definitions into a Single Source of Truth, enabling seamless tool parity across all 2026-era AI agents.

## 2. Project Scope

### Phase 1: Consolidation (Completed)
- **Deliverable**: PowerShell prototype (`sync-mcp.ps1`).
- **Status**: Stable.

### Phase 2: The CLI Core (Completed)
- **Deliverable**: Node.js/TypeScript CLI (`mcp-bridge`).
- **Features**:
    - `mcp-bridge init`: Auto-discovery of 5+ major AI clients.
    - `mcp-bridge sync`: Robust bidirectional merging engine.
    - `mcp-bridge status`: Health monitoring for local/external tools.
- **Status**: Stable & Production-Ready.

### Phase 2.5: Interactive UX & Design (Completed)
- **Deliverable**: Ink-based Interactive Dashboard.
- **Features**:
    - Animated progress tracking (`SyncProgress`).
    - High-fidelity ASCII art and terminal aesthetics.
    - User-friendly onboarding flow.

### Phase 2.6: Monetization Framework (Completed)
- **Deliverable**: Tiered Architecture.
- **Features**:
    - `userTier` logic (Community, Pro, Enterprise).
    - Pro-tier "Go Pro" upgrade hooks.
    - `login` command skeleton.

### Phase 3: The "MCP-First" Architecture (Q2 2026)
- **Objective**: Transform the Bridge into an MCP Server itself.
- **Description**: Allows other AI agents to programmatically query and modify the MCP registry via the protocol.
- **Features**:
    - `list_clients`: Tool to expose detected environments.
    - `add_server`: Tool to register new servers via LLM prompts.
    - `trigger_sync`: Tool to force refresh across all spokes.

### Phase 4: The Service (Q3 2026)
- **Deliverable**: Background Daemon.
- **Features**:
    - Real-time file watching (Chokidar integration).
    - OS Notification system for sync events.
    - Secure Vault for credential management.

### Phase 5: The Cloud Hub (Q4 2026 - SaaS)
- **Deliverable**: Paid Platform.
- **Features**:
    - Cross-device sync.
    - Team-shared registries.
    - Analytics dashboard for token/tool usage.

## 3. Architecture Design (2026 Best Practices)
1.  **Registry**: Zod-validated JSON schema (`.mcp_master.json`).
2.  **Adapters**: Pluggable modules for diverse client config formats.
3.  **Transport**: StdIO and SSE support for Phase 3 server mode.
4.  **UI Engine**: React/Ink for interactive terminal experience.

## 4. Technology Stack
- **Language**: TypeScript 5.x + Node.js 22+ (ESM).
- **UI Framework**: Ink (React CLI).
- **Validation**: Zod.
- **Protocol**: @modelcontextprotocol/sdk.
- **Styling**: Chalk, Gradient-String, Ink-Spinner.

## 5. Monetization Strategy
- **Community (Free)**: All local sync and discovery features.
- **Pro ($5/mo)**: Cloud Sync, Advanced Health Checks, Analytics.
- **Enterprise ($20/user/mo)**: Team Hub, RBAC, SSO, Audit Logs.

## 6. Immediate Next Steps
1.  Implement the `add` command (Port from task list).
2.  Install `@modelcontextprotocol/sdk` to begin Phase 3.
3.  Implement `src/server.ts` to expose the Bridge as an MCP server.