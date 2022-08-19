export const calculateTotalPrice = ({ bookingState = {}, allVaccines }) => {
  const { brand, vaccine, numberOfDoses } = bookingState
  let selectedVaccine = `${brand?.value} - ${vaccine?.value}`
  selectedVaccine = allVaccines.find((vaccine) => {
    return (
      vaccine.name.toLowerCase().trim() === selectedVaccine.toLowerCase().trim()
    )
  })
  const amountDue = selectedVaccine?.price * parseFloat(numberOfDoses)
  return amountDue
}
