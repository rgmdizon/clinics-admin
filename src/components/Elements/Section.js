import React, { Fragment } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import styles from "./utils/elements.module.scss"

/**
 * @param {string} title string
 * @param {} children
 */

const Section = ({ title, children, addOns, className, id }) => (
  <Fragment>
    {title && (
      <div className={classNames(styles["section"])} id={id}>
        {addOns?.left ? <span>{addOns?.left}</span> : null}
        <div className={classNames(styles["sectionBody"])}>
          <h4 className="has-text-primary mt-1">{title}</h4>
          {addOns?.right}
        </div>
      </div>
    )}
    <div className={className || "mt-1 mb-3"}>{children}</div>
  </Fragment>
)

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}

export default Section
