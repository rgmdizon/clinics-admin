export const trimIntakeForm = ({ fields, vaccines }) => {
  let hasCovidVaccine = vaccines?.find((vaccine) =>
    vaccine?.productTitle?.includes("COVID")
  )
  let intakeFormInclusions = "Non-COVID vaccine"

  if (hasCovidVaccine) intakeFormInclusions = "COVID Vaccine"

  return fields.filter((field) =>
    field?.vaccineInclusions?.includes(intakeFormInclusions)
  )
}
