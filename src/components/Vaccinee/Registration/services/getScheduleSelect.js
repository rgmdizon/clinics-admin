import moment from "moment"

export const getScheduleSelect = ({ schedules }) => {
  let venueOptions = [...new Set(schedules?.map((schedule) => schedule?.venue))]
  let dateScheduleMapping = {}

  // parse venue, date, and timeslots
  venueOptions.forEach((venue) => {
    let availableDates = schedules?.filter(
      (schedule) => schedule?.venue === venue
    )
    let pushedDates = []
    dateScheduleMapping[venue] = []

    availableDates.forEach((date) => {
      if (
        !pushedDates?.includes(moment(date?.startDate)?.format("MMM DD, YYYY"))
      )
        dateScheduleMapping[venue].push({
          id: date?.id,
          date: moment(date?.startDate)?.format("MMM DD, YYYY"),
          timeSlots: schedules
            ?.filter((schedule) => {
              return (
                schedule?.venue === venue &&
                moment(schedule?.startDate)?.isSame(date?.startDate, "day")
              )
            })
            ?.map(
              (schedule) =>
                `${moment(schedule?.startDate)?.format(
                  "MMM DD, YYYY"
                )} ${moment(schedule?.startDate)?.format("h:mmA")} - ${moment(
                  schedule?.endDate
                )?.format("h:mmA")}`
            ),
        })

      pushedDates.push(moment(date?.startDate)?.format("MMM DD, YYYY"))
    })
  })

  return dateScheduleMapping
}
