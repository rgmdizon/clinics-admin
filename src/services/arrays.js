const { camelizeKeys } = require("humps")

const flattenNode = (object = []) => {
  return Object.values(
    object.nodes.map((item) => camelizeKeys(item.data))
  ).flat()
}

const flattenObject = (object = [], key) => {
  return Object.values(object.map((item) => item[key]))
}

module.exports = {
  flattenNode,
  flattenObject,
}
