import React from "react"
import { navigate } from "gatsby"

import Layout from "layout"
import HomeBanner from "components/StaticPages/Home/HomeBanner"
import HomeFlu from "./HomeFlu"
import HomeFAQ from "./HomeFAQ"

const IndexPage = ({ pageContext, location }) => {
  if (location?.href?.toLowerCase()?.includes("covid")) navigate("/sign-in")

  return (
    <Layout seoTitle="Home">
      <HomeBanner pageContext={pageContext} />
      <HomeFlu />
      <HomeFAQ />
    </Layout>
  )
}

export default IndexPage
