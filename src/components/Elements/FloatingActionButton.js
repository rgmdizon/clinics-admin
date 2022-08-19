import React from "react"
import classNames from "classnames"
import styles from "./utils/elements.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const FloatingActionButton = ({ link, children, icon }) => {
  return (
    <a
      href={link || ""}
      target="_blank"
      className={classNames(styles["floatingButton"])}
    >
      <FontAwesomeIcon
        icon={icon}
        className={classNames(styles["floatingButton__icon"])}
      />
    </a>
  )
}

export default FloatingActionButton
