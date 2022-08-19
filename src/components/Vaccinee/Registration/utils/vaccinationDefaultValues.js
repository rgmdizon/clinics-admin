export const vaccinationDefaultValues = (bookingDocument) => ({
  date: { timestampValue: new Date() },
  vaccine: { stringValue: bookingDocument?.type },
  site: { stringValue: bookingDocument?.venue },
  doseType: { stringValue: bookingDocument?.doseType },
  vaccinatorName: { stringValue: "" },
  lotNumber: { stringValue: "" },
  batchNumber: { stringValue: "" },
  expiryDate: { stringValue: "" },
  cbcrId: { stringValue: "" },
  deferral: { stringValue: "" },
  deferralReason: { stringValue: "" },
  adverseEvent: { stringValue: "" },
})
