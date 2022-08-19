import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Hero from "layout/Hero"
import Container from "layout/Container"

import styles from "../utils/staticPages.module.scss"
import Verification from "../../Vaccinee/Verification"

const HomeBanner = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
    {
      vaccination: file(relativePath: { eq: "vaccination.png" }) {
        childImageSharp {
          fluid(
            duotone: { highlight: "#ffffff", shadow: "#0d6d6e" }
            toFormat: PNG
            quality: 90
            maxWidth: 1000
          ) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      medgrocer: file(relativePath: { eq: "logos/medgrocer-long.png" }) {
        childImageSharp {
          fluid(maxHeight: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const vaccination = data.vaccination.childImageSharp.fluid.src
  const medgrocer = data.medgrocer.childImageSharp.fluid

  return (
    <Hero
      size="medium"
      background={{
        size: "400px",
        image: vaccination,
        position: "right center",
      }}
    >
      <Container fullhd={10}>
        <div className="columns">
          <div className="column is-8-desktop">
            <figure className={styles["logo"]}>
              <Img fluid={medgrocer} alt="MedGrocer" />
            </figure>

            <h1 className="title is-size-3-desktop is-size-4-mobile has-text-primary">
              MedGrocer partners with various companies and organizations to
              administer vaccines to their employees and members.
            </h1>
            <h3 className="subtitle mt-1 is-size-5-desktop is-size-6-mobile">
              Employees of MedGrocer's corporate partners may use this website
              to order their vaccines and reserve their schedule.
            </h3>
            <Verification pageContext={pageContext} />
          </div>
          <div className="column"></div>
        </div>
      </Container>
    </Hero>
  )
}

export default HomeBanner
