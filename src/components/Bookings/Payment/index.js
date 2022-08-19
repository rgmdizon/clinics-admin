import React, { useState, useContext } from "react"
import { Formik, Form } from "formik"

import Card from "elements/Card"
import Message from "elements/Message"
import Container from "layout/Container"
import ActionButtons from "elements/ActionButtons"
import DashboardLayout from "layout/DashboardLayout"
import FormStyledRadio from "elements/Form/FormStyledRadio"

import { usePaymentOptionsImages } from "./hooks/usePaymentOptionsImages"
import paymentOptions from "./utils/paymentOptions.json"

import { handleBookingPayment } from "../services/payment"
import { getSignedInUser } from "components/Auth/services/user"

import { AppContext } from "context/AppContext"

const Payment = ({ pageContext, location }) => {
  const { module, backPath } = pageContext

  const { state } = useContext(AppContext)

  const [loading, setLoading] = useState(false)

  const data = usePaymentOptionsImages()

  const handlePayment = async (values) => {
    const { organization, accountOwnerData } = getSignedInUser()
    setLoading(true)
    let amount = "60000"
    let transactionDetails = { ...values.paymentOption, amount }
    let customerDetails = { ...organization, ...accountOwnerData }
    let bookingData = {
      ...state?.bookings,
      documents: [state?.bookings?.receipt?.front],
    }
    await handleBookingPayment({
      bookingData,
      gateway: "paynamics",
      transactionDetails,
      customerDetails,
      location,
    })
    setLoading(false)
  }

  return (
    <DashboardLayout seoTitle={module?.seoTitle} title={module?.title}>
      <Container isCentered>
        <Card>
          <Message color="primary">
            Please select your preferred payment channel.
          </Message>
          <Formik
            onSubmit={handlePayment}
            initialValues={{ paymentOption: "" }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                {paymentOptions.map((option) => (
                  <FormStyledRadio
                    isActive={values?.paymentOption === option}
                    onClick={() => {
                      setFieldValue("paymentOption", option)
                    }}
                    logo={data[option.logo].childImageSharp.fixed}
                  />
                ))}
                <ActionButtons
                  back={{ label: "Back", link: backPath }}
                  submit={{
                    label: "Proceed to Payment",
                    disabled: values?.paymentOption === "",
                    loading,
                  }}
                />
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </DashboardLayout>
  )
}

export default Payment
