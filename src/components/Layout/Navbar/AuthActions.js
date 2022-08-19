import React, { Fragment } from "react"
import { navigate } from "gatsby"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

import styles from "../utils/layout.module.scss"

const AuthActions = ({ user, userData, handleSignOut }) => {
  const isEnrolled = () => !!user && !!userData?.authUid

  if (isEnrolled()) {
    return (
      <Fragment>
        <div className="navbar-item">
          <button
            className="button is-primary is-fullwidth mt-1 is-centered is-hidden-desktop"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
        <div className="navbar-item has-dropdown is-hoverable is-hidden-touch">
          <span className="navbar-link is-size-6">
            <FontAwesomeIcon icon={faUser} />
            <span className="ml-1">
              {" "}
              {`${userData?.firstName} ${userData?.lastName}`}
            </span>
          </span>
          <div className="navbar-dropdown">
            <span
              aria-hidden="true"
              className={classNames(
                "navbar-item is-clickable",
                styles["navbar__item"]
              )}
              onClick={() => navigate("/profile")}
            >
              Profile
            </span>
            <span
              aria-hidden="true"
              className={classNames(
                "navbar-item is-clickable",
                styles["navbar__item"]
              )}
              onClick={handleSignOut}
            >
              Sign Out
            </span>
          </div>
        </div>
      </Fragment>
    )
  } else if (!!user && !userData?.authUid) {
    // During enrollment
    return (
      <Fragment>
        <div className="navbar-item">
          <button
            className="button is-primary is-fullwidth mt-1 is-centered is-hidden-desktop"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
        <div className="navbar-item has-dropdown is-hoverable is-hidden-touch">
          <span className="navbar-link">
            <FontAwesomeIcon icon={faUser} />
            <span className="ml-1">{user?.email?.split("@")[0]}</span>
          </span>
          <div className="navbar-dropdown">
            <span
              aria-hidden="true"
              className={classNames(
                "navbar-item is-clickable",
                styles["navbar__item"]
              )}
              onClick={handleSignOut}
            >
              Sign Out
            </span>
          </div>
        </div>
      </Fragment>
    )
  } else {
    // Signed out
    return <div></div>
    // return (
    //   <Link className={classNames(styles["signInButton"])} to="/sign-in">
    //     <button
    //       className={classNames(
    //         "navbar-item is-hidden-mobile button is-primary is-inverted is-outlined"
    //       )}
    //     >
    //       Sign in
    //     </button>
    //   </Link>
    // )
  }
}

export default AuthActions
