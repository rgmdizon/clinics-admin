import React, { useContext, useEffect } from "react"

import classNames from "classnames"
import { AppContext } from "context/AppContext"

import styles from "./utils/layout.module.scss"

/**
 *
 * @param {message} string
 * @param {color} string options: primary, success, info, warning
 * 
 * usage:
 * 
 * import React, { useContext } from "react"
 * import { AppContext } from "AppContext"
 * import Toast from "layout/Toast"
 * 
 * ...
 * dispatch({
            type: "SHOW_TOAST",
            payload: {
              message: `File uploaded`,
              color: "success",
            },
          })
          
 */

const Toast = ({ message, color }) => {
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" })
    }, 3000)
  }, [state.toast.isActive, dispatch])

  return (
    <div className={styles["toast"]}>
      <div
        className={classNames(
          `is-${color}`,
          styles["toast__message"],
          "notification level",
          { "is-hidden": state.toast.isActive === false }
        )}
      >
        {message}
      </div>
    </div>
  )
}

export default Toast
