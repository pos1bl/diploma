import { AppointmentPage } from '@pages/specialist/AppointmentPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/specialist/appointment/$appointmentId',
)({
  component: AppointmentPage,
})
