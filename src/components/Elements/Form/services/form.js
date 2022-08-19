import React from "react"

import Address from "../../Address"
import FormDate from "../FormDate"
import FormRadio from "../FormRadio"
import FormInput from "../FormInput"
import FormSelect from "../FormSelect"
import FormCheckbox from "../FormCheckbox"
import FormTextArea from "../FormTextArea"
import FormCalendar from "../FormCalendar"
import FormSchedule from "../FormSchedule"
import FormStyledRadio from "../FormStyledRadio"
import FormLikertRadio from "../FormLikertRadio"
import FormUpload from "../FormUpload"

export const generateFormField = (config) => {
  let {
    formField,
    formFields,
    values,
    setFieldValue,
    onChange,
    errors,
    submitCount,
  } = config
  switch (formField?.type) {
    case "text":
    case "tel":
    case "email":
    case "number":
    case "password":
      return (
        <FormInput
          type={formField?.type === "text" ? "numeric" : formField?.type}
          isFollowUpQuestion
          {...formField}
          required={false}
        />
      )
    case "calendar":
      return (
        <FormCalendar
          {...formField}
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      )
    case "styledRadio":
      return (
        <FormStyledRadio
          {...formField}
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      )
    case "textarea":
      return <FormTextArea isFollowUpQuestion {...formField} />
    case "date":
      return (
        <FormDate
          values={values[formField?.name]}
          onChange={onChange}
          config={JSON.parse(formField?.dateConfig)}
          {...formField}
        />
      )
    case "checkbox":
      return (
        <FormCheckbox
          values={values[formField?.name]}
          title={formField?.label}
          formFields={formFields}
          formValues={values}
          setFieldValue={setFieldValue}
          {...formField}
        />
      )
    case "radio":
      return (
        <FormRadio
          {...formField}
          value={values[formField?.name]}
          title={formField?.label}
          formFields={formFields}
          formValues={values}
          setFieldValue={setFieldValue}
          isRequired={!!formField?.required}
          disabled={formField?.isDisabled}
        />
      )
    case "select":
    case "multiselect":
      return (
        <FormSelect
          name={formField?.name}
          value={values[formField?.name]}
          formValues={values}
          setFieldValue={setFieldValue}
          formFields={formFields}
          isMulti={formField?.type === "multiselect"}
          {...formField}
        />
      )
    case "address":
      return (
        <Address
          setFieldValue={setFieldValue}
          values={values}
          {...formField}
          isNationwide
          isRequired
        />
      )

    case "scale":
      return (
        <FormLikertRadio
          value={values[formField?.name]}
          title={formField?.label}
          formFields={formFields}
          formValues={values}
          setFieldValue={setFieldValue}
          {...formField}
        />
      )
    case "schedule":
      return (
        <FormSchedule
          formFields={formFields}
          formValues={values}
          setFieldValue={setFieldValue}
          otherSchedules={formField.otherScheduleNames.map(
            (otherSchedule) => values[otherSchedule]
          )}
          {...formField}
        />
      )

    case "upload":
      return (
        <FormUpload
          formFields={formFields}
          values={values}
          setFieldValue={setFieldValue}
          errors={errors}
          submitCount={submitCount}
          {...formField}
        />
      )

    default:
      return
  }
}

export const getFollowUpQuestionData = (config) => {
  let { followUpQuestion, formFields } = config
  let followUpData = formFields.filter((formField) => {
    return followUpQuestion === formField.name
  })

  if (followUpData.length > 0) return followUpData[0]
  else return {}
}
