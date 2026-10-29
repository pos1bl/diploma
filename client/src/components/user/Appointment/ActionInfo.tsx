import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const ActionInfo = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
      <InfoOutlinedIcon color="info" sx={{ mt: '2px', color: '#AC98D1' }} />
      <Typography variant="body2">
        Ви можете перенести сеанс не пізніше ніж за 12 годин до його початку
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
      <InfoOutlinedIcon color="info" sx={{ mt: '2px', color: '#AC98D1' }} />
      <Typography variant="body2">
        Ви можете скасувати сеанс (та повернути гроші) не пізніше ніж за 24 години до його початку
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
      <InfoOutlinedIcon sx={{ mt: '2px', color: '#AC98D1' }} />
      <Typography variant="body2">
        Після перенесення сеансу ви не можете повернути гроші за сеанс
      </Typography>
    </Box>
  </Box>
)