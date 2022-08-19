import { initialState } from "./initialState"
import {
  saveContextToSession,
  getContextFromSession,
  removeContextFromSession,
} from "services/context"
import { isObjectEmpty } from "services/general"

const RESET_DETAILS = "RESET_DETAILS"

const app = {
  SAVE_HAS_REFRESHED: "SAVE_HAS_REFRESHED",
}
const modal = {
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
}

const documents = {
  SAVE_DOCUMENTS: "SAVE_DOCUMENTS",
  SAVE_DOCUMENT: "SAVE_DOCUMENT",
  SAVE_BIR_FRONT: "SAVE_BIR_FRONT",
  SAVE_BIR_BACK: "SAVE_BIR_BACK",
}

const registration = {
  SAVE_REGISTRATION: "SAVE_REGISTRATION",
}

const bottomNotifications = {
  CLOSE_NOTIFICATIONS: "CLOSE_NOTIFICATIONS",
}

const bookings = {
  SAVE_BOOKING: "SAVE_BOOKING",
  SAVE_AMOUNT_DUE: "SAVE_AMOUNT_DUE",
  SAVE_DATE_OBJECT: "SAVE_DATE_OBJECT",
}

const toast = {
  SHOW_TOAST: "SHOW_TOAST",
  HIDE_TOAST: "HIDE_TOAST",
}

const session = {
  SAVE_CONTEXT_TO_SESSION: "SAVE_CONTEXT_TO_SESSION",
  GET_CONTEXT_FROM_SESSION: "GET_CONTEXT_FROM_SESSION",
  REMOVE_CONTEXT_FROM_SESSION: "REMOVE_CONTEXT_FROM_SESSION",
}

const auth = {
  SAVE_AUTH: "SAVE_AUTH",
}

export let AppReducer = (state, action) => {
  let toBeSaved = {}

  switch (action.type) {
    case documents.SAVE_DOCUMENTS:
      return {
        ...state,
        documents: [...action.payload],
      }

    case registration.SAVE_REGISTRATION:
      return {
        ...state,
        registration: { ...state.registration, ...action.payload },
      }

    case bookings.SAVE_BOOKING:
      return {
        ...state,
        bookings: { ...state.bookings, ...action?.payload },
      }

    case app.SAVE_HAS_REFRESHED:
      toBeSaved = {
        ...state,
        app: { ...state.app, hasRefreshed: action.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved
    case bookings.SAVE_AMOUNT_DUE:
      return {
        ...state,
        bookings: { ...state.bookings, amount: action?.payload },
      }
    case bookings.SAVE_DATE_OBJECT:
      return {
        ...state,
        bookings: { ...state.bookings, selectedDateObject: action?.payload },
      }

    case documents.SAVE_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, action.payload],
      }
    case modal.SHOW_MODAL:
      return { ...state, modal: { ...action.payload, isActive: true } }

    case bottomNotifications.CLOSE_NOTIFICATIONS:
      return {
        ...state,
        bottomNotifications: { ...state.bottomNotifications, isActive: false },
      }

    case modal.HIDE_MODAL:
      return { ...state, modal: { ...initialState.modal, isActive: false } }

    case toast.SHOW_TOAST:
      return { ...state, toast: { ...action.payload, isActive: true } }

    case toast.HIDE_TOAST:
      return { ...state, toast: { ...initialState.toast } }

    case session.SAVE_CONTEXT_TO_SESSION:
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

    case auth.SAVE_AUTH:
      return {
        ...state,
        auth: { ...state.auth, ...action.payload },
      }

    case RESET_DETAILS:
      return { ...initialState }

    default:
      return { ...initialState }
  }
}
