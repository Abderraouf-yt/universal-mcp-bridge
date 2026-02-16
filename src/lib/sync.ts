import chalk from 'chalk';
import { MASTER_CONFIG_PATH, detectClients } from './discovery.js';
import { ConfigManager } from './config-manager.js';

export function performSync() {
  console.log(chalk.cyan('\n🔄 Starting Universal MCP Bridge Sync...'));

  const clients = detectClients();
  if (clients.length === 0) {
    console.log(chalk.yellow('⚠️  No MCP clients detected. Run "mcp-bridge init" to diagnose.'));
    return;
  }

  // 1. Load Master Config
  let masterConfig = ConfigManager.loadConfig(MASTER_CONFIG_PATH);
  let totalHarvested = 0;

  // 2. Harvesting Phase
  clients.forEach((client) => {
    try {
      const clientConfig = ConfigManager.loadConfig(client.path);
      const harvested = ConfigManager.harvestToMaster(masterConfig, clientConfig);
      if (harvested > 0) {
        console.log(chalk.yellow(`✨ Harvested ${harvested} new tools from ${client.name}`));
        totalHarvested += harvested;
      }
    } catch (err) {
      console.log(chalk.gray(`   ⚠️ Skipping ${client.name} harvest (malformed JSON?)`));
    }
  });

  // 3. Save Master if updated
  if (totalHarvested > 0) {
    ConfigManager.saveConfig(MASTER_CONFIG_PATH, masterConfig);
    console.log(chalk.green(`✅ Master Registry updated with ${totalHarvested} new tools.`));
  }

  // 4. Distribution Phase
  clients.forEach((client) => {
    try {
      ConfigManager.distributeFromMaster(client.path, masterConfig);
      console.log(chalk.gray(`🚀 Synced -> ${client.name}`));
    } catch (err) {
      console.log(chalk.red(`❌ Failed to sync ${client.name}`));
    }
  });

  console.log(chalk.green('\n✨ Synchronization complete!\n'));
}
