import React, { useState, useContext, useEffect } from "react"
import moment from "moment"
import { navigate } from "gatsby"
import classNames from "classnames"
import { Formik, Form, FieldArray } from "formik"

import Card from "elements/Card"
import Message from "elements/Message"
import Loading from "elements/Loading"
import Container from "layout/Container"
import FormInput from "elements/Form/FormInput"
import ActionButtons from "elements/ActionButtons"
import DashboardLayout from "layout/DashboardLayout"

import styles from "./utils/sendInvite.module.scss"
import { sendInvites } from "./services/sendInvites"
import { getSignedInUser } from "auth/services/user"
import { sendInviteValidation } from "./services/sendInviteValidation"
import { handlePasteRows, handleKeyUp } from "./services/eventListeners"
import { calculateRemainingDoses } from "./services/calculateRemainingDoses"
import { BookingContext } from "../context/BookingContext"

import { isObjectEmpty } from "services/general"

const SendInvites = ({ pageContext }) => {
  const { state } = useContext(BookingContext)
  const [loading, setLoading] = useState(false)
  const [remainingDoses, setRemainingDoses] = useState(0)
  const [isFetchingRemainingDoses, setIsFetchingRemainingDoses] = useState(true)

  const [errorMessage, setErrorMessage] = useState("")

  let { bookingsData, userData, organization } = getSignedInUser()
  let { module, backPath, nextPath } = pageContext

  let selectedBooking = {}
  if (userData) {
    if (!isObjectEmpty(state.activeBooking)) {
      selectedBooking = bookingsData.find(
        (booking) => booking?.id === state.activeBooking.bookingId
      )
    } else selectedBooking = bookingsData[bookingsData?.length - 1]
  }

  const fetchRemainingDoses = async () => {
    let results = await calculateRemainingDoses({
      selectedBooking,
      // remove this once all bookings have invite field
      updateInvitesField: true,
      bookingsData,
    })
    setRemainingDoses(results)
    setIsFetchingRemainingDoses(false)
  }

  useEffect(() => {
    fetchRemainingDoses()
    //eslint-disable-next-line
  }, [])

  let dosesToServe = remainingDoses
  let emailSlots = Array.from({ length: dosesToServe }, () => "")

  const handleDisableSendInvite = (values) => {
    let emailList = values?.emails?.filter((email) => !!email)

    let vaccinationDate =
      typeof selectedBooking?.startDate === "string"
        ? new Date(selectedBooking?.startDate)
        : new Date(selectedBooking?.startDate?.seconds * 1000)

    return (
      moment(moment()).isAfter(vaccinationDate) ||
      dosesToServe === 0 ||
      emailList.length === 0
    )
  }

  const handleSendEmailInvites = (values) => {
    let emailList = values?.emails?.filter((email) => !!email)

    if (emailList.length) {
      setLoading(true)
      sendInvites({
        values,
        bookingsData: selectedBooking,
        organization,
        callback: () => {
          navigate(nextPath)
          setLoading(false)
        },
        errorCallback: () => {
          setLoading(false)
        },
      })
    }
  }

  const preventFormikSubmit = (keyEvent) => {
    // make key codes variable COSNT. Place on utils
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault()
    }
  }

  return (
    <DashboardLayout seoTitle={module?.seoTitle} title={module?.title}>
      <Container isCentered>
        <Card>
          <Formik
            enableReinitialize
            onSubmit={handleSendEmailInvites}
            initialValues={{ emails: emailSlots }}
            validationSchema={sendInviteValidation({ dosesToServe })}
          >
            {({ values, setFieldValue }) => (
              <Form onKeyDown={preventFormikSubmit}>
                <Message color="info">
                  <p>
                    You may either individually enter vaccinees’ email address
                    or copy-paste email addresses from a spreadsheet or
                    document.
                  </p>

                  <p>
                    If some of your vaccinees are not yet confirmed, or you do
                    not have their email addresses at the moment, you may leave
                    their slots blank. You will be able to add their email
                    addresses at a later time as long as you do so before the
                    vaccination event commences.
                  </p>

                  <p>
                    After sending them invites, they will receive an email
                    prompting them to complete their registration by filling out
                    a form.
                  </p>

                  <p>
                    Completion of the form is required by the government and
                    will make the vaccination experience at the venue smoother.
                    Vaccinees who do not complete the form will not be able to
                    proceed with vaccination.
                  </p>
                </Message>
                {isFetchingRemainingDoses && (
                  <div className="my-2">
                    <Loading size="5" isFullscreen={false} />
                    <p className="has-text-grey has-text-centered">
                      Loading available slots.
                    </p>
                  </div>
                )}
                {!isFetchingRemainingDoses && !dosesToServe && (
                  <Message color="danger">
                    <p>
                      You have used up all slots for this booking. If you need
                      more slots, please create a new booking or free up slots
                      by canceling one or more of your current vaccinees.
                    </p>
                  </Message>
                )}
                {dosesToServe !== 0 && (
                  <p>
                    Please provide a list of emails to invite. You may invite up
                    to <b>{dosesToServe} individuals</b>.
                  </p>
                )}
                <FieldArray name={"emails"}>
                  {() =>
                    values?.emails?.map((input, index) => (
                      <div className="is-flex is-align-items-center">
                        <span
                          className={classNames(
                            "mb-1 mr-1 has-text-right",
                            styles["number"]
                          )}
                        >
                          {index + 1}
                        </span>
                        <div className="is-flex-grow-1">
                          <FormInput
                            isRequired
                            type="email"
                            name={`emails[${index}]`}
                            autocomplete="off"
                            placeholder={"name@email.com"}
                            onKeyDown={(event) => {
                              handleKeyUp({
                                event,
                                index,
                                values,
                                dosesToServe,
                                setFieldValue,
                                setErrorMessage,
                                name: "emails",
                              })
                            }}
                            onPaste={(event) => {
                              handlePasteRows({
                                event,
                                index,
                                values,
                                setFieldValue,
                                dosesToServe,
                                setErrorMessage,
                                name: "emails",
                              })
                            }}
                          />
                        </div>
                      </div>
                    ))
                  }
                </FieldArray>
                {errorMessage && (
                  <Message color="danger">
                    <p>{errorMessage}</p>
                  </Message>
                )}
                <div className="mt-2">
                  <ActionButtons
                    back={{
                      label: dosesToServe !== 0 ? "Invite Later" : "Back",
                      link: backPath,
                    }}
                    submit={{
                      loading,
                      label: "Send Invites",
                      disabled: handleDisableSendInvite(values),
                    }}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </DashboardLayout>
  )
}

export default SendInvites
