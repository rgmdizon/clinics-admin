import { useStaticQuery, graphql } from "gatsby"

export const useRegistrationCompleteImages = () => {
  const data = useStaticQuery(graphql`
    {
      email: file(relativePath: { eq: "icons/email.png" }) {
        childImageSharp {
          fluid(maxWidth: 512) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return data
}
