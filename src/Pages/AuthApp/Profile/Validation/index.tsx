import * as Yup from 'yup';

const ValidateProfileSchema = Yup.object().shape({
  firstName: Yup.string().max(30, 'Doit être inférieure à 30 caractères'),
  lastName: Yup.string().max(30, 'Doit être inférieure à 30 caractères'),
  email: Yup.string().email('Adresse email invalide'),

  birthDate: Yup.date().nullable(),
});

export { ValidateProfileSchema };
