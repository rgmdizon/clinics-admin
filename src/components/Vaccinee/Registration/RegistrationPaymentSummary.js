import React, { useEffect } from "react"
import classNames from "classnames"

import Section from "elements/Section"

import styles from "./utils/registration.module.scss"

const RegistrationPaymentSummary = ({ vaccineeState, vaccineeDispatch }) => {
  let totalAmount = 0

  if (vaccineeState?.vaccines)
    vaccineeState.vaccines.forEach((vaccine) => {
      totalAmount += parseFloat(vaccine?.totalPrice)
    })

  useEffect(() => {
    vaccineeDispatch({ type: "SAVE_PAYMENT", payload: { totalAmount } })
    //eslint-disable-next-line
  }, [])

  return (
    <Section title="Vaccines">
      <table class="table is-fullwidth is-size-5">
        <tbody className={classNames("body")}>
          {vaccineeState?.vaccines?.map((vaccine) => (
            <tr>
              <td>
                {vaccine?.type} ({vaccine?.brand}) x{vaccine?.quantity} for{" "}
                {vaccine?.orderingFor?.toLowerCase()}
              </td>
              <td
                className={classNames(
                  "has-text-right",
                  styles["summary__tableData"]
                )}
              >
                {parseFloat(vaccine?.totalPrice).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr className="has-text-weight-bold has-text-right">
            <td>Total Amount Due</td>
            <td className={classNames(styles["summary__tableData"])}>
              Php {parseFloat(vaccineeState?.payment?.totalAmount).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </Section>
  )
}

export default RegistrationPaymentSummary
