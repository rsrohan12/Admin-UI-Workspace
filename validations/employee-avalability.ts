import * as yup from 'yup';

export const addEmployeeAvalabilitySchema = yup
  .object({
    selected_date: yup.array().of(yup.string()).required(),
    selected_reason: yup.number().required('selected_reason is required'),
  })
  .required();
