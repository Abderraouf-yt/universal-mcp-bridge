import { readFileSync, existsSync } from 'node:fs';
import chalk from 'chalk';
import { MASTER_CONFIG_PATH } from './discovery.js';
import { MCPConfigSchema } from '../types/index.js';

export function checkHealth() {
  console.log(chalk.yellow('\n📊 Checking MCP Server Health...'));

  if (!existsSync(MASTER_CONFIG_PATH)) {
    console.log(chalk.red('❌ Master Registry not found. Run "mcp-bridge init" first.'));
    return;
  }

  try {
    const content = readFileSync(MASTER_CONFIG_PATH, 'utf-8');
    const parsed = JSON.parse(content);
    const validated = MCPConfigSchema.parse(parsed);
    const servers = validated.mcpServers;

    console.log('');
    Object.entries(servers).forEach(([name, config]) => {
      if (config.command === 'node' && config.args && config.args[0]) {
        const path = config.args[0];
        if (existsSync(path)) {
          console.log(`  🟢 ${chalk.bold(name)} ${chalk.gray(`(Ready: ${path})`)}`);
        } else {
          console.log(`  🔴 ${chalk.bold(name)} ${chalk.red(`(Missing: ${path})`)}`);
        }
      } else if (config.command === 'npx' || config.command === 'docker') {
        console.log(`  ⚪ ${chalk.bold(name)} ${chalk.gray(`(${config.command} tool)`)}`);
      } else {
        console.log(`  ❓ ${chalk.bold(name)} ${chalk.gray(`(Manual check required: ${config.command})`)}`);
      }
    });
    console.log('');
  } catch (err) {
    console.log(chalk.red(`❌ Error checking health: ${err}`));
  }
}