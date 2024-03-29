/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

const minimumAge = new Date(
  new Date().setFullYear(new Date().getFullYear() - 7),
);

const maximumAge = new Date(
  new Date().setFullYear(new Date().getFullYear() - 120),
);

const ValidateUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, 'Doit être inférieure à 30 caractères')
    .required('Prénom requis'),
  lastName: Yup.string()
    .max(30, 'Doit être inférieure à 30 caractères')
    .required('Nom requis'),
  email: Yup.string()
    .email('Adresse email invalide')
    .required('Adresse email requise'),
  birthDate: Yup.date()
    .required('Date requise')
    .nullable()
    .max(minimumAge, 'Âge minimum de 7 ans requis')
    .min(maximumAge, 'Âge maximum de 120 ans'),
});

const ValidatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
    )
    .required('Mot de passe requis'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Les deux mots de passe doivent être identiques',
    )
    .required('Champ requis'),
});

export { ValidateUserSchema, ValidatePasswordSchema };
