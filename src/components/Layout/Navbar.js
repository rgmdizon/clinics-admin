import React, { Fragment, useEffect, useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import AuthActions from "./Navbar/AuthActions"
import AuthMobileUser from "./Navbar/AuthMobileUser"
import AuthActionsMobile from "./Navbar/AuthActionsMobile"

import {
  faBars,
  faTimes,
  faSuitcase,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons"
import { getSignedInUser } from "../../components/Auth/services/user"
import { handleSignOut } from "../../components/Auth/services/signout"

import styles from "./utils/layout.module.scss"

const Navbar = ({ color }) => {
  const data = useStaticQuery(graphql`
    {
      logoLong: file(relativePath: { eq: "logos/medgrocer-long-white.png" }) {
        childImageSharp {
          fixed(height: 25) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      logoCircle: file(
        relativePath: { eq: "logos/medgrocer-square-white.png" }
      ) {
        childImageSharp {
          fixed(height: 25) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const logoLong = data.logoLong.childImageSharp.fixed
  const logoCircle = data.logoCircle.childImageSharp.fixed

  const [isMenuActive, setMenuActive] = useState(false)
  const [user, setUser] = useState({})
  const [userData, setUserData] = useState({ roles: [] })

  useEffect(() => {
    const userData = getSignedInUser()?.userData
    setUserData(userData)
    const authUser = getSignedInUser()?.authUser
    setUser(authUser)
  }, [])

  const handleMenuActive = () => setMenuActive(!isMenuActive)

  // If enrolled OR not logged in

  const Logo = () => {
    return (
      <div className={classNames(styles["navbar__brandLogos"])}>
        <Img fixed={logoLong} className="is-hidden-mobile" />
        <Img fixed={logoCircle} className="is-hidden-tablet" />
      </div>
    )
  }

  const navbarItems = [
    {
      name: "Organization Profile",
      link: "/profile",
      icon: faSuitcase,
      isHiddenInDesktop: true,
    },
    {
      name: "Bookings",
      link: "/bookings",
      icon: faCalendarAlt,
      isHiddenInDesktop: true,
    },
  ]

  return (
    <Fragment>
      <nav
        className={classNames(
          `navbar is-fixed-top is-${color || "primary"}`,
          styles["navbar"]
        )}
      >
        <div className={classNames("ml-1", styles["navbar__brand"])}>
          <Logo />

          <div className={styles["navbar__burgerContainer"]}>
            <AuthActionsMobile
              user={user}
              userData={userData}
              isMenuActive={isMenuActive}
            />
            {!!user && (
              <span
                onClick={handleMenuActive}
                aria-label="menu"
                aria-expanded="false"
                className="icon is-clickable"
                role="button"
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleMenuActive()
                }}
                tabIndex={0}
              >
                <FontAwesomeIcon icon={isMenuActive ? faTimes : faBars} />
              </span>
            )}
          </div>
        </div>

        <div
          className={classNames("navbar-menu", styles["navbar__menu"], {
            "is-active": isMenuActive,
          })}
        >
          <div
            className={classNames(
              "navbar-end mr-1"
              // styles["navbar__alignCenter"]
            )}
          >
            <AuthMobileUser
              userData={userData}
              handleMenuActive={handleMenuActive}
            />

            {navbarItems.map((item) => (
              <Link
                to={item?.link}
                onClick={() => setMenuActive(false)}
                className={classNames(
                  "navbar-item p-1 is-size-6",
                  styles["navbar__menuItem"],
                  { "is-hidden-desktop": item?.isHiddenInDesktop }
                )}
                style={{ zIndex: "99 !important" }}
              >
                <span className={classNames(styles["navbar__menuIcon"])}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="is-hidden-desktop icon mr-1 has-text-primary"
                  />
                </span>
                {item?.name}
              </Link>
            ))}

            <AuthActions
              user={user}
              userData={userData}
              handleSignOut={handleSignOut}
            />
          </div>
        </div>
      </nav>
      <div
        role="button"
        tabIndex={0}
        aria-label="Navbar Background"
        onKeyDown={(event) => {
          if (event.key === "Enter") setMenuActive(false)
        }}
        className={classNames({
          [styles["navbar__backgroundIsActive"]]: isMenuActive,
        })}
        onClick={() => setMenuActive(false)}
      />
    </Fragment>
  )
}

export default Navbar
