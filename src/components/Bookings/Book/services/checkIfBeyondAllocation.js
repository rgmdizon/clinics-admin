import { getSignedInUser } from "auth/services/user"
import { getRemainingAllocation } from "auth/services/allocations"

export const checkIfBeyondAllocation = ({ setOverAllocation, values }) => {
  const { organization } = getSignedInUser()

  let organizationAllocation = organization?.allocations
  let allocationRequired = organization?.allocationRequired

  if (allocationRequired && organizationAllocation) {
    let remainingAllocation = getRemainingAllocation()

    const brand = values.brand.value
    const doseType = values.doseType
    let numberOfDoses = parseFloat(values.numberOfDoses)

    /** RULE:
     * IF moderna and booster, a dose is considered to only be 0.5
     */
    if (
      brand.toLowerCase() === "moderna" &&
      doseType.toLowerCase().includes("booster")
    ) {
      numberOfDoses = Math.ceil(numberOfDoses / 2)
    }

    if (remainingAllocation[brand.toLowerCase()] - numberOfDoses < 0) {
      setOverAllocation({
        brand,
        remainingAllocation: remainingAllocation[brand.toLowerCase()],
      })
      return true
    } else return false
  }

  return false
}
