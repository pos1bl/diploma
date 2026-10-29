import Logo from "@components/shared/Logo";
import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  expirationDate: string;
  amount: number;
  to: string;
  from: string;
}

export const CertificateExample: FC<Props> = ({ expirationDate, amount, to, from }) => (
  <Paper
    elevation={4}
    sx={{
      p: 4,
      borderRadius: 3,
      boxShadow: '0px 4px 16px rgba(0,0,0,0.08)',
      height: '100%',
      bgcolor: '#F5F1FA',
    }}
  >
    <Box display="flex" justifyContent="center">
      <Logo width='150' />
    </Box>
    <Typography
      variant="h5"
      align="center"
      color="#AC98D1"
      fontWeight={700}
      mb={1}
    >
      Подарунковий сертифікат
    </Typography>
    <Typography
      variant="subtitle2"
      align="center"
      color="#AC98D1"
      mb={4}
    >
      {amount}{' '}
      сеанс{amount > 1 ? 'ів' : ''}
      {' '}з психотерапевтом на Платформі
    </Typography>

    <Box mb={4}>
      <Typography
        variant="body2"
        color="#AC98D1"
        fontWeight={600}
        gutterBottom
      >
        Для
      </Typography>
      <Box
        sx={{
          borderBottom: '2px solid #AC98D1',
          py: 0.5,
          mb: 2
        }}
      >
        <Typography variant="body1">{to || '—'}</Typography>
      </Box>

      <Typography
        variant="body2"
        color="#AC98D1"
        fontWeight={600}
        gutterBottom
      >
        Від
      </Typography>
      <Box
        sx={{
          borderBottom: '2px solid #AC98D1',
          py: 0.5
        }}
      >
        <Typography variant="body1">{from || '—'}</Typography>
      </Box>
    </Box>

    <Box mb={2}>
      <Typography variant="body2" color="#AC98D1" fontWeight={600}>
        КОД АКТИВАЦІЇ:{' '}
        <Box component="span" color="#8164B9" fontWeight={700}>
          XXXXXXXX
        </Box>
      </Typography>
    </Box>

    <Box display="flex" alignItems="center">
      <Box pt={2}>
        <Typography
          variant="subtitle2"
          color="#AC98D1"
          fontWeight={600}
        >
          Як скористатися сертифікатом:
        </Typography>
        <Typography variant="caption" display="block">
          • Заповни анкету та обери фахівця на сайті
        </Typography>
        <Typography variant="caption" display="block">
          • Вибери дату та час сеансу
        </Typography>
        <Typography variant="caption" display="block">
          • Під час бронювання введи код активації
        </Typography>
        <Typography variant="caption" display="block" mb={1}>
          • Підключись на сеанс та довірся фахівцю
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Сертифікат дійсний до {expirationDate}
        </Typography>
      </Box>

      <Box
        component="img"
        src="/images/gifts/otter-gift.png"
        alt="otter"
        sx={{
          width: "200px",
          height: "200px"
        }}
      />
    </Box>
  </Paper>
);
