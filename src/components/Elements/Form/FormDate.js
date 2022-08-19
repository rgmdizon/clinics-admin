import React, { Fragment, useEffect, useState } from "react"
import classNames from "classnames"

import FormSelect from "./FormSelect.js"

import { setYears, setMonths, setDates } from "./services/date"

/**
 ** Two select fields (MM, DD) and text field (YYYY) with label and error message.
 ** Supported parameters:
 **
 ** fieldProps: {
 **               'name': "birth",
 **               'label': "Birth",
 **               'isRequired': true,
 **               'onChange': Function,
 **               ...props compatible in Field Component of Formik
 **             }
 **/
const FormDate = (fieldProps) => {
  const { month, date, year } = fieldProps.values

  // let config = {
  //   future: false,
  //   past: true,
  //   weekdays: true,
  //   birthday: true,
  //   range: {
  //     minDate: "2021-01-13",
  //     maxDate: "2023-02-28",
  //     increment: "year",
  //     incrementValue: "5",
  //   }
  // };
  let config = fieldProps.config

  // array of months
  const [months, setMonthOptions] = useState([])
  // array of dates
  const [dates, setDateOptions] = useState([])
  // array of years
  const [years, setYearOptions] = useState([])

  // set years on load
  useEffect(() => {
    setYearOptions(setYears(config))
    //eslint-disable-next-line
  }, [])

  // show different months if year changes
  const handleYearChange = ({ value }, setFieldValue) => {
    let year = value
    // set months based on year
    setMonthOptions(setMonths(config, year))
    setFieldValue(`${fieldProps.name}.month`, { label: "", value: "" })
    setFieldValue(`${fieldProps.name}.date`, { label: "", value: "" })
  }

  // show different days if month changes
  const handleMonthChange = ({ value }, setFieldValue) => {
    let month = value
    let yearValue = year.value
    setDateOptions(setDates(config, month, yearValue))
    setFieldValue(`${fieldProps.name}.date`, { label: "", value: "" })
  }

  return (
    <Fragment>
      <div className="columns is-mobile p-0 m-0">
        <div className="column p-0 m-0">
          <label
            className={classNames("label has-text-weight-normal", {
              "mb-0": !!fieldProps.helper,
            })}
          >
            {fieldProps.label}
          </label>
          {!!fieldProps.helper && (
            <span className="help" style={{ whiteSpace: "pre-wrap" }}>
              {fieldProps.helper}
            </span>
          )}
        </div>
      </div>

      <div className="columns is-mobile">
        <div className="column mb-0">
          <FormSelect
            name={`${fieldProps.name}.year`}
            placeholder="YYYY"
            options={years}
            onChange={handleYearChange}
            value={year}
            isRequired={fieldProps.isRequired}
            hideOptional
          />
        </div>
        <div className="column mb-0">
          <FormSelect
            name={`${fieldProps.name}.month`}
            placeholder="MMM"
            options={months}
            onChange={handleMonthChange}
            isDisabled={!!!fieldProps.values.year.value}
            value={month}
            isRequired={fieldProps.isRequired}
            hideOptional
          />
        </div>
        <div className="column mb-0">
          <FormSelect
            name={`${fieldProps.name}.date`}
            placeholder="DD"
            options={dates}
            isDisabled={!!!fieldProps.values.month.value}
            value={date}
            isRequired={fieldProps.isRequired}
            hideOptional
          />
        </div>
      </div>
    </Fragment>
  )
}

export default FormDate
