export interface IUser {
  email: string;
  isActivated: boolean;
  isVictim: boolean;
  id: string;
  role: Role;
  name: string;
}

export type Client = Omit<IUser, 'id'> & { completedSessions: number, _id: string }

export enum Role {
  USER = 'user',
  SPECIALIST = 'specialist',
  ADMIN = 'admin'
}
