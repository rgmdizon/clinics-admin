import React, { useContext } from "react"

import Message from "elements/Message"
import Section from "elements/Section"
import EditDetailsButton from "elements/EditDetailsButton"
import FileThumbnail from "elements/UploadDocumentDropzone/FileThumbnail"

import { AppContext } from "context/AppContext"

const DocumentDetails = ({ title, sectionLink }) => {
  const { state } = useContext(AppContext)

  if (state?.documents?.length > 0)
    return (
      <Section
        isRequired
        title={title}
        addOns={{
          right: <EditDetailsButton route={sectionLink} />,
        }}
      >
        <div className="px-1 mx-1">
          <div className="columns is-vcentered is-multiline">
            {state?.documents.map((document) => (
              <div className="column is-6">
                <FileThumbnail file={document} hasFileName />
              </div>
            ))}
          </div>
        </div>
      </Section>
    )
  return (
    <Message color="warning">
      <p className="has-text-black is-size-6">
        You have not uploaded any documents.
      </p>
    </Message>
  )
}

export default DocumentDetails
