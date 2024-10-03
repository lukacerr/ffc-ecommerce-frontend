import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export default responsiveFontSizes(
  createTheme({
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
          background: {
            default: '#000000',
            paper: '#121212',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#FCBF49',
          },
        },
      },
      light: {
        palette: {
          background: {
            default: '#FFFFFF',
            paper: '#F5F5F5',
          },
          text: {
            primary: '#000000',
          },
        },
      },
    },
  })
);
