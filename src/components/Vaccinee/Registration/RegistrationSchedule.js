import React, { useContext, useEffect } from "react"
import { Formik, Form } from "formik"
import { navigate } from "gatsby"
import moment from "moment"

import Layout from "layout"
import Section from "elements/Section"
import Container from "layout/Container"
// import Message from "elements/Message"
import FormSelect from "elements/Form/FormSelect"
import ActionButtons from "elements/ActionButtons"
import FormCalendar from "elements/Form/FormCalendar"

import { getContextFromSession } from "services/context"
import { VaccineeContext } from "../context/VaccineeContext"
import { getScheduleSelect } from "./services/getScheduleSelect"
import { checkRequiredData } from "./utils/checkRequiredData"

const Registration = ({ pageContext }) => {
  const { vaccineeState, vaccineeDispatch } = useContext(VaccineeContext)
  const {
    module,
    backPath,
    nextPath,
    progress,
    numberOfPages,
    requiredData,
  } = pageContext

  let totalVaccineeJabs = vaccineeState?.vaccines?.reduce((prev, vax) => {
    return vax.type === "COVID-19"
      ? prev + 1
      : prev + vax?.totalPrice / vax?.vaccinePrice
  }, 0)

  let initialValues = {
    venue: {},
    scheduleDate: "",
    scheduleTime: "",
    ...vaccineeState?.[module?.stateKey],
  }

  let venueDateTimeMap = getScheduleSelect({
    schedules: vaccineeState?.code?.schedules.filter((sched) =>
      moment().isBefore(
        moment(
          moment(sched.startDate).add(
            -vaccineeState?.code?.code?.registrationClosingHours,
            "h"
          )
        )
      )
    ),
  })

  let venueOptions = Object.keys(venueDateTimeMap)?.map((venue) => ({
    label: venue,
    value: venue,
  }))

  const handleSubmitVerification = (values) => {
    vaccineeDispatch({
      type: module?.dispatchKey,
      payload: {
        ...values,
        totalVaccineeJabs,
        venueId: venueDateTimeMap[values?.venue?.value][0]?.id,
      },
    })

    if (
      nextPath === "/checkout" &&
      vaccineeState?.code?.code?.paymentArrangement !== "Individual"
    )
      navigate("/informed-consent")
    else navigate(nextPath)
  }

  useEffect(() => {
    let sessionState = getContextFromSession()
    vaccineeDispatch({ type: "SAVE_WHOLE_STATE", payload: sessionState })

    if (
      requiredData &&
      !checkRequiredData({ data: sessionState, required: requiredData })
    )
      navigate("/")

    //eslint-disable-next-line
  }, [])

  let hasOrderingForDependent = vaccineeState?.vaccines?.some(
    (vaccine) => vaccine.orderingFor === "Dependent"
  )

  return (
    <Layout
      title={module?.title}
      subtitle={module?.subTitle}
      seoTitle={module?.seoTitle}
      progress={(progress / numberOfPages) * 100}
    >
      <Container isCentered fullhd={6}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmitVerification}
        >
          {({ values, errors, setFieldValue, submitCount }) => (
            <Form>
              <Section addOns={{ left: 1 }} title={"Select Venue"}>
                <FormSelect
                  isRequired
                  name="venue"
                  label="Venue"
                  errors={errors}
                  onChange={() => {
                    setFieldValue("scheduleDate", "")
                    setFieldValue("scheduleTime", {})
                  }}
                  value={values?.venue}
                  options={venueOptions}
                />
              </Section>
              {values?.venue?.label && (
                <Section addOns={{ left: 2 }} title={"Select Vaccination Date"}>
                  <FormCalendar
                    isRequired
                    values={values}
                    errors={errors}
                    onChange={() => {
                      setFieldValue("scheduleTime", {})
                    }}
                    enabledDates={
                      venueDateTimeMap[values?.venue?.label]?.map((date) =>
                        moment(date?.date)?.toDate()
                      ) || []
                    }
                    name="scheduleDate"
                    setFieldValue={setFieldValue}
                  />
                </Section>
              )}
              {!!values?.scheduleDate && (
                <Section addOns={{ left: 3 }} title={"Select Vaccination Time"}>
                  <FormSelect
                    isRequired
                    errors={errors}
                    name="scheduleTime"
                    label="Schedule Time"
                    value={values?.scheduleTime}
                    options={
                      venueDateTimeMap[values?.venue?.label]
                        ?.find((date) =>
                          moment(values?.scheduleDate)?.isSame(
                            date?.date,
                            "day"
                          )
                        )
                        ?.timeSlots?.map((time) => ({
                          value: time,
                          label: time,
                        }))
                        ?.sort((dateOne, dateTwo) => {
                          let dateOneValue = moment(
                            dateOne.value.split(" - ")[0],
                            "MMM DD, YYYY h:mmA"
                          ).toDate()
                          let dateTwoValue = moment(
                            dateTwo.value.split(" - ")[0],
                            "MMM DD, YYYY h:mmA"
                          ).toDate()

                          return dateOneValue - dateTwoValue
                        }) || []
                    }
                  />
                </Section>
              )}
              <ActionButtons
                back={{
                  link: hasOrderingForDependent ? "/vaccines" : backPath,
                  label: "Back",
                }}
                submit={{
                  // loading,
                  disabled: !values?.scheduleTime?.value,
                  label: "Next",
                }}
              />
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  )
}

export default Registration
