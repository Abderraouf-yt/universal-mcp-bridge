import { z } from 'zod';

export const MCPServerConfigSchema = z.object({
  command: z.string(),
  args: z.array(z.string()).optional(),
  env: z.record(z.string(), z.string()).optional(),
  disabled: z.boolean().optional(),
  alwaysAllow: z.array(z.string()).optional(),
});

export const MCPConfigSchema = z.object({
  mcpServers: z.record(z.string(), MCPServerConfigSchema),
  userTier: z.enum(['community', 'pro', 'enterprise']).optional().default('community'),
});

export type MCPServerConfig = z.infer<typeof MCPServerConfigSchema>;
export type MCPConfig = z.infer<typeof MCPConfigSchema>;

export interface DetectedClient {
  name: string;
  path: string;
  type: 'json' | 'settings-json';
}
