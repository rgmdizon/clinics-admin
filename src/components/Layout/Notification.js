import React, { useState } from "react"
import moment from "moment"
import classNames from "classnames"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

import styles from "./utils/layout.module.scss"
import {
  hasSeenNotification,
  setNotificationAsSeen,
} from "./services/notification"
import { GATSBY_WEBSITE_URL } from "gatsby-env-variables"

const Notification = ({ pageContext }) => {
  let dateToday = moment().format("YYYY-MM-DD")
  const [notificationHidden, setNotificationHidden] = useState(false)
  const hasSeenNotificationMessage = hasSeenNotification()

  const { loading, error, data } = useQuery(
    gql`
      query TodaysDate($holiday_date: date!, $domain: jsonb) {
        holiday(
          where: {
            holiday_date: { _eq: $holiday_date }
            domains: { _contains: $domain }
          }
        ) {
          name
          holiday_date
          short_message
        }
      }
    `,
    {
      variables: {
        holiday_date: dateToday,
        domain: GATSBY_WEBSITE_URL,
      },
    }
  )

  if (loading) return null
  if (error) return null

  let notificationMessage =
    data?.holiday === undefined || data?.holiday?.length === 0
      ? null
      : data?.holiday[0]?.short_message

  // notificationMessage = defaultBanners[pageContext?.module?.name] ? (
  //   <span>
  //     {notificationMessage || ""} {defaultBanners[pageContext?.module?.name]}
  //   </span>
  // ) : null
  notificationMessage = "This is a demo website."

  if (notificationMessage && !hasSeenNotificationMessage)
    return (
      <div
        className={classNames(
          "notification is-warning",
          {
            "is-hidden": notificationHidden,
          },
          styles["notification"]
        )}
      >
        <button
          aria-label="Delete Button"
          className="delete"
          onClick={() => {
            setNotificationHidden(true)
            setNotificationAsSeen()
          }}
        ></button>
        <div className="has-text-centered">{notificationMessage}</div>
      </div>
    )

  return null
}

export default Notification
