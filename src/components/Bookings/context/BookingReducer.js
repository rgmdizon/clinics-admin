import { initialState } from "./initialState"
import {
  saveContextToSession,
  getContextFromSession,
  removeContextFromSession,
} from "services/context"
import { isObjectEmpty } from "services/general"

const RESET_DETAILS = "RESET_DETAILS"

const documents = {
  SAVE_DOCUMENTS: "SAVE_DOCUMENTS",
  SAVE_DOCUMENT: "SAVE_DOCUMENT",
}

const bookings = {
  SAVE_ALL_DATES: "SAVE_ALL_DATES",
  SAVE_ACTIVE_BOOKING_EVENT: "SAVE_ACTIVE_BOOKING_EVENT",
  RESET_BOOKING: "RESET_BOOKING",
  SAVE_BOOKING: "SAVE_BOOKING",
  SAVE_AMOUNT_DUE: "SAVE_AMOUNT_DUE",
  SAVE_DATE_OBJECT: "SAVE_DATE_OBJECT",
}

const session = {
  SAVE_CONTEXT_TO_SESSION: "SAVE_CONTEXT_TO_SESSION",
  GET_CONTEXT_FROM_SESSION: "GET_CONTEXT_FROM_SESSION",
  REMOVE_CONTEXT_FROM_SESSION: "REMOVE_CONTEXT_FROM_SESSION",
}

export let BookingReducer = (state, action) => {
  let toBeSaved = {}

  switch (action.type) {
    case documents.SAVE_DOCUMENTS:
      return {
        ...state,
        documents: [...action.payload],
      }

    case bookings.SAVE_BOOKING:
      toBeSaved = {
        ...state,
        bookings: { ...state.bookings, ...action?.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case bookings.SAVE_ALL_DATES:
      toBeSaved = {
        ...state,
        allDates: action.payload,
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case bookings.RESET_BOOKING:
      toBeSaved = {
        ...state,
        bookings: {},
        allDates: [],
        activeBooking: {},
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case bookings.SAVE_ACTIVE_BOOKING_EVENT:
      toBeSaved = {
        ...state,
        activeBooking: { ...state.activeBooking, ...action?.payload },
      }

      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case bookings.SAVE_AMOUNT_DUE:
      toBeSaved = {
        ...state,
        bookings: { ...state.bookings, amount: action?.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case bookings.SAVE_DATE_OBJECT:
      toBeSaved = {
        ...state,
        bookings: { ...state.bookings, selectedDateObject: action?.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case documents.SAVE_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, action.payload],
      }

    case session.SAVE_CONTEXT_TO_SESSION:
      toBeSaved = {}
      for (let key in action.payload) toBeSaved[key] = action.payload[key]
      saveContextToSession({ ...toBeSaved })
      return toBeSaved
    case session.GET_CONTEXT_FROM_SESSION:
      let returnState = { ...getContextFromSession() }
      if (isObjectEmpty(returnState)) return { ...initialState }

      return {
        ...returnState,
        modal: {
          ...initialState.modal,
        },
      }

    case session.REMOVE_CONTEXT_FROM_SESSION:
      removeContextFromSession()
      return {
        ...initialState,
      }

    case RESET_DETAILS:
      return { ...initialState }

    default:
      return { ...initialState }
  }
}
