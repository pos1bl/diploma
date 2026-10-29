import { checkPermission } from '@helpers/checkPermission';
import { Role } from '@models/IUser';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/specialist')({
  beforeLoad: async ({ context }) => {
    const { user, isAuth } = context.stores.authStore;
    if (!isAuth || (user?.role && !checkPermission(user.role, [Role.SPECIALIST]))) {
      throw redirect({ to: '/' });
    }
  },
  component: Outlet,
})
