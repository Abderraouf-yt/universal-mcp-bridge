import chokidar from 'chokidar';
import chalk from 'chalk';
import { detectClients, MASTER_CONFIG_PATH } from './discovery.js';
import { performSync } from './sync.js';

export function startWatcher() {
  const clients = detectClients();
  const watchPaths = [
    MASTER_CONFIG_PATH,
    ...clients.map(c => c.path)
  ];

  console.log(chalk.cyan('\n👁️  Universal MCP Bridge Watcher started...'));
  console.log(chalk.gray('Watching for changes in:'));
  watchPaths.forEach(p => console.log(chalk.gray(`  - ${p}`)));

  const watcher = chokidar.watch(watchPaths, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 100
    }
  });

  watcher.on('change', (path: string) => {
    console.log(chalk.yellow(`\n📝 Change detected in: ${path}`));
    performSync();
  });

  watcher.on('error', (error) => console.log(chalk.red(`Watcher error: ${error}`)));

  return watcher;
}