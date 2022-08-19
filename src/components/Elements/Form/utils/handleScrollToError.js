const handleScrollToError = (config) => {
  let { formikContext, fieldName, callback } = config
  const firstErrorKey = Object.keys(formikContext.errors)[0]
  if (formikContext.submitCount && !formikContext.isValid) {
    if (firstErrorKey === fieldName && callback) callback()
  }
}

export default handleScrollToError
