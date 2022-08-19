import React, { Fragment, useEffect, useContext } from "react"
import Img from "gatsby-image"
import classNames from "classnames"

import Layout from "layout"
import Container from "layout/Container"
import Message from "elements/Message"

import { AppContext } from "context/AppContext"
import styles from "./utils/registration.module.scss"
import { useRegistrationImages } from "./hooks/useRegistrationImages"

const Completed = (props) => {
  const { pageContext } = props
  const { module, content } = pageContext
  const data = useRegistrationImages()

  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    const restartDetails = async () => {
      await dispatch({ type: "RESET_DETAILS" })
    }
    restartDetails()
  }, [dispatch])

  return (
    <Layout
      title={module.title || "Thank you"}
      seoTitle={module.seoTitle}
      pageContext={pageContext}
      display={{ footer: false }}
    >
      <Container isCentered fullhd={6} desktop={6}>
        <div className={classNames("columns", styles["column"])}>
          {content.icon && (
            <div className="column is-4-desktop is-12-mobile">
              <figure className={classNames("image mx-3")}>
                <Img
                  fluid={data[content.icon].childImageSharp.fluid}
                  alt={`${module.name} Complete`}
                  className={styles["image"]}
                />
              </figure>
            </div>
          )}
          <div className="column content">
            <Fragment>
              <p className="subtitle">
                An email should be sent to your email address as a confirmation
                of your registration. You may now close this window.
              </p>
              <Message color="warning">
                <p>
                  In case you cannot find the email after 30 minutes, please
                  check your spam folder.
                </p>
              </Message>
            </Fragment>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default Completed
