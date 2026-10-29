import { PaymentSuccess } from '@components/default/Gifts/GiftsPaymentSuccess'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/payment-success')({
  component: PaymentSuccess,
})
