import { ClientsActionBar } from "@components/specialist/Clients/ClientsActionBar";
import { ClienstList } from "@components/specialist/Clients/ClientsList";
import { ClientsPromoSections } from "@components/specialist/Clients/ClientsPromoSections";
import { Box } from "@mui/material";

export const ClientsPage = () => {
  return (
    <Box pb={1}>
      <ClientsPromoSections />
      <ClientsActionBar />
      <ClienstList />
    </Box>
  )
};
