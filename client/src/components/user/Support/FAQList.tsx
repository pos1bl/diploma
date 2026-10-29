import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { FAQ_DATA, FAQItem } from '@utils/user/Supportpage'
import { StyledSubtitle } from '@components/styled/base';
import { useState } from 'react';

export const FAQList = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <StyledSubtitle sx={{ mb: 2 }}>
        Найчастіші питання
      </StyledSubtitle>

      {FAQ_DATA.map((item: FAQItem) => (
        <Accordion
          key={item.question}
          sx={{
            mb: 1,
            border: `1px solid #AC98D1`,
            boxShadow: 'none',
            '&:before': { display: 'none' },
          }}
          onChange={handleChange(item.question)}
          expanded={expanded === item.question}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#AC98D1"}} />}>
            <Typography>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
};
