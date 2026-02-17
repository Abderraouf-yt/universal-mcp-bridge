import fs from 'fs';
import path from 'path';
import { MASTER_CONFIG_PATH } from './discovery.js';

export interface UsageMetric {
  toolName: string;
  timestamp: string;
  inputChars: number;
  outputChars: number;
  estimatedTokens: number;
}

export class TelemetryManager {
  private static TELEMETRY_PATH = path.join(path.dirname(MASTER_CONFIG_PATH), 'telemetry.json');

  /**
   * Estimates token usage based on character count (approx 4 chars per token)
   */
  private static estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  /**
   * Records a tool execution metric
   */
  static async recordToolUsage(toolName: string, input: any, output: any): Promise<void> {
    const inputStr = JSON.stringify(input);
    const outputStr = JSON.stringify(output);
    
    const metric: UsageMetric = {
      toolName,
      timestamp: new Date().toISOString(),
      inputChars: inputStr.length,
      outputChars: outputStr.length,
      estimatedTokens: this.estimateTokens(inputStr) + this.estimateTokens(outputStr),
    };

    await this.saveMetric(metric);
  }

  /**
   * Persists the metric to local storage
   */
  private static async saveMetric(metric: UsageMetric): Promise<void> {
    let metrics: UsageMetric[] = [];
    
    try {
      if (fs.existsSync(this.TELEMETRY_PATH)) {
        const data = await fs.promises.readFile(this.TELEMETRY_PATH, 'utf-8');
        metrics = JSON.parse(data);
      }
    } catch (err) {
      // If file is corrupt, start fresh
      metrics = [];
    }

    metrics.push(metric);
    
    // Keep only last 1000 entries locally to prevent bloat
    if (metrics.length > 1000) {
      metrics = metrics.slice(-1000);
    }

    await fs.promises.writeFile(this.TELEMETRY_PATH, JSON.stringify(metrics, null, 2));
  }

  /**
   * Aggregates metrics for reporting
   */
  static async getStats() {
    if (!fs.existsSync(this.TELEMETRY_PATH)) {
      return { totalTokens: 0, toolUsage: {} };
    }

    const data = await fs.promises.readFile(this.TELEMETRY_PATH, 'utf-8');
    const metrics: UsageMetric[] = JSON.parse(data);

    const stats = metrics.reduce((acc: any, m) => {
      acc.totalTokens += m.estimatedTokens;
      acc.toolUsage[m.toolName] = (acc.toolUsage[m.toolName] || 0) + 1;
      return acc;
    }, { totalTokens: 0, toolUsage: {} });

    return stats;
  }
}
