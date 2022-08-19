import React, { useReducer } from "react"

import { initialState } from "./initialState"
import { OrganizationReducer } from "./OrganizationReducer"
// import { useOrganizationFormFields } from "./hooks/useOrganizationFormFields"

// import { generateInitialValues } from "services/context"
// import { flattenNode } from "services/arrays"

const OrganizationContext = React.createContext(initialState)

const OrganizationProvider = ({ children }) => {
  // let formFields = useOrganizationFormFields()
  // formFields = flattenNode(formFields?.allAirtableallFormFields)

  let [state, dispatch] = useReducer(OrganizationReducer, {
    ...initialState,
    // ...generateInitialValues({ fields: formFields }),
    // documents: [],
    // initialState: {
    //   ...generateInitialValues({ fields: formFields }),
    //   documents: [],
    // },
  })

  return (
    <OrganizationContext.Provider value={{ state, dispatch }}>
      {children}
    </OrganizationContext.Provider>
  )
}

export { OrganizationContext, OrganizationProvider }
