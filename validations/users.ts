import * as yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { asyncDebounce } from "@/utils";

const verifyPhone = async (value: string, values: yup.TestContext<any>) => {
  try {
    const data = await isValidPhoneNumber(value);
    return data;
  } catch (e) {
    return true;
  }
};

const debounceVerifyPhone = asyncDebounce(verifyPhone, 300);

export const addUserSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    full_name: yup.string().required("Full name is required"),
    role: yup.string().required("Role is required"),
    address: yup.string().required("Address is required"),
    active: yup.string().required("Active is required"),
    contact_number: yup
      .string()
      .required("Contact number is required")
      .test("verified", "Please enter a valid phone", async (value, values) => {
        const verified = await debounceVerifyPhone(value as string, values);
        return verified as boolean;
      }),
    password: yup.string().required("Password is required"),
  })
  .required();

export const editUserSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    full_name: yup.string().required("Full name is required"),
    role: yup.string().required("Role is required"),
    address: yup.string().required("Address is required"),
    active: yup.string().required("Active is required"),
    contact_number: yup
      .string()
      .required("Contact number is required")
      .test("verified", "Please enter a valid phone", async (value, values) => {
        const verified = await debounceVerifyPhone(value as string, values);
        return verified as boolean;
      }),
  })
  .required();

  export const editUserProfileSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup.string().min(6, 'Password must be at least 6 characters'),
  })
  .required();
