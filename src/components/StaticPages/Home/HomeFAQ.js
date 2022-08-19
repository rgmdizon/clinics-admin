import React from "react"

import Hero from "layout/Hero"
import Container from "layout/Container"
import Collapsible from "elements/Collapsible"

import homeFAQ from "../utils/homeFAQ.json"

const HomeFAQ = () => {
  return (
    <Hero size="medium">
      <Container isCentered={true}>
        <h1 className="title has-text-primary has-text-centered">FAQs</h1>
        {homeFAQ.map((faq) => (
          <Collapsible title={faq.question}>
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </Collapsible>
        ))}
      </Container>
    </Hero>
  )
}

export default HomeFAQ
