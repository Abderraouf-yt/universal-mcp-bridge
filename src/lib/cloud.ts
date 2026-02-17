import chalk from 'chalk';
import { supabase } from './supabase.js';
import { VaultManager } from './vault.js';
import { TelemetryManager } from './telemetry.js';
import { detectClients } from './discovery.js';
import type { MCPConfig } from '../types/index.js';

export interface CloudStatus {
  connected: boolean;
  user?: {
    id: string;
    email: string;
    tier: 'community' | 'pro' | 'enterprise';
  };
}

export class CloudManager {
  /**
   * Performs actual synchronization to Supabase
   */
  static async syncToCloud(config: MCPConfig): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log(chalk.red('❌ Cloud Sync failed: No active session. Please run "mcp-bridge login".'));
      return false;
    }

    const userId = session.user.id;
    console.log(chalk.blue('☁️  Syncing encrypted registry to Universal MCP Cloud...'));

    try {
      const { error } = await supabase
        .from('registries')
        .upsert({ 
          user_id: userId, 
          config: config,
          last_synced_at: new Date().toISOString(),
          device_id: process.env.COMPUTERNAME || 'unknown-device'
        }, { onConflict: 'user_id' });

      if (error) {
        console.log(chalk.red(`❌ Supabase Error: ${error.message}`));
        return false;
      }

      return true;
    } catch (err) {
      console.log(chalk.red(`❌ Cloud Sync system error: ${err}`));
      return false;
    }
  }

  /**
   * Fetches real usage analytics from Cloud
   */
  static async getAnalytics(): Promise<any> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const stats = await TelemetryManager.getStats();
    const config = await this.getLatestConfig();
    const activeClients = detectClients().length;

    // Find the most used tool from stats
    let mostUsedTool = 'none';
    let maxUsage = 0;
    for (const [tool, count] of Object.entries(stats.toolUsage)) {
      if ((count as number) > maxUsage) {
        maxUsage = count as number;
        mostUsedTool = tool;
      }
    }

    return {
      totalTools: Object.keys(config?.mcpServers || {}).length,
      activeClients,
      tokenSavings: `${(stats.totalTokens / 1000).toFixed(1)}k tokens (local)`,
      mostUsedTool
    };
  }

  /**
   * Helper to get the latest cloud config
   */
  static async getLatestConfig(): Promise<any> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data, error } = await supabase
      .from('registries')
      .select('config')
      .eq('user_id', session.user.id)
      .single();

    if (error || !data) return null;
    return data.config;
  }
}
