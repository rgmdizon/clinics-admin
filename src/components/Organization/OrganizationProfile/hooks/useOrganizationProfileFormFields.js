import { createValidationSchema } from "services/validations"

let { parseFormField } = require("services/airtable")

export const useOrganizationProfileFormFields = ({ formFields }) => {
  return {
    sectionFormFields: parseFormField(formFields),
    validationSchema: createValidationSchema({ fields: formFields }),
  }
}
