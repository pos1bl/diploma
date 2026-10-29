import { Box, Typography, Stack, useMediaQuery } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { StyledInfo, StyledInfoPaper } from '@components/styled/default/gifts';

export const Info = () => {
  const isBig = useMediaQuery('(min-width:900px)');

  return (
    <StyledInfo>
      <Stack spacing={2} flex={1} flexGrow={2}>
        <StyledInfoPaper sx={{ alignSelf: 'flex-start' }}>
          <Stack spacing={2} alignItems="flex-start">
            <CalendarMonthIcon sx={{ fontSize: 32, color: '#AC98D1', mt: 0.5 }} />
            <Typography variant="body1">
              Кожен сертифікат діє протягом <strong>6 місяців</strong> (180 днів). За потреби термін можна подовжити — зверніться до служби підтримки. <strong>Зверніть увагу: подарунки не підлягають поверненню.</strong>
            </Typography>
          </Stack>
        </StyledInfoPaper>

        <StyledInfoPaper sx={{ alignSelf: 'flex-end' }}>
          <Stack spacing={2} alignItems="flex-start">
            <AutorenewIcon sx={{ fontSize: 32, color: '#AC98D1', mt: 0.5 }} />
            <Typography variant="body1">
              Сертифікат можна використати з будь-яким доступним фахівцем на платформі — кількість сесій визначається у подарунку.
            </Typography>
          </Stack>
        </StyledInfoPaper>
      </Stack>

      {isBig && <Box flex={1}>
        <img
          src="/images/gifts/otter-right.png"
          alt="видра з сертифікатом"
          style={{ width: '100%' }}
        />
      </Box>}
    </StyledInfo>
  );
};
