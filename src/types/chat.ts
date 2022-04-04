import { UserType } from './user';
import { DeepNullable } from './utilities';

export type ChatUserType = DeepNullable<
  Pick<UserType, 'account' | 'firstName' | 'lastName'>
>;
