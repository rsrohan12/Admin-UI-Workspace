import * as yup from "yup";

export const addBlockSchema = yup
  .object({
    block_name: yup.string().required("Block name is required"),
    sort_number: yup.string().required("Sort number is required"),
  })
  .required();

export const editBlockSchema = yup
  .object({
    block_name: yup.string().required("Block name is required"),
    sort_number: yup.string().required("Sort number is required"),
  })
  .required();