import { navigate } from "gatsby"

import { handleSignOut } from "./signout"
import { handleEmailLogin } from "./signin"
import { checkIfEmailAlreadyExists, handleSignUp } from "./signup"
import { handleForgotPassword } from "./forgotPassword"

export const handleAuthSubmit = async ({
  payload,
  state,
  dispatch,
  location,
}) => {
  let { setLoading, setMessage } = payload
  let email = payload.values?.email
  // let transformedEmail = email.trim() + GATSBY_CLIENT_EMAIL_DOMAIN

  switch (payload.module) {
    case "sign-in":
      handleEmailLogin({
        ...payload,
        callBack: () => {
          setLoading(false)

          dispatch({
            type: "SAVE_AUTH",
            payload: {
              ...payload.values,
              // email: transformedEmail,
              hasBeenVerified: true,
            },
          })

          dispatch({
            type: "SAVE_CONTEXT_TO_SESSION",
            payload: {
              ...state,
              auth: {
                ...payload.values,
                // email: transformedEmail,
                hasBeenVerified: true,
              },
            },
          })
        },
        errorCallback: () => {
          setLoading(false)
        },
        dispatch,
        location,
      })
      break
    case "forgot-password":
      handleForgotPassword({
        ...payload,
        location,
        callback: () => {
          setLoading(false)
          setMessage({
            content:
              "Please check your email for instructions to reset your password.",
          })
        },
        errorCallback: () => {
          setLoading(false)
        },
      })
      break
    case "verify-email":
      const isAlreadyEnrolled = await checkIfEmailAlreadyExists(email)

      dispatch({
        type: "SAVE_AUTH",
        payload: { ...payload.values, hasBeenVerified: true },
      })

      dispatch({
        type: "SAVE_CONTEXT_TO_SESSION",
        payload: {
          ...state,
          auth: { ...payload.values, hasBeenVerified: true },
        },
      })

      if (isAlreadyEnrolled) {
        navigate("/sign-in")
      } else {
        navigate("/sign-up")
      }

      setLoading(false)
      break
    case "sign-up":
      handleSignUp({
        ...payload,
        dispatch,
        location,
        callBack: () => {
          setLoading(false)
          navigate("/sign-in")
          handleSignOut({ redirect: false })
          dispatch({ type: "RESET_DETAILS" })
        },
        errorCallback: () => {
          setLoading(false)
        },
      })
      break

    default:
      break
  }
}
