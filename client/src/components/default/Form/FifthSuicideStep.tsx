import { StyledForm, StyledFormNote, StyledFormTitle, StyledRadio } from "@components/styled/default/form"
import { FormControl, FormControlLabel, RadioGroup } from "@mui/material"
import { FifthStepProps, IS_SUICIDIAL } from "@utils/default/Form"
import { FC } from "react"

export const IsSuicideStep: FC<FifthStepProps> = ({ values, label, handleSelect }) => (
  <StyledForm>
    <StyledFormTitle>{label}</StyledFormTitle>
    <FormControl>
      {/* @ts-ignore: onChange signature mismatches MUI’s expected (e, value: string) */}
      <RadioGroup value={values.is_suicidial} onChange={handleSelect} >
        {IS_SUICIDIAL.map(s => (
          <FormControlLabel value={s.value} key={s.label} control={<StyledRadio />} label={s.label} />
        ))}
      </RadioGroup>
    </FormControl>
    <StyledFormNote>
      Якщо у вас є потреба отримати екстрену безкоштовну психологічну допомогу, ви можете звернутися до наступних сервісів:
      <br />
      Лінія запобігання самогубствам і психологічної підтримки <b>Lifeline Ukraine 7333</b> 
      <br />
      Гаряча лінія психологічної допомоги жінкам <b>GenderStream 080-050-50-85</b>
      <br />
      Гаряча лінія психологічної допомоги ветеранам <b>війни 080-050-12-12</b>
      <br />
      Національна гаряча лінія для дітей та молоді <b>La Strada 080-050-02-25, 116-111</b>
    </StyledFormNote>

  </StyledForm>
);
