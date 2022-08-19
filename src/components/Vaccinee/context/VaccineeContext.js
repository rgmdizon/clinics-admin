import React, { useReducer } from "react"

import { initialState } from "./initialState"
import { VaccineeReducer } from "./VaccineeReducer"

const VaccineeContext = React.createContext(initialState)

const VaccineeProvider = ({ children }) => {
  let [vaccineeState, vaccineeDispatch] = useReducer(VaccineeReducer, {
    ...initialState,
  })

  return (
    <VaccineeContext.Provider value={{ vaccineeState, vaccineeDispatch }}>
      {children}
    </VaccineeContext.Provider>
  )
}

export { VaccineeContext, VaccineeProvider }
