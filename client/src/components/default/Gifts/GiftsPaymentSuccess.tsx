import { Typography,  } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { DEFAULT_PAGES } from '@utils/NavigationList';
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
      Ваш подарунковий сертифікат успішно оплачено. PDF із сертифікатом буде згенерований 
      і надісланий на пошту одержувача протягом кількох хвилин.
    </Typography>

    <Link to={DEFAULT_PAGES.GIFTS as '/gifts'}>
      <ContainedButton>
        Повернутися до подарунків
      </ContainedButton>
    </Link>
  </StyledPaymentSuccess>
);
