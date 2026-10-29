import { ContainedButton } from '@components/shared/ContainedButton';
import { StyledSubtitle } from '@components/styled/base';
import { StyledSteps } from '@components/styled/default/gifts';
import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import { SectionProps, STEPS_LIST } from '@utils/default/Giftspage';
import { FC } from 'react';

export const Steps:FC<SectionProps> = ({onScrollToOptions}) => {
  const isArrows = useMediaQuery('(min-width:900px)');

  return (
    <StyledSteps>
      <StyledSubtitle>Як це працює?</StyledSubtitle>
      <Grid container justifyContent="center">
        {STEPS_LIST.map(({ id, image, text }) => (
          <Grid key={id} sx={{ position: 'relative' }}>
            <Box textAlign="center" mr={id === STEPS_LIST.length || !isArrows ? 0 : 2} ml={id === 1 || !isArrows ? 0 : 2}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(168, 145, 210, 0.35)',
                  mx: 'auto',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img src={image} alt={`Крок ${id}`} width={120} height={120} />
              </Box>
              <Typography variant="body1" sx={{ maxWidth: 250, mx: 'auto' }}>{text}</Typography>
            </Box>
            {id < STEPS_LIST.length && isArrows && (
              <Box
                sx={{
                  position: 'absolute',
                  right: '-20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1
                }}
              >
                <img src="images/gifts/icons/arrow-right.svg" alt="arrow" width={40} height={40} />
              </Box>
            )}
          </Grid>
        ))}
      </Grid>

      <ContainedButton onClick={onScrollToOptions}>Обрати сертифікат</ContainedButton>
    </StyledSteps>
  )
};
