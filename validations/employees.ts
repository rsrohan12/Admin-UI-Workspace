import * as yup from "yup";

export const addEmployeeSchema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    branch: yup.number().required("Branch is required"),
    role: yup.string().required("Role is required"),
    position: yup.number().required("Position is required"),
    hourly_cost: yup.number().required("Hourly cost is required"),
    minute_cost: yup.number().required("minute cost is required"),
    individual_report: yup.array().of(yup.number()).notRequired(), 
  })
  .required();


  export const editEmployeeSchema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    branch: yup.number().required("Branch is required"),
    role: yup.string().required("Role is required"),
    position: yup.number().required("Position is required"),
    hourly_cost: yup.number().required("Hourly cost is required"),
    minute_cost: yup.number().required("minute cost is required"),
    individual_report: yup.array().of(yup.number()).notRequired(), 
  })
  .required();
