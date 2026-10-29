import { PaymentSuccess } from '@components/user/SessionPaymentSuccess'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/user/payment-success')({
  component: PaymentSuccess,
})
