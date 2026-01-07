import * as yup from "yup";

export const addSurveySchema = yup.object({
  block: yup.string().required("Block is required"),

  uid: yup.string().required("UID is required"),

  name: yup.string().required("Owner name is required"),

  s_o: yup.string().required("Father/Husband name is required"),

  road_name: yup.string().required("Road name is required"),

  h_no: yup.string().required("House / Flat number is required"),

  pin_code: yup
    .string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),

  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),

  property_type: yup.string().required("Property type is required"),

  building_name: yup.string().nullable(),

  unit_no: yup.string().required("Unit number is required"),

  pmidc: yup.string().required("PMIDC is required"),

  marla: yup
    .number()
    .typeError("Marla must be a number")
    .required("Marla is required"),

  yard: yup
    .number()
    .typeError("Yard must be a number")
    .required("Yard is required"),

  biswa: yup
    .number()
    .typeError("Biswa must be a number")
    .required("Biswa is required"),

  sqft: yup
    .number()
    .typeError("Sqft must be a number")
    .required("Sqft is required"),

  builtup_area_sqft: yup
    .number()
    .typeError("Builtup area must be a number")
    .required("Builtup area is required"),

  construction_type: yup.string().required("Construction type is required"),

  basement: yup.string().required("Basement selection is required"),

  property_use: yup.string().required("Property use is required"),

  construction_year: yup
    .number()
    .typeError("Construction year must be a number")
    .min(1800, "Invalid year")
    .max(new Date().getFullYear(), "Future year not allowed")
    .required("Construction year is required"),

  floors: yup.string().required("Floor count is required"),
});
