import React, { useState, useEffect, Fragment } from "react"

import { navigate } from "gatsby"

import { Formik, Form } from "formik"

import Layout from "layout"
import Container from "layout/Container"

import Card from "elements/Card"
import Button from "elements/Button"

import Message from "elements/Message"
import Section from "elements/Section"

import { handleDoctorVerification } from "./services/handleDoctorVerification"
import { useDoctorVerificationFormFields } from "./hooks/useDoctorVerificationFormFields"
import { generateInitialValues } from "services/context"
import { generateFormField } from "elements/Form/services/form"

import { isObjectEmpty, isBrowser } from "services/general"

import FormRequiredFieldsErrorMessage from "elements/Form/FormRequiredFieldsErrorMessage"

const VaccineeScreening = ({ pageContext }) => {
  let { formFields, module, nextPath } = pageContext

  const [loading, setLoading] = useState(false)

  const [verificationError, setVerificationError] = useState(null)

  let { sectionFormFields, validationSchema } = useDoctorVerificationFormFields(
    {
      formFields,
    }
  )

  let initialValues = {
    ...generateInitialValues({ fields: formFields }),
  }

  const handleVerification = async (values) => {
    setLoading(true)
    const isVerified = await handleDoctorVerification({
      values,
      setVerificationError,
    })

    if (isVerified) navigate(nextPath)

    setLoading(false)
  }

  useEffect(() => {
    if (isBrowser()) sessionStorage.removeItem("doctorData")
  }, [])
  return (
    <Layout
      background="light-teal"
      seoTitle={module.seoTitle}
      display={{ footer: true, helpCenterBanner: false }}
    >
      <Container isCentered tablet={8} desktop={6} fullhd={4}>
        <Card
          className="my-3"
          title={module?.title}
          subtitle={module?.subtitle}
        >
          <Formik
            enableReinitialize
            onSubmit={handleVerification}
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
                {submitCount === 0 ? (
                  <FormRequiredFieldsErrorMessage errors={errors} />
                ) : null}
                {verificationError ? (
                  <Message color="danger">
                    <p className="is-size-6">{verificationError}</p>
                  </Message>
                ) : null}
                <Button
                  type="submit"
                  color="primary"
                  isLoading={loading}
                  isDisabled={!isObjectEmpty(errors)}
                  className="mt-2"
                  isFullwidth
                >
                  Verify
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </Layout>
  )
}

export default VaccineeScreening
