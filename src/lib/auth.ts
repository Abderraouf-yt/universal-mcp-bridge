import { readFileSync, existsSync } from 'node:fs';
import { MASTER_CONFIG_PATH } from './discovery.js';
import { MCPConfigSchema } from '../types/index.js';

export function getUserTier(): string {
  if (!existsSync(MASTER_CONFIG_PATH)) {
    return 'community';
  }
  try {
    const content = readFileSync(MASTER_CONFIG_PATH, 'utf-8');
    const parsed = JSON.parse(content);
    const validated = MCPConfigSchema.parse(parsed);
    return validated.userTier || 'community';
  } catch {
    return 'community';
  }
}

export function performLogin(): string {
  // TODO: Implement actual OAuth flow
  return 'community';
}
