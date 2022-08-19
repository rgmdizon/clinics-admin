import { createValidationSchema } from "services/validations"
import { parseFormField } from "services/airtable"

export const useRegistrationFormFields = ({ formFields }) => {
  return {
    sectionFormFields: parseFormField(formFields),
    validationSchema: createValidationSchema({ fields: formFields }),
  }
}
