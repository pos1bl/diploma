import NotFoundPage from '@components/shared/NotFoundPage';
import ErrorPage from '@components/shared/ErrorPage';

import { createRouter } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const router = createRouter({
  routeTree,
  context: { stores: undefined!, queryClient: undefined! },
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorPage,
});

export default router;
