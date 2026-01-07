import { USER_ROLE_ENUM } from "@/types";
import * as yup from "yup";

export const addManagerSchema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    branch: yup.number().required("Branch is required"),
    position: yup.number().required("position is required"),
    role: yup
      .string()
      .oneOf([USER_ROLE_ENUM.MANAGER, USER_ROLE_ENUM.SENIOR_MANAGER], "Invalid role")
      .required("Role is required"), 
  })
  .required();

export const editManagerSchema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    branch: yup.number().required("Branch is required"),
    position: yup.number().required("Position is required"),
    role: yup
      .string()
      .oneOf([USER_ROLE_ENUM.MANAGER, USER_ROLE_ENUM.SENIOR_MANAGER], "Invalid role")
      .required("Role is required"), 
  })
  .required();
