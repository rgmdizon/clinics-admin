import React, { useState, useEffect } from "react"
import classNames from "classnames"

import styles from "./utils/elements.module.scss"
import { isIeOrEdge } from "../../services/browserCompatibility"

const Collapsible = ({ title, children, isOpen, color, className }) => {
  const [browserIsIE, setBrowserIsIE] = useState(true)

  useEffect(() => {
    setBrowserIsIE(isIeOrEdge())
  }, [])

  if (browserIsIE)
    return (
      <article
        className={classNames(`message mb-1`, { [`is-${color}`]: !!color })}
      >
        <div
          open={isOpen}
          className={classNames(
            `message-body p-1`,
            styles["message__collapsible"]
          )}
        >
          <div className="has-text-weight-bold is-size-5">{title}</div>
          <div
            className={classNames(`content`, styles["collapsible__content"])}
          >
            {children}
          </div>
        </div>
      </article>
    )

  return (
    <article
      className={classNames(className, `message mb-1`, {
        [`is-${color}`]: !!color,
      })}
    >
      <details
        open={isOpen}
        className={classNames(
          `message-body p-1`,
          styles["message__collapsible"]
        )}
      >
        <summary className={classNames(styles["collapsible__title"])}>
          {title}
        </summary>
        <div className={classNames(`content`, styles["collapsible__content"])}>
          {children}
        </div>
      </details>
    </article>
  )
}

export default Collapsible
