import React from "react"
import classNames from "classnames"

import FormSelect from "./FormSelect"

import { daysOfTheWeek, timeBlocks } from "./utils/schedules"

const FormSchedule = (fieldProps) => {
  let otherSchedules = fieldProps.otherSchedules || []
  let daySelected = fieldProps?.formValues?.[fieldProps.name]?.day
  let timeSelected = fieldProps?.formValues?.[`${fieldProps.name}`]?.time
  let timesSelected = []
  let sameDaySchedules = otherSchedules.filter(
    (schedule) =>
      !!schedule?.day?.value && schedule?.day?.value === daySelected?.value
  )

  if (sameDaySchedules?.length > 0)
    timesSelected = otherSchedules
      .filter((schedule) => schedule?.day?.value === daySelected?.value)
      .map((schedule) => schedule?.time?.value)

  return (
    <div className="mb-2">
      <label className={classNames("label has-text-weight-normal")}>
        {fieldProps.label}
        {!fieldProps.isRequired && !fieldProps.hideOptional && (
          <span className="has-text-grey is-italic"> (Optional)</span>
        )}
        {!!fieldProps.helper && (
          <span
            className={classNames(
              "help has-text-weight-normal",
              fieldProps.helperClassName
            )}
          >
            {fieldProps.helper}
          </span>
        )}
      </label>
      <div className="columns is-mobile mb-0">
        <div className="column pb-0">
          <FormSelect
            name={`${fieldProps.name}.day`}
            placeholder="Choose day..."
            options={daysOfTheWeek}
            value={daySelected}
            isRequired={!!fieldProps?.isRequired}
          />
        </div>
        <div className="column pb-0">
          <FormSelect
            name={`${fieldProps.name}.time`}
            placeholder="Choose time..."
            options={timeBlocks.filter(
              (timeBlock) => !timesSelected.includes(timeBlock.value)
            )}
            value={timeSelected}
            isRequired={!!fieldProps?.isRequired}
          />
        </div>
      </div>
    </div>
  )
}

export default FormSchedule
