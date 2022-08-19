import React, { Fragment } from "react"
import classNames from "classnames"
import styles from "./utils/elements.module.scss"

const Modal = (props) => {
  const modalBody = props.isCard ? (
    <ModalCardBody {...props} />
  ) : (
    <ModalBody {...props} />
  )

  return (
    <div
      className={classNames("modal m-0", {
        "is-active": props.isModalActive,
      })}
    >
      <div
        role="button"
        onKeyDown={(event) => {
          if (event.key === "Enter") props.closeModal()
        }}
        aria-label="Modal Background"
        tabIndex={0}
        className={`modal-background has-background-${props.modalBackground?.color} has-opacity-${props.modalBackground?.opacity}`}
        onClick={props.closeModal}
      ></div>
      {modalBody}
    </div>
  )
}

const ModalCardBody = (props) => (
  <div
    className={classNames("modal-card p-0", {
      [styles["modal__cardFullheight"]]: props.isFullheight,
    })}
  >
    {props.heading && (
      <div
        className={classNames(
          "modal-card-head",
          props.modalHeaderClass,
          {
            "has-background-white": !props.modalHeaderClass,
          },
          { [styles["modal__cardHeaderFullheight"]]: props.isFullheight }
        )}
      >
        <div className={classNames("modal-card-title", props.modalHeaderClass)}>
          <div>
            {props?.heading}
            <p className="is-size-6 has-text-weight-normal">
              {props?.headerHelper}
            </p>
          </div>
        </div>
        {!props.hideCloseButton && (
          <button
            className={classNames("delete is-medium")}
            onClick={props.closeModal}
          >
            Close
          </button>
        )}
      </div>
    )}
    <div
      className={classNames(
        "modal-card-body has-text-centered mb-0",
        styles["modal__cardBody"]
      )}
    >
      {props.children}
    </div>
  </div>
)

const ModalBody = (props) => (
  <Fragment>
    <div
      className={classNames(
        "modal-content has-text-centered",
        styles["modal__scrollbarIsHidden"]
      )}
    >
      {props.children}
    </div>
    {!props.hideCloseButton && (
      <button
        className="modal-close is-large has-background-light"
        onClick={props.closeModal}
      >
        Close
      </button>
    )}
  </Fragment>
)

export default Modal
