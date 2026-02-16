import React, { useState } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import { MASTER_CONFIG_PATH } from '../lib/discovery.js';

export const OnboardingFlow = () => {
  const [step, setStep] = useState(0);
  const [masterPath, setMasterPath] = useState(MASTER_CONFIG_PATH);

  const handleSelect = (item: { value: string }) => {
    if (item.value === 'default') {
      setStep(2);
    } else {
      setStep(1);
    }
  };

  const handlePathSubmit = (path: string) => {
    setMasterPath(path);
    setStep(2);
  };

  return (
    <Box flexDirection="column" paddingY={1}>
      <Text bold color="yellow">👋 Welcome to Universal MCP Bridge Setup</Text>
      
      {step === 0 && (
        <Box flexDirection="column" marginTop={1}>
          <Text>Where should we store your Master MCP Registry?</Text>
          <SelectInput
            items={[
              { label: `Default (${MASTER_CONFIG_PATH})`, value: 'default' },
              { label: 'Custom Path...', value: 'custom' },
            ]}
            onSelect={handleSelect}
          />
        </Box>
      )}

      {step === 1 && (
        <Box flexDirection="column" marginTop={1}>
          <Text>Enter absolute path for .mcp_master.json:</Text>
          <Box>
            <Text color="cyan">{">"} </Text>
            <TextInput value={masterPath} onChange={setMasterPath} onSubmit={handlePathSubmit} />
          </Box>
        </Box>
      )}

      {step === 2 && (
        <Box flexDirection="column" marginTop={1}>
          <Text color="green">✅ Configuration set!</Text>
          <Text color="gray">Path: {masterPath}</Text>
          <Box marginTop={1}>
            <Text bold color="cyan">Press Ctrl+C to finish and run "mcp-bridge sync"</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};
