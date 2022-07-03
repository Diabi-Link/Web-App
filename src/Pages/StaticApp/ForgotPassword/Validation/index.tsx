/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

const ValidateMailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Adresse email invalide')
    .required('Adresse email requise'),
});

const ValidateResetSchema = Yup.object().shape({
  code: Yup.string().required('Code requis'),
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

export { ValidateMailSchema, ValidateResetSchema };
