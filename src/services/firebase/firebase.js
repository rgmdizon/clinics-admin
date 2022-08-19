import firebase from "firebase/app"
import "firebase/auth"
import {
  GATSBY_FIREBASE_API_KEY,
  GATSBY_FIREBASE_AUTH_DOMAIN,
  GATSBY_FIREBASE_DATABASE_URL,
  GATSBY_FIREBASE_PROJECT_ID,
  GATSBY_FIREBASE_STORAGE_BUCKET,
  GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  GATSBY_FIREBASE_APP_ID,
} from "gatsby-env-variables"

const firebaseConfig = {
  apiKey: GATSBY_FIREBASE_API_KEY,
  authDomain: GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: GATSBY_FIREBASE_DATABASE_URL,
  projectId: GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: GATSBY_FIREBASE_APP_ID,
}

let instance = null

export const getFirebase = () => {
  if (typeof window !== "undefined") {
    if (instance) return instance
    instance = firebase.initializeApp(firebaseConfig)
    return instance
  }
  return null
}
