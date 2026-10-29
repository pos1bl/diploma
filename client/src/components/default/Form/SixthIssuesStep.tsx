import { StyledForm, StyledFormBody, StyledFormTitle, StyledSlider } from "@components/styled/default/form"
import { Box, Slider } from "@mui/material"
import { IssuesStepProps } from "@utils/default/Form"
import { ISSUES_LIST } from "@utils/shared";
import { FC } from "react"

export const IssuesStep: FC<IssuesStepProps> = ({ values, label, handleSlider }) => (
  <StyledForm>
    <StyledFormTitle>{label}</StyledFormTitle>
    <Box display="flex" flexDirection="column" gap="32px">
      {ISSUES_LIST.map(issue => (
        <div>
          <StyledFormBody>{issue}</StyledFormBody>
          {/* @ts-ignore */}
          <StyledSlider onChange={(_, v) => handleSlider(issue, v)}
            value={values.issues[issue]}
            step={1}
            marks
            min={0}
            max={3}
            valueLabelDisplay="auto"
          />
        </div>
      ))}
    </Box>
  </StyledForm>
);
