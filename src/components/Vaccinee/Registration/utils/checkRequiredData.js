export const checkRequiredData = ({ data, required }) => {
  let result = false
  required.forEach((req) => {
    switch (true) {
      case data[req] && typeof data[req] === "string":
        if (data[req].trim() !== "") result = true
        break
      case data[req] && typeof data[req] === "object":
        result = checkRequiredData(data[req], required)
        break
      default:
        break
    }
    if (result) return
  })
  return result
}
