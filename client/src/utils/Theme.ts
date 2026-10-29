import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'inherit'
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: 'inherit',
          '&.Mui-selected': {
            color: 'inherit',
          },
        },
        label: {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
      },
    },
  },
});
