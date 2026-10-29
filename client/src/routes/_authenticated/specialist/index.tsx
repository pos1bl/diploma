import { HomePage } from '@pages/specialist/HomePage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/specialist/')({
  component: HomePage,
  loader: async ({ context, location }) => {
    const { sessionStore, authStore } = context.stores;
    const { search } = location;

    await sessionStore.fetchSessions(
      authStore.user.role,
      search
    )
  },
})
