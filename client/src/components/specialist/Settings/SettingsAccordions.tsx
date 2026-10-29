import {
  AccordionDetails,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { FC, useState } from 'react';
import { StyledAccordion, StyledAccordionSummary } from '@components/styled/user/settings';
import { SettingProps } from '@utils/Settings';

export const SettingsAccordions:FC <SettingProps> = ({ settingsAccordions }) => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {settingsAccordions.map(({ id, title, render }) => (
        <StyledAccordion key={id} onChange={handleChange(id)} expanded={expanded === id}>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{title}</Typography>
          </StyledAccordionSummary>
          <AccordionDetails>{render()}</AccordionDetails>
        </StyledAccordion>
      ))}
    </>
  )
}
