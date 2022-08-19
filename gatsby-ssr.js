import React from "react"
import { ApolloProvider } from "react-apollo"
import { client } from "./src/services/apollo"

import { AppProvider } from "./src/context/AppContext"
import { OrganizationProvider } from "./src/components/Organization/context/OrganizationContext"

import { getFirebase } from "services/firebase/firebase"
import "./static/styles/global.scss"

export const wrapRootElement = ({ element }) => {
  getFirebase()

  return (
    <AppProvider>
      <OrganizationProvider>
        <ApolloProvider client={client}>{element}</ApolloProvider>
      </OrganizationProvider>
    </AppProvider>
  )
}
