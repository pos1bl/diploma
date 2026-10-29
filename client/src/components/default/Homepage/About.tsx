import { StyledAbout } from '@components/styled/default/homepage';
import { StyledSubtitle } from '@components/styled/base';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, List, ListItem } from '@mui/material';

export const About = () => (
  <StyledAbout>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: '15px',
      }}
    >
      <FavoriteIcon sx={{ color: '#8164B9', fontSize: '40px' }} />
      <StyledSubtitle>Для кого ця платформа:</StyledSubtitle>
    </Box>
    <List >
      <ListItem>• Кожного, хто шукає підтримку та хоче працювати зі своїм емоційним станом.</ListItem>
      <ListItem>• Військових та людей, постраждалих від війни — ми забезпечуємо безкоштовну допомогу.</ListItem>
      <ListItem>• Фахівців — ми пропонуємо платформу для безпечної та зручної роботи.</ListItem>
    </List>
  </StyledAbout>
);
