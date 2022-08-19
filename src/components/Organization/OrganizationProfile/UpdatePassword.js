import React, { Fragment, useState, useContext } from "react"
import { Formik, Form } from "formik"

import Message from "elements/Message"
import Section from "elements/Section"
import ActionButtons from "elements/ActionButtons"
import FormRequiredFieldsErrorMessage from "elements/Form/FormRequiredFieldsErrorMessage"

import { updatePassword } from "./services/profile"
import { useOrganizationProfileFormFields } from "./hooks/useOrganizationProfileFormFields"

import { generateFormField } from "elements/Form/services/form"
import { generateInitialValues } from "services/context"

import { AppContext } from "context/AppContext"
import { getSignedInUser } from "components/Auth/services/user"

const UpdatePassword = ({ pageContext, handleBackClick }) => {
  const { formFields } = pageContext
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState()
  const { dispatch } = useContext(AppContext)
  const updatePasswordFormFields = formFields.filter(
    (field) => field.subModule === "Update Password"
  )

  let { userData } = getSignedInUser()

  let {
    sectionFormFields,
    validationSchema,
  } = useOrganizationProfileFormFields({
    formFields: updatePasswordFormFields,
  })

  let initialValues = {
    ...generateInitialValues({ fields: updatePasswordFormFields }),
    emailAddress: userData?.email,
  }

  const handlePasswordUpdate = async (values) => {
    setLoading(true)
    await updatePassword({
      values,
      dispatch,
      setMessage,
      callback: () => {
        handleBackClick()
      },
    })
    setLoading(false)
  }
  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={handlePasswordUpdate}
      validationSchema={validationSchema}
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
          {message?.content && (
            <Message color={message?.type}>
              {message?.content?.message || message?.content}
            </Message>
          )}
          <ActionButtons
            back={{ label: "Back", callback: handleBackClick }}
            submit={{ label: "Continue", loading }}
          />
        </Form>
      )}
    </Formik>
  )
}

export default UpdatePassword
