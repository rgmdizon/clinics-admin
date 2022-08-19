import React, { Fragment, useContext, useState, useEffect } from "react"
import classNames from "classnames"
import { navigate } from "gatsby"

import Layout from "layout"
import Section from "elements/Section"
import Message from "elements/Message"
import Container from "layout/Container"
import ActionButtons from "elements/ActionButtons"

import { VaccineeContext } from "../../context/VaccineeContext"
import { useRegistrationFormFields } from "../hooks/useRegistrationFormFields"
import { sendVaccinationRegistration } from "../services/sendVaccinationRegistration"
import { getContextFromSession } from "services/context"
import { checkRequiredData } from "../utils/checkRequiredData"

import styles from "../utils/registration.module.scss"

const RegistrationSummary = ({ pageContext }) => {
  const { vaccineeState, vaccineeDispatch } = useContext(VaccineeContext)
  const [loading, setLoading] = useState(false)

  const SHOW_PAYMENT =
    vaccineeState?.code?.code?.paymentArrangement
      ?.toLowerCase()
      ?.localeCompare("company-paid") !== 0

  const {
    module,
    backPath,
    nextPath,
    formFields,
    progress,
    numberOfPages,
    requiredData,
  } = pageContext

  let { personalDetails, schedules, vaccines } = vaccineeState || {}

  let { sectionFormFields } = useRegistrationFormFields({
    formFields,
  })

  useEffect(() => {
    let sessionState = getContextFromSession()
    vaccineeDispatch({ type: "SAVE_WHOLE_STATE", payload: sessionState })
    if (
      requiredData &&
      !checkRequiredData({ data: sessionState, required: requiredData })
    )
      navigate("/")

    //eslint-disable-next-line
  }, [])

  const handleSendRegistration = () => {
    setLoading(true)
    sendVaccinationRegistration({
      vaccineeState,
      callback: (vaccineeDocumentId) => {
        setLoading(false)
        vaccineeDispatch({
          type: "SAVE_VACCINEE_DOC_ID",
          payload: vaccineeDocumentId,
        })
        navigate(nextPath, { state: {...vaccineeState, ...{vaccineeUid: vaccineeDocumentId}} })
      },
    })
  }

  return (
    <Layout
      title={module?.title}
      subtitle={module?.subTitle}
      seoTitle={module?.seoTitle}
      progress={(progress / numberOfPages) * 100}
    >
      <Container isCentered fullhd={6}>
        {sectionFormFields
          ?.sort((a, b) => a?.order - b?.order)
          ?.map((section) => (
            <Fragment>
              <Section
                title={section?.section}
                subtitle={section?.subtitle || ""}
                id={section?.sectionId || ""}
              >
                <table class="table is-fullwidth is-size-5">
                  <tbody className={classNames("body")}>
                    {section?.fields.map((field) => (
                      <tr>
                        <td className="has-text-weight-bold">{field?.label}</td>
                        <td
                          className={classNames(
                            styles["summary__tableSummaryData"]
                          )}
                        >
                          {field?.name === "birthday"
                            ? `${
                                personalDetails?.[field?.name]?.month?.value
                              } ${
                                personalDetails?.[field?.name]?.date?.value
                              }, ${personalDetails?.[field?.name]?.year?.value}`
                            : personalDetails?.[field?.name] || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Section>
            </Fragment>
          ))}
        <Section title="Vaccines and Services">
          {vaccines?.map((vaccine) => (
            <Fragment>
              <div className="is-flex px-1 is-justify-content-space-between is-align-items-end mb-2">
                <div>
                  <h4 className="title mt-0 is-4">
                    {vaccine?.type} vaccine, {vaccine?.quantity}x
                  </h4>
                  <p className="subtitle">
                    {vaccine?.brand},{" "}
                    <span>
                      ordering for {vaccine?.orderingFor?.toLowerCase()}
                    </span>
                  </p>
                </div>
                {SHOW_PAYMENT && (
                  <div className="has-text-right">
                    <p className="is-size-5">
                      <span className="has-text-weight-bold">
                        Php {parseFloat(vaccine?.totalPrice).toFixed(2)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </Fragment>
          ))}
        </Section>
        <Section title="Vaccination and Schedule">
          <table class="table is-fullwidth is-size-5">
            <tbody className={classNames("body")}>
              <tr>
                <td className="has-text-weight-bold">Venue</td>
                <td className={classNames(styles["summary__tableSummaryData"])}>
                  {schedules?.venue?.label}
                </td>
              </tr>
              <tr>
                <td className="has-text-weight-bold">Date and time</td>
                <td className={classNames(styles["summary__tableSummaryData"])}>
                  {schedules?.scheduleTime?.label}
                </td>
              </tr>
            </tbody>
          </table>
        </Section>
        <Message color="warning">
          <p className="has-text-black">
            Vaccination schedules are final after the chosen date and time have
            been confirmed on booking
          </p>
        </Message>
        <ActionButtons
          back={{ link: backPath, label: "Back" }}
          next={{ loading, callback: handleSendRegistration, label: "Submit" }}
        />
      </Container>
    </Layout>
  )
}

export default RegistrationSummary
