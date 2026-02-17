#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { MASTER_CONFIG_PATH, detectClients } from './lib/discovery.js';
import { performSync } from './lib/sync.js';
import { checkHealth } from './lib/health.js';
import { ConfigManager } from './lib/config-manager.js';
import { startWatcher } from './lib/watcher.js';
import React from 'react';
import { render } from 'ink';
import { App } from './ui/App.js';

const program = new Command();

program
  .name('mcp-bridge')
  .description('Universal MCP Bridge: The Single Source of Truth for MCP Configs')
  .version('1.0.0');

program
  .command('add <name> <cmd>')
  .description('Register a new MCP server in the master registry')
  .option('-a, --args <args...>', 'Command line arguments for the server')
  .option('-e, --env <env...>', 'Environment variables (KEY=VALUE)')
  .action((name, cmd, options) => {
    const masterConfig = ConfigManager.loadConfig(MASTER_CONFIG_PATH);
    
    const env: Record<string, string> = {};
    if (options.env) {
      options.env.forEach((pair: string) => {
        const [key, value] = pair.split('=');
        if (key && value) env[key] = value;
      });
    }

    const newServer: any = {
      command: cmd,
      args: options.args || [],
    };

    if (Object.keys(env).length > 0) {
      newServer.env = env;
    }

    ConfigManager.addServer(masterConfig, name, newServer);
    ConfigManager.saveConfig(MASTER_CONFIG_PATH, masterConfig);
    
    console.log(chalk.green(`\n✅ Registered "${name}" in master registry.`));
    console.log(chalk.cyan('Run "mcp-bridge sync" to propagate this to all clients.\n'));
  });

program
  .command('serve')
  .description('Start the bridge as an MCP server (Phase 3)')
  .action(async () => {
    console.log(chalk.cyan('\n📡 Universal MCP Bridge Server launching...'));
    await import('./server.js');
  });

program
  .command('watch')
  .description('Start the background watcher service (Phase 4)')
  .action(() => {
    startWatcher();
  });

program
  .command('ui')
  .description('Launch the interactive Universal MCP Bridge dashboard')
  .action(() => {
    render(React.createElement(App, { mode: 'ui' }));
  });

program
  .command('login')
  .description('Sign in to your Universal MCP Bridge account (Pro/Enterprise)')
  .action(async () => {
    console.log(chalk.cyan('\n🔐 Connecting to Universal MCP Cloud...'));
    await new Promise(r => setTimeout(r, 1000));
    
    // Simulate upgrade logic
    const masterConfig = ConfigManager.loadConfig(MASTER_CONFIG_PATH);
    masterConfig.userTier = 'pro';
    ConfigManager.saveConfig(MASTER_CONFIG_PATH, masterConfig);

    console.log(chalk.green('✅ Successfully logged in!'));
    console.log(chalk.yellow('✨ Your account has been upgraded to PRO Edition.\n'));
    console.log(chalk.cyan('Run "mcp-bridge ui" to see your new status.\n'));
  });

program
  .command('init')
  .description('Initialize the bridge and auto-detect MCP clients')
  .action(() => {
    render(React.createElement(App, { mode: 'init' }));
  });

program
  .command('sync')
  .description('Synchronize MCP servers across all detected clients')
  .action(() => {
    render(React.createElement(App, { mode: 'sync' }));
  });

program
  .command('status')
  .description('Check the health of all registered MCP servers')
  .action(() => {
    checkHealth();
  });

program.parse();