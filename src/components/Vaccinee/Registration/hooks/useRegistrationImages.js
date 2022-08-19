import { useStaticQuery, graphql } from "gatsby"

export const useRegistrationImages = () => {
  const data = useStaticQuery(graphql`
    {
      email: file(relativePath: { eq: "icons/email.png" }) {
        childImageSharp {
          fluid(maxWidth: 512) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      error: file(relativePath: { eq: "pages/404__spilledMeds.png" }) {
        childImageSharp {
          fixed(width: 350) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return data
}
