export const setVerificationEmailMessage = ({ error }) => {
  let message

  switch (error.code) {
    case "auth/too-many-requests":
      message = "Too many requests. Please try again after a few minutes."
      break

    default:
      message = error.message
      break
  }

  return message
}
