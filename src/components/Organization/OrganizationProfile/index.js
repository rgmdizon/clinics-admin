import React, { useState } from "react"

import ProfileInfo from "./ProfileInfo"
import Card from "elements/Card"
import UpdateOrganizationForm from "./UpdateOrganizationForm"
import UpdatePassword from "./UpdatePassword"

const Profile = ({ pageContext }) => {
  const [view, setView] = useState("view")

  const handleEditProfile = () => {
    setView("editProfile")
  }
  const handleUpdatePassword = () => {
    setView("updatePassword")
  }
  const handleBackClick = () => {
    setView("view")
  }

  const renderProfileView = () => {
    switch (view) {
      case "editProfile":
        return (
          <UpdateOrganizationForm
            pageContext={pageContext}
            handleBackClick={handleBackClick}
          />
        )

      case "updatePassword":
        return (
          <UpdatePassword
            pageContext={pageContext}
            handleBackClick={handleBackClick}
          />
        )

      case "view":
      default:
        return (
          <ProfileInfo
            handleEditProfile={handleEditProfile}
            handleUpdatePassword={handleUpdatePassword}
          />
        )
    }
  }

  return <Card>{renderProfileView(view)}</Card>
}

export default Profile
