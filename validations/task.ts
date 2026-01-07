import * as yup from "yup";

export const addTaskSchema = yup
  .object({
    name: yup.string().required("Name is required"),
  })
  .required();
