import React from "react"
import Img from "gatsby-image"
import classNames from "classnames"

// import styles from "../utils/elements.module.scss"

const HomeProcessArrow = ({ arrowImage }) => (
  <div
    className={classNames(
      "column is-1 is-hidden-mobile is-flex is-align-items-center"
    )}
  >
    <Img fixed={arrowImage} />
  </div>
)

export default HomeProcessArrow
