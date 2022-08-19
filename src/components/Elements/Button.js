import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

/**
 * The classic button, in different colors, sizes, and states
 * @param {string} color string options: primary, success, info, danger, light, dark
 * @param {string} size string options: small, normal, medium, large
 * @param {string} variant string options: outlined, inverted
 * @param {string} type string options: submit, reset
 * @param {boolean} isLoading boolean
 * @param {boolean} isDisabled  boolean
 * @param {boolean} fullwidth  boolean
 * @param {} children
 */

const Button = ({
  color,
  variant,
  size,
  children,
  type,
  isLoading,
  isDisabled,
  isFullwidth,
  className,
  width,
  ...props
}) => {
  return (
    <button
      type={type || "button"}
      className={classNames(
        `button is-${color} is-${size} is-${variant} ${className}`,
        {
          "is-loading": isLoading,
        },
        { "is-fullwidth": isFullwidth }
      )}
      disabled={isDisabled}
      style={{ width, ...props.style }}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
}

export default Button
