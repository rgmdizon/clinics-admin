import React, { useContext, Fragment, useState, useEffect } from "react"
import { Formik, Form } from "formik"
import { navigate } from "gatsby"

import ScheduleSelect from "./Scheduling/ScheduleSelect"

import Card from "elements/Card"
import Section from "elements/Section"
import Message from "elements/Message"
import Container from "layout/Container"
import ActionButtons from "elements/ActionButtons"
import DashboardLayout from "layout/DashboardLayout"
import ScheduleLoading from "./Scheduling/ScheduleLoading"

import { checkIfBeyondAllocation } from "./services/checkIfBeyondAllocation"
import { BookingContext } from "../context/BookingContext"
import { generateInitialValues } from "services/context"
import { generateFormField } from "elements/Form/services/form"
import { useBookingFormFields } from "../hooks/useBookingFormFields"
import { isObjectEmpty } from "services/general"
import { getContextFromSession } from "services/context"

import { getRemainingAllocation } from "auth/services/allocations"
import FormRequiredFieldsErrorMessage from "../../Elements/Form/FormRequiredFieldsErrorMessage"
import AllocationErrorMessage from "./AllocationErrorMessage"

const ALLOCATIONS_VIEW = "ALLOCATIONS_VIEW"

const Book = ({ pageContext, setView }) => {
  const { state, dispatch } = useContext(BookingContext)
  let { module, formFields, backPath, nextPath } = pageContext

  const [scheduleLoading, setScheduleLoading] = useState(true)
  const [overAllocation, setOverAllocation] = useState({})
  let sessionState = getContextFromSession()

  let bookingState = !isObjectEmpty(sessionState?.bookings)
    ? sessionState?.bookings
    : state?.bookings

  formFields.forEach((field) => {
    if (scheduleLoading) {
      field.isDisabled = true
    } else {
      field.isDisabled = false
    }
  })

  let { sectionFormFields, validationSchema } = useBookingFormFields({
    formFields,
  })

  sectionFormFields = sectionFormFields.filter((section) => {
    return section.section !== "Select Venue and Schedule"
  })

  let initialValues = {
    ...generateInitialValues({ fields: formFields }),
    ...bookingState,
  }

  const handleSaveBooking = (values) => {
    if (!checkIfBeyondAllocation({ values, setOverAllocation })) {
      dispatch({
        type: "SAVE_BOOKING",
        payload: values,
      })
      navigate(module?.bookEvent?.nextPath || nextPath)
    }
  }

  useEffect(() => {
    dispatch({
      type: "GET_CONTEXT_FROM_SESSION",
    })

    const remainingAllocation = getRemainingAllocation()

    const vaccines = Object.keys(remainingAllocation || [])

    const hasConsumedAllocations = vaccines.every((vaccine) => {
      return remainingAllocation[vaccine] <= 0
    })

    if (hasConsumedAllocations) {
      if (setView) setView(ALLOCATIONS_VIEW)
      else navigate("/bookings/allocations-consumed")
    }

    //eslint-disable-next-line
  }, [])

  return (
    <DashboardLayout
      seoTitle={module?.bookEvent?.seoTitle || module?.seoTitle}
      title={module?.bookEvent?.title || module?.title}
    >
      <Container isCentered>
        <Card>
          <Formik
            onSubmit={handleSaveBooking}
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
          >
            {({
              values,
              setFieldValue,
              errors,
              submitCount,
              setFieldError,
            }) => (
              <Form>
                <Message color="info">
                  <p className="has-text-weight-bold">
                    One Booking per Combination of Brand, Age Category, and Jab
                    Category.{" "}
                  </p>
                  <p>
                    If you have vaccinees that fall under multiple brands or
                    categories, please create multiple bookings. For example,
                    create one booking for your Moderna First Dose Adult
                    Employees, one booking for your Moderna Booster Adult
                    Employees, one booking for your Moderna Booster Pediatric
                    Dependents, one booking for your AstraZeneca First Dose
                    Adult Employees, and so on.
                  </p>
                </Message>
                {scheduleLoading ? <ScheduleLoading /> : null}
                {!scheduleLoading &&
                  sectionFormFields
                    .sort(
                      (firstFormField, secondFormField) =>
                        firstFormField.order - secondFormField.order
                    )
                    .map((section, index) => (
                      <Fragment>
                        <Section
                          // addOns={{ left: index + 1 }}
                          title={section?.section}
                          subtitle={section?.subtitle || ""}
                          id={section?.sectionId || ""}
                        >
                          {section?.message && (
                            <Message color="light">
                              <p>
                                <p>{section?.message}</p>
                              </p>
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
                <ScheduleSelect
                  setFieldValue={setFieldValue}
                  submitCount={submitCount}
                  errors={errors}
                  values={values}
                  formFields={formFields}
                  scheduleLoading={scheduleLoading}
                  setScheduleLoading={setScheduleLoading}
                />
                {!scheduleLoading && (
                  <Fragment>
                    {" "}
                    <FormRequiredFieldsErrorMessage errors={errors} />
                    {!isObjectEmpty(overAllocation) && (
                      <AllocationErrorMessage
                        config={overAllocation}
                        setFieldError={setFieldError}
                      />
                    )}
                    <ActionButtons
                      back={{ label: "Back", link: backPath }}
                      submit={{ label: module?.bookEvent?.cta || module?.cta }}
                    />
                  </Fragment>
                )}
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </DashboardLayout>
  )
}

export default Book
