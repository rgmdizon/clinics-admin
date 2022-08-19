import React, { useEffect, useState, Fragment } from "react"
import { Formik, Form } from "formik"
import classNames from "classnames"

import Message from "elements/Message"
import ScreeningAnswers from "./components/ScreeningAnswers"
import VaccineeDetailsLoading from "./VaccineeDetailsLoading"
import ScreeningCountdown from "./components/ScreeningCountdown"
import ScreeningCardHeader from "./components/ScreeningCardHeader"
import ScreeningPersonalDetails from "./components/ScreeningPersonalDetails"
import FormRequiredFieldsErrorMessage from "elements/Form/FormRequiredFieldsErrorMessage"

import { isObjectEmpty } from "services/general"
import { generateInitialValues } from "services/context"
import { parseFormValues } from "./utils/parseFormValues"
import { getVaccineeDetails } from "./services/getVaccineeDetails"
import { useScreeningFormFields } from "./hooks/useScreeningFormFields"
import { handleDoctorAssessment } from "./services/handleDoctorAssessment"

import styles from "./utils/screening.module.scss"

const VaccineeScreening = ({
  setView,
  formFields,
  vaccineeUid,
  enrollmentCode,
  handleQRScanError,
}) => {
  const [loading, setLoading] = useState(false)
  const [vaccinee, setVaccinee] = useState({})
  const [screeningView, setScreeningView] = useState("form")
  const [hasMissingField, setHasMissingField] = useState({})
  const [displayedMissingFields, setDisplayedMissingFields] = useState(false)
  const [isLoadingVaccineeDetails, setIsLoadingVaccineeDetails] = useState(true)

  let filteredFormFields = formFields.filter(
    (field) =>
      field.subModule === "Personal Details" && field.subdomain === "Corporate Vax" &&
      (field.module === "Vaccinee Registration" ||
        field.module === "Screening Form" ||
        field.module === "Doctor Assessment")
  )

  if (vaccinee.vaccineeType !== "Pediatric") {
    filteredFormFields = filteredFormFields
      .filter((field) => field.section !== "Parent or Guardian Information")
      .filter((field) => field.alternateOption !== "Pediatric")
  } else {
    filteredFormFields = filteredFormFields.filter(
      (field) => field.alternateOption !== "Adult"
    )
  }

  let { sectionFormFields, validationSchema } = useScreeningFormFields({
    formFields: filteredFormFields,
  })

  let initialValues = {
    ...generateInitialValues({ fields: filteredFormFields }),
    ...vaccinee,
    ...parseFormValues({ vaccineeDocument: vaccinee }),
  }

  const handleSubmitScreening = (values) => {
    setLoading(true)
    handleDoctorAssessment({
      values,
      callback: () => {
        setScreeningView("complete")
        setLoading(false)
      },
      errorCallback: () => {
        setLoading(false)
      },
    })
  }

  const getDetails = async () => {
    let vaccineeDetails = await getVaccineeDetails({
      vaccineeUid,
      enrollmentCode,
      errorCallback: handleQRScanError,
    })
    setIsLoadingVaccineeDetails(false)

    setVaccinee(vaccineeDetails)
  }

  useEffect(() => {
    getDetails()
    //eslint-disable-next-line
  }, [])

  let isAlreadyAssessed = vaccinee?.doctorAssessment

  // Set errors
  const isFieldsComplete = (errors) => {
    if (!isObjectEmpty(errors) && !displayedMissingFields) {
      let formErrors = []
      let errorKeys = Object.keys(errors).filter(
        (error) => !["doctorAssessment", "deferralReason"].includes(error)
      )
      if (errorKeys?.length > 0)
        formErrors = errorKeys.map((key) => {
          key = key.replace(/([A-Z])/g, " $1")
          return key.charAt(0).toUpperCase() + key.slice(1)
        })

      setHasMissingField(formErrors)
      setDisplayedMissingFields(true)
    }
  }

  return (
    <Fragment>
      {isLoadingVaccineeDetails ? (
        <VaccineeDetailsLoading />
      ) : (
        <div
          className={classNames("mt-5 card p-2", styles["screeningDetails"])}
        >
          {screeningView === "form" ? (
            initialValues?.id && (
              <Formik
                validateOnMount={true}
                initialValues={initialValues}
                onSubmit={handleSubmitScreening}
                validationSchema={validationSchema}
              >
                {({ values, errors, submitCount, setFieldValue }) => {
                  isFieldsComplete(errors)

                  return (
                    <Form>
                      <ScreeningCardHeader vaccinee={vaccinee} />
                      <div className="columns">
                        <div
                          className={classNames(
                            "column is-one-third",
                            styles["screeningDetails__details"]
                          )}
                        >
                          <ScreeningPersonalDetails
                            values={values}
                            sectionFormFields={sectionFormFields}
                          />
                        </div>
                        {hasMissingField?.length > 0 ? (
                          <div className="column px-2">
                            <Message color="danger">
                              <div className="content">
                                <p>
                                  The following required fields are missing:
                                </p>
                                <ul className="is-size-6">
                                  {hasMissingField?.map((error) => (
                                    <li className="pb-0">{error}</li>
                                  ))}
                                </ul>
                                <p>
                                  Please ask the vaccinee to proceed to help
                                  desk for assistance.
                                </p>
                              </div>
                            </Message>
                          </div>
                        ) : (
                          <div className={classNames("column px-2")}>
                            {isAlreadyAssessed ? (
                              <Message>
                                This vaccinee is already assessed.
                              </Message>
                            ) : (
                              <ScreeningAnswers
                                values={values}
                                errors={errors}
                                setView={setView}
                                loading={loading}
                                submitCount={submitCount}
                                setFieldValue={setFieldValue}
                                sectionFormFields={sectionFormFields}
                              />
                            )}
                            <FormRequiredFieldsErrorMessage />
                          </div>
                        )}
                      </div>
                    </Form>
                  )
                }}
              </Formik>
            )
          ) : (
            <ScreeningCountdown setView={setView} />
          )}
        </div>
      )}
    </Fragment>
  )
}

export default VaccineeScreening