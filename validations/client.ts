import * as yup from 'yup';

export const addClientSchema = yup.object({
  client_name: yup.string().required("Client name is required"),
  branch_id:yup.number().required("branch is required"),
  monthly_invoice_Value: yup.number().required("Monthly invoice value is required"),
  managers:  yup.array().of(yup.number()).required("choose atleast one manager"),
  start_date: yup.string().required("Start date is required"),
  end_date: yup
  .string()
  .optional() // Allows undefined values

}).required();

export const editClientSchema = yup.object({
  client_name: yup.string().required("Client name is required"),
  branch_id:yup.number().required("branch is required"),
  monthly_invoice_Value: yup.number().required("Monthly invoice value is required"),
  managers:  yup.array().of(yup.number()).required("choose atleast one manager"),
  start_date: yup.string().required("Start date is required"),
  end_date: yup
  .string()
  .optional() // Allows undefined values
  .test(
    'is-valid-or-empty',
    'Invalid date format',
    (value) => value === '' || !value || !isNaN(Date.parse(value)) // Allow '' or valid date
  ),


}).required();
