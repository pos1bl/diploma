import { Box, Card, styled } from "@mui/material";

export const StyledCard = styled(Card)({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  p: 1,
  height: "80%"
});

export const StyledFilter = styled(Box)({
  display: 'flex',
  flex: '0 0 auto',
  alignSelf: "start",
  padding: '0.75em 0.75em',
})
