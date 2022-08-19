import * as Yup from "yup"

const REQUIRED_MESSAGE = "This field is required."

export const addVaccineSchema = Yup.object().shape({
  vaccine: Yup.object().shape({
    value: Yup.string().required(REQUIRED_MESSAGE).typeError(REQUIRED_MESSAGE)
  }),
  brand: Yup.object().shape({
    value: Yup.string().required(REQUIRED_MESSAGE).typeError(REQUIRED_MESSAGE)
  }),
  orderingFor: Yup.string().required(REQUIRED_MESSAGE),
  quantity: Yup.number().required(REQUIRED_MESSAGE)
})

