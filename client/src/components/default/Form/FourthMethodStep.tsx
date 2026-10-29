import { StyledForm, StyledFormTitle, StyledRadio } from "@components/styled/default/form"
import { FormControl, FormControlLabel, RadioGroup } from "@mui/material"
import { METHODS, RadioStepProps } from "@utils/default/Form"
import { FC } from "react"

export const MethodStep: FC<RadioStepProps> = ({ values, label, handleSelect }) => (
  <StyledForm>
    <StyledFormTitle>{label}</StyledFormTitle>
    <FormControl>
        <RadioGroup value={values.method} onChange={(e) => handleSelect("method", e.target.value)} >
          {METHODS.map(method => (
            <FormControlLabel value={method} key={method} control={<StyledRadio />} label={method} />
          ))}
        </RadioGroup>
      </FormControl>
  </StyledForm>
);
