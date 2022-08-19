export const isObjectEmpty = (object) => {
  for (var i in object) return false
  return true
}

export const isBrowser = () => typeof window !== "undefined"

export const matchMedia = (mediaQuery) => {
  if (isBrowser()) {
    const MEDIA_QUERY = window.matchMedia(mediaQuery)
    return MEDIA_QUERY.matches
  }
  return false
}

export const formatString = (object) => {
  if (!object) return ""
  if (typeof object === "object" && object["year"]) return buildDate(object)
  else if (typeof object === "string") return object
  else if (typeof object === "object") {
    try {
      let data = []
      if (Object.keys(object).length === 0 && object.length === 0) return "N/A"
      object.forEach((item) => {
        if (item.value) data.push(item.value)
        else data.push(item)
      })
      data.sort()
      return data.join(", ")
    } catch (exception) {
      return ""
    }
  } else return "N/A"
}

export const buildDate = ({ year, month, date }) => {
  if (!year) return "N/A"
  const buildMonth = month?.value ? `${month?.value} ` : ""
  const buildDate = date?.value ? `${("0" + date?.value).slice(-2)} ` : ""
  return `${buildMonth}${buildDate}${year}`
}

export const b64toBlob = (b64Data, contentType, sliceSize) => {
  contentType = contentType || ""
  sliceSize = sliceSize || 512
  let byteCharacters = atob(b64Data)
  let byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize)
    let byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    let byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  let blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export const generateId = (length) => {
  var result = ""
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
