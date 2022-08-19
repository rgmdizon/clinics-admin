import * as Yup from "yup"

export const contactUsValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("Please input a valid email")
    .required("This field is required"),
  subject: Yup.string().required("This field is required"),
  emailBody: Yup.string().required("This field is required"),
})

export const contactUsInitialValues = {
  "fullName": "",
  "email": "",
  "emailBody": "",
  "subject": ""
}