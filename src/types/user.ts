export type AccountType = 'patient' | 'referent' | 'medicalProfessional';

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  account: AccountType;
  phone?: string;
  picture?: string;
};
