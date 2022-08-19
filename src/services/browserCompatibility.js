function isIe(userAgent) {
  return (
    userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1
  )
}

function isEdge(userAgent) {
  return userAgent.indexOf("Edge/") !== -1
}

export function isIeOrEdge(userAgent = window.navigator.userAgent) {
  return isIe(userAgent) || isEdge(userAgent)
}

export function isDevelopmentEnv() {
  return process.env.GATSBY_ENV === "development"
}
