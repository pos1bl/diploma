import { Box, Typography, Paper } from "@mui/material";
import { StyledBackgroundSection, StyledSubtitle } from "@components/styled/base";
import { INFO_LIST } from "@utils/default/Supportpage";

export const Info = () => (
  <StyledBackgroundSection>
    <StyledSubtitle>Розуміння себе під час війни</StyledSubtitle>
    <Box
      sx={{
        display: "grid",
        gap: 4,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          lg: "repeat(4, 1fr)",
        },
      }}
    >
      {INFO_LIST.map(item => (
        <Paper
          key={item.title}
          elevation={2}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 2 }}>
            {item.icon}
            <Typography variant="h6">
              {item.title}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {item.text}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  </StyledBackgroundSection>
);
