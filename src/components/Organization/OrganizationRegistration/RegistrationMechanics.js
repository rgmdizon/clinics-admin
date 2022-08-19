import React, { Fragment, useState, useContext } from "react"
import { Formik, Form } from "formik"

import Layout from "layout"
import Container from "layout/Container"
import ActionButtons from "elements/ActionButtons"
import Section from "elements/Section"
import Message from "elements/Message"

import mechanics from "./utils/registrationMechanics.json"

import { isObjectEmpty } from "services/general"

import { useRegistrationFormFields } from "./hooks/useRegistrationFormFields"
import { generateFormField } from "elements/Form/services/form"
import { generateInitialValues } from "services/context"
import { OrganizationContext } from "organization/context/OrganizationContext"
import FormRequiredFieldsErrorMessage from "../../Elements/Form/FormRequiredFieldsErrorMessage"

const RegistrationMechanics = (props) => {
  const { pageContext } = props
  const { state, dispatch } = useContext(OrganizationContext)
  const [hasSubmissionError] = useState(false)

  let formFields = pageContext.formFields

  let { sectionFormFields, validationSchema } = useRegistrationFormFields({
    formFields,
  })

  let initialValues = {
    ...generateInitialValues({ fields: formFields }),
  }

  return (
    <Layout
      title={pageContext?.module?.title}
      subtitle={pageContext?.module?.subtitle}
      seoTitle={pageContext?.module?.seoTitle}
      display={{ footer: false, helpCenterBanner: false }}
    >
      <Container isCentered>
        <div className="content">
          <ol className="mb-2">
            {mechanics.map((mechanic, index) => (
              <li
                className="mt-1 is-size-5"
                key={index}
                dangerouslySetInnerHTML={{
                  __html: mechanic.description,
                }}
              />
            ))}
          </ol>

          <Formik
            initialValues={{ ...initialValues }}
            onSubmit={(values) => {
              dispatch({
                type: "SAVE_CONTEXT_TO_SESSION",
                payload: {
                  ...state,
                  organizationRegistration: {
                    ...state.organizationRegistration,
                    ...values,
                  },
                },
              })
            }}
            validationSchema={validationSchema}
            validateOnMount={true}
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
                <FormRequiredFieldsErrorMessage errors={errors} />
                {hasSubmissionError && (
                  <Message color="danger">
                    Something went wrong with completing your account. Please
                    try again.
                  </Message>
                )}
                <ActionButtons
                  submit={{
                    link: pageContext?.nextPath,
                    label: pageContext?.module?.cta,
                    disabled: !isObjectEmpty(errors),
                  }}
                />
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </Layout>
  )
}

export default RegistrationMechanics
