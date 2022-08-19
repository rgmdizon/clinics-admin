import React, { Fragment } from "react"
import classNames from "classnames"
import { navigate } from "gatsby"

import Layout from "layout"
import Container from "layout/Container"
import InformedConsent from "./InformedConsent"
import ActionButtons from "elements/ActionButtons"

import styles from "./utils/registration.module.scss"

const RegistrationInformedConsent = ({ pageContext }) => {
  const { module, backPath, nextPath, progress, numberOfPages } = pageContext

  const handleComplete = () => {
    window.print()
    navigate(nextPath)
  }

  return (
    <Fragment>
      <div className={classNames(styles["informedConsentLayout"])}>
        <Layout
          title={module?.title}
          subtitle={module?.subTitle}
          seoTitle={module?.seoTitle}
          progress={(progress / numberOfPages) * 100}
        >
          <Container isCentered fullhd={9}>
            <div className="box mb-5 p-3">
              <InformedConsent />
            </div>
            <ActionButtons
              back={{
                link: backPath,
                label: "Back",
              }}
              next={{
                callback: handleComplete,
                label: "Print & Proceed",
              }}
            />
          </Container>
        </Layout>
      </div>
      <div className={classNames(styles["informedConsentDocument"])}>
        <InformedConsent />
      </div>
    </Fragment>
  )
}

export default RegistrationInformedConsent
