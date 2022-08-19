import React, { Fragment, useState, useEffect, useContext } from "react"
import { Formik, Form } from "formik"
import { navigate } from "gatsby"

import Layout from "layout"
import Container from "layout/Container"
import Message from "elements/Message"
import Section from "elements/Section"
import ActionButtons from "elements/ActionButtons"
import FormRequiredFieldsErrorMessage from "elements/Form/FormRequiredFieldsErrorMessage"

import { isBrowser } from "services/general"
import { generateInitialValues } from "services/context"
import { VaccineeContext } from "../context/VaccineeContext"
import { getVaccineeData } from "./services/getVaccineeData"
import { generateFormField } from "elements/Form/services/form"
import { GATSBY_HAS_SCREENING_FORM } from "gatsby-env-variables"
import { checkIsRegistrationValid } from "./services/checkIsRegistrationValid"
import { processVaccineeRegistration } from "./services/processVaccineeRegistration"
import { useVaccineeDetailsFormFields } from "../VaccineeDetails/hooks/vaccineeDetailsFormFields"

const PersonalDetails = ({ pageContext }) => {
  const { vaccineeState, vaccineeDispatch } = useContext(VaccineeContext)

  const BOOSTER_QUESTIONS = [
    "alreadyReceivedBooster",
    "hasThreeMonthsPassed",
    "hasSevereAllergic",
  ]

  const [vaccinee, setVaccinee] = useState({})
  const [loading, setLoading] = useState(false)
  const [organizationBooking, setOrganizationBooking] = useState({})

  const { module, formFields, backPath } = pageContext

  const personalDetailsFormFields = formFields.filter(
    (field) => field.subModule === "Personal Details"
  )

  let documentId = ""
  let vaccineeType = ""
  let email = ""
  if (isBrowser()) {
    const params = new URLSearchParams(window.location.search)
    documentId = params.get("uid")
    email = atob(params.get("email"))
    vaccineeType = atob(params.get("category"))
  }

  let filteredFormFields = personalDetailsFormFields

  if (vaccineeType !== "Pediatric") {
    filteredFormFields = filteredFormFields
      .filter((field) => field.section !== "Parent or Guardian Information")
      .filter((field) => field.alternateOption !== "Pediatric")
  } else {
    filteredFormFields = filteredFormFields.filter(
      (field) => field.alternateOption !== "Adult"
    )
  }

  if (vaccinee?.doseType !== "Booster") {
    filteredFormFields = filteredFormFields?.filter(
      (field) => !BOOSTER_QUESTIONS?.includes(field?.name)
    )
  }

  let { sectionFormFields, validationSchema } = useVaccineeDetailsFormFields({
    formFields: filteredFormFields,
  })

  let initialValues = {
    ...generateInitialValues({ fields: filteredFormFields }),
    ...vaccineeState?.registration,
    email: email,
  }

  const handleSubmit = (values) => {
    if (module?.form === "screening" || !GATSBY_HAS_SCREENING_FORM) {
      setLoading(true)
      processVaccineeRegistration({
        vaccinee: values,
        organizationBooking,
        vaccinationUid: documentId,
        isPediatric: vaccineeType === "Pediatric",
        callback: () => {
          setLoading(false)
          vaccineeDispatch({ type: "RESET_DETAILS" })
          navigate("/covid/vaccinee/complete")
        },
        errorCallback: () => {
          setLoading(false)
        },
      })
    } else {
      vaccineeDispatch({
        type: "SAVE_REGISTRATION",
        payload: values,
      })

      if (isBrowser())
        navigate(
          `/covid/screening/?uid=${documentId}&email=${btoa(
            email
          )}&category=${btoa(vaccineeType)}`
        )
    }
  }

  const checkIfRegistrationIsValid = async () => {
    let isRegistrationInvalid = await checkIsRegistrationValid({
      vaccinationUid: documentId,
      setOrganizationBooking,
    })

    if (!isRegistrationInvalid?.isValid) {
      vaccineeDispatch({
        type: "SAVE_INVALIDITY_REASON",
        payload: isRegistrationInvalid?.reason,
      })

      navigate("/covid/vaccinee/invalid")
    }
  }

  const fetchVaccineeData = async () => {
    let vaccineDocument = await getVaccineeData({ vaccinationUid: documentId })
    setVaccinee(vaccineDocument)
  }

  useEffect(() => {
    checkIfRegistrationIsValid()
    fetchVaccineeData()
    //eslint-disable-next-line
  }, [])

  let actionButtonsPayload = {
    submit: { label: "Next" },
  }

  if (isBrowser() && module?.form === "screening")
    actionButtonsPayload = {
      submit: { label: "Confirm Registration", loading },
      back: {
        label: "Back",
        link: `${backPath}?uid=${documentId}&email=${btoa(
          email
        )}&category=${btoa(vaccineeType)}`,
      },
    }

  return (
    <Layout
      title={module?.title}
      subtitle={module?.subtitle}
      seoTitle={module?.seoTitle}
    >
      <Container isCentered fullhd={6}>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={{ ...initialValues }}
        >
          {({ values, setFieldValue, errors, submitCount }) => (
            <Form>
              {sectionFormFields
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
                      {section?.fields.map((field, index) => {
                        if (!field?.referenceAnswer) {
                          return (
                            <Fragment>
                              <div className="is-flex">
                                {section?.section ===
                                  "Screening Questionnaire" && (
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
                  </Fragment>
                ))}
              <FormRequiredFieldsErrorMessage errors={errors} />
              {!GATSBY_HAS_SCREENING_FORM ? (
                <ActionButtons
                  submit={{ label: "Confirm Registration", loading }}
                  back={{
                    label: "Back",
                    link: backPath,
                  }}
                />
              ) : (
                <ActionButtons {...actionButtonsPayload} />
              )}
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  )
}

export default PersonalDetails
