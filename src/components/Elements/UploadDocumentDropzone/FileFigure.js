import React from "react"
import classNames from "classnames"

import styles from "../utils/elements.module.scss"

const FileFigure = ({ children, isPdf, filename }) => (
  <div className="columns is-vcentered">
    <div className={classNames("column", { "pl-0": isPdf })}>
      <figure
        className={classNames("is-flex", styles["column__figureAlignItems"])}
      >
        {children}
        <span
          className={classNames(`is-size-5 is-size-6-mobile`, {
            "pl-1": !isPdf,
          })}
        >
          {filename}
        </span>
      </figure>
    </div>
  </div>
)

export default FileFigure
