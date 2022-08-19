import React from "react"
import { ApolloProvider } from "react-apollo"
import { client } from "./src/services/apollo"

import { AppProvider } from "./src/context/AppContext"
import { OrganizationProvider } from "./src/components/Organization/context/OrganizationContext"
import { BookingProvider } from "./src/components/Bookings/context/BookingContext"
import { VaccineeProvider } from "./src/components/Vaccinee/context/VaccineeContext"

import { getFirebase } from "services/firebase/firebase"
import "./static/styles/global.scss"

export const wrapRootElement = ({ element }) => {
  getFirebase()

  return (
    <AppProvider>
      <OrganizationProvider>
        <BookingProvider>
          <VaccineeProvider>
            <ApolloProvider client={client}>{element}</ApolloProvider>
          </VaccineeProvider>
        </BookingProvider>
      </OrganizationProvider>
    </AppProvider>
  )
}
