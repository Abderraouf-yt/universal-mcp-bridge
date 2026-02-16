import React from 'react';
import { Box, Text } from 'ink';
import gradient from 'gradient-string';

export const Header = () => {
  const asciiArt = `
  __  __  _____  _____    ____         _     _              
 |  \\/  ||  __ \\|  __ \\  |  _ \\       (_)   | |             
 | \\  / || |__) || |__) | | |_) |_ __ _  __| | __ _  ___ 
 | |\\/| ||  ___/ |  ___/  |  _ <| '__| |/ _\` |/ _\` |/ _ \\
 | |  | || |     | |      | |_) | |  | | (_| | (_| |  __/
 |_|  |_||_|     |_|      |____/|_|  |_|\\__,_|\\__, |\\___|
                                               __/ |     
                                              |___/      
  `;

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text>{gradient.pastel.multiline(asciiArt)}</Text>
      <Box borderStyle="single" borderColor="gray" paddingX={2} marginTop={-1}>
        <Text italic color="cyan">The Unified Protocol Bridge for 2026 AI Agents</Text>
      </Box>
    </Box>
  );
};