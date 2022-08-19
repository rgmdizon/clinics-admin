import firebase from "firebase"
import { isBrowser } from "services/general"
import { getSignedInUser } from "./user"

export const createOrUpdateAddress = async ({ values }) => {
  if (isBrowser()) {
    let { province, city, streetAddress, addressType } = values.address
    const { organization, addresses } = getSignedInUser()
    let addressesId = addresses?.id
    let addressData = {
      province: province?.value,
      type: addressType || "",
      streetAddress: streetAddress,
      city: city?.value,
      primary: false,
    }
    //TO DO: place this again if need to handle multiple billing addresses per company
    // let currentAddressList = addresses?.addresses || []
    // let tempAddresses = [...currentAddressList]
    // if (tempAddresses?.length < 1) addressData.primary = true
    let tempAddresses = []

    tempAddresses.push(addressData)
    let addressDocument = { addresses: tempAddresses }

    if (addressesId) {
      await firebase
        .firestore()
        .collection("addresses")
        .doc(addressesId)
        .update(addressDocument)
    } else {
      let response = await firebase
        .firestore()
        .collection("addresses")
        .add(addressDocument)

      let newAddressId = response.id

      sessionStorage.setItem(
        "organization",
        JSON.stringify({ ...organization, addresses: newAddressId })
      )
      addressesId = newAddressId
    }

    addressDocument = { ...addressDocument, id: addressesId }

    sessionStorage.setItem("addresses", JSON.stringify(addressDocument))
    return addressDocument
  }
}
