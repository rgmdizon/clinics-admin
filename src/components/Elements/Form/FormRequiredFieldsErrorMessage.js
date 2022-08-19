import React from "react"

import Message from "elements/Message"
import { isObjectEmpty } from "services/general"

const FormRequiredFieldsErrorMessage = ({ errors }) => {
  if (isObjectEmpty(errors)) return null
  return (
    <Message color="danger">
      <p>
        You may have missed some required fields. Please scan through the form
        and check if your information is complete.
      </p>
    </Message>
  )
}

export default FormRequiredFieldsErrorMessage
