import React from "react"
import PropTypes from "prop-types"

import styles from "./utils/elements.module.scss"
import classNames from "classnames"

/**
 * @param {number} size integer, defaults to 2
 */

const Loading = ({ isFullscreen, size }) => (
  <div
    className={classNames(styles["loading"], {
      "is-flex is-justify-content-center is-align-items-center": isFullscreen,
    })}
    style={{ fontSize: `${size || 10}rem`, marginLeft: `-${size / 3 || 5}rem` }}
  />
)

Loading.propTypes = {
  size: PropTypes.string,
}

export default Loading
