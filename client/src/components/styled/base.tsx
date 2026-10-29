import { styled } from '@mui/material';
import { Link } from '@tanstack/react-router';

export const StyledActionBar = styled('div')({
  gap: '10px',
  width: '100%',
  display: 'flex',
  padding: '5px 10px',
  alignItems: 'center',
  borderRadius: '20px',
  backgroundColor: '#fff',
  justifyContent: 'center'
});

export const StyledHeaderLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(2),
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
}));

export const StyledSmallHeaderLink = styled(StyledHeaderLink)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export const StyledBigHeaderLink = styled(StyledHeaderLink)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const StyledPageWrapper = styled('div')({
  maxWidth: '1600px',
  margin: '0 auto',
  padding: '50px 0 80px',
});

export const StyledGlobalPageWrapper = styled('div')({
  overflowY: 'auto',
  minHeight: 'inherit',
  maxHeight: 'calc(100dvh - 70px)',

  '&::-webkit-scrollbar': {
    width: '7px',
    height: '7px',
    background: 'rgba(172, 152, 209, 0.5)'
  },

  '&::-webkit-scrollbar-track': {
    backdropFilter: 'blur(10px)',
    background: 'rgba(172, 152, 209, 0.5)'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#2D2046',
    borderRadius: '10px',

    '&:hover': {
      background: '#1B132A'
    }
  }
})

export const StyledMobileAuthenticatedPageWrapper = styled('div')({
  overflowY: 'auto',
  minHeight: 'inherit',
  maxHeight: 'calc(100dvh - 56px)',

  '&::-webkit-scrollbar': {
    width: '7px',
    height: '7px',
    background: 'rgba(172, 152, 209, 0.5)'
  },

  '&::-webkit-scrollbar-track': {
    backdropFilter: 'blur(10px)',
    background: 'rgba(172, 152, 209, 0.5)'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#2D2046',
    borderRadius: '10px',

    '&:hover': {
      background: '#1B132A'
    }
  }
});

export const StyledDesktopAuthenticatedPageWrapper = styled('div')({
  overflowY: 'auto',
  minHeight: 'inherit',
  maxHeight: '100dvh',
  paddingBottom: '24px', 

  '&::-webkit-scrollbar': {
    width: '7px',
    height: '7px',
    background: 'rgba(172, 152, 209, 0.5)'
  },

  '&::-webkit-scrollbar-track': {
    backdropFilter: 'blur(10px)',
    background: 'rgba(172, 152, 209, 0.5)'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#2D2046',
    borderRadius: '10px',

    '&:hover': {
      background: '#1B132A'
    }
  }
});

export const StyledMain = styled('main')({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "80px"
});

export const StyledTitle = styled('h1')({
  fontSize: '48px',
  color: '#AC98D1'
});

export const StyledSubtitle = styled('h2')({
  fontSize: '40px',
  color: '#AC98D1'
});

export const StyledSection = styled('section')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

export const StyledBackgroundSection = styled(StyledSection)({
  backgroundColor: '#F5F1FA',
  borderRadius: '15px',
  gap: '40px',
  padding: '40px',
});

export const ActionBar = styled('div')({
  gap: '10px',
  width: '100%',
  display: 'flex',
  padding: '5px 10px',
  alignItems: 'center',
  borderRadius: '20px',
  backgroundColor: '#fff',
  justifyContent: 'center'
});
