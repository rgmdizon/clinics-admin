import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AuthActionsMobile = ({ user, userData, isMenuActive }) => {
  if (user && userData?.authUid)
    return (
      <Link
        className={classNames(
          "navbar-item mr-1 px-1 has-text-centered has-text-black button is-primary is-inverted is-outlined",
          {
            "is-hidden": isMenuActive,
          }
        )}
        to="/profile"
      >
        <FontAwesomeIcon icon={faUser} />
        <span className="ml-1">{`${userData?.firstName} ${userData?.lastName[0]}.`}</span>
      </Link>
    )

  if (user && !userData?.authUid)
    return (
      <span
        className={classNames(
          "navbar-item mr-1 px-1 has-text-centered button is-primary is-inverted is-outlined",
          {
            "is-hidden": isMenuActive,
          }
        )}
      >
        <span>{user?.email?.split("@")[0]}</span>
      </span>
    )

  return null
  // return (
  //   <Link
  //     className={classNames(
  //       "navbar-item button mr-1 px-1 mb-0 is-primary is-inverted is-outlined",
  //       {
  //         "is-hidden": isMenuActive,
  //       }
  //     )}
  //     to="/sign-in"
  //   >
  //     Sign in
  //   </Link>
  // )
}

export default AuthActionsMobile
