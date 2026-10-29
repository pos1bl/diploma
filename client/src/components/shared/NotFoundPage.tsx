import { StyledTitle } from '@components/styled/base';
import { Container, Typography, Box } from '@mui/material';
import { ContainedButton } from './ContainedButton';
import { DEFAULT_PAGES } from '@utils/NavigationList';
import { Link } from '@tanstack/react-router';

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
      <Box sx={{ mb: 1 }}>
        <Box
          component="img"
          src="/images/otter-not-found.png"
          alt="Confused Otter"
          sx={{ width: 300, height: 'auto', mx: 'auto' }}
        />
      </Box>

      <StyledTitle sx={{ fontWeight: 'bold', fontSize: "100px" }}>
        404
      </StyledTitle>
      <Typography variant="h5" component="p" gutterBottom>
        Сторінку не знайдено
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Вибачте, сторінка, яку ви шукаєте, не існує або була переміщена.
      </Typography>

      <Link to={DEFAULT_PAGES.HOME_PAGE as "/"}>
        <ContainedButton>
          Повернутись на головну
        </ContainedButton>
      </Link>
    </Container>
  );
};

export default NotFoundPage;
