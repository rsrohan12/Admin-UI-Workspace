import * as yup from 'yup';

export const addClientTaskSchema = yup
  .object({
    clientId: yup.number().required(), // Making it required
    taskId: yup.number().required('Task number is required'),
    recurrenceNo: yup.number().required('Recurrence number is required'),
    recurrenceOption: yup.string().required('Choose one option is required'),
    recurrenceWeek: yup.string().required(), 
    hours: yup.number().required('Choose hours is required'),
    minutes: yup.number().required('Select minutes is required'),
    employeeId: yup.number().required('Choose an employee'), 
    positionId: yup.number().required('Position is required'),
    workDate: yup.string().required('Work date is required'),
    isRepeatingTask:yup.boolean().required('is it repeating or not ?')
  })
  .required();
