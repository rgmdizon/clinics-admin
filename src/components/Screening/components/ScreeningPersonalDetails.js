import React from "react"
import classNames from "classnames"

import ScreeningDetail from "./ScreeningDetail"

import styles from "../utils/screening.module.scss"

const ScreeningPersonalDetails = ({ values, sectionFormFields }) => {
  sectionFormFields = sectionFormFields
    ?.sort(
      (firstFormField, secondFormField) =>
        firstFormField?.order - secondFormField?.order
    )
    ?.filter(
      (section) =>
        !!section?.section &&
        section?.section !== "Screening Questionnaire" &&
        section?.section !== "Doctor's Assessment"
    )

  return (
    <div className={classNames(styles["screeningDetails__personalDetails"])}>
      {sectionFormFields?.map((section) =>
        section?.fields?.map((field) => (
          <ScreeningDetail values={values} field={field} />
        ))
      )}
      {/* <ScreeningDetail
      values={values}
      field={{ type: "text", label: "Vaccine Brand", name: "vaccineBrand" }}
      />
      <ScreeningDetail
        values={values}
        field={{ type: "text", label: "Dose Type", name: "doseType" }}
      /> */}
    </div>
  )
}

export default ScreeningPersonalDetails
