import { Box} from '@mui/material';
import { SessionCard } from './AppointmentCard';
import { useSessionStore } from '@hooks/useStore';
import { observer } from 'mobx-react-lite';

export const AppointmentsList = observer(() => {
  const { sessions } = useSessionStore();
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px"
      }}
    >
      {sessions.map(session => (
        <SessionCard key={session._id} session={session} />
      ))}
    </Box>
  )
});
