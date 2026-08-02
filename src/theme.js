import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0A0E13',
      paper: '#10161D',
    },
    primary: {
      main: '#38BDF8',
    },
    error: {
      main: '#FF4D5E',
    },
    warning: {
      main: '#FF9F45',
    },
    success: {
      main: '#34D399',
    },
    text: {
      primary: '#E6EDF3',
      secondary: '#7C8B9C',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 6,
  },
});

export default theme;