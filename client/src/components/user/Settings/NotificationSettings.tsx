import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
} from '@mui/material'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { NOTIFICATION_LIST } from '@utils/user/Settingspage';

export const NotificationSettings = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Сповіщення будуть приходити:
        </Typography>
        <List disablePadding>
          {NOTIFICATION_LIST.map((text) => (
            <ListItem key={text} disableGutters>
              <ListItemIcon>
                <NotificationsActiveIcon
                  fontSize="small"
                  sx={{ color: "#AC98D1" }}
                />
              </ListItemIcon >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Ми використовуємо email для сповіщення:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Сповіщення приходитимуть на вашу адресу. Адресу можна змінити
          у блоці «Змінити Email».
        </Typography>
      </Box>
    </Paper>
  )
}
