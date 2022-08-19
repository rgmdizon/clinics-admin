import React from "react"

const valueParser = (values, field) => {
  switch (field?.type) {
    case "tel":
    case "text":
    case "email":
    case "radio":
      return values[field?.name] || "N/A"
    case "select":
      return typeof values[field?.name] === "object"
        ? values[field?.name]?.value || "N/A"
        : values[field?.name] || "N/A"
    case "date":
      let month =
        typeof values[field?.name]?.month === "object"
          ? values[field?.name]?.month?.value
          : values[field?.name]?.month
      let date =
        typeof values[field?.name]?.date === "object"
          ? values[field?.name]?.date?.value
          : values[field?.name]?.date

      let year = values[field?.name]?.year || values[field?.name]?.year

      return `${month} ${date}, ${year}`
    case "address":
      let streetAddress = values[field?.name]?.streetAddress || "N/A"
      let province =
        typeof values[field?.name]?.province === "object"
          ? values[field?.name]?.province?.value || "N/A"
          : values[field?.name]?.province || "N/A"
      let city =
        typeof values[field?.name]?.city === "object"
          ? values[field?.name]?.city?.value || "N/A"
          : values[field?.name]?.city || "N/A"
      let barangay =
        typeof values[field?.name]?.barangay === "object"
          ? values[field?.name]?.barangay?.value || "N/A"
          : values[field?.name]?.barangay || "N/A"

      return `${streetAddress}, ${barangay} ${city}, ${province}`
    default:
      return ""
  }
}

const ScreeningDetail = ({ values, field }) => {
  return (
    <div className="title p-0 m-0">
      <small className="is-size-7 has-text-weight-normal has-text-grey">{field?.label}</small>
      <p className="has-text-weight-bold">{valueParser(values, field)}</p>
    </div>
  )
}

export default ScreeningDetail
