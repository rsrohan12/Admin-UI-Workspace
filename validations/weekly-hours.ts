import * as Yup from 'yup';

export const addWeeklyHoursSchema = Yup.object().shape({
  monday: Yup.number().min(0).required('Monday hours are required'),
  tuesday: Yup.number().min(0).required('Tuesday hours are required'),
  wednesday: Yup.number().min(0).required('Wednesday hours are required'),
  thursday: Yup.number().min(0).required('Thursday hours are required'),
  friday: Yup.number().min(0).required('Friday hours are required'),
  saturday: Yup.number().min(0).required('Saturday hours are required'),
  sunday: Yup.number().min(0).required('Sunday hours are required'),
  totalHours: Yup.number().min(0).required('Total hours are required'),
});
