import React, { useContext, useState, useEffect } from "react"
import classNames from "classnames"
import { navigate } from "gatsby"

import Card from "elements/Card"
import Section from "elements/Section"
import Container from "layout/Container"
import ActionButtons from "elements/ActionButtons"
import DashboardLayout from "layout/DashboardLayout"
import DocumentDetails from "elements/DocumentDetails"
import EditDetailsButton from "elements/EditDetailsButton"
import Message from "elements/Message"

import { handleBookingPayment } from "../services/payment"
import { calculateTotalPrice } from "./services/calculateTotalPrice"
import { getFieldValue } from "services/summary"
import { parseFormField } from "services/airtable"
import { getSignedInUser } from "auth/services/user"
import { formatPrice } from "../../../services/formatting"
import { isObjectEmpty } from "services/general"
import { getContextFromSession } from "services/context"

import { useVaccines } from "./hooks/useVaccines"

import { BookingContext } from "../context/BookingContext"
import styles from "../../Layout/utils/layout.module.scss"

const Summary = ({ pageContext, location }) => {
  const { module, backPath } = pageContext
  const { state, dispatch } = useContext(BookingContext)

  let sessionState = getContextFromSession()

  let bookingState = !isObjectEmpty(sessionState)
    ? sessionState?.bookings
    : state?.bookings

  const [cta, setCta] = useState("Proceed to Payment")
  const [amountDue, setAmountDue] = useState(0)
  const [gateway, setGateway] = useState(null)
  const [loading, setLoading] = useState(false)

  const { organization, accountOwnerData } = getSignedInUser()

  const requirePayment = organization?.requirePayment

  const allVaccines = useVaccines()

  let sectionSummaryFields = parseFormField(
    pageContext.summaryFields.map((formField) => ({
      ...formField,
      section: formField.summarySection,
    }))
  )

  sectionSummaryFields = sectionSummaryFields.sort(
    (firstSection, secondSection) => firstSection.order - secondSection.order
  )

  const handleSubmitBooking = async () => {
    setLoading(true)
    let bookingData = {
      ...bookingState,
      documents: [bookingState?.receipt?.front],
    }

    let customerDetails = { ...organization, ...accountOwnerData }

    switch (gateway) {
      case "brankas":
        await handleBookingPayment({
          bookingData,
          gateway: "brankas",
          transactionDetails: { amount: amountDue },
          customerDetails,
          location,
        })
        break
      case "paynamics":
        dispatch({ type: "SAVE_AMOUNT_DUE", payload: amountDue })
        navigate("/bookings/checkout")
        break
      default:
        await handleBookingPayment({
          bookingData,
          transactionDetails: { amount: amountDue },
          customerDetails,
          location,
          callback: () => {
            dispatch({
              type: "RESET_BOOKING",
            })
          },
        })
        break
    }

    setLoading(false)
  }

  let tempAmount = calculateTotalPrice({
    allVaccines,
    bookingState,
  })

  useEffect(() => {
    switch (true) {
      case requirePayment && tempAmount > 50000:
        setGateway("paynamics")
        setCta("Select Payment Option")
        break
      case requirePayment && tempAmount < 50000:
        setGateway("brankas")
        setCta("Proceed with Payment")
        break
      default:
        setCta("Confirm")
    }
    setAmountDue(tempAmount)
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch({
      type: "GET_CONTEXT_FROM_SESSION",
    })
    //eslint-disable-next-line
  }, [])

  return (
    <DashboardLayout
      seoTitle={module?.title}
      pageContext={pageContext}
      title={module?.title}
    >
      <Container isCentered>
        <Card>
          {sectionSummaryFields.map((section) => {
            return (
              <Section
                title={section?.section}
                addOns={{
                  right: <EditDetailsButton route={section.link} />,
                }}
                isSectionRequired={section?.isSectionRequired}
              >
                <div className="table-container">
                  <table class="table is-fullwidth is-size-5">
                    <tbody>
                      {section.fields
                        .sort((firstField, secondField) => {
                          return firstField.order - secondField.order
                        })
                        .map((field) => {
                          let finalValue = getFieldValue(bookingState, field)

                          if (!!finalValue)
                            return (
                              <tr>
                                <td className="has-text-weight-bold">
                                  {field.label}
                                </td>
                                <td
                                  className={classNames(
                                    styles["summary__tableData"]
                                  )}
                                >
                                  {finalValue}
                                </td>
                              </tr>
                            )
                          return null
                        })}
                    </tbody>
                  </table>
                </div>
              </Section>
            )
          })}
          {requirePayment && (
            <DocumentDetails title="Uploaded Documents" sectionLink="" />
          )}
          {amountDue && requirePayment ? (
            <Message color="info">
              <p>
                <b>Amount Due: {formatPrice({ priceString: amountDue })}</b>
              </p>
            </Message>
          ) : null}
          <ActionButtons
            back={{ label: "Back", link: backPath }}
            next={{
              loading,
              label: cta,
              callback: handleSubmitBooking,
            }}
          />
        </Card>
      </Container>
    </DashboardLayout>
  )
}

export default Summary
