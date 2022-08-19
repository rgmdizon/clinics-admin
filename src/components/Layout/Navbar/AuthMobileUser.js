import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import styles from "../utils/layout.module.scss"

const MobilePersonalDetails = ({ userData, handleMenuActive }) => {
  if (userData?.authUid)
    return (
      <div className="p-1 is-hidden-desktop" style={{ zIndex: 99 }}>
        <div className="subtitle is-5 has-text-primary has-text-weight-bold mb-0">
          {`${userData?.firstName} ${userData?.lastName}`}
        </div>
        <div className="subtitle is-6">{userData?.email}</div>
        <Link
          className="is-size-7 has-text-primary"
          to="/profile"
          onClick={handleMenuActive}
        >
          <span
            className={classNames(
              "is-clickable",
              styles["navbar__personalDetailsLink"]
            )}
          >
            View profile {">"}
          </span>
        </Link>
      </div>
    )
  return null
}

export default MobilePersonalDetails
