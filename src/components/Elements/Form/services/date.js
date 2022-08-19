import moment from "moment"

export const isFutureDate = ({ date }) => {
  let dateToday = new Date()
  dateToday.setDate(dateToday.getDate() - 1)

  if (date) return dateToday <= moment(date).toDate()
  return false
}

export const getDateString = ({ dateObject }) => {
  let dateString = ""
  if (dateObject.month)
    dateString = `${dateString}${
      dateObject.month.value ? ` ${dateObject.month.value}` : ""
    }`
  if (dateObject.date)
    dateString = `${dateString}${
      dateObject.date.value ? ` ${dateObject.date.value}` : ""
    }`
  if (dateObject.year)
    dateString = `${dateString}${dateObject.year ? ` ${dateObject.year}` : ""}`

  return dateString
}

export const setYears = (config) => {
  let years = []
  const { future, past, birthday, range, minAge } = config
  let minDate, maxDate, increment, incrementValue
  if (range) {
    minDate = range.minDate
    maxDate = range.maxDate
    increment = range.increment
    incrementValue = range.incrementValue
  }
  if (future) {
    let now = moment()
    let yearNow = now.year()
    let endYear = now.add(5, "year").year()

    for (let year = yearNow; year <= endYear; year++) years.push(year)
  } else if (past) {
    let now = moment()
    let yearNow = now.year()
    let endYear = now.subtract(5, "year").year()

    for (let year = yearNow; year >= endYear; year--) years.push(year)
  }

  if (range) {
    if (minDate) minDate = moment(minDate)
    if (maxDate) maxDate = moment(maxDate)
    // if one of minDate/maxDate is missing, there must be an increment and increment value
    if (increment && incrementValue) {
      // if no min date, base it off of maxDate
      if (!minDate)
        minDate = moment(maxDate).subtract(incrementValue, increment)
      // else if no max date, base it off of minDate
      else if (!maxDate)
        maxDate = moment(minDate).add(incrementValue, increment)
    }

    // get years from min and max date and push those
    let minYear = moment(minDate).year()
    let maxYear = moment(maxDate).year()

    for (let year = minYear; year <= maxYear; year++) years.push(year)
  }

  // set years to minimum 18 years in the past
  if (birthday) {
    let latestBirthday = moment().subtract(minAge || 18, "year")
    let endYear = latestBirthday.year()
    let startYear = latestBirthday.subtract(100, "year").year()
    for (let year = startYear; year <= endYear; year++) years.push(year)
  }

  // if years still empty, just push the year now
  if (years.length === 0) years.push(moment().year())

  // remove duplicates in list
  years = [...new Set(years)]

  // sort descending
  if (birthday) years.reverse()

  // map years to be formselect options
  years = years.map((year) => {
    return {
      label: year,
      value: year,
    }
  })

  return years
}

export const setMonths = (config, year) => {
  let months = []
  const { future, past, birthday, range } = config
  let minDate, maxDate, increment, incrementValue
  if (range) {
    minDate = range.minDate
    maxDate = range.maxDate
    increment = range.increment
    incrementValue = range.incrementValue
  }
  let allMonths = moment.monthsShort()
  let yearNow = moment().year()

  if (future) {
    let allMonths = moment.monthsShort()
    let yearNow = moment().year()

    // if year now, return only months left in year
    if (yearNow === year) {
      let monthNow = moment().month()
      let lastMonth = moment().endOf("year").month()

      for (let month = monthNow; month <= lastMonth; month++)
        months.push(moment().month(month).format("MMM"))
    } else {
      months = allMonths
    }
  } else if (past) {
    // if year now, return only months passed this year
    if (yearNow === year) {
      let monthNow = moment().subtract(1, "day").month()
      let firstMonth = moment().startOf("year").month()

      for (let month = firstMonth; month <= monthNow; month++)
        months.push(moment().month(month).format("MMM"))
    } else {
      months = allMonths
    }
  }

  if (range) {
    if (minDate) minDate = moment(minDate)
    if (maxDate) maxDate = moment(maxDate)
    // if one of minDate/maxDate is missing, there must be an increment and increment value
    if (increment && incrementValue) {
      // if no min date, base it off of maxDate
      if (!minDate)
        minDate = moment(maxDate).subtract(incrementValue, increment)
      // else if no max date, base it off of minDate
      else if (!maxDate)
        maxDate = moment(minDate).add(incrementValue, increment)
    }

    // if year === minDate.year(), add months from minDate until end of year
    // else if year === maxDate.year(), add months from start of year until maxDate
    if (year === minDate.year() || year === maxDate.year()) {
      let minMonth =
        year === minDate.year()
          ? minDate.month()
          : moment(maxDate).startOf("year").month()
      let maxMonth =
        year === minDate.year()
          ? moment(minDate).endOf("year").month()
          : maxDate.month()

      for (let month = minMonth; month <= maxMonth; month++)
        months.push(moment().month(month).format("MMM"))
      // else, add all months
    } else {
      months = allMonths
    }
  }

  // if birthday, return all months always
  if (birthday) months = allMonths

  // map months to be formselect options
  months = months.map((month) => {
    return {
      label: month,
      value: month,
    }
  })

  return months
}

export const setDates = (config, month, year) => {
  let dates = []
  const { future, past, weekdays, birthday, range } = config
  let minDate, maxDate, increment, incrementValue
  if (range) {
    minDate = range.minDate
    maxDate = range.maxDate
    increment = range.increment
    incrementValue = range.incrementValue
  }
  let allDays = moment(`${year}-${month}`, "YYYY-MMM").daysInMonth()
  let dayRange = [
    parseInt(
      moment(`${year}-${month}`, "YYYY-MMM").startOf("month").format("DD")
    ),
    parseInt(
      moment(`${year}-${month}`, "YYYY-MMM").endOf("month").format("DD")
    ),
  ]

  if (future) {
    // if month now is the same as month in params, only return days left this month
    if (moment().format("MMM") === month) {
      let dayTom = parseInt(moment().add(1, "days").format("DD"))
      let lastDay = parseInt(moment().endOf("month").format("DD"))
      dayRange = [dayTom, lastDay]
    } else {
      dayRange = [1, allDays]
    }
  } else if (past) {
    // if month now is the same as month in params, only return days that passed this month
    if (moment().format("MMM") === month) {
      let dayYesterday = parseInt(moment().subtract(1, "days").format("DD"))
      let firstDay = parseInt(moment().startOf("month").format("DD"))
      dayRange = [firstDay, dayYesterday]
    } else {
      dayRange = [1, allDays]
    }
  }

  if (range) {
    if (minDate) minDate = moment(minDate)
    if (maxDate) maxDate = moment(maxDate)
    // if one of minDate/maxDate is missing, there must be an increment and increment value
    if (increment && incrementValue) {
      // if no min date, base it off of maxDate
      if (!minDate)
        minDate = moment(maxDate).subtract(incrementValue, increment)
      // else if no max date, base it off of minDate
      else if (!maxDate)
        maxDate = moment(minDate).add(incrementValue, increment)
    }

    // if year + month === minDate.year() + minDate.month(), min day will be whatever the day of minDate is, max day is end of month
    if (minDate.year() === year && minDate.format("MMM") === month)
      dayRange = [minDate.date(), allDays]
    // if year + month === maxDate.year() + maxDate.month(), max day will be whatever the day of maxDate is, min day is 1
    else if (maxDate.year() === year && maxDate.format("MMM") === month)
      dayRange = [1, maxDate.date()]
    else dayRange = [1, allDays]
  }

  // get all days based on month and year
  if (birthday) dayRange = [1, allDays]

  // push all days based on day range
  for (let day = dayRange[0]; day <= dayRange[1]; day++) dates.push(day)

  if (weekdays) {
    // ensured that there's always items inside dates
    for (let dayIndex = dates.length - 1; dayIndex >= 0; dayIndex -= 1) {
      if (
        moment(`${year}-${month}-${dates[dayIndex]}`, "YYYY-MMM-DD").day() %
          6 ===
        0
      )
        dates.splice(dayIndex, 1)
    }
  }

  // map months to be formselect options
  dates = dates.map((date) => {
    return {
      label: date,
      value: date,
    }
  })

  return dates
}
