import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

import styles from "./utils/layout.module.scss"

/**
 * An imposing hero banner to showcase something
 * @param {string} color options: primary, success, info, danger, light, dark
 * @param {string} size options: medium, large, fullheight
 * @param {boolean} isCentered
 */

const Hero = ({ children, color, size, background, isCentered, className }) => {
  return (
    <section
      className={classNames(
        `hero is-${color} is-${size}`,
        {
          "has-text-centered": isCentered,
        },
        styles["heroContainer"],
        className
      )}
      style={{
        backgroundImage: `url(${background?.image})`,
        backgroundSize: background?.size || "cover",
        backgroundRepeat: background?.repeat || "no-repeat",
        backgroundPosition: background?.position,
      }}
    >
      <div className="hero-body">{children}</div>
    </section>
  )
}

Hero.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
}

export default Hero
