import { Box, styled, Typography, TypographyProps } from "@mui/material";

export const StyledSidepanelTitle = styled(
  (props: TypographyProps) => <Typography variant="h4" {...props} />
)({
  color: "#AC98D1",
  fontWeight: 600,
});

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
