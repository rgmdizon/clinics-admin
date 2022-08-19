import React, { Fragment, useState, useContext } from "react"
import { Formik, Form } from "formik"

import Message from "elements/Message"
import Section from "elements/Section"
import ActionButtons from "elements/ActionButtons"
import FormRequiredFieldsErrorMessage from "elements/Form/FormRequiredFieldsErrorMessage"

import { getSignedInUser } from "components/Auth/services/user"
import { useOrganizationProfileFormFields } from "./hooks/useOrganizationProfileFormFields"

import { updateProfile } from "./services/profile"

import { isObjectEmpty } from "services/general"
import { generateFormField } from "elements/Form/services/form"
import { generateInitialValues } from "services/context"

import { AppContext } from "context/AppContext"

const UpdateOrganizationForm = ({ pageContext, handleBackClick }) => {
  const { formFields } = pageContext

  const [loading, setLoading] = useState(false)
  const { dispatch } = useContext(AppContext)

  const organizationDetailsFormFields = formFields.filter(
    (field) => field.subModule === "Organization Details"
  )

  let {
    sectionFormFields,
    validationSchema,
  } = useOrganizationProfileFormFields({
    formFields: organizationDetailsFormFields,
  })

  const { organization, accountOwnerData, addresses } = getSignedInUser()

  const address = !isObjectEmpty(addresses) ? addresses?.addresses[0] : {}

  let initialValues = {
    ...generateInitialValues({ fields: organizationDetailsFormFields }),
    ...organization,
    ...accountOwnerData,
    address: {
      ...address,
      addressType: "Office",
      province: { label: address?.province, value: address?.province },
      city: { label: address?.city, value: address?.city },
    },
  }
  const handleEditProfileSubmit = async (values) => {
    setLoading(true)
    await updateProfile({ dispatch, values, handleBackClick })
    setLoading(false)
  }

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={handleEditProfileSubmit}
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
          <ActionButtons
            back={{ label: "Back", callback: handleBackClick }}
            submit={{ label: "Save", loading }}
          />
        </Form>
      )}
    </Formik>
  )
}

export default UpdateOrganizationForm
