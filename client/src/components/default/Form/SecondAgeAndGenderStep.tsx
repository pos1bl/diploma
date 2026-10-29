import { StyledForm, StyledFormCheckbox, StyledFormSubtitle, StyledRadio } from "@components/styled/default/form"
import { AGE_GROUPS } from "@models/ISpecialist";
import { Box, FormControl, FormControlLabel, FormGroup, RadioGroup } from "@mui/material"
import { GENDER_LIST, SecondStepProps } from "@utils/default/Form"
import { FC } from "react"

export const AgeAndGenderStep: FC<SecondStepProps> = ({ values, handleToggle, handleSelect }) => (
  <StyledForm>
    <Box>
      <StyledFormSubtitle>З ким тобі буде комфортніше працювати?</StyledFormSubtitle>
      <FormControl>
        <RadioGroup value={values.gender} onChange={handleSelect} >
          {GENDER_LIST.map(gender => (
            <FormControlLabel value={gender.value} key={gender.value} control={<StyledRadio />} label={gender.label} />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>

    <Box>
      <StyledFormSubtitle>З терапевтом якого віку тобі комфортніше працювати?</StyledFormSubtitle>
      <FormGroup>
        {AGE_GROUPS.map(a => (
          <FormControlLabel key={a} control={<StyledFormCheckbox checked={values.age.includes(a)} onChange={handleToggle("age", a)} />} label={a} />
        ))}
      </FormGroup>
    </Box>
    
  </StyledForm>
);
