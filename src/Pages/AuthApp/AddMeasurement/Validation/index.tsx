import * as Yup from 'yup';

const ValidateProfileSchema = Yup.object().shape({
  bloodSugarLevels: Yup.number(),
});

export { ValidateProfileSchema };
