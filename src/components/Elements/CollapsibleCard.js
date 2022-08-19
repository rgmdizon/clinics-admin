import React from "react"
import classNames from "classnames"

import Button from "../Elements/Button"

import styles from "./utils/elements.module.scss"

const CollapsibleCard = ({
  title,
  children,
  isOpen,
  color,
  className,
  errorMessage,
}) => (
  <article
    className={classNames(className, `message mb-1`, {
      [`is-${color}`]: !!color,
    })}
  >
    <details open={isOpen} className={classNames(`message-body p-0`)}>
      <summary
        className={classNames(styles["collapsible__title"], "has-text-primary")}
      >
        {title}
      </summary>
      <div className={classNames(styles["collapsible__content"])}>
        {errorMessage ? (
          <div className="my-2 has-text-grey has-text-centered">
            <div dangerouslySetInnerHTML={{ __html: errorMessage.message }} />
            <Button
              className="is-text has-text-grey"
              onClick={errorMessage.onClick}
            >
              {errorMessage.linkMessage}
            </Button>
          </div>
        ) : (
          children
        )}
      </div>
    </details>
  </article>
)

export default CollapsibleCard
