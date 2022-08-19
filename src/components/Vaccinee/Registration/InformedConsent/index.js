import React from "react"
import classNames from "classnames"

import waiver from "./utils/waiver.json"

import styles from "../utils/registration.module.scss"

const Index = ({ vaccineeState }) => {
  let waiverType = "non-covid"
  let vaccines = vaccineeState?.vaccines?.vaccines || []

  vaccines.forEach((vaccine) => {
    if (vaccine?.includes("COVID")) waiverType = "covid"
  })

  return (
    <div className="box mb-3">
      <div className={classNames(styles["collapsible"])}>
        <div className="content">
          <ul>
            {waiver[waiverType].map((data) => (
              <li className="is-size-5">{data}</li>
            ))}
          </ul>
        </div>
        {/* <Header styles={styles} />
      <PersonalDetails vaccineeState={vaccineeState} styles={styles} />
      <Consent vaccineeState={vaccineeState} styles={styles} /> */}
      </div>
    </div>
  )
}

export default Index
