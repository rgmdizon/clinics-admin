import React from "react"
import Card from "elements/Card"
import CollapsibleCard from "elements/CollapsibleCard"
import Message from "elements/Message"
import Section from "elements/Section"

const Requirements = ({ formFields }) => {
  const sampleJSON = [
    "Update Organization Details",
    "Upload BIR",
    "Upload Representative ID",
  ]

  return (
    <Card>
      <Section title="Requirements">
        <Message color="warning">
          All requirements must be completed to be able to book vaccination
          events.
        </Message>
        {sampleJSON.map((title) => {
          return <CollapsibleCard title={title} />
        })}
      </Section>
    </Card>
  )
}

export default Requirements
