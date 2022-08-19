import React from "react"
import classNames from "classnames"
import { Field, ErrorMessage } from "formik"

const FormTextArea = ({
  label,
  isRequired,
  placeholder,
  children,
  name,
  rows,
  value,
  readOnly,
  maxLength,
  labelIconColor,
  labelIcon,
  hideOptional,
  helper,
  helperClassName,
}) => (
  <div className="field mb-2">
    <label className={classNames("label has-text-weight-normal")}>
      {!!labelIcon && (
        <span className={`icon has-text-${labelIconColor}`}>{labelIcon}</span>
      )}
      {label}
      {!isRequired && !hideOptional && (
        <span className="has-text-grey is-italic"> (Optional)</span>
      )}
      {!!helper && (
        <span
          className={classNames("help has-text-weight-normal", helperClassName)}
        >
          {helper}
        </span>
      )}
    </label>
    <div className="field-body">
      <div className="field">
        <p className="control">
          <Field name={name}>
            {({ field }) => (
              <textarea
                className="textarea has-fixed-size"
                placeholder={placeholder}
                name={name}
                rows={rows}
                value={value}
                {...field}
                readOnly={readOnly}
                maxLength={maxLength || 250}
              >
                {children}
              </textarea>
            )}
          </Field>
        </p>
        <ErrorMessage name={name}>
          {(error) => <div className="has-text-danger is-size-7">{error}</div>}
        </ErrorMessage>
      </div>
    </div>
  </div>
)

export default FormTextArea
