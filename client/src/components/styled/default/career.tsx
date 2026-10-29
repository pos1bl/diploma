import { Box, styled } from "@mui/material";
import { StyledSection } from "../base";

export const StyledHero = styled(StyledSection)({
  gap: '40px',
  flexDirection: 'row',
});

export const StyledWhoWeNeed = styled(StyledSection)({
  gap: '40px',
  padding: '40px',
});

export const StyleddTestimonials = styled(StyledSection)({
  gap: '40px',
  padding: '40px',
});

export const StyleddAppForm = styled(StyledSection)({
  gap: '40px',
  padding: '40px',
});

export const StyledJoinUs = styled(StyledSection)({
  flexDirection: 'row',
});

export const StyledSupport = styled(StyledSection)({
  flexDirection: 'row',
  gap: '40px',
});


export const StyledInfoBlock = styled(Box)({
  maxWidth: '650px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
});

export const StyledHeroImageBox = styled(Box)({
  width: '700px',
  overflow: 'hidden'
});

export const StyledJoinUsImageBox = styled(Box)({
  width: '450px',
  overflow: 'hidden'
});

export const StyledSupportImageBox = styled(Box)({
  width: '400px',
  overflow: 'hidden'
});
