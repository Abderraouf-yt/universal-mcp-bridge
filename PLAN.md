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
    - `mcp-bridge add`: Programmatic registration of new servers.

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
    - `login` command simulation.

### Phase 3: The "MCP-First" Architecture (Completed)
- **Objective**: Transform the Bridge into an MCP Server itself.
- **Features**:
    - `list_mcp_clients`: Tool to expose detected environments.
    - `add_mcp_server`: Tool to register new servers via LLM prompts.
    - `sync_bridge`: Tool to force refresh across all spokes.

### Phase 4: The Service (Completed)
- **Deliverable**: Background Daemon & Secure Vault.
- **Features**:
    - Real-time file watching (Chokidar integration).
    - Automatic bidirectional sync on file change.
    - OS Notification system for sync events.
    - Secure Vault for credential management (System Keychain integration).

### Phase 5: The Cloud Hub (Concept/Scaffold Ready)
- **Deliverable**: Pro Dashboard & Cloud Client.
- **Features**:
    - [x] Visualized Pro Dashboard (`visualizer/dashboard.html`).
    - [x] Cloud Client simulation logic (`src/lib/cloud.ts`).
    - [ ] Real-time cross-device sync (Production Ready Roadmap).

## 3. Architecture Design (2026 Best Practices)
1.  **Registry**: Zod-validated JSON schema (`.mcp_master.json`).
2.  **Adapters**: Pluggable modules for diverse client config formats.
3.  **Transport**: StdIO support for seamless agent-to-agent communication.
4.  **Vault**: Native OS Keychain security for sensitive PATs/Keys.

## 4. Technology Stack
- **Language**: TypeScript 5.x + Node.js 22+ (ESM).
- **UI Framework**: Ink (React CLI).
- **Validation**: Zod.
- **Protocol**: @modelcontextprotocol/sdk.
- **Security**: keytar (System Keychain).
- **Watching**: chokidar.

## 5. Monetization Strategy
- **Community (Free)**: All local sync and discovery features.
- **Pro ($5/mo)**: Cloud Sync, Advanced Health Checks, Analytics.
- **Enterprise ($20/user/mo)**: Team Hub, RBAC, SSO, Audit Logs.
