import React, { useContext, useState, useEffect } from "react"
import classNames from "classnames"
import { navigate } from "gatsby"

import Layout from "layout"
import Container from "layout/Container"
import Card from "elements/Card"
import Section from "elements/Section"
import ActionButtons from "elements/ActionButtons"
import Message from "elements/Message"
import DocumentDetails from "elements/DocumentDetails"
import EditDetailsButton from "elements/EditDetailsButton"

import { createOrganizationDocument } from "./services/createOwnerDocument"

import { getFieldValue } from "services/summary"
import { parseFormField } from "services/airtable"
import { isBrowser } from "services/general"

import { hasRoles } from "auth/services/user"

import { AppContext } from "context/AppContext"

import styles from "layout/utils/layout.module.scss"

const Summary = ({ pageContext }) => {
  const { state, dispatch } = useContext(AppContext)
  const [hasSubmissionError, setHasSubmissionError] = useState(false)
  const { module, backPath } = pageContext
  const [loading, setLoading] = useState(false)

  let sectionSummaryFields = parseFormField(
    pageContext.summaryFields.map((formField) => ({
      ...formField,
      section: formField.summarySection,
    }))
  )

  sectionSummaryFields = sectionSummaryFields.sort(
    (firstSection, secondSection) => firstSection.order - secondSection.order
  )

  const handleSubmitRegistration = async () => {
    setLoading(true)
    await createOrganizationDocument({
      registrationData: { ...state.registration, documents: state.documents },
      callback: () => {
        navigate(pageContext.nextPath)
      },
      errorCallback: () => {
        setHasSubmissionError(true)
      },
    })
    setLoading(false)
  }

  useEffect(() => {
    if (isBrowser()) {
      dispatch({ type: "GET_CONTEXT_FROM_SESSION" })
      if (hasRoles()) navigate("/profile")
    }
  }, [dispatch])

  return (
    <Layout
      seoTitle={module?.title}
      pageContext={pageContext}
      title={module?.title}
    >
      <Container isCentered>
        <Card>
          {sectionSummaryFields.map((section) => {
            return (
              <Section
                title={section?.section}
                addOns={{
                  right: <EditDetailsButton route={section.link} />,
                }}
                isSectionRequired={section?.isSectionRequired}
              >
                <div className="table-container">
                  <table class="table is-fullwidth is-size-5">
                    <tbody>
                      {section.fields
                        .sort((firstField, secondField) => {
                          return firstField.order - secondField.order
                        })
                        .map((field) => {
                          let finalValue = getFieldValue(
                            state?.registration,
                            field
                          )

                          if (!!finalValue)
                            return (
                              <tr>
                                <td className="has-text-weight-bold">
                                  {field.label}
                                </td>
                                <td
                                  className={classNames(
                                    styles["summary__tableData"]
                                  )}
                                >
                                  {finalValue}
                                </td>
                              </tr>
                            )
                          return null
                        })}
                    </tbody>
                  </table>
                </div>
              </Section>
            )
          })}
          <DocumentDetails title="Uploaded Documents" sectionLink="" />
          {hasSubmissionError && (
            <Message color="danger">
              Something went wrong with completing your account. Please try
              again.
            </Message>
          )}
          <ActionButtons
            back={{ label: "Back", link: backPath }}
            next={{
              loading,
              label: module.cta,
              callback: handleSubmitRegistration,
            }}
          />
        </Card>
      </Container>
    </Layout>
  )
}

export default Summary
