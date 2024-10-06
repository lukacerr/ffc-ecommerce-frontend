import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

export default responsiveFontSizes(
  createTheme(
    {
      palette: {
        primary: {
          main: '#75AADB',
        },
        secondary: {
          main: '#FCBF49',
        },
        text: {
          secondary: '#FCBF49',
        },
        success: {
          main: '#009933',
        },
        error: {
          main: '#D32F2F',
        },
      },
      colorSchemes: {
        dark: {
          palette: {
            secondary: {
              main: '#FCBF49',
            },
            text: {
              secondary: '#FCBF49',
            },
          },
        },
      },
    },
    esES
  )
);
