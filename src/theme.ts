import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#75AADB',
      },
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
      success: {
        main: '#009933',
      },
      error: {
        main: '#D32F2F',
      },
    },
  })
);

export default theme;
