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

const CODE = {
  SAVE_CODE: "SAVE_CODE",
  SAVE_VERIFICATION: "SAVE_VERIFICATION",
}

const registration = {
  SAVE_VACCINE: "SAVE_VACCINE",
  SAVE_PAYMENT: "SAVE_PAYMENT",
  SAVE_VACCINES: "SAVE_VACCINES",
  SAVE_INTAKE_FORM: "SAVE_INTAKE_FORM",
  SAVE_REGISTRATION: "SAVE_REGISTRATION",
  SAVE_ORDERING_FOR: "SAVE_ORDERING_FOR",
  SAVE_SCHEDULE_FORM: "SAVE_SCHEDULE_FORM",
  SAVE_VACCINEE_DOC_ID: "SAVE_VACCINEE_DOC_ID",
  SAVE_INFORMED_CONSENT: "SAVE_INFORMED_CONSENT",
  SAVE_PERSONAL_DETAILS: "SAVE_PERSONAL_DETAILS",
  SAVE_INVALIDITY_REASON: "SAVE_INVALIDITY_REASON",
}

const session = {
  SAVE_WHOLE_STATE: "SAVE_WHOLE_STATE",
  SAVE_CONTEXT_TO_SESSION: "SAVE_CONTEXT_TO_SESSION",
  GET_CONTEXT_FROM_SESSION: "GET_CONTEXT_FROM_SESSION",
  REMOVE_CONTEXT_FROM_SESSION: "REMOVE_CONTEXT_FROM_SESSION",
}

export let VaccineeReducer = (state, action) => {
  let toBeSaved = {}

  switch (action.type) {
    case documents.SAVE_DOCUMENTS:
      return {
        ...state,
        documents: [...action.payload],
      }

    case documents.SAVE_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, action.payload],
      }

    case session.SAVE_WHOLE_STATE:
      return {
        ...state,
        ...action.payload,
      }

    case CODE.SAVE_CODE:
      toBeSaved = {
        ...state,
        code: { ...action.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case CODE.SAVE_VERIFICATION:
      toBeSaved = {
        ...state,
        vaccineCode: action.payload?.vaccineCode,
        workEmail: action.payload?.workEmail,
        hasCode: action.payload?.hasCode,
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case registration.SAVE_PERSONAL_DETAILS:
      toBeSaved = {
        ...state,
        personalDetails: { ...state.personalDetails, ...action.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case registration.SAVE_VACCINE:
      toBeSaved = {
        ...state,
        vaccines: [...state.vaccines, action.payload],
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case registration.SAVE_VACCINES:
      toBeSaved = {
        ...state,
        vaccines: action.payload,
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case registration.SAVE_INTAKE_FORM:
      toBeSaved = {
        ...state,
        intakeForm: { ...state.intakeForm, ...action.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case registration.SAVE_INFORMED_CONSENT:
      toBeSaved = {
        ...state,
        informedConsent: { ...state.informedConsent, ...action.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case registration.SAVE_SCHEDULE_FORM:
      toBeSaved = {
        ...state,
        schedules: { ...state.schedules, ...action.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case registration.SAVE_ORDERING_FOR:
      toBeSaved = {
        ...state,
        orderingFor: { ...state.orderingFor, ...action.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case registration.SAVE_VACCINEE_DOC_ID:
      toBeSaved = {
        ...state,
        vaccineeDocumentId: action.payload,
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case registration.SAVE_PAYMENT:
      toBeSaved = {
        ...state,
        payment: { ...state.payment, ...action.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case registration.SAVE_REGISTRATION:
      toBeSaved = {
        ...state,
        registration: { ...state.registration, ...action.payload },
      }
      saveContextToSession({ ...toBeSaved })
      return toBeSaved

    case registration.SAVE_INVALIDITY_REASON:
      return {
        ...state,
        invalidityReason: action?.payload,
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
