export const formatPrice = (config) => {
  let { priceString } = config
  let priceFloat = parseFloat(priceString)

  return `Php ${priceFloat.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export const formatNumber = (config) => {
  let { number, decimalPlaces } = config
  return `${number.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces || 0,
    maximumFractionDigits: decimalPlaces || 0,
  })}`
}
