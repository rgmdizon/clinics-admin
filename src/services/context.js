import { isBrowser } from "services/general"
import { parse, stringify } from "flatted/esm"

export const generateInitialValues = ({ fields }) => {
  let initialValues = {}

  for (let field of fields) {
    switch (field.type) {
      case "checkbox":
      case "multiselect":
        initialValues[field.name] = []
        break

      case "number":
        initialValues[field.name] = ""
        break

      case "schedule":
        initialValues[field.name] = {}
        for (let fieldName of field.fieldNames) {
          initialValues[field.name][fieldName] = ""
        }
        break

      case "select":
        let initialValue = field.initialValues || ""

        initialValues[field.name] = {
          label: initialValue,
          value: initialValue,
        }
        break

      case "calendar":
        initialValues[field.name] = ""
        break

      case "date":
        initialValues[field.name] = {
          month: {
            label: "",
            value: "",
          },
          date: {
            label: "",
            value: "",
          },
          year: "",
        }
        break

      case "address":
        let addressInitialValues = {}
        if (field.initialValues) {
          addressInitialValues = JSON.parse(field.initialValues)
        }
        initialValues[field.name] = {
          city: addressInitialValues.city || {
            label: "",
            value: "",
          },
          province: addressInitialValues.province || {
            label: "",
            value: "",
          },
          siteName: addressInitialValues.siteName || {
            label: "",
            value: "",
          },
          streetAddress: addressInitialValues.streetAddress || "",
          addressType: addressInitialValues.addressType || "",
          notes: "",
        }
        break

      default:
        initialValues[field.name] = ""
        break
    }
  }

  return initialValues
}

export const getContextFromSession = () =>
  isBrowser() && sessionStorage.getItem("contextState")
    ? parse(sessionStorage.getItem("contextState"))
    : {}

export const saveContextToSession = (state) => {
  if (isBrowser())
    sessionStorage.setItem("contextState", stringify({ ...state }))
}

export const removeContextFromSession = () => {
  if (isBrowser()) sessionStorage.removeItem("contextState")
}
