#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { MASTER_CONFIG_PATH, detectClients } from './lib/discovery.js';
import { performSync } from './lib/sync.js';
import { checkHealth } from './lib/health.js';
import { ConfigManager } from './lib/config-manager.js';
import { startWatcher } from './lib/watcher.js';
import React from 'react';
import { render } from 'ink';
import { App } from './ui/App.js';
import { performLogin } from './lib/auth.js';
import { supabase } from './lib/supabase.js';
import { TelemetryManager } from './lib/telemetry.js';

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
  .command('signup <email> <password>')
  .description('Create a new Universal MCP Bridge account')
  .action(async (email, password) => {
    console.log(chalk.cyan('\n🚀 Creating your Universal MCP account...'));
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) {
      console.log(chalk.red(`❌ Signup failed: ${error.message}`));
      return;
    }

    console.log(chalk.green('✅ Account created successfully! Please check your email for confirmation.'));
  });

program
  .command('login <email> <password>')
  .description('Sign in to your Universal MCP Bridge account (Pro/Enterprise)')
  .action(async (email, password) => {
    console.log(chalk.cyan('\n🔐 Connecting to Universal MCP Cloud...'));
    
    try {
      const success = await performLogin(email, password);

      if (success) {
        // Upgrade to Pro logic (for demo purposes, we automatically upgrade logged in users to Pro)
        const masterConfig = ConfigManager.loadConfig(MASTER_CONFIG_PATH);
        masterConfig.userTier = 'pro';
        ConfigManager.saveConfig(MASTER_CONFIG_PATH, masterConfig);

        console.log(chalk.green('✅ Successfully logged in!'));
        console.log(chalk.yellow('✨ Your account has been upgraded to PRO Edition.\n'));
        console.log(chalk.cyan('Run "mcp-bridge ui" to see your new status.\n'));
      }
    } catch (err: any) {
      console.log(chalk.red(`❌ Login failed: ${err.message}`));
    }
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



program

  .command('deep-link <url>')

  .description('Handle mcp:// protocol deep links (Internal use)')

  .action(async (url) => {

    try {

      const parsedUrl = new URL(url);

      if (parsedUrl.protocol !== 'mcp:') throw new Error('Invalid protocol');

      

      const name = parsedUrl.searchParams.get('name');

      const cmd = parsedUrl.searchParams.get('cmd');

      const argsStr = parsedUrl.searchParams.get('args');

      

      if (!name || !cmd) throw new Error('Missing name or cmd parameters');

      

      const args = argsStr ? JSON.parse(argsStr) : [];

      

      console.log(chalk.cyan(`\n🔗 Deep Link Detected: Adding ${name}...`));

      

      const masterConfig = ConfigManager.loadConfig(MASTER_CONFIG_PATH);

      ConfigManager.addServer(masterConfig, name, { command: cmd, args });

      ConfigManager.saveConfig(MASTER_CONFIG_PATH, masterConfig);

      

      await performSync();

      

      console.log(chalk.green(`✅ Successfully registered "${name}" via Magic Link!\n`));

    } catch (err: any) {

      console.log(chalk.red(`❌ Deep Link Error: ${err.message}`));

    }

  });



program

  .command('register-protocol')

  .description('Register the mcp:// protocol handler on this system (Windows)')

  .action(() => {

    if (process.platform !== 'win32') {

      console.log(chalk.yellow('⚠️  Protocol registration is currently only implemented for Windows.'));

      return;

    }



    const exePath = process.argv[0]; // Node executable or standalone .exe

    const scriptPath = join(process.cwd(), 'dist', 'index.js');

    const command = `"${exePath}" "${scriptPath}" deep-link "%1"`;



    console.log(chalk.cyan('\n🛠 Registering mcp:// protocol handler...'));

    console.log(chalk.gray(`Command: ${command}`));



    // We will use a temporary .reg file to make this safe and visible

    const regContent = `Windows Registry Editor Version 5.00



[HKEY_CLASSES_ROOT\\mcp]

@="URL:Model Context Protocol"

"URL Protocol"=""



[HKEY_CLASSES_ROOT\\mcp\\shell]



[HKEY_CLASSES_ROOT\\mcp\\shell\\open]



[HKEY_CLASSES_ROOT\\mcp\\shell\\open\\command]

@="${command.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"

`;



    const regFile = join(process.cwd(), 'register_protocol.reg');

    writeFileSync(regFile, regContent);



    console.log(chalk.green(`\n✅ Registry file created: ${regFile}`));

    console.log(chalk.yellow('👉 Please run this file to complete the "Magic Link" setup.'));

    console.log(chalk.gray('This allows your browser to talk directly to your MCP Bridge.\n'));

  });



program

  .command('stats')

  .description('Display token usage and tool telemetry (Oracle Analytics)')

  .action(async () => {

    console.log(chalk.magenta('\n🔮 Oracle Telemetry Report\n'));

    const stats = await TelemetryManager.getStats();

    

    console.log(chalk.white('Total Estimated Tokens: ') + chalk.green(stats.totalTokens.toLocaleString()));

    console.log(chalk.white('Tool Usage Breakdown:'));

    

    if (Object.keys(stats.toolUsage).length === 0) {

      console.log(chalk.gray('  (No usage recorded yet)'));

    } else {

      Object.entries(stats.toolUsage).forEach(([tool, count]) => {

        console.log(`  - ${chalk.cyan(tool)}: ${chalk.yellow(count)} calls`);

      });

    }

    console.log('');

  });



program.parse();
