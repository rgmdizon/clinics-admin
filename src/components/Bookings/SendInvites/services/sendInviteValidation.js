import * as Yup from "yup"

export const sendInviteValidation = () => {
  return Yup.object().shape({
    emails: Yup.array().of(Yup.string().email("Please enter a valid email")),
  })
}
