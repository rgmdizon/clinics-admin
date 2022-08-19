import React, { useContext, useEffect, useState, Fragment } from "react"
import { navigate } from "gatsby"

import Layout from "layout"
import Container from "layout/Container"
import ActionButtons from "elements/ActionButtons"

import Message from "elements/Message"
import VaccineCart from "./VaccineCart"
import AddVaccineForm from "./AddVaccineForm"

import { AppContext } from "context/AppContext"
import { getContextFromSession } from "services/context"
import { VaccineeContext } from "../../context/VaccineeContext"
import { useVaccineProducts } from "../hooks/useVaccineProducts"
import { getAvailableVaccines } from "../services/getAvailableVaccines"
import { checkRequiredData } from "../utils/checkRequiredData"

const RegistrationCart = ({ pageContext }) => {
  const { dispatch } = useContext(AppContext)
  const { vaccineeState, vaccineeDispatch } = useContext(VaccineeContext)
  let {
    module,
    backPath,
    progress,
    numberOfPages,
    nextPath,
    requiredData,
  } = pageContext

  const showPayment =
    vaccineeState?.code?.code?.paymentArrangement
      ?.toLowerCase()
      ?.localeCompare("company-paid") !== 0

  const [vaccines, setVaccines] = useState({})

  let vaccinesQuery = useVaccineProducts()

  useEffect(() => {
    let sessionState = getContextFromSession()
    vaccineeDispatch({ type: "SAVE_WHOLE_STATE", payload: sessionState })

    if (
      requiredData &&
      !checkRequiredData({ data: sessionState, required: requiredData })
    )
      navigate("/")

    setVaccines(
      getAvailableVaccines({
        schedules:
          vaccineeState?.code?.schedules || sessionState?.code?.schedules,
        availableVaccines:
          vaccineeState?.code?.vaccines || sessionState?.code?.vaccines,
        vaccines: vaccinesQuery,
      })
    )

    //eslint-disable-next-line
  }, [])

  const handleAddVaccine = () => {
    dispatch({
      type: "SHOW_MODAL",
      payload: {
        heading: "Add Vaccine",
        headerHelper:
          "If ordering for both yourself and your dependents, accomplish this twice",
        headerClass: `has-text-primary has-background-light has-text-weight-bold is-size-5`,
        isCard: true,
        content: (
          <AddVaccineForm
            vaccines={vaccines}
            dispatch={dispatch}
            showPayment={showPayment}
            code={vaccineeState?.code?.code}
            vaccineeDispatch={vaccineeDispatch}
            addedVaccines={vaccineeState?.vaccines}
          />
        ),
      },
    })
  }

  let hasOrderingForDependent = vaccineeState?.vaccines?.some(
    (vaccine) => vaccine.orderingFor === "Dependent"
  )

  let actionButtonLinks = {
    back: { label: "Back", link: backPath },
    next: { callback: handleAddVaccine, label: "Add Vaccine" },
  }

  if (vaccineeState?.vaccines?.length > 0)
    actionButtonLinks.next = {
      label: "Next",
      link: hasOrderingForDependent ? "/schedules" : nextPath,
    }

  return (
    <Layout
      title={module?.title}
      subtitle={module?.subTitle}
      seoTitle={module?.seoTitle}
      progress={(progress / numberOfPages) * 100}
    >
      <Container isCentered fullhd={6}>
        {vaccineeState?.vaccines?.length > 0 ? (
          <Fragment>
            <VaccineCart
              vaccineeDispatch={vaccineeDispatch}
              handleAddVaccine={handleAddVaccine}
              vaccines={vaccineeState?.vaccines}
              showPayment={showPayment}
            />
            <ActionButtons {...actionButtonLinks} />
          </Fragment>
        ) : Object.keys(vaccines)?.length > 0 ? (
          <Fragment>
            <Message color="primary">
              <span className="is-size-6">
                If ordering for both yourself and your dependents, accomplish
                this twice.
              </span>
            </Message>
            <AddVaccineForm
              vaccines={vaccines}
              dispatch={dispatch}
              showPayment={showPayment}
              code={vaccineeState?.code?.code}
              vaccineeDispatch={vaccineeDispatch}
              addedVaccines={vaccineeState?.vaccines}
            />
          </Fragment>
        ) : null}
      </Container>
    </Layout>
  )
}

export default RegistrationCart
