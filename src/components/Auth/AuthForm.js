import { generateFormField } from "elements/Form/services/form"
import { isBrowser } from "services/general"

const AuthForm = ({ formFields, module, values }) => {
  let isSignupPage = false
  if (isBrowser()) {
    isSignupPage = window?.location?.pathname === "/sign-up" ? true : false
  }

  return formFields
    .filter((formField) => {
      return formField.inclusions.includes(module)
    })
    .map((formField) => {
      if (!formField?.referenceAnswer) {
        return generateFormField({
          values,
          formFields: formFields,
          formField: {
            ...formField,
            isRequired: formField?.required,
            isDisabled: isSignupPage && formField?.name === "email",
          },
        })
      }
      return null
    })
}

export default AuthForm
