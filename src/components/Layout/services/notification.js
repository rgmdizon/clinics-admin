import { isBrowser } from "../../../services/general"

export const hasSeenNotification = () =>
  isBrowser() && sessionStorage.getItem("hasSeenNotification")
    ? sessionStorage.getItem("hasSeenNotification") === "true"
    : false

export const setNotificationAsSeen = () =>
  isBrowser() ? sessionStorage.setItem("hasSeenNotification", "true") : null
