export const parseFormValues = ({ vaccineeDocument }) => {
  // Map out values to standard form structure for validation
  let priorityCategory = {
    label: vaccineeDocument?.priorityCategory,
    value: vaccineeDocument?.priorityCategory,
  }

  let suffix = {
    label: vaccineeDocument?.suffix,
    value: vaccineeDocument?.suffix,
  }

  let birthday = {
    month: {
      value: vaccineeDocument?.birthday?.month,
      label: vaccineeDocument?.birthday?.month,
    },
    date: {
      value: vaccineeDocument?.birthday?.date,
      label: vaccineeDocument?.birthday?.date,
    },
    year: vaccineeDocument?.birthday?.year,
  }

  let guardianBirthday = {
    month: {
      value: vaccineeDocument?.guardianBirthday?.month,
      label: vaccineeDocument?.guardianBirthday?.month,
    },
    date: {
      value: vaccineeDocument?.guardianBirthday?.date,
      label: vaccineeDocument?.guardianBirthday?.date,
    },
    year: vaccineeDocument?.guardianBirthday?.year,
  }

  let address = {
    streetAddress: vaccineeDocument?.address?.streetAddress,
    province: {
      value: vaccineeDocument?.address?.province,
      label: vaccineeDocument?.address?.province,
    },
    city: {
      value: vaccineeDocument?.address?.city,
      label: vaccineeDocument?.address?.city,
    },
    barangay: {
      value: vaccineeDocument?.address?.barangay,
      label: vaccineeDocument?.address?.barangay,
    },
  }

  let isSickToday = vaccineeDocument?.screeningFormAnswers?.isSickToday
  let isPregnant = vaccineeDocument?.screeningFormAnswers?.isPregnant
  let hadImmuneDeficiencies = vaccineeDocument?.screeningFormAnswers?.hadImmuneDeficiencies
  let isTakingMedicines = vaccineeDocument?.screeningFormAnswers?.isTakingMedicines
  let hasAllergicReactions = vaccineeDocument?.screeningFormAnswers?.hasAllergicReactions
  let hasDrugTreatment = vaccineeDocument?.screeningFormAnswers?.hasDrugTreatment
  let receivedBloodTransfusion = vaccineeDocument?.screeningFormAnswers?.receivedBloodTransfusion
  let hasBeenVaccinated = vaccineeDocument?.screeningFormAnswers?.hasBeenVaccinated

  return {
    guardianBirthday,
    priorityCategory,
    suffix,
    birthday,
    address,
    acknowledgement: ["acknowledged"],
    isSickToday,
    isPregnant,
    hadImmuneDeficiencies,
    isTakingMedicines,
    hasAllergicReactions,
    hasDrugTreatment,
    receivedBloodTransfusion,
    hasBeenVaccinated
  }
}
