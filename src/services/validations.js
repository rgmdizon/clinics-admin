import * as Yup from "yup"
import { isBrowser } from "services/general"

const REQUIRED_MESSAGE = "This field is required."
const VALID_EMAIL = "Please input a valid email."
const VALID_MOBILE_NUMBER =
  "Please input a valid mobile number in this format: 09991234567."
// const yearNow = new Date(Date.now()).getFullYear()

export const getDefaultValidation = ({ field }) => {
  let url = ""
  let fieldValidation
  if (isBrowser()) url = window?.location?.pathname

  switch (field.type) {
    case "checkbox":
      fieldValidation = Yup.array()
      break

    case "calendar":
      fieldValidation = Yup.date()
      break

    case "schedule":
      fieldValidation = Yup.object()

      for (let objectField of field.fieldNames) {
        fieldValidation = fieldValidation.concat(
          fieldValidation.shape({
            [objectField]: Yup.string().required(REQUIRED_MESSAGE),
          })
        )
      }

      break

    case "upload":
      fieldValidation = Yup.object()

      for (let objectField of field.fieldNames) {
        fieldValidation = fieldValidation.concat(
          fieldValidation.shape({
            [objectField]: Yup.object().shape({
              name: Yup.string().required(REQUIRED_MESSAGE),
            }),
          })
        )
      }
      break

    case "select":
      fieldValidation = Yup.object().shape({
        value: Yup.string().when("label", {
          is: () => !!field.required,
          then: Yup.string().required(REQUIRED_MESSAGE),
          otherwise: Yup.string(),
        }),
      })
      break

    case "multiselect":
      fieldValidation = Yup.array()
        .of(
          Yup.object().shape({
            value: Yup.string().when("label", {
              is: () => !!field.required,
              then: Yup.string().required(REQUIRED_MESSAGE),
              otherwise: Yup.string(),
            }),
          })
        )
        .min(field?.min || 1, REQUIRED_MESSAGE)
      break

    case "date":
      fieldValidation = Yup.object().shape({
        month: Yup.object().shape({
          value: Yup.string().when("label", {
            is: () => !!field.required,
            then: Yup.string().required(REQUIRED_MESSAGE),
            otherwise: Yup.string(),
          }),
        }),
        date: Yup.object().shape({
          value: Yup.string().when("label", {
            is: () => !!field.required,
            then: Yup.string().required(REQUIRED_MESSAGE),
            otherwise: Yup.string(),
          }),
        }),

        // year: Yup.number().when("month", {
        //   is: () => !!field.required,
        //   then: Yup.number().when("month", {
        //     is: () => field?.validation?.includes("Birthday"),
        //     then: Yup.number()
        //       .min(1900, "Please input a valid year")
        //       .max(
        //         yearNow - parseInt(field.min),
        //         "You must be at least 18 years old"
        //       )
        //       .required(REQUIRED_MESSAGE),
        //     otherwise: Yup.number()
        //       .min(1900, "Please input a valid year")
        //       .max(yearNow, "Please input a valid year")
        //       .required(REQUIRED_MESSAGE),
        //   }),
        //   otherwise: Yup.number(),
        // }),
      })
      break

    case "address":
      let shouldInputSite = field.fieldNames.includes(`${field.name}.siteName`)

      fieldValidation = Yup.object().shape({
        city: Yup.object().when("addressType", {
          is: (addressType) =>
            !!field.required &&
            (!shouldInputSite || (shouldInputSite && addressType === "Home")),
          then: Yup.object().shape({
            value: Yup.string().required(REQUIRED_MESSAGE),
          }),
          otherwise: Yup.object().shape({
            value: Yup.string(),
          }),
        }),
        province: Yup.object().when("addressType", {
          is: (addressType) =>
            !!field.required &&
            (!shouldInputSite || (shouldInputSite && addressType === "Home")),
          then: Yup.object().shape({
            value: Yup.string().required(REQUIRED_MESSAGE),
          }),
          otherwise: Yup.object().shape({
            value: Yup.string(),
          }),
        }),
        siteName: Yup.object().when("addressType", {
          is: (addressType) =>
            !!field.required && shouldInputSite && addressType === "Office",
          then: Yup.object().shape({
            value: Yup.string().required(REQUIRED_MESSAGE),
          }),
          otherwise: Yup.object().shape({
            value: Yup.string(),
          }),
        }),
        streetAddress: Yup.string().when("addressType", {
          is: (addressType) =>
            !!field.required &&
            (!shouldInputSite || (shouldInputSite && addressType === "Home")),
          then: Yup.string().required(REQUIRED_MESSAGE),
          otherwise: Yup.string(),
        }),
        // addressType: Yup.string().when("value", {
        //   is: () => !!field.required,
        //   then: Yup.string().required(REQUIRED_MESSAGE),
        //   otherwise: Yup.string(),
        // }),
        notes: Yup.string(),
      })
      break

    // case "address":
    //   fieldValidation = Yup.object().shape({
    //     addressType: Yup.string(),
    //     streetAddress: Yup.string(),
    //     province: Yup.object().shape({
    //       label: Yup.string(),
    //       value: Yup.string(),
    //     }),
    //     city: Yup.object().shape({
    //       label: Yup.string(),
    //       value: Yup.string(),
    //     }),
    //   })
    //   break

    case "number":
      fieldValidation = Yup.number()
      if (field?.max) {
        fieldValidation = fieldValidation.concat(
          fieldValidation
            .integer()
            .max(field?.max, `Maximum input is ${field?.max}`)
        )
      }

      if (field?.min) {
        fieldValidation = fieldValidation.concat(
          fieldValidation
            .integer()
            .min(field?.min, `Minimum input is ${field?.min}`)
        )
      }
      break

    case "text":
    case "radio":
    case "styledRadio":
    case "textarea":
    default:
      fieldValidation = Yup.string()

      if (field?.validation?.includes("Middle Name"))
        fieldValidation = fieldValidation.concat(
          fieldValidation
            .min(2, "Please input your complete middle name.")
            .matches(
              /^[^!<>?#=+@{}_$%()/.\d^&*<>,?]+$/,
              "Your middle name should not have special characters."
            )
        )

      if (field?.validation?.includes("Password") && url === "/verify-email")
        fieldValidation = fieldValidation.concat(
          fieldValidation
            .min(7, "Your password must be at least seven characters long.")
            .max(80, "Your password must not exceed 80 characters in length.")
            .matches(
              /(?=.*[a-z])/,
              "Your password must contain at least one lowercase character."
            )
            .matches(
              /(?=.*[A-Z])/,
              "Your password must contain at least one uppercase character."
            )
            .matches(
              /(?=.*[0-9])/,
              "Your password must contain at least one number."
            )
            .matches(
              /(?=.*[!|@|#|$|%|&|_|+|=|.|-])/,
              "Your password must contain at least one of these special characters: !@#$%&_-+=."
            )
            .matches(
              /^[a-zA-Z0-9!@#$%&_+=.-]{7,}$/,
              "Your password contains an invalid special character. Please use any from the following only: !@#$%&_-+=."
            )
        )

      if (field?.validation?.includes("Update Password"))
        fieldValidation = fieldValidation
          .concat(
            fieldValidation.notOneOf(
              [Yup.ref("oldPassword"), null],
              "Please choose a password that you haven't used before."
            )
          )
          .concat(
            fieldValidation
              .min(7, "Your password must be at least seven characters long.")
              .max(80, "Your password must not exceed 80 characters in length.")
              .matches(
                /(?=.*[a-z])/,
                "Your password must contain at least one lowercase character."
              )
              .matches(
                /(?=.*[A-Z])/,
                "Your password must contain at least one uppercase character."
              )
              .matches(
                /(?=.*[0-9])/,
                "Your password must contain at least one number."
              )
              .matches(
                /(?=.*[!|@|#|$|%|&|_|+|=|.|-])/,
                "Your password must contain at least one of these special characters: !@#$%&_-+=."
              )
              .matches(
                /^[a-zA-Z0-9!@#$%&_+=.-]{7,}$/,
                "Your password contains an invalid special character. Please use any from the following only: !@#$%&_-+=."
              )
          )

      if (field?.validation?.includes("Confirm Password"))
        fieldValidation = fieldValidation
          .concat(
            fieldValidation.oneOf(
              [Yup.ref("password"), Yup.ref("newPassword"), null],
              "Passwords must match"
            )
          )
          .concat(
            fieldValidation
              .min(7, "Your password must be at least seven characters long.")
              .max(80, "Your password must not exceed 80 characters in length.")
              .matches(
                /(?=.*[a-z])/,
                "Your password must contain at least one lowercase character."
              )
              .matches(
                /(?=.*[A-Z])/,
                "Your password must contain at least one uppercase character."
              )
              .matches(
                /(?=.*[0-9])/,
                "Your password must contain at least one number."
              )
              .matches(
                /(?=.*[!|@|#|$|%|&|_|+|=|.|-])/,
                "Your password must contain at least one of these special characters: !@#$%&_-+=."
              )
              .matches(
                /^[a-zA-Z0-9!@#$%&_+=.-]{7,}$/,
                "Your password contains an invalid special character. Please use any from the following only: !@#$%&_-+=."
              )
          )

      if (field?.validation?.includes("Email"))
        fieldValidation = fieldValidation.concat(
          fieldValidation.email(VALID_EMAIL)
        )

      if (field?.validation?.includes("Mobile Number"))
        fieldValidation = fieldValidation.concat(
          fieldValidation
            .min(11, VALID_MOBILE_NUMBER)
            .max(11, VALID_MOBILE_NUMBER)
            .matches(/^09[0-9]{9}$/, VALID_MOBILE_NUMBER)
        )
      break
  }

  return fieldValidation
}

export const getCustomValidation = ({ field, fieldValidation }) => {
  if (!!field.required) {
    if (!!field.referenceAnswer) {
      let referenceQuestion = field.referenceQuestionName[0]

      fieldValidation = fieldValidation.concat(
        fieldValidation.when(referenceQuestion, {
          is: (referenceAnswer) =>
            referenceAnswer === field?.referenceAnswer ||
            referenceAnswer?.includes(field?.referenceAnswer),
          then: fieldValidation.required(REQUIRED_MESSAGE),
        })
      )
    } else {
      fieldValidation = fieldValidation.concat(
        fieldValidation.required(REQUIRED_MESSAGE)
      )
    }

    if (!!field.minLength) {
      fieldValidation = fieldValidation.concat(
        fieldValidation.min(field.minLength, REQUIRED_MESSAGE)
      )
    }
  }

  return fieldValidation
}

export const createValidationSchema = ({ fields }) => {
  let validationSchema = Yup.object()

  for (let field of fields) {
    let fieldValidation = getDefaultValidation({ field })
    fieldValidation = getCustomValidation({ field, fieldValidation })

    validationSchema = validationSchema.concat(
      Yup.object().shape({
        [field.name]: fieldValidation,
      })
    )
  }

  return validationSchema
}
