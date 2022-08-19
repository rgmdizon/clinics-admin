import React, { Fragment } from "react"

const FormSection = ({ title, children }) => {
  return (
    <Fragment>
      <h3>{title}</h3>
      {children}
    </Fragment>
  )
}

export default FormSection
