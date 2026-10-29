import { StyledSubtitle, StyledTitle } from "@components/styled/base";
import { StyledForm } from "@components/styled/default/form"
import { Box, CircularProgress } from "@mui/material"
import { FC } from "react"

type Props = {
  label: string;
}

export const LoagingStep: FC<Props> = ({ label }) => (
  <StyledForm>
    <StyledSubtitle sx={{ textAlign: "center" }}>{label}</StyledSubtitle>
    <Box display="flex" justifyContent="center">
      <CircularProgress size="100px" sx={{ color: "#AC98D1" }} />
    </Box>
  </StyledForm>
);
