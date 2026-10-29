import { Box, Typography, Paper, Stack } from "@mui/material";
import { StyledBackgroundSection, StyledSubtitle } from "@components/styled/base";
import { FEATURES_LIST } from "@utils/default/Careerpage";

export const WorkStyle = () => (
  <StyledBackgroundSection>
    <Stack spacing={4} textAlign="center">
      <StyledSubtitle>
        Як виглядає робота у нас
      </StyledSubtitle>

      <Typography variant="body1" color="text.secondary" maxWidth="sm" mx="auto">
        Ми цінуємо незалежність, якість і командну підтримку. Нижче — основні принципи нашої взаємодії.
      </Typography>
    </Stack>

    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={4}
    >
      {FEATURES_LIST.map(item => (
        <Paper
          key={item.title}
          elevation={3}
          sx={{
            p: 3,
            flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" },
            borderRadius: 3,
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Box color="#AC98D1">{item.icon}</Box>
            <Typography variant="h6" fontWeight={600}>
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Box>
  </StyledBackgroundSection>
);

