import * as Yup from 'yup';

const ValidateMailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Adresse email invalide')
    .required('Adresse email requise'),
});

const ValidateResetSchema = Yup.object().shape({
  code: Yup.string().required('Code requis'),
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

export { ValidateMailSchema, ValidateResetSchema };
