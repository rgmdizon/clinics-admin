import firebase from "firebase"
import defaultAllocations from "../utils/defaultAllocation.json"
import { getSignedInUser } from "./user"

import { isBrowser } from "services/general"

import { processChangelog, processUpdatedBy } from "./processChangelog"

export const updateAllocation = async ({
  organization,
  bookingsData,
  userData,
  authUser,
}) => {
  let { allocationsBooked } = reduceAllocations({
    organization,
    bookingsData,
  })

  let { allocationsAdjustment } = defaultAllocations

  if (isBrowser()) {
    let fieldsToUpdate = {
      allocationsBooked,
      updateTime: new Date(),
    }

    if (!organization.allocationsAdjustment) {
      fieldsToUpdate = { ...fieldsToUpdate, allocationsAdjustment }
    }

    let changelog = processChangelog({
      document: organization,
      fieldsToUpdate,
      userData,
    })

    let _updatedBy = processUpdatedBy({
      userData,
      authUser,
      fieldsToUpdate,
    })

    await firebase
      .firestore()
      .collection("organizations")
      .doc(organization.id)
      .update({ ...fieldsToUpdate, changelog, _updatedBy })

    let newOrganization = { ...organization, ...fieldsToUpdate, changelog }
    sessionStorage.setItem("organization", JSON.stringify(newOrganization))
    return newOrganization
  }
}
export const getRemainingAllocation = () => {
  const { organization, bookingsData } = getSignedInUser()

  /**
   * RULE:
   * 1) If moderna AND booster shot, the slot should only deduct by 0.5
   * 2) Final value should be rounded up
   */

  const { remainingAllocation } = reduceAllocations({
    organization,
    bookingsData,
  })

  return remainingAllocation
}

const reduceAllocations = ({ organization, bookingsData }) => {
  const defaultAllocationBooked = {
    moderna: 0,
    astrazeneca: 0,
  }
  const defaultRemainingAllocation = {
    moderna: 0,
    astrazeneca: 0,
  }

  const organizationAllocation = organization?.allocations || {}

  const allocationsAdjustment =
    organization.allocationsAdjustment ||
    defaultAllocations.allocationsAdjustment

  let allocationsBooked = bookingsData.reduce((total, booking) => {
    if (
      booking.vaccineBrand.toLowerCase() === "moderna" &&
      booking.doseType.toLowerCase().includes("booster")
    ) {
      total[booking?.vaccineBrand?.toLowerCase()] += parseInt(booking.doses) / 2
      return total
    } else {
      total[booking?.vaccineBrand?.toLowerCase()] += parseInt(booking.doses)
      return total
    }
  }, defaultAllocationBooked)

  let remainingAllocation = defaultRemainingAllocation
  Object.keys(remainingAllocation).forEach((vaccine) => {
    remainingAllocation[vaccine.toLowerCase()] =
      parseFloat(organizationAllocation[vaccine.toLowerCase()] || 0) +
      parseFloat(allocationsAdjustment[vaccine.toLowerCase()] || 0) -
      parseFloat(allocationsBooked[vaccine.toLowerCase()] || 0)
  })

  return { remainingAllocation, allocationsBooked }
}
