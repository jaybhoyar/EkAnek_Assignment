import * as yup from "yup";

export const INITIAL_FORM_VALUES = {
  title: "",
  description: "",
  file: "",
};

export const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  file: yup.mixed().required("File is required")
});