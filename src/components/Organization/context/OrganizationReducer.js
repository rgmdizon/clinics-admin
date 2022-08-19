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
  SAVE_BIR_FRONT: "SAVE_BIR_FRONT",
  SAVE_BIR_BACK: "SAVE_BIR_BACK",
}

const registration = {
  SAVE_REGISTRATION: "SAVE_REGISTRATION",
}

const session = {
  SAVE_CONTEXT_TO_SESSION: "SAVE_CONTEXT_TO_SESSION",
  GET_CONTEXT_FROM_SESSION: "GET_CONTEXT_FROM_SESSION",
  REMOVE_CONTEXT_FROM_SESSION: "REMOVE_CONTEXT_FROM_SESSION",
}

export let OrganizationReducer = (state, action) => {
  switch (action.type) {
    case "SAVE_AGREE_TO_MECHANICS":
      return {
        ...state,
        agreeToOrganizationRegistrationMechanics: { ...action.payload },
      }
    case documents.SAVE_DOCUMENTS:
      return {
        ...state,
        documents: [...action.payload],
      }

    case registration.SAVE_REGISTRATION:
      return {
        ...state,
        ...action.payload,
      }

    case documents.SAVE_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, action.payload],
      }

    case session.SAVE_CONTEXT_TO_SESSION:
      let toBeSaved = {}
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
