import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { StyledSection, StyledSubtitle } from '@components/styled/base';
import { CAREER_FAQ_ITEMS } from '@utils/default/Careerpage';

export const FAQ = () => {
  return (
    <StyledSection>
      <Container maxWidth="md">
        <StyledSubtitle sx={{ mb: '20px' }}>
          Поширені запитання
        </StyledSubtitle>

        <Box>
          {CAREER_FAQ_ITEMS.map(({ id, question, answer }) => (
            <Accordion key={id} sx={{ mb: 2, borderRadius: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </StyledSection>
  );
};
