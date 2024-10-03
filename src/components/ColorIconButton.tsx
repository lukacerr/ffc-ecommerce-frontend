import { LightMode, DarkMode } from '@mui/icons-material';
import { IconButton, useColorScheme } from '@mui/material';
import { useMemo } from 'react';

export interface IColorIconButtonProps {
  absolute?: true;
}

export default function ColorIconButton({ absolute }: IColorIconButtonProps) {
  const { mode, setMode, systemMode } = useColorScheme();
  const currentMode = useMemo(() => (mode === 'system' ? systemMode : mode), [mode, systemMode]);

  return (
    <IconButton
      sx={absolute && { position: 'absolute', top: 32, right: 32 }}
      onClick={() => setMode(currentMode === 'dark' ? 'light' : 'dark')}
    >
      {currentMode === 'dark' ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
