import { Box, Typography } from '@mui/material'
import { FAQList } from '@components/user/Support/FAQList'
import { ContactCard } from '@components/user/Support/ContactCard';
import { StyledTitle } from '@components/styled/base';

export const SupportPage = () => (
  <Box sx={{ px: { xs: 2, md: 4, wordBreak: 'break-word' } }}>
    <StyledTitle>
      Підтримка
    </StyledTitle>
    <Typography variant="body1" sx={{ mb: 3 }}>
      Якщо у вас виникли питання щодо роботи платформи,
      оберіть одну з тем нижче або напишіть нам повідомлення.
    </Typography>

    <Box mb={3}>
      <FAQList />
    </Box>

    <Box display="flex" justifyContent="center">
      <ContactCard />
    </Box>

  </Box>
);
