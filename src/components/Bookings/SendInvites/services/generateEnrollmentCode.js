import moment from "moment"

const vaccineCodeAssignment = [
  {
    name: "moderna",
    code: "3",
  },
  {
    name: "astrazeneca",
    code: "4",
  },
  {
    name: "sinovac",
    code: "5",
  },
]

export const generateEnrollmentCodeParams = ({ vaccineBrand }) => {
  const lettersArray = "abcdefghijklmnopqrstuvwxyz".split("")

  const dateToday = new Date()
  const weekNumber = moment(dateToday).isoWeek()
  const monthNumber = parseInt(moment(dateToday).month())

  const monthAssignment = lettersArray[monthNumber].toUpperCase()

  const vaccineCode = vaccineCodeAssignment.find((vaccine) => {
    return (vaccine.name = vaccineBrand.toLowerCase)
  }).code

  return { monthAssignment, weekNumber, vaccineCode }
}
