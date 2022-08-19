import React, { Fragment } from "react"
import classNames from "classnames"

const DataRenderer = ({ data }) => {
  switch (data?.type) {
    case "component":
      return <Fragment>{data?.data}</Fragment>
    case "string":
      return <span>{data?.data || data}</span>
    case "tag":
      return (
        <span class={`tag is-${data?.color || "primary"}`}>
          {data?.data || data}
        </span>
      )
    default:
      return <span>{data?.data || data}</span>
  }
}

const EventMobileCardRow = ({ className, rowData }) => {
  let isCancelled = rowData?.[1]?.data === "Cancelled"
  let isAvailable = rowData?.[0]?.data === "Available"
  let isRegistered = rowData?.[1]?.data === "Registered"
  let firstName = rowData?.[3]
  let lastName = rowData?.[4]

  return (
    <div className={classNames(className, "card p-2 mb-2")}>
      <section>
        <span className="mr-1">
          {isRegistered ? (
            `${firstName} ${lastName}`
          ) : (
            <DataRenderer data={rowData?.[0]} />
          )}
          {/* <DataRenderer data={rowData?.[0]} /> */}
        </span>
        <DataRenderer data={rowData?.[1]} />
      </section>
      {!isCancelled && (
        <Fragment>
          <hr />
          <section>
            {isAvailable ? (
              <DataRenderer data={rowData?.[4]} />
            ) : (
              <DataRenderer data={rowData?.[5]} />
            )}
          </section>
        </Fragment>
      )}
    </div>
  )
}

export default EventMobileCardRow
