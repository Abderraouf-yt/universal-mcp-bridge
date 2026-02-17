import keytar from 'keytar';
import chalk from 'chalk';

const SERVICE_NAME = 'universal-mcp-bridge';

export class VaultManager {
  /**
   * Checks if a string likely contains a secret based on key naming patterns
   */
  static isSecretKey(key: string): boolean {
    const secretPatterns = ['TOKEN', 'KEY', 'SECRET', 'PASSWORD', 'AUTH', 'PAT'];
    return secretPatterns.some(pattern => key.toUpperCase().includes(pattern));
  }

  /**
   * Stores a secret in the system keychain
   */
  static async setSecret(account: string, value: string): Promise<void> {
    try {
      await keytar.setPassword(SERVICE_NAME, account, value);
    } catch (err) {
      console.log(chalk.red(`Vault Error: Could not save secret for ${account}. ${err}`));
    }
  }

  /**
   * Retrieves a secret from the system keychain
   */
  static async getSecret(account: string): Promise<string | null> {
    try {
      return await keytar.getPassword(SERVICE_NAME, account);
    } catch {
      return null;
    }
  }

  /**
   * Scans a config object and secures any plain-text secrets
   */
  static async secureConfig(env: Record<string, string>): Promise<Record<string, string>> {
    const securedEnv = { ...env };
    
    for (const [key, value] of Object.entries(env)) {
      if (this.isSecretKey(key) && !value.startsWith('{{VAULT:')) {
        console.log(chalk.yellow(`🔒 Securing secret key: ${key}`));
        await this.setSecret(key, value);
        securedEnv[key] = `{{VAULT:${key}}}`;
      }
    }
    
    return securedEnv;
  }

  /**
   * Hydrates a secured config with actual secrets from the vault
   */
  static async hydrateConfig(env: Record<string, string>): Promise<Record<string, string>> {
    const hydratedEnv = { ...env };
    
    for (const [key, value] of Object.entries(env)) {
      if (value.startsWith('{{VAULT:')) {
        const account = value.replace('{{VAULT:', '').replace('}}', '');
        const secret = await this.getSecret(account);
        if (secret) {
          hydratedEnv[key] = secret;
        } else {
          console.log(chalk.red(`⚠️  Missing secret in vault for: ${key}`));
        }
      }
    }
    
    return hydratedEnv;
  }
}
