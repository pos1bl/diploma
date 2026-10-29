import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';
import { Stores } from 'src/main'

type RouterContext = {
  stores: Stores;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()();

declare module '@tanstack/react-router' {
  interface Register {
    routerContext: RouterContext;
  }
}
