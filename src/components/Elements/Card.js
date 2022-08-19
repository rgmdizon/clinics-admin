import React from "react"
import classNames from "classnames"

const Card = ({ title, subtitle, className, children }) => {
  return (
    <div className={classNames("card p-2 mx-2-desktop m-1-mobile", className)}>
      <div className="has-text-centered">
        {title ? (
          <h2
            className={classNames(
              "has-text-centered mb-0 has-text-primary mx-2-mobile is-size-3-mobile"
            )}
          >
            {title}
          </h2>
        ) : null}
        {subtitle ? (
          <h5 className="subtitle has-text-grey has-text-centered my-1 is-size-5 mx-1-mobile is-size-5-mobile">
            {subtitle}
          </h5>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Card
