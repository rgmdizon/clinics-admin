import React, { useContext } from "react"
import Img from "gatsby-image"
import classNames from "classnames"

import Layout from "layout"
import Container from "layout/Container"

import styles from "./utils/registration.module.scss"
import { VaccineeContext } from "../context/VaccineeContext"
import { useRegistrationImages } from "./hooks/useRegistrationImages"

const RegistrationInvalid = () => {
  const { vaccineeState } = useContext(VaccineeContext)
  const images = useRegistrationImages()

  let invalidityReason = ""
  switch (vaccineeState?.invalidityReason) {
    case "date passed":
      invalidityReason =
        "It looks like the vaccination date for this registration has passed."
      break
    case "claimed":
    default:
      invalidityReason =
        "It looks like this registration link has been claimed."
      break
  }

  return (
    <Layout>
      <Container isCentered>
        <div className={classNames(styles["registrationComplete__error"])}>
          <center className="mt-4 mb-3">
            <Img fixed={images?.error?.childImageSharp?.fixed} />
            <h3 className="has-text-centered mb-0 has-text-primary mx-2-mobile is-size-3-mobile pb-1">
              Link Expired
            </h3>
            <p className="subtitle">
              {invalidityReason} <br />
              Please contact your representative or HR for more information.
            </p>
          </center>
        </div>
      </Container>
    </Layout>
  )
}

export default RegistrationInvalid
