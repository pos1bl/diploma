import { ISession } from "@models/ISession";
import { Box, Typography } from "@mui/material";
import { EVENT_STATUS_COLOR } from "@utils/specialist/Calendar";

export const AppointmentEvent = ({ appointment }: { appointment: ISession }) => {
  const { user, status } = appointment;
  const background = EVENT_STATUS_COLOR[status];
  const userName = typeof user === 'string' ? 'Користувач' : user.name;

  return (
    <Box
      bgcolor={background}
      p={1}
      height="100%"
      color="#000"
    >
      <Typography variant="h5">{userName}</Typography>
    </Box>
  );
}