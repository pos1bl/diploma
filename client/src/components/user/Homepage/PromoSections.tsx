import { OutlinedButton } from '@components/shared/OutlinedButton'
import { Box, Typography } from '@mui/material'
import { Link } from '@tanstack/react-router'

export const PromoSections = () => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,
      mb: 4,
    }}
  >
    <Box
      sx={{
        flex: '1 1 300px',
        p: 3,
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Не знаєш до якого психотерапевта звернутись?
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Пройди тест і дізнайся який терапевт підійде саме тобі
      </Typography>
      <OutlinedButton component={Link} to="/form">
        Пройти тест
      </OutlinedButton>
    </Box>

    <Box
      sx={{
        flex: '1 1 300px',
        p: 3,
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Хочеш обрати психотерапевта самостійно?
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Ознайомся з каталогом фахівців і обери який терапевт підійде саме тобі
      </Typography>
      <OutlinedButton component={Link} to="/specialists">
        Переглянути каталог
      </OutlinedButton>
    </Box>
  </Box>
)
