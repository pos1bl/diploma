import { Box} from '@mui/material';
import { useClientsStore } from '@hooks/useStore';
import { observer } from 'mobx-react-lite';
import { ClientCard } from './ClientCard';

export const ClienstList = observer(() => {
  const { clients } = useClientsStore();
  
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
      {clients.map(client => (
        <ClientCard key={client._id} client={client} />
      ))}
    </Box>
  )
});
