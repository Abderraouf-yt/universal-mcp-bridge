#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { MASTER_CONFIG_PATH, detectClients } from './lib/discovery.js';
import { performSync } from './lib/sync.js';
import { checkHealth } from './lib/health.js';
import React from 'react';
import { render } from 'ink';
import { App } from './ui/App.js';

const program = new Command();

program
  .name('mcp-bridge')
  .description('Universal MCP Bridge: The Single Source of Truth for MCP Configs')
  .version('1.0.0');

program
  .command('ui')
  .description('Launch the interactive Universal MCP Bridge dashboard')
  .action(() => {
    render(React.createElement(App));
  });

program
  .command('init')
  .description('Initialize the bridge and auto-detect MCP clients')
  .action(() => {
    console.log(chalk.cyan('\n🚀 Initializing Universal MCP Bridge...'));
    
    const clients = detectClients();
    
    if (clients.length === 0) {
      console.log(chalk.yellow('⚠️  No MCP clients detected in standard locations.'));
    } else {
      console.log(chalk.green(`\n✅ Found ${clients.length} clients:`));
      clients.forEach(c => console.log(chalk.gray(`   - ${c.name} (${c.path})`)));
    }

    if (!existsSync(MASTER_CONFIG_PATH)) {
      console.log(chalk.cyan(`\n📦 Creating Master Registry at: ${MASTER_CONFIG_PATH}`));
      const initialConfig = { mcpServers: {} };
      writeFileSync(MASTER_CONFIG_PATH, JSON.stringify(initialConfig, null, 2));
    } else {
      console.log(chalk.blue(`\nℹ️  Master Registry already exists at: ${MASTER_CONFIG_PATH}`));
    }

    console.log(chalk.green('\n✨ Initialization complete! Run "mcp-bridge sync" to unify your tools.\n'));
  });

program
  .command('sync')
  .description('Synchronize MCP servers across all detected clients')
  .action(() => {
    performSync();
  });

program
  .command('status')
  .description('Check the health of all registered MCP servers')
  .action(() => {
    checkHealth();
  });

program.parse();