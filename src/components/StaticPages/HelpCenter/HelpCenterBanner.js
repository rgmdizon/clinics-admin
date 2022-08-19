import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"

import Hero from "layout/Hero"
import Button from "elements/Button"
import Container from "layout/Container"

const HelpCenterBanner = ({ module }) => {
  const data = useStaticQuery(graphql`
    {
      stethoscope: file(relativePath: { eq: "stethoscope.jpg" }) {
        childImageSharp {
          fluid(
            duotone: { highlight: "#cfe0e2", shadow: "#0d6d6e" }
            toFormat: PNG
            quality: 90
            maxWidth: 800
          ) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const stethoscope = data.stethoscope.childImageSharp.fluid.src

  return (
    <Hero
      background={{ image: stethoscope }}
      className="has-background-cereal-teal mt-1"
    >
      <Container isCentered>
        <h4 className="title">We're here to help</h4>
        <div className="buttons is-narrow are-white mb-1">
          <Button
            color="primary"
            variant="outlined"
            onClick={() => navigate(`/${module || "mind"}/help-center`)}
          >
            Visit Help Center
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() =>
              navigate(`/${module || "mind"}/help-center#contact-us`)
            }
          >
            Contact Us
          </Button>
        </div>
      </Container>
    </Hero>
  )
}

export default HelpCenterBanner
