import React from "react"

import Card from "elements/Card"
import Message from "elements/Message"
import Section from "elements/Section"

const Doses = () => {
  return (
    <Card>
      <Section title="First Dose">
        <Message title="warning">
          This vaccinee haven’t had their first dose yet.
        </Message>
      </Section>
      <Section title="Second Dose">
        <Message title="warning">
          This vaccinee haven’t had their second dose yet.
        </Message>
      </Section>
    </Card>
  )
}

export default Doses
