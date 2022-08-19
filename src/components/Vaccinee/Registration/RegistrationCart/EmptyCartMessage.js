import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

const EmptyCartMessage = () => {
  const VIRUS_GRAPHQL = useStaticQuery(graphql`
    {
      virusIcon: file(relativePath: { eq: "icons/virus.png" }) {
        childImageSharp {
          fixed(width: 125) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const VIRUS_LOGO = VIRUS_GRAPHQL.virusIcon.childImageSharp.fixed

  return (
    <div className="has-text-centered mt-3 mb-5">
      <Img fixed={VIRUS_LOGO} />
      <p className="subtitle mt-2">Please add vaccines to your cart</p>
    </div>
  )
}

export default EmptyCartMessage
