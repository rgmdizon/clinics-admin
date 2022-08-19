import React, { Fragment, useEffect, useContext } from "react"
import classNames from "classnames"
import { Link } from "gatsby"

import SEO from "./SEO"
import Menu from "./Menu"
import Navbar from "./Navbar"
import PrivateRoute from "./PrivateRoute"

import { isBrowser } from "services/general"

import { getSignedInUser } from "auth/services/user"
import {
  initializeBookingSnapshot,
  initializeOrganizationSnapshot,
} from "auth/services/snapshotListeners"

// import { matchMedia } from "services/general"
import { AppContext } from "context/AppContext"
import styles from "./utils/layout.module.scss"

import { getContextFromSession } from "services/context"

import {
  GATSBY_ENV,
  GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL,
} from "gatsby-env-variables"

const DashboardLayout = ({
  children,
  seoTitle,
  background,
  isPrivate,
  title,
  subtitle,
  links = null,
}) => {
  const { dispatch } = useContext(AppContext)

  const sessionState = getContextFromSession()

  const {
    bookingsData,
    organization,
    userData,
    accountOwnerData,
  } = getSignedInUser()

  useEffect(() => {
    dispatch({ type: "GET_CONTEXT_FROM_SESSION" })
    if (sessionState?.app?.hasRefreshed) {
      initializeListeners()
      dispatch({ type: "SAVE_HAS_REFRESHED", payload: false })
    }

    if (isBrowser()) {
      window.addEventListener("beforeunload", setHasRefreshed)
      return () => {
        window.removeEventListener("beforeunload", setHasRefreshed)
      }
    }
    //eslint-disable-next-line
  }, [])

  const setHasRefreshed = () => {
    dispatch({ type: "SAVE_HAS_REFRESHED", payload: true })
  }
  const initializeListeners = async () => {
    await initializeBookingSnapshot({
      organizationId: organization.id,
      bookings: bookingsData,
    })
    await initializeOrganizationSnapshot({
      userDocumentId: userData.id || accountOwnerData.id,
    })
  }

  return (
    <body>
      <SEO title={seoTitle} />
      <div
        className={classNames(`is-background-${background || "light-grey"}`)}
      >
        <PrivateRoute isPrivate={isPrivate || true}>
          <Menu />
          <main className={classNames(styles["dashboardContainer"])}>
            <Navbar color="white" />
            {GATSBY_ENV !== "production" ? (
              <div className="notification is-warning has-text-centered">
                <p>
                  This is a beta website. For suggestions, please email{" "}
                  <a
                    href={`mailto:${GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL}`}
                    className="has-text-primary has-text-weight-bold"
                  >
                    {GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL}
                  </a>
                  .
                </p>
              </div>
            ) : null}

            {title ? (
              <section
                className={classNames(
                  "header m-1 is-align-items-center px-1",
                  styles["dashboardHeader"],
                  { "is-justify-content-center": !links },
                  { "is-justify-content-space-between": links }
                )}
              >
                <Fragment>
                  <h2
                    className={classNames(
                      "m-0 has-text-primary mr-1 is-size-3-mobile",
                      styles["dashboardTitle"]
                    )}
                  >
                    {title}
                    {subtitle ? (
                      <span className="subtitle">
                        <br />
                        {subtitle}
                      </span>
                    ) : null}
                  </h2>
                </Fragment>
                {links ? (
                  <div className="buttons is-flex-wrap-nowrap mt-2-mobile">
                    {links.map((link) => (
                      <Link
                        to={!link?.disabled ? link?.to : null}
                        disabled={link?.disabled}
                        className={`button is-disabled is-${
                          link?.color || "primary"
                        }`}
                        state={link?.state}
                      >
                        {link?.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </section>
            ) : null}
            <div className="p-1-desktop p-1-tablet p-0-mobile ">{children}</div>
          </main>
        </PrivateRoute>
      </div>
    </body>
  )
}

export default DashboardLayout
