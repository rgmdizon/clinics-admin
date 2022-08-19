import { GATSBY_MH_WEBSITE_CODE } from "gatsby-env-variables"
import React, { Fragment } from "react"
import classNames from "classnames"
import Zendesk from "react-zendesk"
import PropTypes from "prop-types"

import SEO from "./SEO"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Container from "./Container"
import PrivateRoute from "./PrivateRoute"
import Notification from "./Notification"
import HelpCenterBanner from "../StaticPages/HelpCenter/HelpCenterBanner"

import styles from "./utils/layout.module.scss"
import { hasSignedInUser } from "auth/services/user"
import zendeskSettings from "./utils/zendeskSettings.json"

/**
 * @param {string} seoTitle string
 * @param {string} title string
 * @param {string} subtitle string
 * @param {array} path array
 * @param {object} display settings to display footer/help banner
 * @param {} children
 */

const Layout = ({
  path,
  title,
  progress,
  children,
  subtitle,
  seoTitle,
  isPrivate,
  background,
  pageContext,
  display = { footer: true, helpCenterBanner: false },
}) => {
  let pathArray = path ? path.split("/") : []

  return (
    <Fragment>
      <div className={classNames(`is-background-${background}`)}>
        <PrivateRoute isPrivate={isPrivate}>
          <SEO title={seoTitle} />
          <Navbar path={pathArray} />
          <Notification pageContext={pageContext} />
          {!!progress && (
            <progress
              className={classNames(
                "progress is-small is-info",
                styles["progressBar"]
              )}
              value={`${progress}`}
              max="100"
            />
          )}

          {title && (
            <Container isCentered fullhd={6}>
              <h2
                className={classNames(
                  "has-text-centered mb-0 has-text-primary mx-2-mobile is-size-3-mobile",
                  {
                    "pb-0": !subtitle,
                    "pb-1": !!subtitle,
                  }
                )}
              >
                {title}
                <br />
              </h2>
              <div className="has-text-centered mb-2">
                <span className="subtitle has-text-grey my-1 is-size-4 mx-1-mobile is-size-5-mobile">
                  {subtitle}
                </span>
              </div>
            </Container>
          )}

          <main className="pb-3">{children}</main>
          {display.helpCenterBanner && (
            <HelpCenterBanner module={pageContext?.module?.name} />
          )}
          {display.footer && <Footer />}
          {hasSignedInUser() &&
            pageContext?.module?.name === GATSBY_MH_WEBSITE_CODE && (
              <Zendesk
                zendeskKey={process.env.GATSBY_ZENDESK_MH_CHAT_ID}
                {...zendeskSettings}
              />
            )}
        </PrivateRoute>
      </div>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  seoTitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  path: PropTypes.array,
}

export default Layout
