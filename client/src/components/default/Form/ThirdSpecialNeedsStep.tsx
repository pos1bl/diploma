import { StyledForm, StyledFormCheckbox, StyledFormTitle } from "@components/styled/default/form"
import { FormControlLabel, FormGroup } from "@mui/material"
import { CheckboxStepProps, SPECIAL_NEEDS } from "@utils/default/Form"
import { FC } from "react"

export const SpecialNeedsStep: FC<CheckboxStepProps> = ({ values, label, handleToggle }) => (
  <StyledForm>
    <StyledFormTitle>{label}</StyledFormTitle>
    <FormGroup>
      {SPECIAL_NEEDS.map(need => (
        <FormControlLabel key={need} control={<StyledFormCheckbox checked={values.specialNeeds.includes(need)} onChange={handleToggle("specialNeeds", need)} />} label={need} />
      ))}
    </FormGroup>
  </StyledForm>
);
