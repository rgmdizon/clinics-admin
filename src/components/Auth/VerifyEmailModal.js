import React, { useContext, useState, Fragment } from "react"
import classNames from "classnames"
import Message from "elements/Message"

import { AppContext } from "context/AppContext"
import { setVerificationEmailMessage } from "./utils/setVerificationEmailMessage"
import { navigate } from "gatsby"

const VerifyEmailModal = ({ user, location, alreadySent }) => {
  const [loading, setLoading] = useState(false)
  const { dispatch } = useContext(AppContext)
  const [message, setMessage] = useState({})

  const handleCloseModal = () => {
    dispatch({ type: "HIDE_MODAL" })
    navigate("/sign-in")
  }

  const handleResendVerification = async () => {
    setMessage({ content: "" })
    setLoading(true)
    try {
      let continueUrl = `${location?.origin}/sign-in`
      await user.sendEmailVerification({ url: continueUrl })
      setMessage({ color: "success", content: "Verification email sent!" })
      dispatch({ type: "HIDE_MODAL" })
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          heading: "We have sent a verification email",
          isCard: true,
          headerClass: `has-text-info has-background-info-light has-text-weight-bold is-size-5`,
          content: (
            <VerifyEmailModal
              user={user}
              location={location}
              alreadySent={true}
            />
          ),
        },
      })
    } catch (error) {
      let message = setVerificationEmailMessage({ error })
      setMessage({ color: "danger", content: message })
    }
    setLoading(false)
  }

  return (
    <div className="has-text-left">
      {alreadySent ? (
        <p>Please click the link in your inbox to start booking.</p>
      ) : (
        <p>
          Please click the verification link we sent to your inbox. In case you
          can't find the email, please check your spam. If you have not received
          any verification email, you may resend the verification link.
        </p>
      )}
      {message.content && (
        <div className="mt-1">
          <Message color={message.color}>{message.content}</Message>
        </div>
      )}
      <div className="buttons is-centered mt-2">
        {alreadySent ? (
          <Fragment>
            <button
              className={classNames("button is-primary")}
              onClick={handleCloseModal}
            >
              OK
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button
              className={classNames("button ", {
                "is-loading": loading,
              })}
              onClick={handleResendVerification}
            >
              Resend Verification
            </button>
            <button
              className={classNames("button is-primary")}
              onClick={handleCloseModal}
            >
              OK
            </button>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default VerifyEmailModal
