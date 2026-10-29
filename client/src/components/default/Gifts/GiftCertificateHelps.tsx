import { ContainedButton } from '@components/shared/ContainedButton';
import { StyledSubtitle } from '@components/styled/base';
import { StyledCertificateHelps } from '@components/styled/default/gifts';
import { Typography, Grid, Paper, useMediaQuery } from '@mui/material';
import { CERIFICATE_HELPS_LIST, SectionProps } from '@utils/default/Giftspage';
import { FC } from 'react';

export const CertificateHelps:FC<SectionProps> = ({ onScrollToOptions }) => {
  const isBig = useMediaQuery('(min-width:900px)');

  return (
    <StyledCertificateHelps>
      <StyledSubtitle>
        Чим може допомогти подарунковий сертифікат?
      </StyledSubtitle>

      <Grid container spacing={4} columns={2} justifyContent="center" maxWidth="1300px">
        {CERIFICATE_HELPS_LIST.map(item => (
          <Grid key={item.id} size={isBig ? 1 : 2}>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: '#F5F1FA',
                borderRadius: 2,
                px: 3,
                py: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                height: '100%',
              }}
            >
              <Typography fontSize={36}>{item.emoji}</Typography>
              <Typography textAlign="center" variant="h5" width="100%">
                {item.text}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <ContainedButton onClick={onScrollToOptions}>
        Обрати сертифікат
      </ContainedButton>
    </StyledCertificateHelps>
  );
};
