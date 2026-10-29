import { StyledTitle } from '@components/styled/base';
import { Container, Typography, Box } from '@mui/material';
import { USER_PAGES } from '@utils/NavigationList';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';
import { ContainedButton } from '@components/shared/ContainedButton';

type Props = {
  imgPath: string,
  title: string,
  description: string
}

const SectionWrapper:FC<Props> = ({ imgPath, title, description }) => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
      <Box sx={{ mb: 1 }}>
        <Box
          component="img"
          src={imgPath}
          sx={{ width: 300, height: 'auto', mx: 'auto' }}
        />
      </Box>

      <StyledTitle sx={{ mb:3 }}>
        {title}
      </StyledTitle>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        {description}
      </Typography>

      <Link to={USER_PAGES.HOME as "/user"}>
        <ContainedButton>
          Повернутись на головну
        </ContainedButton>
      </Link>
    </Container>
  );
};

export default SectionWrapper;
