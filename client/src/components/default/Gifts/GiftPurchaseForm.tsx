import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import { useForm } from '@tanstack/react-form';
import { getPrice, GiftOption } from '@utils/default/Giftspage';
import { useAuthStore } from '@hooks/useStore';
import { FC, useMemo, useState } from 'react';
import { ContainedButton } from '@components/shared/ContainedButton';
import AuthService from '@services/AuthService';
import { StyledSubtitle } from '@components/styled/base';
import { OutlinedButton } from '@components/shared/OutlinedButton';
import GiftService from '@services/GiftService';
import { CertificateExample } from './GiftCertificateExample';
import { PaymentPriceText } from '@components/shared/PaymentPriceText';

interface Props {
  gift: GiftOption;
  onBack: () => void;
}

export const PurchaseForm: FC<Props> = ({ gift, onBack }) => {
  const { user, updateUserInfo } = useAuthStore();
  const [showActivationPrompt, setShowActivationPrompt] = useState(false);

  const price = getPrice(gift.amount, gift.discount);

  const expirationDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 180);
    return d.toLocaleDateString('uk-UA');
  }, []);
  
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      email: user.email || '',
      to: '',
      from: '',
    },
    onSubmit: async ({ value }) => {
      const updatedUser = await updateUserInfo();

      if (!updatedUser?.isActivated) {
        return setShowActivationPrompt(true);
      }

      const { data } = await GiftService.createGiftPaymentLink({
        to: value.to,
        from: value.from,
        priceId: gift.priceId,
        email: value.email,
        expirationDate,
        userId: user.id,
        amount: gift.amount
      });

      window.location.href = `${data.url}?prefilled_email=${value.email}`;
    }
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-evenly"
        alignItems="center"
        gap={6}
      >
        <Box width="50%">
          <StyledSubtitle sx={{ marginBottom: "30px" }}>
            Будь ласка, заповніть дані для купівлі сертифікату
          </StyledSubtitle>

          <Box display="flex" flexDirection="column" gap={3}>
            <Field name="email">
              {(field) => (
                <Box>
                  <TextField
                    label="Твій email"
                    type="email"
                    fullWidth
                    disabled
                    value={field.state.value}
                    error={!!field.state.meta.errors.length || showActivationPrompt}
                    helperText={field.state.meta.errors[0] || showActivationPrompt && 'Підтвердіть свою електронну адресу, щоб завершити покупку.'}
                  />

                  {showActivationPrompt && (
                    <Box mt={1} display="flex" gap={1} alignItems="center">
                      <Typography variant="caption" color="text.secondary">
                        Не прийшов лист?
                      </Typography>
                      <Button
                        size="small"
                        sx={{ textTransform: 'none', color: '#AC98D1', fontWeight: 500, p: 0, minWidth: 'fit-content' }}
                        onClick={async () => {
                          try {
                            await AuthService.resendActivation(user.email);
                            setShowActivationPrompt(false);
                          } catch (e) {
                          }
                        }}
                      >
                        Надіслати ще раз
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Field>

            <Field
              name="to"
              validators={{ onChange: ({ value }) => !value && 'Обовʼязкове поле' }}
            >
              {(field) => (
                <TextField
                  label="Для кого"
                  fullWidth
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={!!field.state.meta.errors.length}
                  helperText={field.state.meta.errors[0]}
                />
              )}
            </Field>

            <Field
              name="from"
              validators={{ onChange: ({ value }) => !value && 'Обовʼязкове поле' }}
            >
              {(field) => (
                <TextField
                  label="Від кого"
                  fullWidth
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={!!field.state.meta.errors.length}
                  helperText={field.state.meta.errors[0]}
                />
              )}
            </Field>

            <Divider />

            <PaymentPriceText price={price} />

            <Box display="flex" gap={2} flexWrap="wrap" justifyContent="flex-end">
              <OutlinedButton onClick={onBack}> Назад</OutlinedButton>
              <Subscribe selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <ContainedButton type="submit" disabled={!canSubmit || isSubmitting}>
                    {isSubmitting ? 'Обробка...' : 'Оплатити'}
                  </ContainedButton>
                )}
              </Subscribe>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Subscribe
            selector={({ values }) => [
              values.to,
              values.from,
            ]}
          >
            {([to, from ]) => <CertificateExample to={to} from={from} amount={gift.amount} expirationDate={expirationDate} />}
          </Subscribe>

          <Typography mt={2} variant="body1" color="textSecondary">
            Так буде виглядати сертифікат
          </Typography>
        </Box>
      </Box>
    </form>
  );
};
