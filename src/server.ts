import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { detectClients, MASTER_CONFIG_PATH } from "./lib/discovery.js";
import { performSync } from "./lib/sync.js";
import { ConfigManager } from "./lib/config-manager.js";
import { TelemetryManager } from "./lib/telemetry.js";

const server = new Server(
  {
    name: "universal-mcp-bridge",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Tool definitions
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "sync_bridge",
        description: "Synchronize all MCP configurations across all clients",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "list_mcp_clients",
        description: "List all detected MCP clients on the system",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "add_mcp_server",
        description: "Add a new MCP server to the master registry",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Name of the server" },
            command: { type: "string", description: "Command to run" },
            args: { type: "array", items: { type: "string" }, description: "Arguments" },
          },
          required: ["name", "command"],
        },
      },
    ],
  };
});

/**
 * Tool logic
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const executeTool = async () => {
    switch (request.params.name) {
      case "sync_bridge": {
        await performSync();
        return {
          content: [{ type: "text", text: "Sync complete." }],
        };
      }
      case "list_mcp_clients": {
        const clients = detectClients();
        return {
          content: [{ type: "text", text: JSON.stringify(clients, null, 2) }],
        };
      }
      case "add_mcp_server": {
        const { name, command, args } = request.params.arguments as any;
        const masterConfig = ConfigManager.loadConfig(MASTER_CONFIG_PATH);
        ConfigManager.addServer(masterConfig, name, { command, args: args || [] });
        ConfigManager.saveConfig(MASTER_CONFIG_PATH, masterConfig);
        return {
          content: [{ type: "text", text: `Server ${name} added to master registry.` }],
        };
      }
      default:
        throw new Error(`Unknown tool: ${request.params.name}`);
    }
  };

  const response = await executeTool();
  
  // Asynchronously record telemetry to avoid blocking response
  TelemetryManager.recordToolUsage(
    request.params.name,
    request.params.arguments || {},
    response
  ).catch(err => console.error("Telemetry error:", err));

  return response;
});

/**
 * Start the server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Universal MCP Bridge server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
