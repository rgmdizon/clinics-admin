import React, { useReducer } from "react"

import Modal from "components/Elements/Modal"
import Toast from "components/Layout/Toast"

import { initialState } from "./initialState"
import { AppReducer } from "./AppReducer"
import BottomNotification from "../components/Layout/BottomNotification"

const AppContext = React.createContext(initialState)

const AppProvider = ({ children }) => {
  let [state, dispatch] = useReducer(AppReducer, {
    ...initialState,
  })

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Modal
        isModalActive={state.modal.isActive}
        isFullheight={state.modal.isFullheight}
        closeModal={() => dispatch({ type: "HIDE_MODAL" })}
        heading={state.modal.heading}
        modalHeaderClass={state.modal.headerClass}
        modalBackground={state.modal.background}
        headerHelper={state.modal.headerHelper}
        hideCloseButton={state.modal.hideCloseButton}
        isCard={state.modal.isCard}
      >
        {state.modal.content}
      </Modal>
      <Toast
        isActive={state.toast.isActive}
        message={state.toast.message}
        color={state.toast.color}
      />
      {children}
      <BottomNotification
        isActive={state?.bottomNotifications?.isActive}
        handleCloseNotification={() => {
          dispatch({
            type: "CLOSE_NOTIFICATIONS",
          })
        }}
      />
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
