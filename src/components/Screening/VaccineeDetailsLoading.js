import React from "react"
import classNames from "classnames"

import Loading from "elements/Loading"

import styles from "./utils/screening.module.scss"

const VaccineeDetailsLoading = () => {
  return (
    <div className={classNames("my-2", styles["loadingContainer"])}>
      <Loading size="5" isFullscreen={false} />
      <p className="has-text-grey has-text-centered">
        Loading vaccinee's details.
      </p>
    </div>
  )
}

export default VaccineeDetailsLoading
