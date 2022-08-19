import React from "react"
import classNames from "classnames"

import styles from "../utils/registration.module.scss"

const VaccineCart = ({
  vaccines,
  vaccineeDispatch,
  handleAddVaccine,
  showPayment,
}) => {
  const handleDeleteVaccine = (index) => {
    let tempVaccines = [...vaccines]
    tempVaccines.splice(index, 1)

    // tempVaccines = tempVaccines?.filter(
    //   (tempVaccine) => tempVaccine?.productTitle !== vaccine?.productTitle
    // )

    vaccineeDispatch({ type: "SAVE_VACCINES", payload: tempVaccines })
  }

  return (
    <div className="mt-2 mb-4">
      {vaccines?.map((vaccine, index) => (
        <div className="card mb-2 p-2">
          <button
            aria-label="delete vaccine"
            onClick={() => handleDeleteVaccine(index)}
            className={classNames("delete", styles["vaccineCardDelete"])}
          />
          <div className="is-flex is-justify-content-space-between is-align-items-end">
            <div>
              <h4 className="title has-text-primary mt-0 is-4">
                {vaccine?.type} vaccine, #{vaccine?.quantity}
              </h4>
              <p className="subtitle">
                {vaccine?.brand},{" "}
                <span>ordering for {vaccine?.orderingFor?.toLowerCase()}</span>
              </p>
            </div>
            {showPayment && (
              <div className="has-text-right">
                <p className="is-size-5">
                  <span className="has-text-weight-bold">
                    Php {parseFloat(vaccine?.totalPrice).toFixed(2)}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
      <button
        onClick={handleAddVaccine}
        className="button is-primary is-inverted is-medium"
      >
        + Add another vaccine
      </button>
      {showPayment && (
        <div className="mt-5">
          <hr />
          <div className="is-flex is-justify-content-space-between px-2">
            <p className="is-size-5 has-text-weight-bold">Total Amount Due</p>
            <p className="is-size-5 has-text-weight-bold">
              Php{" "}
              {vaccines
                ?.map(
                  (vaccine) =>
                    (parseFloat(vaccine?.vaccinePrice) +
                      parseFloat(vaccine?.adminPrice)) *
                    parseFloat(vaccine?.quantity)
                )
                ?.reduce((a, b) => parseFloat(a || 0) + parseFloat(b || 0))
                ?.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default VaccineCart
