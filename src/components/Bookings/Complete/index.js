import React from "react"
import { navigate } from "gatsby"
import { Formik, Form } from "formik"

import Card from "elements/Card"
import Message from "elements/Message"
import Container from "layout/Container"
import ActionButtons from "elements/ActionButtons"
import DashboardLayout from "layout/DashboardLayout"

import FormStyledRadio from "elements/Form/FormStyledRadio"

const Complete = ({ pageContext }) => {
  let { module, backPath, nextPaths } = pageContext
  let options = ["Send invite links", "Input individual vaccinee details"]

  const handleCompleteNextSteps = (values) => {
    navigate(nextPaths[values?.nextStep])
  }

  return (
    <DashboardLayout seoTitle={module?.seoTitle} title={module?.title}>
      <Container isCentered>
        <Card>
          <Message color="primary">
            We have received your booking request. We have generated unique
            links for your vaccinees to fill out.
          </Message>
          <Formik
            onSubmit={handleCompleteNextSteps}
            initialValues={{ nextStep: "" }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="columns mb-2">
                  {options.map((option) => (
                    <div className="column">
                      <FormStyledRadio
                        isActive={values?.nextStep === option}
                        onClick={() => {
                          setFieldValue("nextStep", option)
                        }}
                      >
                        {option}
                      </FormStyledRadio>
                    </div>
                  ))}
                </div>
                <ActionButtons
                  back={{ label: "Back", link: backPath }}
                  submit={{
                    label: "Continue",
                    disabled: values?.nextStep === "",
                  }}
                />
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </DashboardLayout>
  )
}

export default Complete
