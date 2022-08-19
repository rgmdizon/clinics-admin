import React, { Fragment } from "react"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEnvelope,
  faBriefcase,
  faFileAlt,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons"

import Section from "elements/Section"
import EditDetailsButton from "elements/EditDetailsButton"

import { getSignedInUser } from "components/Auth/services/user"

const InfoIcon = ({ children, icon, className }) => (
  <p
    className={classNames(
      "is-size-6 is-flex is-align-items-center",
      className || ""
    )}
  >
    <span className="icon mr-1">
      <FontAwesomeIcon icon={icon} />
    </span>
    <span>{children}</span>
  </p>
)

const ProfileInfo = ({ handleUpdatePassword, handleEditProfile }) => {
  const { organization, userData } = getSignedInUser()

  // const address = addresses?.addresses?.[0]

  return (
    <Fragment>
      <Section
        title="Organization Details"
        addOns={{
          right: <EditDetailsButton onClick={handleEditProfile} />,
        }}
      >
        <h4 className="has-text-black">{organization?.tradeName}</h4>
        <InfoIcon icon={faBriefcase}>{organization?.legalName}</InfoIcon>
        {organization?.tinNumber && (
          <InfoIcon icon={faFileAlt}>{organization}</InfoIcon>
        )}
        {/* {address ? (
          <InfoIcon icon={faMapMarkedAlt}>
            <span>
              Address: {address.street || address.streetAddress},{" "}
              {address.barangay ? `${address.barangay}, ` : ""}
              {address.city}, {address.province}{" "}
              {address.notes ? `(${address.notes})` : ""}
            </span>
          </InfoIcon>
        ) : (
          <Message className="is-size-6 mt-2">
            Please <a onClick={handleEditProfile}>update</a> your billing
            address to complete your profile.
          </Message>
        )} */}
      </Section>
      <Section
        title="Contact Person"
        addOns={{
          right: <EditDetailsButton onClick={handleEditProfile} />,
        }}
      >
        <h4 className="has-text-black">
          {userData?.firstName} {userData?.lastName}
        </h4>
        <InfoIcon icon={faPhone}>{userData?.mobileNumber}</InfoIcon>
      </Section>
      <Section
        title="Account Details"
        addOns={{
          right: (
            <EditDetailsButton onClick={handleUpdatePassword}>
              Update Password
            </EditDetailsButton>
          ),
        }}
      >
        <InfoIcon icon={faEnvelope}>{userData?.email}</InfoIcon>
        <InfoIcon icon={faLock}>
          &bull; &bull; &bull; &bull; &bull; &bull; &bull;
        </InfoIcon>
      </Section>
    </Fragment>
  )
}

export default ProfileInfo
