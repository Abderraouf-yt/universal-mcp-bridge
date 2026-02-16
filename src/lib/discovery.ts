import { homedir } from 'node:os';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import type { DetectedClient } from '../types/index.js';

const HOME = homedir();
const APPDATA = process.env['APPDATA'] || join(HOME, 'AppData', 'Roaming');

export const KNOWN_CLIENTS: DetectedClient[] = [
  {
    name: 'Gemini CLI',
    path: join(HOME, '.gemini', 'settings.json'),
    type: 'settings-json',
  },
  {
    name: 'Antigravity IDE',
    path: join(HOME, '.gemini', 'antigravity', 'mcp_config.json'),
    type: 'json',
  },
  {
    name: 'Roo Code (Cline)',
    path: join(APPDATA, 'Antigravity', 'User', 'globalStorage', 'rooveterinaryinc.roo-cline', 'settings', 'mcp_settings.json'),
    type: 'json',
  },
  {
    name: 'Claude Desktop',
    path: join(APPDATA, 'Claude', 'claude_desktop_config.json'),
    type: 'json',
  },
  {
    name: 'Cursor',
    path: join(HOME, '.cursor', 'mcp.json'),
    type: 'json',
  },
];

export function detectClients(): DetectedClient[] {
  return KNOWN_CLIENTS.filter((client) => existsSync(client.path));
}

export const MASTER_CONFIG_PATH = join(HOME, '.mcp_master.json');
