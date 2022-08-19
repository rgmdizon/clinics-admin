import React, { useState, useEffect } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import classNames from "classnames"
import _ from "lodash"

import Message from "elements/Message"
import { getDateOptions, getAllDates } from "services/getDateOptions"

import styles from "../utils/calendar.module.scss"

import { formatDate } from "services/date"
import { formatNumber } from "services/formatting"

const Schedule = ({
  bookingState,
  bookingValues,
  setFieldValue,
  errors,
  submitCount,
  name = "preferredDate",
  dispatch,
}) => {
  const defaultDate =
    new Date(bookingValues.preferredDate) == "Invalid Date"
      ? new Date()
      : new Date(bookingValues.preferredDate)
  const [selectedDate, setDate] = useState(defaultDate)
  const [selectedDateObject, setDateObject] = useState(
    bookingState.selectedDateObject || {}
  )

  const [allDates, setAllDates] = useState([])
  const [availableDates, setAvailableDates] = useState([])
  const [calendarOptions, setCalendarOptions] = useState([])

  const getUpdatedDates = async () => {
    let tempDates = await getAllDates()
    setAllDates(tempDates)
  }

  const getAvailableDates = async () => {
    let filteredDates = await getDateOptions({ allDates, bookingValues })

    setAvailableDates(filteredDates)
    let options = filteredDates.map((eventObject) => {
      return formatDate(eventObject.startDate)
    })
    setCalendarOptions(options)
  }

  useEffect(() => {
    getUpdatedDates()
  }, [])

  useEffect(() => {
    getAvailableDates()
  }, [bookingValues])

  const handleDateChange = (value) => {
    let preferredDate = availableDates.find(
      (dateObject) => formatDate(dateObject.startDate) === formatDate(value)
    )
    setDateObject(preferredDate)
    setDate(value)

    const { startDate, googleCalendarEventId } = preferredDate
    setFieldValue(name, startDate)
    setFieldValue("googleCalendarEventId", googleCalendarEventId)

    dispatch({
      type: "SAVE_DATE_OBJECT",
      payload: preferredDate,
    })
  }

  const handleDisableDate = ({ date }) => {
    return !calendarOptions.includes(formatDate(date))
  }
  let errorMessage = submitCount > 0 ? _.get(errors, name) : ""

  return (
    <div className="mb-2">
      <label className="label has-text-weight-normal">Schedule</label>
      {selectedDateObject?.remainingSlots ? (
        <Message color="info">
          Available Slots:{" "}
          {formatNumber({ number: selectedDateObject.remainingSlots })}
        </Message>
      ) : null}
      <Calendar
        className={classNames("mt-1 is-centered", styles["reactCalendar"])}
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={handleDisableDate}
      />
      <p className="help is-danger">
        {!!errors
          ? !!errorMessage?.name
            ? errorMessage?.name
            : errorMessage
          : null}
      </p>
    </div>
  )
}

export default Schedule
