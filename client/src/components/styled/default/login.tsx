import { Button, styled, Tab, Tabs } from '@mui/material';

export const StyledAuthPage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100dvh',
  width: '100vw',
  backdropFilter: 'blur(10px)',
  boxSizing: 'border-box'
});

export const SigninForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
});

export const StyledTabs = styled(Tabs) ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#A891D2'
  },
  '& .MuiTabs-indicatorSpan': {
    backgroundColor: '#A891D2'
  }
});

export const StyledTab = styled(Tab) ({
  '&.Mui-selected': {
    color: '#A891D2',
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#A891D2',
  },
});
