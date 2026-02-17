import { readFileSync, existsSync } from 'node:fs';
import { MASTER_CONFIG_PATH } from './discovery.js';
import { MCPConfigSchema } from '../types/index.js';
import { supabase } from './supabase.js';

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

/**
 * Checks if the user is authenticated with Supabase
 */
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/**
 * Performs actual Supabase login
 */
export async function performLogin(email: string, password: string): Promise<boolean> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return !!data.session;
}

/**
 * Performs Supabase logout
 */
export async function performLogout(): Promise<void> {
  await supabase.auth.signOut();
}
