import * as Yup from 'yup';

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
  birthDate: Yup.date().required('Date requise').nullable(),
});

const ValidatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Mot de passe trop court')
    .max(20, 'Doit être inférieure à 20 caractères')
    .required('Mot de passe requis'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Les deux mots de passe doivent être identiques',
    )
    .required('Champ requis'),
});

export { ValidateUserSchema, ValidatePasswordSchema };
