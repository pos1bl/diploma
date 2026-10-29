import { StyledHowItWorks } from "@components/styled/default/homepage";
import { StyledSubtitle } from '@components/styled/base';
import { Box, Typography, Paper } from "@mui/material";
import { HOWITWORKS_LIST } from "@utils/default/Homepage";

export const HowItWorks = () => (
  <StyledHowItWorks>
    <StyledSubtitle>Як це працює?</StyledSubtitle>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center'}}>
      {HOWITWORKS_LIST.map(({ step, title, description }) => (
        <Paper key={step} elevation={3} sx={{ p: 4, height: '100%', borderRadius: 3, width: "700px"}}>
          <Typography variant="h5" gutterBottom>
            {step}. {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Paper>
      ))}
    </Box>
  </StyledHowItWorks>
);
