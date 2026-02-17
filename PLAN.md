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
    - `login` / `signup` commands with Supabase Auth.

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

### Phase 5: The Cloud Hub (Completed)
- **Deliverable**: Pro Dashboard & Cloud Client.
- **Features**:
    - [x] Visualized Pro Dashboard (`visualizer/dashboard.html`).
    - [x] Cloud Client implementation logic (`src/lib/cloud.ts`).
    - [x] Supabase Backend (Auth, Registries, Usage Stats).
    - [x] Real-time cloud push/pull sync integration.
    - [x] React-based Pro Dashboard (`web-dashboard/`).
    - [x] Telemetry Integration (Oracle Agent logic integrated into Server).
    - [x] Real-time cross-device sync (Vision Agent UI integration complete).

### Phase 6: Advanced Distribution (In Progress)
- **Objective**: Eliminate all setup friction for non-Node users.
- **Features**:
    - [x] **Magic Link Deep Handler**: Implemented `mcp://` protocol handler logic and Windows Registry generator.
    - [ ] **Standalone Binaries**: Investigating Bun/Vite combinations for ESM-compatible .exe files (In Research).
    - [ ] **Web-Based Config Generator**: A Next.js visual tool to build registries that "Beam" directly to the local CLI.
    - [ ] **Global NPX Alias**: `npx mcp-bridge start` as the universal setup command.

## 3. Architecture Design (2026 Best Practices)
1.  **Registry**: Zod-validated JSON schema (`.mcp_master.json`).
2.  **Adapters**: Pluggable modules for diverse client config formats.
3.  **Transport**: StdIO support for seamless agent-to-agent communication.
4.  **Vault**: Native OS Keychain security for sensitive PATs/Keys.
5.  **Distribution**: Single-binary deployment (Planned).

## 4. Technology Stack
- **Language**: TypeScript 5.x + Node.js 22+ (ESM).
- **UI Framework**: Ink (React CLI).
- **Validation**: Zod.
- **Protocol**: @modelcontextprotocol/sdk.
- **Security**: keytar (System Keychain).
- **Watching**: chokidar.
- **Backend**: Supabase (PostgreSQL + Auth).

## 5. Monetization Strategy
- **Community (Free)**: All local sync and discovery features.
- **Pro ($5/mo)**: Cloud Sync, Advanced Health Checks, Analytics.
- **Enterprise ($20/user/mo)**: Team Hub, RBAC, SSO, Audit Logs.

## 6. User Verification & QA (Awaiting Testing)
> [!IMPORTANT]
> The implementation is completed, but the backend infrastructure needs to be initialized.

### Phase 0: Backend Infrastructure Setup
- [ ] **Initialize Supabase**: 
    1. Go to your Supabase Project.
    2. Open the **SQL Editor**.
    3. Paste the contents of `supabase_schema.sql` and run it.
    4. This will create the `registries` and `profiles` tables required for sync.

### Test Suite 1: Cloud & Parity
- [ ] **GitHub Remote**: Verify repo exists at [Abderraouf-yt/universal-mcp-bridge](https://github.com/Abderraouf-yt/universal-mcp-bridge).
- [ ] **Supabase Auth**: Run `mcp-bridge signup` and `login` to verify backend connectivity.
- [ ] **Bidirectional Sync**: Verify tools added in one client appear in others after `mcp-bridge sync`.

### Test Suite 2: Advanced UX
- [ ] **Ink Dashboard**: Run `mcp-bridge ui` and verify analytics rendering (Pro tier).
- [ ] **Magic Link**: Run `mcp-bridge register-protocol`, execute the `.reg` file, and test a mock `mcp://` link.
- [ ] **Watcher**: Run `mcp-bridge watch` and verify desktop notifications on file change.

