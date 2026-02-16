import React from 'react';
import { Box, Text } from 'ink';
import { Header } from './Header.js';
import { SyncProgress } from './SyncProgress.js';
import { OnboardingFlow } from './OnboardingFlow.js';

interface AppProps {
  mode: 'ui' | 'sync' | 'init';
}

export const App = ({ mode }: AppProps) => (
  <Box flexDirection="column" padding={1}>
    <Header />
    
    {mode === 'ui' && (
      <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
        <Box marginBottom={1}>
          <Text bold color="cyan">
            Dashboard Status
          </Text>
        </Box>
        <Box>
          <Text italic color="gray">
            Unified configuration engine for the 2026 AI ecosystem.
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text color="green">✅ Ready for synchronization. Run "mcp-bridge sync" or use the menu.</Text>
        </Box>
      </Box>
    )}

    {mode === 'sync' && <SyncProgress />}
    {mode === 'init' && <OnboardingFlow />}

    <Box marginTop={1} borderStyle="single" borderColor="gray" paddingX={1}>
      <Text color="gray">Tier: </Text>
      <Text color="white" bold>Community (Free Edition)</Text>
      <Text color="gray"> | v1.0.0</Text>
    </Box>
  </Box>
);