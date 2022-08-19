import firebase from "firebase"

export const handleForgotPassword = async ({
  values,
  callback,
  setMessage,
  errorCallback,
  location,
}) => {
  let email = values?.email
  // let transformedEmail = email.trim() + GATSBY_CLIENT_EMAIL_DOMAIN
  let actionCodeSettings = { url: location.origin + "/sign-in" }

  try {
    await firebase.auth().sendPasswordResetEmail(email, actionCodeSettings)
    if (callback) callback()
  } catch (error) {
    if (errorCallback) errorCallback(error)
    setMessage({
      type: "danger",
      content: { code: error.code, message: error.message },
    })
  }
}
