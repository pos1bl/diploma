import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { TargetStep } from '@components/default/Form/FirstTargetStep'
import { OutlinedButton } from '@components/shared/OutlinedButton'
import { ContainedButton } from '@components/shared/ContainedButton'
import { StyledCard, StyledStepper } from '@components/styled/default/form'
import { FormValues, HandleGenderSelect, HandleSelect, HandleSlider, HandleSuicideSelect, HandleToggle, METHODS, steps } from '@utils/default/Form'
import { Gender } from '@models/ISpecialist'
import { AgeAndGenderStep } from '@components/default/Form/SecondAgeAndGenderStep'
import { SpecialNeedsStep } from '@components/default/Form/ThirdSpecialNeedsStep'
import { MethodStep } from '@components/default/Form/FourthMethodStep'
import { IsSuicideStep } from '@components/default/Form/FifthSuicideStep'
import { IssuesStep } from '@components/default/Form/SixthIssuesStep'
import { LoagingStep } from '@components/default/Form/SeventhLoadingStep'
import UserService from '@services/UserService'
import { useNavigate } from '@tanstack/react-router'

export function FindTherapistForm() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0)
  const [values, setValues] = useState<FormValues>({
    target: [],
    gender: Gender.ANY,
    age: [],
    specialNeeds: [],
    method: METHODS[0],
    is_suicidial: false,
    issues: {}
  })

  useEffect(() => {
     if (activeStep === steps.length - 1) {
      UserService.fetchFormSpecialists(values)
        .then((results) => {
          localStorage.setItem('find_results', JSON.stringify(results))
          navigate({ to: '/form/results' })
        })
    }
  }, [activeStep])

  const handleNext = async () => {
    if (activeStep !== steps.length-1) {
      setActiveStep(s => s + 1)
    }
  }
  const handleBack = () => setActiveStep(s => s - 1)

  const handleToggle:HandleToggle = (key, value) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    setValues(v => ({
      ...v,
      [key]: checked
        ? [...v[key], value]
        : v[key].filter(item => item !== value)
    }))
  }
  
  const handleGenderChange: HandleGenderSelect = (e, value) => {
    setValues(v => ({
      ...v,
      gender: value as Gender,
    }))
  }

  const handleSelect: HandleSelect = (key, value) => {
    setValues(v => ({
      ...v,
      [key]: value,
    }))
  }

  const handleSuicideSelect: HandleSuicideSelect = (e, value) => {
    setValues(v => ({
      ...v,
      is_suicidial: value,
    }))
  }

  const handleSlider: HandleSlider = (issue, value) => {
    setValues(v => ({
      ...v,
      issues: { ...v.issues, [issue]: value },
    }))
  }

  return (
    <StyledCard elevation={20}>
      <StyledStepper
        variant="progress"
        steps={steps.length}
        position="static"
        activeStep={activeStep}
        nextButton={<></>}
        backButton={<></>}
      />
      <Box display="flex" justifyContent="space-between" flexDirection="column" flexGrow={1}>
        {activeStep === 0 && <TargetStep values={values} handleToggle={handleToggle} label={steps[activeStep]} />}
        {activeStep === 1 && <AgeAndGenderStep values={values} handleToggle={handleToggle} handleSelect={handleGenderChange} />}
        {activeStep === 2 && <SpecialNeedsStep values={values} handleToggle={handleToggle} label={steps[activeStep]} />}
        {activeStep === 3 && <MethodStep values={values} handleSelect={handleSelect} label={steps[activeStep]} />}
        {activeStep === 4 && <IsSuicideStep values={values} handleSelect={handleSuicideSelect} label={steps[activeStep]} />}
        {activeStep === 5 && <IssuesStep values={values} handleSlider={handleSlider} label={steps[activeStep]} />}
        {activeStep === 6 && <LoagingStep label={steps[activeStep]} />}

        <Box mt={4} display="flex" justifyContent="space-between">
          <OutlinedButton disabled={activeStep===0 || activeStep===6} onClick={handleBack}>Назад</OutlinedButton>
          <ContainedButton onClick={handleNext} disabled={activeStep===6}>
            {activeStep === 5 ? 'Завершити' : 'Далі'}
          </ContainedButton>
        </Box>
      </Box>
    </StyledCard>
  )
}
