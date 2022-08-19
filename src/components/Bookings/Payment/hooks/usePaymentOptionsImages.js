import { useStaticQuery, graphql } from "gatsby"

export const usePaymentOptionsImages = () => {
  const data = useStaticQuery(graphql`
    {
      bank: file(relativePath: { eq: "payment/bank-transfer.png" }) {
        childImageSharp {
          fixed(width: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      metrobank: file(
        relativePath: { eq: "payment/metrobank-logo--colored.png" }
      ) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      unionbank: file(
        relativePath: { eq: "payment/unionbank-logo--colored.png" }
      ) {
        childImageSharp {
          fixed(width: 175) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      bpi: file(relativePath: { eq: "payment/bpi-logo--colored.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      bdo: file(relativePath: { eq: "payment/bdo-logo--colored.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      gcash: file(relativePath: { eq: "payment/gcash-logo--colored.png" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      pnb: file(relativePath: { eq: "payment/pnb-logo--colored.png" }) {
        childImageSharp {
          fixed(width: 75) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  // const gcash = data.gcash.childImageSharp.fixed
  // const bdo = data.bdo.childImageSharp.fixed
  // const bpi = data.bpi.childImageSharp.fixed
  // const unionbank = data.unionbank.childImageSharp.fixed
  // const metrobank = data.metrobank.childImageSharp.fixed

  return data
}
