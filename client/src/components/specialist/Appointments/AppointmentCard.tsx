import { ContainedButton } from "@components/shared/ContainedButton";
import { ISession, SESSION_STATUSES } from "@models/ISession";
import { Box, Card, CardContent, Typography } from "@mui/material";
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
      overflow: 'visible',
      p: 2
    }}
  >
    <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          color='success.main'
          mb={0.5}
          sx={{
            color:
              [SESSION_STATUSES.CANCELLED, SESSION_STATUSES.CANCELLED_WITH_REFUND].includes(session.status)
                ? 'error.main'
                  : session.status === SESSION_STATUSES.SCHEDULED
                  ? 'success.main'
                : '#000',
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
      to={`/specialist/appointment/${session._id}` as '/specialist/appointment/$appointmentId'}
      params={{ appointmentId: session._id }}
      style={{ alignSelf: "flex-end", width: "50%" }}
    >
      <ContainedButton sx={{ width: "100%" }}>Деталі</ContainedButton>
    </Link>
  </Card>
);