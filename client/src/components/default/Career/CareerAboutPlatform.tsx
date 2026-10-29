import { StyledSubtitle, StyledBackgroundSection } from "@components/styled/base";
import { Container, Typography, Stack, Divider } from "@mui/material";

export const AboutPlatform = () => (
  <StyledBackgroundSection>
    <Container maxWidth="md">
      <Stack spacing={4} textAlign="center">
        <StyledSubtitle>
          Платформа, що змінює життя
        </StyledSubtitle>

        <Typography variant="body1" color="text.secondary">
          Ми створили простір, де кожна людина може отримати психологічну підтримку: 
          <strong> безкоштовно для військових і постраждалих від війни</strong>, 
          а також через <strong>платні сесії</strong> для всіх, хто шукає психічну рівновагу.
          Наша мета — зробити допомогу доступною, етичну й ефективною.
        </Typography>

        <Divider flexItem />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 6 }}
          justifyContent="center"
        >
          <StatBlock value="150+" label="Психологів у команді" />
          <StatBlock value="5000+" label="Годин консультацій" />
          <StatBlock value="97%" label="Позитивних відгуків" />
        </Stack>
      </Stack>
    </Container>
  </StyledBackgroundSection>
);

interface StatBlockProps {
  value: string;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => (
  <Stack spacing={0.5} alignItems="center">
    <Typography variant="h4" fontWeight={700} color="#AC98D1">
      {value}
    </Typography>
    <Typography variant="body1" color="text.secondary" textAlign="center">
      {label}
    </Typography>
  </Stack>
);
