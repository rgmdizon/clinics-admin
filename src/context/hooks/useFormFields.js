import { useStaticQuery, graphql } from "gatsby"

const ALL_AIRTABLE_FIELDS_QUERY = graphql`
  query {
    allAirtableallFormFields {
      nodes {
        data {
          Name
          Type
          Initial_Values
          Field_Names
        }
      }
    }
  }
`

export const useFormFields = () => {
  const data = useStaticQuery(ALL_AIRTABLE_FIELDS_QUERY)

  return data
}
