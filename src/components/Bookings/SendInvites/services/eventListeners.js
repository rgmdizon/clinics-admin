export const handlePasteRows = ({
  name,
  event,
  index,
  values,
  dosesToServe,
  setFieldValue,
  setErrorMessage,
}) => {
  if (event) {
    event.preventDefault()
    let currentEmails = values?.emails
      .filter((email) => email !== "")
      .slice(0, index)

    if (event?.clipboardData) {
      let clipboardData = [
        ...currentEmails,
        ...event?.clipboardData
          ?.getData("text")
          ?.split(`\n`)
          .map((email) => email.split(`\r`)[0].trim()),
      ]

      if (clipboardData?.length > dosesToServe) {
        clipboardData = clipboardData.slice(0, dosesToServe)
        setErrorMessage(
          "You have reached your maximum invite slots for this booking."
        )
      } else if (clipboardData?.length < dosesToServe)
        clipboardData.push(
          ...Array.from(
            { length: dosesToServe - clipboardData?.length },
            () => ""
          )
        )

      setFieldValue(name, clipboardData)
    }
  }
}
export const handleKeyUp = ({
  name,
  index,
  event,
  values,
  dosesToServe,
  setFieldValue,
  setErrorMessage,
}) => {
  let currentEmails = values?.[name]
  let emailsLength = currentEmails?.length
  // let currentValue = currentEmails[index]

  let allValidEmails = currentEmails.filter((email) => email !== "")

  // Add tab
  if (
    event?.key === "Enter" &&
    index + 1 >= dosesToServe &&
    allValidEmails.length === dosesToServe
  )
    setErrorMessage(
      "You have reached your maximum invite slots for this booking."
    )
  if (
    event?.key === "Enter" &&
    index + 1 === emailsLength &&
    index + 1 < dosesToServe
  )
    setFieldValue(name, [...currentEmails, ""])
  // if (event?.key === "Backspace" && !currentValue && emailsLength > 1) {
  //   if (index + 1 === emailsLength) {
  //     currentEmails.pop()
  //     setFieldValue(name, currentEmails)
  //   } else {
  //     currentEmails.splice(index, 1)
  //     setFieldValue(name, currentEmails)
  //   }
  // }
}
