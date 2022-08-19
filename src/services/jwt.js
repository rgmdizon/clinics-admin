import moment from "moment"
import {
  GATSBY_OAUTH_PRIVATE_KEY,
  GATSBY_OAUTH_TOKEN_URI,
  GATSBY_SERVICE_ACCOUNT_EMAIL,
  GATSBY_OAUTH_GRANT_TYPE,
} from "gatsby-env-variables"
import axios from "axios"
import { isBrowser } from "./general"

let crypto = isBrowser() ? require("crypto") : null

export const generateJWT = async () => {
  // let responseData = {}
  const JWT_HEADER = generateJWTHeader()
  const JWT_CLAIM_SET = generateJWTClaimSet()
  const JWT_PAYLOAD = `${JWT_HEADER}.${JWT_CLAIM_SET}`
  const JWT_SIGNATURE = generateJWTSignature({ payload: JWT_PAYLOAD })
  const JWT = `${JWT_HEADER}.${JWT_CLAIM_SET}.${JWT_SIGNATURE}`

  return await axios.post(GATSBY_OAUTH_TOKEN_URI, {
    grant_type: GATSBY_OAUTH_GRANT_TYPE,
    assertion: JWT,
  })
}

const generateJWTHeader = () => {
  const GOOGLE_JWT_HEADER = { alg: "RS256", typ: "JWT" }

  return Buffer.from(JSON.stringify(GOOGLE_JWT_HEADER)).toString("base64")
}

const generateJWTClaimSet = () => {
  let GOOGLE_JWT_CLAIM_SET = {}
  let TOKEN_EXPIRY_IN_SECONDS = 3600

  GOOGLE_JWT_CLAIM_SET.iss = GATSBY_SERVICE_ACCOUNT_EMAIL
  GOOGLE_JWT_CLAIM_SET.scope =
    "https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/calendar.readonly"
  GOOGLE_JWT_CLAIM_SET.aud = GATSBY_OAUTH_TOKEN_URI
  GOOGLE_JWT_CLAIM_SET.sub = GATSBY_SERVICE_ACCOUNT_EMAIL
  GOOGLE_JWT_CLAIM_SET.exp = moment().unix() + TOKEN_EXPIRY_IN_SECONDS
  GOOGLE_JWT_CLAIM_SET.iat = moment().unix()

  return Buffer.from(JSON.stringify(GOOGLE_JWT_CLAIM_SET)).toString("base64")
}

const generateJWTSignature = ({ payload }) => {
  let signingAlgorithm = crypto.createSign("RSA-SHA256")
  signingAlgorithm.update(payload) // data from your file would go here
  let signature = signingAlgorithm.sign(GATSBY_OAUTH_PRIVATE_KEY)

  return Buffer.from(signature).toString("base64")
}
