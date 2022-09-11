import * as Yup from 'yup';

const ValidateProfileSchema = Yup.object().shape({
  bloodSugarLevels: Yup.number()
    .transform((o, v) => {
      return parseFloat(v.replace(/,/g, '.'));
    })
    .min(0.1, 'La mesure doit être supérieure ou égale à 0.10 g/L')
    .max(5.0, 'La mesure doit être inférieure ou égale à 5.00 g/L'),
});

export { ValidateProfileSchema };
