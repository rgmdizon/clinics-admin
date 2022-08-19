import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "layout"
import Container from "layout/Container"

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    {
      spilledMeds: file(relativePath: { eq: "pages/404__spilledMeds.png" }) {
        childImageSharp {
          fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const spilledMeds = data.spilledMeds.childImageSharp.fluid

  return (
    <Layout seoTitle="404: Not found">
      <Container customClassName="my-3" isCentered>
        <Container mobile={10} tablet={8} desktop={6} isCentered>
          <Img fluid={spilledMeds} />
        </Container>
        <center>
          <h2>Something’s wrong here...</h2>
          <p>
            We can’t find the page you entered. You may visit our{" "}
            <Link to="/help-center" className="has-text-weight-bold">
              Help Center
            </Link>
            , <br className="is-hidden-mobile" /> or{" "}
            <Link to="/help-center#contact-us" className="has-text-weight-bold">
              contact us
            </Link>{" "}
            for further assistance.
          </p>
        </center>
      </Container>
    </Layout>
  )
}

export default NotFoundPage
