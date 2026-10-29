import { Card, Checkbox, MobileStepper, Radio, Slider, styled } from "@mui/material";

export const StyledForm = styled("main")({
  gap: '20px',
  display: "flex",
  flexDirection: 'column',
});

export const StyledFormTitle = styled("h2")({
  color: '#AC98D1',
  fontFamily: "24px",
  fontWeight: 700,
})

export const StyledFormSubtitle = styled("h2")({
  color: '#AC98D1',
  fontFamily: "19px",
  fontWeight: 700,
})

export const StyledFormBody = styled("p")({
  fontFamily: "18px",
  fontWeight: 400,
})

export const StyledFormNote = styled("p")({
  color: '#C2C2C2',
  fontFamily: "16px",
  fontWeight: 400,
})

export const StyledFormCheckbox = styled(Checkbox)({
  fontFamily: "18px",
  fontWeight: 400,
  color: "#AC98D1",

  '&.Mui-checked': {
    color: "#AC98D1",
  },
})

export const StyledRadio = styled(Radio)({
  '&.Mui-checked': {
    color: '#AC98D1',
  },
})

export const StyledStepper = styled(MobileStepper)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  '.MuiMobileStepper-backButton, .MuiMobileStepper-nextButton': {
    display: 'none',
  },

  '.MuiLinearProgress-root': {
    flex: 1,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  '.MuiLinearProgress-bar': {
    backgroundColor: '#8e44ad',
  },
})

export const StyledCard = styled(Card)({
    display: "flex",
    flexDirection: "column",
    width: "700px",
    margin: "0 auto",
    padding: "15px 100px 25px",
    minHeight: "800px",
    gap: "30px"
})

export const StyledSlider = styled(Slider)({
  color: '#AC98D1',
  height: 8,

  '& .MuiSlider-rail': {
    opacity: 0.3,
    backgroundColor: '#AC98D1',
  },
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#AC98D1',
  },
  '& .MuiSlider-thumb': {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    border: '2px solid #AC98D1',
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: '0 0 0 8px rgba(172,152,209,0.16)',
    },
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#AC98D1',
    height: 8,
    width: 2,
    '&.MuiSlider-markActive': {
      opacity: 1,
    },
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#AC98D1',
    color: '#fff',
  },
})
