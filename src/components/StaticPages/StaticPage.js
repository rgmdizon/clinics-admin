import React, { Fragment } from "react"

import Layout from "layout"
import Container from "layout/Container"
import Collapsible from "elements/Collapsible"
import ContactUs from "./HelpCenter/ContactUs"
import LimitationOfLiability from "./TermsAndConditions/LimitationOfLiability"

const StaticPage = (props) => {
  const { pageContent, module } = props.pageContext
  const hasContactUs = module.title === "Help Center"
  const hasLimitationOfLiability =
    module.title === "Terms and Conditions" && module.name === "mind"

  return (
    <Layout
      seoTitle={module.seoTitle}
      display={{ helpCenterBanner: false, footer: true }}
    >
      <Container isCentered>
        <h2>{module.title}</h2>
        <hr />
        {pageContent?.[0]?.body && (
          <div
            className="mb-2 content"
            dangerouslySetInnerHTML={{
              __html: pageContent?.[0]?.body.childMarkdownRemark.html.replace(
                /\n/g,
                "<br />"
              ),
            }}
          />
        )}
        {pageContent.map((content) => {
          const currentSection = pageContent.find(
            (sectionContent) => sectionContent.section === content?.section
          )
          const isFirstInSection =
            content?.answer?.childMarkdownRemark?.html ===
            currentSection?.answer?.childMarkdownRemark?.html
          if (content?.question && content?.answer)
            return (
              <Fragment>
                {isFirstInSection && <h4>{content.section}</h4>}
                <Collapsible title={content.question}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: content.answer.childMarkdownRemark.html.replace(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  ></p>
                </Collapsible>
              </Fragment>
            )
          return null
        })}
        {hasContactUs && <ContactUs module={module} />}
        {hasLimitationOfLiability && <LimitationOfLiability />}
      </Container>
    </Layout>
  )
}

export default StaticPage
