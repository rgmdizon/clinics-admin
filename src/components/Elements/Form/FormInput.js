import React, { useState, useRef } from "react"
import classNames from "classnames"
import { Field, ErrorMessage, useField } from "formik"

import styles from "./utils/form.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

/**
 ** Input field with label and error message.
 ** Supported parameters:
 **
 ** fieldProps: {
 **               'name': String,
 **               'placeholder': String,
 **               'label': String,
 **               'type': String,
 **               'onChange': Function,
 **               ...props compatible in Field Component of Formik
 **             }
 **/
const FormInput = (fieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [fieldType, setFieldType] = useState(fieldProps.type)

  const handleShowHidePassword = () => {
    if (showPassword) {
      // if current state is true/show, we need to make it false/hide
      setFieldType("password")
    } else {
      setFieldType("text")
    }
    setShowPassword(!showPassword)
  }

  // const formik = useFormikContext()
  const fieldRef = useRef(null)

  // const handleScrollCallback = () => {
  //   fieldRef.current.focus()
  // }

  // useEffect(() => {
  //   handleScrollToError({
  //     formikContext: formik,
  //     fieldName: fieldProps.name,
  //     callback: handleScrollCallback,
  //   })
  // }, [formik.submitCount, formik.isValid, formik, fieldProps.name])

  // useEffect(() => {
  //   if (fieldProps.isFollowUpQuestion) handleScrollCallback()
  // }, [fieldProps.isFollowUpQuestion])

  //* Function that prevents alpha and symbols
  //* if the fieldProps.type is number.
  //* This also prevents the user to input characters more than
  //* fieldProps.max (if defined).

  // We're accessing the useField props below so we can validate forms inline, on touch
  // Source: https://jaredpalmer.com/formik/docs/api/useField#usefieldname-string-fieldattributes-fieldinputprops-fieldmetaprops-fieldhelperprops
  // const [, meta, helpers] = useField(fieldProps.name)
  const isTypeNumber = fieldProps.type === "number"
  const handleOnKeyPress = (event) => {
    if (!!fieldProps.pattern && !new RegExp(fieldProps.pattern).test(event.key))
      event.preventDefault()

    if (fieldProps.isNumeric && isNaN(event.key)) {
      event.preventDefault()
    } else if (isTypeNumber) {
      if (
        (event.key !== "." && isNaN(event.key)) ||
        (fieldProps.maxLength &&
          event.target.value.toString().length >= fieldProps.maxLength)
      )
        event.preventDefault()
    }
    if (fieldProps.onKeyPress) fieldProps.onKeyPress(event)
  }

  // We're accessing the useField props below so we can validate forms inline, on touch
  // Source: https://jaredpalmer.com/formik/docs/api/useField#usefieldname-string-fieldattributes-fieldinputprops-fieldmetaprops-fieldhelperprops
  const [, { touched, error }] = useField(fieldProps.name)
  return (
    <div className={classNames(styles["formInput"])}>
      <label
        className={classNames("label has-text-weight-normal has-text-left")}
      >
        {!!fieldProps.labelIcon && (
          <span className={`icon has-text-${fieldProps.labelIconColor}`}>
            {fieldProps.labelIcon}
          </span>
        )}
        {fieldProps.label}
        {!fieldProps.isRequired && !fieldProps.hideOptional && (
          <span className="has-text-grey is-italic"> (Optional)</span>
        )}
        {!!fieldProps.helper && (
          <span
            className={classNames(
              "help has-text-weight-normal has-text-left",
              fieldProps.helperClassName
            )}
          >
            {fieldProps.helper}
          </span>
        )}
      </label>
      <div
        className={classNames("field mb-0", {
          "has-addons has-addons-right":
            fieldProps.hasAddons || fieldProps.type === "password",
        })}
      >
        {fieldProps.hasAddons && fieldProps.addonLeft && (
          <div className="control">{fieldProps.addonLeft}</div>
        )}
        <div
          className={`control ${
            fieldProps.hasAddons ||
            fieldProps.type === "password" ||
            fieldProps?.hasAddonButton
              ? "is-expanded"
              : ""
          }`}
        >
          <Field {...fieldProps}>
            {({ field }) => (
              <input
                {...fieldProps}
                {...field}
                max={100}
                disabled={fieldProps.isDisabled}
                type={fieldType}
                ref={fieldRef}
                maxLength={fieldProps.maxLength || 50}
                className={classNames(
                  "input",
                  {
                    "is-success": touched && !error && fieldProps.isRequired,
                    "is-danger": touched && error,
                    "is-uppercase": fieldProps?.isUppercase,
                  },
                  fieldProps.className
                )}
                onKeyPress={handleOnKeyPress}
                onChange={(event) => {
                  field.onChange(event)
                  if (fieldProps?.onChange) fieldProps.onChange(event)

                  if (isTypeNumber) {
                    if (
                      fieldProps.max &&
                      parseFloat(event.target.value) >= fieldProps.max
                    ) {
                      event.target.value = fieldProps.max
                    }
                    if (
                      fieldProps.min &&
                      parseFloat(event.target.value) <= fieldProps.min
                    )
                      event.target.value = fieldProps.min
                  }
                }}
              />
            )}
          </Field>
        </div>
        {fieldProps.hasAddons && fieldProps.addonRight && (
          <div className="control">{fieldProps.addonRight}</div>
        )}
        {fieldProps.hasAddonButton && (
          <div className="control">
            <button
              className={classNames("button ", fieldProps?.addonButtonClass, {
                "is-loading": fieldProps?.loading,
              })}
              type="submit"
            >
              {fieldProps?.hasAddonButton}
            </button>
          </div>
        )}
        {fieldProps.type === "password" ? (
          <div className="control">
            <button
              className="button"
              type="button"
              onClick={handleShowHidePassword}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        ) : null}
      </div>
      <p className="help mt-0 mb-1 is-danger has-text-left">
        <ErrorMessage name={fieldProps.name} />
      </p>
    </div>
  )
}

export default React.memo(FormInput)
