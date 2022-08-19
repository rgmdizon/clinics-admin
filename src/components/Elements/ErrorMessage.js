import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

import styles from "./utils/elements.module.scss"

/**
 *
 * @param {string} color options: primary, success, info, danger, light, dark, default: warning
 * @param {number} size max: 7, default: 6
 * @param {string} align options: centered, left, right
 * @param {jsx, string} message
 */

const ErrorMessage = ({ color, size, message, align }) => (
  <p
    className={classNames(
      `notification is-${color || "warning"} is-size-${size || 6} has-text-${
        align || "centered"
      }`,
      styles["message"]
    )}
  >
    {message}
  </p>
)

ErrorMessage.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
}

export default ErrorMessage
