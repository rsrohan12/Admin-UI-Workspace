import * as yup from "yup";

export const addRoleSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    active: yup.string().required("Active is required"),
  })
  .required();

  export const addOnSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    number_of_addon: yup.string().required("Number of addon is required"),
    price: yup.string().required("Price is required"),
    type: yup.string().required("Type is required"),
  })
  .required();
