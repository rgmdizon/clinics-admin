import React from "react"
import DashboardLayout from "../Layout/DashboardLayout"

import OrganizationProfile from "./OrganizationProfile"
import Allocations from "./OrganizationProfile/Allocations"
import { getSignedInUser } from "components/Auth/services/user"

const Organization = (props) => {
  const { pageContext } = props

  const { organization } = getSignedInUser()

  return (
    <DashboardLayout
      // title={pageContext?.module?.title}
      subtitle={pageContext?.module?.subtitle}
      seoTitle={pageContext?.module?.seoTitle}
      display={{ footer: false, helpCenterBanner: false }}
    >
      <div className="columns">
        <div className="column">
          <OrganizationProfile pageContext={pageContext} />
        </div>
        {organization?.allocations && organization.allocationRequired ? (
          <div className="column is-half">
            <Allocations />
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  )
}

export default Organization
