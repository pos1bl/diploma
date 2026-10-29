import { Box, styled } from '@mui/material';
import { StyledSection } from '../base';

export const StyledHero = styled(StyledSection)({
  gap: '40px',
  flexDirection: 'row',
});

export const StyledAbout = styled(StyledSection)({
  gap: '20px',
});

export const StyledHowItWorks = styled(StyledSection)({
  gap: '40px',
});

export const StyledPsychologistShowCase = styled(StyledSection)({
  gap: '40px',
});

export const StyledHeroInfoBlock = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
});

export const StyledImageBox = styled(Box)({
  width: '450px',
  height: '550px',
  borderRadius: '5%',
  overflow: 'hidden'
});
