import firebase from "firebase"
import { isBrowser } from "services/general"
import { createOrUpdateAddress } from "components/Auth/services/addresses"
import { getSignedInUser } from "components/Auth/services/user"

export const updateProfile = async (config) => {
  let { dispatch, values, handleBackClick } = config

  const { organization, accountOwnerData } = getSignedInUser()
  try {
    let updatedAddressDocument = await createOrUpdateAddress({ values })
    await updateOrganizationProfile({
      organization,
      values,
      addressesId: updatedAddressDocument.id,
    })
    await updateOwnerProfile({ values, accountOwnerData })
    handleBackClick()
    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: `Organization Profile successfully updated.`,
        color: "success",
      },
    })
  } catch (error) {
    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: `Something went wrong with updating your profile. Please try again.`,
        color: "danger",
      },
    })
  }
}

export const updateOrganizationProfile = async ({
  values,
  organization,
  addressesId,
}) => {
  if (isBrowser()) {
    let fieldsToUpdate = {
      legalName: values.legalName,
      tradeName: values.tradeName,
      tinNumber: values.tinNumber,
      addressesId,
    }

    await firebase
      .firestore()
      .collection("organizations")
      .doc(organization.id)
      .update(fieldsToUpdate)

    let neworganization = { ...organization, ...fieldsToUpdate }
    sessionStorage.setItem("organization", JSON.stringify(neworganization))
  }
}

export const updateOwnerProfile = async ({ values, accountOwnerData }) => {
  if (isBrowser()) {
    let fieldsToUpdate = {
      firstName: values.firstName,
      lastName: values.lastName,
      mobileNumber: values.mobileNumber,
    }

    await firebase
      .firestore()
      .collection("users")
      .doc(accountOwnerData.id)
      .update(fieldsToUpdate)

    let newUserData = { ...accountOwnerData, ...fieldsToUpdate }
    sessionStorage.setItem("accountOwnerData", JSON.stringify(newUserData))
  }
}

export const updatePassword = async ({
  values,
  dispatch,
  setMessage,
  callback,
}) => {
  let { userData } = getSignedInUser()
  let currentUserEmail = userData?.email

  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(currentUserEmail, values?.oldPassword)
    let user = firebase.auth().currentUser
    await user.updatePassword(values?.newPassword)

    // remove force reset
    await firebase
      .firestore()
      .collection("users")
      .doc(userData?.id)
      .update({ forceReset: false })

    if (callback) callback()

    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: `Password successfully updated.`,
        color: "success",
      },
    })
  } catch (error) {
    setMessage({
      type: "danger",
      content: { code: error.code, message: error.message },
    })
  }
}
