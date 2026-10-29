import { Typography,  } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { USER_PAGES } from '@utils/NavigationList';
import { StyledSubtitle } from '@components/styled/base';
import { StyledSuccessImageBox, StyledPaymentSuccess } from '@components/styled/default/gifts';
import { ContainedButton } from '@components/shared/ContainedButton';

export const PaymentSuccess = () => (
  <StyledPaymentSuccess>
    <StyledSuccessImageBox>
      <img width="100%" src="/images/gifts/otter-success.png" alt="otter with gift" />
    </StyledSuccessImageBox>

    <StyledSubtitle >
      Дякуємо за покупку!
    </StyledSubtitle>

    <Typography variant="body1" sx={{ maxWidth: 480 }} textAlign="center">
      Ваша сесія з терапевтом успішна оплачена. На пошту Ви отримаєте всю інформацію про неї протягом кількох хвилин.
    </Typography>

    <Link to={USER_PAGES.APPOINTMENTS as '/user/appointments'}>
      <ContainedButton>
        Переглянути власні сесії
      </ContainedButton>
    </Link>
  </StyledPaymentSuccess>
);
