import { Container, Paper, Typography, Stack } from "@mui/material";
import { BlurCarousel } from "@components/shared/BlurCarousel";
import { StyledBackgroundSection, StyledSubtitle } from "@components/styled/base";

const stories = [
  {
    id: 1,
    name: "Анонім, 34 роки",
    text: "Після втрати дому й евакуації я почувався повністю розбитим. Але після кількох сесій я знову відчув, що можу дихати.",
  },
  {
    id: 2,
    name: "Військовий, 29 років",
    text: "Повернувшись з фронту, я не міг спати. Допомога психолога дала мені можливість знову довіряти і бути відкритим.",
  },
  {
    id: 3,
    name: "Марина, волонтерка",
    text: "Звернення по допомогу було нелегким, але правильним кроком. Тепер я краще відновлююся після навантаження.",
  },
  {
    id: 4,
    name: "Софія, 41 рік",
    text: "Мої діти боялися кожного гучного звуку після окупації. Завдяки психологу я навчилась бути для них стабільною опорою.",
  },
];

export const InspiringStories = () => (
  <StyledBackgroundSection>
    <Container maxWidth="md">
      <Stack spacing={4} textAlign="center" mb={4}>
        <StyledSubtitle>Надихаючі історії</StyledSubtitle>
      </Stack>
        
      <BlurCarousel
        items={stories}
        renderItem={(item, isActive, isBlur) => (
          <Paper
            key={item.id}
            elevation={3}
            sx={{
              p: 4,
              mx: 1,
              flex: isActive ? "0 0 60%" : "0 0 20%",
              opacity: isActive ? 1 : 0.5,
              filter: isBlur ? "blur(2px)" : "none",
              borderRadius: 3,
              bgcolor: "#ffffff",
              textAlign: "center",
              transition: "all 0.3s ease",
              maxHeight: 280,
              minWidth: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" mb={2}>
              “{item.text}”
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontStyle="italic"
            >
              — {item.name}
            </Typography>
          </Paper>
        )}
      />
    </Container>
  </StyledBackgroundSection>
);
