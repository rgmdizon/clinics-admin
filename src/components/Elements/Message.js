import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

/**
 *
 * @param {string} color options: primary, success, info, danger, light, dark, default: warning
 * @param {number} size max: 7, default: 6
 * @param {string} align options: centered, left, right
 * @param {jsx, string} children
 */

const Message = ({ children, color, size, align, ...props }) => {
  return (
    <article
      className={classNames(
        `message is-${color || "warning"} has-text-${align || "left"} is-size-${
          size || "5"
        }-desktop is-size-${size || "6"}-mobile`,
        props.className
      )}
    >
      <div className={classNames(`message-body content has-text-dark`)}>
        {children}
      </div>
    </article>
  )
}

Message.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
}

export default Message
