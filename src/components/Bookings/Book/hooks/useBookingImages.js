import { useStaticQuery, graphql } from "gatsby"

export const useBookingImages = () => {
  const data = useStaticQuery(graphql`
    {
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
