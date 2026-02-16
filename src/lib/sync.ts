import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import chalk from 'chalk';
import { MASTER_CONFIG_PATH, detectClients } from './discovery.js';
import { MCPConfigSchema, type MCPServerConfig } from '../types/index.js';

export function performSync() {
  console.log(chalk.cyan('\n🔄 Starting Bidirectional Sync...'));

  const clients = detectClients();
  if (clients.length === 0) {
    console.log(chalk.yellow('⚠️  No clients detected. Nothing to sync.'));
    return;
  }

  // 1. Load Master Config
  let masterConfig: Record<string, MCPServerConfig> = {};
  if (existsSync(MASTER_CONFIG_PATH)) {
    try {
      const content = readFileSync(MASTER_CONFIG_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      const validated = MCPConfigSchema.parse(parsed);
      masterConfig = validated.mcpServers;
    } catch (err) {
      console.log(chalk.red(`❌ Error reading Master Registry: ${err}`));
      return;
    }
  }

  let newServersFound = 0;

  // 2. Harvest from Clients
  clients.forEach((client) => {
    try {
      const content = readFileSync(client.path, 'utf-8');
      const parsed = JSON.parse(content);
      
      const clientServers = parsed.mcpServers || {};

      Object.entries(clientServers).forEach(([name, config]) => {
        if (!masterConfig[name]) {
          console.log(chalk.yellow(`✨ Harvested new server: ${name} from ${client.name}`));
          masterConfig[name] = config as MCPServerConfig;
          newServersFound++;
        }
      });
    } catch (err) {
      console.log(chalk.gray(`   ⚠️ Could not harvest from ${client.name}: ${err}`));
    }
  });

  // 3. Save Master Config if updated
  if (newServersFound > 0) {
    try {
      writeFileSync(MASTER_CONFIG_PATH, JSON.stringify({ mcpServers: masterConfig }, null, 2));
      console.log(chalk.green(`\n✅ Updated Master Registry with ${newServersFound} new servers.`));
    } catch (err) {
      console.log(chalk.red(`❌ Failed to update Master Registry: ${err}`));
      return;
    }
  } else {
    console.log(chalk.blue('\nℹ️  Master Registry is up to date.'));
  }

  // 4. Distribute to Clients
  clients.forEach((client) => {
    try {
      const content = readFileSync(client.path, 'utf-8');
      const parsed = JSON.parse(content);
      
      parsed.mcpServers = masterConfig;
      
      writeFileSync(client.path, JSON.stringify(parsed, null, 2));
      console.log(chalk.gray(`🚀 Pushed to ${client.name}`));
    } catch (err) {
      console.log(chalk.red(`❌ Failed to push to ${client.name}: ${err}`));
    }
  });

  console.log(chalk.green('\n✨ Synchronization complete!\n'));
}