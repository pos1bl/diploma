import { SESSION_STATUSES } from '@models/ISession';
import { CalendarPage } from '@pages/specialist/CalendarPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/specialist/calendar')({
  beforeLoad: async ({ context }) => {
    const { sessionStore, authStore } = context.stores;

    await sessionStore.fetchSessions(authStore.user.role, { status: [SESSION_STATUSES.COMPLETED, SESSION_STATUSES.SCHEDULED] });
  },
  component: CalendarPage,
})
