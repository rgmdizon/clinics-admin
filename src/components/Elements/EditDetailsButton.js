import React from "react"
import { navigate } from "gatsby"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"

import Button from "elements/Button"
import styles from "./utils/elements.module.scss"

const EditDetailsButton = ({ route, onClick, className, children }) => (
  <Button
    onClick={(event) => {
      if (onClick) return onClick(event)
      if (route) navigate(route)
    }}
    size="small"
    variant="outlined"
    className={classNames(styles["section__buttonBorderless"], className || "")}
  >
    <div className="icon">
      <FontAwesomeIcon icon={faEdit} />
    </div>
    <div>{children || "Edit"}</div>
  </Button>
)

export default EditDetailsButton
