import React, { Fragment } from "react"
import { Formik, Form } from "formik"

import Card from "elements/Card"
import Message from "elements/Message"
import Section from "elements/Section"
import ActionButtons from "elements/ActionButtons"
import FormRequiredFieldsErrorMessage from "elements/Form/FormRequiredFieldsErrorMessage"

import { generateFormField } from "elements/Form/services/form"
import { useVaccineeDetailsFormFields } from "./hooks/vaccineeDetailsFormFields"

const PersonalDetails = ({ vaccineeDetails, formFields }) => {
  // const [loading, setLoading] = useState(false)

  const personalDetailsFormFields = formFields.filter(
    (field) => field.subModule === "Personal Details"
  )

  let { sectionFormFields } = useVaccineeDetailsFormFields({
    formFields: personalDetailsFormFields,
  })

  return (
    <Card>
      <Formik
        enableReinitialize
        initialValues={vaccineeDetails}
        // onSubmit={() => {}}
        // validationSchema={validationSchema}
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
            <ActionButtons submit={{ label: "Save" }} />
          </Form>
        )}
      </Formik>
    </Card>
  )
}

export default PersonalDetails
