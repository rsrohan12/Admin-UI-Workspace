import * as yup from "yup";

export const addColonySchema = yup
  .object({
    colony_name: yup.string().required("Colony name is required"),
    marla: yup.string().required("Marla is required"),
  })
  .required();

export const editColonySchema = yup
  .object({
    colony_name: yup.string().required("Colony name is required"),
    marla: yup.string().required("Marla is required"),
  })
  .required();