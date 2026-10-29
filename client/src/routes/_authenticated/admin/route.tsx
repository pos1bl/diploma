import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { checkPermission } from '@helpers/checkPermission';
import { Role } from '@models/IUser';

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: async ({ context }) => {
    const { user, isAuth } = context.stores.authStore;
    if (!isAuth || (user?.role && !checkPermission(user.role, [Role.ADMIN]))) {
      throw redirect({ to: '/' });
    }
  },
  component: Outlet,
})
