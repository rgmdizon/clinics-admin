import React from "react"
import moment from "moment"

const ScreeningCardHeader = ({ vaccinee }) => {
  let birthday = moment(
    `${vaccinee?.birthday?.month} ${vaccinee?.birthday?.date} ${vaccinee?.birthday?.year}`
  ).format("YYYY-MM-DD")

  let birthYear = birthday?.split?.("-")?.[0]?.slice(2)
  let birthMonth = birthday?.split?.("-")?.[1]

  return (
    <div className="mb-2">
      <h5 className="is-size-5 mt-0 mb-0">
        {vaccinee?.code} {vaccinee?.lastName?.slice(0, 3)?.toUpperCase()}{" "}
        {birthYear}
        {birthMonth}
      </h5>
      <h2 className="has-text-primary is-size-2 mt-0">
        {vaccinee?.firstName} {vaccinee?.middleName} {vaccinee?.lastName}
      </h2>
    </div>
  )
}

export default ScreeningCardHeader
