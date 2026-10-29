import { ContainedButton } from '@components/shared/ContainedButton';
import { StyledSubtitle } from '@components/styled/base';
import { StyledOptions } from '@components/styled/default/gifts';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { getPrice, GIFT_OPTIONS, GiftOption } from '@utils/default/Giftspage';
import { FC } from 'react';

type Props = {
  onSelect: (gift: GiftOption) => void;
};

export const Options: FC<Props> = ({ onSelect }) => {
  return (
    <StyledOptions>
      <StyledSubtitle color="#AC98D1">
        Оберіть формат подарунка
      </StyledSubtitle>

      <Grid container spacing={4} justifyContent="center">
        {GIFT_OPTIONS.map((option) => (
          <Grid key={option.id}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',
                borderRadius: '16px',
                px: 2,
                pt: 3,
                maxWidth: '330px',
                position: 'relative'
              }}
            >
              {option.discount > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#D1C4E9',
                    color: '#6A1B9A',
                    px: 2,
                    py: 0.5,
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    width: "60%"
                  }}
                >
                  -{option.discount}%
                </Box>
              )}
              <CardContent>
              <Typography variant="h1" fontWeight="bold" color="#AC98D1">
                  {option.amount}
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#AC98D1" gutterBottom>
                  {option.title}
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                  {getPrice(option.amount, option.discount)} грн
                </Typography>
                <Typography variant="body1" color="text.primary" gutterBottom>
                  {option.subtitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.description}
                </Typography>
              </CardContent>
              <Box px={2} pb={3}>
                <ContainedButton
                  fullWidth
                  sx={{ fontWeight: 'bold' }}
                  onClick={() => onSelect(option)}
                >
                  Подарувати
                </ContainedButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </StyledOptions>
  )
}
