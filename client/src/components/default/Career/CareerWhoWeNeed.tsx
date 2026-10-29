import { Container, Typography, Stack, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StyledWhoWeNeed } from "@components/styled/default/career";
import { StyledSubtitle } from "@components/styled/base";
import { REQUIREMENTS_LIST, SectionProps } from "@utils/default/Careerpage";
import { ContainedButton } from "@components/shared/ContainedButton";
import { Link } from "@tanstack/react-router";
import { DEFAULT_PAGES } from "@utils/NavigationList";
import { FC } from "react";

export const WhoWeNeed:FC<SectionProps> = ({ onScrollToForm }) => (
  <StyledWhoWeNeed>
    <Container maxWidth="md">
      <Stack spacing={4} textAlign="center">
        <StyledSubtitle>
          Кого ми шукаємо?
        </StyledSubtitle>

        <Typography variant="body1" color="text.secondary">
          Ми шукаємо емпатичних, кваліфікованих і відповідальних фахівців. Якщо ти — психолог, психотерапевт або кризовий консультант і хочеш допомагати іншим — ми будемо раді знайомству!
        </Typography>

        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h4" fontWeight={700} color="#AC98D1">
            Наші очікування:
          </Typography>
          <List>
            {REQUIREMENTS_LIST.map(req=> (
              <ListItem key={req} disableGutters>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircleIcon sx={{ color: "#AC98D1" }} />
                </ListItemIcon>
                <ListItemText primary={req} primaryTypographyProps={{ variant: "body1" }} />
              </ListItem>
            ))}
          </List>
        </Stack>
        <Link to={DEFAULT_PAGES.CAREER as "/"}>
          <ContainedButton onClick={onScrollToForm}>
            Приєднатися до нас
          </ContainedButton>
        </Link>
      </Stack>
    </Container>
  </StyledWhoWeNeed>
);
