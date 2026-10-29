import { AppointmentPage } from '@pages/user/AppointmentPage'
import SessionsService from '@services/SessionsService'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/user/appointments/$appointmentId')({
   beforeLoad: async ({ params, context }) => {
    const { stores } = context;
    const { user } = stores.authStore;
    const session = await SessionsService.fetchSession(user.role, params.appointmentId)
    if (!session || session.user !== user.id) {
      throw redirect({ to: '/user' })
    }
    return { session }
  },
  component: AppointmentPage,
})
