import React, { useContext } from "react"
import { navigate } from "gatsby"

import { AppContext } from "context/AppContext"

const ConfirmNavigationModal = ({ backRoute }) => {
  const { dispatch } = useContext(AppContext)

  return (
    <div>
      <p className="has-text-weight-bold">
        Are you sure you want to leave this page?
      </p>
      <p>Your data will be lost once you go back.</p>
      <div className="buttons is-centered mt-1">
        <button
          type="button"
          className="button"
          onClick={() => navigate(backRoute)}
        >
          Leave this Page
        </button>
        <button
          type="button"
          className="button is-primary"
          onClick={() => dispatch({ type: "HIDE_MODAL" })}
        >
          Stay on this Page
        </button>
      </div>
    </div>
  )
}

export default ConfirmNavigationModal
