import { useStaticQuery, graphql } from "gatsby"
import { flattenNode } from "services/arrays"

export const useVaccines = () => {
  const data = useStaticQuery(graphql`
    {
      allAirtableallVaccines {
        nodes {
          data {
            Name
            Brand
            Type
            Price
            Minimum_Doses
          }
        }
      }
    }
  `)

  return flattenNode(data?.allAirtableallVaccines)
}
