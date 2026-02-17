import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import { detectClients } from '../lib/discovery.js';
import { ConfigManager } from '../lib/config-manager.js';
import { MASTER_CONFIG_PATH } from '../lib/discovery.js';
import { performSync } from '../lib/sync.js';

export const SyncProgress = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing discovery...');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [...prev.slice(-3), msg]);

  useEffect(() => {
    const runSync = async () => {
      // Step 1: Discovery
      await new Promise(r => setTimeout(r, 800));
      const clients = detectClients();
      setStep(1);
      setProgress(0.25);
      setStatus(`Detected ${clients.length} clients`);
      addLog(`Found: ${clients.map(c => c.name).join(', ')}`);

      // Step 2: Harvesting & Distribution
      await new Promise(r => setTimeout(r, 1000));
      setStep(2);
      setProgress(0.5);
      setStatus('Performing intelligent bidirectional sync...');
      
      await performSync();
      addLog('✨ Synchronized Master Registry');
      addLog('🔒 Secured credentials in system vault');

      // Final
      await new Promise(r => setTimeout(r, 500));
      setStep(4);
      setProgress(1.0);
      setStatus('Synchronization complete!');
    };

    runSync();
  }, []);

  const renderProgressBar = (pct: number) => {
    const width = 30;
    const completed = Math.round(width * pct);
    const remaining = width - completed;
    return (
      <Text>
        <Text color="green">{'█'.repeat(completed)}</Text>
        <Text color="gray">{'░'.repeat(remaining)}</Text>
        <Text> {Math.round(pct * 100)}%</Text>
      </Text>
    );
  };

  return (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1}>
        <Text color="cyan">
          {step < 4 ? <Spinner type="dots" /> : '✅'} {status}
        </Text>
      </Box>

      {renderProgressBar(progress)}

      <Box flexDirection="column" marginTop={1}>
        {logs.map((log, i) => (
          <Text key={i} color="gray">  {log}</Text>
        ))}
      </Box>

      {step === 4 && (
        <Box marginTop={1}>
          <Text bold color="green">✨ System is now fully synchronized.</Text>
        </Box>
      )}
    </Box>
  );
};