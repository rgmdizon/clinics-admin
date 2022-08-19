export const formatVaccineeType = ({ vaccineeType }) => {
  let vaccineeTypes = [
    {
      name: "Adults (18 and above)",
      value: "Adult",
    },
    {
      name: "Adult",
      value: "Adult",
    },
    {
      name: "Pediatric (12 to 17)",
      value: "Pediatric",
    },
    {
      name: "Pediatric",
      value: "Pediatric",
    },
  ]

  return vaccineeTypes.find((type) => type.name === vaccineeType).value
}

export const formatDoseType = ({ doseType }) => {
  let doseTypes = [
    {
      name: "Booster Doses (only for Adults)",
      value: "Booster",
    },
    {
      name: "Booster Doses",
      value: "Booster",
    },
    {
      name: "First Doses",
      value: "First",
    },
    {
      name: "Second Doses",
      value: "Second",
    },
  ]

  return doseTypes.find((type) => type.name === doseType).value
}
