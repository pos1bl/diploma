import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  useTheme,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import TelegramIcon from '@mui/icons-material/Telegram'
import EmailIcon from '@mui/icons-material/Email'

export const ContactCard = () => {
  const theme = useTheme()

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
        minWidth: { md: 600 },
      }}
    >
      <Typography variant="h5" color="#AC98D1" fontWeight={700}>
        Зв’яжіться з нами
      </Typography>

      <List disablePadding>
        <ListItem disableGutters>
          <ListItemIcon>
            <AccessTimeIcon sx={{ color: "#AC98D1", fontSize: "32px" }} />
          </ListItemIcon>
          <ListItemText
            primary="Години роботи"
            secondary="Пн–Пт: 9:00 – 18:00"
          />
        </ListItem>

        <ListItem disableGutters>
          <ListItemIcon>
            <TelegramIcon sx={{ color: "#AC98D1", fontSize: "32px" }} />
          </ListItemIcon>
          <ListItemText
            primary="Написати в Telegram-бот"
            secondary={
              <MuiLink
                href="https://t.me/YourBotUsername"
                target="_blank"
                rel="noopener"
              >
                @YourBotUsername
              </MuiLink>
            }
          />
        </ListItem>

        <ListItem disableGutters>
          <ListItemIcon>
            <EmailIcon sx={{ color: "#AC98D1", fontSize: "32px" }} />
          </ListItemIcon>
          <ListItemText
            primary="Написати на пошту"
            secondary={
              <MuiLink href="mailto:buk.bukov18@gmail.com">
                buk.bukov18@gmail.com
              </MuiLink>
            }
          />
        </ListItem>
      </List>
    </Paper>
  )
}
