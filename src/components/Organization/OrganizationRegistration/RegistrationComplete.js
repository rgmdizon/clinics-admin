import React, { Fragment, useEffect, useContext } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import classNames from "classnames"

import Layout from "layout"
import Container from "layout/Container"

import { useRegistrationCompleteImages } from "./hooks/useRegistrationCompleteImages"
import { AppContext } from "context/AppContext"

const Completed = (props) => {
  const { pageContext } = props
  const { module, content, nextPath } = pageContext
  const data = useRegistrationCompleteImages()

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
    >
      <Container isCentered>
        <div className={classNames("columns")}>
          {content.icon && (
            <div className="column is-4-desktop is-12-mobile">
              <figure className={classNames("image mx-3")}>
                <Img
                  fluid={data[content.icon].childImageSharp.fluid}
                  alt={`${module.name} Complete`}
                />
              </figure>
            </div>
          )}
          <div className="column">
            <Fragment>
              <p className="my-1 mb-2">
                Thank you for signing up for MedGrocer's COVID-19 Vaccination
                Program. Please check your email and review the contract.
              </p>
              <p className="my-1 mb-1">
                Your organization's account will be processed once the contract
                has been signed
              </p>
            </Fragment>
          </div>
        </div>
        <center>
          <Link to={nextPath} className="mt-2 button is-primary is-medium">
            Finish
          </Link>
        </center>
      </Container>
    </Layout>
  )
}

export default Completed
