import React, { Fragment, useContext, useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import classNames from "classnames"
import { navigate } from "gatsby"

import Layout from "layout"
import Container from "layout/Container"
import RegistrationQR from "./RegistrationQR"
import ActionButtons from "elements/ActionButtons"
import { PDFDownloadLink } from '@react-pdf/renderer';

import styles from "./utils/registration.module.scss"
import { VaccineeContext } from "../context/VaccineeContext"
import { handleSubmitRegistration } from "./services/booking"
import { checkRequiredData } from "./utils/checkRequiredData"

const Completed = (props) => {
  const [QRCodeSource, setQRCodeSource] = useState(null);

  const getQRCodeSource = async () => {
    setQRCodeSource(document?.getElementById("QRCode"))
  }

  useEffect(() => {
    getQRCodeSource()
  })

  const { pageContext, location } = props
  const { module, progress, numberOfPages, requiredData } = pageContext
  const { vaccineeDispatch } = useContext(VaccineeContext)
  
  let vaccineeState = location?.state

  let { personalDetails, code, schedules, vaccineeUid } = vaccineeState || {
    personalDetails: {},
    code: {},
    schedules: {},
    vaccineeUid: ""
  }

  let { birthday, firstName, lastName, employeeEmail } = personalDetails || {
    birthday: {},
    firstName: "",
    lastName: "",
    employeeEmail: ""
  }

  let QRCodeContent = `vax-develop-3da6f.web.app/vaccinee/?id=${vaccineeUid}&email=${employeeEmail}`
  let lastNameCode = lastName?.slice(0, 3)
  let companyCode = code?.organization?.code
  let birthYearCode = birthday?.year?.value.toString().slice(2)
  let birthDateCode = String(birthday?.date?.value.toString()).padStart(2, "0")

  let vaccineeCode = `${companyCode} ${lastNameCode} ${birthDateCode}${birthYearCode}`
  vaccineeCode = vaccineeCode?.toUpperCase()

  const handleCompleteRegistration = () => {
    handleSubmitRegistration({ payload: vaccineeState })
    navigate("/")
  }

  useEffect(() => {
    vaccineeDispatch({ type: "RESET_DETAILS" })
    vaccineeDispatch({ type: "REMOVE_CONTEXT_FROM_SESSION" })

    if (
      requiredData &&
      !checkRequiredData({
        data: location?.state || {},
        required: requiredData,
      })
    )
      navigate("/")

    //eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <div className={classNames(styles["registrationQrCodeLayout"])}>
        <Layout
          progress={(progress / numberOfPages) * 100}
          title={module.title || "Thank you"}
          seoTitle={module.seoTitle}
          pageContext={pageContext}
          display={{ footer: false }}
        >
          <Container isCentered fullhd={6} desktop={6}>
            <div className="mb-5">
              <p className="has-text-centered subtitle">
                We will send a confirmation email along with your responses and
                informed consent. Please print and present this QR code when you
                visit <b>{schedules?.venue?.value}</b>.
              </p>
              <div className="mt-3">
                <div className="columns is-vcentered is-desktop">
                  <div id="QRCode" className="column has-right-left-desktop has-text-centered">
                    <QRCodeSVG
                      value={QRCodeContent}
                      size={300}
                    />
                  </div>
                  <div className="column has-text-left-desktop has-text-centered">
                    <h2 className="title has-text-primary mt-0 mb-1 is-2">
                      {vaccineeCode}
                    </h2>
                    <h2 className="title mt-0 is-2">
                      {firstName} {lastName}
                    </h2>
                    <p className="is-size-5">
                      {schedules?.scheduleTime?.value}
                    </p>
                    <p className="is-size-5">{schedules?.venue?.value}</p>
                  </div>
                </div>
              </div>
            </div>
            <PDFDownloadLink document={<RegistrationQR vaccineeState={vaccineeState} QRCodeValue={QRCodeSource}/>} fileName="Informed Consent">
              {({loading}) => (loading ? 
              <ActionButtons
              next={{
                callback: handleCompleteRegistration,
                label: "Document Loading",
              }}
            />
              : 
              <ActionButtons
              next={{
                callback: handleCompleteRegistration,
                label: "Print and Complete",
              }}
            />
              )}
            </PDFDownloadLink>
          </Container>
        </Layout>
      </div>
    </Fragment>
  )
}

export default Completed
