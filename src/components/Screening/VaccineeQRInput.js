import React from "react"
import { Formik, Form } from "formik"

import FormInput from "elements/Form/FormInput"
import ActionButtons from "elements/ActionButtons"

import { qrInputSchema } from "./utils/qrInputSchema"

const VaccineeQRInput = ({ handleSubmit }) => {
  return (
    <div className="mt-2">
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ enrollmentCode: "" }}
        validationSchema={qrInputSchema}
      >
        {() => (
          <Form>
            <FormInput
              name="enrollmentCode"
              label="Enrollment Code"
              isRequired
            />
            <div className="mt-2">
              <ActionButtons
                submit={{
                  label: "View Vaccinee",
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default VaccineeQRInput
