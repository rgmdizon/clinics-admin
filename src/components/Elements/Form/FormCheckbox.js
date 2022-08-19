import React, { Fragment } from "react"
import classNames from "classnames"
import { Field, FieldArray, ErrorMessage } from "formik"
import styles from "./utils/form.module.scss"
import { generateFormField, getFollowUpQuestionData } from "./services/form"
import { camelize } from "humps"
/**
 ** Checkbox group linked in formik.
 ** Supported parameters:
 **
 **  {
 **               'name': String,
 **               'values': Object [],
 **               'label': String,
 **               'options': Object [],
 **               'onChange': Function,
 **               ...props compatible in Field Component of Formik
 **             }
 **/
const FormCheckbox = ({
  name,
  options,
  values,
  value = [],
  onChange,
  title,
  labelIconColor,
  labelIcon,
  hideOptional,
  helper,
  helperClassName,
  isRequired,
  restrictedOption,
  className,
  followUpQuestions = [],
  formFields,
  formValues,
  setFieldValue,
}) => {
  let fieldValues = values || value
  // Custom handleChange of every checkbox in the group
  //
  // Note: Curried function: need the form from the Field and option (text from values)
  //       to return then (event) => { ... }
  const handleChange = (form, option) => (event) => {
    const { setFieldValue } = form
    let newValue = [...fieldValues]
    if (event.target.checked) newValue.push(option)
    else newValue = newValue.filter((element) => element !== option)
    setFieldValue(name, newValue)

    if (onChange) onChange(event)
  }

  let disabledOptions = []

  if (!!restrictedOption) {
    if (fieldValues.includes(restrictedOption)) {
      fieldValues = [restrictedOption]
      disabledOptions = options.filter((option) => option !== restrictedOption)
    } else if (
      !fieldValues.includes(restrictedOption) &&
      fieldValues.length > 0
    ) {
      disabledOptions = [restrictedOption]
    }
  }

  const CheckBox = ({ form, option, index }) => (
    <Fragment>
      <input
        className="is-checkradio"
        type="checkbox"
        checked={fieldValues.find((element) => element === option)}
        onChange={handleChange(form, option)}
        id={`${name}[${index}]`}
        name={`${name}[${index}]`}
        disabled={disabledOptions?.find((element) => element === option)}
      />
      <label
        className={classNames(
          className || "is-size-6",
          "checkbox-label",
          styles["formCheckbox__label"]
        )}
        for={`${name}[${index}]`}
        htmlFor={`${name}[${index}]`}
      >
        <span className="ml-1">
          <span dangerouslySetInnerHTML={{ __html: option }} />
          {/* {option} */}
        </span>
      </label>
    </Fragment>
  )

  return (
    <div className={classNames(styles["formCheckbox"])}>
      <label className={classNames("label has-text-weight-normal")}>
        {!!labelIcon && (
          <span className={`icon has-text-${labelIconColor}`}>{labelIcon}</span>
        )}
        <span> {title}</span>
        {!isRequired && !hideOptional && (
          <span className="has-text-grey is-italic"> (Optional)</span>
        )}
        {!!helper && (
          <span
            className={classNames(
              "help has-text-weight-normal",
              helperClassName
            )}
          >
            {helper}
          </span>
        )}
      </label>
      <FieldArray name={name}>
        {() =>
          options.map((option, index) => (
            <div key={index} className="mb-1">
              <Field>
                {({ form }) => (
                  <div className="field">
                    <CheckBox form={form} option={option} index={index} />
                    {followUpQuestions?.length > 0 &&
                      followUpQuestions.map((followUpQuestion) => {
                        const getFormField = getFollowUpQuestionData({
                          followUpQuestion,
                          formFields: formFields,
                        })

                        if (
                          values.includes(option) &&
                          camelize(getFormField?.referenceAnswer) ===
                            camelize(option)
                        )
                          return (
                            <div className="notification is-light ml-2 mt-1">
                              {generateFormField({
                                formField: {
                                  ...getFormField,
                                },
                                formFields,
                                values: formValues,
                                setFieldValue,
                              })}
                            </div>
                          )
                        return null
                      })}
                  </div>
                )}
              </Field>
            </div>
          ))
        }
      </FieldArray>
      <p className="help is-danger mt-0 mb-1">
        <ErrorMessage name={name} />
      </p>
    </div>
  )
}

export default FormCheckbox
