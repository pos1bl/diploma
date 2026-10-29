import { AppointmentsPage } from '@pages/user/AppointmentsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/user/appointments/')({
  component: AppointmentsPage,
  loader: async ({ context, location }) => {
    const { sessionStore, authStore } = context.stores;
    const { search } = location;

    await sessionStore.fetchSessions(
      authStore.user.role,
      search
    )
  },
})
