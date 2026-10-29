import { Accordion, AccordionSummary, styled } from '@mui/material';

export const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  border: `2px solid #AC98D1`,
  '&:before': { display: 'none' },
  '&.Mui-expanded': {
    border: `1px solid #AC98D1`,
    borderRadius: theme.shape.borderRadius,
  },
}));

export const StyledAccordionSummary = styled(AccordionSummary)({
  backgroundColor: "#fff",
  mb: 1,
  borderRadius: 2,
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
  '&.Mui-expanded': {
    backgroundColor: "#AC98D1",
    color: "#fff",

    '& .MuiAccordionSummary-expandIconWrapper': {
      color: "#fff",
    },
  },
});
