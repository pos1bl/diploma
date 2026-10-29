import { ContainedButton } from "@components/shared/ContainedButton";
import { OutlinedButton } from "@components/shared/OutlinedButton";
import { StyledSessionTitle } from "@components/styled/user/home";
import { Box, Card, CardContent } from "@mui/material";
import { Link } from "@tanstack/react-router";

export const QuickActions = () => (
  <Box sx={{ flexBasis: '50%', flexShrink: 0 }}>
    <StyledSessionTitle sx={{ mb: 2 }}>Швидкі дії:</StyledSessionTitle>

    <Card
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: 'visible',
        p: 2
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3, gap: 2 }}>
        <Link
          to="/specialist/calendar"
          style={{ alignSelf: "flex-end", width: "50%" }}
        >
          <ContainedButton sx={{ width: "100%" }}>Мій календар</ContainedButton>
        </Link>
        <Link
          to="/specialist/unavailabilities"
          style={{ alignSelf: "flex-end", width: "50%" }}
        >
          <OutlinedButton sx={{ width: "100%" }}>Додати відсутність</OutlinedButton>
        </Link>
      </CardContent>
    </Card>
  </Box>
);
