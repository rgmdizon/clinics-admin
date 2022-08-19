import { get } from "lodash"
import moment from "moment"

export const getFieldValue = (state, field) => {
  let finalValue = null

  switch (field.type) {
    case "calendar":
      finalValue = get(state, field.name) ? `${get(state, field.name)}` : ""
      finalValue = moment(finalValue).format("MMM. DD, YYYY")
      break
    case "schedule":
      finalValue = get(state, field.name)
        ? `${get(state, field.name)?.day?.label}, ${
            get(state, field.name)?.time?.label
          }`
        : ""
      break
    case "select":
    case "hospital":
      finalValue = get(state, field.name) ? get(state, field.name)?.label : ""
      break
    case "date":
      finalValue = get(state, field.name)
        ? `${get(state, field.name)?.month?.value} ${
            get(state, field.name)?.date?.value
          } ${get(state, field.name)?.year}`
        : ""
      break
    case "address":
      finalValue = get(state, field.name)
        ? `${get(state, field.name)?.streetAddress}, ${
            get(state, field.name)?.province?.value
          }, ${get(state, field.name)?.city?.value}, ${
            get(state, field.name)?.barangay?.value
          }`
            .replaceAll(/[,]/g, "")
            .trim("")
        : ""
      break
    default:
      finalValue = get(state, field.name)
      break
  }

  return finalValue
}
