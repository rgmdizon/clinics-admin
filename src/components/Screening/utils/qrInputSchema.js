import * as yup from "yup"

const REQUIRED_MESSAGE = "This field is required"

export const qrInputSchema = yup.object({
  enrollmentCode: yup.string().required(REQUIRED_MESSAGE),
})
