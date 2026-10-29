import { ContainedButton } from "@components/shared/ContainedButton";
import { OutlinedButton } from "@components/shared/OutlinedButton";
import { PaymentPriceText } from "@components/shared/PaymentPriceText";
import { StyledBox, StyledSidepanelTitle } from "@components/styled/default/specialist";
import { getSlotRange } from "@helpers/getSlotRange";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { Dayjs } from "dayjs";
import { Dispatch, FC, SetStateAction, useState } from "react";
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GiftService from "@services/GiftService";
import { IGift } from "@models/IGift";
import SessionsService from "@services/SessionsService";
import { useAuthStore } from "@hooks/useStore";
import AuthService from "@services/AuthService";
import { GIFT_OPTIONS } from "@utils/default/Giftspage";
import { IFreeSessionPayload, IGiftSessionPayload, ISessionPayload } from "@models/ISession";
import { useNavigate } from "@tanstack/react-router";
import { USER_PAGES } from "@utils/NavigationList";
import { toast } from "react-toastify";

type Props = {
  selectedDate: Dayjs,
  selectedSlot: string,
  setSelectedSlot: Dispatch<SetStateAction<string>>,
  specialistId: string
};

export const PaymentPanel:FC<Props> = ({ setSelectedSlot, selectedSlot, selectedDate, specialistId }) => {
  const navigate = useNavigate();
  const { user, updateUserInfo } = useAuthStore();
  const [gift, setGift] = useState<IGift | null>(null);
  const [showActivationPrompt, setShowActivationPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  
  const handleBuy = async () => {
    setIsLoading(true)
    try {
      const updatedUser = await updateUserInfo();

      if (!updatedUser?.isActivated) {
        setShowActivationPrompt(true);
        return toast.error('Підтвердіть свою електронну адресу, щоб завершити покупку.', { position: "bottom-right" })
      }

      const base = {
        selectedDate,
        selectedSlot,
        specialistId,
      };

      if (gift) {
        const giftPayload: IGiftSessionPayload = { ...base, giftId: gift._id }

        await SessionsService.createGiftSession(giftPayload);
        return navigate({ to: USER_PAGES.SUCCESS_PAYMENT as "/user/payment-success" })
      } else if (user.isVictim) {
        const freePayload: IFreeSessionPayload = { ...base }

        await SessionsService.createFreeSession(freePayload);
        return navigate({ to: USER_PAGES.SUCCESS_PAYMENT as "/user/payment-success" })
      }

      const giftOption = GIFT_OPTIONS.find(g => g.amount === 1);
      if (!giftOption) throw new Error('No gift option found');

      const paidPayload: ISessionPayload = { ...base, priceId: giftOption.priceId! }

      const { data } = await SessionsService.createSessionPaymentLink(paidPayload);
        
      window.location.href = `${data.url}?prefilled_email=${user.email}`;
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues: {
      code:  '',
    },
    onSubmit: async ({ value }) => {
      const gift = await GiftService.fetchGift(value.code);
      setGift(gift);
    }
  });

  return (
    <StyledBox>
      <StyledSidepanelTitle>
        Метод оплати
      </StyledSidepanelTitle>

      <Divider />

      <StyledBox alignItems="center">
          <Typography display="flex" gap={0.5}><EventIcon sx={{ color: "#AC98D1" }} />{selectedDate.locale('uk').format('DD.MM.YYYY')}</Typography>
          <Typography display="flex" gap={0.5}><ScheduleIcon sx={{ color: "#AC98D1" }} />{getSlotRange(selectedSlot)}</Typography>
        </StyledBox>

      <Divider />

      {!user.isVictim && (<>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="subtitle1" fontWeight={600}>Маю промокод!</Typography>

            <Field name="code" validators={{ onSubmit: ({ value }) => !value && 'Обовʼязкове поле' }}>
              {(field) => (
                <TextField
                label="Вкажіть промокод"
                fullWidth
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                error={!!field.state.meta.errors.length}
                disabled={!!gift}
                helperText={field.state.meta.errors[0] || (!!gift && `За промокодом успішно знайдено сертифікат! У вас залишилось ${gift.amount} ${gift.amount > 5 ? "сесій" : gift.amount < 2 ? "сесія" : "сесії"}. Термін використання до ${gift.expirationDate}`)}
              />
              )}
            </Field>
            
            <Subscribe selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <ContainedButton sx={{ alignSelf: 'flex-end' }}  type="submit" disabled={!canSubmit || isSubmitting || gift}>
                  {isSubmitting ? 'Обробка...' : 'Застосувати'}
                </ContainedButton>
              )}
            </Subscribe>
          </Box>
        </form>

        <Divider />
      </>)}

      <PaymentPriceText price={gift || user.isVictim ? 0 : 1000} />

      <Box display="flex" gap={1} flexWrap="wrap" justifyContent="flex-end">
        <OutlinedButton sx={{ px: 3 }} onClick={() => setSelectedSlot("")}> Назад</OutlinedButton>
        <ContainedButton
          sx={{ px: 3 }}
          onClick={handleBuy}
          disabled={showActivationPrompt}
          loading={isLoading}
        >
          Придбати сеанс
        </ContainedButton>
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
                  console.error(e)
                }
              }}
            >
              Надіслати ще раз
            </Button>
          </Box>
        )}
      </Box>
    </StyledBox>
  )
}
