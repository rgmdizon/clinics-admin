import { useStaticQuery, graphql } from "gatsby"

const useHomeImages = () => {
  const data = useStaticQuery(graphql`
    {
      aircon: file(relativePath: { eq: "icons/aircon.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      nurse: file(relativePath: { eq: "icons/nurse.png" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      elderly: file(relativePath: { eq: "icons/elderly.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      fever: file(relativePath: { eq: "icons/fever.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      headache: file(relativePath: { eq: "icons/headache.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      musclePain: file(relativePath: { eq: "icons/muscle-pain.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      sneeze: file(relativePath: { eq: "icons/sneeze.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      soreThroat: file(relativePath: { eq: "icons/sore-throat.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      flu: file(relativePath: { eq: "icons/flu.png" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return data
}

export default useHomeImages
