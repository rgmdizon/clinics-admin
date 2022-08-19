import React, { Fragment, useRef, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import classNames from "classnames"
import styles from "../utils/elements.module.scss"
import { getFollowUpQuestionData, generateFormField } from "./services/form"
import { camelize } from "humps"

const FormLikertRadio = ({
  name,
  options,
  value,
  onChange,
  title,
  isInline,
  disabled,
  isRequired,
  followUpQuestions = [],
  formFields,
  formValues,
  setFieldValue,
  isFollowUpQuestion,
}) => {
  const fieldRef = useRef(null)

  const handleScrollCallback = () => {
    fieldRef.current.scrollIntoView({ scroll: "smooth", block: "center" })
  }

  useEffect(() => {
    if (isFollowUpQuestion) handleScrollCallback()
  }, [isFollowUpQuestion])

  const handleChange = (form, option) => (event) => {
    const { setFieldValue } = form
    if (event.target.checked) setFieldValue(name, event.target.value)
    if (onChange) onChange(event)
  }

  const RadioButton = ({ form, option, index }) => {
    return (
      <div className="mb-1" id={`option${index}`} key={`option${index}`}>
        <input
          className="radio is-checkradio radio-inline"
          id={`option${index + 1}RadioButton${name}`}
          type="radio"
          name={name}
          value={option}
          onChange={handleChange(form, option)}
          checked={option === value}
          disabled={disabled}
        />
        <label
          aria-label="Radio Option"
          className={classNames(
            "radio-inline",
            "radio-label",
            styles["form__radioLabel"]
          )}
          htmlFor={`option${index + 1}RadioButton${name}`}
        />
      </div>
    )
  }

  return (
    <div className="mb-2">
      <Field name={name}>
        {({ form }) => (
          <Fragment>
            {title && (
              <label
                ref={fieldRef}
                className={classNames(`label has-text-weight-normal`, {
                  "form__radioLabel--displayInline": isInline,
                })}
              >
                {title}{" "}
                {!isRequired && (
                  <span className="is-italic has-text-grey">(Optional)</span>
                )}
              </label>
            )}
            <div className={classNames(styles["likert__radioGroup"])}>
              <table
                // width="100%"
                className="table is-fullwidth is-borderless"
              >
                <thead>
                  <tr>
                    {options.map((option, index) => (
                      <td
                        className={classNames("has-text-centered pr-2")}
                        key={index + 1}
                      >
                        {option}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {options.map((option, index) => (
                    <td style={{ width: "20%" }}>
                      <center>
                        <RadioButton
                          form={form}
                          option={option}
                          index={index}
                        />
                      </center>
                      {followUpQuestions?.length > 0 &&
                        followUpQuestions?.map((followUpQuestion) => {
                          const getFormField = getFollowUpQuestionData({
                            followUpQuestion,
                            formFields: formFields,
                          })

                          if (
                            value === option &&
                            getFormField?.referenceAnswer === camelize(option)
                          )
                            return (
                              <div className="notification pb-1 is-light ml-2 mt-1">
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
                    </td>
                  ))}
                </tbody>
                <p className="help is-danger mt-0">
                  <ErrorMessage name={name} />
                </p>
              </table>
            </div>
          </Fragment>
        )}
      </Field>
    </div>
  )
}

export default FormLikertRadio
