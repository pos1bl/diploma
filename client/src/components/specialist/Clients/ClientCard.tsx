import { ContainedButton } from "@components/shared/ContainedButton";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from "@tanstack/react-router";
import { Client } from "@models/IUser";

interface ClientCardProps {
  client: Client;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client }) => (
  <Card
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        px: 1,
        py: 2,
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Avatar
          sx={{ width: 80, height: 80, mr: 3 }}
        >
          {client.name.charAt(0)}
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ mb: 0.2, fontSize: '18px', color: '#AC98D1', fontWeight: 700 }}>
            {client.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <GroupsIcon
              fontSize="small"
              sx={{ color: '#AC98D1', mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {client.completedSessions} {client.completedSessions === 1 ? "зустріч" : client.completedSessions > 1 && client.completedSessions < 5 ? "зустрічі" : "зустрічей"}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      
        <Link 
          to={`/specialist/clients/${client._id}/appointments` as '/specialist/clients/$clientId/appointments'}
          params={{ clientId: client._id }}
          style={{ alignSelf: "flex-end" }}
        >
          <ContainedButton sx={{ fontSize: '1rem', px: 3, py: 1, }}>Деталі</ContainedButton>
        </Link>
    </Card>
);