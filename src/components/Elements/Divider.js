import React from "react"
import classNames from "classnames"

import styles from "./utils/elements.module.scss"

const Divider = ({ dataContent }) => {
  return (
    <div className="is-flex is-justify-content-center is-align-items-center">
      <div
        className={classNames("has-background-grey", styles["divider__line"])}
      />
      <small className="mx-1 is-size-7 has-text-grey">
        {dataContent || "OR"}
      </small>
      <div
        className={classNames("has-background-grey", styles["divider__line"])}
      />
    </div>
  )
}

export default Divider
