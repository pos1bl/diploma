import { StyledForm, StyledFormCheckbox, StyledFormNote, StyledFormTitle } from "@components/styled/default/form"
import { FormControlLabel, FormGroup } from "@mui/material"
import { CheckboxStepProps, TARGET_ISSUE } from "@utils/default/Form"
import { FC } from "react"

export const TargetStep: FC<CheckboxStepProps> = ({ values, label, handleToggle }) => (
  <StyledForm>
    <StyledFormTitle>{label}</StyledFormTitle>
    <FormGroup>
      {TARGET_ISSUE.map(issue => (
        <FormControlLabel key={issue.value} control={<StyledFormCheckbox checked={values.target.includes(issue.value)} onChange={handleToggle("target", issue.value)} />} label={issue.label} />
      ))}
    </FormGroup>
    <StyledFormNote>
      Інколи буває важко визначити свою ціль, і в таких випадках фахівець поставить питання, що допоможуть її чітко сформулювати.
    </StyledFormNote>
  </StyledForm>
);
