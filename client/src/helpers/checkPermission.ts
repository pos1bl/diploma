import { Role } from '@models/IUser';

export const checkPermission = (role: Role, avilableRoles: Role[] = []) => {
  if (!role) return false;
  avilableRoles.push(Role.ADMIN);
  return avilableRoles.includes(role);
};
