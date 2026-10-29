import { FC } from "react";
import { Container, Paper, Stack, Typography, Avatar } from "@mui/material";
import { StyledSubtitle } from "@components/styled/base";
import { StyleddTestimonials } from "@components/styled/default/career";
import { BlurCarousel } from "@components/shared/BlurCarousel";
import { TESTIMONIALS_LIST } from "@utils/default/Careerpage";

export const Testimonials: FC = () => (
  <StyleddTestimonials>
    <Container maxWidth="md">
      <Stack spacing={4} textAlign="center" mb={4}>
        <StyledSubtitle>Що кажуть наші фахівці?</StyledSubtitle>
        <Typography variant="body1" color="text.secondary">
          Відгуки тих, хто вже допомагає людям разом з нами
        </Typography>
      </Stack>

      <BlurCarousel
        items={TESTIMONIALS_LIST}
        renderItem={(item, isActive, isBlur) => (
          <Paper
            key={item.name}
            elevation={3}
            sx={{
              p: 4,
              mx: 1,
              flex: isActive ? "0 0 60%" : "0 0 20%",
              opacity: isActive ? 1 : 0.5,
              filter: isBlur ? "blur(2px)" : "none",
              borderRadius: 3,
              bgcolor: "#F5F1FA",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "all 0.3s ease",
              maxHeight: 320,
              minWidth: "auto",
            }}
          >
            <Avatar src={item.avatar} alt={item.name} sx={{ width: 100, height: 100, mb: 4 }} />
            <Typography variant="body1" mb={2}>
              "{item.text}"
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
              {item.name}, {item.role}
            </Typography>
          </Paper>
        )}
      />
    </Container>
  </StyleddTestimonials>
);
