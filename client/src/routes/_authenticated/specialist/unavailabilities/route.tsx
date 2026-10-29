import { SESSION_STATUSES } from '@models/ISession';
import { UnavailabilityPage } from '@pages/specialist/UnavailabilityPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/specialist/unavailabilities',
)({
  beforeLoad: async ({ context }) => {
    const { sessionStore, authStore } = context.stores;

    await sessionStore.fetchSessions(authStore.user.role, { status: [SESSION_STATUSES.SCHEDULED] });
  },
  component: UnavailabilityPage,
})
