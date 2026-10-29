import { AppointmentsActionBar } from "@components/user/Appointments/AppointmentsActionBar";
import { AppointmentsList } from "@components/user/Appointments/AppointmentsList";
import { PromoSections } from "@components/user/Appointments/PromoSections";
import { Box } from "@mui/material";

export const AppointmentsPage = () => {
  return (
    <Box pb={1}>
      <PromoSections />
      <AppointmentsActionBar />
      <AppointmentsList />
    </Box>
  )
};