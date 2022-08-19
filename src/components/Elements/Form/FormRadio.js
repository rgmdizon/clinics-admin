import React, { Fragment, useRef, useEffect } from "react"
import { Field, ErrorMessage, useFormikContext } from "formik"
import classNames from "classnames"
import styles from "./utils/form.module.scss"
import { getFollowUpQuestionData, generateFormField } from "./services/form"
import { camelize } from "humps"

import handleScrollToError from "./utils/handleScrollToError"

const FormRadio = ({
  name,
  options,
  value,
  onChange,
  title,
  helper,
  isInline,
  className,
  disabled,
  isRequired,
  hideOptional,
  helperClassName,
  followUpQuestions = [],
  formFields,
  formValues,
  setFieldValue,
  isFollowUpQuestion,
  disabledOptions
}) => {
  const formik = useFormikContext()
  const fieldRef = useRef(null)

  const handleScrollCallback = () => {
    fieldRef.current.scrollIntoView({ scroll: "smooth", block: "center" })
  }

  useEffect(() => {
    handleScrollToError({
      formikContext: formik,
      fieldName: name,
      callback: handleScrollCallback,
    })
  }, [formik.submitCount, formik.isValid, formik, name])

  useEffect(() => {
    if (isFollowUpQuestion) handleScrollCallback()
  }, [isFollowUpQuestion])

  const handleChange = (form, option) => (event) => {
    const { setFieldValue } = form
    if (event.target.checked) setFieldValue(name, event.target.value)
    if (onChange) onChange(event)
  }

  const RadioButton = ({ form, option, index }) => (
    <div className="mb-1" id={`option${index}`}>
      <input
        className="radio is-checkradio"
        id={`option${index + 1}RadioButton${name}`}
        type="radio"
        name={name}
        value={option}
        onChange={handleChange(form, option)}
        checked={option === value}
        disabled={disabledOptions?.includes(option)}
      />
      <label
        className={classNames(
          "radio-label is-size-6",
          styles["form__radioLabel"],
          {
            "mr-2": !isInline,
          }
        )}
        for={`option${index + 1}RadioButton${name}`}
      >
        {option}
      </label>
    </div>
  )

  return (
    <div className="mb-2">
      <Field name={name}>
        {({ form }) => (
          <Fragment>
            {title && (
              <label
                ref={fieldRef}
                className={classNames(`label mr-1 has-text-weight-normal`, {
                  "form__radioLabel--displayInline": isInline,
                })}
              >
                {title}{" "}
                {!isRequired && !hideOptional && (
                  <span className="has-text-grey is-italic"> (Optional)</span>
                )}
                {!!helper && (
                  <span
                    className={classNames(
                      "help has-text-weight-normal has-text-left",
                      helperClassName
                    )}
                  >
                    {helper}
                  </span>
                )}
              </label>
            )}
            <div
              className={classNames(className?.radioGroup || "", {
                "is-flex": isInline,
              })}
            >
              {options.map((option, index) => (
                <Fragment key={index}>
                  <RadioButton form={form} option={option} index={index} />
                  {followUpQuestions?.length > 0 &&
                    followUpQuestions.map((followUpQuestion) => {
                      const getFormField = getFollowUpQuestionData({
                        followUpQuestion,
                        formFields: formFields,
                      })

                      if (
                        value === option &&
                        camelize(getFormField?.referenceAnswer) ===
                          camelize(option)
                      )
                        return (
                          <div className="notification is-light ml-2 mt-1">
                            {generateFormField({
                              formField: {
                                ...getFormField,
                                disabled: disabled,
                              },
                              formFields,
                              values: formValues,
                              setFieldValue,
                            })}
                          </div>
                        )
                      return null
                    })}
                </Fragment>
              ))}
            </div>
            <p className="help is-danger mt-0 mb-1">
              <ErrorMessage name={name} />
            </p>
          </Fragment>
        )}
      </Field>
    </div>
  )
}

export default FormRadio
