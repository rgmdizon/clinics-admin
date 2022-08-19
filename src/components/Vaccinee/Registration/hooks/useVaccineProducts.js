import { useStaticQuery, graphql } from "gatsby"
import { flattenNode } from "services/arrays"

export const useVaccineProducts = () => {
  const data = useStaticQuery(graphql`
    {
      allAirtableallVaccineProduct {
        nodes {
          data {
            Brand
            ProductTitle
            PriceLists
            UnitPrices
            ItemCode
          }
        }
      }
    }
  `)

  return flattenNode(data?.allAirtableallVaccineProduct)
}
