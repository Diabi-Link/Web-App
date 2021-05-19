import { UserType } from './user';

export type RegisterType = Omit<UserType, 'id' | 'birthDate'> & {
  birthDate: UserType['birthDate'] | null;
};
