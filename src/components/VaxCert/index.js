import React from "react"

import Layout from "layout"
import Section from "elements/Section"
import Container from "layout/Container"
import Message from "elements/Message"

import { GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL } from "gatsby-env-variables"

const VaxCert = ({ pageContext }) => {
  const { vaxCertSteps } = pageContext

  return (
    <Layout title="VaxCertPH Records Request">
      <Container isCentered>
        <Message color="info">
          <p className="is-size-6">
            The DOH (Department of Health) is using VaxCertPH as the main source
            of vaccination certification aside from your physical vaccination
            card. Starting February 28, 2022, MedGrocer’s digital vaccination
            record will no longer be available. If you can't find your records
            or if you need to make any changes, you may{" "}
            <b>call DOH at 88-7614-88</b> or follow the Follow the steps in the
            attached document. For other matters, you may contact us at{" "}
            <a
              href={`mailto:${GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="has-text-weight-bold"
            >
              {GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL}
            </a>
            .
          </p>
        </Message>
        <div className="mt-5">
          {vaxCertSteps?.map((step, index) => (
            <Section addOns={{ left: index + 1 }} title={step?.step}>
              <img
                alt="vax cert step"
                src={
                  step?.screenshot?.localFiles?.[0]?.childImageSharp?.fluid
                    ?.originalImg
                }
              />
            </Section>
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export default VaxCert
