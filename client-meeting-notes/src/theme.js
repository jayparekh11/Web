// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Replace with your primary color
    },
    secondary: {
      main: '#9c27b0', // Replace with your secondary color
    },
    // Add more colors as needed
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
    // Define other typography styles as needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          // Add more button styling if necessary
        },
      },
    },
    // Override styles for other components as needed
  },
  // Define additional global styles, if necessary
});

export default theme;
