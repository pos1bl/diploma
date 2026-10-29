import { Box, Paper, styled } from "@mui/material";
import { StyledSection } from "../base";

export const StyledHero = styled(StyledSection)({
  backgroundColor: '#f9f9f9',
  borderRadius: '5%',
  gap: '40px',
  flexDirection: 'row',
  padding: '40px'
});

export const StyledSteps = styled(StyledSection)({
  gap: '40px',
});

export const StyledOptions = styled(StyledSection)({
  backgroundColor: '#f9f9f9',
  borderRadius: '5%',
  gap: '40px',
  padding: '40px',
});

export const StyledInfo = styled(StyledSection)({
  flexDirection: 'row',
  gap: '40px',
  padding: '40px',
});

export const StyledCertificateHelps = styled(StyledSection)({
  gap: '40px',
  padding: '40px',
});

export const StyledPaymentSuccess = styled(StyledSection)({
  gap: '40px',
});

export const StyledHeroInfoBlock = styled(Box)({
  maxWidth: '650px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
});

export const StyledHeroImageBox = styled(Box)({
  width: '500px',
  height: '500px',
  borderRadius: '5%',
  overflow: 'hidden'
});

export const StyledSuccessImageBox = styled(Box)({
  width: '250px',
  overflow: 'hidden'
});

export const StyledInfoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#F5F1FA',
  borderRadius: theme.shape.borderRadius * 2,
  maxWidth: '80%'
}));
