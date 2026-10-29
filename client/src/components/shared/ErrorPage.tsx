import { Box } from '@mui/material'
import { StyledTitle } from '@components/styled/base'
import { OutlinedButton } from '@components/shared/OutlinedButton'

const ErrorPage = ({ message }: { message?: string }) => (
  <Box p={4} textAlign="center">
    <StyledTitle>
      {message || 'Сталася невідома помилка'}
    </StyledTitle>
    <OutlinedButton onClick={() => window.location.reload()} sx={{ mt:2 }}>
      Спробувати знову
    </OutlinedButton>
  </Box>
);

export default ErrorPage;
