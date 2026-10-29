import { OutlinedButton } from '@components/shared/OutlinedButton'
import { Box, Typography } from '@mui/material'
import { Link } from '@tanstack/react-router'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { StyledCard } from '@components/styled/user/appointemts';
import { useClientsStore } from '@hooks/useStore';
import { observer } from 'mobx-react-lite';
import { SPECIALIST_PAGES } from '@utils/NavigationList';
import GroupIcon from '@mui/icons-material/Group';

export const ClientsPromoSections = observer(() => {
  const { clients } = useClientsStore();

  const completedSessionsAmount = clients.reduce((total, client) => total + client.completedSessions, 0)
  const cientsAmount = clients.length;

  return (
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
          backgroundColor: '#AC98D1'
        }}
      >
        <Typography color='#fff' variant="h6" gutterBottom>
          Потрібно взяти відпустку чи лікарняний?
        </Typography>
        <Typography color='#fff' variant="body2" sx={{ mb: 2 }}>
          Налаштуйте періоди своєї відсутності, щоб клієнти не могли записатися в цей час. Це допоможе уникнути дублювання бронювань та непорозумінь.
        </Typography>
        <OutlinedButton sx={{ backgroundColor: "#fff" }} component={Link} to={SPECIALIST_PAGES.UNAVAILABILITIES}>
          Додати період відсутності
        </OutlinedButton>
      </Box>

      <Box
        sx={{
          flex: '1 1 300px',
          p: 3,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          backgroundColor: '#AC98D1',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <StyledCard>
          <Box sx={{ mr: 2 }}>{<GroupIcon sx={{ fontSize: "36px", color: '#AC98D1' }} />}</Box>
          <Box textAlign="center">
            <Typography variant="h6">Кількість клієнтів</Typography>
            <Typography variant="h5" color="primary">{cientsAmount}</Typography>
          </Box>
        </StyledCard>
        <StyledCard>
          <Box sx={{ mr: 2 }}><CheckCircleIcon  sx={{ fontSize: "36px", color: '#AC98D1' }} /></Box>
          <Box textAlign="center">
            <Typography variant="h6">Проведено зустрічей</Typography>
            <Typography variant="h5" color="success">{completedSessionsAmount}</Typography>
          </Box>
        </StyledCard>
      </Box>
    </Box>
)})
