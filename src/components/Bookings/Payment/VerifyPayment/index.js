import React, { useEffect, useState } from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

import PaymentSuccess from "./PaymentSuccess"

import DashboardLayout from "layout/DashboardLayout"
import Container from "layout/Container"

import { getTransaction } from "services/payment/paynamics"
import Card from "elements/Card"

const VerifyPayment = ({ pageContext, location }) => {
  const { module, nextPath } = pageContext

  const [title] = useState("Success")
  const [paymentStatus] = useState("success")

  const params = new URLSearchParams(location.search)

  let transactionId = params.get("requestId")

  const data = useStaticQuery(graphql`
    {
      payment: file(relativePath: { eq: "payment/bank-transfer.png" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const payment = data.payment.childImageSharp.fluid

  const renderMessage = (status) => {
    switch (status) {
      case "success":
        return <PaymentSuccess redirectUrl={nextPath} />

      case "pending":
      default:
        return <p>Please wait while we verify your payment</p>
    }
  }

  const checkTransactionStatus = async () => {
    if (transactionId) {
      await getTransaction({ transactionId })
    }
  }

  useEffect(() => {
    checkTransactionStatus()
  })
  return (
    <DashboardLayout seoTitle={module?.seoTitle}>
      <Card>
        <Container mobile={8} tablet={6} desktop={4} isCentered>
          <Img fluid={payment} />
        </Container>
        <center>
          <h2>{title}</h2>
          {renderMessage(paymentStatus)}
        </center>
      </Card>
    </DashboardLayout>
  )
}

export default VerifyPayment
