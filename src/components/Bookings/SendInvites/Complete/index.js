import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

import Card from "elements/Card"
import Message from "elements/Message"
import Container from "layout/Container"
import ActionButtons from "elements/ActionButtons"
import DashboardLayout from "layout/DashboardLayout"

const SendInvites = ({ pageContext }) => {
  let { module, nextPath } = pageContext

  const data = useStaticQuery(graphql`
    {
      emailSent: file(relativePath: { eq: "icons/send_email.png" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const emailSent = data.emailSent.childImageSharp.fixed

  return (
    <DashboardLayout seoTitle={module?.seoTitle} title={module?.title}>
      <Container isCentered>
        <Card>
          <div className="has-text-centered mb-2">
            <Img fixed={emailSent} />
          </div>
          <Message color="info" className="mb-2">
            <p>Please wait a few minutes for all the invites to be sent.</p>
            <p>
              You may check the Bookings page for you vaccinees' registration
              status. They will be marked{" "}
              <span className="tag is-primary">Invited</span> once the invites
              have been sent and{" "}
              <span className="tag is-primary">Registered</span> after the
              vaccinee have completed the registration form. Please ensure your
              vaccinees are all marked Registered prior to the event day.
            </p>
          </Message>
          <ActionButtons
            next={{
              link: nextPath,
              label: "View Bookings",
            }}
          />
        </Card>
      </Container>
    </DashboardLayout>
  )
}

export default SendInvites
