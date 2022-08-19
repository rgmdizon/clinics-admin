import React from "react"
import classNames from "classnames"

import styles from "./utils/elements.module.scss"

const Media = ({ image, children, ...props }) => {
  return (
    <article className={classNames("media", props.className)}>
      <figure className={classNames("media-left mr-0", styles["mediaLeft"])}>
        <p
          className={classNames(
            "image is-64x64 has-text-centered",
            styles["mediaLabel"]
          )}
        >
          <img src={image?.src} alt={`${image.alt}`} />
        </p>
        {/* <p className="help has-text-centered">{image.alt}</p> */}
      </figure>

      <div className="media-content ml-2">
        <div className="content">{children}</div>
      </div>
    </article>
  )
}

export default Media
