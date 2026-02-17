# GEMINI.md - Project Instructional Context

## 🚀 Project Overview
**Universal MCP Bridge** is a sophisticated configuration manager and bidirectional synchronization engine for the **Model Context Protocol (MCP)**. It establishes a "Single Source of Truth" for AI tools across multiple clients including Gemini CLI, Antigravity IDE, Roo Code, Claude Desktop, and Cursor.

The project is built using a modern 2026-era stack focusing on agentic automation, secure credential management via native keychains, and a React-powered terminal UI.

### Key Technologies
- **Runtime**: Node.js 22+ (ESM)
- **Language**: TypeScript 5.x
- **UI Framework**: Ink (React for CLI)
- **Protocol**: @modelcontextprotocol/sdk
- **Security**: node-keytar (System Keychain integration)
- **File Watching**: chokidar
- **Validation**: Zod

## 🛠 Building and Running

### Prerequisites
- Node.js installed.
- System Keychain access (for secure vault features).

### Key Commands
- **Build**: `npm run build` - Compiles TypeScript to `dist/`.
- **Sync**: `npm start -- sync` - Performs bidirectional configuration merge.
- **UI Dashboard**: `npm start -- ui` - Launches the interactive Ink dashboard.
- **Watcher Service**: `npm start -- watch` - Starts the background daemon for real-time sync.
- **MCP Server Mode**: `npm run serve` or `npm start -- serve` - Runs the bridge as an MCP server.
- **Init**: `npm start -- init` - Auto-discovers clients and initializes the master registry.
- **Add Tool**: `npm start -- add <name> <command> [args...]` - Manually registers a new server.
- **Login/Upgrade**: `npm start -- login` - Simulates account upgrade to Pro tier.

## 🏗 Architecture & Conventions

### Directory Structure
- `src/index.ts`: CLI entry point and command definitions.
- `src/server.ts`: MCP Protocol implementation (Phase 3).
- `src/lib/`: Core logic modules (Sync, Discovery, Vault, Watcher).
- `src/ui/`: Ink/React components for the terminal interface.
- `src/types/`: Zod schemas and TypeScript interfaces.
- `visualizer/`: Pro-tier dashboard concept (HTML/Tailwind).
- `scripts/`: Legacy PowerShell prototype and helper scripts.

### Development Guidelines
- **ESM First**: The project uses `"type": "module"`. Always use `.js` extensions in imports.
- **Zod Validation**: All configuration changes must pass through the `MCPConfigSchema`.
- **Security**: Never store plain-text secrets in JSON files. Use `VaultManager` to offload to the system keychain.
- **Agent Roles**: Development follows the "Agent Mesh" approach (Nexus, Vision, Oracle, Archivist).

## 📊 Roadmap Status
- **Phase 1-4**: Fully completed (Consolidation, CLI Core, MCP Server, Background Service).
- **Phase 5**: In progress (Cloud Sync, Advanced Analytics, Pro Dashboard).
