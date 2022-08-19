import React, { useRef, useEffect } from "react"
import classNames from "classnames"
// import _ from "lodash"
import { Field, useFormikContext, ErrorMessage } from "formik"
import Select from "react-select"
import CreatableSelect from "react-select/creatable"
import AsyncSelect from "react-select/async"
import AsyncCreatableSelect from "react-select/async-creatable"

import handleScrollToError from "./utils/handleScrollToError"

/**
 ** Select field with label and error message.
 ** Supported parameters:
 **
 ** props: {
 **               'name': String,
 **               'placeholder': String,
 **               'label': String,
 **               'option': Object [],
 **               'onChange': Function,
 **               'value': Object {},
 **             }
 **
 ** Note: You need a list of objects as options with label and value element.
 **/

const customStyles = (theme) => ({
  ...theme,
  boxShadow: "inset 0 0.0625em 0.125em rgba(0, 0, 0, 0.05)",
  colors: {
    ...theme.colors,
    primary: "#6ea9a9",
    primary25: "#cfe1e1",
    primary50: "#9ec5c5",
  },
})

const FormSelect = (props) => {
  //* destructure props
  const { name, onChange, isSelectable } = props

  const formik = useFormikContext()
  const fieldRef = useRef(null)

  const handleScrollCallback = () => {
    fieldRef.current.scrollIntoView({ block: "center" })
  }

  useEffect(() => {
    handleScrollToError({
      formikContext: formik,
      fieldName: name,
      callback: handleScrollCallback,
    })
  }, [formik.submitCount, formik.isValid, formik, name])

  //* Function to set the value of the react-select in
  //* formik values.
  //*
  //* Note: Curried Function.
  //*       Need to call handleChange(form) to return (selectedValue) => { ... }
  const handleChange = (form) => (selectedValue) => {
    form.setFieldValue(name, selectedValue)
    if (onChange) onChange(selectedValue, form.setFieldValue)
  }

  let value = {
    value: "",
    label: "",
  }

  if (props.options.length === 1) {
    value = {
      value: props?.options[0].value,
      label: props?.options[0].label,
    }
    // isDisabled = true
  }

  let config = { value, ...props }

  if (typeof props.value !== "object") {
    config.value = {
      value: props.value,
      label: props.value,
    }
  }

  const SelectComponent = ({ form }) => {
    const Selector = props.isAsync ? AsyncSelect : Select
    return (
      <Selector
        {...config}
        className="is-size-6"
        onChange={handleChange(form)}
        theme={customStyles}
        isDisabled={props.isDisabled}
      />
    )
  }

  const CreatableSelectComponent = ({ form }) => {
    const Selector = props.isAsync ? AsyncCreatableSelect : CreatableSelect
    return (
      <Selector
        {...config}
        className="is-size-6"
        theme={customStyles}
        onChange={handleChange(form)}
        isDisabled={props.isDisabled}
      />
    )
  }

  // let errorMessage = _.get(errors, name)

  return (
    <div className="field">
      <label
        className={classNames("label has-text-weight-normal")}
        ref={fieldRef}
      >
        {!!props.labelIcon && (
          <span className={`icon has-text-${props.labelIconColor}`}>
            {props.labelIcon}
          </span>
        )}
        {props.label}
        {!props.isRequired && !props.hideOptional && (
          <span className="has-text-grey is-italic"> (Optional)</span>
        )}
        {!!props.helper && (
          <span
            className={classNames(
              "help has-text-weight-normal",
              props.helperClassName
            )}
          >
            {props.helper}
          </span>
        )}
      </label>
      <Field>
        {({ form }) =>
          isSelectable ? (
            <CreatableSelectComponent form={form} />
          ) : (
            <SelectComponent form={form} />
          )
        }
      </Field>
      <p className="help mb-1 is-danger">
        {/* {!!errorMessage ? errorMessage.value : null} */}
        <ErrorMessage name={!!props?.isMulti ? name : `${name}.value`} />
      </p>
    </div>
  )
}

export default FormSelect
