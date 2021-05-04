import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, 'Doit être inférieure à 30 caractères')
    .required('Requis'),
  lastName: Yup.string()
    .max(30, 'Doit être inférieure à 30 caractères')
    .required('Requis'),
  email: Yup.string().email('Adresse email invalide').required('Requis'),
});

export default ValidationSchema;
