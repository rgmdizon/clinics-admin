import React, { useEffect, useContext, Fragment, useState } from "react"
import { navigate } from "gatsby"
import { Formik, Form } from "formik"

import Layout from "layout"
import Container from "layout/Container"

import Message from "elements/Message"
import Section from "elements/Section"
import ActionButtons from "elements/ActionButtons"
import FormRequiredFieldsErrorMessage from "elements/Form/FormRequiredFieldsErrorMessage"

import { hasRoles } from "auth/services/user"
import { isBrowser } from "services/general"
import { generateFormField } from "elements/Form/services/form"
import { generateInitialValues } from "services/context"
import { useRegistrationFormFields } from "./hooks/useRegistrationFormFields"
import { createOrganizationDocument } from "./services/createOrganizationDocument"

import { getSignedInUser } from "auth/services/user"
import { OrganizationContext } from "organization/context/OrganizationContext"

const Registration = (props) => {
  const { state, dispatch } = useContext(OrganizationContext)
  const [loading, setLoading] = useState(false)
  const [hasSubmissionError, setHasSubmissionError] = useState(false)

  let { pageContext } = props
  let { userData } = getSignedInUser()

  useEffect(() => {
    if (isBrowser()) {
      dispatch({ type: "GET_CONTEXT_FROM_SESSION" })
      if (hasRoles()) navigate("/profile")
      if (!userData) navigate("/sign-in")
    }
    //eslint-disable-next-line
  }, [dispatch])

  let formFields = pageContext.formFields

  let { sectionFormFields, validationSchema } = useRegistrationFormFields({
    formFields,
  })

  let initialValues = {
    ...generateInitialValues({ fields: formFields }),
  }

  const handleRegistrationSubmit = async (values) => {
    setLoading(true)

    await createOrganizationDocument({
      registration: { ...values, documents: state.documents },
      callback: () => {
        navigate(pageContext.nextPath)
      },
      errorCallback: () => {
        setHasSubmissionError(true)
      },
    })
    setLoading(false)
  }

  return (
    <Layout
      title={pageContext?.module?.title}
      subtitle={pageContext?.module?.subtitle}
      seoTitle={pageContext?.module?.seoTitle}
      display={{ footer: false, helpCenterBanner: false }}
    >
      <Container isCentered fullhd={6}>
        <Formik
          initialValues={{ ...initialValues }}
          onSubmit={handleRegistrationSubmit}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue, errors, submitCount }) => (
            <Form>
              <Message color="info">
                <p>
                  This website is used by MedGrocer’s corporate partners to
                  enroll vaccinees for COVID-19 vaccination. We will need your
                  and your organization’s details to create an account for you.
                  Once you have created an account, you will be able to log-in
                  to the website to enroll individuals in your organization
                  using their email addresses.
                </p>
              </Message>
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
                      {section?.fields.map((field) => {
                        if (!field?.referenceAnswer) {
                          return (
                            <Fragment>
                              {generateFormField({
                                formFields: section?.fields,
                                formField: field,
                                values,
                                setFieldValue,
                                submitCount,
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
              {hasSubmissionError && (
                <FormRequiredFieldsErrorMessage errors={errors} />
              )}

              <ActionButtons submit={{ label: "Continue", loading }} />
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  )
}

export default Registration
