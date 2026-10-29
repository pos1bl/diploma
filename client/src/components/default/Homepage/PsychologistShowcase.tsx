import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import { StyledSection, StyledSubtitle } from '@components/styled/base';
import { Link } from '@tanstack/react-router';
import { PSYCHOLOGIST_LIST } from '@utils/default/Homepage';
import { ContainedButton } from '@components/shared/ContainedButton';

export const PsychologistShowcase = () => {
  return (
    <StyledSection>
      <StyledSubtitle sx={{ mb: '20px' }}>Наші психологи</StyledSubtitle>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
        Ми ретельно перевіряємо кожного фахівця. Всі психологи мають освіту, досвід та дотримуються етичного кодексу.
      </Typography>

      <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
        }}
      >
        {PSYCHOLOGIST_LIST.map(({ name, specialization, experience, avatar }) => (
            <Card
              key={name}
              sx={{
                width: { xs: '100%', sm: '45%', md: '30%' },
                minWidth: '260px',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 3,
                textAlign: 'center',
                flexGrow: 1,
                boxShadow: 3,
                '&:hover': {
                  transform: 'scale(1.01)',
                  boxShadow: 6
                },
              }}
            >
              <Avatar
                src={avatar}
                alt={name}
                sx={{ width: 100, height: 100, mb: 2,  }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {specialization}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {experience}
                </Typography>
              </CardContent>
            </Card>
        ))}
      </Box>

      <Box mt={5} display="flex" justifyContent="center">
        <Link to="/">
          <ContainedButton>Переглянути всіх</ContainedButton>
        </Link>
      </Box>
    </StyledSection>
  );
};
