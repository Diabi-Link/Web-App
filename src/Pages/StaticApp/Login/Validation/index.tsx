import * as Yup from 'yup';

const ValidateLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Adresse email invalide')
    .required('Adresse email requise'),
  password: Yup.string()
    .min(8, 'Mot de passe trop court')
    .max(20, 'Doit être inférieure à 20 caractères')
    .required('Mot de passe requis'),
});

export { ValidateLoginSchema };
