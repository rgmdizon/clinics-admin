import React from "react"
import classNames from "classnames"

const PersonalDetails = ({ vaccineeState, styles }) => {
  let { personalDetails, schedules } = vaccineeState || {}

  return (
    <div>
      <section className={classNames("py-1", styles["hasBorderBottom"])}>
        <div className="columns mb-0">
          <p className={classNames("column pb-0", styles["labelScaling"])}>
            Name:{" "}
            <span className="has-text-weight-bold">
              {personalDetails?.firstName} {personalDetails?.lastName}
            </span>
          </p>
          <p className={classNames("column pb-0", styles["labelScaling"])}>
            Birth date:{" "}
            <span className="has-text-weight-bold">
              {personalDetails?.birthday?.month?.value}{" "}
              {personalDetails?.birthday?.date?.value},{" "}
              {personalDetails?.birthday?.year?.value}
            </span>
          </p>
          <p className={classNames("column", styles["labelScaling"])}>
            Sex:{" "}
            <span className="has-text-weight-bold">{personalDetails?.sex}</span>
          </p>
        </div>
        <div className="columns">
          <p className={classNames("column", styles["labelScaling"])}>
            Address:{" "}
          </p>
        </div>
      </section>
      <section className={classNames("py-1 mb-2", styles["hasBorderBottom"])}>
        <div className="columns">
          <p className={classNames("column pb-0", styles["labelScaling"])}>
            Occupation:
          </p>
          <p className={classNames("column pb-0", styles["labelScaling"])}>
            Contact number:{" "}
            <span className="has-text-weight-bold">
              {personalDetails?.mobileNumber}
            </span>
          </p>
        </div>
        <div className="columns">
          <p className={classNames("column mb-0", styles["labelScaling"])}>
            Vaccination site:{" "}
            <span className="has-text-weight-bold">
              {schedules?.venue?.label}
            </span>
          </p>
          <p className={classNames("column mb-0", styles["labelScaling"])}>
            Primary COVID-19 Vaccine Series (If booster):
          </p>
        </div>
      </section>
    </div>
  )
}

export default PersonalDetails
