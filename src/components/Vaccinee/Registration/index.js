import React, { Fragment, useContext, useEffect, useState } from "react"
import { Formik, Form } from "formik"
import { navigate } from "gatsby"

import Layout from "layout"
import Section from "elements/Section"
import Container from "layout/Container"
import InformedConsent from "./InformedConsent"
import ActionButtons from "elements/ActionButtons"
import RegistrationPaymentSummary from "./RegistrationPaymentSummary"

import { handlePayment } from "./services/handlePayment"
import { getContextFromSession } from "services/context"
import { generateInitialValues } from "services/context"
import { trimIntakeForm } from "./services/trimIntakeForm"
import { VaccineeContext } from "../context/VaccineeContext"
import { handleGetPayment } from "./services/handleGetPayment"
import { generateFormField } from "elements/Form/services/form"
import { useRegistrationFormFields } from "./hooks/useRegistrationFormFields"
import { getAvailablePaymentMethods } from "./services/getAvailablePaymentMethods"
import { checkRequiredData } from "./utils/checkRequiredData"

const Registration = ({ pageContext, location }) => {
  const { vaccineeState, vaccineeDispatch } = useContext(VaccineeContext)
  const [loading, setLoading] = useState(false)

  const {
    module,
    backPath,
    nextPath,
    formFields,
    progress,
    numberOfPages,
    requiredData,
  } = pageContext

  let filteredFormFields = [...formFields]

  if (module?.module === "intake-form")
    filteredFormFields = trimIntakeForm({
      fields: filteredFormFields,
      vaccines: vaccineeState?.vaccines,
    })

  if (module?.module === "payment")
    filteredFormFields.push(
      getAvailablePaymentMethods({
        code: vaccineeState?.code?.code,
      })
    )

  let { sectionFormFields, validationSchema } = useRegistrationFormFields({
    formFields: filteredFormFields,
  })

  let initialValues = {
    ...generateInitialValues({ fields: filteredFormFields }),
    ...vaccineeState?.[module?.stateKey],
  }

  useEffect(() => {
    let sessionState = getContextFromSession()
    vaccineeDispatch({ type: "SAVE_WHOLE_STATE", payload: sessionState })

    if (
      requiredData &&
      !checkRequiredData({ data: sessionState, required: requiredData })
    )
      navigate("/")

    if (module?.module === "informedConsent")
      handleGetPayment({ location, vaccineeDispatch })

    //eslint-disable-next-line
  }, [])

  const handleSubmitVerification = (values) => {
    if (
      module?.module === "personal-details" &&
      vaccineeState?.orderingFor?.orderingFor === "Myself"
    ) {
      values.firstName = values?.employeeFirstName
      values.middleName = values?.employeeMiddleName
      values.lastName = values?.employeeLastName
      values.email = values?.employeeEmail
      values.mobileNumber = values?.employeeMobileNumber
      values.birthday = values?.employeeBirthday
      values.sex = values?.employeeSex
    }

    setLoading(true)
    vaccineeDispatch({
      type: module?.dispatchKey,
      payload: { ...values },
    })

    if (module?.module === "payment") {
      if (
        values?.paymentMethod !== "Cash" &&
        values?.paymentMethod !== "Pay Cash on Site"
      )
        handlePayment({
          location,
          values,
          vaccineeState,
          callback: () => {
            setLoading(false)
          },
        })
      else {
        navigate(nextPath)
      }
    } else {
      setLoading(false)
      navigate(nextPath)
    }
  }

  if (module?.module === "informedConsent") {
    let hasOrderingForSelf = vaccineeState?.vaccines?.some(
      (vaccine) => vaccine.orderingFor === "Myself"
    )
    if (hasOrderingForSelf) {
      sectionFormFields[0].fields[0].options = [
        "to have the vaccine administered to me by MedGrocer’s medical staff.",
      ]
    }
  }

  let companyName = vaccineeState?.code?.organization?.tradeName
  let subtitle = module?.subTitle
  if (module?.module === "personal-details")
    subtitle = `You are registered under ${companyName}. Please enter your details as an employee of ${companyName}.`

  return (
    <Layout
      subtitle={subtitle}
      title={module?.title}
      seoTitle={module?.seoTitle}
      progress={(progress / numberOfPages) * 100}
    >
      <Container isCentered fullhd={6}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmitVerification}
          validationSchema={validationSchema}
        >
          {({ values, errors, setFieldValue, submitCount }) => (
            <Form>
              {module?.module === "payment" && (
                <RegistrationPaymentSummary
                  vaccineeState={vaccineeState}
                  vaccineeDispatch={vaccineeDispatch}
                />
              )}
              {module?.module === "informedConsent" && (
                <InformedConsent vaccineeState={vaccineeState} />
              )}
              {sectionFormFields
                ?.sort((a, b) => a?.order - b?.order)
                ?.map((section) => (
                  <Fragment>
                    <Section
                      title={section?.section}
                      subtitle={section?.subtitle || ""}
                      id={section?.sectionId || ""}
                    >
                      {section?.fields.map((field, index) => {
                        if (!field?.referenceAnswer) {
                          return (
                            <Fragment>
                              <div className="is-flex">
                                {section?.section === "Intake Form" && (
                                  <span className="is-size-6 mr-1">
                                    {index + 1}.
                                  </span>
                                )}
                                <div className="is-flex-grow-1">
                                  {generateFormField({
                                    formFields: section?.fields,
                                    formField: field,
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
                    </Section>
                    {/* {errorMessage?.message && (
                    <Message color="danger">{errorMessage?.message}</Message>
                  )} */}
                  </Fragment>
                ))}
              <ActionButtons
                back={{
                  link:
                    backPath === "/checkout" &&
                    vaccineeState?.code?.code?.paymentArrangement !==
                      "Individual"
                      ? "/schedules"
                      : backPath,
                  label: "Back",
                }}
                submit={{
                  loading,
                  label: "Next",
                }}
              />
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  )
}

export default Registration
