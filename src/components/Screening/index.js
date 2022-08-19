import React, { useState, useEffect } from "react"

import Layout from "layout"
import Container from "layout/Container"

import VaccineeQRScanner from "./VaccineeQRScanner"
import VaccineeScreening from "./VaccineeScreening"

const ScreeningView = ({ pageContext }) => {
  const { module, formFields } = pageContext
  const [view, setView] = useState("qr")
  const [scanErrorMessage, setScanErrorMessage] = useState(null)

  const [vaccineeUid, setVaccineeUid] = useState("")
  const [enrollmentCode, setEnrollmentCode] = useState("")
  const [pageSubtitle, setPageSubtitle] = useState(module?.subtitle)

  const handleQRScanError = (message) => {
    setScanErrorMessage(
      message ||
        "Vaccinee not found. Please confirm if their enrollment code is valid."
    )
    setView("qr")
  }

  const renderView = () => {
    switch (view) {
      case "vaccinee":
        return (
          <Container isCentered>
            <VaccineeScreening
              setView={setView}
              formFields={formFields}
              vaccineeUid={vaccineeUid}
              enrollmentCode={enrollmentCode}
              handleQRScanError={handleQRScanError}
            />
          </Container>
        )
      case "qr":
      default:
        return (
          <Container isCentered fullhd={6}>
            <VaccineeQRScanner
              setView={setView}
              setVaccineeUid={setVaccineeUid}
              scanErrorMessage={scanErrorMessage}
              setEnrollmentCode={setEnrollmentCode}
            />
          </Container>
        )
    }
  }

  useEffect(() => {
    if (view === "qr") {
      setPageSubtitle(
        "Please scan the vaccinees' QR Code to view their details and screening answers."
      )
    } else {
      setPageSubtitle(module?.subtitle)
    }
    //eslint-disable-next-line
  }, [])

  return (
    <Layout
      background="light-grey"
      title={view === "qr" && module?.title}
      subtitle={view === "qr" && pageSubtitle}
      seoTitle={view === "qr" && module?.seoTitle}
      display={{ footer: false, helpCenterBanner: false }}
    >
      {renderView()}
    </Layout>
  )
}

export default ScreeningView
