import moment from "moment"

export const isFutureDate = ({ date }) => {
  let dateToday = new Date()
  dateToday.setDate(dateToday.getDate() - 1)

  if (date) return dateToday <= moment(date).toDate()
  return false
}

export const formatDate = (date) => {
  return moment(date).format("MM-DD-YYYY")
}

export const formatDateWithDay = (date) => {
  return moment(date).format("MMM DD (ddd) hh:mm A")
}
