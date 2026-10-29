import { ContainedButton } from "@components/shared/ContainedButton";
import { StyledSubtitle, StyledBackgroundSection } from "@components/styled/base";
import { Box, Container, Typography, Stack, Paper } from "@mui/material";
import { JOIN_STEPS_LIST, SectionProps } from "@utils/default/Careerpage";
import { FC } from "react";

export const JoinSteps:FC<SectionProps> = ({ onScrollToForm }) => (
  <StyledBackgroundSection>
    <Container maxWidth="md">
      <Stack textAlign="center" mb={5}>
        <StyledSubtitle sx={{ mb: 3 }}>
          Як приєднатися до нашої команди?
        </StyledSubtitle>
        <Typography variant="body1" color="text.secondary" maxWidth="sm" mx="auto">
          Простий процес реєстрації, щоб ви могли швидко почати допомагати іншим
        </Typography>
      </Stack>

      <Stack spacing={4}>
        {JOIN_STEPS_LIST.map((step) => (
          <Paper
            key={step.number}
            elevation={4}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box
              component="img"
              src={step.image}
              alt={step.title}
              sx={{
                width: { xs: "100%", sm: "60%" },
                maxWidth: 350,
                objectFit: "contain",
              }}
            />

            <Box
              sx={{
                width: 72,
                height: 72,
                bgcolor: "#AC98D1",
                color: "#fff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {step.number}
            </Box>

            <Box>
              <Typography variant="h4" fontWeight={600} mb={2}>
                {step.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {step.description}
              </Typography>
            </Box>

            {step.button && <ContainedButton onClick={onScrollToForm}>Заповнити анкету</ContainedButton>}
          </Paper>
        ))}
      </Stack>
    </Container>
  </StyledBackgroundSection>
);
