import React, { Fragment, useState, useEffect, useContext } from "react"
import { Formik, Form } from "formik"
import { navigate } from "gatsby"

import Message from "elements/Message"
import Section from "elements/Section"

import { verifyCode } from "./services/verifyCode"
import { VaccineeContext } from "../context/VaccineeContext"
import { generateFormField } from "elements/Form/services/form"
import { useVerificationFormFields } from "./hooks/useVerificationFormFields"
import { getContextFromSession, generateInitialValues } from "services/context"

const Verification = ({ pageContext }) => {
  const { vaccineeState, vaccineeDispatch } = useContext(VaccineeContext)

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState({})
  const { nextPath, formFields } = pageContext

  useEffect(() => {
    let sessionState = getContextFromSession()
    vaccineeDispatch({ type: "SAVE_WHOLE_STATE", payload: sessionState })

    //eslint-disable-next-line
  }, [])

  let { sectionFormFields, validationSchema } = useVerificationFormFields({
    formFields,
  })

  let initialValues = {
    ...generateInitialValues({ fields: formFields }),
    ...vaccineeState,
  }

  const handleSubmitVerification = (values) => {
    setLoading(true)
    verifyCode({
      values,
      callback: ({ code, schedules, organization, vaccines }) => {
        setLoading(false)
        setErrorMessage({})

        vaccineeDispatch({
          type: "SAVE_CODE",
          payload: { code, schedules, vaccines, organization },
        })

        vaccineeDispatch({
          type: "SAVE_VERIFICATION",
          payload: { ...values },
        })

        navigate(nextPath)
      },
      errorCallback: () => {
        setLoading(false)
        setErrorMessage({
          message:
            "There was a problem verifying your company code. If you are not sure about your company code, please contact your HR representative.",
        })
      },
    })
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmitVerification}
      validationSchema={validationSchema}
    >
      {({ values, errors, setFieldValue, submitCount }) => (
        <Form>
          {sectionFormFields.map((section) => (
            <Fragment>
              <Section
                title={section?.section}
                subtitle={section?.subtitle || ""}
                id={section?.sectionId || ""}
              >
                {section?.fields.map((field) => {
                  if (!field?.referenceAnswer) {
                    return (
                      <Fragment>
                        <div className="is-flex">
                          <div className="is-flex-grow-1">
                            {generateFormField({
                              formFields: section?.fields,
                              formField: {
                                loading,
                                ...field,
                                isUppercase: true,
                                hasAddons: true,
                                hasAddonButton: "Get Started",
                                addonButtonClass: "is-primary",
                              },
                              values,
                              setFieldValue,
                              submitCount,
                              errors,
                            })}
                          </div>
                        </div>
                        {!!field?.addDividerAfterField && (
                          <hr className="has-background-light" />
                        )}
                      </Fragment>
                    )
                  }
                  return null
                })}
                {errorMessage?.message && (
                  <Message color="danger">
                    <span className="is-size-6">{errorMessage?.message}</span>
                  </Message>
                )}
              </Section>
            </Fragment>
          ))}
        </Form>
      )}
    </Formik>
  )
}

export default Verification
