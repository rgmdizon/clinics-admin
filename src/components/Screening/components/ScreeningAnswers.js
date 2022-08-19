import React, { Fragment } from "react"

import Section from "elements/Section"
import Message from "elements/Message"
import ActionButtons from "elements/ActionButtons"

import { generateFormField } from "elements/Form/services/form"

const ScreeningAnswers = ({
  values,
  errors,
  setView,
  loading,
  submitCount,
  setFieldValue,
  sectionFormFields,
}) => {
  let screeningFormFields = sectionFormFields?.filter(
    (section) =>
      !!section?.section &&
      (section?.section === "Screening Questionnaire" ||
        section?.section === "Doctor's Assessment")
  )

  // let formErrors = []
  // let errorKeys = Object.keys(errors)
  // if (errorKeys?.length > 0)
  //   formErrors = errorKeys.map((key) => {
  //     key = key.replace(/([A-Z])/g, " $1")
  //     return key.charAt(0).toUpperCase() + key.slice(1)
  //   })

  return (
    <Fragment>
      {screeningFormFields
        .sort(
          (firstFormField, secondFormField) =>
            firstFormField.order - secondFormField.order
        )
        .map((section) => (
          <Fragment>
            <Section
              title={section?.section}
              subtitle={section?.subtitle || ""}
              id={section?.sectionId || ""}
            >
              {section?.message && (
                <Message color="light">
                  <p>{section?.message}</p>
                </Message>
              )}
              {section?.fields.map((field) => {
                if (!field?.referenceAnswer) {
                  return (
                    <Fragment>
                      {generateFormField({
                        formFields: section?.fields,
                        formField: field,
                        setFieldValue,
                        submitCount,
                        values,
                        errors,
                      })}
                      {!!field?.addDividerAfterField && (
                        <hr className="has-background-light" />
                      )}
                    </Fragment>
                  )
                }
                return null
              })}
            </Section>
          </Fragment>
        ))}
      {/* {submitCount > 0 && formErrors?.length > 0 && (
        <Message color="danger">
          <div className="content">
            <p>The following required fields are missing:</p>
            <ul className="is-size-6">
              {formErrors?.map((error) => (
                <li className="pb-0">{error}</li>
              ))}
            </ul>
            <p>
              Please ask the vaccinee to proceed to help desk for assistance.
            </p>
          </div>
        </Message>
      )} */}
      <ActionButtons
        back={{ label: "Back", callback: () => setView("qr") }}
        submit={{ loading, label: "Submit" }}
      />
    </Fragment>
  )
}

export default ScreeningAnswers
