import { OutlinedButton } from "@components/shared/OutlinedButton";
import { StyledSubtitle } from "@components/styled/base";
import { StyledSelfHelpMethods } from "@components/styled/default/support";
import { Typography, Card, CardContent, Stack, Button, CardMedia } from "@mui/material";
import { GUIDES_LIST } from "@utils/default/Supportpage";

export const SelfHelpMethods = () => (
  <StyledSelfHelpMethods>
    <StyledSubtitle>Матеріали самодопомоги</StyledSubtitle>

    <Stack direction="column" spacing={4} width="100%">
      {GUIDES_LIST.map((guide, idx) => (
        <Card
          key={guide.title}
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
            borderRadius: 3,
            gap: { md: "100px" },
            px: { xs: "20px", md: "30px" },
            py: { md: "10px" },
          }}
        >
          <CardMedia
            component="img"
            image={guide.image}
            alt={guide.title}
            sx={{ width: { xs: "100%", md: 350 }, height: { xs: 350, md: "100%"  }, objectFit: "contain" }}
          />
          <CardContent sx={{ display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center" }}>
            <Typography variant="h4" fontWeight={700} color="#A891D2">
              {`${idx + 1}. ${guide.title}`}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {guide.description}
            </Typography>
            <a href={guide.href} download>
              <OutlinedButton>
                Завантажити PDF
              </OutlinedButton>
            </a>
          </CardContent>
        </Card>
      ))}
    </Stack>
  </StyledSelfHelpMethods>
);
