import { Typography, Stack, Link as MuiLink, Card, Avatar, CardContent } from "@mui/material";
import { StyledBackgroundSection, StyledSubtitle } from "@components/styled/base";
import { CONTACTS_LIST } from "@utils/default/Supportpage";

export const EmergencyContacts = () => (
  <StyledBackgroundSection>
    <StyledSubtitle>
      Екстрені контакти
    </StyledSubtitle>

    <Stack direction={{ xs: "column", md: "row" }} spacing={4} justifyContent="center" alignItems="stretch">
      {CONTACTS_LIST.map(contact => (
        <Card
          key={contact.value}
          elevation={0}
          sx={{
            border: "2px solid #AC98D1",
            borderRadius: 3,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            px: 3,
            py: 4,
            minHeight: 200,
            backgroundColor: "white",
          }}
        >
          <Avatar sx={{ bgcolor: "#AC98D1", mb: 2, width: 64, height: 64 }}>
            {contact.icon}
          </Avatar>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {contact.label}
            </Typography>
            <MuiLink
              href={contact.href}
              target="_blank"
              rel="noopener"
              underline="hover"
              color="primary"
            >
              {contact.value}
            </MuiLink>
          </CardContent>
        </Card>
      ))}
    </Stack>
  </StyledBackgroundSection>
);
