import { createValidationSchema } from "./validations"
import { parseFormField } from "./airtable"

export const parseForm = ({ formFields }) => {
  return {
    sectionFormFields: parseFormField(formFields),
    validationSchema: createValidationSchema({ fields: formFields }),
  }
}
