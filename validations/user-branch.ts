import * as yup from "yup";

export const addBranchSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().optional(),  // description is optional
    active: yup.string().required("Active is required"),
  })
  .required();
