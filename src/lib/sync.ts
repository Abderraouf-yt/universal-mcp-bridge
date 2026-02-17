import chalk from 'chalk';
import { MASTER_CONFIG_PATH, detectClients } from './discovery.js';
import { ConfigManager } from './config-manager.js';
import { VaultManager } from './vault.js';
import { CloudManager } from './cloud.js';
import { getUserTier } from './auth.js';

export async function performSync() {
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
  for (const client of clients) {
    try {
      const clientConfig = ConfigManager.loadConfig(client.path);

      // Secure any secrets found in client configs before merging into master
      for (const [name, server] of Object.entries(clientConfig.mcpServers)) {
        if (server.env) {
          server.env = await VaultManager.secureConfig(server.env);
        }
      }

      const harvested = ConfigManager.harvestToMaster(masterConfig, clientConfig);
      if (harvested > 0) {
        console.log(chalk.yellow(`✨ Harvested ${harvested} new tools from ${client.name}`));
        totalHarvested += harvested;
      }
    } catch (err) {
      console.log(chalk.gray(`   ⚠️ Skipping ${client.name} harvest (malformed JSON?)`));
    }
  }

  // 3. Save Master if updated
  if (totalHarvested > 0) {
    ConfigManager.saveConfig(MASTER_CONFIG_PATH, masterConfig);
    console.log(chalk.green(`✅ Master Registry updated with ${totalHarvested} new tools.`));
  }

  // 4. Cloud Sync Phase (Pro/Enterprise)
  const tier = getUserTier();
  if (tier === 'pro' || tier === 'enterprise') {
    console.log(chalk.blue('☁️  Checking for cloud updates...'));
    const cloudConfig = await CloudManager.getLatestConfig();
    
    if (cloudConfig) {
      const cloudHarvested = ConfigManager.harvestToMaster(masterConfig, cloudConfig);
      if (cloudHarvested > 0) {
        console.log(chalk.green(`✨ Pulled ${cloudHarvested} new tools from Cloud.`));
        ConfigManager.saveConfig(MASTER_CONFIG_PATH, masterConfig);
      }
    }

    await CloudManager.syncToCloud(masterConfig);
  }

  // 5. Distribution Phase
  for (const client of clients) {    try {
      // Hydrate secrets for client files so the tools actually work
      const hydratedMaster = JSON.parse(JSON.stringify(masterConfig));
      for (const [name, server] of Object.entries(hydratedMaster.mcpServers as any)) {
        const s = server as any;
        if (s.env) {
          s.env = await VaultManager.hydrateConfig(s.env);
        }
      }

      ConfigManager.distributeFromMaster(client.path, hydratedMaster);
      console.log(chalk.gray(`🚀 Synced -> ${client.name}`));
    } catch (err) {
      console.log(chalk.red(`❌ Failed to sync ${client.name}`));
    }
  }

  console.log(chalk.green('\n✨ Synchronization complete!\n'));
}
