export const getAvailableVaccines = ({ schedules, availableVaccines }) => {
  if (!schedules) schedules = []

  let vaccineMap = {}
  let vaccineTypes = [
    ...new Set(availableVaccines?.map((vaccine) => vaccine?.vaccine)),
  ]

  // map vaccines with their brands
  vaccineTypes.forEach((vaccine) => {
    vaccineMap[vaccine] = [
      ...new Set(
        availableVaccines
          ?.filter((vaccineType) => vaccineType?.vaccine === vaccine)
          ?.map((vaccineType) => vaccineType?.brand)
      ),
    ]
  })

  let vaccineTypeKeys = vaccineTypes?.map((vaccine) => ({
    value: vaccine,
    label: vaccine,
  }))

  return { vaccineMap, vaccines: vaccineTypeKeys, availableVaccines }
}
