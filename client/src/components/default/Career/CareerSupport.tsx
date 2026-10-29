import { Card, CardContent, Stack, Typography } from '@mui/material';
import { StyledSubtitle } from '@components/styled/base';

import { StyledSupport, StyledSupportImageBox, StyledInfoBlock } from '@components/styled/default/career';
import { SUPPORT_CARDS_LIST } from '@utils/default/Careerpage';

export const Support = () => {
  return (
    <StyledSupport>
      <StyledSupportImageBox>
        <img src="images/career/join-us.png" alt="підтримка" width="100%" />
      </StyledSupportImageBox>

      <StyledInfoBlock>
        <StyledSubtitle>Залишилися питання?</StyledSubtitle>

        <Typography variant="body1" textAlign="center" >
          Напишіть до нашої підтримки
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
          {SUPPORT_CARDS_LIST.map(({ id, title, icon: Icon, text, link }) => (
            <Card key={id} sx={{  borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} mb={1} color='#AC98D1'>
                  {title}
                </Typography>
                <a href={link} target='_blank'>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Icon fontSize="small" sx={{ color: '#AC98D1' }} />
                    <Typography variant="body2">{text}</Typography>
                  </Stack>
                </a>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </StyledInfoBlock>
    </StyledSupport>
  );
};
