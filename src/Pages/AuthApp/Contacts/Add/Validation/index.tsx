import * as Yup from 'yup';

const ValidateContactSchema = Yup.object().shape({
  email: Yup.string().email('Adresse email invalide'),
});

export { ValidateContactSchema };
