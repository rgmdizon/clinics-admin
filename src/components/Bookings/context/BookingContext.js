import React, { useReducer } from "react"

import { initialState } from "./initialState"
import { BookingReducer } from "./BookingReducer"

const BookingContext = React.createContext(initialState)

const BookingProvider = ({ children }) => {
  let [state, dispatch] = useReducer(BookingReducer, {
    ...initialState,
  })

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  )
}

export { BookingContext, BookingProvider }
