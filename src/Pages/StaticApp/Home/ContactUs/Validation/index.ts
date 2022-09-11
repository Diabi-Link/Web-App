import * as Yup from 'yup';

const ValidateContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, 'Doit être inférieure à 30 caractères')
    .required('Prénom requis'),
  lastName: Yup.string()
    .max(30, 'Doit être inférieure à 30 caractères')
    .required('Nom requis'),
  email: Yup.string()
    .email('Adresse email invalide')
    .required('Adresse email requise'),
  topic: Yup.string().required(),
  message: Yup.string().required(),
});

export { ValidateContactSchema };
