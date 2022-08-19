import { createValidationSchema } from "services/validations"
import { parseFormField } from "services/airtable"

export const useVerificationFormFields = ({ formFields }) => {
  return {
    sectionFormFields: parseFormField(formFields),
    validationSchema: createValidationSchema({ fields: formFields }),
  }
}
