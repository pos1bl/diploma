import { PaymentSuccess } from '@components/default/Gifts/GiftsPaymentSuccess'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/gifts/payment-success')({
  component: PaymentSuccess,
})
