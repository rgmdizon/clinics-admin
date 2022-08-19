import React from "react"
import Img from "gatsby-image"
import { navigate } from "gatsby"
import classNames from "classnames"

import DashboardLayout from "layout/DashboardLayout"
import Container from "layout/Container"

import Button from "elements/Button"

import styles from "./utils/booking.module.scss"
import { useBookingImages } from "./hooks/useBookingImages"

import { GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL } from "gatsby-env-variables"

const AllocationsConsumed = ({ pageContext }) => {
  const images = useBookingImages()

  const { backPath, module } = pageContext

  return (
    <DashboardLayout
      seoTitle={module?.allocations?.seoTitle || module?.seoTitle}
    >
      <Container isCentered>
        <div className={classNames(styles["bookingComplete__error"])}>
          <center className="mt-4 mb-3">
            <Img fixed={images?.error?.childImageSharp?.fixed} />
            <h3 className="has-text-centered mb-0 has-text-primary mx-2-mobile is-size-3-mobile pb-1">
              Please check your allocations.
            </h3>
            <p className="subtitle">
              You may not book events because you currently don't have
              allocations left. <br />
              Please contact MedGrocer at{" "}
              <a
                href={`mailto:${GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {GATSBY_ORGANIZATION_SUPPORT_MAILTO_EMAIL}.
              </a>{" "}
            </p>
            <Button
              color="primary"
              onClick={() => {
                navigate(backPath)
              }}
            >
              {module.allocations?.cta || module?.cta}
            </Button>
          </center>
        </div>
      </Container>
    </DashboardLayout>
  )
}

export default AllocationsConsumed
