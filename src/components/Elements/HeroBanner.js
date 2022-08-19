import React from "react"
import classNames from "classnames"

import Container from "../Layout/Container"

import styles from "./utils/elements.module.scss"

const HeroBanner = ({ children, image, color }) => {
  return (
    <div
      className={classNames(
        styles["heroBanner"],
        `has-background-${color || "white"}`
      )}
    >
      <img
        src={image.src}
        alt={image.alt}
        class={classNames("is-hidden-mobile", styles["heroBanner__image"])}
      />
      <Container desktop={10} fullhd={10}>
        <div className="hero-body column is-6-desktop is-offset-1-desktop is-8-tablet">
          {children}
        </div>
      </Container>
    </div>
  )
}

export default HeroBanner
