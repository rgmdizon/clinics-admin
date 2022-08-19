import React, { useState, Fragment, useEffect } from "react"
import { Formik, Form } from "formik"

import Message from "elements/Message"
import FormSelect from "elements/Form/FormSelect"
import VaccineQuantityInput from "./VaccineQuantityInput"
import FormRadio from "elements/Form/FormRadio"

import { addVaccineSchema } from "./utils/addVaccineSchema"

const AddVaccineForm = ({
  code,
  vaccines,
  dispatch,
  showPayment,
  addedVaccines,
  vaccineeDispatch,
}) => {
  const [disableAddVaccine, setDisableAddVaccine] = useState(false)
  const [selectedVaccine, setSelectedVaccine] = useState({})
  const [disabledOptions, setDisabledOptions] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [brands, setBrands] = useState([])

  let { vaccineMap, availableVaccines } = vaccines

  let totalOrderedDependents = 0
  addedVaccines.forEach((vax) => {
    if (vax?.orderingFor === "Dependent")
      totalOrderedDependents += vax?.quantity
  })

  let availableMaxDependent = code?.maxDependents - totalOrderedDependents

  const handleCloseModal = () => dispatch({ type: "CLOSE_MODAL" })

  const handleSubmitVaccine = (values) => {
    let finalSelectedValue = { ...selectedVaccine }
    finalSelectedValue.type = values?.vaccine?.value
    finalSelectedValue.quantity = values?.quantity
    finalSelectedValue.totalPrice = totalPrice
    finalSelectedValue.orderingFor = values?.orderingFor

    // Check if ordered vaccine already exists in the cart
    // If it is, update the quantity and total price in the cart
    let hasSameOrder = addedVaccines?.reduce((prev, vax) => {
      if (
        vax?.type === finalSelectedValue.type &&
        vax?.brand === finalSelectedValue.brand &&
        vax?.orderingFor === finalSelectedValue.orderingFor
      ) {
        vax.quantity += finalSelectedValue.quantity
        vax.totalPrice += finalSelectedValue.totalPrice 
        return prev + 1
      } else {return prev}
    }, 0)

    if (hasSameOrder) vaccineeDispatch({ type: "SAVE_VACCINES", payload: addedVaccines })
    else vaccineeDispatch({ type: "SAVE_VACCINE", payload: finalSelectedValue })
    handleCloseModal()
  }

  const handleChangeVaccine = ({ value, setFieldValue, values }) => {
    let selectedVaccineType = value?.label

    let vaccineBrands = vaccineMap[value?.label]?.map((vaccine) => ({
      value: vaccine,
      label: vaccine,
    }))

    setFieldValue("brand.value", "")
    setFieldValue("brand.label", "")

    let hasSameVaccine =
      addedVaccines?.filter(
        (vax) =>
          vax?.vaccine === selectedVaccineType && vax?.orderingFor === "Myself"
      ).length > 0

    if (hasSameVaccine) {
      setFieldValue("orderingFor", "Dependent")
      setDisabledOptions((options) => {
        let newOptions = [...options, "Myself"]

        let includesAllOptions =
          newOptions?.includes("Myself") && newOptions?.includes("Dependent")

        if (includesAllOptions) {
          setDisableAddVaccine(true)
          setFieldValue("orderingFor", "")
        } else {
          setFieldValue("orderingFor", "Dependent")
          if (!availableMaxDependent) {
            setFieldValue("quantity", 0)
          }
        }
        return newOptions
      })
    } else {
      setDisabledOptions((options) => [...options])
    }

    if (vaccineBrands?.length === 1) {
      setFieldValue("brand", vaccineBrands[0])
      handleGetSelectedVaccine({
        values,
        setFieldValue,
        vaccine: value?.label,
        brand: vaccineBrands[0]?.label,
      })
    }

    setBrands(vaccineBrands)
  }

  const handleGetSelectedVaccine = ({
    brand,
    values,
    vaccine,
    setFieldValue,
  }) => {
    let selectedBrand = brand || values?.brand?.value
    let selectedVaccineType = vaccine || values?.vaccine?.value

    let selectedVaccine = availableVaccines?.find(
      (vax) =>
        vax?.brand === selectedBrand && vax?.vaccine === selectedVaccineType
    )

    let calculatedTotalPrice =
      (parseFloat(selectedVaccine?.vaccinePrice) +
        parseFloat(selectedVaccine?.adminPrice)) *
      values?.quantity

    let hasSameVaccine =
      addedVaccines?.filter(
        (vax) =>
          vax?.vaccine === selectedVaccineType && vax?.orderingFor === "Myself"
      ).length > 0

    if (hasSameVaccine) {
      setDisabledOptions((options) => {
        let newOptions = [...options, "Myself"]

        let includesAllOptions =
          newOptions?.includes("Myself") && newOptions?.includes("Dependent")

        if (includesAllOptions) {
          setDisableAddVaccine(true)
          setFieldValue("orderingFor", "")
        } else {
          setFieldValue("orderingFor", "Dependent")
          if (!availableMaxDependent) {
            setFieldValue("quantity", 0)
          }
        }
        return newOptions
      })
    } else {
      setDisabledOptions((options) => [...options])
    }

    setSelectedVaccine(selectedVaccine)
    setTotalPrice(calculatedTotalPrice)
    
    let isMaxQuantityReached = 
      values.orderingFor === "" || 
      (values.orderingFor === "Dependent" && !availableMaxDependent)

    if (isMaxQuantityReached) {
      setFieldValue("quantity", 0)
      setTotalPrice(0)
    }
  }

  useEffect(() => {
    if (!code?.allowDependents) {
      setDisabledOptions(["Dependent"])
      setMessage(
        "This company code does not support the addition of vaccines for dependents."
      )
    }
    if (!code?.allowSelfOrder) {
      setDisabledOptions(["Myself"])
      setMessage(
        "This company code does not support the addition of vaccines for non-dependents."
      )
    }

    let hasSameVaccine =
    addedVaccines?.filter(
      (vax) =>
        vax?.orderingFor === "Myself"
    ).length > 0

    if (hasSameVaccine > 0) {
      setErrorMessage("Only one type of vaccine may be selected per individual.")
    }

    //eslint-disable-next-line
  }, [])

  return (
    <div className="has-text-left px-2">
      <Formik
        onSubmit={handleSubmitVaccine}
        initialValues={{
          vaccine: {value: null, label: ""},
          brand: {value: null, label: ""},
          orderingFor: !code?.allowSelfOrder ? "Dependent" : "Myself",
          quantity: 1,
        }}
        validationSchema={addVaccineSchema}
        validateOnMount={true}
      >
        {({ values, errors, setFieldValue }) => (
          <Form>
            <FormSelect
              name="vaccine"
              label="Vaccine"
              options={vaccines?.vaccines}
              onChange={(value) => {
                handleChangeVaccine({ value, values, setFieldValue })
                setFieldValue("vaccine", value)
              }}
              value={values?.vaccine}
              isRequired
            />
            <FormSelect
              name="brand"
              label="Brand"
              options={brands}
              value={values?.brand}
              onChange={(value) => {
                if (
                  values?.orderingFor === "Dependent" &&
                  !availableMaxDependent
                )
                  setFieldValue("quantity", 0)
                  
                handleGetSelectedVaccine({
                  setFieldValue,
                  values: { ...values, brand: value },
                })
                setFieldValue("brand", value)
              }}
              isDisabled={!values?.vaccine}
              isRequired
            />
            {values?.vaccine.value !== "COVID-19" && (
              <FormRadio
                isRequired
                name="orderingFor"
                title="Who are you ordering for?"
                options={["Myself", "Dependent"]}
                value={values["orderingFor"]}
                errors={errors}
                setFieldValue={setFieldValue}
                disabledOptions={disabledOptions}
                onChange={(event) => {
                  var newValue = event.target.value
                  if (newValue === "Dependent" && !availableMaxDependent)
                    setFieldValue("quantity", 0)

                  if (newValue === "Myself") {
                    setFieldValue("quantity", 1)

                    let calculatedTotalPrice =
                      (parseFloat(selectedVaccine?.vaccinePrice) +
                        parseFloat(selectedVaccine?.adminPrice)) *
                      1

                    setTotalPrice(calculatedTotalPrice)
                  }
                }}
              />
            )}
            <VaccineQuantityInput
              availableMaxDependent={availableMaxDependent}
              selectedVaccine={selectedVaccine}
              orderingFor={values.orderingFor}
              setFieldValue={setFieldValue}
              setTotalPrice={setTotalPrice}
              quantity={values.quantity}
              showPayment={showPayment}
              code={code}
            />
            {showPayment && values?.brand && (
              <Fragment>
                <hr />
                <div className="is-flex is-justify-content-end">
                  <p className="is-size-5 mr-1">Total Price: </p>
                  <p className="has-text-weight-bold has-text-primary is-size-5">
                    Php {parseFloat(totalPrice)?.toFixed(2)}
                  </p>
                </div>
              </Fragment>
            )}
            <div className="mt-3">
              {errorMessage && (
                <Message>
                  <span className="is-size-6">{errorMessage}</span>
                </Message>
              )}
              {message && (
                <Message>
                  <span className="is-size-6">{message}</span>
                </Message>
              )}
              <button
                type="submit"
                className="button is-fullwidth is-primary mt-2 mb-2"
                disabled={
                  disableAddVaccine ||
                  (addedVaccines?.filter((vax) => vax?.vaccine === "COVID-19")
                    ?.length > 0 &&
                    values?.vaccine?.value === "COVID-19")
                }
              >
                Add to cart
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddVaccineForm
