import React, { Fragment } from "react"
import classNames from "classnames"

import styles from "./utils/elements.module.scss"

const CardRow = ({ data }) => {
  return (
    <Fragment>
      <div
        className={classNames("card mt-1 is-hidden-desktop", styles["cardRow"])}
      >
        <nav class="level">
          {data?.map((labelValue) => (
            <div class="level-item mx-2 has-text-centered">
              <div>
                <p class="title">{labelValue?.value}</p>
                <p class="heading">{labelValue?.label}</p>
              </div>
            </div>
          ))}
        </nav>
      </div>
      <div className="is-hidden-touch">
        <div className="columns">
          {data?.map((labelValue) => (
            <div className="column">
              <div className="card">
                <div className="has-text-centered p-1">
                  <p className="is-size-2 has-text-weight-bold mb-0">
                    {labelValue?.value}
                  </p>
                  <p>{labelValue?.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default CardRow
