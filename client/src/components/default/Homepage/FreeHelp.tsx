import { StyledSection, StyledSubtitle } from '@components/styled/base';
import { Container, Typography, Paper } from '@mui/material';
import { ContainedButton } from '@components/shared/ContainedButton';

export const FreeHelp = () => {
  return (
    <StyledSection>
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            borderRadius: 4,
            textAlign: 'center',
          }}
        >
          <StyledSubtitle>
            Безкоштовна допомога для військових та постраждалих від війни
          </StyledSubtitle>

          <Typography variant="body1" color="text.secondary">
            Ми дбаємо про тих, хто постраждав внаслідок війни. Платформа надає безкоштовну психологічну допомогу для військових, ветеранів, переселенців та всіх, хто пережив травматичні події.
            Звернення конфіденційне, підбір фахівця — швидкий і турботливий.
          </Typography>

          <ContainedButton sx={{ width: 'fit-content', mx: 'auto' }}>
            Отримати безкоштовну підтримку
          </ContainedButton>
        </Paper>
      </Container>
    </StyledSection>
  );
};
