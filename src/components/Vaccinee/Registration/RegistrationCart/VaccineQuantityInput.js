import classNames from "classnames"
import React, { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"

import FormInput from "elements/Form/FormInput"
import Button from "elements/Button"

import styles from "../utils/registration.module.scss"

const VaccineQuantityInput = ({
  availableMaxDependent,
  selectedVaccine,
  setFieldValue,
  setTotalPrice,
  orderingFor,
  showPayment,
  quantity,
  code,
}) => {
  let isActionsDisabled = orderingFor === "Myself"

  const changeQuantity = (setFieldValue, quantity) => {
    if (quantity > 0 && quantity <= 1000) setFieldValue("quantity", quantity)
    if (quantity > availableMaxDependent) {
      quantity = availableMaxDependent
      setFieldValue("quantity", availableMaxDependent)
    }
    if (quantity <= 0) {
      quantity = availableMaxDependent ? 1 : 0
      setFieldValue("quantity", quantity)
    }
    if (isNaN(quantity)) quantity = 0

    let calculatedTotalPrice =
      (parseFloat(selectedVaccine?.vaccinePrice) +
        parseFloat(selectedVaccine?.adminPrice)) *
      quantity

    setTotalPrice(calculatedTotalPrice)
  }

  let unitPrice =
    parseFloat(selectedVaccine?.vaccinePrice) +
    parseFloat(selectedVaccine?.adminPrice)

  // If isActionsDisabled, user can still order for themselves (max purchase is 1)
  // Else, user cannot order anymore for themselves (max purchase is 0)
  let availableMaxMyself = isActionsDisabled ? 1 : 0

  // If maxDependents exist, orderingFor = Dependent (max purchase is availableMaxDependent)
  // Else, orderingFor = Myself (max purchase is availableMaxMyself)
  let availableVaccines = code?.maxDependents
    ? availableMaxDependent
    : availableMaxMyself

  return (
    <Fragment>
      <p className="has-text-left has-text-grey is-size-6">
        Quantity you want to purchase: (Maximum purchase: {availableVaccines})
      </p>
      {showPayment && (
        <Fragment>
          {!!unitPrice && (
            <p className="has-text-left has-text-grey is-size-6">
              Unit Price: Php {parseFloat(unitPrice).toFixed(2)}
            </p>
          )}
        </Fragment>
      )}
      <FormInput
        hasAddons
        addonLeft={
          <Button
            onClick={() =>
              changeQuantity(setFieldValue, parseInt(quantity) - 1)
            }
            color="danger"
            isDisabled={isActionsDisabled}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
        }
        addonRight={
          <Button
            isDisabled={isActionsDisabled}
            onClick={() =>
              changeQuantity(setFieldValue, parseInt(quantity) + 1)
            }
            color="success"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        }
        type="number"
        name="quantity"
        inputmode="numeric"
        className={classNames("has-text-centered", styles["numberInput"])}
        pattern="[0-9]"
        min={1}
        max={availableMaxDependent}
        hideOptional
        isDisabled={isActionsDisabled}
        onKeyPress={(event) => {
          if (isNaN(event.key)) event.preventDefault()
        }}
        onChange={(event) => {
          changeQuantity(setFieldValue, parseInt(event.target.value))
        }}
      />
    </Fragment>
  )
}

export default VaccineQuantityInput
