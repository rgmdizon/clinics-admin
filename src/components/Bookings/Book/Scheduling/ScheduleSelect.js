import React, { Fragment, useEffect, useState, useContext } from "react"

import Section from "elements/Section"
import Message from "elements/Message"

import { generateFormField } from "elements/Form/services/form"
import { useBookingFormFields } from "../../hooks/useBookingFormFields"

import { getDateOptions, getAllDates } from "../services/getDateOptions"
import { BookingContext } from "../../context/BookingContext"
import { getContextFromSession } from "services/context"

import { GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL } from "gatsby-env-variables"

const ScheduleSelect = ({
  setFieldValue,
  submitCount,
  errors,
  values,
  formFields,
  scheduleLoading,
  setScheduleLoading,
}) => {
  const { state, dispatch } = useContext(BookingContext)

  const sessionState = getContextFromSession()
  let stateAllDates = sessionState?.allDates
    ? sessionState?.allDates
    : state?.allDates

  const [allDates, setAllDates] = useState(stateAllDates || [])
  const [dateOptions, setDateOptions] = useState([])
  const [scheduleDisabled, setScheduleDisabled] = useState(true)

  const [hasNoOptions, setHasNoOptions] = useState(false)

  let scheduleFormFields = formFields.filter(
    (field) => field.section === "Select Venue and Schedule"
  )

  scheduleFormFields.forEach((field) => {
    if (field.name === "bookingDate") {
      field.options = dateOptions
      field.isDisabled = scheduleDisabled
    }
  })
  let { sectionFormFields } = useBookingFormFields({
    formFields: scheduleFormFields,
  })

  const getUpdatedDates = async () => {
    setScheduleLoading(true)

    let tempDates
    if (allDates.length === 0) {
      tempDates = await getAllDates()
      if (tempDates) {
        dispatch({
          type: "SAVE_ALL_DATES",
          payload: tempDates,
        })
        setAllDates(tempDates)
      }
    }
    setScheduleLoading(false)
    setHasNoOptions(false)
  }

  const getAvailableDates = async () => {
    let filteredDates = getDateOptions({
      allDates,
      bookingValues: values,
    })?.filter((date) => date?.value?.venue === values?.venue?.value)

    if (filteredDates.length === 1) {
      setFieldValue("bookingDate", filteredDates[0])
    }

    if (!filteredDates || filteredDates.length === 0) {
      setHasNoOptions(true)
    } else {
      setHasNoOptions(false)
    }

    if (
      !values.numberOfDoses ||
      !values.brand.value ||
      filteredDates.length === 0
    ) {
      setScheduleDisabled(true)
    } else setScheduleDisabled(false)

    setDateOptions(filteredDates)
  }

  useEffect(() => {
    getUpdatedDates()
    //eslint-disable-next-line
  }, [])

  const handleResetDateSelect = () => {
    setFieldValue("bookingDate", { value: "", label: "" })
  }

  useEffect(() => {
    handleResetDateSelect()
    getAvailableDates()
    //eslint-disable-next-line
  }, [values.numberOfDoses, values.brand, values.doseType, values.venue])

  return (
    <Fragment>
      {!scheduleLoading &&
        sectionFormFields
          .sort(
            (firstFormField, secondFormField) =>
              firstFormField.order - secondFormField.order
          )
          .map((section, index) => (
            <Fragment id={index}>
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
              {hasNoOptions ? (
                <Message color="danger">
                  <p className="is-size-6">
                    There are no available vaccination dates for your booking.
                    Please contact{" "}
                    <a
                      href={`mailto:${GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL}
                    </a>{" "}
                    to inquire for schedules.
                  </p>
                </Message>
              ) : null}
            </Fragment>
          ))}
    </Fragment>
  )
}

export default ScheduleSelect
