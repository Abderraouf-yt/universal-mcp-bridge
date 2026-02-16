# Universal MCP Bridge
> The definitive "USB-Hub" for the Model Context Protocol ecosystem.

![Status: Proprietary](https://img.shields.io/badge/Status-Proprietary-red)
![Version: 1.0.0](https://img.shields.io/badge/Version-1.0.0-blue)
![Platform: Windows/macOS/Linux](https://img.shields.io/badge/Platform-Cross--Platform-green)

## 📖 Overview
**Universal MCP Bridge** (formerly *MCP-Omni*) is a centralized configuration manager and bidirectional synchronization engine for AI developer tools. It solves the fragmentation problem caused by disparate MCP implementations across IDEs (VS Code, Cursor, Windsurf) and CLIs (Gemini, Claude).

By establishing a **Single Source of Truth**, the Universal MCP Bridge ensures that every AI agent in your workflow has access to the same powerful capabilities, instantly.

## 🚀 Key Features
- **Centralized Registry**: Maintains a master configuration file (`.mcp_master.json`) that acts as the canonical source for all server definitions.
- **Bidirectional Sync**: Automatically detects new tools added in any client (e.g., a new extension in VS Code) and propagates them to all other clients.
- **Health Monitoring**: Proactively verifies that local server paths exist and are executable before syncing.
- **Secret Preservation**: Intelligently merges configurations without overwriting or losing sensitive API keys.

## 🛠 Architecture
The system operates on a "Hub and Spoke" model:
1.  **The Hub**: A Master JSON registry.
2.  **The Spokes**: Adapters for each supported client (Gemini CLI, Antigravity IDE, Roo Code, Claude Desktop).
3.  **The Engine**: A PowerShell automation layer (migrating to Node.js/Rust) that handles discovery, merging, and distribution.

## 📦 Installation
Currently distributed as a standalone automation script.

1.  Clone this repository.
2.  Run the synchronization engine:
    ```powershell
    ./scripts/sync-mcp.ps1
    ```

## 🗺 Roadmap
- [x] **v1.0 (MVP)**: PowerShell-based bidirectional sync for Windows.
- [ ] **v2.0 (Service)**: Background daemon for real-time synchronization.
- [ ] **v3.0 (Cloud)**: Encrypted cloud storage for cross-device tool sharing.
- [ ] **v4.0 (Enterprise)**: Team-based registries and RBAC for AI tools.

## 📄 License
**Proprietary Software.**
Copyright © 2026. All Rights Reserved.
Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.
