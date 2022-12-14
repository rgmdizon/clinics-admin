import { createValidationSchema } from "services/validations"

let { parseFormField } = require("services/airtable")

export const useBookingFormFields = ({ formFields }) => {
  return {
    sectionFormFields: parseFormField(formFields),
    validationSchema: createValidationSchema({ fields: formFields }),
  }
}
