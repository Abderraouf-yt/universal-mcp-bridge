import React from 'react';
import { Box, Text } from 'ink';

export const App = () => (
  <Box flexDirection="column" padding={1} borderStyle="round" borderColor="cyan">
    <Box marginBottom={1}>
      <Text bold color="cyan">
        🚀 Universal MCP Bridge (Free Edition)
      </Text>
    </Box>
    <Box>
      <Text italic color="gray">
        Unified configuration engine for the 2026 AI ecosystem.
      </Text>
    </Box>
    <Box marginTop={1}>
      <Text color="green">✅ Ready for synchronization.</Text>
    </Box>
  </Box>
);
