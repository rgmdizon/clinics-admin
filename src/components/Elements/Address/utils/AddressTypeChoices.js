import React from "react"
import _ from "lodash"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faBuilding } from "@fortawesome/free-solid-svg-icons"

import { ErrorMessage } from "formik"

const addressTypes = [
  {
    value: "Office",
    icon: faBuilding,
  },
  {
    value: "Home",
    icon: faHome,
  },
]

const AddressTypeChoices = ({ addressTypeName, values, setFieldValue }) => (
  <div className="mb-1">
    <label className="is-size-6" htmlFor={`${addressTypeName}`}>
      Address Type
    </label>
    <div className={classNames("buttons mt-1")} id={`${addressTypeName}`}>
      {addressTypes.map((addressType, index) => (
        <button
          onClick={() => {
            setFieldValue(addressTypeName || "addressType", addressType.value)
          }}
          className={classNames("button", {
            "is-primary":
              _.get(values, addressTypeName || "addressType") ===
              addressType.value,
          })}
          type="button"
          role="tab"
          tabIndex={0}
          id={`${addressTypeName}${index}`}
          onKeyDown={(event) => {
            if (event.key === "Enter")
              setFieldValue(addressTypeName || "addressType", addressType.value)
          }}
        >
          <span className="icon is-small">
            <FontAwesomeIcon icon={addressType.icon} />
          </span>
          <span>{addressType.value}</span>
        </button>
      ))}
    </div>
    <ErrorMessage name={addressTypeName}>
      {(error) => <div className="has-text-danger is-size-7">{error}</div>}
    </ErrorMessage>
  </div>
)

export default AddressTypeChoices
