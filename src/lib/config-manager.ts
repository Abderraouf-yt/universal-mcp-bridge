import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { MCPConfigSchema, type MCPServerConfig, type MCPConfig } from '../types/index.js';

export class ConfigManager {
  /**
   * Safe JSON loading with Zod validation
   */
  static loadConfig(path: string): MCPConfig {
    if (!existsSync(path)) {
      return { mcpServers: {}, userTier: 'community' };
    }
    const content = readFileSync(path, 'utf-8');
    const parsed = JSON.parse(content);
    return MCPConfigSchema.parse(parsed);
  }

  /**
   * Atomic-style write
   */
  static saveConfig(path: string, config: MCPConfig): void {
    const content = JSON.stringify(config, null, 2);
    writeFileSync(path, content, 'utf-8');
  }

  /**
   * Merges a client config into the master registry.
   * Returns the number of new servers added.
   */
  static harvestToMaster(master: MCPConfig, client: MCPConfig): number {
    let addedCount = 0;
    Object.entries(client.mcpServers).forEach(([name, config]) => {
      if (!master.mcpServers[name]) {
        master.mcpServers[name] = config;
        addedCount++;
      }
    });
    return addedCount;
  }

  /**
   * Updates a client config with the latest from master.
   * Preserves other keys (like in Gemini's settings.json).
   */
  static distributeFromMaster(clientPath: string, master: MCPConfig): void {
    const existingContent = readFileSync(clientPath, 'utf-8');
    const parsed = JSON.parse(existingContent);
    
    // Inject the master servers
    parsed.mcpServers = master.mcpServers;
    
    writeFileSync(clientPath, JSON.stringify(parsed, null, 2), 'utf-8');
  }
}
