import React, { useEffect } from "react"
import QrReader from "react-qr-scanner"
import Card from "elements/Card"
import Container from "layout/Container"
import { navigate } from "gatsby"

import Message from "elements/Message"
import Divider from "elements/Divider"
import VaccineeQRInput from "./VaccineeQRInput"

import { isBrowser } from "services/general"

const VaccineeQRScanner = ({
  setView,
  setVaccineeUid,
  scanErrorMessage,
  setEnrollmentCode,
}) => {
  const previewStyle = {
    height: 400,
    width: 480,
  }

  const handleScan = (data) => {
    if (data) {
      let qrCodeText = data?.text

      let lastIndex =
        qrCodeText.lastIndexOf("&e") === -1
          ? qrCodeText.lastIndexOf("&email")
          : qrCodeText.lastIndexOf("&e")

      let vaccineeUid = qrCodeText.substring(
        qrCodeText.indexOf("=") + 1,
        lastIndex
      )

      setVaccineeUid(vaccineeUid)
      setView("vaccinee")
    }
  }

  const handleSubmit = (values) => {
    setEnrollmentCode(values?.enrollmentCode)
    setView("vaccinee")
  }

  useEffect(() => {
    if (!sessionStorage?.getItem("doctorData"))
      navigate("/screening/verification")
  })

  //TODO: show qr error message handleOnError
  return isBrowser() ? (
    <Card>
      <Container isCentered>
        <QrReader
          delay={1000}
          style={previewStyle}
          onError={(error) => {
            console.error(error)
          }}
          onScan={handleScan}
        />
      </Container>
      {scanErrorMessage ? (
        <Message color="warning">
          <p>{scanErrorMessage}</p>
        </Message>
      ) : null}
      <Divider />
      <VaccineeQRInput handleSubmit={handleSubmit} />
    </Card>
  ) : null
}

export default VaccineeQRScanner