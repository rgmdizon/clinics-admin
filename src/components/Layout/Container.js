import React from "react"
import classNames from "classnames"

const Container = ({
  children,
  mobile,
  tablet,
  desktop,
  fullhd,
  isCentered,
  customClassName,
}) => {
  return (
    <div
      className={classNames("columns mx-1-mobile mx-0", {
        "is-centered": isCentered,
      })}
    >
      <div
        className={`column is-${mobile || 12}-mobile is-${
          tablet || 10
        }-tablet is-${desktop || 8}-desktop is-${
          fullhd || 8
        }-fullhd  ${customClassName}`}
      >
        {children}
      </div>
    </div>
  )
}

export default Container
