import * as Yup from 'yup';

const minimumAge = new Date(
  new Date().setFullYear(new Date().getFullYear() - 7),
);

const maximumAge = new Date(
  new Date().setFullYear(new Date().getFullYear() - 120),
);

const ValidateProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Doit être supérieur à 2 caractères')
    .max(30, 'Doit être inférieur à 30 caractères')
    .matches(/^[a-zA-Z\u00C0-\u00FF]*$/, 'Contient des caractères invalides'),
  lastName: Yup.string()
    .min(2, 'Doit être supérieur à 2 caractères')
    .max(30, 'Doit être inférieure à 30 caractères')
    .matches(/^[a-zA-Z\u00C0-\u00FF]*$/, 'Contient des caractères invalides'),
  email: Yup.string().email('Adresse email invalide'),
  birthDate: Yup.date()
    .max(minimumAge, 'Âge minimum de 7 ans requis')
    .min(maximumAge, 'Âge maximum de 120 ans')
    .nullable(),
  newPassword: Yup.string()
    .min(8, 'Mot de passe trop court')
    .max(20, 'Doit être inférieure à 20 caractères'),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Les deux mots de passe doivent être identiques',
  ),
  phone: Yup.string().matches(/^((\+)33|0)[1-9](\d{2}){4}$/, 'Numéro invalide'),
});

export { ValidateProfileSchema };
