import React from "react"
import moment from "moment"
import classNames from "classnames"
import { Field, ErrorMessage } from "formik"

import Calendar from "react-calendar"

import "react-calendar/dist/Calendar.css"

import styles from "./utils/form.module.scss"

const FormCalendar = ({
  name,
  label,
  values,
  helper,
  onChange,
  isRequired,
  hideOptional,
  enabledDates,
  setFieldValue,
}) => {

  const handleSelectDate = (value) => {
    setFieldValue(name, value)
    if (onChange) onChange()
  }

  return (
    <div className="is-flex is-align-items-center is-justify-content-center">
      <label
        className={classNames("label has-text-weight-normal has-text-left")}
      >
        {label}
        {!isRequired && !hideOptional && (
          <span className="has-text-grey is-italic"> (Optional)</span>
        )}
        {!!helper && (
          <span
            className={classNames("help has-text-weight-normal has-text-left")}
          >
            {helper}
          </span>
        )}
      </label>
      <Field>
        {() => (
          <Calendar
            className={classNames(styles["formCalendar__calendar"])}
            tileClassName={classNames(styles["formCalendar__tile"])}
            calendarType="US"
            minDetail="month"
            nextLabel="►"
            prevLabel="◄"
            view="month"
            tileDisabled={({ date }) => {
              let enabledParsedDates = []
              let parsedDate = moment(date)?.format("MMM DD, YYYY")

              if (!!enabledDates) {
                for (const enabledDate of enabledDates) {
                  enabledParsedDates.push(
                    moment(enabledDate)?.format("MMM DD, YYYY")
                  )
                }
              } else return false

              return !enabledParsedDates?.includes(parsedDate)
            }}
            value={!!values[name] ? new Date(values[name]) : ""}
            onChange={handleSelectDate}
          />
        )}
      </Field>
      <p className="help mt-0 mb-1 is-danger has-text-left">
        <ErrorMessage name={name} />
      </p>
    </div>
  )
}

export default FormCalendar
