import { USER_ROLE_ENUM } from "@/types";
import * as yup from "yup";

export const addAdminSchema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    role: yup
      .string()
      .oneOf(Object.values(USER_ROLE_ENUM), "Invalid role") // Only allow specific roles
      .required("Role is required"), 
  })
  .required();

export const editAdminSchema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    role: yup
      .string()
      .oneOf(Object.values(USER_ROLE_ENUM), "Invalid role") // Only allow specific roles
      .required("Role is required"), 
  })
  .required();
