import { checkPermission } from '@helpers/checkPermission';
import { Role } from '@models/IUser';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/user')({
  beforeLoad: async ({ context }) => {
    const { user, isAuth } = context.stores.authStore;
    if (!isAuth || (user?.role && !checkPermission(user.role, [Role.USER]))) {
      throw redirect({ to: '/' });
    }
  },
  component: Outlet,
})
