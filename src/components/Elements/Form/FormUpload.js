import React, { Fragment } from "react"
import classNames from "classnames"

import UploadDocumentDropzone from "elements/UploadDocumentDropzone"

const FormUpload = (fieldProps) => {
  const {
    fieldNames,
    values,
    setFieldValue,
    errors,
    submitCount,
    label,
    isRequired,
  } = fieldProps

  return (
    <Fragment>
      <label className={classNames("label has-text-weight-normal")}>
        {label}
        {!isRequired && (
          <span className="is-italic has-text-grey">&nbsp;(Optional)</span>
        )}
        {!!fieldProps?.helper && (
          <span
            className={classNames(
              "help has-text-weight-normal has-text-grey",
              fieldProps?.helperClassName
            )}
          >
            {fieldProps?.helper}
          </span>
        )}
      </label>
      <div className="columns">
        {fieldNames.map((fieldName, index) => {
          let label
          switch (true) {
            case fieldNames.length > 1:
              label = `Upload Image (${fieldName})`
              break
            default:
              label = `Upload Image`
              break
          }
          return (
            <div className="column" id={`${fieldProps?.name}${index}`}>
              <UploadDocumentDropzone
                docType={`${fieldProps?.name}_${fieldName}`}
                label={label}
                icon="id"
                maxFiles={1}
                dispatchType={`SAVE_${fieldProps?.name?.toUpperCase()}_${fieldName.toUpperCase()}`}
                name={`${fieldProps?.name}.${fieldName}`}
                value={values?.[fieldProps?.name]?.[fieldName]}
                setFieldValue={setFieldValue}
                errors={errors}
                submitCount={submitCount}
              />
            </div>
          )
        })}
      </div>
    </Fragment>
  )
}

export default FormUpload
