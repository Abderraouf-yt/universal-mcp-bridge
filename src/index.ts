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
    render(React.createElement(App, { mode: 'ui' }));
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