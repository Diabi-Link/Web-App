import * as Yup from 'yup';

const ValidateProfileSchema = Yup.object().shape({
  bloodSugarLevels: Yup.number()
    .min(0.1, 'La mesure doit être au minimum à 0.10 g/L')
    .max(5.0, 'La mesure doit être au maxium à 5.00 g/L'),
});

export { ValidateProfileSchema };
