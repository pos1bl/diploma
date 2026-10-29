import { AppointmentsPage } from '@pages/specialist/AppointmentsPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/specialist/clients/$clientId/appointments')(
  {
    component: AppointmentsPage,
    loader: async ({ params, context, location }) => {
      const { sessionStore, authStore } = context.stores;
      const { search } = location;

      await sessionStore.fetchSessions(
        authStore.user.role,
        {
          ...search,
          clientId: params.clientId
        }
      )
    },
  },
)
