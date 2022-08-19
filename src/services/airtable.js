const parseFormField = (FormFieldData) => {
  // Get all unique form sections from the form field data query
  let formSections = FormFieldData.reduce((formSections, formField) => {
    let sectionName = formField.section

    // Maps form field data to corresponding section
    let currentSection = formSections.find(
      (formSection) => formSection.section === sectionName
    )
    let currentSectionFields = currentSection ? currentSection.fields : []

    // Parses data object to match standard structure
    // Note: diagnosis is unique to BI hope and can be removed
    if (
      formField.options &&
      formField.options.length > 0 &&
      (formField.type === "select" || formField.type === "multiselect")
    ) {
      formField.options = formField.options.map((option) => {
        if (typeof option === "object") {
          return option
        }
        return {
          value: option,
          label: option,
        }
      })
    }
    formField.followUpQuestions = formField.followUpQuestionsName || []
    formField.isRequired = !!formField.required

    currentSectionFields = [...currentSectionFields, formField]
    currentSectionFields = currentSectionFields.sort(
      (firstFormField, secondFormField) =>
        firstFormField.order - secondFormField.order
    )

    let newFormSection = {
      section: formField.section,
      subtitle: formField.sectionSubtitle,
      message: formField.sectionMessage,
      fields: currentSectionFields,
      order: formField.sectionOrder,
      link: formField.sectionLink,
      sectionId: formField.sectionID,
    }

    let tempFormSections = formSections.filter(
      (formSection) => formSection.section !== sectionName
    )
    tempFormSections = [...tempFormSections, newFormSection]

    return tempFormSections
  }, [])

  return formSections
}

module.exports = { parseFormField }
