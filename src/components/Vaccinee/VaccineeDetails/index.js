import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Doses from "./Doses"
import PersonalDetails from "./PersonalDetails"
import DashboardLayout from "layout/DashboardLayout"

import { isBrowser } from "services/general"
import { getVaccinee } from "../services/getVaccinee"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const VaccineeDetails = ({ pageContext, location }) => {
  const { module, backPath, formFields } = pageContext
  const [vaccineeDetail, setVaccineeDetail] = useState({})

  let urlParameter = ""
  let vaccineeId = ""
  if (isBrowser()) {
    urlParameter = new URLSearchParams(window.location.search)
    vaccineeId = urlParameter?.get("id")
  }

  const getVaccineeDetails = async () => {
    let vaccineeDetails = await getVaccinee({ id: vaccineeId })

    setVaccineeDetail(vaccineeDetails)
  }

  useEffect(() => {
    getVaccineeDetails()
    //eslint-disable-next-line
  }, [])

  return (
    <DashboardLayout
      title={`${vaccineeDetail?.firstName} ${vaccineeDetail?.lastName}`}
      subtitle={module?.subtitle}
      seoTitle={module?.seoTitle}
      display={{ footer: false, helpCenterBanner: false }}
    >
      <section className="header mb-2 is-flex is-justify-content-space-between">
        <Link to={backPath} className="button is-primary">
          <FontAwesomeIcon icon={faArrowLeft} />{" "}
          <span className="is-inline-block ml-1">Back</span>
        </Link>
      </section>
      <div className="columns">
        <div className="column is-half">
          <PersonalDetails
            vaccineeDetails={vaccineeDetail}
            formFields={formFields}
          />
        </div>
        <div className="column is-half">
          <Doses formFields={formFields} />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default VaccineeDetails
