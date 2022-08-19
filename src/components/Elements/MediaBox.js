import React from "react"
import classNames from "classnames"

import styles from "./utils/elements.module.scss"

/**
 * A box section used in colums
 * @param {children}
 * @param {string} title string
 * @param {object} image settings for the image (src, alt)
 */

const MediaBox = ({ image, title, children }) => {
  return (
    <div className={classNames("column has-text-centered", styles["mediaBox"])}>
      <div className="mediaBox__imageContainer">
        <img
          src={image?.src}
          alt={`${image?.alt || ""}`}
          className={classNames(styles["mediaBox__image"])}
          width={image?.width || "50%"}
        />
      </div>
      <h3 className="is-size-4-desktop is-size-6-mobile is-size-12-mobile">
        {title}
      </h3>
      <p className="has-text-left">{children}</p>
    </div>
  )
}

export default MediaBox
