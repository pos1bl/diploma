import { ContainedButton } from "@components/shared/ContainedButton";
import { ISession, SESSION_STATUSES } from "@models/ISession";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { formatSessionDate } from "@utils/user/Homepage";
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Link } from "@tanstack/react-router";
import { SESSION_STATUS_OPTIONS } from "@utils/user/Appointment";

interface SessionCardProps {
  session: ISession;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => (
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
          src={session.specialist?.avatarUrl}
          sx={{ width: 80, height: 80, mr: 3 }}
        >
          {session.specialist?.user.name.charAt(0)}
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ mb: 0.2, fontSize: '18px', color: '#AC98D1', fontWeight: 700 }}>
            {session.specialist?.user.name}
          </Typography>

          <Typography
            variant="body2"
            color='success.main'
            mb={0.5}
            sx={{
              color:
                [SESSION_STATUSES.CANCELLED, SESSION_STATUSES.CANCELLED_WITH_REFUND].includes(session.status)
                  ? 'error.main'
                    : session.status === SESSION_STATUSES.SCHEDULED
                    ? 'success.main'
                  : '#AC98D1',
              mb: 1,
            }}
          >
            {SESSION_STATUS_OPTIONS.find(row => row.status === session.status)?.label}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon
              fontSize="small"
              sx={{ color: '#AC98D1', mr: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              {formatSessionDate(session.scheduledAt)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      
        <Link 
          to={`/user/appointments/${session._id}` as '/user/appointments/$appointmentId'}
          params={{ appointmentId: session._id }}
          style={{ alignSelf: "flex-end", width: "30%" }}
        >
          <ContainedButton sx={{ fontSize: '1rem', px: 3, py: 1, }}>Деталі</ContainedButton>
        </Link>
    </Card>
);