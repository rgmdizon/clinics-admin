import React, { Fragment, useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import classNames from "classnames"

import Img from "gatsby-image"

import { menu } from "./utils/menu"
import { isBrowser } from "services/general"
import styles from "./utils/layout.module.scss"
import { useUserPermissions } from "../Auth/hooks/useUserPermissions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getAuthenticatedUser } from "../../components/Auth/services/roles"

const Menu = () => {
  let url = ""
  let roles = useUserPermissions()
  const [userData, setUserData] = useState({})

  if (isBrowser) url = window.location.pathname

  useEffect(() => {
    setUserData(getAuthenticatedUser(roles))
    //eslint-disable-next-line
  }, [])

  const data = useStaticQuery(
    graphql`
      {
        logo: file(relativePath: { eq: "logos/medgrocer-long-white.png" }) {
          childImageSharp {
            fixed(height: 27) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }
    `
  )
  let logo = data.logo.childImageSharp.fixed

  const checkIfUserCanAccess = (link) => {
    let flag = false
    if (userData?.allowedPaths)
      userData.allowedPaths.forEach((path) => {
        if (path?.includes(link?.link)) flag = true
      })
    return flag
  }

  return (
    <div className={classNames("is-hidden-touch", styles["sideNavigation"])}>
      <div
        className={classNames(
          "is-flex is-flex-direction-column is-justify-content-space-between",
          styles["sideNavigation__sideNavContainer"]
        )}
      >
        <section>
          <div
            className={classNames(
              "mb-2 is-flex has-text-centered",
              styles["sideNavigation__logoContainer"]
            )}
          >
            <Img loading="eager" fixed={logo} />
            {/* <span
              className={classNames(
                "has-text-white is-size-6 has-text-weight-bold",
                styles["sideNavigation__adminContainer"]
              )}
            >
              Admin
            </span> */}
          </div>
          <aside className="menu">
            {menu.map((section) => (
              <Fragment>
                <ul className="menu-list">
                  {section?.links
                    ?.filter((link) => checkIfUserCanAccess(link))
                    .map((link) => (
                      <li
                        className={classNames({
                          "layout-module--side-navigation__is-active--Po_8q": url
                            .replaceAll("/", "")
                            .includes(link.link.replaceAll("/", "")),
                        })}
                        key={link.link}
                      >
                        <Link
                          className={classNames(
                            "has-text-white menu-link",
                            styles["sideNavigation__linkContainer"]
                          )}
                          to={link.link}
                        >
                          <div
                            className={classNames(
                              styles["sideNavigation__link"]
                            )}
                          >
                            <span
                              className={classNames(
                                "is-inline-block ml-1 mr-1 has-text-white",
                                styles["sideNavigation__menuIcon"]
                              )}
                            >
                              <FontAwesomeIcon icon={link.icon} />
                            </span>
                            <span
                              className={classNames({
                                "has-text-black": url
                                  .replaceAll("/", "")
                                  .includes(link.link.replaceAll("/", "")),
                              })}
                            >
                              {link.label}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              </Fragment>
            ))}
          </aside>
        </section>
      </div>
    </div>
  )
}

export default Menu
