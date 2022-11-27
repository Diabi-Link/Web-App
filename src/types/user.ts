export type AccountType = 'patient' | 'referent' | 'medicalProfessional';

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  account: AccountType;
  phone?: string;
  isPaid: boolean;
  expire: string | null;
  ProductSub: string | null;
};
