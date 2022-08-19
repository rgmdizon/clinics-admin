import { useStaticQuery, graphql } from "gatsby"
import { flattenNode } from "services/arrays"

export const useUserPermissions = () => {
  const data = useStaticQuery(graphql`
    {
      allAirtableallPermissions {
        nodes {
          data {
            AllowedPaths
            Key
          }
        }
      }
    }
  `)

  return flattenNode(data?.allAirtableallPermissions)
}
