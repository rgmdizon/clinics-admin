import React, { Fragment } from "react"
import classNames from "classnames"
import { useStaticQuery, graphql } from "gatsby"

import Img from "gatsby-image"

const Header = ({ styles }) => {
  const DATA = useStaticQuery(graphql`
    {
      logoLong: file(relativePath: { eq: "logos/medgrocer-long.png" }) {
        childImageSharp {
          fixed(height: 35) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const LOGO_LONG = DATA.logoLong.childImageSharp.fixed

  return (
    <Fragment>
      <div className="is-flex is-justify-content-space-between">
        <div>
          <Img fixed={LOGO_LONG} className="is-hidden-mobile" />
        </div>
        <h3 className={classNames("mt-0 title is-4", styles["hasTextOrange"])}>
          INFORMED CONSENT
        </h3>
      </div>
      <section
        className={classNames(
          "py-1",
          styles["hasBorderTop"],
          styles["hasBorderBottom"]
        )}
      >
        <h5 className="title mt-0 has-text-primary has-text-weight-bold is-5 mb-0">
          Informed Consent Form for Dose of COVID-19 Vaccine
        </h5>
        <p className={classNames("is-italic", styles["labelScaling"])}>
          of the Philippine National COVID-19 Vaccine Deployment and Vaccination
          Program as of November 19, 2021
        </p>
      </section>
    </Fragment>
  )
}

export default Header
