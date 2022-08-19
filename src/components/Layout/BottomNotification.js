import React from "react"
import classNames from "classnames"

import styles from "./utils/layout.module.scss"

const BottomNotification = ({ message, isActive, handleCloseNotification }) => {
  return (
    <div
      className={classNames(
        "py-1 px-2 has-text-centered is-hidden-desktop is-hidden-tablet is-size-6-mobile",
        styles["bottomNotification"],
        {
          "is-hidden": !isActive,
        }
      )}
    >
      {message || "This website is best viewed using Chrome on desktop."}
      <button
        aria-label="Close Notification"
        className={classNames(
          "delete",
          styles["bottomNotification__deleteButton"]
        )}
        onClick={handleCloseNotification}
      />
    </div>
  )
}

export default BottomNotification
