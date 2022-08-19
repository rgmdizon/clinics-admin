export const initialState = {
  vaccinee: {},
  registration: {},
  screening: {},
  invalidityReason: "",
  vaccineCode: "",
  workEmail: "",
  hasCode: "",
  code: {},
  vaccines: [],
  intakeForm: {},
  schedules: {},
  payment: {},
  orderingFor: {},
  vaccineeDocumentId: "",
  informedConsent: "",
  modal: {
    isCard: false,
    isFullheight: false,
    isActive: false,
    content: null,
    heading: "",
    headerClass: null,
    hideCloseButton: true,
    background: {
      color: null,
      opacity: "100",
    },
  },
  toast: {
    isActive: false,
    message: null,
    color: null,
  },
}
